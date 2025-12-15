-- Fix 1: Remove direct INSERT policy on user_promocodes to prevent validation bypass
-- Users must use apply_promocode RPC function which enforces all validations
DROP POLICY IF EXISTS "Users can insert their own promocode usage" ON public.user_promocodes;

-- Fix 2: Update register_referral to also credit points to user_points table
CREATE OR REPLACE FUNCTION public.register_referral(p_referrer_code text, p_referred_user_id uuid, p_purchase_amount integer DEFAULT 0)
 RETURNS TABLE(success boolean, error_message text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_referrer_user_id uuid;
  v_calculated_minutes integer;
  v_caller_id uuid;
BEGIN
  -- Get the current authenticated user
  v_caller_id := auth.uid();
  
  -- SECURITY: Validate that the caller is registering themselves as the referred user
  IF v_caller_id IS NULL THEN
    RETURN QUERY SELECT false, 'Требуется авторизация'::text;
    RETURN;
  END IF;
  
  IF p_referred_user_id != v_caller_id THEN
    RETURN QUERY SELECT false, 'Недостаточно прав для выполнения операции'::text;
    RETURN;
  END IF;
  
  -- SECURITY: For direct client calls, purchase_amount MUST be 0
  IF p_purchase_amount != 0 THEN
    RETURN QUERY SELECT false, 'Сумма покупки устанавливается автоматически при оплате'::text;
    RETURN;
  END IF;

  -- Extract referrer user ID from the referral code
  BEGIN
    v_referrer_user_id := p_referrer_code::uuid;
  EXCEPTION WHEN OTHERS THEN
    RETURN QUERY SELECT false, 'Неверный реферальный код'::text;
    RETURN;
  END;

  -- Prevent self-referrals
  IF v_referrer_user_id = p_referred_user_id THEN
    RETURN QUERY SELECT false, 'Нельзя использовать собственный реферальный код'::text;
    RETURN;
  END IF;

  -- Check if this user was already referred
  IF EXISTS (SELECT 1 FROM public.referral_program WHERE referred_user_id = p_referred_user_id) THEN
    RETURN QUERY SELECT false, 'Пользователь уже зарегистрирован по реферальной программе'::text;
    RETURN;
  END IF;

  -- Calculate points based on purchase amount (3% converted to minutes at 29₽/min)
  v_calculated_minutes := GREATEST(0, FLOOR((p_purchase_amount * 0.03) / 29));

  -- Insert the referral record
  INSERT INTO public.referral_program (referrer_user_id, referred_user_id, purchase_amount, points_earned)
  VALUES (v_referrer_user_id, p_referred_user_id, p_purchase_amount, v_calculated_minutes);

  -- Credit points to referrer's user_points (UPSERT)
  INSERT INTO public.user_points (user_id, total_points, updated_at)
  VALUES (v_referrer_user_id, v_calculated_minutes, now())
  ON CONFLICT (user_id)
  DO UPDATE SET 
    total_points = user_points.total_points + v_calculated_minutes,
    updated_at = now();

  RETURN QUERY SELECT true, NULL::text;
END;
$function$;
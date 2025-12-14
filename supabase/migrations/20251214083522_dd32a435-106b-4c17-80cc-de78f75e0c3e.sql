-- Fix Issue 1: Create a secure function for promo code application
-- This atomically validates, records usage, and increments the counter

CREATE OR REPLACE FUNCTION public.apply_promocode(p_code text)
RETURNS TABLE(success boolean, discount_percent integer, error_message text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_promo_id uuid;
  v_discount integer;
  v_user_id uuid;
BEGIN
  -- Get the current user
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN QUERY SELECT false, 0, 'Требуется авторизация'::text;
    RETURN;
  END IF;

  -- Find the promocode and validate it
  SELECT id, promocodes.discount_percent INTO v_promo_id, v_discount
  FROM public.promocodes
  WHERE code = UPPER(p_code)
    AND active = true
    AND (expires_at IS NULL OR expires_at > now())
    AND (max_uses IS NULL OR current_uses < max_uses);
  
  IF v_promo_id IS NULL THEN
    RETURN QUERY SELECT false, 0, 'Промокод не найден, неактивен или истёк'::text;
    RETURN;
  END IF;

  -- Check if user already used this promo code
  IF EXISTS (SELECT 1 FROM public.user_promocodes WHERE user_id = v_user_id AND promocode_id = v_promo_id) THEN
    RETURN QUERY SELECT false, 0, 'Вы уже использовали этот промокод'::text;
    RETURN;
  END IF;

  -- Record the usage
  INSERT INTO public.user_promocodes (user_id, promocode_id)
  VALUES (v_user_id, v_promo_id);

  -- Increment the usage counter
  UPDATE public.promocodes
  SET current_uses = COALESCE(current_uses, 0) + 1
  WHERE id = v_promo_id;

  RETURN QUERY SELECT true, v_discount, NULL::text;
END;
$$;

-- Fix Issue 2: Remove the unsafe INSERT policy on referral_program
DROP POLICY IF EXISTS "Users can create referrals" ON public.referral_program;

-- Create a secure function for referral registration
-- This should only be called by server-side processes (webhooks, admin)
CREATE OR REPLACE FUNCTION public.register_referral(
  p_referrer_code text,
  p_referred_user_id uuid,
  p_purchase_amount integer DEFAULT 0
)
RETURNS TABLE(success boolean, error_message text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_referrer_user_id uuid;
  v_calculated_minutes integer;
BEGIN
  -- Extract referrer user ID from the referral code (assuming code = user_id prefix)
  -- In practice, you might have a referral_codes table
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
  -- This is now server-controlled, not client-controlled
  v_calculated_minutes := GREATEST(0, FLOOR((p_purchase_amount * 0.03) / 29));

  -- Insert the referral with server-calculated values
  INSERT INTO public.referral_program (referrer_user_id, referred_user_id, purchase_amount, points_earned)
  VALUES (v_referrer_user_id, p_referred_user_id, p_purchase_amount, v_calculated_minutes);

  RETURN QUERY SELECT true, NULL::text;
END;
$$;

-- Drop the old trigger that uses points_earned from client
DROP TRIGGER IF EXISTS on_referral_purchase ON public.referral_program;
DROP FUNCTION IF EXISTS public.update_user_points();
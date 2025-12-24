-- Create profiles table with user data
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  referral_code text UNIQUE,
  is_banned boolean DEFAULT false,
  last_online_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create user_sessions table to track active sessions with device info
CREATE TABLE public.user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_info text,
  user_agent text,
  ip_address text,
  is_revoked boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '30 days'),
  last_active_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on user_sessions
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Sessions policies
CREATE POLICY "Users can view their own sessions" 
ON public.user_sessions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions" 
ON public.user_sessions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" 
ON public.user_sessions FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions" 
ON public.user_sessions FOR DELETE 
USING (auth.uid() = user_id);

-- Create user_metrics table
CREATE TABLE public.user_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  minutes_balance integer DEFAULT 0,
  current_plan text DEFAULT 'free',
  total_spent integer DEFAULT 0,
  referral_earnings integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on user_metrics
ALTER TABLE public.user_metrics ENABLE ROW LEVEL SECURITY;

-- Metrics policies
CREATE POLICY "Users can view their own metrics" 
ON public.user_metrics FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own metrics" 
ON public.user_metrics FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own metrics" 
ON public.user_metrics FOR UPDATE 
USING (auth.uid() = user_id);

-- Create user_materials table for storing user's educational materials
CREATE TABLE public.user_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  material_type text NOT NULL CHECK (material_type IN ('checklist', 'guide', 'collection', 'recommendation')),
  title text NOT NULL,
  content text,
  is_unlocked boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on user_materials
ALTER TABLE public.user_materials ENABLE ROW LEVEL SECURITY;

-- Materials policies
CREATE POLICY "Users can view their own materials" 
ON public.user_materials FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own materials" 
ON public.user_materials FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own materials" 
ON public.user_materials FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to auto-create profile and metrics on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (user_id, name, email, referral_code)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data ->> 'name', 'Пользователь'), 
    new.email,
    new.id::text
  );
  
  -- Create metrics
  INSERT INTO public.user_metrics (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_metrics_updated_at
  BEFORE UPDATE ON public.user_metrics
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_materials_updated_at
  BEFORE UPDATE ON public.user_materials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
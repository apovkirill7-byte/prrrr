CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: update_user_points(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_user_points() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  -- Update total points for referrer
  INSERT INTO public.user_points (user_id, total_points)
  VALUES (NEW.referrer_user_id, NEW.points_earned)
  ON CONFLICT (user_id)
  DO UPDATE SET 
    total_points = user_points.total_points + NEW.points_earned,
    updated_at = now();
  
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: promocodes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.promocodes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    code text NOT NULL,
    discount_percent integer NOT NULL,
    max_uses integer,
    current_uses integer DEFAULT 0,
    active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone,
    CONSTRAINT promocodes_discount_percent_check CHECK (((discount_percent > 0) AND (discount_percent <= 100)))
);


--
-- Name: referral_program; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.referral_program (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    referrer_user_id uuid NOT NULL,
    referred_user_id uuid NOT NULL,
    points_earned integer DEFAULT 0,
    purchase_amount integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_points; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_points (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    total_points integer DEFAULT 0,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_promocodes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_promocodes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    promocode_id uuid NOT NULL,
    used_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_tasks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_tasks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    task_id text NOT NULL,
    started_at timestamp with time zone,
    completed_at timestamp with time zone,
    points_earned integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: promocodes promocodes_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promocodes
    ADD CONSTRAINT promocodes_code_key UNIQUE (code);


--
-- Name: promocodes promocodes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promocodes
    ADD CONSTRAINT promocodes_pkey PRIMARY KEY (id);


--
-- Name: referral_program referral_program_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.referral_program
    ADD CONSTRAINT referral_program_pkey PRIMARY KEY (id);


--
-- Name: referral_program referral_program_referred_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.referral_program
    ADD CONSTRAINT referral_program_referred_user_id_key UNIQUE (referred_user_id);


--
-- Name: user_points user_points_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_points
    ADD CONSTRAINT user_points_pkey PRIMARY KEY (id);


--
-- Name: user_points user_points_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_points
    ADD CONSTRAINT user_points_user_id_key UNIQUE (user_id);


--
-- Name: user_promocodes user_promocodes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_promocodes
    ADD CONSTRAINT user_promocodes_pkey PRIMARY KEY (id);


--
-- Name: user_promocodes user_promocodes_user_id_promocode_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_promocodes
    ADD CONSTRAINT user_promocodes_user_id_promocode_id_key UNIQUE (user_id, promocode_id);


--
-- Name: user_tasks user_tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_tasks
    ADD CONSTRAINT user_tasks_pkey PRIMARY KEY (id);


--
-- Name: user_tasks user_tasks_user_id_task_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_tasks
    ADD CONSTRAINT user_tasks_user_id_task_id_key UNIQUE (user_id, task_id);


--
-- Name: idx_user_tasks_task_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_tasks_task_id ON public.user_tasks USING btree (task_id);


--
-- Name: idx_user_tasks_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_tasks_user_id ON public.user_tasks USING btree (user_id);


--
-- Name: referral_program on_referral_purchase; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER on_referral_purchase AFTER INSERT OR UPDATE ON public.referral_program FOR EACH ROW EXECUTE FUNCTION public.update_user_points();


--
-- Name: user_promocodes user_promocodes_promocode_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_promocodes
    ADD CONSTRAINT user_promocodes_promocode_id_fkey FOREIGN KEY (promocode_id) REFERENCES public.promocodes(id) ON DELETE CASCADE;


--
-- Name: promocodes Anyone can view active promocodes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view active promocodes" ON public.promocodes FOR SELECT USING ((active = true));


--
-- Name: referral_program Users can create referrals; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create referrals" ON public.referral_program FOR INSERT WITH CHECK ((auth.uid() = referrer_user_id));


--
-- Name: user_points Users can insert their own points; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own points" ON public.user_points FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: user_promocodes Users can insert their own promocode usage; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own promocode usage" ON public.user_promocodes FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: user_tasks Users can insert their own tasks; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own tasks" ON public.user_tasks FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: user_points Users can update their own points; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own points" ON public.user_points FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: user_tasks Users can update their own tasks; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own tasks" ON public.user_tasks FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: user_points Users can view their own points; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own points" ON public.user_points FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: user_promocodes Users can view their own promocode usage; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own promocode usage" ON public.user_promocodes FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: user_tasks Users can view their own tasks; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own tasks" ON public.user_tasks FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: referral_program Users can view their referrals; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their referrals" ON public.referral_program FOR SELECT USING (((auth.uid() = referrer_user_id) OR (auth.uid() = referred_user_id)));


--
-- Name: promocodes; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.promocodes ENABLE ROW LEVEL SECURITY;

--
-- Name: referral_program; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.referral_program ENABLE ROW LEVEL SECURITY;

--
-- Name: user_points; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;

--
-- Name: user_promocodes; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_promocodes ENABLE ROW LEVEL SECURITY;

--
-- Name: user_tasks; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_tasks ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--



/*
  # Create application tables

  1. New Tables
    - `profiles` - User profiles with premium status and AI usage
    - `user_completed_topics` - Track completed lessons
    - `user_snippets` - Store saved code snippets

  2. Functions
    - `update_updated_at_column` - Automatically update timestamps

  3. Security
    - RLS policies for all tables
    - Appropriate user access controls
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    is_premium_user boolean DEFAULT false,
    ai_query_count integer DEFAULT 0,
    last_ai_query_date date,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (id = auth.uid());

CREATE POLICY "Users can update their own profile"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Create user_completed_topics table
CREATE TABLE IF NOT EXISTS public.user_completed_topics (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    topic_id text NOT NULL,
    completed_at timestamptz DEFAULT now(),
    UNIQUE(user_id, topic_id)
);

ALTER TABLE public.user_completed_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their completed topics"
    ON public.user_completed_topics
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can insert their completed topics"
    ON public.user_completed_topics
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Create user_snippets table
CREATE TABLE IF NOT EXISTS public.user_snippets (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    code text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.user_snippets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their snippets"
    ON public.user_snippets
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can insert their snippets"
    ON public.user_snippets
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their snippets"
    ON public.user_snippets
    FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their snippets"
    ON public.user_snippets
    FOR DELETE
    TO authenticated
    USING (user_id = auth.uid());

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_snippets_updated_at
    BEFORE UPDATE ON public.user_snippets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
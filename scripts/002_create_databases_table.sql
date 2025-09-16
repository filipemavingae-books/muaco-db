-- Create databases table for user-created databases
CREATE TABLE IF NOT EXISTS public.databases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  uuid TEXT NOT NULL UNIQUE,
  api_key TEXT NOT NULL UNIQUE,
  api_link TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.databases ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "databases_select_own" ON public.databases FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "databases_insert_own" ON public.databases FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "databases_update_own" ON public.databases FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "databases_delete_own" ON public.databases FOR DELETE USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_databases_user_id ON public.databases(user_id);
CREATE INDEX IF NOT EXISTS idx_databases_uuid ON public.databases(uuid);
CREATE INDEX IF NOT EXISTS idx_databases_api_key ON public.databases(api_key);

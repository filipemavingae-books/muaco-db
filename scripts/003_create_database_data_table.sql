-- Create table to store dynamic data for each database
CREATE TABLE IF NOT EXISTS public.database_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  database_uuid TEXT NOT NULL REFERENCES public.databases(uuid) ON DELETE CASCADE,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.database_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow access if user owns the database
CREATE POLICY "database_data_select_own" ON public.database_data 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.databases 
    WHERE databases.uuid = database_data.database_uuid 
    AND databases.user_id = auth.uid()
  )
);

CREATE POLICY "database_data_insert_own" ON public.database_data 
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.databases 
    WHERE databases.uuid = database_data.database_uuid 
    AND databases.user_id = auth.uid()
  )
);

CREATE POLICY "database_data_update_own" ON public.database_data 
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.databases 
    WHERE databases.uuid = database_data.database_uuid 
    AND databases.user_id = auth.uid()
  )
);

CREATE POLICY "database_data_delete_own" ON public.database_data 
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.databases 
    WHERE databases.uuid = database_data.database_uuid 
    AND databases.user_id = auth.uid()
  )
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_database_data_uuid ON public.database_data(database_uuid);
CREATE INDEX IF NOT EXISTS idx_database_data_created_at ON public.database_data(created_at);

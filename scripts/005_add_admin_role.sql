-- Add admin role to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'));

-- Create admin policies
CREATE POLICY "admins_can_view_all_users" ON public.users FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.users admin_user 
    WHERE admin_user.id = auth.uid() 
    AND admin_user.role = 'admin'
  )
);

CREATE POLICY "admins_can_view_all_databases" ON public.databases FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.users admin_user 
    WHERE admin_user.id = auth.uid() 
    AND admin_user.role = 'admin'
  )
);

CREATE POLICY "admins_can_view_all_payments" ON public.payments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.users admin_user 
    WHERE admin_user.id = auth.uid() 
    AND admin_user.role = 'admin'
  )
);

-- Create first admin user (update with your email)
-- UPDATE public.users SET role = 'admin' WHERE email = 'admin@muacodb.com';

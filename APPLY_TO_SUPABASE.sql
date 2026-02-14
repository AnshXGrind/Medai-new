-- =====================================================
-- APPLY THIS MIGRATION TO YOUR SUPABASE PROJECT
-- =====================================================
-- Location: Supabase Dashboard → SQL Editor → New Query
-- Paste this entire file and click "RUN"
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- 1. USER PROFILES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE,
  full_name text NOT NULL,
  role text DEFAULT 'patient' CHECK (role IN ('patient', 'doctor', 'admin', 'asha_worker')),
  medical_id text, -- For doctors (license number)
  health_id_number text, -- For patients (14-digit health ID)
  avatar_url text,
  phone_number text,
  date_of_birth date,
  gender text CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  address jsonb DEFAULT '{}'::jsonb,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 2. RLS POLICIES FOR PROFILES
-- =====================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Doctors can view patient profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Doctors can view other profiles (for consultations)
CREATE POLICY "Doctors can view patient profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles AS p
      WHERE p.id = auth.uid() AND p.role = 'doctor'
    )
  );

-- Admins can manage all profiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles AS p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- =====================================================
-- 3. AUTO-CREATE PROFILE ON USER SIGNUP
-- =====================================================

-- Drop existing function and trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Function to create profile automatically
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    role, 
    medical_id, 
    health_id_number
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'patient'),
    NEW.raw_user_meta_data->>'medical_id',
    NEW.raw_user_meta_data->>'health_id_number'
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail user creation
    RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 4. AUTO-UPDATE TIMESTAMP
-- =====================================================

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS handle_profiles_updated_at ON public.profiles;
DROP FUNCTION IF EXISTS public.handle_updated_at();

-- Function to update timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating timestamp
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- 5. INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_health_id ON public.profiles(health_id_number);
CREATE INDEX IF NOT EXISTS idx_profiles_medical_id ON public.profiles(medical_id);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON public.profiles(created_at DESC);

-- =====================================================
-- 6. GRANT PERMISSIONS
-- =====================================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO anon;

-- =====================================================
-- 7. VERIFICATION & SUCCESS MESSAGE
-- =====================================================

DO $$
DECLARE
  profile_count INTEGER;
BEGIN
  -- Count existing profiles
  SELECT COUNT(*) INTO profile_count FROM public.profiles;
  
  RAISE NOTICE '';
  RAISE NOTICE '✅ ================================================';
  RAISE NOTICE '✅ MIGRATION COMPLETED SUCCESSFULLY!';
  RAISE NOTICE '✅ ================================================';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Current State:';
  RAISE NOTICE '   • Profiles table: CREATED';
  RAISE NOTICE '   • RLS policies: ENABLED (5 policies)';
  RAISE NOTICE '   • Auto-profile trigger: ACTIVE';
  RAISE NOTICE '   • Existing profiles: %', profile_count;
  RAISE NOTICE '';
  RAISE NOTICE '🎯 Next Steps:';
  RAISE NOTICE '   1. Test user signup in your app';
  RAISE NOTICE '   2. Check profiles table for new user';
  RAISE NOTICE '   3. Verify RLS policies work correctly';
  RAISE NOTICE '';
  RAISE NOTICE '🔒 Security: RLS is ENABLED';
  RAISE NOTICE '   • Users can only see their own profile';
  RAISE NOTICE '   • Doctors can view patient profiles';
  RAISE NOTICE '   • Admins have full access';
  RAISE NOTICE '';
END $$;

-- =====================================================
-- OPTIONAL: CREATE SAMPLE ADMIN USER
-- =====================================================
-- Uncomment and customize if you want to create an admin account manually
-- 
-- INSERT INTO auth.users (
--   id,
--   email,
--   encrypted_password,
--   email_confirmed_at,
--   raw_user_meta_data
-- ) VALUES (
--   gen_random_uuid(),
--   'admin@medai.com',
--   crypt('AdminPassword123!', gen_salt('bf')),
--   now(),
--   '{"full_name": "System Admin", "role": "admin"}'::jsonb
-- ) ON CONFLICT (email) DO NOTHING;

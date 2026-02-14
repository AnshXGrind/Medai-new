import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { toast } from "sonner";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if Supabase is properly configured
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.error('❌ Supabase environment variables not configured!');
      console.error('Please check your .env file and add:');
      console.error('VITE_SUPABASE_URL=your-supabase-url');
      console.error('VITE_SUPABASE_ANON_KEY=your-supabase-anon-key');
      toast.error("Configuration Error: Supabase credentials missing");
      setLoading(false);
      return;
    }

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('🔐 Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle specific auth events
        if (event === 'SIGNED_IN') {
          console.log('✅ User signed in successfully');
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 User signed out');
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('🔄 Token refreshed');
        } else if (event === 'USER_UPDATED') {
          console.log('📝 User updated');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('❌ Error getting session:', error);
        toast.error("Failed to restore session");
      }
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string, 
    password: string, 
    fullName: string, 
    userType: "patient" | "doctor", 
    medicalId?: string,
    healthIdNumber?: string
  ) => {
    try {
      console.log('📝 Starting registration process...');
      console.log('User type:', userType);
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            role: userType,
            ...(medicalId && { medical_id: medicalId }),
            ...(healthIdNumber && { health_id_number: healthIdNumber })
          }
        }
      });

      if (error) {
        console.error('❌ Sign up error:', error);
        throw error;
      }

      if (!data.user) {
        throw new Error('No user data returned from signup');
      }

      console.log('✅ User created successfully:', data.user.id);

      // Check if email confirmation is required
      if (data.user && !data.session) {
        toast.info("Please check your email to confirm your account");
        return { data, error: null };
      }

      toast.success("Account created successfully!");
      
      // Redirect based on user type
      if (userType === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/patient-dashboard");
      }

      return { data, error: null };
    } catch (error: unknown) {
      console.error("Sign up error:", error);
      let errorMessage = "Failed to create account";
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Handle specific Supabase errors
        if (errorMessage.includes('User already registered')) {
          errorMessage = 'An account with this email already exists';
        } else if (errorMessage.includes('Password should be')) {
          errorMessage = 'Password must be at least 6 characters';
        } else if (errorMessage.includes('Invalid email')) {
          errorMessage = 'Please enter a valid email address';
        } else if (errorMessage.includes('fetch')) {
          errorMessage = 'Connection error - check your internet and Supabase configuration';
        }
      }
      
      toast.error(errorMessage);
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Attempting sign in...');
      console.log('Email:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Sign in response:', { data, error });

      if (error) {
        console.error('❌ Sign in error:', error);
        throw error;
      }

      if (!data.user) {
        throw new Error('No user data returned');
      }

      console.log('✅ Sign in successful');

      toast.success("Signed in successfully!");

      // Try to get user role from metadata first
      const userRole = data.user?.user_metadata?.role;
      console.log('User role:', userRole);
      
      // Redirect based on role
      setTimeout(() => {
        if (userRole === "doctor") {
          navigate("/doctor-dashboard");
        } else {
          navigate("/patient-dashboard");
        }
      }, 500);

      return { data, error: null };
    } catch (error: unknown) {
      console.error("Sign in error:", error);
      let errorMessage = "Invalid email or password";
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Handle specific Supabase errors
        if (errorMessage.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password';
        } else if (errorMessage.includes('Email not confirmed')) {
          errorMessage = 'Please confirm your email before signing in';
        } else if (errorMessage.includes('fetch')) {
          errorMessage = 'Connection error - check your internet and Supabase configuration';
        } else if (errorMessage.includes('Failed to fetch')) {
          errorMessage = '⚠️ Cannot connect to Supabase. Check your environment variables (.env file)';
        }
      }
      
      toast.error(errorMessage);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      console.log('👋 Signing out...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Signed out successfully!");
      navigate("/");
      return { error: null };
    } catch (error: unknown) {
      console.error("Sign out error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to sign out";
      toast.error(errorMessage);
      return { error };
    }
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };
};

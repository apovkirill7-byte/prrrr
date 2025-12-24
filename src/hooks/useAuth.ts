import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  referral_code: string | null;
  is_banned: boolean;
  last_online_at: string;
  created_at: string;
}

interface UserMetrics {
  id: string;
  user_id: string;
  minutes_balance: number;
  current_plan: string;
  total_spent: number;
  referral_earnings: number;
}

interface UserMaterial {
  id: string;
  user_id: string;
  material_type: 'checklist' | 'guide' | 'collection' | 'recommendation';
  title: string;
  content: string | null;
  is_unlocked: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [metrics, setMetrics] = useState<UserMetrics | null>(null);
  const [materials, setMaterials] = useState<UserMaterial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer fetching profile data
        if (session?.user) {
          setTimeout(() => {
            fetchUserData(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setMetrics(null);
          setMaterials([]);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserData(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (profileData) {
        setProfile(profileData as Profile);
      }

      // Fetch metrics
      const { data: metricsData } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (metricsData) {
        setMetrics(metricsData as UserMetrics);
      }

      // Fetch materials
      const { data: materialsData } = await supabase
        .from('user_materials')
        .select('*')
        .eq('user_id', userId);
      
      if (materialsData) {
        setMaterials(materialsData as UserMaterial[]);
      }

      // Update last_online_at
      await supabase
        .from('profiles')
        .update({ last_online_at: new Date().toISOString() })
        .eq('user_id', userId);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setMetrics(null);
    setMaterials([]);
  };

  const updateMetrics = async (updates: Partial<UserMetrics>) => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('user_metrics')
      .update(updates)
      .eq('user_id', user.id)
      .select()
      .single();
    
    if (data && !error) {
      setMetrics(data as UserMetrics);
    }
    
    return { data, error };
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', user.id)
      .select()
      .single();
    
    if (data && !error) {
      setProfile(data as Profile);
    }
    
    return { data, error };
  };

  return {
    user,
    session,
    profile,
    metrics,
    materials,
    loading,
    signOut,
    updateMetrics,
    updateProfile,
    refreshUserData: () => user && fetchUserData(user.id),
  };
}

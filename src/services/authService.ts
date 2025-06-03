import { supabase } from './supabaseClient';
import { useUserStore } from '../stores/useUserStore';

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
  
  if (error) {
    console.error('Error signing in with Google:', error.message);
    throw error;
  }
  
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
  useUserStore.getState().clearUser();
};

export const initializeAuth = () => {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      const { id: uid, email, user_metadata } = session.user;
      const displayName = user_metadata?.full_name;
      const photoURL = user_metadata?.avatar_url;
      
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', uid)
          .single();
          
        useUserStore.getState().setUser(
          uid,
          displayName || null,
          email || null,
          photoURL || null,
          profile?.is_premium_user || false,
          profile?.ai_query_count || 0,
          profile?.last_ai_query_date || null
        );
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    } else {
      useUserStore.getState().clearUser();
    }
  });
};
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ryckthhfvochlbfahueh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Y2t0aGhmdm9jaGxiZmFodWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3NjkwODUsImV4cCI6MjA2NDM0NTA4NX0.2LuGI192_dBdo7VO2jiBAZA_KvwnZWO7Y9Lya_NTowI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};
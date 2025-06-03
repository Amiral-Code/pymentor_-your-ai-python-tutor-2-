import { createClient } from '@supabase/supabase-js';
import { SavedSnippet } from '../types';
import { useUserStore } from '../stores/useUserStore';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth functions
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
  if (error) throw error;
  return data;
};

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const initializeSupabaseConnection = () => {
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

// Profile management
export const ensureUserProfile = async (userId: string) => {
  const { data: profile, error: getError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (getError && getError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
    throw getError;
  }

  if (!profile) {
    const { data: newProfile, error: insertError } = await supabase
      .from('profiles')
      .insert([{ id: userId }])
      .select()
      .single();

    if (insertError) throw insertError;
    return newProfile;
  }

  return profile;
};

export const updateUserProfile = async (userId: string, updates: {
  is_premium_user?: boolean;
  ai_query_count?: number;
  last_ai_query_date?: string;
}) => {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  if (error) throw error;
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

// Completed topics management
export const saveCompletedTopics = async (userId: string, topicId: string) => {
  const { error } = await supabase
    .from('user_completed_topics')
    .insert([{ user_id: userId, topic_id: topicId }]);

  if (error && error.code !== '23505') { // Ignore unique violation
    throw error;
  }
};

export const loadCompletedTopics = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_completed_topics')
    .select('topic_id')
    .eq('user_id', userId);

  if (error) throw error;

  return data.reduce((acc: Record<string, boolean>, topic) => {
    acc[topic.topic_id] = true;
    return acc;
  }, {});
};

// Playground snippets management
export const savePlaygroundSnippet = async (userId: string, snippet: Omit<SavedSnippet, 'id'>): Promise<SavedSnippet> => {
  const { data, error } = await supabase
    .from('user_snippets')
    .insert([{
      user_id: userId,
      name: snippet.name,
      code: snippet.code,
    }])
    .select()
    .single();

  if (error) throw error;
  return {
    id: data.id,
    name: data.name,
    code: data.code,
    timestamp: new Date(data.created_at).getTime(),
  };
};

export const loadPlaygroundSnippets = async (userId: string): Promise<SavedSnippet[]> => {
  const { data, error } = await supabase
    .from('user_snippets')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map(snippet => ({
    id: snippet.id,
    name: snippet.name,
    code: snippet.code,
    timestamp: new Date(snippet.created_at).getTime(),
  }));
};

export const deletePlaygroundSnippet = async (userId: string, snippetId: string) => {
  const { error } = await supabase
    .from('user_snippets')
    .delete()
    .eq('id', snippetId)
    .eq('user_id', userId);

  if (error) throw error;
};

// Auth state change subscription
export const onAuthStateChange = (callback: (user: any) => void) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });
};
import { createClient } from '@supabase/supabase-js';
import { SavedSnippet } from '../types';
import { useUserStore } from '../stores/useUserStore';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
  
  if (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
  
  return data;
};

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error getting current user:", error);
    return null;
  }
  return user;
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return data;
};

export const updateUserProfile = async (userId: string, updates: any) => {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  if (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const saveCompletedTopics = async (userId: string, topicId: string) => {
  const { error } = await supabase
    .from('user_completed_topics')
    .insert({
      user_id: userId,
      topic_id: topicId,
    });

  if (error && error.code !== '23505') { // Ignore unique violation
    console.error("Error saving completed topic:", error);
    throw error;
  }
};

export const loadCompletedTopics = async (userId: string): Promise<Record<string, boolean>> => {
  const { data, error } = await supabase
    .from('user_completed_topics')
    .select('topic_id')
    .eq('user_id', userId);

  if (error) {
    console.error("Error loading completed topics:", error);
    return {};
  }

  return data.reduce((acc: Record<string, boolean>, topic) => {
    acc[topic.topic_id] = true;
    return acc;
  }, {});
};

export const savePlaygroundSnippet = async (userId: string, snippet: Omit<SavedSnippet, 'id'>): Promise<SavedSnippet> => {
  const { data, error } = await supabase
    .from('user_snippets')
    .insert({
      user_id: userId,
      name: snippet.name,
      code: snippet.code,
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving playground snippet:", error);
    throw error;
  }

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

  if (error) {
    console.error("Error loading playground snippets:", error);
    return [];
  }

  return data.map(snippet => ({
    id: snippet.id,
    name: snippet.name,
    code: snippet.code,
    timestamp: new Date(snippet.created_at).getTime(),
  }));
};

export const deletePlaygroundSnippet = async (userId: string, snippetId: string): Promise<void> => {
  const { error } = await supabase
    .from('user_snippets')
    .delete()
    .eq('id', snippetId)
    .eq('user_id', userId);

  if (error) {
    console.error("Error deleting playground snippet:", error);
    throw error;
  }
};

export const initializeSupabase = () => {
  supabase.auth.onAuthStateChange((event, session) => {
    const user = session?.user;
    if (user) {
      console.log("Supabase Auth: User signed in - ", user.id);
      getUserProfile(user.id).then(profile => {
        useUserStore.getState().setUser(
          user.id,
          user.user_metadata?.full_name || null,
          user.email,
          user.user_metadata?.avatar_url || null,
          profile?.is_premium_user || false,
          profile?.ai_query_count || 0,
          profile?.last_ai_query_date || null
        );
      });
    } else {
      console.log("Supabase Auth: User signed out.");
      useUserStore.getState().clearUser();
    }
  });
};
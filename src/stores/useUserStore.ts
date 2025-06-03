import { create } from 'zustand';
import { updateUserProfile } from '../services/supabaseService';

const MAX_FREE_AI_QUERIES = 5;

interface UserState {
  // User Info
  userId: string | null;
  userDisplayName: string | null;
  userEmail: string | null;
  userPhotoURL: string | null;

  // App specific user settings
  isPremiumUser: boolean;
  aiQueryCount: number;
  lastAiQueryDate: string | null; // Store as YYYY-MM-DD
  maxFreeAiQueries: number;

  // Actions
  setUser: (
    uid: string, 
    displayName: string | null, 
    email: string | null, 
    photoURL: string | null,
    isPremium?: boolean,
    aiCount?: number,
    lastAiDate?: string | null
  ) => void;
  clearUser: () => void;
  togglePremium: () => void;
  incrementAiQueryCount: () => void;
  canUseAi: () => boolean;
  getRemainingAiQueries: () => number;
  setUserDataFromFirestore: (data: { isPremiumUser?: boolean; aiQueryCount?: number; lastAiQueryDate?: string | null; }) => void;
}

const getTodayDateString = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

export const useUserStore = create<UserState>()(
    (set, get) => ({
      // User Info
      userId: null,
      userDisplayName: null,
      userEmail: null,
      userPhotoURL: null,

      // App specific user settings
      isPremiumUser: false,
      aiQueryCount: 0,
      lastAiQueryDate: null,
      maxFreeAiQueries: MAX_FREE_AI_QUERIES,

      setUser: (uid, displayName, email, photoURL, isPremium = false, aiCount = 0, lastAiDate = null) => {
        const today = getTodayDateString();
        let resolvedAiCount = aiCount;
        let resolvedLastAiDate = lastAiDate;

        if (lastAiDate !== today) {
          resolvedAiCount = 0;
          resolvedLastAiDate = today;
        }

        set({ 
          userId: uid, 
          userDisplayName: displayName,
          userEmail: email,
          userPhotoURL: photoURL,
          isPremiumUser: isPremium,
          aiQueryCount: resolvedAiCount,
          lastAiQueryDate: resolvedLastAiDate,
        });
      },

      clearUser: () => set({
        userId: null,
        userDisplayName: null,
        userEmail: null,
        userPhotoURL: null,
        isPremiumUser: false,
        aiQueryCount: 0,
        lastAiQueryDate: null,
      }),
      
      setUserDataFromFirestore: (data) => {
        const today = getTodayDateString();
        let currentAiCount = data.aiQueryCount ?? get().aiQueryCount;
        let currentLastAiDate = data.lastAiQueryDate ?? get().lastAiQueryDate;

        if (currentLastAiDate !== today) {
            currentAiCount = 0;
        }
        
        set(state => ({
          ...state,
          isPremiumUser: data.isPremiumUser ?? state.isPremiumUser,
          aiQueryCount: currentAiCount,
          lastAiQueryDate: currentLastAiDate,
        }));
      },

      togglePremium: async () => {
        const uid = get().userId;
        if (!uid) {
          console.warn("Cannot toggle premium: no user logged in.");
          alert("Please log in to manage premium status.");
          return;
        }
        const newPremiumStatus = !get().isPremiumUser;
        set({ isPremiumUser: newPremiumStatus });
        try {
          await updateUserProfile(uid, { is_premium_user: newPremiumStatus });
          console.log("Premium status updated in Supabase.");
        } catch (error) {
          console.error("Failed to update premium status in Supabase:", error);
          set({ isPremiumUser: !newPremiumStatus });
          alert("Failed to update premium status. Please try again.");
        }
      },

      incrementAiQueryCount: async () => {
        const uid = get().userId;
        if (!uid && !get().isPremiumUser) {
            console.warn("Attempting to increment AI query count for non-logged-in user.");
        }

        const today = getTodayDateString();
        let currentCount = get().aiQueryCount;
        let currentLastDate = get().lastAiQueryDate;

        if (currentLastDate !== today) {
          currentCount = 0;
          currentLastDate = today;
        }
        
        if (!get().isPremiumUser && currentCount < get().maxFreeAiQueries) {
            const newCount = currentCount + 1;
            set({ aiQueryCount: newCount, lastAiQueryDate: currentLastDate });
            if (uid) {
              try {
                await updateUserProfile(uid, { 
                  ai_query_count: newCount, 
                  last_ai_query_date: currentLastDate 
                });
              } catch (error) {
                console.error("Failed to update AI query count in Supabase:", error);
              }
            }
        } else if (get().isPremiumUser && uid) {
            if (currentLastDate !== today) {
                 set({ lastAiQueryDate: today });
                 try {
                    await updateUserProfile(uid, { last_ai_query_date: today });
                } catch (error) {
                    console.error("Failed to update last AI query date for premium user:", error);
                }
            }
        }
      },

      canUseAi: () => {
        if (get().isPremiumUser) {
          return true;
        }
        const today = getTodayDateString();
        if (get().lastAiQueryDate !== today) {
          return true; 
        }
        return get().aiQueryCount < get().maxFreeAiQueries;
      },
      
      getRemainingAiQueries: () => {
        if (get().isPremiumUser) {
            return Infinity; 
        }
        const today = getTodayDateString();
        if (get().lastAiQueryDate !== today) {
            return get().maxFreeAiQueries;
        }
        return Math.max(0, get().maxFreeAiQueries - get().aiQueryCount);
      }
    })
);
// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { 
  getAuth, 
  Auth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  User as FirebaseUser,
  onAuthStateChanged
} from "firebase/auth";
import { 
  getFirestore, 
  Firestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  Timestamp,
  query,
  orderBy
} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Analytics can be added if needed

import { SavedSnippet } from '../types';
import { useUserStore } from '../stores/useUserStore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJeUActkeAogfjaKvkmzeEIhcAWvXXUyY", // This was provided in the prompt
  authDomain: "gen-lang-client-0834411929.firebaseapp.com",
  projectId: "gen-lang-client-0834411929",
  storageBucket: "gen-lang-client-0834411929.firebasestorage.app",
  messagingSenderId: "454645355832",
  appId: "1:454645355832:web:bee37028d008ce8ced9dcd",
  measurementId: "G-Q8BX8CGD61"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
// const analytics = getAnalytics(app); // Uncomment if you want to use analytics

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<FirebaseUser | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    // You might want to create a user document in Firestore here if it doesn't exist
    await ensureUserProfile(user.uid, { 
        email: user.email, 
        displayName: user.displayName,
        photoURL: user.photoURL 
    });
    return user;
  } catch (error: any) {
    console.error("Error signing in with Google:", error);
    // Handle specific errors (e.g., popup_closed_by_user) if needed
    if (error.code === 'auth/popup-closed-by-user') {
        alert("Sign-in cancelled. Please try again if you wish to sign in.");
    } else {
        alert(`Login failed: ${error.message}`);
    }
    return null;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    alert(`Sign out failed: ${error.message}`);
  }
};

export const onAuthUserChanged = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = (): FirebaseUser | null => {
  return auth.currentUser;
};


// Firestore User Profile Management
interface UserProfileData {
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  isPremiumUser?: boolean;
  aiQueryCount?: number;
  lastAiQueryDate?: string | null; // YYYY-MM-DD
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const ensureUserProfile = async (userId: string, initialData: UserProfileData = {}): Promise<UserProfileData> => {
  const userDocRef = doc(db, "users", userId);
  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfileData;
    } else {
      const profileData: UserProfileData = {
        isPremiumUser: false,
        aiQueryCount: 0,
        lastAiQueryDate: null,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        ...initialData,
      };
      await setDoc(userDocRef, profileData);
      return profileData;
    }
  } catch (error) {
    console.error("Error ensuring user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfileData>): Promise<void> => {
  const userDocRef = doc(db, "users", userId);
  try {
    await setDoc(userDocRef, { ...data, updatedAt: Timestamp.now() }, { merge: true });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (userId: string): Promise<UserProfileData | null> => {
  const userDocRef = doc(db, "users", userId);
  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfileData;
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};


// Completed Topics Management
export const saveCompletedTopics = async (userId: string, completedTopics: Record<string, boolean>): Promise<void> => {
  const topicsDocRef = doc(db, "users", userId, "progress", "completedTopics");
  try {
    await setDoc(topicsDocRef, completedTopics);
  } catch (error) {
    console.error("Error saving completed topics:", error);
    throw error;
  }
};

export const loadCompletedTopics = async (userId: string): Promise<Record<string, boolean>> => {
  const topicsDocRef = doc(db, "users", userId, "progress", "completedTopics");
  try {
    const docSnap = await getDoc(topicsDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as Record<string, boolean>;
    }
    return {};
  } catch (error) {
    console.error("Error loading completed topics:", error);
    return {}; // Return empty on error to prevent app crash
  }
};

// Playground Snippets Management
export const savePlaygroundSnippet = async (userId: string, snippet: Omit<SavedSnippet, 'id'>): Promise<SavedSnippet> => {
  const snippetsColRef = collection(db, "users", userId, "snippets");
  try {
    const docRef = await addDoc(snippetsColRef, { ...snippet, timestamp: Timestamp.fromMillis(snippet.timestamp) });
    return { ...snippet, id: docRef.id };
  } catch (error) {
    console.error("Error saving playground snippet:", error);
    throw error;
  }
};

export const loadPlaygroundSnippets = async (userId: string): Promise<SavedSnippet[]> => {
  const snippetsColRef = collection(db, "users", userId, "snippets");
  const q = query(snippetsColRef, orderBy("timestamp", "desc"));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return { 
        id: docSnap.id, 
        name: data.name,
        code: data.code,
        // Convert Firestore Timestamp to number if necessary, or store as number
        timestamp: (data.timestamp as Timestamp).toMillis() 
      } as SavedSnippet;
    });
  } catch (error) {
    console.error("Error loading playground snippets:", error);
    return [];
  }
};

export const deletePlaygroundSnippet = async (userId: string, snippetId: string): Promise<void> => {
  const snippetDocRef = doc(db, "users", userId, "snippets", snippetId);
  try {
    await deleteDoc(snippetDocRef);
  } catch (error) {
    console.error("Error deleting playground snippet:", error);
    throw error;
  }
};


// This function should be called once when the app initializes.
export const initializeFirebaseConnection = () => {
    console.log("Firebase app initialized with Project ID:", app.options.projectId);
    
    // Set up the onAuthStateChanged listener to update Zustand store
    onAuthUserChanged(async (firebaseUser) => {
      if (firebaseUser) {
        console.log("Firebase Auth: User signed in - ", firebaseUser.uid, firebaseUser.displayName);
        const profile = await ensureUserProfile(firebaseUser.uid, {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
        });
        useUserStore.getState().setUser(firebaseUser.uid, firebaseUser.displayName, firebaseUser.email, firebaseUser.photoURL, profile.isPremiumUser, profile.aiQueryCount, profile.lastAiQueryDate);
      } else {
        console.log("Firebase Auth: User signed out.");
        useUserStore.getState().clearUser();
      }
    });
};

export { auth, db };

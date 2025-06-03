// Update the imports at the top of the file
import { 
  initializeSupabaseConnection, 
  loadCompletedTopics, 
  saveCompletedTopics,
  getUserProfile 
} from './services/supabaseService';

// Replace initializeFirebaseConnection with initializeSupabaseConnection in useEffect
useEffect(() => {
  initializeSupabaseConnection();

  const initPyodide = async () => {
    setPyodideLoading(true);
    try {
      await initializePyodide();
      setPyodideReady(isPyodideReady());
    } catch (error) {
      console.error("App.tsx: Failed to initialize Pyodide", error);
      setPyodideReady(false);
    } finally {
      setPyodideLoading(false);
    }
  };
  initPyodide();
}, []);
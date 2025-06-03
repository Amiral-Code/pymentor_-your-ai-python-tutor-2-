import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import LessonContent from './components/LessonContent';
import QuizRunner from './components/QuizRunner';
import AIAssistantPanel from './components/AIAssistantPanel';
import PlaygroundView from './components/PlaygroundView';
import UpgradeModal from './components/UpgradeModal';
import LoadingSpinner from './components/LoadingSpinner';
import { PYTHON_LESSONS } from './constants';
import { Topic, QuizQuestion, AIAssistantMode, LessonModule } from './types';
import { initializePyodide, isPyodideReady, runPythonCode as executePython, PythonExecutionResult } from './services/PyodideService';
import { 
  loadCompletedTopics, 
  saveCompletedTopics,
  getUserProfile,
  initializeSupabaseConnection
} from './services/supabaseService';
import { useThemeStore } from './contexts/ThemeContext';
import { useUserStore } from './stores/useUserStore';

type ViewMode = 'lesson' | 'quiz' | 'playground';

const MIN_AI_PANEL_WIDTH = 280; 
const DEFAULT_AI_PANEL_WIDTH = 384;

const App: React.FC = () => {
  const { 
    userId, 
    isPremiumUser, 
    togglePremium, 
    setUserDataFromFirestore 
  } = useUserStore();

  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion[] | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('lesson');

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [aiPanelWidth, setAiPanelWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const savedWidth = localStorage.getItem('aiPanelWidth');
      return savedWidth ? parseInt(savedWidth, 10) : DEFAULT_AI_PANEL_WIDTH;
    }
    return DEFAULT_AI_PANEL_WIDTH;
  });
  const [isResizing, setIsResizing] = useState(false);
  const appContainerRef = useRef<HTMLDivElement>(null);
  const aiPanelRef = useRef<{ setInitialMessage: (message: string, mode?: AIAssistantMode) => void }>(null);

  const [pyodideLoading, setPyodideLoading] = useState(true);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});
  
  const [upgradeModalInfo, setUpgradeModalInfo] = useState<{ featureName: string } | null>(null);

  useThemeStore();

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

  useEffect(() => {
    const loadInitialData = async () => {
      setAppLoading(true);
      if (userId) {
        console.log("App.tsx: User logged in, fetching data for", userId);
        try {
          const [userProfile, topics] = await Promise.all([
            getUserProfile(userId),
            loadCompletedTopics(userId)
          ]);

          if (userProfile) {
            setUserDataFromFirestore({
              isPremiumUser: userProfile.is_premium_user,
              aiQueryCount: userProfile.ai_query_count,
              lastAiQueryDate: userProfile.last_ai_query_date
            });
          }
          setCompletedTopics(topics);
          console.log("App.tsx: User data and completed topics loaded.");
        } catch (error) {
          console.error("App.tsx: Error loading user data from Supabase:", error);
          setCompletedTopics({});
        }
      } else {
        console.log("App.tsx: User logged out or no user, resetting local data.");
        setCompletedTopics({});
      }

      let initialModule: LessonModule | undefined = PYTHON_LESSONS[0];
      let initialTopic: Topic | undefined = initialModule?.topics[0];

      const currentIsPremiumUser = useUserStore.getState().isPremiumUser;

      if (initialModule?.isPremium && !currentIsPremiumUser) {
          initialModule = PYTHON_LESSONS.find(m => !m.isPremium);
          initialTopic = initialModule?.topics[0];
      }
      
      if (initialModule && initialTopic) {
          setSelectedModuleId(initialModule.id);
          setSelectedTopicId(initialTopic.id);
          setCurrentTopic(initialTopic);
          setViewMode('lesson');
      } else {
        setCurrentTopic(null);
        setSelectedModuleId(null);
        setSelectedTopicId(null);
      }
      setAppLoading(false);
    };

    loadInitialData();
  }, [userId, setUserDataFromFirestore]);

  // Rest of the component remains unchanged...
  // Include all the existing handlers and JSX
  
  return (
    // Existing JSX remains unchanged
  );
};

export default App;
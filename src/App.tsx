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
  initializeSupabase, 
  loadCompletedTopics, 
  saveCompletedTopics,
  getUserProfile
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
    setUserDataFromSupabase 
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
    initializeSupabase();

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
            setUserDataFromSupabase({
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
  }, [userId, setUserDataFromSupabase]);

  const markTopicAsCompleted = useCallback(async (topicId: string) => {
    if (!userId) {
      console.log("User not logged in. Topic completion not saved to cloud.");
      setCompletedTopics(prev => ({ ...prev, [topicId]: true }));
      return;
    }
    const newCompleted = { ...completedTopics, [topicId]: true };
    setCompletedTopics(newCompleted);
    try {
      await saveCompletedTopics(userId, topicId);
    } catch (error) {
      console.error("Failed to save completed topics to Supabase:", error);
    }
  }, [userId, completedTopics]);

  const handleShowUpgradeModal = (featureName: string) => {
    setUpgradeModalInfo({ featureName });
  };

  const handleSelectTopic = (moduleId: string, topicId: string, isPremiumLocked: boolean) => {
    if (isPremiumLocked) {
        const module = PYTHON_LESSONS.find(m => m.id === moduleId);
        handleShowUpgradeModal(module?.title || 'this lesson');
        return;
    }

    const module = PYTHON_LESSONS.find(m => m.id === moduleId);
    const topic = module?.topics.find(t => t.id === topicId);
    if (topic) {
      setSelectedModuleId(moduleId);
      setSelectedTopicId(topicId);
      setCurrentTopic(topic);
      setViewMode('lesson');
      setCurrentQuiz(null);
      setUpgradeModalInfo(null);
    }
  };

  const handleStartQuiz = (quiz: QuizQuestion[]) => {
    const moduleForCurrentTopic = PYTHON_LESSONS.find(m => m.id === selectedModuleId);
    if (moduleForCurrentTopic?.isPremium && !isPremiumUser) {
        handleShowUpgradeModal(`${currentTopic?.title} Quiz`);
        return;
    }
    setCurrentQuiz(quiz);
    setViewMode('quiz');
    setUpgradeModalInfo(null);
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    if (currentTopic && totalQuestions > 0 && (score / totalQuestions) >= 0.7) {
      markTopicAsCompleted(currentTopic.id);
    }
    setViewMode('lesson');
    setCurrentQuiz(null);
  };
  
  const requestAIErrorExplanation = (code: string, error: string) => {
    const userCanUseAi = useUserStore.getState().canUseAi();
    if (!userCanUseAi) {
        handleShowUpgradeModal("Unlimited AI Assistant Queries");
        return;
    }
    if (!isPremiumUser) {
        useUserStore.getState().incrementAiQueryCount();
    }

    const messageToAI = `Please explain this Python error:\n\nError Output:\n\`\`\`\n${error}\n\`\`\`\n\nFrom this code:\n\`\`\`python\n${code}\n\`\`\``;
    if (aiPanelRef.current?.setInitialMessage) {
      aiPanelRef.current.setInitialMessage(messageToAI, AIAssistantMode.EXPLAIN_CODE);
    } else {
        navigator.clipboard.writeText(messageToAI)
        .then(() => alert("Error details and code copied to clipboard. Please paste it into the AI Assistant."))
        .catch(() => alert("Could not copy to clipboard. Please manually copy the error and code."));
    }
  };

  const handleGoToPlayground = () => {
    setViewMode('playground');
    setCurrentQuiz(null);
    setUpgradeModalInfo(null); 
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleMouseDownOnResizeBar = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !appContainerRef.current) return;
    
    const appRect = appContainerRef.current.getBoundingClientRect();
    let newWidth = appRect.right - e.clientX;

    const mainContentElement = appContainerRef.current.querySelector('main > div > article, main > div > div[class*="QuizRunner"], main > div > div[class*="PlaygroundView"]');
    const minMainContentWidth = 300; 
    
    if (mainContentElement) {
        const sidebarWidth = isSidebarOpen ? (appContainerRef.current.querySelector('aside:not([style*="width:0px"])')?.getBoundingClientRect().width || 0) : 0;
        const availableSpace = appContainerRef.current.offsetWidth - sidebarWidth;
        
        if (availableSpace - newWidth < minMainContentWidth) {
            newWidth = availableSpace - minMainContentWidth;
        }
    }

    if (newWidth < MIN_AI_PANEL_WIDTH) {
      newWidth = MIN_AI_PANEL_WIDTH;
    }
    const maxPanelWidth = appContainerRef.current.offsetWidth * 0.7; 
    if (newWidth > maxPanelWidth) {
        newWidth = maxPanelWidth;
    }

    setAiPanelWidth(newWidth);
  }, [isResizing, isSidebarOpen]);

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('aiPanelWidth', aiPanelWidth.toString());
      }
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  }, [isResizing, aiPanelWidth]);

  useEffect(() => {
    if (isResizing) {
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const runPythonCode = async (code: string): Promise<PythonExecutionResult> => {
    if (!pyodideReady) {
      return { stdout: "", stderr: "Python runtime not available.", error: "Python runtime not available." };
    }
    return executePython(code);
  };

  const renderMainContent = () => {
    if (appLoading || (userId && pyodideLoading && viewMode !== 'playground')) {
      return (
        <div className="flex items-center justify-center h-full bg-white">
          <LoadingSpinner text="Loading PyMentor..." size="lg" />
        </div>
      );
    }

    const moduleForCurrentTopic = PYTHON_LESSONS.find(m => m.id === selectedModuleId);
    const isCurrentTopicPremium = moduleForCurrentTopic?.isPremium;

    if (viewMode === 'lesson' && isCurrentTopicPremium && !isPremiumUser && currentTopic) {
         if (!upgradeModalInfo) { 
            handleShowUpgradeModal(currentTopic.title);
         }
    }

    if (viewMode === 'quiz' && currentQuiz && currentTopic) {
        if (isCurrentTopicPremium && !isPremiumUser) {
             if (!upgradeModalInfo) {
                handleShowUpgradeModal(`${currentTopic.title} Quiz`);
            }
            return <LessonContent 
                topic={currentTopic} 
                onStartQuiz={handleStartQuiz} 
                pyodideReady={pyodideReady}
                runPython={runPythonCode}
                pyodideLoading={pyodideLoading}
                onRequestAIErrorExplanation={requestAIErrorExplanation}
              />;
        }
      return <QuizRunner quizTitle={currentTopic.title + " Quiz"} questions={currentQuiz} onQuizComplete={handleQuizComplete} />;
    }
    if (viewMode === 'playground') {
      return <PlaygroundView 
                runPython={runPythonCode} 
                pyodideReady={pyodideReady} 
                pyodideLoading={pyodideLoading} 
                onRequestAIErrorExplanation={requestAIErrorExplanation}
             />;
    }
    return (
      <LessonContent 
        topic={currentTopic} 
        onStartQuiz={handleStartQuiz} 
        pyodideReady={pyodideReady}
        runPython={runPythonCode}
        pyodideLoading={pyodideLoading}
        onRequestAIErrorExplanation={requestAIErrorExplanation}
      />
    );
  };
  
  const sidebarStyle: React.CSSProperties = isSidebarOpen 
  ? { transition: 'width 0.3s ease-in-out, padding 0.3s ease-in-out', width: '18rem' } 
  : { transition: 'width 0.3s ease-in-out, padding 0.3s ease-in-out', width: '0px', padding: '0', overflow: 'hidden' };

  return (
    <div ref={appContainerRef} className="flex flex-col min-h-screen bg-slate-100">
      <Header onToggleSidebar={toggleSidebar} onGoToPlayground={handleGoToPlayground} />
      <div className="flex flex-1 overflow-hidden">
        <div style={sidebarStyle} className="flex-shrink-0 h-full">
            {isSidebarOpen &&
                <Sidebar
                    modules={PYTHON_LESSONS}
                    selectedTopicId={selectedTopicId}
                    onSelectTopic={handleSelectTopic}
                    completedTopics={completedTopics}
                />
            }
        </div>

        <main className="flex-1 p-0 overflow-y-auto bg-slate-200">
          <div className="h-full"> 
            {renderMainContent()}
          </div>
        </main>

        <div 
          onMouseDown={handleMouseDownOnResizeBar}
          className="w-1.5 bg-slate-300 hover:bg-blue-500 cursor-col-resize flex-shrink-0 transition-colors duration-150"
          title="Resize AI Panel"
        ></div>

        <AIAssistantPanel 
          ref={aiPanelRef}
          style={{ width: `${aiPanelWidth}px`, minWidth: `${MIN_AI_PANEL_WIDTH}px` }} 
          currentTopicTitle={currentTopic?.title}
          onUpgradeNeeded={handleShowUpgradeModal}
        />
      </div>
      <Footer />
      {upgradeModalInfo && (
        <UpgradeModal 
            featureName={upgradeModalInfo.featureName}
            onClose={() => setUpgradeModalInfo(null)}
            onUpgrade={async () => {
                if (!userId) {
                    alert("Please sign in to upgrade to Premium.");
                } else {
                    await togglePremium(); 
                }
                setUpgradeModalInfo(null);
            }}
        />
      )}
    </div>
  );
};

export default App;
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
  initializeSupabaseConnection, 
  loadCompletedTopics, 
  saveCompletedTopic,
  getUserProfile 
} from "./services/supabaseService";
import { useThemeStore } from './contexts/ThemeContext';
import { useUserStore } from './stores/useUserStore';

// Rest of the file remains unchanged until markTopicAsCompleted function

const markTopicAsCompleted = useCallback(async (topicId: string) => {
  if (!userId) {
    console.log("User not logged in. Topic completion not saved.");
    setCompletedTopics(prev => ({ ...prev, [topicId]: true }));
    return;
  }
  try {
    await saveCompletedTopic(userId, topicId);
    setCompletedTopics(prev => ({ ...prev, [topicId]: true }));
  } catch (error) {
    console.error("Failed to save completed topic to Supabase:", error);
  }
}, [userId]);

// Rest of the file remains unchanged
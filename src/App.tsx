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
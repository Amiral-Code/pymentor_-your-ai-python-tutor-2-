
export interface CodeExample {
  id: string;
  title: string;
  code: string;
  explanation?: string;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
}

export interface Topic {
  id: string;
  title: string;
  // Content can be simple text, or use basic HTML for formatting if needed.
  // For now, we'll treat it as string paragraphs.
  contentParagraphs: string[];
  codeExamples?: CodeExample[];
  quiz?: QuizQuestion[];
}

export interface LessonModule {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  isPremium?: boolean; // Added for freemium model
}

export enum AIAssistantMode {
  EXPLAIN_CONCEPT = "EXPLAIN_CONCEPT",
  EXPLAIN_CODE = "EXPLAIN_CODE",
  ASK_QUESTION = "ASK_QUESTION",
  CODE_CHALLENGE = "CODE_CHALLENGE"
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  isCode?: boolean;
}

export interface SavedSnippet {
  id: string;
  name: string;
  code: string;
  timestamp: number; // Keep as number (milliseconds) for JS, Firestore will handle Timestamp conversion
}

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  isPremiumUser?: boolean; // This will come from Firestore user profile
  // Other app-specific user data can be added here
}

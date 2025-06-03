import React, { useState, useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, highlightActiveLine } from '@codemirror/view';
import { defaultKeymap, history, indentWithTab } from '@codemirror/commands';
import { python } from '@codemirror/lang-python';
import { bracketMatching, indentOnInput, syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';

import { PythonExecutionResult } from '../services/PyodideService';
import LoadingSpinner from './LoadingSpinner';
import { SavedSnippet } from '../types';
import { useUserStore } from '../stores/useUserStore';
import { savePlaygroundSnippet, loadPlaygroundSnippets, deletePlaygroundSnippet } from '../services/supabaseService';

interface PlaygroundViewProps {
  pyodideReady: boolean;
  pyodideLoading: boolean;
  runPython: (code: string) => Promise<PythonExecutionResult>;
  onRequestAIErrorExplanation: (code: string, error: string) => void;
}

const PlaygroundView: React.FC<PlaygroundViewProps> = ({
  pyodideReady,
  pyodideLoading,
  runPython,
  onRequestAIErrorExplanation,
}) => {
  const initialCode = 'print("Hello from the PyMentor Playground!")\n\n# Try your Python code here\nfor i in range(5):\n  print(f"Square of {i} is {i*i}")';
  const [code, setCode] = useState<string>(initialCode);
  const [output, setOutput] = useState<PythonExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  const [savedSnippets, setSavedSnippets] = useState<SavedSnippet[]>([]);
  const [snippetName, setSnippetName] = useState('');
  const [showSaveUI, setShowSaveUI] = useState(false);
  
  const { userId } = useUserStore();

  useEffect(() => {
    const fetchSnippets = async () => {
      if (userId) {
        try {
          const snippetsFromDb = await loadPlaygroundSnippets(userId);
          setSavedSnippets(snippetsFromDb);
        } catch (error) {
          console.error("Failed to load snippets:", error);
        }
      } else {
        setSavedSnippets([]);
      }
    };
    fetchSnippets();
  }, [userId]);

  useEffect(() => {
    if (editorContainerRef.current && !editorViewRef.current) {
      const startState = EditorState.create({
        doc: code,
        extensions: [
          lineNumbers(),
          highlightActiveLineGutter(),
          highlightSpecialChars(),
          history(),
          drawSelection(),
          dropCursor(),
          EditorState.allowMultipleSelections.of(true),
          indentOnInput(),
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          bracketMatching(),
          python(),
          keymap.of([...defaultKeymap, indentWithTab]),
          highlightActiveLine(),
          EditorView.lineWrapping,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              // This updates internal state but doesn't setCode to prevent re-render loops here.
            }
          }),
        ],
      });

      const view = new EditorView({
        state: startState,
        parent: editorContainerRef.current,
      });
      
      editorViewRef.current = view;
    }

    return () => {
      if (editorViewRef.current) {
        editorViewRef.current.destroy();
        editorViewRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  useEffect(() => {
    if (editorViewRef.current && editorViewRef.current.state.doc.toString() !== code) {
      editorViewRef.current.dispatch({
        changes: { from: 0, to: editorViewRef.current.state.doc.length, insert: code },
      });
    }
  }, [code]);

  const getCurrentEditorCode = (): string => {
    return editorViewRef.current?.state.doc.toString() || code;
  }

  const handleRunCode = async () => {
    if (!pyodideReady || isRunning || pyodideLoading || !editorViewRef.current) return;

    const currentCode = getCurrentEditorCode();
    if (!currentCode.trim()) return;

    setIsRunning(true);
    setOutput(null);
    try {
      const result = await runPython(currentCode);
      setOutput(result);
    } catch (error: any) {
      setOutput({ stdout: '', stderr: `JavaScript error during execution: ${error.message}`, error: error.message });
    } finally {
      setIsRunning(false);
    }
  };
  
  const handleClearOutput = () => {
    setOutput(null);
  };

  const handleSaveSnippet = async () => {
    if (!userId) {
      alert("Please log in to save snippets.");
      return;
    }
    if (!snippetName.trim() || !editorViewRef.current) {
      alert("Please enter a name for your snippet.");
      return;
    }
    const currentCode = getCurrentEditorCode();
    const newSnippetData: Omit<SavedSnippet, 'id'> = {
      name: snippetName,
      code: currentCode,
      timestamp: Date.now(),
    };
    try {
      const savedSnippetWithId = await savePlaygroundSnippet(userId, newSnippetData);
      setSavedSnippets(prev => [savedSnippetWithId, ...prev].sort((a, b) => b.timestamp - a.timestamp));
      setSnippetName('');
      setShowSaveUI(false);
      alert('Snippet saved!');
    } catch (error) {
      console.error("Failed to save snippet:", error);
      alert("Error saving snippet. Please try again.");
    }
  };

  const handleLoadSnippet = (snippetId: string) => {
    const snippetToLoad = savedSnippets.find(s => s.id === snippetId);
    if (snippetToLoad && editorViewRef.current) {
      setCode(snippetToLoad.code);
      setOutput(null); 
    }
  };

  const handleDeleteSnippet = async (snippetId: string) => {
    if (!userId) {
      alert("Please log in to manage snippets.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      try {
        await deletePlaygroundSnippet(userId, snippetId);
        setSavedSnippets(prev => prev.filter(s => s.id !== snippetId));
      } catch (error) {
        console.error("Failed to delete snippet:", error);
        alert("Error deleting snippet. Please try again.");
      }
    }
  };

  const handleRequestExplainError = () => {
    if (output && (output.stderr || output.error) && onRequestAIErrorExplanation) {
        const currentCode = getCurrentEditorCode();
        onRequestAIErrorExplanation(currentCode, output.stderr || output.error || "Unknown error from playground execution.");
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white shadow-sm h-full flex flex-col overflow-hidden">
      <header className="pb-3 border-b border-slate-200 mb-4">
        <h2 className="text-2xl font-semibold text-slate-800">Python Playground</h2>
        <p className="text-sm text-slate-500">
          {userId 
            ? "Write and run Python code. Your snippets are saved to your account." 
            : "Write and run Python code. Sign in to save your snippets."
          }
        </p>
      </header>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="mb-3 flex items-center space-x-2">
            <button
                onClick={() => {
                    if (!userId) { alert("Please log in to save code."); return; }
                    setShowSaveUI(!showSaveUI);
                }}
                disabled={!userId}
                className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-1.5 px-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={!userId ? "Log in to save snippets" : (showSaveUI ? 'Cancel Save' : 'Save Code')}
            >
                {showSaveUI ? 'Cancel Save' : 'Save Code'}
            </button>
            {userId && savedSnippets.length > 0 && (
                 <select 
                    onChange={(e) => e.target.value && handleLoadSnippet(e.target.value)}
                    defaultValue=""
                    className="text-xs py-1.5 px-3 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-700"
                >
                    <option value="" disabled>Load a saved snippet...</option>
                    {savedSnippets.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({new Date(s.timestamp).toLocaleTimeString()})</option>
                    ))}
                </select>
            )}
        </div>

        {userId && showSaveUI && (
            <div className="mb-3 p-3 border border-slate-300 rounded-md bg-slate-50 flex items-center space-x-2">
                <input 
                    type="text"
                    value={snippetName}
                    onChange={(e) => setSnippetName(e.target.value)}
                    placeholder="Snippet name (e.g., My Algo)"
                    className="flex-grow text-sm p-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <button 
                    onClick={handleSaveSnippet}
                    className="text-xs bg-green-500 hover:bg-green-600 text-white font-medium py-1.5 px-3 rounded-md transition-colors"
                >
                    Save
                </button>
            </div>
        )}

        <div 
            className="mb-4 flex-grow min-h-[200px] h-[40vh] max-h-[50vh] code-editor-container" 
            ref={editorContainerRef}
        >
        </div>

        <div className="mb-4 flex items-center space-x-3">
          <button
            onClick={handleRunCode}
            disabled={!pyodideReady || isRunning || pyodideLoading || (editorViewRef.current && getCurrentEditorCode().trim() === '')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px] transition-colors"
          >
            {isRunning ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Running...
              </>
            ) : pyodideLoading ? (
                 <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading Env...
                </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                  <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" />
                </svg>
                Run Code
              </>
            )}
          </button>
           {output && (
                <button 
                    onClick={handleClearOutput}
                    className="text-sm text-slate-600 hover:text-blue-600 px-3 py-2 rounded-md border border-slate-300 hover:border-blue-500 transition-colors"
                    title="Clear output"
                >
                    Clear Output
                </button>
            )}
            {output && (output.stderr || output.error) && onRequestAIErrorExplanation && (
               <button
                  onClick={handleRequestExplainError}
                  className="text-xs bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-medium py-1.5 px-3 rounded-md transition-colors"
                >
                  Explain Error with AI
              </button>
            )}
        </div>
        
        {(!pyodideReady && !pyodideLoading) && (
          <div className="p-3 my-2 text-sm text-center text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-md">
            Python interactive environment is not available. Please try reloading.
          </div>
        )}

        {output && (
          <div className="flex-1 flex flex-col border border-slate-300 rounded-md bg-slate-800 min-h-0">
            <div className="flex justify-between items-center p-2 bg-slate-100 border-b border-slate-300">
                <h5 className="text-sm font-semibold text-slate-700">Output:</h5>
            </div>
            <pre className="text-sm whitespace-pre-wrap overflow-auto flex-1 p-3 custom-scrollbar text-slate-100">
              {output.stdout && <span className="text-green-400">{output.stdout}</span>}
              {output.stdout && output.stderr && <hr className="my-1 border-slate-700 opacity-50" />}
              {output.stderr && <span className="text-red-400">{output.stderr}</span>}
              {(!output.stdout && !output.stderr && !output.error) && <span className="text-slate-400">(No output produced)</span>}
              {(!output.stderr && output.error) && <span className="text-red-400">{output.error}</span>}
            </pre>
          </div>
        )}
         {!output && isRunning && (
            <div className="flex-1 flex items-center justify-center border border-slate-300 rounded-md bg-slate-100 text-slate-500">
                <LoadingSpinner size="md" text="Executing code..." />
            </div>
         )}
      </div>
      {userId && savedSnippets.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Saved Snippets:</h3>
            <ul className="space-y-1 max-h-32 overflow-y-auto custom-scrollbar text-xs">
                {savedSnippets.map(s => (
                    <li key={s.id} className="flex justify-between items-center p-1.5 bg-slate-100 rounded hover:bg-slate-200">
                        <span className="text-slate-700">{s.name} <em className="text-slate-500">({new Date(s.timestamp).toLocaleDateString()})</em></span>
                        <div>
                            <button onClick={() => handleLoadSnippet(s.id)} className="text-blue-600 hover:text-blue-700 mr-2 font-medium">Load</button>
                            <button onClick={() => handleDeleteSnippet(s.id)} className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
      )}
    </div>
  );
};

export default PlaygroundView;
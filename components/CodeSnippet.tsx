
import React, { useState, useEffect, useRef } from 'react';
import { PythonExecutionResult } from '../services/PyodideService';
import LoadingSpinner from './LoadingSpinner';
import hljs from 'highlight.js';

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
  interactive?: boolean;
  pyodideReady?: boolean;
  runPython?: (code: string) => Promise<PythonExecutionResult>;
  pyodideLoading?: boolean;
  onRequestAIErrorExplanation?: (code: string, error: string) => void;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ 
  code, 
  language = 'python', 
  title, 
  interactive = false,
  pyodideReady = false,
  runPython,
  pyodideLoading = false,
  onRequestAIErrorExplanation,
}) => {
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState<PythonExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code, language]);


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  const handleRunCode = async () => {
    if (!interactive || !runPython || !pyodideReady || isRunning || pyodideLoading) return;

    setIsRunning(true);
    setOutput(null); 
    try {
      const result = await runPython(code);
      setOutput(result);
    } catch (error: any) {
      setOutput({ stdout: '', stderr: `JavaScript error during execution: ${error.message}`, error: error.message });
    } finally {
      setIsRunning(false);
    }
  };

  const handleRequestExplainError = () => {
    if (output && (output.stderr || output.error) && onRequestAIErrorExplanation) {
        onRequestAIErrorExplanation(code, output.stderr || output.error || "Unknown error from code snippet.");
    }
  };

  const canRun = interactive && language === 'python' && runPython;
  const codeBlockBg = language === 'python' ? 'bg-gray-50' : 'bg-slate-100';

  return (
    <div className={`code-snippet-container rounded-lg shadow-lg my-4 overflow-hidden border border-slate-300 ${canRun ? 'ring-1 ring-blue-500' : ''}`}>
      <div className="flex justify-between items-center bg-slate-100 px-4 py-2 border-b border-slate-300">
        <h4 className="text-sm font-medium text-slate-700">
          {title || (canRun ? 'Interactive Example' : 'Code Example')}
        </h4>
        {canRun && (
          <button
            onClick={handleRunCode}
            disabled={!pyodideReady || isRunning || pyodideLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center transition-colors"
          >
            {isRunning ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Running...
              </>
            ) : pyodideLoading ? (
                 <>
                    <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading Env...
                </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                  <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" />
                </svg>
                Run Code
              </>
            )}
          </button>
        )}
      </div>
      <div className={`relative group ${codeBlockBg}`}>
        <pre className="p-4 text-sm overflow-x-auto custom-scrollbar hljs">
          <code ref={codeRef} className={`language-${language} hljs-${language}`}>
            {code}
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-slate-500 hover:bg-slate-400 text-slate-100 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:opacity-100"
          aria-label="Copy code to clipboard"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      {interactive && output && (
        <div className="p-4 border-t border-slate-300 bg-slate-50">
          <div className="flex justify-between items-center mb-1">
            <h5 className="text-xs font-semibold text-slate-500">Output:</h5>
            {output && (output.stderr || output.error) && onRequestAIErrorExplanation && (
              <button
                  onClick={handleRequestExplainError}
                  className="text-xs bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-medium py-1 px-2 rounded-md transition-colors"
                >
                  Explain Error with AI
              </button>
            )}
          </div>
          <pre className="text-xs whitespace-pre-wrap overflow-x-auto max-h-60 custom-scrollbar bg-white p-3 rounded-md border border-slate-200">
            {output.stdout && <span className="text-green-600">{output.stdout}</span>}
            {output.stdout && output.stderr && <hr className="my-1 border-slate-300" />}
            {output.stderr && <span className="text-red-600">{output.stderr}</span>}
            {(!output.stdout && !output.stderr && !output.error) && <span className="text-slate-500">(No output)</span>}
            {(!output.stderr && output.error) && <span className="text-red-600">{output.error}</span>} 
          </pre>
        </div>
      )}
       {interactive && !pyodideReady && !pyodideLoading && (
        <div className="p-2 text-center text-xs text-yellow-700 bg-yellow-100 border-t border-slate-300">
          Python interactive environment not available.
        </div>
      )}
    </div>
  );
};

export default CodeSnippet;


import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Topic, QuizQuestion } from '../types';
import CodeSnippet from './CodeSnippet';
import { PythonExecutionResult } from '../services/PyodideService';

interface LessonContentProps {
  topic: Topic | null;
  onStartQuiz: (quiz: QuizQuestion[]) => void;
  pyodideReady: boolean;
  runPython: (code: string) => Promise<PythonExecutionResult>;
  pyodideLoading: boolean;
  onRequestAIErrorExplanation: (code: string, error: string) => void;
}

const LessonContent: React.FC<LessonContentProps> = ({ 
  topic, 
  onStartQuiz, 
  pyodideReady, 
  runPython,
  pyodideLoading,
  onRequestAIErrorExplanation,
}) => {
  if (!topic) {
    return (
      <div className="p-8 text-center text-slate-500 h-full flex flex-col justify-center items-center bg-white">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Welcome to PyMentor!</h2>
        <p className="text-lg">Select a topic from the sidebar to start learning.</p>
        <div className="mt-8">
          <img src="https://picsum.photos/seed/pymentor_welcome/400/250" alt="Learning illustration" className="mx-auto rounded-lg shadow-md" />
        </div>
      </div>
    );
  }

  return (
    <article className="p-6 md:p-8 bg-white shadow-sm overflow-y-auto h-full custom-scrollbar">
      <header className="pb-3 border-b border-slate-200 mb-6">
        <div className="markdown-content"> {/* Uses global .markdown-content styles from index.html */}
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {`# ${topic.title}`}
          </ReactMarkdown>
        </div>
      </header>
      
      <div className="markdown-content prose-lg max-w-none leading-relaxed"> {/* Uses global .markdown-content styles */}
        {topic.contentParagraphs.map((paragraph, index) => (
          <ReactMarkdown key={index} remarkPlugins={[remarkGfm]}>
            {paragraph}
          </ReactMarkdown>
        ))}
      </div>

      {topic.codeExamples && topic.codeExamples.length > 0 && (
        <div className="my-6">
          <h3 className="text-xl font-semibold text-slate-700 mb-4 mt-8 border-t border-slate-200 pt-6">Code Examples</h3>
          {topic.codeExamples.map((example) => (
            <div key={example.id} className="mb-6 p-4 border border-slate-200 rounded-lg bg-slate-50 shadow-sm">
              {example.title && 
                <div className="markdown-content text-md font-medium text-slate-700 mb-2">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {`#### ${example.title}`}
                  </ReactMarkdown>
                </div>
              }
              <CodeSnippet 
                code={example.code} 
                title={undefined} 
                language="python"
                interactive={true}
                pyodideReady={pyodideReady}
                runPython={runPython}
                pyodideLoading={pyodideLoading}
                onRequestAIErrorExplanation={onRequestAIErrorExplanation}
              />
              {example.explanation && 
                <div className="markdown-content prose-sm max-w-none text-sm mt-3 pl-1 text-slate-600">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {example.explanation}
                  </ReactMarkdown>
                </div>
              }
            </div>
          ))}
        </div>
      )}

      {topic.quiz && topic.quiz.length > 0 && (
        <div className="mt-10 pt-6 border-t border-slate-200 text-center">
          <button
            onClick={() => onStartQuiz(topic.quiz!)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Test Your Knowledge!
          </button>
        </div>
      )}
    </article>
  );
};

export default LessonContent;

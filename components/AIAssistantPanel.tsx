
import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AIAssistantMode, AIMessage } from '../types';
import { explainConcept, explainCode, answerQuestion, generateCodingChallenge, checkCodeSolution, parseAiResponse } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import CodeSnippet from './CodeSnippet';
import { AI_ASSISTANT_INITIAL_MESSAGE } from '../constants';
import { useUserStore } from '../stores/useUserStore'; // Import user store

interface AIAssistantPanelProps {
  style?: React.CSSProperties;
  currentTopicTitle?: string | null;
  onUpgradeNeeded: (featureName: string) => void; // Callback to show upgrade modal
}

export interface AIAssistantPanelRef {
  setInitialMessage: (message: string, mode?: AIAssistantMode) => void;
}

const AIAssistantPanel = forwardRef<AIAssistantPanelRef, AIAssistantPanelProps>(({ style, currentTopicTitle, onUpgradeNeeded }, ref) => {
  const { isPremiumUser, canUseAi, incrementAiQueryCount, getRemainingAiQueries } = useUserStore();
  
  const [mode, setMode] = useState<AIAssistantMode>(AIAssistantMode.ASK_QUESTION);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>([
    { id: Date.now().toString(), sender: 'ai', text: AI_ASSISTANT_INITIAL_MESSAGE }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [showLimitMessage, setShowLimitMessage] = useState(false);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    setInitialMessage: (message, newMode) => {
      setInputValue(message);
      if (newMode) {
        setMode(newMode);
      }
      textareaRef.current?.focus();
      setShowLimitMessage(false); // Reset limit message when new content is auto-filled
    }
  }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  // Update limit message visibility when user status or query count changes
  useEffect(() => {
    if (!isPremiumUser && !canUseAi()) {
        setShowLimitMessage(true);
    } else {
        setShowLimitMessage(false);
    }
  }, [isPremiumUser, canUseAi, messages]); // messages dependency to re-check if they try to send again

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !(mode === AIAssistantMode.CODE_CHALLENGE && !currentChallenge) ) return;

    if (!canUseAi()) {
      setShowLimitMessage(true);
      onUpgradeNeeded("Unlimited AI Assistant Queries");
      return;
    }
    setShowLimitMessage(false);

    const userMessageText = inputValue;
    const userMessage: AIMessage = { id: Date.now().toString(), sender: 'user', text: userMessageText };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    if (!isPremiumUser) {
      incrementAiQueryCount();
    }

    let aiResponseText = '';
    let promptForAI = userMessageText;

    if (currentTopicTitle && (mode === AIAssistantMode.ASK_QUESTION || mode === AIAssistantMode.EXPLAIN_CONCEPT)) {
      promptForAI = `Context: The user is viewing a lesson titled "${currentTopicTitle}".\n\nUser's request: ${userMessageText}`;
    }

    try {
      switch (mode) {
        case AIAssistantMode.EXPLAIN_CONCEPT:
          aiResponseText = await explainConcept(promptForAI);
          break;
        case AIAssistantMode.EXPLAIN_CODE:
          aiResponseText = await explainCode(promptForAI); 
          break;
        case AIAssistantMode.ASK_QUESTION:
          aiResponseText = await answerQuestion(promptForAI);
          break;
        case AIAssistantMode.CODE_CHALLENGE:
          if (currentChallenge && userMessageText.trim()) { 
             aiResponseText = await checkCodeSolution(currentChallenge, userMessageText);
             setCurrentChallenge(null); 
          } else { 
             const difficulty = userMessageText.trim() || "beginner";
             aiResponseText = await generateCodingChallenge(difficulty);
             setCurrentChallenge(aiResponseText); 
          }
          break;
        default:
          aiResponseText = "Sorry, I don't understand that mode.";
      }
    } catch (error) {
      console.error("AI Assistant Error:", error);
      aiResponseText = "Sorry, I encountered an error. Please try again.";
    } finally {
      setIsLoading(false);
      const aiMessage: AIMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, aiMessage]);
    }
  };

  const getPlaceholderText = () => {
    if (showLimitMessage) return "Daily AI query limit reached for free users.";
    switch (mode) {
      case AIAssistantMode.EXPLAIN_CONCEPT: return "e.g., Python decorators, list comprehensions...";
      case AIAssistantMode.EXPLAIN_CODE: return "Paste Python code or an error message here...";
      case AIAssistantMode.ASK_QUESTION: 
        return currentTopicTitle ? `Ask about "${currentTopicTitle}" or general Python...` : "Ask any Python-related question...";
      case AIAssistantMode.CODE_CHALLENGE: return currentChallenge ? "Paste your solution code here..." : "Type difficulty (e.g. intermediate) or click send for beginner";
      default: return "Type your message...";
    }
  };
  
  const ModeButton: React.FC<{ currentMode: AIAssistantMode, targetMode: AIAssistantMode, children: React.ReactNode, onClick: (mode: AIAssistantMode) => void }> = ({ currentMode, targetMode, children, onClick }) => (
    <button
        onClick={() => {
          onClick(targetMode);
          setCurrentChallenge(null); 
          setShowLimitMessage(false); // Reset limit message on mode change
        }}
        className={`px-2.5 py-1.5 text-xs rounded-md transition-colors ${
        currentMode === targetMode 
            ? 'bg-blue-600 text-white' 
            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
        }`}
    >
        {children}
    </button>
  );

  const handleExportChat = () => {
    const formattedChat = messages.map(msg => `${msg.sender.toUpperCase()}: ${msg.text}`).join('\n\n');
    const blob = new Blob([formattedChat], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    link.download = `PyMentor_Chat_${timestamp}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const AiMessageLinkRenderer: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
    const linkColorClasses = 'text-blue-600 hover:text-blue-700';
    return <a {...props} className={`${linkColorClasses} underline`} target="_blank" rel="noopener noreferrer">{props.children}</a>;
  };


  return (
    <aside 
      style={style} 
      className="bg-slate-100 border-l border-slate-300 flex flex-col h-full flex-shrink-0"
    >
      <div className="p-3 sm:p-4 border-b border-slate-300 bg-white">
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-slate-800">AI Assistant</h3>
            <button
                onClick={handleExportChat}
                className="text-xs px-2 py-1 rounded-md text-slate-600 hover:bg-slate-200 transition-colors"
                title="Export Chat History"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 inline-block mr-1">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.105V6.75z" clipRule="evenodd" />
                </svg>
                Export
            </button>
        </div>
        {!isPremiumUser && (
            <p className="text-xs text-slate-500 mt-1">
                {getRemainingAiQueries()} / {useUserStore.getState().maxFreeAiQueries} AI queries remaining today.
            </p>
        )}
        <div className="flex space-x-1 mt-2.5 flex-wrap gap-1">
            <ModeButton currentMode={mode} targetMode={AIAssistantMode.ASK_QUESTION} onClick={setMode}>Question</ModeButton>
            <ModeButton currentMode={mode} targetMode={AIAssistantMode.EXPLAIN_CONCEPT} onClick={setMode}>Concept</ModeButton>
            <ModeButton currentMode={mode} targetMode={AIAssistantMode.EXPLAIN_CODE} onClick={setMode}>Explain Code/Error</ModeButton>
            <ModeButton currentMode={mode} targetMode={AIAssistantMode.CODE_CHALLENGE} onClick={setMode}>Challenge</ModeButton>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 custom-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-sm lg:max-w-md p-3 rounded-xl shadow-sm ${
                msg.sender === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-slate-800 border border-slate-200'
            }`}>
              {parseAiResponse(msg.text).map((part, index) => 
                part.type === 'code' 
                ? <CodeSnippet key={index} code={part.content} language="python" />
                : (
                  <div key={index} className={`markdown-content prose prose-sm max-w-none ${msg.sender === 'ai' ? 'ai-message-text' : ''}`}>
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={msg.sender === 'ai' ? { a: AiMessageLinkRenderer } : {}}
                    >
                      {part.content}
                    </ReactMarkdown>
                  </div>
                  )
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-xl bg-white text-slate-800 border border-slate-200 shadow-sm">
                <LoadingSpinner size="sm" text="PyMentor AI is thinking..." />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 sm:p-4 border-t border-slate-300 bg-white">
         {showLimitMessage && (
            <div className="mb-2 text-center text-xs text-red-600 p-2 bg-red-50 border border-red-200 rounded-md">
              You've reached your daily AI query limit. 
              <button onClick={() => onUpgradeNeeded("Unlimited AI Assistant Queries")} className="ml-1 underline font-semibold hover:text-red-700">Upgrade to Premium</button> for unlimited access.
            </div>
        )}
        <div className="flex items-start space-x-2">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}}
            placeholder={getPlaceholderText()}
            rows={mode === AIAssistantMode.EXPLAIN_CODE || (mode === AIAssistantMode.CODE_CHALLENGE && !!currentChallenge) ? 4 : 2}
            className="flex-1 p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm bg-white text-slate-800 placeholder-slate-400 custom-scrollbar"
            disabled={isLoading || showLimitMessage}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || showLimitMessage || (inputValue.trim() === '' && !(mode === AIAssistantMode.CODE_CHALLENGE && !currentChallenge))}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2.5 rounded-md disabled:opacity-60 h-full flex items-center justify-center aspect-square transition-colors"
            aria-label={mode === AIAssistantMode.CODE_CHALLENGE && !currentChallenge ? "Get Challenge" : "Send Message"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M3.105 3.105a.5.5 0 01.707-.023l12.632 7.205a.5.5 0 01.023.707L3.812 17.618a.5.5 0 01-.73-.482V3.588a.5.5 0 01.023-.482z" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
});

export default AIAssistantPanel;
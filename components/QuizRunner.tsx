
import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizRunnerProps {
  quizTitle: string;
  questions: QuizQuestion[];
  onQuizComplete: (score: number, totalQuestions: number) => void;
}

const QuizRunner: React.FC<QuizRunnerProps> = ({ quizTitle, questions, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | null>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    let currentScore = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setShowResults(true);
  };

  if (showResults) {
    const successRate = questions.length > 0 ? score / questions.length : 0;
    let progressBarColor = 'bg-red-500';
    if (successRate >= 0.7) progressBarColor = 'bg-green-500';
    else if (successRate >= 0.4) progressBarColor = 'bg-yellow-500';

    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[100]" aria-modal="true" role="dialog">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-4">Quiz Results</h2>
          <p className="text-lg text-center text-slate-600 mb-6">{quizTitle}</p>
          
          <p className="text-3xl sm:text-4xl font-bold text-center my-5 text-slate-700">
            You scored <span className="text-blue-600">{score}</span> out of <span className="text-blue-600">{questions.length}</span>!
          </p>
          
          <div className="my-6 h-5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              style={{ width: `${successRate * 100}%` }} 
              className={`h-full rounded-full transition-all duration-700 ease-out text-xs flex items-center justify-center text-white ${progressBarColor}`}
            >
              {`${Math.round(successRate * 100)}%`}
            </div>
          </div>

          <div className="space-y-4 mt-8 mb-6">
            {questions.map((q, index) => {
              const isCorrect = selectedAnswers[q.id] === q.correctOptionIndex;
              const baseBorderColor = isCorrect ? 'border-green-500' : 'border-red-500';
              const baseBgColor = isCorrect ? 'bg-green-50' : 'bg-red-50';
              
              return (
                <div key={q.id} className={`p-4 rounded-lg border-l-4 ${baseBorderColor} ${baseBgColor}`}>
                  <p className="font-semibold text-slate-800">{index + 1}. {q.questionText}</p>
                  <p className="text-sm mt-1 text-slate-700">
                    Your answer: <span className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {selectedAnswers[q.id] !== null && selectedAnswers[q.id] !== undefined ? q.options[selectedAnswers[q.id]!] : "Not answered"}
                    </span>
                  </p>
                  <p className="text-sm text-slate-700">Correct answer: <span className="font-medium text-green-700">{q.options[q.correctOptionIndex]}</span></p>
                  {!isCorrect && q.explanation && (
                    <p className="text-xs text-slate-600 mt-2 p-2 bg-yellow-100 rounded border border-yellow-300"><em>Explanation: {q.explanation}</em></p>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <button 
                onClick={() => onQuizComplete(score, questions.length)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-8 rounded-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Back to Lessons
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isCurrentQuestionAnswered = selectedAnswers[currentQuestion.id] !== null && selectedAnswers[currentQuestion.id] !== undefined;

  return (
    <div className="p-6 md:p-8 bg-white rounded-lg shadow-sm overflow-y-auto h-full custom-scrollbar">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{quizTitle}</h2>
      <p className="text-slate-600 mb-6">Question {currentQuestionIndex + 1} of {questions.length}</p>

      <div key={currentQuestion.id} className="mb-6 p-4 border border-slate-200 rounded-md bg-slate-50">
        <p className="text-lg font-semibold text-slate-700 mb-4">{currentQuestion.questionText}</p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQuestion.id, index)}
              className={`w-full text-left p-3.5 rounded-lg border-2 transition-all duration-150 ease-in-out text-slate-700
                ${selectedAnswers[currentQuestion.id] === index 
                  ? 'bg-blue-500 border-blue-600 text-white shadow-md ring-2 ring-blue-300 ring-offset-1' 
                  : 'bg-white border-slate-300 hover:bg-blue-50 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
              }`}
              aria-pressed={selectedAnswers[currentQuestion.id] === index}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0}
          className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-semibold py-2 px-5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmitQuiz}
            disabled={!isCurrentQuestionAnswered}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizRunner;
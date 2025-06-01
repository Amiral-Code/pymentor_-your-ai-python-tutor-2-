
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', text }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2', // Slightly smaller for text context
    md: 'w-10 h-10 border-4',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center my-4 text-center">
      <div
        className={`animate-spin rounded-full border-blue-500 border-t-transparent ${sizeClasses[size]}`}
        role="status"
        aria-live="polite"
        aria-label={text || "Loading"}
      ></div>
      {text && <p className="mt-2 text-sm text-slate-600">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
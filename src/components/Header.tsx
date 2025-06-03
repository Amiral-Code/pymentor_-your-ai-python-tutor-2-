import React from 'react';
import { PYTHON_ICON_SVG } from '../constants';
import { useUserStore } from '../stores/useUserStore';
import { signInWithGoogle, signOut } from '../services/supabaseClient';

interface HeaderProps {
  onToggleSidebar?: () => void;
  onGoToPlayground?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onGoToPlayground }) => {
  const { 
    isPremiumUser, 
    togglePremium, 
    userId, 
    userDisplayName, 
    userPhotoURL 
  } = useUserStore();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="bg-white text-slate-800 p-3 sm:p-4 shadow-md flex items-center justify-between sticky top-0 z-50 border-b border-slate-200">
      <div className="flex items-center">
        {onToggleSidebar && (
          <button 
            onClick={onToggleSidebar} 
            className="mr-2 sm:mr-3 p-1.5 rounded-md text-slate-600 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-label="Toggle lessons sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        )}
        <span 
          dangerouslySetInnerHTML={{ __html: PYTHON_ICON_SVG }} 
          className="mr-2 sm:mr-3 text-blue-600"
        />
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">PyMentor</h1>
        {userId && isPremiumUser && (
            <span className="ml-2 text-xs bg-yellow-400 text-yellow-800 px-2 py-0.5 rounded-full font-semibold hidden sm:inline">PRO</span>
        )}
      </div>
      <div className="flex items-center space-x-2 sm:space-x-3">
        {onGoToPlayground && (
          <button
            onClick={onGoToPlayground}
            className="text-xs sm:text-sm font-medium px-2.5 py-1.5 rounded-md text-slate-700 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Go to Python Playground"
            title="Python Playground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 mr-1 inline-block">
              <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H2.75a.75.75 0 01-.75-.75V4.75zm13.25.75H4v1.5h11.5V5.5zm0 3H4v1.5h11.5V8.5zm0 3H4v1.5h11.5V11.5zM6.504 14.134a.75.75 0 01.152-.815l1.836-2.066a.25.25 0 000-.306L6.656 8.88A.75.75 0 017.553 10h.001L9.39 11.965a.25.25 0 00.306 0L11.532 10h.001a.75.75 0 01.898-1.12l-.001.002 1.833 2.064a.75.75 0 01-.697 1.19H6.504z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">Playground</span>
          </button>
        )}
        {userId && (
            <button
                onClick={togglePremium}
                className={`text-xs sm:text-sm font-medium px-2.5 py-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 ${
                    isPremiumUser 
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-400'
                    : 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400'
                }`}
                title={isPremiumUser ? "Switch to Free (Dev Toggle)" : "Go Premium (Dev Toggle)"}
            >
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 mr-1 inline-block">
                    <path d="M10.75 16.8a.75.75 0 000-1.5h5.5a.75.75 0 000-1.5h-5.5a.75.75 0 000-1.5h5.5a.75.75 0 000-1.5h-5.5a.75.75 0 000-1.5h5.5a.75.75 0 000-1.5h-5.5a.75.75 0 00-.75.75v9a.75.75 0 00.75.75z" />
                    <path fillRule="evenodd" d="M3.75 3A2.75 2.75 0 001 5.75v8.5A2.75 2.75 0 003.75 17h6.5A2.75 2.75 0 0013 14.25v-8.5A2.75 2.75 0 0010.25 3h-6.5zM2.5 5.75c0-.69.56-1.25 1.25-1.25h6.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-8.5z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">{isPremiumUser ? "Premium Active" : "Go Premium"}</span>
            </button>
        )}

        {userId ? (
          <div className="flex items-center space-x-2">
            {userPhotoURL && (
              <img src={userPhotoURL} alt={userDisplayName || 'User'} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-slate-300" />
            )}
            <span className="text-xs sm:text-sm text-slate-600 hidden md:block">{userDisplayName || 'User'}</span>
            <button
              onClick={handleLogout}
              className="text-xs sm:text-sm font-medium px-2.5 py-1.5 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Sign Out"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="text-xs sm:text-sm font-medium px-2.5 py-1.5 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Sign In with Google"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 mr-1 inline-block" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.0003 10.8755C11.9028 10.8755 10.9083 11.2383 10.9083 12.2123C10.9083 13.1863 11.9028 13.5491 12.0003 13.5491C13.6203 13.5491 14.3253 12.3583 14.3253 12.2123C14.3253 11.1135 13.1663 10.8755 12.0003 10.8755ZM21.5452 12.2123C21.5452 11.5095 21.4722 11.0403 21.3542 10.6047H12.0003V12.8095H17.4492C17.3312 13.5491 16.4682 14.8179 14.7342 14.8179C13.1662 14.8179 11.8712 14.0043 10.9082 12.8095C10.0172 11.6147 9.54824 10.1343 9.54824 8.65393C9.54824 7.17348 10.0172 5.69312 10.9082 4.49826C11.8712 3.30341 13.1662 2.52148 14.7342 2.52148C16.0292 2.52148 17.0952 3.01762 17.8002 3.68796L19.8132 1.9107C18.3332 0.641891 16.4682 0 14.7342 0C11.7592 0 9.10824 1.66284 7.62824 4.08219C6.14824 6.50154 5.25725 8.80811 5.25725 12.2123C5.25725 15.6164 6.14824 17.923 7.62824 20.3423C9.10824 22.7617 11.7592 24.4245 14.7342 24.4245C17.7092 24.4245 20.0892 23.052 21.0522 20.4881C21.3542 19.8179 21.5452 18.5164 21.5452 12.2123Z"/>
            </svg>
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
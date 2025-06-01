import { create } from 'zustand';

interface ThemeState {
  theme: 'light'; // Theme is now fixed to 'light'
  // setTheme and toggleTheme are effectively no-ops or could be removed
  setTheme: (theme: 'light') => void;
  toggleTheme: () => void;
}

const applyLightThemeDOM = () => {
  const root = document.documentElement;
  const lightThemeSheet = document.getElementById('hljs-light-theme') as HTMLLinkElement | null;
  // Ensure dark theme sheet is disabled or removed if it was linked in HTML
  const darkThemeSheet = document.getElementById('hljs-dark-theme') as HTMLLinkElement | null;


  root.classList.remove('dark');
  if (lightThemeSheet) {
    lightThemeSheet.removeAttribute('disabled');
  }
  if (darkThemeSheet) { // If dark theme sheet link still exists, ensure it's disabled
    darkThemeSheet.setAttribute('disabled', 'true');
  }
};

export const useThemeStore = create<ThemeState>()(
  () => ({
    theme: 'light',
    setTheme: () => {
      // console.log("Theme is fixed to light mode. setTheme call ignored.");
      applyLightThemeDOM(); // Ensure DOM reflects light mode if called
    },
    toggleTheme: () => {
      // console.log("Theme is fixed to light mode. toggleTheme call ignored.");
      applyLightThemeDOM(); // Ensure DOM reflects light mode if called
    },
  })
);

// Apply light theme settings when this module is loaded.
// This complements the immediate script in index.html.
applyLightThemeDOM();

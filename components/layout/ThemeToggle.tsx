
import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import Sun from '../icons/Sun';
import Moon from '../icons/Moon';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-primary-100 dark:bg-gray-700 text-primary-700 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-gray-600 transition-colors shadow-inner"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};

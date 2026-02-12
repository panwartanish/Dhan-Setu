
import React from 'react';
import { useLanguageStore } from '../../store/languageStore';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div className="inline-flex bg-primary-100 dark:bg-gray-700 rounded-full p-1 shadow-inner">
      <button
        onClick={() => setLanguage('en')}
        className={`
          px-4 py-2 rounded-full text-sm font-bold transition-all
          ${language === 'en' ? 'bg-primary-500 text-white shadow-md' : 'text-primary-700 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-gray-600'}
        `}
      >
        English
      </button>
      <button
        onClick={() => setLanguage('hi')}
        className={`
          px-4 py-2 rounded-full text-sm font-bold transition-all font-hindi
          ${language === 'hi' ? 'bg-primary-500 text-white shadow-md' : 'text-primary-700 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-gray-600'}
        `}
      >
        हिंदी
      </button>
    </div>
  );
};

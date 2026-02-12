
import React from 'react';
import { LanguageToggle } from '../layout/LanguageToggle';
import { ThemeToggle } from '../layout/ThemeToggle';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-500 dark:bg-gray-800 animate-fade-in transition-colors duration-300">
      <div className="text-center text-white">
        <h1 className="text-6xl md:text-8xl font-bold font-hindi animate-pulse">धन सेतु</h1>
        <h2 className="text-4xl md:text-6xl font-bold">Dhan Setu</h2>
        <p className="mt-4 text-xl text-primary-100 dark:text-primary-200">The Bridge to Wealth</p>
      </div>
      <div className="absolute bottom-10 flex gap-4">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default SplashScreen;

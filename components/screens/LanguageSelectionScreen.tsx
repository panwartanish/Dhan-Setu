
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../../store/languageStore';
import Button from '../ui/Button';

interface LanguageSelectionScreenProps {
  onLanguageSelected: () => void;
}

const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({ onLanguageSelected }) => {
  const { setLanguage } = useLanguageStore();

  const handleSelect = (lang: 'en' | 'hi') => {
    setLanguage(lang);
    onLanguageSelected();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-primary-500 dark:bg-gray-800 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center text-white"
      >
        <h1 className="text-4xl font-bold">Choose Your Language</h1>
        <h2 className="text-4xl font-bold font-hindi mt-2">अपनी भाषा चुनें</h2>
        
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button onClick={() => handleSelect('en')} className="font-sans w-48">
            English
          </Button>
          <Button onClick={() => handleSelect('hi')} className="font-hindi w-48">
            हिंदी
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default LanguageSelectionScreen;

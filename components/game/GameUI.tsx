import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import { Dialogue, Choice } from '../../types';
import { DialogueBox } from './DialogueBox';
import { DecisionCard } from './DecisionCard';
import { ThemeToggle } from '../layout/ThemeToggle';
import Trophy from '../icons/Trophy';
import { useAudioStore } from '../../store/audioStore';
import Volume2 from '../icons/Volume2';
import VolumeX from '../icons/VolumeX';

interface GameUIProps {
  currentDialogue: Dialogue;
  handleChoice: (choice: Choice) => void;
  handleDialogueComplete: () => void;
  onShowAchievements: () => void;
  onExit: () => void;
}

const GameUI: React.FC<GameUIProps> = ({ currentDialogue, handleChoice, handleDialogueComplete, onShowAchievements, onExit }) => {
  const { character, financial, currentAge, currentYear } = useGameStore();
  const { language } = useLanguageStore();
  const { voiceEnabled, toggleVoice } = useAudioStore();

  const defaultBackgrounds = {
      student: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop&q=80',
      farmer: 'https://images.unsplash.com/photo-1499529112087-7cb3b7846e14?w=1920&h=1080&fit=crop&q=80',
  };

  const backgroundImage = currentDialogue.backgroundImg || (character ? defaultBackgrounds[character] : '');

  const labels = {
    savings: { en: 'Savings', hi: 'बचत' },
    debt: { en: 'Debt', hi: 'ऋण' },
    age: { en: 'Age', hi: 'आयु' },
    year: { en: 'Year', hi: 'वर्ष' },
    exit: { en: 'Exit Game', hi: 'खेल से बाहर' },
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div
      className="relative h-full w-full flex flex-col p-4 md:p-6 bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
      {/* Top Bar */}
      <div className="relative z-10 flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="flex flex-wrap gap-4">
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-2 px-4 rounded-full shadow-md text-primary-900 dark:text-primary-100">
            <span className="font-bold text-accent-green">{labels.savings[language]}:</span> {formatCurrency(financial.cashBalance)}
          </div>
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-2 px-4 rounded-full shadow-md text-primary-900 dark:text-primary-100">
            <span className="font-bold text-accent-red">{labels.debt[language]}:</span> {formatCurrency(financial.totalDebt)}
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
            <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-2 px-4 rounded-full shadow-md font-bold text-primary-900 dark:text-primary-100 text-sm sm:text-base">
                {labels.age[language]}: {currentAge} | {labels.year[language]}: {currentYear}
            </div>
            <button
              onClick={onShowAchievements}
              className="p-2 rounded-full bg-primary-100 dark:bg-gray-700 text-amber-500 dark:text-amber-400 hover:bg-primary-200 dark:hover:bg-gray-600 transition-colors shadow-inner"
              aria-label="Show achievements"
            >
              <Trophy className="w-5 h-5" />
            </button>
             <button
              onClick={toggleVoice}
              className="p-2 rounded-full bg-primary-100 dark:bg-gray-700 text-primary-700 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-gray-600 transition-colors shadow-inner"
              aria-label="Toggle voice narration"
            >
              {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <ThemeToggle />
            <button onClick={onExit} className="bg-red-500 text-white p-2 px-3 sm:px-4 rounded-full shadow-md font-bold hover:bg-red-600 transition-colors text-sm sm:text-base">
                {labels.exit[language]}
            </button>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row gap-8 justify-center items-end">
        {/* Character Sprite */}
        <div className="w-full md:w-1/3 flex justify-center self-end">
          <motion.img
            key={currentDialogue.characterImg}
            src={currentDialogue.characterImg}
            alt={currentDialogue.speaker[language]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.5 }
            }}
            className="max-h-[70vh] object-contain drop-shadow-2xl animate-breathing"
          />
        </div>

        {/* Dialogue & Decisions */}
        <div className="w-full md:w-2/3 flex flex-col items-center justify-end space-y-4">
           <DialogueBox dialogue={currentDialogue} onComplete={handleDialogueComplete} />
           {currentDialogue.isDecision && currentDialogue.choices && (
            <DecisionCard choices={currentDialogue.choices} onSelectChoice={handleChoice} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GameUI;
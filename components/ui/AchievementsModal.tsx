import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import { achievementsList, Achievement } from '../../data/achievements';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: {
    y: "-50px",
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    y: "50px",
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
} as const;

const AchievementItem: React.FC<{ achievement: Achievement; isUnlocked: boolean }> = ({ achievement, isUnlocked }) => {
  const { language } = useLanguageStore();
  const opacityClass = isUnlocked ? 'opacity-100' : 'opacity-40';

  return (
    <li className={`flex items-center gap-4 p-4 rounded-lg ${isUnlocked ? 'bg-primary-100 dark:bg-gray-700' : 'bg-primary-50 dark:bg-gray-800/50'} ${opacityClass} transition-opacity`}>
      <span className="text-4xl">{isUnlocked ? achievement.icon : '❓'}</span>
      <div>
        <h3 className="font-bold text-lg text-primary-800 dark:text-primary-100">{achievement.name[language]}</h3>
        <p className="text-sm text-primary-700 dark:text-primary-300">{achievement.description[language]}</p>
      </div>
    </li>
  );
};

const AchievementsModal: React.FC<AchievementsModalProps> = ({ isOpen, onClose }) => {
  const unlockedAchievements = useGameStore((state) => state.achievements);
  const { language } = useLanguageStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            className="bg-background-light dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-lg max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-primary-900 dark:text-primary-100">
                {language === 'en' ? 'Achievements' : 'उपलब्धियां'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-primary-100 dark:hover:bg-gray-700 text-primary-700 dark:text-primary-200"
              >
                &times;
              </button>
            </div>
            <ul className="space-y-4 overflow-y-auto pr-2">
              {achievementsList.map((ach) => (
                <AchievementItem key={ach.id} achievement={ach} isUnlocked={unlockedAchievements.includes(ach.id)} />
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementsModal;
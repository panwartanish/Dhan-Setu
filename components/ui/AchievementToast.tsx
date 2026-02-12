
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Achievement } from '../../data/achievements';
import { useLanguageStore } from '../../store/languageStore';

interface AchievementToastProps {
  achievement: Achievement;
  onClose: () => void;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ achievement, onClose }) => {
  const { language } = useLanguageStore();

  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!achievement) return null;

  return (
    <motion.div
      layout
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed top-24 right-4 md:right-6 z-50"
    >
      <div className="bg-gradient-to-br from-amber-400 to-yellow-500 dark:from-amber-500 dark:to-yellow-600 rounded-xl shadow-2xl p-4 flex items-center gap-4 border-2 border-white/50">
        <span className="text-4xl">{achievement.icon}</span>
        <div>
          <h4 className="font-bold text-white text-lg">
            {language === 'en' ? 'Achievement Unlocked!' : 'उपलब्धि अनलॉक!'}
          </h4>
          <p className="text-white/90 text-sm font-semibold">
            {achievement.name[language]}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementToast;

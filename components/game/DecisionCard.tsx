
import React from 'react';
import { motion } from 'framer-motion';
import { Choice } from '../../types';
import { useLanguageStore } from '../../store/languageStore';

interface DecisionCardProps {
  choices: Choice[];
  onSelectChoice: (choice: Choice) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export const DecisionCard: React.FC<DecisionCardProps> = ({ choices, onSelectChoice }) => {
  const { language } = useLanguageStore();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl space-y-4"
    >
      {choices.map((choice) => (
        <motion.button
          key={choice.id}
          variants={itemVariants}
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectChoice(choice)}
          className={`
            w-full text-left p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg 
            border-2 border-transparent hover:border-primary-500 dark:hover:border-primary-400 hover:bg-white dark:hover:bg-gray-700
            transition-colors
            ${language === 'hi' ? 'font-hindi' : ''}
          `}
        >
          <p className="text-lg font-semibold text-primary-900 dark:text-primary-100">{choice.text[language]}</p>
        </motion.button>
      ))}
    </motion.div>
  );
};

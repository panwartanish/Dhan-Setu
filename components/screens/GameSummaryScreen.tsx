import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import { gameData } from '../../data/scenarios';
import { decisionFeedback } from '../../data/feedback';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { FinancialMeter } from '../game/FinancialMeter';

interface GameSummaryScreenProps {
  onPlayAgain: () => void;
}

const GameSummaryScreen: React.FC<GameSummaryScreenProps> = ({ onPlayAgain }) => {
  const { language } = useLanguageStore();
  const { financial, decisionsMade, character } = useGameStore();

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

  const content = {
    title: { en: "Your 5-Year Journey", hi: "आपकी 5 साल की यात्रा" },
    subtitle: { en: "Here's a summary of your financial performance.", hi: "यहां आपके वित्तीय प्रदर्शन का सारांश है।" },
    finalStats: { en: "Final Financials", hi: "अंतिम वित्तीय स्थिति" },
    savings: { en: "Total Savings", hi: "कुल बचत" },
    debt: { en: "Total Debt", hi: "कुल कर्ज" },
    skills: { en: "Final Skills", hi: "अंतिम कौशल" },
    feedbackTitle: { en: "Key Decisions & Feedback", hi: "प्रमुख निर्णय और प्रतिक्रिया" },
    playAgain: { en: "Play Again", hi: "फिर से खेलें" },
    whenFaced: { en: "When you faced the choice:", hi: "जब आपके सामने यह विकल्प था:"},
    yourChoice: { en: "Your choice led to this outcome.", hi: "आपके चयन का यह परिणाम हुआ।"},
    betterOption: { en: "A better option:", hi: "एक बेहतर विकल्प:"},
  };

  const getDecisionText = (dialogueId: string) => {
    if (!character) return 'A decision was made.';
    const scenarios = gameData[character].scenarios;
    for (const scenarioKey in scenarios) {
      if (scenarios[scenarioKey].dialogues[dialogueId]) {
        return scenarios[scenarioKey].dialogues[dialogueId].text[language];
      }
    }
    return 'A decision was made.';
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary-200 to-background-cream dark:from-gray-800 dark:to-gray-900 animate-fade-in">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-8">
        <h1 className={`text-5xl font-bold text-primary-800 dark:text-primary-100 ${language === 'hi' ? 'font-hindi' : ''}`}>{content.title[language]}</h1>
        <p className={`text-xl text-primary-700 dark:text-primary-200 mt-2 ${language === 'hi' ? 'font-hindi' : ''}`}>{content.subtitle[language]}</p>
      </motion.div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <h2 className={`text-2xl font-bold mb-4 ${language === 'hi' ? 'font-hindi' : ''}`}>{content.finalStats[language]}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg p-3 bg-primary-100/50 dark:bg-gray-700/50 rounded-lg">
              <span className={language === 'hi' ? 'font-hindi' : ''}>{content.savings[language]}</span>
              <span className="font-bold text-accent-green">{formatCurrency(financial.cashBalance)}</span>
            </div>
            <div className="flex justify-between items-center text-lg p-3 bg-primary-100/50 dark:bg-gray-700/50 rounded-lg">
              <span className={language === 'hi' ? 'font-hindi' : ''}>{content.debt[language]}</span>
              <span className="font-bold text-accent-red">{formatCurrency(financial.totalDebt)}</span>
            </div>
          </div>
        </Card>
        <Card>
           <h2 className={`text-2xl font-bold mb-4 ${language === 'hi' ? 'font-hindi' : ''}`}>{content.skills[language]}</h2>
           <FinancialMeter />
        </Card>
      </div>

      <Card className="w-full max-w-4xl mt-8">
        <h2 className={`text-2xl font-bold mb-4 text-center ${language === 'hi' ? 'font-hindi' : ''}`}>{content.feedbackTitle[language]}</h2>
        <div className="max-h-60 overflow-y-auto space-y-4 p-4 bg-primary-50 dark:bg-gray-900 rounded-lg">
          {decisionsMade.map((decision, index) => {
            const feedback = decisionFeedback[decision.choiceId];
            if (!feedback) return null;
            return(
              <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-sm">
                <p className="font-semibold text-primary-700 dark:text-primary-200 italic">
                  <span className="font-bold not-italic">{content.whenFaced[language]}</span>
                  <span className={language === 'hi' ? 'font-hindi' : ''}> "{getDecisionText(decision.dialogueId)}"</span>
                </p>
                <p className={`mt-2 text-primary-900 dark:text-primary-100 ${language === 'hi' ? 'font-hindi' : ''}`}>
                    <span className="font-bold text-red-500">&#x2717; </span>{feedback.outcome[language]}
                </p>
                 <p className={`mt-2 text-primary-900 dark:text-primary-100 ${language === 'hi' ? 'font-hindi' : ''}`}>
                    <span className="font-bold text-green-500">&#x2713; {content.betterOption[language]} </span>{feedback.betterOption[language]}
                </p>
              </div>
            )
          })}
        </div>
      </Card>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-10">
        <Button onClick={onPlayAgain} className={language === 'hi' ? 'font-hindi' : ''}>{content.playAgain[language]}</Button>
      </motion.div>
    </div>
  );
};

export default GameSummaryScreen;
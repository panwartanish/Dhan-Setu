
import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import BookOpen from '../icons/BookOpen';
import TrendingUp from '../icons/TrendingUp';
import Shield from '../icons/Shield';
import BarChart from '../icons/BarChart';

const StatDisplay: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}> = ({ icon, label, value, color }) => (
  <div className="flex flex-col items-center space-y-2">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <span className="text-xs text-center font-bold text-primary-800 dark:text-primary-200">{label}</span>
    <div className="w-full bg-primary-100 dark:bg-gray-700 rounded-full h-2.5">
      <motion.div
        className={`${color} h-2.5 rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  </div>
);

export const FinancialMeter: React.FC = () => {
  const stats = useGameStore((state) => state.stats);
  const { language } = useLanguageStore();

  const labels = {
    planning: { en: 'Planning', hi: 'योजना' },
    savings: { en: 'Savings', hi: 'बचत' },
    debt: { en: 'Debt Mgmt', hi: 'ऋण प्रबंधन' },
    risk: { en: 'Risk Aware', hi: 'जोखिम जागरूकता' },
  };

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4 p-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full shadow-md">
      <StatDisplay
        icon={<BookOpen className="w-6 h-6 text-white" />}
        label={labels.planning[language]}
        value={stats.planningAbility}
        color="bg-accent-blue"
      />
      <StatDisplay
        icon={<TrendingUp className="w-6 h-6 text-white" />}
        label={labels.savings[language]}
        value={stats.savingsDiscipline}
        color="bg-accent-green"
      />
      <StatDisplay
        icon={<BarChart className="w-6 h-6 text-white" />}
        label={labels.debt[language]}
        value={stats.debtManagement}
        color="bg-accent-amber"
      />
      <StatDisplay
        icon={<Shield className="w-6 h-6 text-white" />}
        label={labels.risk[language]}
        value={stats.riskAwareness}
        color="bg-accent-red"
      />
    </div>
  );
};

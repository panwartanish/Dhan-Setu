
export interface Achievement {
  id: string;
  name: {
    en: string;
    hi: string;
  };
  description: {
    en: string;
    hi: string;
  };
  icon: string; // Emoji
}

// A list of all achievements in the game
export const achievementsList: Achievement[] = [
  {
    id: 'SMART_CHOICE',
    name: { en: 'Smart Planner', hi: 'स्मार्ट योजनाकार' },
    description: { en: 'Made a financially wise decision that improved your stats.', hi: 'एक वित्तीय रूप से बुद्धिमानीपूर्ण निर्णय लिया जिसने आपके आँकड़े सुधारे।' },
    icon: '🧠',
  },
  {
    id: 'SAVER_I',
    name: { en: 'Prudent Saver', hi: 'समझदार बचतकर्ता' },
    description: { en: 'Reached ₹10,000 in savings.', hi: 'बचत में ₹10,000 तक पहुंच गए।' },
    icon: '🏦',
  },
  {
    id: 'DEBT_AVOIDER',
    name: { en: 'Debt Avoider', hi: 'कर्ज से बचने वाले' },
    description: { en: 'Made a choice that avoided taking on new debt.', hi: 'एक ऐसा विकल्प चुना जिससे नया कर्ज लेने से बचा जा सके।' },
    icon: '✅',
  },
  {
    id: 'FIRST_SAVINGS',
    name: { en: 'First Step', hi: 'पहला कदम' },
    description: { en: 'You have more savings than you started with!', hi: 'आपके पास शुरुआत से ज़्यादा बचत है!' },
    icon: '💰',
  },
];

// A map for easy lookup of achievements by their ID
export const achievements: Record<string, Achievement> = achievementsList.reduce((acc, ach) => {
  acc[ach.id] = ach;
  return acc;
}, {} as Record<string, Achievement>);

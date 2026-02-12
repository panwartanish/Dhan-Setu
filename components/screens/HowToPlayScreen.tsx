import React from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../../store/languageStore';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface HowToPlayScreenProps {
  onContinue: () => void;
}

const HowToPlayScreen: React.FC<HowToPlayScreenProps> = ({ onContinue }) => {
  const { language } = useLanguageStore();

  const content = {
    title: { en: "How to Play Dhan Setu", hi: "धन सेतु कैसे खेलें" },
    goalTitle: { en: "Your Goal", hi: "आपका लक्ष्य" },
    goalText: { en: "Navigate 5 years of life as a student or a farmer. Make smart financial decisions to build your wealth and secure your future.", hi: "एक छात्र या किसान के रूप में 5 साल के जीवन को नेविगेट करें। अपनी संपत्ति बनाने और अपने भविष्य को सुरक्षित करने के लिए स्मार्ट वित्तीय निर्णय लें।" },
    mechanicsTitle: { en: "Game Mechanics", hi: "खेल यांत्रिकी" },
    mechanics: [
      { en: "Make Choices: Read scenarios and select the option you think is best.", hi: "विकल्प चुनें: परिदृश्यों को पढ़ें और वह विकल्प चुनें जो आपको सबसे अच्छा लगे।" },
      { en: "Manage Money: Your savings and debt will change based on your decisions.", hi: "पैसे का प्रबंधन करें: आपकी बचत और कर्ज आपके फैसलों के आधार पर बदलेंगे।" },
      { en: "Build Skills: Improve your Planning, Savings, Debt Management, and Risk Awareness.", hi: "कौशल बनाएं: अपनी योजना, बचत, ऋण प्रबंधन और जोखिम जागरूकता में सुधार करें।" },
      { en: "Unlock Achievements: Earn rewards for reaching financial milestones!", hi: "उपलब्धियां अनलॉक करें: वित्तीय मील के पत्थर तक पहुंचने के लिए पुरस्कार अर्जित करें!" },
    ],
    button: { en: "Let's Begin!", hi: "चलिए शुरू करते हैं!" }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  } as const;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary-200 to-background-cream dark:from-gray-800 dark:to-gray-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl text-center"
      >
        <motion.h1
          variants={itemVariants}
          className={`text-5xl font-bold text-primary-800 dark:text-primary-100 mb-10 ${language === 'hi' ? 'font-hindi' : ''}`}
        >
          {content.title[language]}
        </motion.h1>

        <motion.div variants={itemVariants}>
          <Card className="mb-8 text-left">
            <h2 className={`text-2xl font-bold text-primary-900 dark:text-white mb-3 ${language === 'hi' ? 'font-hindi' : ''}`}>{content.goalTitle[language]}</h2>
            <p className={`text-primary-700 dark:text-primary-200 ${language === 'hi' ? 'font-hindi' : ''}`}>{content.goalText[language]}</p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="text-left">
            <h2 className={`text-2xl font-bold text-primary-900 dark:text-white mb-3 ${language === 'hi' ? 'font-hindi' : ''}`}>{content.mechanicsTitle[language]}</h2>
            <ul className="space-y-2 list-disc list-inside">
              {content.mechanics.map((item, index) => (
                <li key={index} className={`text-primary-700 dark:text-primary-200 ${language === 'hi' ? 'font-hindi' : ''}`}>{item[language]}</li>
              ))}
            </ul>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10">
          <Button onClick={onContinue} className={language === 'hi' ? 'font-hindi' : ''}>
            {content.button[language]}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HowToPlayScreen;
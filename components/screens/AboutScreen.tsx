
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../../store/languageStore';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface AboutScreenProps {
  onContinue: () => void;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ onContinue }) => {
  const { language } = useLanguageStore();

  const content = {
    title: { en: "About Dhan Setu", hi: "धन सेतु के बारे में" },
    text: { 
      en: "Dhan Setu ('Bridge to Wealth') is an interactive game designed to teach financial literacy. By making decisions in realistic scenarios, you'll learn about budgeting, saving, investing, and managing debt in a fun, engaging way. Your journey will show the long-term impact of small choices.", 
      hi: "धन सेतु ('धन का पुल') वित्तीय साक्षरता सिखाने के लिए बनाया गया एक इंटरैक्टिव गेम है। यथार्थवादी परिदृश्यों में निर्णय लेकर, आप एक मजेदार, आकर्षक तरीके से बजट, बचत, निवेश और ऋण का प्रबंधन करना सीखेंगे। आपकी यात्रा छोटे विकल्पों के दीर्घकालिक प्रभाव को दर्शाएगी।" 
    },
    button: { en: "Continue", hi: "जारी रखें" }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary-200 to-background-cream dark:from-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-2xl text-center"
      >
        <Card>
            <h1 className={`text-4xl font-bold text-primary-800 dark:text-primary-100 mb-6 ${language === 'hi' ? 'font-hindi' : ''}`}>
            {content.title[language]}
            </h1>
            <p className={`text-lg text-primary-700 dark:text-primary-200 mb-8 ${language === 'hi' ? 'font-hindi' : ''}`}>
                {content.text[language]}
            </p>
            <Button onClick={onContinue} className={language === 'hi' ? 'font-hindi' : ''}>
                {content.button[language]}
            </Button>
        </Card>
      </motion.div>
    </div>
  );
};

export default AboutScreen;

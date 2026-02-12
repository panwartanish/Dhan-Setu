
import React from 'react';
import { Character } from '../../types';
import { useLanguageStore } from '../../store/languageStore';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { LanguageToggle } from '../layout/LanguageToggle';
import { ThemeToggle } from '../layout/ThemeToggle';

interface CharacterSelectionScreenProps {
  onCharacterSelect: (character: Character) => void;
}

const CharacterCard: React.FC<{
  name: { en: string; hi: string };
  description: { en: string; hi: string };
  image: string;
  onSelect: () => void;
}> = ({ name, description, image, onSelect }) => {
  const { language } = useLanguageStore();

  return (
    <Card className="flex flex-col items-center text-center p-4 md:p-8 w-full max-w-sm transform hover:scale-105 transition-transform duration-300">
      <img src={image} alt={name[language]} className="w-48 h-48 rounded-full object-cover mb-4 border-4 border-primary-500 shadow-lg" />
      <h3 className={`text-3xl font-bold text-primary-800 dark:text-primary-100 ${language === 'hi' ? 'font-hindi' : ''}`}>{name[language]}</h3>
      <p className={`mt-2 text-primary-700 dark:text-primary-200 mb-6 h-20 ${language === 'hi' ? 'font-hindi' : ''}`}>{description[language]}</p>
      <Button onClick={onSelect} className={language === 'hi' ? 'font-hindi' : ''}>
        {language === 'en' ? 'Start Journey' : 'यात्रा शुरू करें'}
      </Button>
    </Card>
  );
};

const CharacterSelectionScreen: React.FC<CharacterSelectionScreenProps> = ({ onCharacterSelect }) => {
  const { language } = useLanguageStore();

  const content = {
      title: {en: "Choose Your Path", hi: "अपना रास्ता चुनें"},
      student: {
          name: {en: "Student", hi: "विद्यार्थी"},
          description: {en: "Age 18. Navigate college life, part-time jobs, and your first investments.", hi: "आयु 18. कॉलेज जीवन, अंशकालिक नौकरियों और अपने पहले निवेश को नेविगेट करें।"},
          image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=400&fit=crop&q=80"
      },
      farmer: {
          name: {en: "Farmer", hi: "किसान"},
          description: {en: "Age 30. Manage crop cycles, unpredictable income, and long-term family planning.", hi: "आयु 30. फसल चक्र, अप्रत्याशित आय और दीर्घकालिक परिवार नियोजन का प्रबंधन करें।"},
          image: "https://images.unsplash.com/photo-1590471921915-38c24921508a?w=400&h=400&fit=crop&q=80"
      },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary-200 to-background-cream dark:from-gray-800 dark:to-gray-900">
        <div className="absolute top-6 right-6 flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
        </div>
        <h1 className={`text-5xl font-bold text-primary-800 dark:text-primary-100 mb-10 text-center ${language === 'hi' ? 'font-hindi' : ''}`}>
            {content.title[language]}
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
            <CharacterCard
              name={content.student.name}
              description={content.student.description}
              image={content.student.image}
              onSelect={() => onCharacterSelect('student')}
            />
            <CharacterCard
              name={content.farmer.name}
              description={content.farmer.description}
              image={content.farmer.image}
              onSelect={() => onCharacterSelect('farmer')}
            />
        </div>
    </div>
  );
};

export default CharacterSelectionScreen;
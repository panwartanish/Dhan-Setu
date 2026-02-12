
import React, { useState, useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import { useThemeStore } from './store/themeStore';
import SplashScreen from './components/screens/SplashScreen';
import CharacterSelectionScreen from './components/screens/CharacterSelectionScreen';
import GameScreen from './components/screens/GameScreen';
import HowToPlayScreen from './components/screens/HowToPlayScreen';
import GameSummaryScreen from './components/screens/GameSummaryScreen';
import LanguageSelectionScreen from './components/screens/LanguageSelectionScreen';
import AboutScreen from './components/screens/AboutScreen';
import { Character } from './types';

type GameScreen = 'splash' | 'language-select' | 'about' | 'how-to-play' | 'character-select' | 'game' | 'summary';

const App: React.FC = () => {
  const [screen, setScreen] = useState<GameScreen>('splash');
  const startGame = useGameStore((state) => state.startGame);
  const resetGame = useGameStore((state) => state.resetGame);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
        if (screen === 'splash') {
            setScreen('language-select');
        }
    }, 2500); 

    return () => clearTimeout(timer);
  }, [screen]);
  
  const handleLanguageSelected = () => {
    setScreen('about');
  };

  const handleAboutContinue = () => {
    setScreen('how-to-play');
  };
  
  const handleHowToPlayContinue = () => {
    setScreen('character-select');
  };

  const handleCharacterSelect = (selectedCharacter: Character) => {
    startGame(selectedCharacter);
    setScreen('game');
  };
  
  const handleExitGame = () => {
    resetGame();
    setScreen('character-select');
  };

  const handleGameComplete = () => {
    setScreen('summary');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen />;
      case 'language-select':
        return <LanguageSelectionScreen onLanguageSelected={handleLanguageSelected} />;
      case 'about':
        return <AboutScreen onContinue={handleAboutContinue} />;
      case 'how-to-play':
        return <HowToPlayScreen onContinue={handleHowToPlayContinue} />;
      case 'character-select':
        return <CharacterSelectionScreen onCharacterSelect={handleCharacterSelect} />;
      case 'game':
        return <GameScreen onExit={handleExitGame} onGameComplete={handleGameComplete} />;
      case 'summary':
        return <GameSummaryScreen onPlayAgain={handleExitGame} />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background-cream dark:bg-gray-900 text-primary-900 dark:text-primary-100 font-sans transition-colors duration-300">
      {renderScreen()}
    </div>
  );
};

export default App;
import React, { useEffect, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { gameData } from '../../data/scenarios';
import { achievements as achievementsData, Achievement } from '../../data/achievements';
import GameUI from '../game/GameUI';
import AchievementToast from '../ui/AchievementToast';
import AchievementsModal from '../ui/AchievementsModal';
import { Choice } from '../../types';

interface GameScreenProps {
    onExit: () => void;
    onGameComplete: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onExit, onGameComplete }) => {
  const { 
      character, 
      financial,
      currentScenarioId, 
      currentDialogueId, 
      achievements: unlockedAchievements,
      loadScenario,
      setDialogue,
      makeDecision,
      unlockAchievement
  } = useGameStore();

  const [justUnlocked, setJustUnlocked] = useState<Achievement | null>(null);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);

  // --- Achievement Checking Logic ---
  const triggerUnlock = useCallback((achievementId: string) => {
    if (!unlockedAchievements.includes(achievementId)) {
      unlockAchievement(achievementId);
      setJustUnlocked(achievementsData[achievementId]);
    }
  }, [unlockedAchievements, unlockAchievement]);

  useEffect(() => {
    if (financial.cashBalance >= 10000) triggerUnlock('SAVER_I');
    const startingSavings = character === 'student' ? 5000 : 25000;
    if (financial.cashBalance > startingSavings) triggerUnlock('FIRST_SAVINGS');
  }, [financial.cashBalance, character, triggerUnlock]);


  const handleDialogueComplete = useCallback(() => {
    if (!character || !currentScenarioId || !currentDialogueId) return;
    
    const story = gameData[character];
    const dialogue = story.scenarios[currentScenarioId].dialogues[currentDialogueId];

    if (dialogue.next) {
      setDialogue(dialogue.next);
    } else if (dialogue.nextScenarioId) {
      loadScenario(dialogue.nextScenarioId);
    } else {
      onGameComplete();
    }
  }, [character, currentScenarioId, currentDialogueId, setDialogue, loadScenario, onExit, onGameComplete]);


  const handleChoice = (choice: Choice) => {
    let savingsChange = 0;
    let debtChange = 0;
    let statChanges: Partial<ReturnType<typeof useGameStore.getState>['stats']> = {};
    
    switch(choice.id) {
        // --- Student ---
        case 'y1_s_choice1': savingsChange = -3000; statChanges = { planningAbility: -10, savingsDiscipline: -15 }; break;
        case 'y1_s_choice2': savingsChange = -500; statChanges = { planningAbility: 10, savingsDiscipline: 10 }; triggerUnlock('SMART_CHOICE'); break;
        case 'y1_s_choice3': statChanges = { savingsDiscipline: 5, planningAbility: -5 }; triggerUnlock('DEBT_AVOIDER'); break;
        case 'y1_s_choice4': savingsChange = -1500; statChanges = { planningAbility: -5 }; break;
        case 'y1_s_choice5': savingsChange = -400; statChanges = { planningAbility: 10, savingsDiscipline: 10 }; triggerUnlock('SMART_CHOICE'); break;
        
        case 'y2_s_choice1': savingsChange = 8000; statChanges = { planningAbility: 5, savingsDiscipline: 5 }; break;
        case 'y2_s_choice2': statChanges = { planningAbility: -5 }; break;
        case 'y2_s_choice3': savingsChange = -3000; statChanges = { savingsDiscipline: -10 }; break;
        case 'y2_s_choice4': statChanges = { savingsDiscipline: 10 }; triggerUnlock('SMART_CHOICE'); break;

        case 'y3_s_choice1': savingsChange = -15000; statChanges = { riskAwareness: 10, planningAbility: 15, savingsDiscipline: 10 }; break;
        case 'y3_s_choice2': savingsChange = -15000; statChanges = { riskAwareness: -15, planningAbility: 5 }; break;
        case 'y3_s_choice3': savingsChange = -15000; statChanges = { riskAwareness: 5, savingsDiscipline: 15 }; break;
        
        case 'y4_s_choice1': debtChange = 50000; statChanges = { debtManagement: -10, planningAbility: 15 }; break;
        case 'y4_s_choice2': statChanges = { debtManagement: 10, riskAwareness: 5 }; triggerUnlock('DEBT_AVOIDER'); break;

        case 'y5_s_choice1': statChanges = { planningAbility: 20, savingsDiscipline: 10 }; triggerUnlock('SMART_CHOICE'); break;
        case 'y5_s_choice2': savingsChange = -2000; statChanges = { riskAwareness: 20, planningAbility: 10 }; break;
        case 'y5_s_choice3': savingsChange = -10000; statChanges = { savingsDiscipline: -15 }; break;

        // --- Farmer ---
        case 'y1_f_choice1': savingsChange = -15000; statChanges = { riskAwareness: 10, planningAbility: 5 }; break;
        case 'y1_f_choice2': statChanges = { riskAwareness: -5, savingsDiscipline: 5 }; triggerUnlock('SMART_CHOICE'); break;
        case 'y1_f_choice3': debtChange = 10000; statChanges = { debtManagement: 5, planningAbility: 10 }; break;
        case 'y1_f_choice4': savingsChange = -2000; statChanges = { planningAbility: -10 }; break;

        case 'y2_f_choice1': debtChange = 20000; statChanges = { debtManagement: -20, riskAwareness: -10 }; break;
        case 'y2_f_choice2': statChanges = { planningAbility: 15, debtManagement: 10 }; triggerUnlock('DEBT_AVOIDER'); break;

        case 'y3_f_choice1': savingsChange = -20000; statChanges = { riskAwareness: 15, planningAbility: 10 }; break;
        case 'y3_f_choice2': savingsChange = -50000; statChanges = { riskAwareness: -10, planningAbility: -5 }; break;
        case 'y3_f_choice3': statChanges = { savingsDiscipline: 15 }; break;

        case 'y4_f_choice1': savingsChange = -1000; statChanges = { riskAwareness: 20, planningAbility: 10 }; triggerUnlock('SMART_CHOICE'); break;
        case 'y4_f_choice2': statChanges = { riskAwareness: -20 }; break;

        case 'y5_s_choice1': savingsChange = -500; statChanges = { planningAbility: 15, riskAwareness: 5 }; break;
        case 'y5_s_choice2': statChanges = { planningAbility: -10 }; break;
    }
    makeDecision(choice.id, { cashBalance: savingsChange, totalDebt: debtChange, statChanges });
    setDialogue(choice.consequence);
  };

  if (!character || !currentScenarioId || !currentDialogueId) {
    return <div className="flex items-center justify-center min-h-screen"><p className="text-2xl animate-pulse">Loading Game...</p></div>;
  }

  const currentScenario = gameData[character].scenarios[currentScenarioId];
  const currentDialogue = currentScenario.dialogues[currentDialogueId];
  
  if (!currentDialogue) {
      return <div className="flex items-center justify-center min-h-screen"><p className="text-2xl text-red-500">Error: Dialogue not found!</p></div>;
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
        <GameUI 
            currentDialogue={currentDialogue}
            handleChoice={handleChoice}
            handleDialogueComplete={handleDialogueComplete}
            onShowAchievements={() => setIsAchievementsModalOpen(true)}
            onExit={onExit}
        />
        <AnimatePresence>
            {justUnlocked && (<AchievementToast achievement={justUnlocked} onClose={() => setJustUnlocked(null)} />)}
        </AnimatePresence>
        <AchievementsModal isOpen={isAchievementsModalOpen} onClose={() => setIsAchievementsModalOpen(false)} />
    </div>
  );
};

export default GameScreen;
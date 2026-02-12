import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Character, DecisionLog, FinancialState } from '../types';
import { gameData } from '../data/scenarios';

interface GameState {
  character: Character | null;
  currentYear: number;
  currentAge: number;
  currentScenarioId: string | null;
  currentDialogueId: string | null;
  financial: FinancialState;
  stats: {
    savingsDiscipline: number; // 0-100
    debtManagement: number; // 0-100
    riskAwareness: number; // 0-100
    planningAbility: number; // 0-100
  };
  achievements: string[]; // Stores IDs of unlocked achievements
  decisionsMade: DecisionLog[];

  // Actions
  startGame: (character: Character) => void;
  loadScenario: (scenarioId: string) => void;
  setDialogue: (dialogueId: string) => void;
  makeDecision: (choiceId: string, changes: Partial<FinancialState> & { statChanges: Partial<GameState['stats']> }) => void;
  unlockAchievement: (achievementId: string) => void;
  resetGame: () => void;
}

const getInitialState = () => ({
  character: null,
  currentYear: 1,
  currentAge: 0,
  currentScenarioId: null,
  currentDialogueId: null,
  financial: {
    cashBalance: 0,
    totalDebt: 0,
    financialPressure: 10,
    financialSecurity: 10,
  },
  stats: {
    savingsDiscipline: 50,
    debtManagement: 50,
    riskAwareness: 50,
    planningAbility: 50,
  },
  achievements: [],
  decisionsMade: [],
});

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...getInitialState(),

      startGame: (character) => {
        set({
          ...getInitialState(),
          character,
          currentYear: 1,
          currentAge: character === 'student' ? 18 : 30,
          financial: {
            cashBalance: character === 'student' ? 5000 : 25000,
            totalDebt: 0,
            financialPressure: character === 'student' ? 20 : 40,
            financialSecurity: character === 'student' ? 30 : 20,
          }
        });
        const story = gameData[character];
        get().loadScenario(story.startScenarioId);
      },
      
      loadScenario: (scenarioId) => set((state) => {
          if (!state.character) return {};
          const story = gameData[state.character];
          const newScenario = story.scenarios[scenarioId];
          if (!newScenario) return {};
          
          let yearIncrement = state.currentScenarioId ? 1 : 0;

          return {
              currentScenarioId: scenarioId,
              currentDialogueId: newScenario.startDialogueId,
              currentYear: state.currentYear + yearIncrement,
              currentAge: state.currentAge + yearIncrement,
          };
      }),

      setDialogue: (dialogueId) => set({ currentDialogueId: dialogueId }),

      makeDecision: (choiceId, changes) =>
        set((state) => {
          if(!state.currentScenarioId || !state.currentDialogueId) return {};

          const newDecision: DecisionLog = {
              scenarioId: state.currentScenarioId,
              dialogueId: state.currentDialogueId,
              choiceId: choiceId
          };

          const { statChanges, ...financialChanges } = changes;

          return {
              decisionsMade: [...state.decisionsMade, newDecision],
              financial: {
                ...state.financial,
                cashBalance: state.financial.cashBalance + (financialChanges.cashBalance || 0),
                totalDebt: state.financial.totalDebt + (financialChanges.totalDebt || 0),
                financialPressure: clamp(state.financial.financialPressure + (financialChanges.financialPressure || 0)),
                financialSecurity: clamp(state.financial.financialSecurity + (financialChanges.financialSecurity || 0)),
              },
              stats: {
                ...state.stats,
                savingsDiscipline: clamp(state.stats.savingsDiscipline + (statChanges?.savingsDiscipline || 0)),
                debtManagement: clamp(state.stats.debtManagement + (statChanges?.debtManagement || 0)),
                riskAwareness: clamp(state.stats.riskAwareness + (statChanges?.riskAwareness || 0)),
                // FIX: Removed extra closing parenthesis that caused a syntax error
                planningAbility: clamp(state.stats.planningAbility + (statChanges?.planningAbility || 0)),
              }
          }
        }),
      
      unlockAchievement: (achievementId) => 
        set((state) => {
          if (state.achievements.includes(achievementId)) {
            return {};
          }
          return { achievements: [...state.achievements, achievementId] };
        }),

      resetGame: () => set(getInitialState()),
    }),
    {
      name: 'dhan-setu-game-storage',
    }
  )
);
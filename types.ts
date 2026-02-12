
export type Character = 'student' | 'farmer';
export type Language = 'en' | 'hi';

export interface Choice {
  id: string;
  text: {
    en: string;
    hi: string;
  };
  consequence: string; // ID of the next dialogue/event
}

export interface Dialogue {
  id: string;
  characterImg: string; // e.g., 'student-neutral', 'guide-happy'
  backgroundImg?: string; // URL for the scene's background
  speaker: {
    en: string;
    hi: string;
  };
  text: {
    en: string;
    hi: string;
  };
  isDecision: boolean;
  choices?: Choice[];
  next?: string; // ID of the next dialogue if not a decision
  nextScenarioId?: string; // ID of the next scenario to load
}

export interface Scenario {
  id:string;
  name: {
    en: string;
    hi: string;
  };
  dialogues: Record<string, Dialogue>;
  startDialogueId: string;
}

export interface CharacterStory {
  startScenarioId: string;
  scenarios: Record<string, Scenario>;
}

export interface GameData {
  student: CharacterStory;
  farmer: CharacterStory;
}

export interface DecisionLog {
  scenarioId: string;
  dialogueId: string;
  choiceId: string;
}

export interface FinancialState {
  cashBalance: number;
  totalDebt: number;
  financialPressure: number; // 0-100, how stressed you are
  financialSecurity: number; // 0-100, how resilient you are
}

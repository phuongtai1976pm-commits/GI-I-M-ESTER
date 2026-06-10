export interface Question {
  id: number; // 1 to 60
  question: string;
  options: string[];
  answer: number; // Index of correct option (0, 1, 2, 3)
  explanation: string;
  stage: number; // 1, 2, 3, or 4
}

export type MascotMood = 'happy' | 'sad' | 'thinking' | 'celebrating' | 'charging';

export interface GameState {
  currentStage: number; // 1, 2, 3, 4
  currentQuestionIndex: number; // Index within current stage's 15 questions (0 to 14)
  stageScores: Record<number, number>; // score for stage 1, 2, 3, 4
  answersHistory: Record<number, { selectedIndex: number; isCorrect: boolean }>; // Kept for viewing missed questions
  unlockedStages: number[];
  mascotMood: MascotMood;
  lives: number; // Used in Stage 3: Golden Bell
  sfxEnabled: boolean;
  isCompleted: boolean;
}

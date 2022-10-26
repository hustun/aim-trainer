import create from 'zustand';
import { v4 as uuid } from 'uuid';
import { TargetClass } from './Target';

interface AppState {
  score: number;
  difficulty: number;
  activeTargets: Array<TargetClass>;
  hit: (id?: string) => void;
  addTarget: () => void;
  setDifficulty: (difficulty: number) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  score: 0,
  difficulty: 1.5,
  activeTargets: Array(5)
    .fill('')
    .map(() => new TargetClass()),
  hit: (id) =>
    set((state) => ({
      score: state.score + 1,
      activeTargets: state.activeTargets.filter((item) => item.id !== id),
    })),
  addTarget: () => {
    if (get().activeTargets.length < 8)
      set((state) => ({
        activeTargets: [...state.activeTargets, new TargetClass()],
      }));
  },
  setDifficulty: (difficulty) => set({ difficulty: difficulty }),
  reset: () => set({ score: 0 }),
}));

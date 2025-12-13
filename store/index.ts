import DefaultHabits from "@/constants/DefaultHabits";
import storageService from "@/services/StorageService";
import { generateId } from "@/utils";
import { create } from "zustand";
import { AppState, Habit } from "./../types/index";

interface AppStore extends AppState {
  initializeApp: () => Promise<void>;
}

export const useStore = create<AppStore>((set, get) => ({
  habits: [],
  initializeApp: async () => {
    try {
      const state = await storageService.loadAppState();
      if (state.habits && state.habits.length > 0) {
        set({ habits: state.habits });
      } else {
        const currentDate = new Date();
        const defaultHabits: Habit[] = DefaultHabits.map((habit) => ({
          ...habit,
          id: generateId(),
          createdAt: currentDate,
          updatedAt: currentDate,
        }));

        set({ habits: defaultHabits });
        await storageService.saveHabits(defaultHabits);
      }
    } catch (error) {}
  },
}));

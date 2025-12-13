import DefaultHabits from "@/constants/DefaultHabits";
import apiService from "@/services/ApiService";
import storageService from "@/services/StorageService";
import { generateId } from "@/utils";
import { create } from "zustand";
import { AppState, Habit, HabitFormData } from "./../types/index";

interface AppStore extends AppState {
  initializeApp: () => Promise<void>;
  addHabit: (data: HabitFormData) => Promise<void>;
  toggleGuestMode: () => Promise<void>;
}

export const useStore = create<AppStore>((set, get) => ({
  habits: [],
  isGuestMode: false,
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
  addHabit: async (data: HabitFormData) => {
    const { isGuestMode } = get();
    if (isGuestMode) {
      throw new Error("در حالت مهمان نمی‌توانید عادت اضافه کنید");
    }

    try {
      const response = await apiService.createHabit({
        ...data,
        isDefault: false,
      });

      if (response.success) {
        const newHabits = [...get().habits, response.data];
        set({ habits: newHabits });
        await storageService.saveHabits(newHabits);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error adding habit:", error);
      throw error;
    }
  },
  toggleGuestMode: async () => {
    const { isGuestMode } = get();
    const newGuestMode = !isGuestMode;
    set({ isGuestMode: newGuestMode });
    await storageService.saveGuestMode(newGuestMode);
  },
}));

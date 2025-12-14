import DefaultHabits from "@/constants/DefaultHabits";
import apiService from "@/services/ApiService";
import storageService from "@/services/StorageService";
import { formatDateString, generateId, sortHabits } from "@/utils";
import { create } from "zustand";
import { AppState, Habit, HabitFormData, HabitStatus } from "./../types/index";

interface AppStore extends AppState {
  initializeApp: () => Promise<void>;
  addHabit: (data: HabitFormData) => Promise<void>;
  updateHabit: (id: string, data: Partial<HabitFormData>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  logEntry: (
    habitId: string,
    status: HabitStatus,
    value?: number
  ) => Promise<void>;
  updateEntry: (
    habitId: string,
    date: string,
    status: HabitStatus,
    value?: number
  ) => Promise<void>;
  toggleGuestMode: () => Promise<void>;
}

export const useStore = create<AppStore>((set, get) => ({
  habits: [],
  entries: [],
  isGuestMode: false,
  initializeApp: async () => {
    try {
      const state = await storageService.loadAppState();
      if (state.habits && state.habits.length > 0) {
        set({
          habits: state.habits,
          entries: state.entries || [],
          isGuestMode: state.isGuestMode || false,
        });
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
  updateHabit: async (id: string, data: Partial<HabitFormData>) => {
    const { isGuestMode, habits } = get();
    if (isGuestMode) {
      throw new Error("در حالت مهمان نمی‌توانید عادت را ویرایش کنید");
    }

    try {
      const habit = habits.find((h) => h.id === id);
      if (!habit) {
        throw new Error("عادت یافت نشد");
      }

      const response = await apiService.updateHabit(id, {
        ...habit,
        ...data,
      });

      if (response.success) {
        const updatedHabits = habits.map((h) =>
          h.id === id ? { ...h, ...data, updatedAt: new Date() } : h
        );
        set({ habits: sortHabits(updatedHabits) });
        await storageService.saveHabits(updatedHabits);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error updating habit:", error);
      throw error;
    }
  },
  deleteHabit: async (id: string) => {
    const { isGuestMode, habits } = get();
    if (isGuestMode) {
      throw new Error("در حالت مهمان نمی‌توانید عادت را حذف کنید");
    }

    try {
      const response = await apiService.deleteHabit(id);

      if (response.success) {
        const updatedHabits = habits.filter((h) => h.id !== id);

        set({
          habits: updatedHabits,
        });
        await storageService.saveHabits(updatedHabits);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error deleting habit:", error);
      throw error;
    }
  },
  logEntry: async (habitId: string, status: HabitStatus, value?: number) => {
    const { entries } = get();
    const today = formatDateString(new Date());

    try {
      // Check if entry already exists for today
      const existingEntry = entries.find(
        (e) => e.habitId === habitId && e.date === today
      );

      if (existingEntry) {
        await get().updateEntry(habitId, today, status, value);
      } else {
        const response = await apiService.createEntry({
          habitId,
          date: today,
          status,
          value,
        });

        if (response.success) {
          const newEntries = [...entries, response.data];
          set({ entries: newEntries });
          await storageService.saveEntries(newEntries);
        } else {
          throw new Error(response.error);
        }
      }
    } catch (error) {
      console.error("Error logging entry:", error);
      throw error;
    }
  },
  updateEntry: async (
    habitId: string,
    date: string,
    status: HabitStatus,
    value?: number
  ) => {
    const { entries } = get();

    try {
      const entry = entries.find(
        (e) => e.habitId === habitId && e.date === date
      );

      if (!entry) {
        throw new Error("ورودی یافت نشد");
      }

      const response = await apiService.updateEntry(entry.id, {
        status,
        value,
      });

      if (response.success) {
        const updatedEntries = entries.map((e) =>
          e.id === entry.id ? { ...e, status, value, updatedAt: new Date() } : e
        );
        set({ entries: updatedEntries });
        await storageService.saveEntries(updatedEntries);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error updating entry:", error);
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

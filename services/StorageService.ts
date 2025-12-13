import StorageKeys from "@/constants/StorageKeys";
import { AppState, Habit } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

class StorageService {
  async loadHabits(): Promise<Habit[]> {
    try {
      const data = await AsyncStorage.getItem(StorageKeys.HABITS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error loading habits:", error);
      return [];
    }
  }

  async saveHabits(habits: Habit[]): Promise<void> {
    try {
      await AsyncStorage.setItem(StorageKeys.HABITS, JSON.stringify(habits));
    } catch (error) {
      console.error("Error saving habits:", error);
      throw new Error("خطا در ذخیره‌سازی عادت‌ها");
    }
  }

  async loadAppState(): Promise<Partial<AppState>> {
    try {
      const habits = await this.loadHabits();

      return { habits };
    } catch (error) {
      console.error("Error loading app state:", error);
      return {};
    }
  }
}

const storageService = new StorageService();
export default storageService;

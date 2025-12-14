import StorageKeys from "@/constants/StorageKeys";
import { AppState, DailyEntry, Habit, Streak } from "@/types";
import { sortHabits } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

class StorageService {
  async loadHabits(): Promise<Habit[]> {
    try {
      const data = await AsyncStorage.getItem(StorageKeys.HABITS);
      const parsedData: Habit[] = data ? JSON.parse(data) : [];

      return sortHabits(parsedData);
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

  async loadEntries(): Promise<DailyEntry[]> {
    try {
      const data = await AsyncStorage.getItem(StorageKeys.ENTRIES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error loading entries:", error);
      return [];
    }
  }

  async saveEntries(entries: DailyEntry[]): Promise<void> {
    try {
      await AsyncStorage.setItem(StorageKeys.ENTRIES, JSON.stringify(entries));
    } catch (error) {
      console.error("Error saving entries:", error);
      throw new Error("خطا در ذخیره‌سازی ورودی‌ها");
    }
  }

  async saveStreaks(streaks: Record<string, Streak>): Promise<void> {
    try {
      await AsyncStorage.setItem(StorageKeys.STREAKS, JSON.stringify(streaks));
    } catch (error) {
      console.error("Error saving streaks:", error);
      throw new Error("خطا در ذخیره‌سازی استریک‌ها");
    }
  }

  async loadStreaks(): Promise<Record<string, Streak>> {
    try {
      const data = await AsyncStorage.getItem(StorageKeys.STREAKS);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error("Error loading streaks:", error);
      return {};
    }
  }

  async loadLastSync(): Promise<Date | null> {
    try {
      const data = await AsyncStorage.getItem(StorageKeys.LAST_SYNC);
      return data ? new Date(data) : null;
    } catch (error) {
      console.error("Error loading last sync:", error);
      return null;
    }
  }

  async saveLastSync(date: Date): Promise<void> {
    try {
      await AsyncStorage.setItem(StorageKeys.LAST_SYNC, date.toISOString());
    } catch (error) {
      console.error("Error saving last sync:", error);
    }
  }

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(StorageKeys));
    } catch (error) {
      console.error("Error clearing storage:", error);
      throw new Error("خطا در پاک‌سازی داده‌ها");
    }
  }

  async loadAppState(): Promise<Partial<AppState>> {
    try {
      const [habits, entries, streaks, isGuestMode, lastSyncedAt] =
        await Promise.all([
          this.loadHabits(),
          this.loadEntries(),
          this.loadStreaks(),
          this.loadGuestMode(),
          this.loadLastSync(),
        ]);

      return {
        habits,
        entries,
        isGuestMode,
        streaks,
        lastSyncedAt: lastSyncedAt ?? undefined,
      };
    } catch (error) {
      console.error("Error loading app state:", error);
      return {};
    }
  }

  async saveGuestMode(isGuest: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(
        StorageKeys.GUEST_MODE,
        JSON.stringify(isGuest)
      );
    } catch (error) {
      console.error("Error saving guest mode:", error);
    }
  }

  async loadGuestMode(): Promise<boolean> {
    try {
      const data = await AsyncStorage.getItem(StorageKeys.GUEST_MODE);
      return data ? JSON.parse(data) : false;
    } catch (error) {
      console.error("Error loading guest mode:", error);
      return false;
    }
  }
}

const storageService = new StorageService();
export default storageService;

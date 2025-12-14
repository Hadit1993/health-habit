import { ApiResponse, DailyEntry, Habit, SyncPayload } from "@/types";
import { generateId } from "@/utils";

class ApiService {
  private syncDelay = 1000;

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async createHabit(
    habit: Omit<Habit, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<Habit>> {
    await this.delay(this.syncDelay);

    try {
      const newHabit: Habit = {
        ...habit,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return {
        data: newHabit,
        success: true,
      };
    } catch (error) {
      return {
        data: {} as Habit,
        success: false,
        error: "خطا در ایجاد عادت",
      };
    }
  }

  async updateHabit(
    id: string,
    updates: Partial<Habit>
  ): Promise<ApiResponse<Habit>> {
    await this.delay(this.syncDelay);

    try {
      const updatedHabit: Habit = {
        ...updates,
        id,
        updatedAt: new Date(),
      } as Habit;

      return {
        data: updatedHabit,
        success: true,
      };
    } catch (error) {
      return {
        data: {} as Habit,
        success: false,
        error: "خطا در به‌روزرسانی عادت",
      };
    }
  }

  async deleteHabit(id: string): Promise<ApiResponse<{ id: string }>> {
    await this.delay(this.syncDelay);

    try {
      return {
        data: { id },
        success: true,
      };
    } catch (error) {
      return {
        data: { id: "" },
        success: false,
        error: "خطا در حذف عادت",
      };
    }
  }

  async createEntry(
    entry: Omit<DailyEntry, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<DailyEntry>> {
    await this.delay(this.syncDelay);

    try {
      const newEntry: DailyEntry = {
        ...entry,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return {
        data: newEntry,
        success: true,
      };
    } catch (error) {
      return {
        data: {} as DailyEntry,
        success: false,
        error: "خطا در ثبت ورودی",
      };
    }
  }

  async updateEntry(
    id: string,
    updates: Partial<DailyEntry>
  ): Promise<ApiResponse<DailyEntry>> {
    await this.delay(this.syncDelay);

    try {
      const updatedEntry: DailyEntry = {
        ...updates,
        id,
        updatedAt: new Date(),
      } as DailyEntry;

      return {
        data: updatedEntry,
        success: true,
      };
    } catch (error) {
      return {
        data: {} as DailyEntry,
        success: false,
        error: "خطا در به‌روزرسانی ورودی",
      };
    }
  }

  async syncData(payload: SyncPayload): Promise<ApiResponse<SyncPayload>> {
    await this.delay(this.syncDelay);

    try {
      return {
        data: {
          ...payload,
          timestamp: new Date(),
        },
        success: true,
      };
    } catch (error) {
      return {
        data: payload,
        success: false,
        error: "خطا در همگام‌سازی داده‌ها",
      };
    }
  }
}

const apiService = new ApiService();

export default apiService;

import { ApiResponse, Habit } from "@/types";
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
}

const apiService = new ApiService();

export default apiService;

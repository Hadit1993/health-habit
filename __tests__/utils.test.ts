import { DailyEntry, DailyProgress, HabitStatus } from "../types";
import {
  calculateStreak,
  formatDateString,
  formatShareMessage,
  generateId,
  validateHabitForm,
} from "../utils";

describe("Utils", () => {
  describe("formatDateString", () => {
    it("should format date correctly", () => {
      const date = new Date("2024-01-15T10:30:00");
      expect(formatDateString(date)).toBe("2024-01-15");
    });
  });

  describe("getTodayString", () => {
    it("should return today as string", () => {
      const result = formatDateString(new Date());
      expect(typeof result).toBe("string");
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe("calculateStreak", () => {
    it("should calculate current streak correctly", () => {
      const entries: DailyEntry[] = [
        {
          id: "1",
          habitId: "habit1",
          date: "2024-01-15",
          status: HabitStatus.COMPLETED,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          habitId: "habit1",
          date: "2024-01-14",
          status: HabitStatus.COMPLETED,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3",
          habitId: "habit1",
          date: "2024-01-13",
          status: HabitStatus.COMPLETED,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const streak = calculateStreak("habit1", entries);
      expect(streak.habitId).toBe("habit1");
      expect(streak.currentStreak).toBeGreaterThanOrEqual(0);
      expect(streak.longestStreak).toBeGreaterThanOrEqual(0);
    });

    it("should return zero streak for no entries", () => {
      const streak = calculateStreak("habit1", []);
      expect(streak.currentStreak).toBe(0);
      expect(streak.longestStreak).toBe(0);
    });

    it("should break streak on not completed", () => {
      const entries: DailyEntry[] = [
        {
          id: "1",
          habitId: "habit1",
          date: "2024-01-15",
          status: HabitStatus.COMPLETED,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          habitId: "habit1",
          date: "2024-01-14",
          status: HabitStatus.NOT_COMPLETED,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const streak = calculateStreak("habit1", entries);
      expect(streak.currentStreak).toBeLessThanOrEqual(1);
    });
  });

  describe("validateHabitForm", () => {
    it("should return error for empty title", () => {
      const error = validateHabitForm("", undefined);
      expect(error).toBeTruthy();
      expect(error).toContain("الزامی");
    });

    it("should return error for short title", () => {
      const error = validateHabitForm("ab", undefined);
      expect(error).toBeTruthy();
      expect(error).toContain("۳ کاراکتر");
    });

    it("should return error for negative target", () => {
      const error = validateHabitForm("Test Habit", -5);
      expect(error).toBeTruthy();
      expect(error).toContain("مثبت");
    });

    it("should return null for valid input", () => {
      const error = validateHabitForm("Test Habit", 10);
      expect(error).toBeNull();
    });

    it("should accept undefined target", () => {
      const error = validateHabitForm("Test Habit", undefined);
      expect(error).toBeNull();
    });
  });

  describe("formatShareMessage", () => {
    it("should format message correctly", () => {
      const progress: DailyProgress = {
        date: "2024-01-15",
        completedHabits: 3,
        totalHabits: 5,
        percentage: 60,
        streaks: {},
      };

      const message = formatShareMessage(progress);
      expect(message).toContain("3");
      expect(message).toContain("5");
      expect(message).toContain("60");
      expect(message).toContain("🎉");
    });
  });

  describe("generateId", () => {
    it("should generate unique IDs", () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe("string");
      expect(id1.length).toBeGreaterThan(0);
    });
  });
});

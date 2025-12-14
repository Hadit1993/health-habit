import { DailyEntry, DailyProgress, Habit, HabitStatus, Streak } from "@/types";
import { format, parseISO, startOfDay, subDays } from "date-fns";

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

export const formatDateString = (date: Date): string => {
  return format(startOfDay(date), "yyyy-MM-dd");
};

export const validateHabitForm = (
  title: string,
  target?: number
): string | null => {
  if (!title.trim()) {
    return "عنوان الزامی است";
  }
  if (title.trim().length < 3) {
    return "عنوان باید حداقل ۳ کاراکتر باشد";
  }
  if (target !== undefined && target <= 0) {
    return "هدف باید عددی مثبت باشد";
  }
  return null;
};

export const sortHabits = (habits: Habit[]) => {
  return habits.sort(
    (a, b) =>
      new Date(a.updatedAt).getMilliseconds() -
      new Date(b.updatedAt).getMilliseconds()
  );
};

export const calculateStreak = (
  habitId: string,
  entries: DailyEntry[]
): Streak => {
  const habitEntries = entries
    .filter((e) => e.habitId === habitId)
    .sort((a, b) => b.date.localeCompare(a.date));

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let lastCompletedDate: string | undefined;
  const today = formatDateString(new Date());

  for (let i = 0; i < habitEntries.length; i++) {
    const entry = habitEntries[i];

    if (entry.status === HabitStatus.COMPLETED) {
      if (!lastCompletedDate) {
        lastCompletedDate = entry.date;
      }

      const expectedDate =
        i === 0
          ? today
          : formatDateString(subDays(parseISO(habitEntries[i - 1].date), 1));

      if (entry.date === expectedDate) {
        currentStreak++;
      } else if (
        i === 0 &&
        entry.date === formatDateString(subDays(new Date(), 1))
      ) {
        currentStreak++;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  habitEntries.forEach((entry) => {
    if (entry.status === HabitStatus.COMPLETED) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  });

  return {
    habitId,
    currentStreak,
    longestStreak,
    lastCompletedDate,
  };
};

export const validateDailyEntryValue = (
  value: number,
  target: number
): string | null => {
  if (isNaN(value) || value <= 0 || value >= target) {
    return "مقدار نامعتبر است";
  }

  return null;
};

export const calculateDailyProgress = (
  date: string,
  habitIds: string[],
  entries: DailyEntry[]
): DailyProgress => {
  const dayEntries = entries.filter((e) => e.date === date);
  const completedHabits = dayEntries.filter(
    (e) => e.status === HabitStatus.COMPLETED
  ).length;

  const totalHabits = habitIds.length;
  const percentage =
    totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

  const streaks: Record<string, number> = {};
  habitIds.forEach((id) => {
    const streak = calculateStreak(id, entries);
    streaks[id] = streak.currentStreak;
  });

  return {
    date,
    completedHabits,
    totalHabits,
    percentage,
    streaks,
  };
};

export const formatShareMessage = (progress: DailyProgress): string => {
  return `امروز ${progress.completedHabits} از ${progress.totalHabits} عادت تکمیل شد (${progress.percentage}%) 🎉`;
};

export const getDateRange = (days: number): string[] => {
  const dates: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    dates.push(formatDateString(subDays(new Date(), i)));
  }
  return dates;
};

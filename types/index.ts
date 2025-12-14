export interface Habit {
  id: string;
  title: string;
  description?: string;
  target?: number;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DailyEntry {
  id: string;
  habitId: string;
  date: string;
  status: HabitStatus;
  value?: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum HabitStatus {
  COMPLETED = "completed",
  NOT_COMPLETED = "not_completed",
  PARTIAL = "partial",
}

export interface AppState {
  habits: Habit[];
  entries: DailyEntry[];
  isGuestMode: boolean;
}

export interface HabitFormData {
  title: string;
  description?: string;
  target?: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface Habit {
  id: string;
  title: string;
  description?: string;
  target?: number;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppState {
  habits: Habit[];
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

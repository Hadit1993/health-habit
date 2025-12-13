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
}

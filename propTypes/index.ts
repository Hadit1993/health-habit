import {
  ChartData,
  DailyEntry,
  Habit,
  HabitFormData,
  HabitStatus,
  Streak,
} from "@/types";

export interface HabitCardProps {
  habit: Habit;
  isGuestMode: boolean;
  streak?: Streak;
  onEdit: () => void;
  onDelete: () => void;
}

export interface HabitFormProps {
  visible: boolean;
  habit?: Habit;
  onSubmit: (data: HabitFormData) => Promise<void>;
  onCancel: () => void;
}

export interface DeleteConfirmationProps {
  visible: boolean;
  habitTitle?: String;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export interface DailyTrackerProps {
  habit: Habit;
  entry?: DailyEntry;
  isGuestMode: boolean;
  onLog: (status: HabitStatus, value?: number) => Promise<void>;
}

export interface ProgressChartProps {
  data: ChartData;
  title: string;
  type?: "line" | "pie";
}

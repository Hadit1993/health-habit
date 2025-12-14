import { DailyEntry, Habit, HabitFormData, HabitStatus } from "@/types";

export interface HabitCardProps {
  habit: Habit;
  isGuestMode: boolean;
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
  onLog: (status: HabitStatus, value?: number) => Promise<void>;
}

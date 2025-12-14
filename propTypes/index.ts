import { Habit, HabitFormData } from "@/types";

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

import { Habit, HabitFormData } from "@/types";

export interface HabitCardProps {
  habit: Habit;
  isGuestMode: boolean;
  onEdit: () => void;
}

export interface HabitFormProps {
  visible: boolean;
  habit?: Habit;
  onSubmit: (data: HabitFormData) => Promise<void>;
  onCancel: () => void;
}

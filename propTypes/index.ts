import { Habit, HabitFormData } from "@/types";

export interface HabitCardProps {
  habit: Habit;
  isGuestMode: boolean;
}

export interface HabitFormProps {
  visible: boolean;
  onSubmit: (data: HabitFormData) => Promise<void>;
  onCancel: () => void;
}

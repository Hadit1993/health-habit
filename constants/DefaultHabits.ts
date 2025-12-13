import { Habit } from "@/types";

const DefaultHabits: Omit<Habit, "id" | "createdAt" | "updatedAt">[] = [
  {
    title: "نوشیدن ۸ لیوان آب",
    description: "برای حفظ سلامتی و هیدراتاسیون بدن",
    target: 8,
    isDefault: true,
  },
  {
    title: "ورزش ۳۰ دقیقه",
    description: "فعالیت بدنی روزانه",
    target: 30,
    isDefault: true,
  },
  {
    title: "مدیتیشن ۱۰ دقیقه",
    description: "آرامش ذهن و تمرکز",
    target: 10,
    isDefault: true,
  },
];

export default DefaultHabits;

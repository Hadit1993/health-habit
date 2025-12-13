export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
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

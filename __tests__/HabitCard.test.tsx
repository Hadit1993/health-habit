import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import HabitCard from "../components/HabitCard";
import { Habit, Streak } from "../types";

jest.mock("@expo/vector-icons", () => ({
  MaterialIcons: "MaterialIcons",
}));

describe("HabitCard Component", () => {
  const mockHabit: Habit = {
    id: "1",
    title: "نوشیدن آب",
    description: "نوشیدن ۸ لیوان آب در روز",
    target: 8,
    isDefault: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  };

  const mockStreak: Streak = {
    habitId: "1",
    currentStreak: 5,
    longestStreak: 10,
    lastCompletedDate: "2024-01-15",
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering Basic Elements", () => {
    it("renders habit title correctly", () => {
      const { getByText } = render(
        <HabitCard
          habit={mockHabit}
          isGuestMode={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(getByText("نوشیدن آب")).toBeTruthy();
    });

    it("renders habit description when provided", () => {
      const { getByText } = render(
        <HabitCard
          habit={mockHabit}
          isGuestMode={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(getByText("نوشیدن ۸ لیوان آب در روز")).toBeTruthy();
    });

    it("does not render description when not provided", () => {
      const habitWithoutDescription = { ...mockHabit, description: undefined };
      const { queryByText } = render(
        <HabitCard
          habit={habitWithoutDescription}
          isGuestMode={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(queryByText("نوشیدن ۸ لیوان آب در روز")).toBeNull();
    });
  });

  describe("Target Display", () => {
    it("renders target label and value when provided", () => {
      const { getByText } = render(
        <HabitCard
          habit={mockHabit}
          isGuestMode={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(getByText("هدف:")).toBeTruthy();
      expect(getByText("8")).toBeTruthy();
    });

    it("does not render target when not provided", () => {
      const habitWithoutTarget = { ...mockHabit, target: undefined };
      const { queryByText } = render(
        <HabitCard
          habit={habitWithoutTarget}
          isGuestMode={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(queryByText("هدف:")).toBeNull();
    });
  });

  describe("Default Badge", () => {
    it('shows "پیش‌فرض" badge when habit is default', () => {
      const defaultHabit = { ...mockHabit, isDefault: true };
      const { getByText } = render(
        <HabitCard
          habit={defaultHabit}
          isGuestMode={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(getByText("پیش‌فرض")).toBeTruthy();
    });

    it("does not show badge when habit is not default", () => {
      const { queryByText } = render(
        <HabitCard
          habit={mockHabit}
          isGuestMode={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(queryByText("پیش‌فرض")).toBeNull();
    });
  });

  describe("Streak Display", () => {
    it("renders streak emoji and days when streak is provided and > 0", () => {
      const { getByText } = render(
        <HabitCard
          habit={mockHabit}
          streak={mockStreak}
          isGuestMode={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(getByText("🔥")).toBeTruthy();
      expect(getByText("5 روز")).toBeTruthy();
    });

    it("does not render streak when currentStreak is 0", () => {
      const zeroStreak = { ...mockStreak, currentStreak: 0 };
      const { queryByText } = render(
        <HabitCard
          habit={mockHabit}
          streak={zeroStreak}
          isGuestMode={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(queryByText("🔥")).toBeNull();
      expect(queryByText("0 روز")).toBeNull();
    });

    it("does not render streak when streak is not provided", () => {
      const { queryByText } = render(
        <HabitCard
          habit={mockHabit}
          isGuestMode={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(queryByText("🔥")).toBeNull();
    });
  });

  describe("Guest Mode Behavior", () => {
    it("hides action buttons when in guest mode", () => {
      const { UNSAFE_queryAllByType } = render(
        <HabitCard
          habit={mockHabit}
          isGuestMode={true}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      const touchables = UNSAFE_queryAllByType(TouchableOpacity);
      expect(touchables.length).toBe(0);
    });

    it("shows action buttons when not in guest mode", () => {
      const { UNSAFE_getAllByType } = render(
        <HabitCard
          habit={mockHabit}
          isGuestMode={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      const touchables = UNSAFE_getAllByType(TouchableOpacity);
      expect(touchables.length).toBe(2);
    });
  });

  describe("User Interactions", () => {
    it("calls onEdit when edit button is pressed", () => {
      const { UNSAFE_getAllByType } = render(
        <HabitCard
          habit={mockHabit}
          isGuestMode={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      const touchables = UNSAFE_getAllByType(TouchableOpacity);
      act(() => {
        fireEvent.press(touchables[0]);
      });

      expect(mockOnEdit).toHaveBeenCalledTimes(1);
      expect(mockOnDelete).not.toHaveBeenCalled();
    });

    it("calls onDelete when delete button is pressed", () => {
      const { UNSAFE_getAllByType } = render(
        <HabitCard
          habit={mockHabit}
          isGuestMode={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      const touchables = UNSAFE_getAllByType(TouchableOpacity);

      act(() => {
        fireEvent.press(touchables[1]);
      });

      expect(mockOnDelete).toHaveBeenCalledTimes(1);
      expect(mockOnEdit).not.toHaveBeenCalled();
    });
  });

  describe("Complex Scenarios", () => {
    it("renders complete habit with all information", () => {
      const fullHabit: Habit = {
        id: "1",
        title: "ورزش روزانه",
        description: "ورزش کردن ۳۰ دقیقه در روز",
        target: 30,
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { getByText } = render(
        <HabitCard
          habit={fullHabit}
          streak={mockStreak}
          isGuestMode={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(getByText("ورزش روزانه")).toBeTruthy();
      expect(getByText("ورزش کردن ۳۰ دقیقه در روز")).toBeTruthy();
      expect(getByText("پیش‌فرض")).toBeTruthy();
      expect(getByText("هدف:")).toBeTruthy();
      expect(getByText("30")).toBeTruthy();
      expect(getByText("🔥")).toBeTruthy();
      expect(getByText("5 روز")).toBeTruthy();
    });

    it("renders minimal habit with only required fields", () => {
      const minimalHabit: Habit = {
        id: "1",
        title: "عادت جدید",
        isDefault: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { getByText, queryByText } = render(
        <HabitCard
          habit={minimalHabit}
          isGuestMode={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(getByText("عادت جدید")).toBeTruthy();
      expect(queryByText("پیش‌فرض")).toBeNull();
      expect(queryByText("هدف:")).toBeNull();
      expect(queryByText("🔥")).toBeNull();
    });
  });
});

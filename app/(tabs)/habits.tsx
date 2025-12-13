import HabitCard from "@/components/HabitCard";
import HabitForm from "@/components/HabitForm";
import { useStore } from "@/store";
import styles from "@/styles/HabitsPageStyle";
import { Habit, HabitFormData } from "@/types";
import { useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HabitsPage() {
  const { habits, isGuestMode, addHabit, updateHabit } = useStore();
  const [formVisible, setFormVisible] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>();

  const handleAddHabit = (): void => {
    if (isGuestMode) {
      Alert.alert("حالت مهمان", "در حالت مهمان نمی‌توانید عادت اضافه کنید");
      return;
    }
    setEditingHabit(undefined);
    setFormVisible(true);
  };

  const handleEditHabit = (habit: Habit): void => {
    if (isGuestMode) {
      Alert.alert("حالت مهمان", "در حالت مهمان نمی‌توانید عادت را ویرایش کنید");
      return;
    }
    setEditingHabit(habit);
    setFormVisible(true);
  };

  const handleSubmitForm = async (data: HabitFormData): Promise<void> => {
    if (editingHabit) {
      await updateHabit(editingHabit.id, data);
    } else {
      await addHabit(data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>عادت‌های من</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddHabit}>
          <Text style={styles.addButtonText}>+ افزودن</Text>
        </TouchableOpacity>
      </View>

      {isGuestMode && (
        <View style={styles.guestBanner}>
          <Text style={styles.guestText}>🔒 حالت مهمان - فقط مشاهده</Text>
        </View>
      )}
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitCard
            habit={item}
            isGuestMode={isGuestMode}
            onEdit={() => handleEditHabit(item)}
          />
        )}
        contentContainerStyle={styles.list}
      />
      <HabitForm
        visible={formVisible}
        habit={editingHabit}
        onSubmit={handleSubmitForm}
        onCancel={() => setFormVisible(false)}
      />
    </SafeAreaView>
  );
}

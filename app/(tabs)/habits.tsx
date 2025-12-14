import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import HabitCard from "@/components/HabitCard";
import HabitForm from "@/components/HabitForm";
import { useStore } from "@/store";
import styles from "@/styles/HabitsPageStyle";
import { Habit, HabitFormData } from "@/types";
import { useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HabitsPage() {
  const { habits, isGuestMode, addHabit, updateHabit, deleteHabit } =
    useStore();
  const [formVisible, setFormVisible] = useState(false);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
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

  const handleDeleteHabit = (habit: Habit): void => {
    if (isGuestMode) {
      Alert.alert("حالت مهمان", "در حالت مهمان نمی‌توانید عادت را حذف کنید");
      return;
    }
    setEditingHabit(habit);
    setDeleteConfirmationVisible(true);
  };

  const onDeleteConfirm = async () => {
    try {
      if (editingHabit?.id) await deleteHabit(editingHabit?.id);
    } catch (error) {
      Alert.alert("خطا", "خطایی در حذف عادت رخ داد");
    }
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
            onDelete={() => handleDeleteHabit(item)}
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
      <DeleteConfirmationModal
        visible={deleteConfirmationVisible}
        habitTitle={editingHabit?.title}
        onCancel={() => setDeleteConfirmationVisible(false)}
        onDelete={onDeleteConfirm}
      />
    </SafeAreaView>
  );
}

import HabitCard from "@/components/HabitCard";
import HabitForm from "@/components/HabitForm";
import { useStore } from "@/store";
import styles from "@/styles/HabitsPageStyle";
import { HabitFormData } from "@/types";
import { useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HabitsPage() {
  const { habits, isGuestMode, addHabit } = useStore();
  const [formVisible, setFormVisible] = useState(false);

  const handleAddHabit = (): void => {
    if (isGuestMode) {
      Alert.alert("حالت مهمان", "در حالت مهمان نمی‌توانید عادت اضافه کنید");
      return;
    }

    setFormVisible(true);
  };

  const handleSubmitForm = async (data: HabitFormData): Promise<void> => {
    await addHabit(data);
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
          <HabitCard habit={item} isGuestMode={isGuestMode} />
        )}
        contentContainerStyle={styles.list}
      />
      <HabitForm
        visible={formVisible}
        onSubmit={handleSubmitForm}
        onCancel={() => setFormVisible(false)}
      />
    </SafeAreaView>
  );
}

import HabitCard from "@/components/HabitCard";
import { useStore } from "@/store";
import styles from "@/styles/HabitsPageStyle";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HabitsPage() {
  const { habits } = useStore();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>عادت‌های من</Text>
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HabitCard habit={item} />}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

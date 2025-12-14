import DailyTracker from "@/components/DailyTracker";
import LoadingModal from "@/components/LoadingModal";
import { useStore } from "@/store";
import styles from "@/styles/TrackingPageStyle";
import { HabitStatus } from "@/types";
import { formatDateString } from "@/utils";
import { useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TrackingPage() {
  const { habits, entries, logEntry } = useStore();
  const today = formatDateString(new Date());
  const [loading, setLoading] = useState(false);

  const handleLog = async (
    habitId: string,
    status: HabitStatus,
    value?: number
  ): Promise<void> => {
    try {
      setLoading(true);
      await logEntry(habitId, status, value);
    } catch (error) {
      Alert.alert("خطا", "خطایی در ثبت ورودی رخ داد");
    } finally {
      setLoading(false);
    }
  };

  const todayEntries = entries.filter((e) => e.date === today);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ثبت امروز</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString("fa-IR-u-ca-persian")}
        </Text>
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DailyTracker
            habit={item}
            entry={todayEntries.find((e) => e.habitId === item.id)}
            onLog={(status, value) => handleLog(item.id, status, value)}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>هنوز عادتی برای ثبت وجود ندارد</Text>
            <Text style={styles.emptySubtext}>
              ابتدا از بخش عادت‌ها، عادت جدید اضافه کنید
            </Text>
          </View>
        }
      />
      <LoadingModal loading={loading} />
    </SafeAreaView>
  );
}

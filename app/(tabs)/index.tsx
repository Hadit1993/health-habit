import ProgressChart from "@/components/ProgressChart";
import { useStore } from "@/store";
import styles from "@/styles/DashboardPageStyle";
import {
  calculateDailyProgress,
  formatDateString,
  formatShareMessage,
  getDateRange,
} from "@/utils";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardPage() {
  const { habits, entries, streaks } = useStore();
  const [showWeekly, setShowWeekly] = useState(true);
  const today = formatDateString(new Date());
  const todayProgress = calculateDailyProgress(
    today,
    habits.map((h) => h.id),
    entries
  );

  const handleShare = (): void => {
    const message = formatShareMessage(todayProgress);
    Alert.alert("اشتراک‌گذاری پیشرفت", message, [
      { text: "بستن", style: "cancel" },
    ]);
  };

  const dates = getDateRange(7);
  const weeklyData = dates.map((date) =>
    calculateDailyProgress(
      date,
      habits.map((h) => h.id),
      entries
    )
  );

  const weeklyChartData = {
    labels: dates.map((d) =>
      new Date(d).toLocaleDateString("fa-IR-u-ca-persian", {
        day: "2-digit",
        month: "2-digit",
      })
    ),
    datasets: [
      {
        data: weeklyData.map((d) => d.percentage),
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>داشبورد</Text>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareButtonText}>📤 اشتراک</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Progress */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>پیشرفت امروز</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressPercentage}>
                {todayProgress.percentage}%
              </Text>
              <Text style={styles.progressLabel}>تکمیل شده</Text>
            </View>
            <View style={styles.progressDetails}>
              <Text style={styles.progressText}>
                {todayProgress.completedHabits} از {todayProgress.totalHabits}{" "}
                عادت
              </Text>
              <Text style={styles.progressSubtext}>انجام شده</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>استریک‌های فعال 🔥</Text>
          {Object.entries(streaks).length > 0 ? (
            <View style={styles.streaksList}>
              {Object.entries(streaks).map(([habitId, streak]) => {
                const habit = habits.find((h) => h.id === habitId);
                return habit && streak.currentStreak > 0 ? (
                  <View key={habitId} style={styles.streakItem}>
                    <Text style={styles.streakHabit}>{habit.title}</Text>
                    <Text style={styles.streakValue}>
                      {streak.currentStreak} روز
                    </Text>
                  </View>
                ) : null;
              })}
            </View>
          ) : (
            <Text style={styles.emptyText}>هنوز استریکی ثبت نشده</Text>
          )}
        </View>

        {weeklyData.length > 0 && (
          <ProgressChart
            data={weeklyChartData}
            title="پیشرفت ۷ روز گذشته"
            type="line"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

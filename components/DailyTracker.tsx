import { Colors } from "@/constants/theme";
import { DailyTrackerProps } from "@/propTypes";
import styles from "@/styles/DailyTrackerStyle";
import { HabitStatus } from "@/types";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function DailyTracker({
  habit,
  entry,
  onLog,
}: DailyTrackerProps) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(entry?.value?.toString() || "");

  const handleStatusChange = async (status: HabitStatus): Promise<void> => {
    setLoading(true);
    try {
      await onLog(status, undefined);
    } finally {
      setLoading(false);
    }
  };

  const handlePartialSubmit = async (): Promise<void> => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue <= 0) {
      return;
    }

    setLoading(true);
    try {
      await onLog(HabitStatus.PARTIAL, numValue);
    } finally {
      setLoading(false);
    }
  };

  const isCompleted = entry?.status === HabitStatus.COMPLETED;
  const isNotCompleted = entry?.status === HabitStatus.NOT_COMPLETED;
  const isPartial = entry?.status === HabitStatus.PARTIAL;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{habit.title}</Text>
        {habit.target && <Text style={styles.target}>هدف: {habit.target}</Text>}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            styles.completedButton,
            isCompleted && styles.activeButton,
          ]}
          onPress={() => handleStatusChange(HabitStatus.COMPLETED)}
          disabled={loading}
        >
          <Text style={styles.statusIcon}>✅</Text>
          <Text style={styles.statusText}>انجام شد</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusButton,
            styles.notCompletedButton,
            isNotCompleted && styles.activeButton,
          ]}
          onPress={() => handleStatusChange(HabitStatus.NOT_COMPLETED)}
          disabled={loading}
        >
          <Text style={styles.statusIcon}>❌</Text>
          <Text style={styles.statusText}>انجام نشد</Text>
        </TouchableOpacity>
      </View>

      {habit.target && (
        <View style={styles.partialSection}>
          <Text style={styles.partialLabel}>یا میزان انجام:</Text>
          <View style={styles.partialInput}>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={setValue}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={Colors.textSecondary}
              editable={!loading}
            />
            <Text style={styles.partialUnit}>از {habit.target}</Text>
            <TouchableOpacity
              style={[
                styles.partialButton,
                isPartial && styles.activePartialButton,
              ]}
              onPress={handlePartialSubmit}
              disabled={loading || !value}
            >
              <Text style={styles.partialButtonText}>ثبت</Text>
            </TouchableOpacity>
          </View>
          {isPartial && entry?.value && (
            <Text style={styles.partialValue}>
              ثبت شده: {entry.value} از {habit.target}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

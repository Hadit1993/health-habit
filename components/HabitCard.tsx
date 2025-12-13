import { HabitCardProps } from "@/propTypes";
import styles from "@/styles/HabitCardStyle";
import { Text, View } from "react-native";

export default function HabitCard({ habit }: HabitCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{habit.title}</Text>
          {habit.isDefault && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>پیش‌فرض</Text>
            </View>
          )}
        </View>
      </View>

      {habit.description && (
        <Text style={styles.description}>{habit.description}</Text>
      )}

      <View style={styles.footer}>
        {habit.target && (
          <View style={styles.target}>
            <Text style={styles.targetLabel}>هدف:</Text>
            <Text style={styles.targetValue}>{habit.target}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

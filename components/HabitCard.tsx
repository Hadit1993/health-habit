import { Colors } from "@/constants/theme";
import { HabitCardProps } from "@/propTypes";
import styles from "@/styles/HabitCardStyle";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, TouchableOpacity, View } from "react-native";

export default function HabitCard({
  habit,
  isGuestMode,
  onEdit,
  onDelete,
}: HabitCardProps) {
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
        {!isGuestMode && (
          <View style={styles.actions}>
            <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
              <MaterialIcons name="edit" size={24} color={Colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
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

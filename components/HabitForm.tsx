import { Colors } from "@/constants/theme";
import { HabitFormProps } from "@/propTypes";
import styles from "@/styles/HabitFormStyle";
import { validateHabitForm } from "@/utils";
import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HabitForm({
  visible,
  habit,
  onSubmit,
  onCancel,
}: HabitFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (habit) {
      setTitle(habit.title);
      setDescription(habit.description || "");
      setTarget(habit.target?.toString() || "");
    } else {
      setTitle("");
      setDescription("");
      setTarget("");
    }
  }, [habit, visible]);

  const handleSubmit = async (): Promise<void> => {
    const targetNumber = target ? parseInt(target, 10) : undefined;
    const error = validateHabitForm(title, targetNumber);

    if (error) {
      Alert.alert("خطا", error);
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        target: targetNumber,
      });
      onCancel();
    } catch (error) {
      Alert.alert("خطا", "خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {habit ? "ویرایش عادت" : "افزودن عادت جدید"}
          </Text>

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>عنوان *</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="مثال: دویدن صبحگاهی"
                placeholderTextColor={Colors.textSecondary}
                editable={!loading}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>توضیحات</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="توضیحات اختیاری"
                placeholderTextColor={Colors.textSecondary}
                multiline
                numberOfLines={3}
                editable={!loading}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>هدف (عدد)</Text>
              <TextInput
                style={styles.input}
                value={target}
                onChangeText={setTarget}
                placeholder="مثال: 30 (دقیقه، لیوان، ...)"
                placeholderTextColor={Colors.textSecondary}
                keyboardType="numeric"
                editable={!loading}
              />
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>لغو</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.submitButton,
                loading && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.submitButtonText}>
                {loading ? "در حال ذخیره..." : habit ? "ذخیره" : "افزودن"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

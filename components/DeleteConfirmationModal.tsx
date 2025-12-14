import { DeleteConfirmationProps } from "@/propTypes";
import styles from "@/styles/HabitFormStyle";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function DeleteConfirmationModal({
  visible,
  habitTitle,
  onDelete,
  onCancel,
}: DeleteConfirmationProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onDelete();
    setLoading(false);
    onCancel();
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {`آیا از حذف عادت ${habitTitle ?? " "} اطمینان دارید؟`}
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>خیر</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.submitButton,
                loading && styles.disabledButton,
              ]}
              onPress={handleDelete}
              disabled={loading}
            >
              <Text style={styles.submitButtonText}>
                {loading ? "در حال حذف..." : "بله"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

import { Colors } from "@/constants/theme";
import styles from "@/styles/HabitFormStyle";
import { ActivityIndicator, Modal, Text, View } from "react-native";
export default function LoadingModal({ loading }: { loading: boolean }) {
  return (
    <Modal visible={loading} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text
            style={[styles.label, { textAlign: "center", marginBottom: 20 }]}
          >
            در حال ثبت
          </Text>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </View>
    </Modal>
  );
}

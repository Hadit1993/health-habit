import { Colors } from "@/constants/theme";
import { useStore } from "@/store";
import styles from "@/styles/SettingsPageStyle";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsPage() {
  const {
    isGuestMode,
    toggleGuestMode,
    resetApp,
    lastSyncedAt,
    syncWithServer,
  } = useStore();
  const [syncing, setSyncing] = useState(false);

  const handleToggleGuestMode = async (): Promise<void> => {
    try {
      await toggleGuestMode();
      Alert.alert(
        isGuestMode ? "حالت عادی فعال شد" : "حالت مهمان فعال شد",
        isGuestMode
          ? "حالا می‌توانید عادت‌ها را ویرایش کنید"
          : "در حالت مهمان فقط می‌توانید مشاهده کنید"
      );
    } catch (error) {
      Alert.alert("خطا", "خطایی در تغییر حالت رخ داد");
    }
  };

  const handleSync = async (): Promise<void> => {
    setSyncing(true);
    try {
      await syncWithServer();
      Alert.alert("موفق", "داده‌ها با موفقیت همگام‌سازی شدند");
    } catch (error) {
      Alert.alert("خطا", "خطایی در همگام‌سازی رخ داد");
    } finally {
      setSyncing(false);
    }
  };

  const handleReset = (): void => {
    Alert.alert(
      "پاک‌سازی داده‌ها",
      "آیا مطمئن هستید؟ تمام عادت‌ها و ورودی‌ها حذف خواهند شد.",
      [
        { text: "لغو", style: "cancel" },
        {
          text: "پاک‌سازی",
          style: "destructive",
          onPress: async () => {
            try {
              await resetApp();
              Alert.alert("موفق", "داده‌ها با موفقیت پاک شدند");
            } catch (error) {
              Alert.alert("خطا", "خطایی در پاک‌سازی رخ داد");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>تنظیمات</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>حالت مهمان</Text>
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>حالت مهمان</Text>
                <Text style={styles.settingDescription}>
                  {isGuestMode
                    ? "فقط مشاهده - امکان ویرایش ندارید"
                    : "می‌توانید عادت‌ها را ویرایش کنید"}
                </Text>
              </View>
              <Switch
                value={isGuestMode}
                onValueChange={handleToggleGuestMode}
                trackColor={{ false: Colors.border, true: Colors.primary }}
                thumbColor={isGuestMode ? Colors.primary : Colors.surfaceLight}
                ios_backgroundColor={Colors.border}
              />
            </View>

            {isGuestMode && (
              <View style={styles.warningBox}>
                <Text style={styles.warningIcon}>🔒</Text>
                <Text style={styles.warningText}>
                  در حالت مهمان نمی‌توانید عادت اضافه، ویرایش یا حذف کنید
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Data Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>داده‌ها</Text>

          <TouchableOpacity
            style={styles.card}
            onPress={handleSync}
            disabled={syncing}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>همگام‌سازی با سرور</Text>
                <Text style={styles.settingDescription}>
                  {lastSyncedAt
                    ? `آخرین همگام‌سازی: ${new Date(
                        lastSyncedAt
                      ).toLocaleDateString("fa-IR")}`
                    : "هنوز همگام‌سازی نشده"}
                </Text>
              </View>
              <Text style={styles.settingIcon}>{syncing ? "⏳" : "🔄"}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.dangerCard]}
            onPress={handleReset}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, styles.dangerText]}>
                  پاک‌سازی همه داده‌ها
                </Text>
                <Text style={styles.settingDescription}>
                  حذف تمام عادت‌ها و ورودی‌ها
                </Text>
              </View>
              <Text style={styles.settingIcon}>🗑️</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>درباره برنامه</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>نسخه</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={[styles.infoRow, styles.infoRowBorder]}>
              <Text style={styles.infoLabel}>سازنده</Text>
              <Text style={styles.infoValue}>Health Habits Team</Text>
            </View>
            <View style={[styles.infoRow, styles.infoRowBorder]}>
              <Text style={styles.infoLabel}>تکنولوژی</Text>
              <Text style={styles.infoValue}>React Native + TypeScript</Text>
            </View>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsBox}>
          <Text style={styles.instructionsTitle}>💡 راهنما</Text>
          <Text style={styles.instructionsText}>
            • حالت مهمان برای مشاهده بدون ویرایش است{"\n"}• همگام‌سازی داده‌ها
            را با سرور به‌روز می‌کند{"\n"}• پاک‌سازی تمام داده‌ها را حذف می‌کند
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

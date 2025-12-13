import { Colors } from "@/constants/theme";
import { useStore } from "@/store";
import styles from "@/styles/TabLayoutStyle";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function TabLayout() {
  const [loading, setLoading] = useState(true);
  const initializeApp = useStore((state) => state.initializeApp);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeApp();
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="habits"
        options={{
          title: "عادت‌ها",
          tabBarIcon: ({ color }) => (
            <MaterialIcons color={color} size={28} name="view-list" />
          ),
        }}
      />

      <Tabs.Screen
        name="tracking"
        options={{
          title: "ثبت",
          tabBarIcon: ({ color }) => (
            <MaterialIcons color={color} size={28} name="add-circle" />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "داشبورد",
          tabBarIcon: ({ color }) => (
            <MaterialIcons color={color} size={28} name="dashboard" />
          ),
        }}
      />
    </Tabs>
  );
}

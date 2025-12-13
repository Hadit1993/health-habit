import { Colors } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
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

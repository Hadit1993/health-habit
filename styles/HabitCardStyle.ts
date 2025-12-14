import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

const habitCardStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
  },
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  target: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  targetLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  targetValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  streakLabel: {
    fontSize: 16,
  },
  streakValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.warning,
  },
});

export default habitCardStyle;

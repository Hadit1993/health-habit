import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

const dailyTrackerstyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  target: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  statusButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  completedButton: {
    backgroundColor: Colors.surfaceLight,
  },
  notCompletedButton: {
    backgroundColor: Colors.surfaceLight,
  },
  activeButton: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}20`,
  },
  statusIcon: {
    fontSize: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },
  partialSection: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  partialLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  partialInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
    textAlign: "center",
  },
  partialUnit: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  partialButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  activePartialButton: {
    backgroundColor: Colors.success,
  },
  partialButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  partialValue: {
    fontSize: 12,
    color: Colors.success,
    marginTop: 8,
    textAlign: "center",
  },
});

export default dailyTrackerstyle;

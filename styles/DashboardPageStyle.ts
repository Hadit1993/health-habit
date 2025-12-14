import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

const dashboardPageStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
  },
  iconButton: {
    padding: 4,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.surfaceLight,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 8,
    borderColor: Colors.primary,
  },
  progressPercentage: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.text,
  },
  progressLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  progressDetails: {
    flex: 1,
  },
  progressText: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  progressSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  streaksList: {
    gap: 12,
  },
  streakItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 12,
  },
  streakHabit: {
    fontSize: 16,
    color: Colors.text,
    flex: 1,
  },
  streakValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.warning,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    paddingVertical: 20,
  },
});

export default dashboardPageStyle;

import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

const trackingPageStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  list: {
    padding: 20,
    paddingTop: 0,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textSecondary,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  guestBanner: {
    backgroundColor: Colors.warning,
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
  },
  guestText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.background,
    textAlign: "center",
  },
});

export default trackingPageStyle;

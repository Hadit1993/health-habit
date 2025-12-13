import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

const habitPageStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
  },
  list: {
    padding: 20,
    paddingTop: 0,
  },
  addButton: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
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

export default habitPageStyle;

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
});

export default habitPageStyle;

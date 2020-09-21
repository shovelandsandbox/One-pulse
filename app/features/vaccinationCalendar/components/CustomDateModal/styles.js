/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { backgroundColor: "rgba(0,0,0,0.7)" },
  contentView: {
    backgroundColor: "rgba(0,0,0,0.7)",
    flex: 1,
    position: "relative",
  },
  datePickerView: {
    alignItems: "center",
    backgroundColor: "#fff",
    bottom: 0,
    height: 260,
    position: "absolute",
    width: "100%",
  },
  doneText: { color: "#007AFF", fontSize: 15 },
  doneTextView: { height: 44, justifyContent: "center" },
  doneView: {
    alignItems: "flex-end",
    backgroundColor: "#FAFAF8",
    height: 44,
    justifyContent: "center",
    paddingRight: 10,
    width: "100%",
  },
});

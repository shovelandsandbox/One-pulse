/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/sort-styles */
import { StyleSheet, Platform } from "react-native";
import colors from "./config";

export default StyleSheet.create({
  pACModalOuterView: {
    flex: 1,
    backgroundColor: "rgba(100,100,100, 0.5)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  pACModalInnerView: {
    width: 350,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#000",
    borderWidth: 1,
  },
  pACJailBreakHeading: {
    fontSize: 18,
    color: "#000",
  },
  pACJailBreakText: {
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
    color: "#000",
  },
});

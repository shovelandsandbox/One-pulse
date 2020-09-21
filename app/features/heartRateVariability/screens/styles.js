import { StyleSheet } from "react-native";
import { Theme } from "../../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
  exitButton: {
    height: 50,
    justifyContent: "center",
    padding: 10,
    width: 80,
  },
  headerText: {
    color: "#000",
    fontFamily: "Open Sans",
    fontSize: 14,
    lineHeight: 16,
    marginLeft: 20,
  },
  mainHeader: {
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    height: 50,
  },
  resultClose: {
    height: 14,
    width: 20,
  },
});

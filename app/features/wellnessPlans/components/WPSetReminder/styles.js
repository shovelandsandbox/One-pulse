import { StyleSheet } from "react-native";

import { Theme } from "../../../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  timeContainer: {
    width: 60.7,
    height: 30.3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1.7,
    borderStyle: "solid",
    borderWidth: 0.3,
    borderColor: "#969696",
    marginTop: 4,
  },
  checkedContainer: {
    backgroundColor: Colors.redec1c2e,
  },
  uncheckedContainer: {
    backgroundColor: "#fff",
  },
  timeTitle: {
    fontSize: 12,
    lineHeight: 11.7,
    textAlign: "center",
    fontWeight: "bold"
  },
  uncheckedTitle: {
    color: "#2f2f2f"
  },
  checkedTitle: {
    color: Colors.white,
  }
});

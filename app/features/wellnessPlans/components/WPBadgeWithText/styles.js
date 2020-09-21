import { StyleSheet } from "react-native";

import { Theme } from "../../../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    width: 13,
    height: 13
  },
  title: {
    fontSize: 14,
    color: Colors.white,
    marginLeft: 3
  }
});

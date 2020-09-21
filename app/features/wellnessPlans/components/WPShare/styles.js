import { StyleSheet } from "react-native";

import { Theme } from "../../../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6.7,
  },
  icon: {
    width: 14, 
    height: 14,
  },
  buttonText: {
    color: Colors.redec1c2e, 
    fontSize: 9.3,
    lineHeight: 25,
  }
});

import { StyleSheet } from "react-native";

import { Theme } from "../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.text333333,
    shadowOpacity: 0.1,
    shadowOffset: { x: 2, y: 0 },
    shadowRadius: 2,
    borderRadius: 30,
    position: "absolute",
    bottom: 16.7,
    right: 16.7,
    backgroundColor: Colors.redec1c2e,
  },
  imageSmallStyle: { 
    height:16.7 , 
    width: 24,
  },
  label: {
    color: Colors.white,
    fontSize: 9.3
  },
});

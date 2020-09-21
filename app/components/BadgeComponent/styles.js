import { StyleSheet } from "react-native";

import { Theme } from "../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
  fabSubContainer: {
    height: 17.7,
    width: 17.7,
    borderRadius: 90,
    backgroundColor: Colors.redec1c2e,
    position: "absolute",
    shadowColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.white,
    borderWidth: 0.5
  },
  badgeCount: {
    color: Colors.white,
    fontSize: 10.7
  }
});

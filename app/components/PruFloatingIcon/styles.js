import { StyleSheet } from "react-native";

import { Theme } from "../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
  background: {
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 16.7,
    right: 16.7,
    borderRadius: 30,
  },
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
    elevation: 5,
    backgroundColor: Colors.redec1c2e,
  },
  imageSmallStyle: { 
    height: 32, 
    width: 34, 
  },
  imageCloseStyle: {
    height: 60,
    width: 60
  },
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
    borderColor: Colors.redec1c2e,
    borderWidth: 0.5
  },
  notificationCount: {
    color: Colors.white,
    fontSize: 10.7,
  },
});

import { StyleSheet } from "react-native";

import { Theme } from "../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
  linearGradient: {
    width: 250 ,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 16.7,
  },
  buttonText: {
    fontSize: 12,
    textAlign: "center",
    margin: 10,
    color: Colors.white,
    backgroundColor: "transparent",
    lineHeight: 22,
  },
  supportTextView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  supportText: {
    fontFamily: "Avenir-Light",
    fontSize: 9,
    color: "#fff",
    marginLeft: 5
  },
  supportIcon: {
    height: 6,
    width: 6,
  },
});

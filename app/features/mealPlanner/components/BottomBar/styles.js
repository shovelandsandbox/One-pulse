import { StyleSheet } from "react-native";
import { Theme } from "../../../../themes";
const { Colors, Fonts } = Theme;

export default StyleSheet.create({
  backText: {
    color: "#2F2F2F",
    fontSize: 16,
    lineHeight: 19,
  },
  buttonView: {
    position: "absolute",
    right: 20,
    width: 99,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    height: 57,
    width: "100%",
    alignItems: "center",
    paddingLeft: 26,
  },
  skipButton: {
    position: "absolute",
    right: 150,
  },
  skipText: {
    color: Colors.pulseRed,
    fontSize: 16,
    lineHeight: 19,
  },
});

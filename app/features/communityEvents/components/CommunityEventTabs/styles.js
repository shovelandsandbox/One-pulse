import { StyleSheet } from "react-native";
import { Theme } from "../../../../themes";
const { Colors, Fonts } = Theme;

export default StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  tabItemContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: 15,
    marginBottom: 15,
  },
  tabItemContainerSelected: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  tabItem: {
    color: Colors.darkGrey,
    textAlign: "center",
    fontSize: 15,
  },
  tabItemSelected: {
    color: Colors.pulseRed,
    textAlign: "center",
    fontSize: 15,
  },
  underline: {
    backgroundColor: Colors.pulseRed,
    height: 4,
    width: 150,
    position: "absolute",
    bottom: -15,
  },
});

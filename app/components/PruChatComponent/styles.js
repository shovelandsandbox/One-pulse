import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
  avatarStyle: {
    alignItems: "center",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  input: {
    backgroundColor: "#fff",
    color: "#424242",
    flex: 1,
    paddingLeft: 10,
  },
  searchIcon: {
    alignSelf: "center",
    padding: 10,
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    backgroundColor: "#fff",
    padding: 5,
    height: 58,
  },
});

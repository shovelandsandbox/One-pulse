import { StyleSheet } from "react-native";
import { Theme } from "../../themes";
const { Colors, Fonts } = Theme;

export default StyleSheet.create({
  backContainer: {
    backgroundColor: "#fff",
  },
  editIcon: {
    height: 23,
    width: 26,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
  scrollContainer: {
    flex: 1,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    backgroundColor: "#FFF",
  },
});

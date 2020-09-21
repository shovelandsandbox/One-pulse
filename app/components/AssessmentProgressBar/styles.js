import { StyleSheet } from "react-native";
import { Theme } from "../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
  rowFlex: {
    flex: 1,
    flexDirection: "row",
    position: "relative"
  },
  green: {
    borderBottomWidth: 5,
    marginVertical: 17.2,
    borderBottomColor: Colors.green,
    borderRadius: 5
  },
  red: {
    borderBottomWidth: 5,
    marginVertical: 17.2,
    borderBottomColor: Colors.pulseRed,
    borderRadius: 5
  },
  orange: {
    borderBottomWidth: 5,
    marginVertical: 17.2,
    borderBottomColor: Colors.orange,
    borderRadius: 5,
    marginHorizontal: 8
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: Colors.pulseDarkGrey,
    position: "absolute",
    top: 12
  },
  marginVertical: {
    marginVertical: 10
  }
});

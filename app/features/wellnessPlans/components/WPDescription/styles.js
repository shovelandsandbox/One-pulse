import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const deviceWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {},
  descriptionText: {
    color: Colors.black6f6f6f,
    fontSize: 12,
    lineHeight: 15
  },
  moreInfo: {
    color: Colors.redec1c2e,
    fontSize: 12,
    lineHeight: 15,
    textDecorationLine: "underline"
  },
  moreInfoContainer: {
    flexDirection: "row-reverse"
  }
});

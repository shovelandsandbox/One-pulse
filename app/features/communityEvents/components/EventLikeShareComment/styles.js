import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
    paddingRight: 5,
  },
  containerStyle: {
    alignItems: "center",
    flexDirection: "row",
    margin: 5,
  },
  imageSize: {
    height: 20,
    resizeMode: "contain",
    width: 20,
  },
  textStyle: {
    color: Colors.redec1c2e,
    fontFamily: "Avenir-Regular",
    fontSize: 11,
    lineHeight: getLineHeight(11),
    paddingLeft: 5,
  },
});

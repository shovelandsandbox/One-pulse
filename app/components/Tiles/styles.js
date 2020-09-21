import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../themes";
import { getLineHeight } from "../../utils/StyleUtils";
const { Colors, Fonts } = Theme;

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  descStyle: {
    color: Colors.descText,
    flex: 1,
    flexWrap: "wrap",
    fontFamily: Fonts.AvenirRoman,
    fontSize: 14,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 2,
    lineHeight: getLineHeight(14),
  },
  header: {
    fontWeight: "bold",
    marginBottom: 5,
    padding: 15,
  },
  image: {
    alignContent: "center",
    width: width - 10,
  },
  readMoreText: {
    color: Colors.red,
    fontFamily: Fonts.AvenirRoman,
    fontSize: 14,
    paddingBottom: 8,
    paddingTop: 4,
    paddingLeft: 2,
    lineHeight: 22
  },
  tile: {
    borderRadius: 5,
    margin: 5,
  },
  titleStyle: {
    color: Colors.descText,
    fontFamily: Fonts.AvenirRoman,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
    paddingTop: 4,
    paddingBottom: 4,
    lineHeight: getLineHeight(15),
  },
  video: {
    backgroundColor: Colors.black222529,
    height: width * (9 / 16),
    width: width,
  },
});

import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const styles = StyleSheet.create({
  contentBg: {
    backgroundColor: Colors.bgColorTv,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 5,
  },
  headingStyle: {
    color: Colors.lightBlack,
    // fontFamily: "Avenir-Regular",
    fontSize: 12,
    // lineHeight: getLineHeight(12),
    marginVertical: 6,
  },
  imageStyle: {
    alignSelf: "center",
    borderRadius: 10,
    height: 140,
    width: "100%",
  },
  padding: {
    color: Colors.lightBlack,
    fontFamily: "Avenir-Regular",
    fontSize: 12,
    lineHeight: getLineHeight(12),
    padding: 10,
  },
  playButton: {
    height: 20,
    width: 20,
  },
  videoViewStyle: {
    alignItems: "center",
    height: 140,
    justifyContent: "center",
    width: "100%",
  },
});

export default styles;

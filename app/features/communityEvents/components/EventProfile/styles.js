import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const styles = StyleSheet.create({
  avatar: {
    height: 45,
    width: 45,
  },
  dotContainer: {
    alignItems: "flex-end",
    flex: 1,
  },
  flex1: { flex: 1 },
  flex3: { flex: 3 },
  imageContainer: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    marginBottom: 8,
  },
  name: {
    color: Colors.lightBlack,
    fontFamily: "Avenir-Heavy",
    fontSize: 13,
    lineHeight: getLineHeight(13),
  },
  time: {
    color: Colors.redec1c2e,
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    lineHeight: getLineHeight(12),
  },
});

export default styles;

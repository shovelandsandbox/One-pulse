import { StyleSheet, Dimensions, PixelRatio } from "react-native";
import { Theme } from "../../themes";
const { Colors } = Theme;
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
let BASE_FONT_SIZE = 18;

if (PixelRatio.get() <= 2) {
  BASE_FONT_SIZE = 15;
}

export default StyleSheet.create({
  avatarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    marginTop: 20
  },
  avatarStyle: {
    borderRadius: 30,
    flex: 1,
  },
  border: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#b4b4b4",
    borderTopWidth: 5,
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%"
  },
  overlayContainerStyle: { borderRadius: 30 },
  resultView: {
    flex: 0.8,
    width: "70%",
    height: "100%",
    justifyContent: "center",
    marginTop: 20
  },
  textStyleOverride: {
    flex: 1,
    color: "#515B61",
    fontFamily: "Avenir",
    fontSize: BASE_FONT_SIZE,
  },
  rightTextStyleOverride: {
    fontWeight: "900",
    fontSize: BASE_FONT_SIZE,
  },
  rightTextStyleOverride2: {
    // fontWeight: "900",
    fontSize: BASE_FONT_SIZE - 2,
    textAlign: "justify",
    textAlignVertical: "center",
    lineHeight: 16.7,
  },
});

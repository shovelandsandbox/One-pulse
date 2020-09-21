import { StyleSheet, Platform, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const window = Dimensions.get("window");
const width = window.width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteSmokeOpRGB
  },

  gridViewStyle: {
    marginTop: 20,
    flex: 1
  },

  actionBarStyle: {
    width: "100%",
    height: 52,
    backgroundColor: Colors.white,
    alignItems: "center",
    paddingLeft: 11,
    paddingRight: 11,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  backImageStyle: {
    width: 20,
    height: 20,
    left: 0
  },
  headerStyle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.stormGrey
  },
  backTouchableStyling: {
    width: 55,
    height: 55,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  searchIconStyle: {
    height: 20,
    width: 20
  },

  actionBarRightContainerStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 120
  },
  haloDocImageContainerStyle: {
    width: 76,
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  haloDocImageStyle: {
    width: 60,
    height: 30
  }
});

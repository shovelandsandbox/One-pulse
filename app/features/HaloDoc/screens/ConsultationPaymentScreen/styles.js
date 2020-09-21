/ eslint-disable /
import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const headerHeight = 52;

const utils = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width,
  headerHeight
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  webviewContainer: {
    height: utils.fullHeight - utils.headerHeight,
    width: utils.fullWidth,
    overflow: "hidden",
  },
  mainView: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  closeBtn: {
    width: 60,
    padding: 15
  },
  closeImg: {
    flex: 1,
    alignSelf: 'center',
    padding: 10
  }


});

export default styles;
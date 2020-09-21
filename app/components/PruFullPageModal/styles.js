import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from "../../themes";

const { Colors, Fonts } = Theme;
const { height, width } = Dimensions.get("window");

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImg: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  closeBtn: {
    paddingRight: 17.4,
    alignSelf: 'flex-end',
    paddingLeft: 17.4,
    marginTop: 15,
  },
  closeIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.white,
  },
})
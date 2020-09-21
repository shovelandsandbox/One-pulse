import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../../../themes";

const { Colors, Fonts } = Theme;
const { width } = Dimensions.get("window");

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerView: {
    backgroundColor: "#ffffff",
    elevation: 3,
    height: "auto",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
  headerStyle: {
    paddingHorizontal: 0,
  },
  listView: {
    marginTop: 16.7,
    flex: 1,
  },

  dayTitle: {
    fontSize: 12,
    fontFamily: Fonts.AvenirRoman,
    lineHeight: 25,
    color: "#878787",
  },
  workoutItem: {
    flexDirection: 'row',
    paddingRight: 10,
    elevation: 2,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.7,
    // shadowRadius: 3,
  },
  sectionSeperator: {
    height: 10,
  },
  itemSeperator: {
    height: 10,

  },
  image: {
    height: 100,
    width: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rowRightView: {
    flex: 1,
    paddingLeft: 5,
    justifyContent: 'space-between',
  },
  exerciseView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  exTitle: {
    fontSize: 14,
    fontFamily: Fonts.AvenirHeavy,
    lineHeight: 16.7,
    color: "#363636",
  },
  time: {
    fontSize: 10.7,
    fontFamily: Fonts.AvenirRoman,
    lineHeight: 25,
    color: "#878787",
  },
  bottomRightView: {
  },
  buttonRow: {
    flexDirection: 'row',
  },
  checkImg: {
    width: 23.7,
    height: 23.7,
    tintColor: '#96bf48',
  },
  completedRow: {
    flexDirection: 'row',
  },
  completedTxt: {
    marginLeft: 5,
    color: '#96bf48',
    fontSize: 12,
    fontFamily: Fonts.AvenirRoman,
    lineHeight: 25,

  },
  redButton: {
    width: 94.7,
    borderRadius: 25.7,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 2,
    backgroundColor: '#ec1c2e',
    height: 26.7,

  },
  continueTxt: {
    fontSize: 10.7,
    fontFamily: Fonts.AvenirRoman,
    lineHeight: 14.7,
    color: "white",
  },
  restartBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    paddingHorizontal: 10,

  },
  restartTxt: {
    color: '#ec1c2e',
    fontSize: 10.7,
    fontFamily: Fonts.AvenirRoman,
    lineHeight: 14.7,
  },
  levelImageView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  levelView: {

  },
  level1Text: {
    color: '#96bf48',
    fontSize: 12,
    fontFamily: Fonts.AvenirRoman,
    lineHeight: 25,
  },
  level2Text: {
    color: '#f89350',
    fontSize: 12,
    fontFamily: Fonts.AvenirRoman,
    lineHeight: 25,
  },
  level3Text: {
    color: '#f5848d',
    fontSize: 12,
    fontFamily: Fonts.AvenirRoman,
    lineHeight: 25,
  },
  level1BoxFilled: {
    height: 5,
    width: 16.7,
    backgroundColor: '#96bf48',
  },
  level1BoxEmptyOutline: {
    height: 5,
    width: 16.7,
    borderWidth: 1,
    borderColor: '#96bf48',
  },
  level2BoxFilled: {
    height: 5,
    width: 16.7,
    backgroundColor: '#f89350',
  },
  level2BoxEmptyOutline: {
    height: 5,
    width: 16.7,
    borderWidth: 1,
    borderColor: '#f89350',
  },
  level3BoxFilled: {
    height: 5,
    width: 16.7,
    backgroundColor: '#f5848d',
  },
  level3BoxEmptyOutline: {
    height: 5,
    width: 16.7,
    borderWidth: 1,
    borderColor: '#f5848d',
  },
  setCountTxt: {
    color: '#393939',
    fontSize: 14,
    fontFamily: Fonts.AvenirRoman,
    lineHeight: 25,
  },

});
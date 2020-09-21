import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from "../../../../themes";

const { Colors, Fonts } = Theme;
const { height, width } = Dimensions.get("window");

export default styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 16.7,

  },
  amazing: {
    color: Colors.white,
    fontSize: 24,
    lineHeight: 64.3,
    fontFamily: 'Avenir-Black',
  },
  date: {
    color: Colors.white,
    fontSize: 12,
    lineHeight: 14,
    fontFamily: Fonts.AvenirRoman
  },
  time: {
    fontSize: 10.7,
  },
  txtDesc: {
    color: Colors.white,
    fontSize: 14,
    lineHeight: 25,
    marginLeft: 16.7,
    marginTop: 16.7,
    fontFamily: Fonts.AvenirRoman
  },
  scrollview: {
    maxHeight: height / 2.7,
    borderRadius: 10,
  },
  flatlist: {
    backgroundColor: Colors.white,
    marginVertical: 10,
    marginHorizontal: 16.7,
    borderRadius: 10
  },
  listRow: {
    flexDirection: 'row',
    marginHorizontal: 33.3,
    marginVertical: 10,
    alignItems: 'center'
  },
  nameView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  profileImg: {
    width: 33.3,
    height: 33.3,
    borderRadius: 16.7,
  },
  name: {
    fontSize: 12,
    color: Colors.lightBlack,
    lineHeight: 25,
    marginLeft: 6.7,
    fontFamily: Fonts.AvenirRoman
  },
  workoutCount: {
    fontSize: 14,
    color: Colors.lightBlack,
    lineHeight: 16.3,
    fontFamily: Fonts.AvenirHeavy
  },
  workoutTxt: {
    fontFamily: 'Avenir-Roman',
  },
  title: {
    marginLeft: 16.7,
    fontSize: 24,
    color: Colors.white,
    lineHeight: 25,
    fontFamily: Fonts.AvenirRoman,
  },
  doneView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16.7
  },
  checkImg: {
    width: 10.3,
    height: 10.3,
    tintColor: '#71ac00'
  },
  succTxt: {
    marginLeft: 3,
    fontSize: 12,
    color: '#71ac00',
    lineHeight: 25,
    fontFamily: Fonts.AvenirRoman
  },
  doneTxt: {
    fontSize: 13,
    color: '#ec1c2e',
  },
  bottomView: {
    flexDirection: 'row',
    marginTop: 20
  },
  leftView: {
    flex: 1,
    marginLeft: 16.7
  },
  leftTopView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  clock: {
    width: 20.7,
    height: 22.9,
    tintColor: Colors.white,
    resizeMode: 'contain',
  },
  timeTxt: {
    marginLeft: 6,
    fontSize: 16,
    color: Colors.white,
    lineHeight: 30.7,
    fontFamily: Fonts.AvenirRoman
  },
  minTxt: {
    fontSize: 12
  },
  timeTaken: {
    marginTop: 3,
    fontSize: 10.7,
    color: Colors.white,
    lineHeight: 30.7,
    fontFamily: Fonts.AvenirRoman
  },
  groupImg: {
    width: 34.5,
    height: 22.8,
    resizeMode: 'contain',
  },
  bottomBtnView: {
    flexDirection: 'row',
    marginTop: 20,
  },
  btnStyle: {
    flex: 1,
    height: 39.7,
    borderRadius: 20,
    marginHorizontal: 16.7,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  doneBtn: {
    backgroundColor: Colors.warmGrayOpaque,
    // opacity: 0.5,
  },
  shareBtn: {
    backgroundColor: Colors.pulseRed,
    marginLeft: 20,
  },
  shareImg: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginRight: 10,
  },
  btnTitle: {
    fontSize: 12,
    color: Colors.white,
    lineHeight: 15,
    fontFamily: Fonts.AvenirRoman
  },
})
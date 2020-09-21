import { StyleSheet, Dimensions } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";
import { Theme } from "../../../../themes";

const { height } = Dimensions.get("window");

const { Colors, Fonts } = Theme;

export default styles = StyleSheet.create({
  bottomCrossBtn: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    marginTop: 30,
    width: 40,
  },
  bottomCrossImg: {
    height: 20,
    tintColor: "#ed1b2e",
    width: 20,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  dailyTimeRow: {
    flexDirection: "row",
    marginLeft: 10,
  },
  dailyTimeTitle: {
    color: "#3b3b3b",
    fontFamily: Fonts.AvenirRoman,
    fontSize: 14,
    fontWeight: "100",
    marginLeft: 10,
    marginTop: 10,
  },
  edit: {
    color: "#ec1c2e",
    fontFamily: Fonts.AvenirRoman,
    fontSize: 14,
    fontWeight: "100",
  },
  editBtn: {
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 60,
  },
  editView: {
    flex: 1.2,
  },
  errorText: {
    color: "#E87722",
    fontFamily: "Avenir-Roman",
    fontSize: 10,
  },
  inputView: {
    marginTop: 5,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  flatlist: {
    marginLeft: 10,
  },
  grpDetail: {
    color: "#3b3b3b",
    fontFamily: "Avenir-Black",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 10,
  },
  grpImg: {
    borderRadius: 30,
    height: 60,
    resizeMode: "cover",
    width: 60,
  },
  grpName: {
    color: "#2f2f2f",
    width: "100%",
    fontFamily: Fonts.AvenirHeavy,
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 10,
    paddingHorizontal: 10,
    lineHeight: getLineHeight(12),
  },
  grpRow: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 10,
  },
  listRowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  mainContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 10,
  },
  memberName: {
    color: "#3b3b3b",
    fontFamily: Fonts.AvenirRoman,
    fontSize: 13,
    fontWeight: "normal",
  },
  memberPic: {
    height: 38,
    width: 38,
  },
  memberStatus: {
    color: "#7143b9",
    fontFamily: Fonts.AvenirRoman,
    fontSize: 11,
    fontWeight: "400",
  },
  members: {
    color: "#3b3b3b",
    fontFamily: "Avenir-Black",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 10,
  },
  pm: {
    fontFamily: Fonts.AvenirRoman,
    fontWeight: "100",
  },
  scrollView: {
    maxHeight: height / 3.5,
  },
  startBtn: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ec1c2e",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 25,
    width: "80%",
  },
  startTxt: {
    color: "white",
    fontFamily: Fonts.AvenirRoman,
    fontSize: 13,
    fontWeight: "400",
  },
  time: {
    color: "#2f2f2f",
    fontFamily: Fonts.AvenirHeavy,
    fontSize: 13,
    fontWeight: "500",
  },
  timeView: {
    flex: 0.8,
    justifyContent: "center",
  },
  uninvite: {
    height: 24,
    tintColor: "#707070",
    width: 24,
  },
  uninviteBtn: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

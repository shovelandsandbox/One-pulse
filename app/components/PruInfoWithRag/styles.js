import { StyleSheet } from "react-native";
import { normalize, getLineHeight } from "../../utils/StyleUtils";

export default StyleSheet.create({
  avatarContainer: {
    marginTop: 10,
  },
  bmiContentView: { flex: 3, marginRight: 15 },
  bmiDescription: {
    color: "#525a60",
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    lineHeight: getLineHeight(10),
  },
  bmiDescriptionTitle: {
    color: "#525a60",
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    lineHeight: getLineHeight(10),
    marginBottom: 10,
  },
  bmiDescriptionView: { flex: 3, marginLeft: 15 },
  bmiGuidelineContainer: {
    width: "90%",
  },
  bmiGuidelineView: {
    marginTop: 15,
    width: "90%",
  },
  bmiKeyTextContainer: { alignItems: "flex-end", flex: 5 },
  bmiRange: {
    color: "#525a60",
    flex: 1,
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    lineHeight: getLineHeight(10),
    marginLeft: 5,
    textAlign: "right",
  },
  bmiRangeView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 10,
  },
  bmiValueTextContainer: { alignItems: "flex-start", flex: 5, marginLeft: 15 },
  bmiValueTitle: {
    color: "#525a60",
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    lineHeight: getLineHeight(10),
    marginBottom: 10,
    textAlign: "right",
  },
  circle: {
    borderRadius: 10 / 2,
    height: 10,
    width: 10,
  },
  close: {
    height: 15,
    width: 15,
  },
  closeContainer: {
    height: 15,
    justifyContent: "flex-end",
    marginRight: 10,
    marginTop: 10,
    width: 15,
  },
  closeParentContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  containerImageStyle: { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  descriptionView: {
    width: "100%",
  },
  guidelineTitle: {
    color: "#000000",
    fontFamily: "Avenir-Roman",
    fontSize: 20,
    lineHeight: getLineHeight(20),
    marginTop: 20,
  },
  horizontalView: {
    flexDirection: "row",
    width: "100%",
  },
  indicatorView: {
    marginTop: 20,
  },
  keyTextStyle: {
    color: "#525a60",
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    lineHeight: getLineHeight(10),
  },
  resultContainer: {
    flex: 1,
    marginBottom: 30,
    marginHorizontal: 20,
    marginTop: 5,
  },
  resultView: {
    marginTop: 10,
    width: "90%",
  },
  resultViewFlex: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  titleContainer: {
    color: "#8f8f8f",
    fontFamily: "Avenir-Roman",
    fontSize: 16,
    lineHeight: getLineHeight(16),
  },
  valueContainer: {
    color: "#525a60",
    fontFamily: "Avenir-Roman",
    fontSize: 35,
    lineHeight: getLineHeight(35),
  },
  valueTextStyle: {
    color: "#363636",
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    lineHeight: getLineHeight(12),
  },
  verticalLine: { backgroundColor: "#878786", width: 1 },
  wrinkleContentView: { flex: 2.5 },
  wrinkleDescription: {
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    lineHeight: getLineHeight(10),
  },
  wrinkleDescriptionTitle: {
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    lineHeight: getLineHeight(10),
    marginBottom: 10,
  },
  wrinkleDescriptionView: { flex: 7.4, marginLeft: 15 },
  wrinkleGuidelineContainer: {
    marginTop: 10,
    width: "90%",
  },
  wrinkleGuidelineView: {
    marginTop: 15,
    width: "90%",
  },
  wrinkleKeyTextContainer: { alignItems: "flex-end", flex: 3 },
  wrinkleRange: {
    flex: 1,
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    lineHeight: getLineHeight(10),
    marginRight: 10,
    textAlign: "right",
  },
  wrinkleRangeView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  wrinkleValueTextContainer: {
    alignItems: "flex-start",
    flex: 7,
    marginLeft: 15,
  },
  wrinkleValueTitle: {
    flex: 1,
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    lineHeight: getLineHeight(10),
    marginBottom: 10,
    marginRight: 10,
    textAlign: "right",
  },
});

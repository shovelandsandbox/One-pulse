import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
  circularView: {
    backgroundColor: "#71828a",
    borderRadius: 10 / 2,
    height: 10,
    width: 10,
  },
  dateText: {
    color: "#4d4d4d",
    flex: 1,
    fontFamily: "Avenir-Roman",
    fontSize: 9,
    lineHeight: 11,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  descText: {
    color: "#4d4d4d",
    flex: 7,
    fontFamily: "Avenir-Roman",
    fontSize: 9,
    lineHeight: 11,
    paddingHorizontal: 20,
  },
  highlightedCircularView: {
    backgroundColor: "red",
  },
  highlightedDateText: {
    color: "#ed1b2e",
    lineHeight: 13,
  },
  highlightedDescText: {
    fontSize: 11,
    lineHeight: 13,
  },
  highlightedPointText: {
    color: "#ed1b2e",
    fontSize: 14,
    lineHeight: 16,
  },
  highlightedRowItem: {
    backgroundColor: "#f5e2e4",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  highlightedVerticalLine: { backgroundColor: "#ed1b2e" },
  image: { height: 17, width: 17 },
  imageView: {
    borderRadius: 17 / 2,
    height: 17,
    width: 17,
  },
  indicatorView: { alignItems: "center", flex: 1, justifyContent: "center" },
  pointText: {
    color: "#4d4d4d",
    flex: 1,
    fontFamily: "Avenir-Roman",
    fontSize: 11,
    lineHeight: 13,
    textAlign: "center",
  },
  rowItem: {
    alignItems: "center",
    flexDirection: "row",
    height: 60,
    width: "100%",
  },
  unHighLightedVerticalLine: { backgroundColor: "#71828a" },
  verticalLine: { flex: 1, width: 2 },
});

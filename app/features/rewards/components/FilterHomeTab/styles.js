import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";
export default StyleSheet.create({
  Maincontainer: {
    backgroundColor: "white",
  },
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    flex: 1,
    marginLeft: 10
  },
  redbar: {
    backgroundColor: "#ed1b2e",
    height: 3,
  },
  tagSelectedText: {
    color: "#ec1c2e",
    fontFamily: "Avenir-Black",
    fontSize: 13,
    lineHeight: getLineHeight(13),
    marginHorizontal: 7,
  },
  tagSelectedView: {
    elevation: 1,
    flexDirection: "row",
    margin: 2,
    paddingVertical: 2,
  },
  tagUnSelectedView: {
    flexDirection: "row",
    margin: 2,
    paddingVertical: 2,
  },
  tagUnselectedText: {
    color: "#2f2f2f",
    fontFamily: "Avenir-Roman",
    fontSize: 13,
    lineHeight: getLineHeight(13),
    marginHorizontal: 7,
  },
  bottomArrow: { backgroundColor: "#e2e2e2", height: 1 },
  IconStyle: { height: 25, width: 25 }
});

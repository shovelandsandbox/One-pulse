import { StyleSheet } from 'react-native';
import { normalize, getLineHeight } from "../../../../utils/StyleUtils";

export default StyleSheet.create({
  Maincontainer: {
    padding: 5,
    backgroundColor: 'white',
    paddingBottom: 0,
    height: 121,
    backgroundColor: "#ececec",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    paddingTop: 23,
    paddingLeft: 23,
  },
  container: {
    // marginHorizontal:20,
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: "transparent",
    flex: 1,
  },
  tagSelectedView: {
    elevation: 1,
    paddingTop: 2,
  },
  tagUnSelectedView: {
    paddingTop: 2,
  },
  tagUnselectedText: {
    color: "#71828a",
    fontFamily: "Avenir-Roman",
    fontSize: 14,
    marginHorizontal: 15,
    lineHeight: getLineHeight(14),
  },
  tagSelectedText: {
    color: "#ed1b2e",
    fontFamily: "Avenir-Roman",
    fontSize: 14,
    marginHorizontal: 15,
    lineHeight: getLineHeight(14),
  },
  customStyles: {
    paddingHorizontal: 0,
    paddingTop: 0,
    backgroundColor: "transparent",
    height: "auto",
  },
  badgeView: {
    flexDirection: 'row',
  },
  redbar: {
    height: 3,
    backgroundColor: "#ed1b2e",
  },
  expiryText: { fontFamily: "Avenir-Roman", color: "#000000" },
  whattext: { color: "#ed1b2e", fontFamily: "Avenir-Roman" },
  filterValue: { marginTop: 10 },
});

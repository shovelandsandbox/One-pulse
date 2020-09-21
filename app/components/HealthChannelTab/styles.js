import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  redbar: {
    backgroundColor: "#ed1b2e",
    height: 3,
  },
  tagSelectedText: {
    color: "#ed1b2e",
    fontFamily: "Avenir-Roman",
    fontSize: 16,
    lineHeight: 25,
    marginHorizontal: 15,
  },
  tagSelectedView: {
    elevation: 1,
    paddingTop: 2,
  },
  tagUnSelectedView: {
    paddingTop: 2,
  },
  tagUnselectedText: {
    color: "#393939",
    fontFamily: "Avenir-Roman",
    fontSize: 16,
    lineHeight: 25,
    marginHorizontal: 15,
  },
});

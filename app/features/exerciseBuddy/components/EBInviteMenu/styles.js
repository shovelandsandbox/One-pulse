import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";

export default StyleSheet.create({
  buttonText: {
    alignSelf: "center",
    color: "#b5b5b5",
    fontFamily: "Avenir-Roman",
    fontSize: 14,
    lineHeight: getLineHeight(14),
  },
  buttonView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#FFFF",
    borderColor: "#b5b5b5",
    borderRadius: 6,
    borderWidth: 0.3,
    flexDirection: "row",
    height: 40,
  },
  flatListContent: {
    flex: 1,
    justifyContent: "space-around",
  },
  leftBorderRadius: {
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
  },
  rightBorderRadius: {
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
  },
  selectedButtonText: {
    alignSelf: "center",
    color: "#ffffff",
    fontFamily: "Avenir-Roman",
    fontSize: 14,
    lineHeight: getLineHeight(14),
  },
  selectedButtonView: {
    backgroundColor: "#fe4c5d",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  separatorView: {
    backgroundColor: "#b5b5b5",
    width: 0.3,
  },
});

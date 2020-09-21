import { StyleSheet } from "react-native";
import { Theme } from "../../themes";
const { Colors } = Theme;

const pruRatingsStyle = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 26
  },
  ratingStarSize: {
      height: 14,
      marginRight: 5,
      width: 14,
      marginTop: 2
  },
  ratingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 50,
    margin: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 22,
    borderWidth: 0.5,
    borderColor: '#dcdcdc',
    height: 30
  },
  selected: {
    color: '#ffffff'
  },
  selectedYellow: {
      backgroundColor: '#eda71b',
      borderRadius: 15,
  },
  selectedGreen: {
    backgroundColor: Colors.ratingGreen,
    borderRadius: 15,
  },
  highlightText: {
      color: Colors.white
  },
  nonHighlightText: {
      color: Colors.black222529
  }
});

export default pruRatingsStyle;
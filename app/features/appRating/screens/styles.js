import { StyleSheet } from "react-native";
import { Theme } from "../../../themes";
const { Colors } = Theme;

const pruRatingsStyle = StyleSheet.create({
  doclogo: {
    height: 121,
    justifyContent: "center",
    resizeMode: "contain",
    width: 170,
  },
  highlightText: {
    color: Colors.white,
  },
  nonHighlightText: {
    color: Colors.black222529,
  },
  ratingContainer: {
    marginTop:10,
    marginLeft:10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width:'80%',
  },
  buttonView:{
    width:'85%',
    marginTop:'10%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight:10,

  },
  ratingItem: {
    width:'80%',
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingStarSize: {
    height: 32.2,
    marginRight: 5,
    marginTop: 2,
    width: 34.2,
  },
  selected: {
    color: "#ffffff",
  },
  submitButtonStyle: {
    alignItems: "flex-end",
    justifyContent:'flex-end',
    paddingRight:10,
    backgroundColor: Colors.white,
    width:'40%'
    
  },
  continueButtonStyle: {
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    maxWidth: 140,
  },
  selectedGreen: {
    backgroundColor: Colors.ratingGreen,
    borderRadius: 15,
  },
  selectedYellow: {
    backgroundColor: "#eda71b",
    borderRadius: 15,
  },
  buttonText:{
    color:Colors.pulseRed,
    fontSize:12,
    lineHeight:25,
  },
  buttonText1:{
    color:Colors.white,
    fontSize:12,
    lineHeight:25
  }
});

export default pruRatingsStyle;

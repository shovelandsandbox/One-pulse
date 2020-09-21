import { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get("window");

import { Theme } from "../../../../themes";
const { Colors } = Theme;
const greenColor = "#9eef00";//specific to this component
const blackShade = "#373737";

export default StyleSheet.create({
  absolute: {
    position: "absolute",
  },
  boldText: {
    fontWeight: "bold",
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fcfcfc",
  },
  centerText: {
    textAlign: "center",
  },
  crown: {
    width: 23.7,
    height: 21.4,
    zIndex: 200,
  },
  day: {
    color: Colors.white,
  },
  done: {
    top: 15.7,
    right: 15.7, 
  },
  doneText: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.white,
  },
  font14: {
    fontSize: 14,
    lineHeight: 24,
  },
  font20: {
    fontSize: 20,
    lineHeight: 36,
  },
  font33: {
    fontSize: 33,
    lineHeight: 40,
  },
  flexRow: {
    flexDirection: 'row',
  },
  imgBackgroundStyle: {
    width,
    height: height * 0.74,
  },
  secondaryStatus: {
    marginTop: 16.3,
  },
  secondaryStatusText: {
    color: blackShade,
    fontWeight: "400",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  stats: {
    bottom: 0,
    height: height * 0.164,
    width,
    backgroundColor:'rgba(255,0,0,0.4)',
    paddingHorizontal: width*0.047,
    paddingVertical: 13.7,
  },
  statsContent: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    bottom: (height * 0.164)+6,
    width,
  },
  supportNum: {
    color: greenColor,
    alignSelf: "center",
  },
});

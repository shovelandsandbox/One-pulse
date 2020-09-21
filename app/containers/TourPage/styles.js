import { StyleSheet, Platform } from "react-native";
import { CoreConfig } from "@pru-rt-internal/pulse-common";
const { height, width } = CoreConfig;

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  tourOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height+200,
    backgroundColor: "#000",
    opacity: 0.8,
    //zIndex: 9999,
  },
  tourOverlayTransparent: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 9999,
  },
  tourOverlayHidden: {
    width: 0,
    height: 0,
  },

  tourBackground: {
    width: width,
    height: height,
    opacity: 0.9,
    position: "absolute",
    left: 0,
    top: 0,
    // top: -40,
  },
  closeBtn: {
    width: 60,
    height: 60,
    paddingRight: 11,
    alignItems: "flex-end",
    alignContent: "flex-end",
  },
  close: {
    width: 40,
    height: 40,
  },
  wrapper: {
    // backgroundColor: 'transparent',
    // zIndex: 9999
  },
  firstTourContainer: {
    flex: 1,
    justifyContent: "center",
  },
  secondTourContainer: {
    flex: 1,
    paddingLeft: width / 4,
    paddingRight: width * 0.25,
    paddingTop: (height - 70) * 0.35,
  },
  thirdTourContainer: {
    flex: 1,
    paddingLeft: width / 4,
    paddingRight: width * 0.25,
    paddingTop: (height - 70) * 0.55,
    //justifyContent: "flex-end",
  },
  fourthTourContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: width / 2,
    paddingTop: (height - 70) * 0.78,
    overflow: "visible",
  },
  fifthTourContainer: {
    paddingLeft: width / 6,
    paddingRight: width / 4,
    paddingTop: (height - 70) * 0.80,
  },
  sixthTourContainer: {
    flex: 1,
    marginRight: 5,
    paddingRight: 20,
    paddingLeft: width / 2,
    paddingTop: (height - 70) * 0.75,
    //justifyContent: "flex-end",
  },
  seventhTourContainer: {
    flex: 1,
    marginRight: 5,
    paddingRight: width / 14,
    paddingLeft: width * (3 / 7),
    paddingTop: (height - 70) * (3.75 / 5),
  },
  tapIcon: {
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  sliderIcon: {
    width: 50,
    height: 50,
    marginTop: 50,
    alignSelf: "center",
  },
  headFirst: {
    fontSize: 17,
    lineHeight: 20,
    color: "#ffffff",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    textAlign: "center",
    paddingBottom: 11,
  },
  contentFirst: {
    fontSize: 14,
    lineHeight: 17,
    color: "#ffffff",
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
  },
  head: {
    //flex:1,
    fontSize: 16,
    lineHeight: 18,
    //height: 18,
    color: "#ffffff",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    textAlign: "center",
    paddingBottom: 11,
  },
  hide: {
    opacity: 0,
  },
  highlighted: {
    zIndex: 100,
    backgroundColor: "#fff",
  },
  absoluteOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  pointerIcon: {
    top: 25,
    width: 25,
    height: 25,
    zIndex: 105,
  },
});

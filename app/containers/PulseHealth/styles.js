import { StyleSheet, Platform } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";

export default StyleSheet.create({
  TCDescription: {
    color: "#222529",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 14,
    paddingBottom: 17,
  },
  TCheading: {
    color: "#515B61",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 30,
    paddingBottom: 5,
  },
  bottomText: {
    color: "#515B61",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 12,
    marginBottom: 8,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    // padding: 10,
    alignItems: "center",
    marginHorizontal: 40,
  },
  containers: {
    backgroundColor: colors.white,
    flex: 1,
    // padding: 10,
    alignItems: "center",
  },
  contentViewItems: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 24,
    paddingTop: 24,
  },

  dengueBox: {
    backgroundColor: "#fff",
    // marginHorizontal: 9,
    // marginBottom: 11,
    padding: 10,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    // overflow: 'hidden',
    height: 94,
    // shadowColor: '#ADB5BD',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.16,
    // shadowRadius: 10,
    // elevation: 10
  },
  dengueInfo: {
    fontFamily: "Avenir",
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 20,
    // height: 40,
    color: "#222529",
  },
  dengueTitle: {
    color: "#515B61",
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "900",
    height: 22,
    lineHeight: 22,
    width: 303,
  },
  fixedIcon: {
    alignItems: "flex-end",
    alignSelf: "flex-end",
    bottom: 20,
    justifyContent: "flex-end",
    position: "absolute",
    right: 20,
  },
  heading: {
    color: "#515B61",
    fontFamily: "Avenir",
    fontSize: 32,
    fontWeight: "900",
    height: 2,
    lineHeight: 44,
    marginBottom: 10,
    marginTop: 14,
    width: 353,
  },
  heading: {
    color: "#515B61",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 16,
    lineHeight: 25,
    paddingBottom: 17,
  },
  heading: {
    color: "#515B61",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 16,
    paddingBottom: 17,
  },
  headingBox: {
    alignItems: "center",
    flex: 1,
  },
  headingR: {
    // color: "#515B61",
    // fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    // fontSize: 16,
    // lineHeight: 25,
    // paddingBottom: 17
  },
  horizontalLine: {
    borderBottomColor: colors.grey91,
    borderBottomWidth: 3,
  },
  imageBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    flex: 1,
    fontFamily: "Avenir",
    height: 280,
    justifyContent: "flex-end",
    marginHorizontal: 9,
    overflow: "hidden",
    resizeMode: "contain",
  },
  screenTitle: {
    color: colors.nevada,
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 21.7,
    lineHeight: 25,
    marginVertical: 16.7,
    textAlign: "center",
  },
  scroll: {
    flex: 0.9,
  },
  subHeading: {
    // paddingTop:20,
    height: 22,
    width: 325,
    color: "#515B61",
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 22,
  },
  text: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 15.3,
    lineHeight: 18.3,
  },
  welcomeName: {
    color: "#515B61",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 2,
    marginLeft: 15,
  },
  welcomeText: {
    color: "#515B61",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 15,
    marginTop: 2,
    //lineHeight: 30
  },
  welcomeWraper: {
    // width: "100%",
    height: 56,
    backgroundColor: "#ed1b2e",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

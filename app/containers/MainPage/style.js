import { StyleSheet, Platform } from "react-native";

import { CoreConfig } from "@pru-rt-internal/pulse-common";

const { colors, width, height } = CoreConfig;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollview: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentView: {
   // height: height,
  },
  carouselContainer: {
    // flex: 2.3,
  },
  pickerContainer: Platform.select({
    ios: {
      alignItems: "center",
      backgroundColor: "#c3c3c3",
    },
    android: {
      alignItems: "center",
      backgroundColor: "#c3c3c3",
    },
  }),
  sliderContainer: {
    backgroundColor: colors.white,
    paddingTop: 10,
    paddingRight: 10,
    // margin: 10,
    // marginTop: 0,
    // borderRadius: 5,
    // borderColor: "#e6e6e6",
    // borderWidth: 0.3,
  },
  banner: {
    width: width,
    height: "100%",
  },
  textStyle: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 18.3,
    textAlign: "left",
    color: "#4E4E4E",
  },
  headerText: {
    textAlign: "center",
    //color: "#68737a",
    color: "#464646",
    letterSpacing: 0,
    fontSize: 18.3,
    padding: 10,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
  },
  twoPickerItems: {
    height: 105,
  },
  picker: Platform.select({
    ios: {
      color: "#68737a",
    },
    android: {
      height: 40,
      color: "#68737a",
    },
  }),
  assessBtn: {
    borderWidth: 1,
    borderColor: colors.borderGrey,
    alignItems: "center",
    borderRadius: 5,
    width: "80%",
    padding: 10,
    alignSelf: "center",
    marginTop: 30,
  },
  servicesImg: {
    width: 25,
    height: 25,
  },
  pulseLogo: {
    width: 90,
    height: 30,
  },
  serviceContainer: {
    flex: 1,
    alignItems: "center",
  },
  serviceWrapper: {
    height: 90,
    flexDirection: "row",
    padding: 5,
  },
  serviceImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  serviceName: {
    fontSize: 13.3,
    lineHeight: 15,
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    textAlign: "center",
    flex: 1,
  },
  flx_rw: {
    width: width,
  },
  flx_Col: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  reviewServices: {
    backgroundColor: colors.solidGray,
    borderRadius: 5,
    width: 139.9,
    marginRight: 10,
    padding: 10,
  },
  reviewHead: {
    color: colors.crimson,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 15,
    lineHeight: 16,
    marginBottom: 5,
  },
  descp: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 14,
  },
  horizontalView: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  bannerSign: {
    position: "absolute",
    top: 10,
    left: width / 2.3,
    width: 27.7,
    height: 26,
  },
  assessText: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 16.7,
  },
  sidebarBack: {
    backgroundColor: colors.white,
    flex: 1,
  },
  sideBarText: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 13.3,
    lineHeight: 15.3,
  },
  icon: {
    marginRight: 15,
    width: 24,
    height: 26,
    marginLeft: 15,
  },
  flx_rw_icn: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  menuBar: {
    backgroundColor: colors.white,
  },
  offerBar: {
    marginBottom: 80,
  },
  userDetail: {
    padding: 30,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.sidebarPrimary,
  },

  username: {
    marginBottom: 10,
    color: colors.white,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 14.7,
    lineHeight: 17,
    paddingTop: 10,
  },
  userView: {
    alignItems: "center",
    padding: 10,
  },
  userPic: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderColor: colors.white,
    borderWidth: 2,
  },
  cameraPic: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  flx_col: {
    flexDirection: "column",
    position: "absolute",
    top: 120,
    left: 10,
  },
  bannerTextRed: {
    color: colors.crimson,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 21.7,
    lineHeight: 21.7,
  },
  bannerTextWhite: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 15,
  },
  tourModal: {
    width: width,
    height: height,
    padding: 0,
    margin: 0,
  },
  dropDownIcon: {
    position: "absolute",
    right: 10,
  },
  pickerBorder: Platform.select({
    ios: {},
    android: {
      width: 298,
      height: 40,
      marginTop: 15,
      backgroundColor: "#f8f8f8",
      paddingLeft: 10,
    },
  }),
  pickerHeading: {
    color: "#6b6a6d",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 18.3,
    lineHeight: 21,
  },
  pickerContent: {
    color: "#6b6a6d",
    marginTop: 15,
    lineHeight: 15,
    fontSize: 13.3,
  },
  dropDownButton: {
    width: width - 50,
    height: 31,
    paddingTop: 8,
    paddingLeft: 15,
  },
  dropdownStyle: Platform.select({
    ios: {
      width: width - 60,
      backgroundColor: "#f2f2f2",
      marginTop: 10,
      marginLeft: -12,
      fontFamily: "PruSansNormal",
    },
    android: {
      width: width - 60,
      backgroundColor: "#f2f2f2",
      marginTop: -15,
      marginLeft: -12,
      fontFamily: "pru-regular",
    },
  }),
  dropdownTextStyle: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 18.3,
    letterSpacing: 0,
    textAlign: "left",
    paddingLeft: 15,
    backgroundColor: "#f2f2f2",
    color: "#4E4E4E",
  },
  dropbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 6.7,
    borderStyle: "solid",
    borderWidth: 0.3,
    borderColor: "#a8a8a8",
  },
  pickerDropDown: {
    width: width - 50,
    height: 45,
  },
  loaderProfile: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: "#404040",
    zIndex: 9,
  },
  ourServiceContainer: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    //margin: 10,
    marginTop: 20,
    marginBottom: 20,
    //borderRadius: 5,
    //borderColor: "#e6e6e6",
    //borderWidth: 0.3,
  },
  ourServicesText: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 22,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.black,
  },
  pulseText: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 22,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.red,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
});

import { Colors, Sizes } from "../../../configs";
import { Platform } from "react-native";

export default {
  doubleRow: {
    container: {
      flex: 0.8,
    },
  
    grouper: {
      flex: -1,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: Colors.main.borderGray,
      flexDirection: "row",
      backgroundColor: Colors.main.baseWhite,
    },
  },
  benefCards: {
    backgroundColor: "#ffffff",
    elevation: 3,
    marginVertical: 10,
    shadowColor: Colors.main.baseBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  lifeAssuredContainer: {
    flex: -1,
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: Colors.main.borderGray,
    paddingHorizontal: Sizes.screen.paddingHorizontal,
    alignItems: "center",
  },
  icon: {
    container: {
      flex: -1,
      width: 24,
      marginRight: 8,
    },
  },

  label: {
    container: {
      flex: 1,
    },
  },

  simpleContainer: {
    container: {
      flex: -1,
      borderBottomWidth: 1,
      paddingVertical: 16,
      borderBottomColor: Colors.main.borderGray,
    },

    innerContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },

  rowContainer: {
    backgroundColor: Colors.main.baseWhite,
  },
  link: {
    color: Colors.main.baseRed,
    fontWeight: "normal",
    textDecorationLine: "underline",
    fontSize: 15,
    lineHeight: 28,
    letterSpacing: 0,
  },
  linkWrapper: {
    padding: 20,
    paddingHorizontal: 30,
  },

  /*
   * New UX upgrade style changes below
   */

  // Top level container styles
  containerStyle: {
    // backgroundColor: "rgb(247,249,251)",
    width: "100%",
  },

  // Main part styles
  mainLabel: {
    // fontFamily: Platform.OS === "ios" ? "Avenir-Heavy" : "Avenir-Heavy-05",
    // fontSize: 14,
    fontFamily: "Avenir",
    color: "rgb(81,91,97)",
    lineHeight: 20,
  },
  lifeAssuredMainLabel: {
    // fontFamily: Platform.OS === "ios" ? "Avenir-Heavy" : "Avenir-Heavy-05",
    // fontSize: 14,
    fontFamily: "Avenir",
    color: "rgb(81,91,97)",
    lineHeight: 20,
  },
  mainValue: {
    // fontFamily: Platform.OS === "ios" ? "Avenir-Roman" : "Avenir-Roman-12",
    fontFamily: "Avenir",
    fontSize: 17,
    color: "rgb(47,47,47)",
    lineHeight: 35,
  },
  lifeAssuredMainValue: {
    // fontFamily: Platform.OS === "ios" ? "Avenir-Roman" : "Avenir-Roman-12",
    fontFamily: "Avenir",
    fontSize: 17,
    color: "rgb(47,47,47)",
    lineHeight: 35,
  },
  mainLabelBold: {
    // fontFamily: Platform.OS === "ios" ? "Avenir-Black" : "Avenir-Black-03",
    fontFamily: "Avenir",
    fontSize: 15,
    color: "rgb(47,47,47)",
    lineHeight: 17,
    fontWeight: "500",
  },
  containerMainStyle: {
    paddingTop: 20,
    paddingBottom: 13,
    paddingHorizontal: 20,
  },
  lifeAssuredContainerMainStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  verticalDivider: {
    borderColor: "rgba(81,91,97, 0.4)",
    borderWidth: 1,
    height: 52,
  },
  lifeAssuredProfileImageContainer: {
    flex: -1,
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: Colors.main.borderGray,
    marginRight: 16,
    overflow: "hidden",
  },
  innerMainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  premiumContainer: {
    backgroundColor: "rgb(223,247,255)",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contactDetailsContainer:{ paddingBottom: 40 }
  
};

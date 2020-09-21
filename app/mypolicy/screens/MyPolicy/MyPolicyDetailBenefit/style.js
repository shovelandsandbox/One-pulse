import { Colors } from "../../../configs";
import { Platform } from "react-native";

export default {
  containerStyle: {
    width: "100%",
    backgroundColor: Colors.main.baseWhite,
  },
  doubleRow: {
    container: {
      flex: 0.8,
    },

    grouper: {
      flex: -1,
      paddingVertical: 8,
      flexDirection: "row",
      backgroundColor: Colors.main.baseWhite,
    },
  },
  inputContainer: () => ({
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.main.baseGray,
  }),
  iconContainer: {
    alignItems: "center",
    height: 25,
    justifyContent: "center",
    marginRight: 15,
    paddingLeft: 10,
    marginTop: 3,
  },
  titleStyle: {
    fontSize: 16,
    color: Colors.main.baseBlack,
    margin: 10,
  },
  rowContainer: {
    backgroundColor: Colors.main.baseWhite,
  },

  /*
   * New UX upgrade style changes below
   */

  // Main part styles
  mainWrapper: {
    backgroundColor: "white",
    elevation: 2,
    marginVertical: 15,
  },
  mainLabel: {
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
  verticalDivider: {
    borderColor: "rgba(81,91,97, 0.4)",
    borderWidth: 1,
    // height: 52,
    height:'80%'
  },
  innerMainContainer: {
    flexDirection: "row",
    //justifyContent: "space-between",
    marginTop: 18,
    flex:2
  },
  premiumContainer: {
    backgroundColor: "rgb(223,247,255)",
  },
  innerColumnContainer: {
    justifyContent: "space-between",
    marginTop: 18,
  },

  // Rider styles
  riderDropdownContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 20,
  },

  // Policy coverage
  descriptionItem: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 25,
    marginBottom: 10,
  },
  iconStyle: {
    alignItems: "center",
    height: 15,
    justifyContent: "center",
    marginRight: 8,
    marginTop: 4,
    width: 15,
    backgroundColor: "rgb(255,243,224)",
    borderRadius: 7.5,
  },
  descriptionText: {
    color: "rgb(81,91,97)",
    fontFamily: "Avenir",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "justify",
    width: "95%",
  },
  itemContainer: {
    backgroundColor: Colors.main.baseWhite,
    elevation: 3,
    marginVertical: 10,
    shadowColor: Colors.main.baseBlack,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    width: '100%'
  },
  title: {
    color: "rgb(47,47,47)",
    // fontFamily: Platform.OS === "ios" ? "Avenir-Black" : "Avenir-Black-03",
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "500",
  },
  arrowIcon: {
    height: 7,
    padding: 3,
    width: 13,
    flex: 1
  },
  statusStyle: {
    alignItems: "flex-end",
    justifyContent: 'center',
    paddingStart: 20
  }
};

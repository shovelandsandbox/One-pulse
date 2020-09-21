import { Colors } from "../../../configs";
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
  // Main part styles
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
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  verticalDivider: {
    borderColor: "rgba(81,91,97, 0.4)",
    borderWidth: 1,
    height: 52,
  },
  innerContainer: {
    marginTop: 18,
  },
  contactContainer: {
    backgroundColor: "rgb(223,247,255)",
  },
  agentInfo: {
    marginBottom: 10,
  },
};

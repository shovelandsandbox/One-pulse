import { Colors, Sizes } from "../../../configs";
import { Platform } from "react-native";

export default {
  title: {
    container: {
      marginBottom: 40,
    },
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  top: {
    container: {
      flex: 1,
      justifyContent: "center",
    },

    image: {
      container: {
        width: 240,
        // height: 240,
        height: Sizes.screen.height < 650 ? 180 : 240,
      },
    },
  },

  amount: {
    container: {
      marginBottom: 24,
    },
  },

  list: {
    grouper: {
      // borderTopWidth: 1,
      // borderColor: Colors.main.borderGray,
    },
    wrapperContainer: {
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
    container: {
      flex: -1,
      flexDirection: "row",
      paddingVertical: 15,
      paddingHorizontal: 20,
    },

    containerCommon: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      paddingHorizontal: 20,
    },

    topContainer: {
      flex: 1,
      paddingRight: Sizes.screen.paddingHorizontal,
    },

    name: {
      // marginBottom: 8,
      fontFamily: "Avenir",
      fontWeight: "500",
    },

    number: {
      color: "rgb(0, 0, 0)",
      fontFamily: "Avenir",
      marginBottom: 5,
      fontWeight: "500",
    },

    iconStyle: {
      width: 13,
      height: 7,
    },

    tag: {
      marginBottom: 8,
    },

    value: {
      color: Colors.main.baseGray,
      fontFamily: "Avenir",
    },

    detail: {
      grouper: {
        backgroundColor: Colors.main.baseWhite,
        // flexDirection: "row",
        // justifyContent: "space-between",
      },

      lifeAssureds: {
        grouper: {
          flex: -1,
          paddingTop: 16,
          borderBottomWidth: 1,
          borderColor: Colors.main.borderGray,
        },

        container: {
          flex: -1,
          flexDirection: "row",
          paddingBottom: 16,
        },

        innerContainer: {
          flex: 2,
        },
        innerContainer1: {
          flex: 1,
          marginLeft: 8,
        },
      },
    },
  },
};

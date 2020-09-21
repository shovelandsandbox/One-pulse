import { Colors, Sizes } from "../../../configs";
import { Dimensions } from "react-native";

export default {
  title: {
    container: {
      paddingBottom: 20,
      backgroundColor: Colors.main.baseWhite,
    },
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  tab: {
    head: {
      grouper: {
        flexDirection: "row",
        paddingTop: 8,
        borderBottomWidth: 1,
        borderColor: Colors.main.baseWhite,
        backgroundColor: Colors.main.baseWhite,
      },

      container: {
        flex: -1,
        height: 3,
        marginTop: 8,
        backgroundColor: Colors.main.transparent,
      },
    },

    body: {
      container: {
        width: Sizes.screen.width,
        marginTop: 10,
      },
    },
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

  bottom: {
    marginBottom: 96,
    flex: -1,
  },

  bottomPadder: {
    height: 64,
  },

  section: {
    outerContainer: {
      flexDirection: "row",
    },
    container: {
      flex: -1,
      borderLeftWidth: 2,
      borderColor: Colors.main.fontGray,
      paddingLeft: 11,
      // height: Dimensions.get("screen").height - 475,
      paddingBottom: 32 - 5,
    },

    innerContainer: {
      flex: -1,
      top: -5,
    },

    cardContainer: {
      width: Dimensions.get("screen").width - 50,
    },
    circle: {
      flex: -1,
      position: "absolute",
      left: -3,
      width: 8,
      height: 8,
      borderRadius: 50,
      backgroundColor: Colors.main.fontGray,
    },
  },

  rightHeader: {
    grouper: {
      flex: -1,
      flexDirection: "row",
    },

    container: {
      paddingLeft: 10,
    },

    filterCount: {
      container: {
        flex: -1,
        position: "absolute",
        right: -4,
        top: -4,
        paddingHorizontal: 4,
        paddingVertical: 1,
        backgroundColor: Colors.main.baseRed,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
};

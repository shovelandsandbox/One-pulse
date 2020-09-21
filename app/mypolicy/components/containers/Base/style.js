import { Colors, Sizes } from "../../../configs";

export default {
  container: {
    flex: 1,
    backgroundColor: Colors.main.baseWhite,
    paddingTop: Sizes.isAndroid ? 26 : 8,
  },

  innerContainer: {
    // paddingTop: Sizes.screen.paddingTop,
    paddingBottom: 22,
  },

  innerContainerStatic: {
    flex: 1,
    paddingTop: Sizes.screen.paddingTop,
  },

  backgroundContent: {
    container: {
      flex: -1,
      position: "absolute",
      width: Sizes.screen.width,
      height: Sizes.screen.height,
    },

    content: {
      height: 140,
    },
  },

  footer: {
    grouper: {
      flex: -1,
      height: 71,
      flexDirection: "row",
      borderTopWidth: 1,
      borderColor: Colors.main.borderGray,
      paddingHorizontal: Sizes.screen.paddingHorizontal,
      paddingBottom: Sizes.screen.paddingBottom,
      backgroundColor: Colors.main.baseWhite,
    },

    bottomFiller: {
      flex: -1,
      position: "absolute",
      width: Sizes.screen.width,
      height: 40,
      bottom: -40,
      backgroundColor: Colors.main.baseWhite,
    },

    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 13,
    },

    icon: {
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 6,
      },
    },

    counter: {
      container: {
        flex: -1,
        position: "absolute",
        backgroundColor: Colors.main.baseRed,
        paddingHorizontal: 4,
        top: -5,
        right: -5,
        borderRadius: 50,
      },
    },
  },

  bottomPadder: {
    paddingBottom: 16,
  },
};

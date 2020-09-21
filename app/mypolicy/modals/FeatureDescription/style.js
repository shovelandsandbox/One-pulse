import { Colors, Sizes } from "../../configs";

export default {
  slider: {
    outerContainer: {
      flex: -1,
      width: Sizes.screen.width,
    },

    container: {
      flex: 1,
      paddingBottom: Sizes.isIphoneX ? 24 : 0,
    },

    innerContainer: {
      flex: 1,
      marginBottom: 24,
    },
  },

  image: {
    outerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    container: {
      flex: -1,
      maxHeight: 240,
      maxWidth: 240,
      width: Sizes.screen.height / 4,
      height: Sizes.screen.height / 4,
      justifyContent: "center",
    },
  },

  content: {
    container: {
      flex: -1,
      minHeight: Sizes.screen.height / 4,
      marginBottom: 24,
      justifyContent: "flex-end",
    },

    title: {
      marginBottom: 24,
    },
  },

  indicator: {
    grouper: {
      flex: -1,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 24,
    },

    circle: {
      flex: -1,
      borderRadius: 50,
      width: 4,
      height: 4,
      marginHorizontal: 4,
      backgroundColor: Colors.main.baseRed,
    },
  },

  button: {
    container: {
      flex: -1,
      backgroundColor: Colors.main.baseRed,
      width: 64,
      height: 64,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
    },
  },
};

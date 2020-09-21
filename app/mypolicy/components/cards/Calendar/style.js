import { Colors, Sizes } from "../../../configs";

export default {
  week: {
    container: {
      flex: -1,
      marginBottom: 16,
    },
  },

  day: {
    halfConnector: {
      flex: -1,
      position: "absolute",
      width: (Sizes.screen.width - Sizes.screen.paddingHorizontal * 2) / 14 + 1,
      height: 32,
      backgroundColor: Colors.main.inactiveGray,
    },

    grouper: {
      flex: -1,
      flexDirection: "row",
    },

    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    innerContainer: {
      flex: -1,
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
    },
  },

  dayScroll: {
    container: {
      flex: -1,
      width: Sizes.screen.width - Sizes.screen.paddingHorizontal * 2,
      marginRight: Sizes.screen.paddingHorizontal * 2,
    },

    emptyContainer: {
      flex: 1,
      width: Sizes.screen.width - Sizes.screen.paddingHorizontal * 2,
      marginRight: Sizes.screen.paddingHorizontal * 2,
      alignItems: "center",
      justifyContent: "center",
    },
  },
};

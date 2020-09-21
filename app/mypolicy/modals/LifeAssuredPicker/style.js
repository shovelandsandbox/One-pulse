import { Colors, Sizes } from "../../configs";

export default {
  month: {
    container: {
      flex: -1,
      flexDirection: "row",
      paddingVertical: 8,
    },

    button: {
      container: {
        flex: 1,
      },
    },

    label: {
      container: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },

  weekDay: {
    grouper: {
      flex: -1,
      flexDirection: "row",
      paddingVertical: 16,
    },

    container: {
      flex: 1,
      width: 40,
      justifyContent: "center",
      alignItems: "center",
    },
  },

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
      backgroundColor: Colors.main.softCream,
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
    grouper: {
      paddingLeft: Sizes.screen.paddingHorizontal,
    },

    container: {
      flex: -1,
      width: Sizes.screen.width - Sizes.screen.paddingHorizontal * 2,
      marginRight: Sizes.screen.paddingHorizontal * 2,
    },
  },

  form: {
    grouper: {
      flex: -1,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 32,
    },

    container: {
      flex: -1,
      width: (Sizes.screen.width - Sizes.screen.paddingHorizontal * 3) / 2,
    },
  },
};

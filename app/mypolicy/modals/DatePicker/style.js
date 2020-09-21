import { Sizes } from "../../configs";

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

  dayScroll: {
    grouper: {
      paddingLeft: Sizes.screen.paddingHorizontal,
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

  note: {
    container: {
      flex: -1,
      marginTop: 16,
    },
  },
};

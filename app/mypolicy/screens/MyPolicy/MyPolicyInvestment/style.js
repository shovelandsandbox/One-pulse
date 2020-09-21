import { Colors, Sizes } from "../../../configs";

export default {
  title: {
    container: {
      marginBottom: 40,
    },
  },

  amount: {
    container: {
      marginBottom: 24,
    },
  },

  list: {
    grouper: {
      borderTopWidth: 0,
      borderColor: Colors.main.borderGray,
    },

    container: {
      flexDirection: 'row',
      backgroundColor: Colors.main.baseWhite,
      elevation: 3,
      marginVertical: 10,
      shadowColor: Colors.main.baseBlack,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
    },
    titleText: {
      color: "rgb(47,47,47)",
      // fontFamily: Platform.OS === "ios" ? "Avenir-Black" : "Avenir-Black-03",
      fontFamily: "Avenir",
      fontSize: 16,
      fontWeight: "500",
    },

    topContainer: {
      flex: 1,
      paddingRight: 30,
    },

    detail: {
      grouper: {
        backgroundColor: Colors.main.baseWhite,
      },
    },
  },
};

import { Colors, Sizes } from "../../configs";

export default {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginBottom: 16,
  },

  image: {
    // image not shown when undefined config
    content: {
      width: 240,
      height: 240,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: 240,
      height: 240,
      paddingBottom: 24,
    },
  },

  input: {
    container: {
      flex: -1,
      marginTop: 50,
    },

    main: {
      color: Colors.main.baseWhite,
      width: Sizes.screen.width - Sizes.screen.paddingHorizontal * 2,
      borderBottomWidth: 1,
      borderColor: Colors.main.baseWhite,
      marginBottom: 8,
    },
  },

  star: {
    grouper: {
      flex: 1,
      flexDirection: "row",
    },

    container: {
      flex: -1,
      width: 30,
      height: 30,
      marginHorizontal: 12,
      justifyContent: "center",
      alignItems: "center",
    },
  },

  button: {
    container: {
      marginTop: 80,
    },
  },
};

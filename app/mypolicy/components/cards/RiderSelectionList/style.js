import { Colors } from "../../../configs";

export default {
  container: {
    flex: -1,
    flexDirection: "row",
  },

  innerContainer: {
    flex: 1,
    paddingLeft: 16,
  },

  title: {
    container: {
      flex: -1,
      paddingBottom: 8,
    },
  },

  rider: {
    container: {
      flex: -1,
      flexDirection: "row",
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors.main.borderGray,
      alignItems: "center",
    },

    name: {
      container: {
        flex: 1,
        paddingRight: 16,
      },
    },
  },
};

import { Colors } from "../../../../configs";

export default {
  container: {
    flex: -1,
    marginBottom: 40,
  },

  label: {
    container: {
      flex: -1,
      flexDirection: "row",
      alignItems: "center",
    },
  },

  option: {
    grouper: {
      flex: -1,
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 16,
    },

    container: {
      marginRight: 8,
      marginBottom: 8,
    },
  },

  tooltipButton: {
    container: {
      flex: -1,
      width: 16,
      height: 16,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.main.checkCream,
      marginLeft: 8,
    },
  },
};

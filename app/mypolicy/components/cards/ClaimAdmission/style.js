import { Colors } from "../../../configs";

export default {
  container: {
    flex: -1,
    backgroundColor: Colors.main.baseWhite,
    borderWidth: 1,
    borderColor: Colors.main.borderGray,
    borderRadius: 10,
    padding: 16,
    marginTop: 8,
    overflow: "hidden",
  },

  status: {
    grouper: {
      flex: -1,
      flexDirection: "row",
      marginTop: 16,
    },

    container: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      paddingRight: 5,
      alignItems: "center",
    },

    circle: {
      flex: -1,
      width: 8,
      height: 8,
      borderRadius: 80,
      marginRight: 8,
      alignItems: "center",
    },
  },

  warningMarker: {
    outerContainer: {
      flex: -1,
      position: "absolute",
      width: 32,
      height: 32,
      top: 0,
      right: 0,
      // overflow: "hidden",
    },

    container: {
      flex: -1,
      width: 0,
      height: 0,
      top: -32,
      right: 32,
      borderRightWidth: 64,
      borderTopWidth: 64,
      borderRightColor: "transparent",
      borderTopColor: Colors.main.errorRed,
      transform: [{ rotate: "90deg" }],
    },

    exclamation: {
      container: {
        flex: -1,
        position: "absolute",
        width: 32,
        height: 32,
        paddingRight: 6,
        paddingTop: 2,
        alignItems: "flex-end",
      },
    },
  },
};

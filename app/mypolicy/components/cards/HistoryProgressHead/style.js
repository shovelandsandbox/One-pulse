export default {
  head: {
    container: {
      flex: 1,
      paddingLeft: 16 + 12,
      marginBottom: 32 + 4,
    },

    detail: {
      container: {
        flex: 1,
        top: 4,
      },
    },

    icon: {
      parent: {
        flexDirection: "row",
      },
      container: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        width: 24,
        height: 24,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
      },
      leftBorder: {
        width: 12,
        backgroundColor: "transparent",
        borderRightWidth: 2,
        marginRight: -12,
      },
    },
  },
};
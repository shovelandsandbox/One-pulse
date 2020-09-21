import { Colors } from "../../../configs";

export default {
  container: {
    flex: -1,
    flexDirection: "row",
    marginBottom: 48,
  },

  dot: {
    container: {
      flex: -1,
      width: 24,
    },
  },

  innerContainer: {
    flex: 1,
  },

  note: {
    marginVertical: 8,
  },

  document: {
    grouper: {
      flex: -1,
      borderWidth: 1,
      borderRadius: 10,
      borderStyle: "dashed",
      justifyContent: "center",
      borderColor: Colors.main.checkCream,
      marginTop: 8,
    },

    innerGrouper: {
      flex: 1,
      borderRadius: 10,
      overflow: "hidden",
    },

    container: {
      flex: -1,
      flexDirection: "row",
      height: 56,
      alignItems: "center",
      paddingHorizontal: 16,
      backgroundColor: Colors.main.softGray,
      borderBottomWidth: 1,
      borderColor: Colors.main.borderGray,
    },

    image: {
      container: {
        flex: -1,
        width: 24,
        height: 24,
        backgroundColor: Colors.main.borderGray,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: Colors.main.baseGray,
      },
    },

    info: {
      contatiner: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 24,
      },

      progress: {
        container: {
          flex: -1,
          flexDirection: "row",
          backgroundColor: Colors.main.borderGray,
          borderRadius: 50,
          height: 3,
          marginTop: 4,
        },

        current: {
          flex: 0,
          backgroundColor: Colors.main.successGreen,
          borderRadius: 50,
        },
      },
    },

    deleteButton: {
      container: {
        flex: -1,
        width: 24,
        height: 24,
      },
    },
  },

  addButton: {
    container: {
      flex: -1,
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 16,
    },

    icon: {
      container: {
        flex: -1,
        width: 24,
        height: 24,
        marginRight: 16,
      },
    },
  },
};

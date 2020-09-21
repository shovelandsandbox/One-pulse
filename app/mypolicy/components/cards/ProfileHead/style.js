/*
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 *  IMPORTS
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 */

// ----------------------------------------
// LOCAL & CONFIG IMPORTS
// ----------------------------------------
import { Colors } from "../../../configs";

export default {
  container: {
    flex: -1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
    borderBottomWidth: 1,
    borderColor: Colors.main.borderGray,
  },

  image: {
    outerContainer: {
      paddingTop: 16,
      marginBottom: 8,
    },

    container: {
      flex: -1,
      width: 88,
      height: 88,
      borderRadius: 50,
      backgroundColor: Colors.main.borderGray,
      overflow: "hidden",
    },

    editButton: {
      container: {
        position: "absolute",
        flex: -1,
        width: 32,
        height: 32,
        borderRadius: 50,
        backgroundColor: Colors.main.baseRed,
        borderWidth: 2,
        borderColor: Colors.main.baseWhite,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        bottom: 0,
      },
    },
  },

  info: {
    container: {
      flex: -1,
      alignItems: "center",
      marginTop: 16,
    },
  },
};

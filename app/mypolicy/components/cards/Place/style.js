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
import {
  Colors,
} from "../../../configs";

export default {
	container: {
    flex: -1,
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: Colors.main.borderGray,
  },

  icon: {
    outerContainer: {
      flex: -1,
      width: 56,
    },

    container: {
      flex: -1,
      width: 40,
      height: 40,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    },
  },

  detail: {
    container: {
      flex: 1,
    },
  },

  starMark: {
    container: {
      flex: -1,
      position: "absolute",
      width: 21,
      height: 21,
      top: -2,
      right: 2,
      justifyContent: "center",
      alignItems: "center",
    },

    innerStar: {
      position: "absolute",
    },
  },

  loading: {
    title: {
      container: {
        flex: -1,
        flexDirection: "row",
      },

      content: {
        flex: 1,
        height: 8,
        backgroundColor: Colors.main.borderGray,
        borderRadius: 50,
      },
    },

    description: {
      flex: 1,
      marginTop: 16,
      height: 4,
      backgroundColor: Colors.main.borderGray,
      borderRadius: 50,
    },
  },
};
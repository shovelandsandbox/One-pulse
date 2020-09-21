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
  polis: {
    container: {
      flex: -1,
      backgroundColor: Colors.main.baseWhite,
      paddingTop: 24,
      paddingBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: Colors.main.borderGray,
    },

    innerContainer: {
      flex: -1,
      flexDirection: "row",
      alignItems: "center",
    },

    detail: {
      container: {
        flex: 1,
      },

      tag: {
        marginBottom: 8,
      },
    },
  },

  bottomPadding: {
    height: 120,
  },
};

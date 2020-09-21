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
  Sizes,
} from "../../../configs";

export default {
  main: {
    container: {
      flex: -1,
      paddingBottom: 16,
      marginBottom: 24,
      borderBottomWidth: 1,
      borderColor: Colors.main.borderGray,
    },

    action: {
      grouper: {
        flex: -1,
        marginTop: 24,
      },

      container: {
        flex: -1,
        flexDirection: "row",
        marginBottom: 16,
      },

      icon: {
        container: {
          flex: -1,
          width: 32,
        },
      },
    },
  },

  partner: {
    grouper: {
      flex: -1,
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 24,
    },
    
    container: {
      flex: -1,
      width: 80,
      height: 80,
      marginRight: 16,
      marginBottom: 16,
    },
  },
};
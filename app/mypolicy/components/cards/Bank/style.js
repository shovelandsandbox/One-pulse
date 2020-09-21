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
} from "@pjia-configs";

export default {
  container: {
    flex: -1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.main.borderGray,
    alignItems: "center",
    paddingVertical: 16,
  },

  detail: {
    container: {
      flex: 1,
    },

    number: {
      marginBottom: 4,
    },
  },
};
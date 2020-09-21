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
    borderBottomWidth: 1,
    borderColor: Colors.main.borderGray,
    paddingVertical: 24,
  },

  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    marginBottom: 8,
  },

  image: {
    container: {
      flex: -1,
      width: 40,
      height: 40,
      borderRadius: 50,
      backgroundColor: Colors.main.borderGray,
      marginRight: 16,
      overflow: "hidden",
    },

    badge: {
      container: {
        flex: -1,
        position: "absolute",
        bottom: 0,
        right: 16,
        width: 15,
        height: 15,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.main.baseWhite,
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
  lifeAssuredContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  lifeAssuredAddressContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  name: {
    container: {
      flex: 1,
    },
  },
};

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
  outerContainer: {
    flex: 1,
    paddingTop: Sizes.screen.paddingTop,
  },

  rounder: {
    container: {
      flex: -1,
      position: "absolute",
      width: Sizes.screen.width,
      height: 60,
      top: -Sizes.screen.paddingTop,
      backgroundColor: Colors.main.baseWhite,
      borderRadius: 10,
      alignItems: "center",
      paddingTop: 15,
    },

    handle: {
      flex: -1,
      width: 80,
      height: 2,
      backgroundColor: Colors.main.borderGray,
    },
  },

  container: {
    flex: 1,
    backgroundColor: Colors.main.baseWhite,
  },

  control: {
    container: {
      marginBottom: 24,
    },

    filter: {
      container: {
        flex: -1,
        flexDirection: "row",
        marginTop: 8,
        alignItems: "center",
      },

      icon: {
        marginRight: 5,
      },

      count: {
        flex: -1,
        position: "absolute",
        left: 12,
        top: -4,
        paddingHorizontal: 4,
        paddingVertical: 1,
        backgroundColor: Colors.main.baseRed,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },

  empty: {
    container: {
      flex: 1,
      alignItems: "center",
      paddingTop: 60,
    },

    image: {
      container: {
        flex: -1,
        width: 240,
        height: 240,
        marginBottom: 24,
      },

      content: {
        opacity: .5,
      },
    },
  },

  list: {
    container: {
      flex: 1,
    },

    head: {
      container: {
        flex: -1,
        borderBottomWidth: 1,
        borderColor: Colors.main.borderGray,
        paddingBottom: 8,
        marginBottom: 28,
      },

      label: {
        marginBottom: 8,
      },
    },
  },

  card: {
    grouper: {
      marginTop: 8,
    },    
  },

  map: {
    container: {
      flex: -1,
      position: "absolute",
      width: Sizes.screen.width,
      backgroundColor: Colors.main.borderGray,
    },
  },
};
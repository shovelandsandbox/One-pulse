import { Colors, Sizes } from "../../../configs";

export default {
  camera: {
    container: {
      flex: 1,
    },

    main: {
      height: Sizes.screen.height,
    },

    scanner: {
      container: {
        flex: -1,
        position: "absolute",
        backgroundColor: Colors.main.baseBlack,
        width: Sizes.screen.width,
        height: 573,
      },
    },

    marker: {
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },

      layer: {
        flex: 1,
        backgroundColor: Colors.main.baseBlack,
        opacity: 0,
      },

      middleGrouper: {
        flex: -1,
        width: Sizes.screen.width,
        flexDirection: "row",
      },

      area: {
        flex: -1,
        borderRadius: 10,
      },

      border: {
        flex: -1,
        position: "absolute",
        borderWidth: 2,
        borderColor: Colors.main.baseRed,
        borderRadius: 10,
      },
    },
  },
  control: {
    container: {
      backgroundColor: Colors.main.baseBlack,
      height: 128,
      justifyContent: "center",
      alignItems: "center",
    },
    circle: {
      borderRadius: 50,
      backgroundColor: Colors.main.baseWhite,
      height: 64,
      position: "absolute",
      width: 64,
      justifyContent: "center",
      alignItems: "center",
    },
    innerCircle: {
      borderWidth: 1,
      borderRadius: 50,
      height: 48,
      width: 48,
    },
  },
};

import { Sizes } from "../../../configs";

export default {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  top: {
    container: {
      flex: 1,
      justifyContent: "center",
    },

    image: {
      container: {
        width: 240,
        // height: 240,
        height: Sizes.screen.height < 650 ? 180 : 240,
      },
    },
  },

  bottom: {
    marginBottom: 96,
    flex: -1,
  },

  bottomPadder: {
    height: 64,
  },
};

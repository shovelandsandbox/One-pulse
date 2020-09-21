import { Sizes } from "../../../configs";

export default {
  title: {
    container: {
      marginBottom: 40,
    },
  },

  subTitle: {
    marginTop: 16,
  },

  background: {
    container: {
      flex: -1,
      position: "absolute",
      left: 0,
      bottom: 0,
      width: Sizes.screen.width,
      height: Sizes.screen.width * 1.1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },

    content: {
      width: Sizes.screen.width,
    },
  },

  bottomPadding: {
    height: 120,
  },

  step: {
    marginBottom: 8,
  },
};

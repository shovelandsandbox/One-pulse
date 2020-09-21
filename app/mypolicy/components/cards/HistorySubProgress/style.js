import { Sizes } from "../../../configs";

export default {
  container: {
    flex: -1,
    paddingLeft: 12,
  },

  innerContainer: {
    flex: -1,
    top: -5,
  },

  title: {
    parentContainer: {
      flex: 1,
      flexDirection: "row",
    },

    container: {
      flex: 1,
      paddingLeft: 16,
      paddingBottom: 32 - 12,
      // marginBottom: 12,
      borderLeftWidth: 2,
      marginTop: -2,
      marginLeft: 12,
    },

    parent: {
      width: 12,
      marginRight: -6,
      borderRightWidth: 2,
    },

    leftTitle: {
      width: 14,
      height: 2,
      marginTop: 10,
      marginLeft: -2,
    },

    text: {
      top: 0,
    },

    branchRounder: {
      flex: -1,
      position: "absolute",
      width: 10,
      height: 12,
      left: -10,
      top: -9,
      borderRightWidth: Sizes.isAndroid ? 2 : 4,
      borderTopWidth: Sizes.isAndroid ? 2 : 3,
      borderTopRightRadius: 10,
    },
  },

  circle: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: 10,
    height: 10,
    borderRadius: 50,
  },

  step: {
    container: {
      flex: -1,
      paddingLeft: 16 - 2,
      paddingBottom: 24,
    },

    title: {
      top: 0,
      left: 8,
    },

    circle: {
      position: "absolute",
      top: 0,
      left: 1,
      width: 8,
      height: 8,
      borderRadius: 50,
    },

    parentStep: {
      flex: 1,
      flexDirection: "row",
    },

    leftStep: {
      width: 14,
      marginRight: -6,
      borderRightWidth: 2,
    },
  },

  additionalAction: {
    container: {
      flex: -1,
      marginTop: 16,
      paddingLeft: 8,
    },

    manualDocumentSubmission: {
      point: {
        marginTop: 16,
      },
    },

    documentUpload: {
      point: {
        marginTop: 16,
      },
    },
  },
};

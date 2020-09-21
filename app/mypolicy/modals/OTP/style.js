import { Colors, Sizes } from "../../configs";

export default {
  container: {
    flex: 1,
    paddingTop: Sizes.screen.height / 15,
    alignItems: "center",
  },

  image: {
    container: {
      flex: -1,
      width: Sizes.screen.height < 650 ? 64 : 128,
      height: Sizes.screen.height < 650 ? 64 : 128,
      marginBottom: Sizes.screen.height < 650 ? 16 : 32,
    },
  },
  otpContainer: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 40,
  },
  otpText: {
    flex: 1,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "900",
    fontFamily: "Avenir",
    fontSize: 32,
    borderBottom: 1,
    paddingBottom: 10,
    borderBottomColor: "#000000",
    width: "60%",
    borderBottomWidth: 1,
  },
  pinCircle: {
    grouper: {
      flex: -1,
      height: 80,
      marginVertical: 10,
      justifyContent: "center",
      alignItems: "center",
    },

    innerGrouper: {
      flex: -1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },

    circle: {
      flex: -1,
      height: 8,
      width: 8,
      borderRadius: 50,
      borderWidth: 1,
      marginHorizontal: 16,
      borderColor: Colors.main.baseRed,
    },
  },

  invalidNumber: {
    marginTop: Sizes.screen.height < 650 ? 16 : 32,
  },

  hiddenInput: {
    position: "absolute",
    width: 0,
    height: 0,
  },

  error: {
    text: {
      marginTop: 16,
      marginBottom: 10,
    },
  },

  otpDescription: {
    marginTop:
      Sizes.screen.height > 650 ? 4 : Sizes.screen.height < 400 ? 0 : 4,
    fontSize:
      Sizes.screen.height > 650 ? 16 : Sizes.screen.height < 400 ? 14 : 14,
  },

  icon: {
    grouper: {
      marginTop: 40,
      flexDirection: "row",
      alignSelf: "center",
      marginBottom: 40,
    },

    container: {
      position: "absolute",
    },
  },

  loadingImage: {
    wrapper: {
      marginTop: 92,
      flex: -1,
      alignItems: "center",
    },

    container: {
      flex: -1,
      width: Sizes.screen.height < 650 ? 90 : 180,
      height: Sizes.screen.height < 650 ? 90 : 180,
    },
  },

  message: {
    container: {
      paddingTop: 25,
    },
  },
};

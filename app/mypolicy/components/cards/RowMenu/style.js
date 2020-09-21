import { Colors, Sizes } from "../../../configs";

export default {
  container: {
    width: '100%',
    flexDirection: "row",
    padding: 20,
    borderColor: Colors.main.borderGray,
    paddingHorizontal: Sizes.screen.paddingHorizontal,
    alignItems: "center",
    backgroundColor: Colors.main.baseWhite,
    elevation: 2,
    marginVertical: 4,
  },

  icon: {
    container: {
      flex: -1,
      width: 24,
      marginRight: 8,
    },
  },

  label: {
    container: {
      flex: 1,
    },
  },
  addBeneficaryContainer: {
    paddingLeft: 0,
    paddingTop: 20,
  },
  addBeneficiaries: {
    color: Colors.main.baseRed,
    fontWeight: "normal",
    textDecorationLine: "underline",
    fontSize: 15,
    lineHeight: 28,
    letterSpacing: 0,
  },
  buttonContainer: {
    flex: -1,
    width: 182,
  },
  buttonText: {
    alignItems: "center",
    color: "#ffffff",
  },
  buttonView: {
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 40,
    width: "80%",
    backgroundColor: "crimson",
    padding: 5,
  },
  arrow: {
    container: {
      flex: -1,
      width: 32,
    },
  },
};

import { Colors, Sizes } from "../../../configs";

export default {
  lifeAssuredContainer: {
    flex: -1,
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: Colors.main.borderGray,
    paddingHorizontal: Sizes.screen.paddingHorizontal,
    alignItems: "center",
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
  container: {
    flex: -1,
    borderBottomWidth: 1,
    paddingVertical: 16,
    borderBottomColor: Colors.main.borderGray,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 50,
  },
  link: {
    color: Colors.main.baseRed,
    fontWeight: "normal",
    textDecorationLine: "underline",
    fontSize: 15,
    lineHeight: 28,
    letterSpacing: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  rowContainer: {
    backgroundColor: Colors.main.baseWhite,
  },
};

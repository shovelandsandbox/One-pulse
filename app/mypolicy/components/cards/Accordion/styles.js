import { StyleSheet, Platform } from "react-native";
import { Colors } from "../../../configs";

const Styles = StyleSheet.create({
  arrowIcon: {
    height: 7,
    padding: 3,
    width: 13,
  },
  childContainer: {
    backgroundColor: Colors.main.baseWhite,
  },
  container: {
    backgroundColor:
      Platform.OS === "ios" ? "transparent" : Colors.main.baseWhite,
    ...Platform.select({
      ios: {
        shadowColor: Colors.main.baseBlack,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
      },
      android: {
        elevation: 3,
      },
    }),
    marginVertical: 10,
  },
  title: {
    color: "rgb(47,47,47)",
    // fontFamily: Platform.OS === "ios" ? "Avenir-Black" : "Avenir-Black-03",
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "500",
  },
  titleWrapper: {
    alignItems: "center",
    backgroundColor: Colors.main.baseWhite,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});

export default Styles;

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "auto",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  skipText: {
    color: "#ec1c2e",
    fontFamily: "Avenir-Roman",
    fontSize: 13,
    lineHeight: 25,
  },
  skipView: {
    position: "absolute",
    right: 15,
    top: 17,
  },
  widgetIcon: {
    height: 29,
    marginHorizontal: 10,
    width: 29,
  },
  widgetsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
});

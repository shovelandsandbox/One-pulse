import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";

export default StyleSheet.create({
  whiteContainer: {
    paddingLeft: 10,
    paddingRight: 14,
    backgroundColor: "#fff",
    marginBottom: 20,
    height: "auto",
    borderRadius: 10,
  },
  whiteHeaderContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  whiteHeader: {
    color: "#ed1b2e",
    fontSize: 20,
    lineHeight: getLineHeight(20),
  },
  whiteSupport: {
    color: "#888888",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 4,
    fontFamily: "Avenir-Roman",
    lineHeight: getLineHeight(12),
    textAlign: "center",
  },
  whiteContainerBody: {
    paddingVertical: 2,
  },
  imgBackground: {
    bottom: 0,
    height: "54%",
    opacity: 0.7,
    position: "absolute",
    right: 0,
    width: "32%",
    zIndex: 9999,
  },
  imgBackgroundInCenter: {
    alignSelf: "center",
    height: 110,
    justifyContent: "center",
    opacity: 0.7,
    position: "absolute",
    top: 55,
    width: 110,
    zIndex: 9999,
  },
});

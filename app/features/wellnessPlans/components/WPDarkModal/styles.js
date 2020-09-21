import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const deviceWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  WrapperContainer: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  closeButtonContainer: {
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 90,
    bottom: 0,
    height: 35,
    justifyContent: "center",
    marginTop: 6.7,
    width: 35,
  },
  closeImage: {
    height: 35,
    width: 35,
  },
  container: {
    backgroundColor: Colors.black,
    borderRadius: 8,
    justifyContent: "center",
    overflow: "hidden",
  },
  imageBackground: {
    width: "100%",
  },
  modalContainer: {
    height: "100%",
    justifyContent: "flex-start",
    minWidth: deviceWidth * 0.8,
  },
  letsgoButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 108.3,
    borderRadius: 19.7,
  },
  letsgoButtonContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 14.7,
    marginVertical: 13.3,
  },
  noButton: {
    alignItems: "center",
    borderRadius: 3.3,
    height: 31.3,
    justifyContent: "center",
    width: 99.7,
  },
  noText: { 
    color: Colors.redec1c2e,
    fontSize: 12,
    fontWeight: "normal",
  },
  yesText: { color: Colors.white },
  startButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  startOnYourOwnText: { 
    color: Colors.redc91827,
    fontSize: 12,
  },
  startOnYourOwnButton: {
    alignItems: "center",
    height: 14,
    justifyContent: "center",
    width: "auto",
    marginVertical: 16.7,
  },
  startRoundedButton: {
    minWidth: deviceWidth * 0.8,
    borderRadius: 16.7,
  }
});

import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../themes";
const { Colors } = Theme;

const deviceWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  WrapperContainer: {
    alignItems: "center",
    height: "100%",
    width: deviceWidth * 0.8,
    justifyContent: "center",
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  singleButtonWrapper: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    width: 100,
  },
  container: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    justifyContent: "center",
    marginLeft: deviceWidth * 0.2,
    overflow: "hidden",
    width: deviceWidth * 0.8,
  },
  description: {
    color: Colors.grey1a1a1a,
    fontSize: 14,
    marginBottom: 20,
    marginTop: 10
  },
  imageBackground: {
    padding: 20,
    width: "100%"
  },
  imageContainer: {
    bottom: 0,
    justifyContent: "flex-start",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    width: "100%"
  },
  modal: { margin: 0 },
  modalContainer: {
    height: "100%",
    justifyContent: "flex-start",
    width: deviceWidth * 0.8,
  },
  negativeButton: {
    marginLeft: 20,
    padding: 10,
    height: 40,
    width: deviceWidth * 0.25,
    justifyContent: "center",
    alignItems: "center"
  },
  positiveButton: {
    marginLeft: 20,
    height: 40,
    backgroundColor: Colors.pulseRed,
    padding: 10,
    borderRadius: 10,
    width: "auto",
    justifyContent: "center",
    alignItems: "center"
  },
  positiveButtonText: {
    color: Colors.white,
    textAlignVertical: "center"
  },
  singlePositiveButton: {
    backgroundColor: "#ec1c2e",
    height: 31,
    borderRadius: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: Colors.grey3a3a3a,
    fontSize: 16
  },
  darkModalContainer: {
    justifyContent: "flex-start",
    backgroundColor: Colors.black,
    borderRadius: 8,
    marginLeft: deviceWidth * 0.2,
    overflow: "hidden",
    width: deviceWidth * 0.78
  },
  darkTitle: {
    fontSize: 14,
    lineHeight: 16.3,
    color: Colors.white
  },
  darkDescription: {
    fontSize: 11.3,
    lineHeight: 15,
    color: Colors.white,
    marginTop: 20,
    textAlign: "center"
  }
});

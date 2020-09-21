import { StyleSheet } from "react-native";
import colors from "../../../../themes/default/colors";

const colorValues = {
  container: "rgba(247, 249, 251, 1)",
  templateHeaderText: "rgba(47, 47, 47, 1)",
  templateDescription: "rgba(97, 97, 97, 1)",
};

export default StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    borderRadius: 19.7,
    height: 36,
    marginTop: 10,
    position: "absolute",
    right: 23,
    top: 94.4,
    width: 106,
  },
  buttonGradient: {
    alignItems: "center",
    borderRadius: 19.7,
    height: 36,
    justifyContent: "center",
    width: 106,
  },
  buttonStart: {
    alignSelf: "center",
    color: colors.white,
    fontSize: 13,
    lineHeight: 15,
    textAlign: "center",
    width: 218,
  },
  container: {
    backgroundColor: colorValues.container,
    flex: 1,
  },
  imageBackground: {
    height: 153,
  },
  imageStyle: {
    height: 153,
    resizeMode: "cover",
  },
  settings: {
    height: 17.1,
    width: 17.1,
  },
  startContainer: {
    marginTop: 88,
    paddingLeft: 13,
  },
  startDescription: {
    color: colors.white,
    fontSize: 12,
    lineHeight: 14,
    marginTop: 5,
    width: 188,
  },
  startTitle: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
  },
  templateContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  templateDescription: {
    color: colorValues.templateDescription,
    fontSize: 12,
    lineHeight: 14,
    marginTop: 5,
  },
  templateHeader: {
    marginTop: 18,
    paddingLeft: 20,
  },
  templateTitle: {
    color: colorValues.templateHeaderText,
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
  },
});

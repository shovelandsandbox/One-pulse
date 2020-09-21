import { StyleSheet } from "react-native";
import colors from "../../../../themes/default/colors";

const colorValues = {
  container: "rgba(247, 249, 251, 1)",
  templateHeaderText: "rgba(47, 47, 47, 1)",
  templateDescription: "rgba(97, 97, 97, 1)",
  nutrition: "rgba(0, 0, 0, 0.4)",
};

export default StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    borderRadius: 5,
    bottom: 11,
    height: 32,
    marginTop: 10,
    position: "absolute",
    right: 11,
    width: 75,
  },
  buttonGradient: {
    alignItems: "center",
    borderRadius: 5,
    height: 32,
    justifyContent: "center",
    width: 75,
  },
  buttonSelect: {
    alignSelf: "center",
    color: colors.white,
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
  },
  calorie: {
    color: colors.white,
    fontSize: 12,
    lineHeight: 14,
    marginTop: 5,
    width: 188,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 5,
    flex: 1,
    height: 125,
    marginBottom: 17.5,
  },
  imageBackground: {
    borderRadius: 5,
    height: 125,
  },
  imageStyle: {
    borderRadius: 5,
    height: 125,
    resizeMode: "cover",
  },
  name: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
  },
  nutrition: {
    alignItems: "center",
    backgroundColor: colorValues.nutrition,
    borderRadius: 5,
    flexDirection: "row",
    height: 32,
    justifyContent: "space-between",
    marginLeft: 9,
    marginTop: 32,
    paddingHorizontal: 10,
    width: 271,
  },
  nutritionText: {
    color: colors.white,
    fontSize: 11,
    lineHeight: 13,
  },
  settings: {
    height: 17.1,
    width: 17.1,
  },
  templateContainer: {
    flex: 1,
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
  titleContainer: {
    marginTop: 12,
    paddingLeft: 13,
  },
});

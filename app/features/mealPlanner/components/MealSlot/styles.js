import { StyleSheet } from "react-native";
import colors from "../../../../themes/default/colors";

const colorValues = {
  container: "rgba(247, 249, 251, 1)",
  slotTitle: "rgba(47, 47, 47, 1)",
  templateDescription: "rgba(97, 97, 97, 1)",
  nutrition: "rgba(0, 0, 0, 0.57)",
  slot1: "rgba(96, 193, 0, 1)",
  slot2: "rgba(241, 23, 43, 1)",
  slot3: "rgba(143, 23, 241, 1)",
  slotTime: "rgba(162, 162, 162, 1)",
  recipeColor2: "rgba(255, 246, 246, 1)",
  recipeBorder2: "rgba(236, 219, 219, 1)",
  recipeColor1: "rgba(248, 252, 246, 1)",
  recipeBorder1: "rgba(226, 229, 216, 1)",
  recipeColor3: "rgba(248, 241, 255, 1)",
  recipeBorder3: "rgba(207, 199, 214, 1)",
  recipeText: "rgba(81, 91, 97, 1)",
  changeRecipeColor: "rgba(255, 252, 249, 1)",
};

export default StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 15,
    flexDirection: "row",
    height: 32,
    justifyContent: "center",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 150,
  },
  changeRecipe: {
    alignSelf: "center",
    color: "white",
    fontSize: 14,
    lineHeight: 16,
    textAlign: "center",
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 7,
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  dropDown: {
    height: 10,
    width: 10,
  },
  dropDownContainer: {
    height: 20,
    justifyContent: "center",
    width: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 14,
  },
  headerTitle: {
    flexDirection: "row",
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
  recipe: {
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    height: 37,
    justifyContent: "space-between",
    marginBottom: 5,
    paddingHorizontal: 12,
  },
  recipe1: {
    backgroundColor: colorValues.recipeColor1,
    borderColor: colorValues.recipeBorder1,
  },
  recipe2: {
    backgroundColor: colorValues.recipeColor2,
    borderColor: colorValues.recipeBorder2,
  },
  recipe3: {
    backgroundColor: colorValues.recipeColor3,
    borderColor: colorValues.recipeBorder3,
  },
  recipeText: {
    width: "90%",
  },
  settings: {
    height: 17.1,
    width: 17.1,
  },
  slot1: {
    borderColor: colorValues.slot1,
  },
  slot2: {
    borderColor: colorValues.slot2,
  },
  slot3: {
    borderColor: colorValues.slot3,
  },
  slotIndicator: {
    borderRadius: 10,
    borderWidth: 2,
    height: 12,
    width: 12,
  },
  slotTime: {
    color: colorValues.slotTime,
    fontSize: 11,
    lineHeight: 13,
    marginLeft: 35,
  },
  slotTitle: {
    color: colorValues.slotTitle,
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
    marginLeft: 8,
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

import { StyleSheet } from "react-native";
import colors from "../../../../themes/default/colors";

const colorValues = {
  title: "rgba(47, 47, 47, 1)",
  description: "rgba(32, 32, 32, 1)",
};

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  contentView: {
    flex: 1,
    marginTop: 10,
  },
  description: {
    color: colorValues.description,
    fontSize: 14,
    lineHeight: 18,
    paddingTop: 5,
  },
  headerText: {
    color: colors.gray,
    fontFamily: "Open Sans",
    fontSize: 14,
    lineHeight: 18,
    marginLeft: 64,
  },
  title: {
    color: colorValues.title,
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 21,
  },
  titleContainer: {
    paddingHorizontal: 22,
    paddingTop: 19,
  },
});

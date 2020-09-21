import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";

export default StyleSheet.create({
  container: {
    height: "auto",
    paddingHorizontal: 10,
    paddingTop: 10,
    width: "100%",
  },
  descStyle: {
    fontFamily: "Avenir-Roman",
    fontSize: 14,
    paddingBottom: 4,
    paddingTop: 4,
    lineHeight: getLineHeight(14),
  },
  image: {
    alignContent: "center",
    aspectRatio: 2.4,
    borderRadius: 20,
  },
  titleStyle: {
    flexDirection: "row",
    fontFamily: "Avenir-Roman",
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 4,
    paddingTop: 4,
    textAlign: "left",
    lineHeight: getLineHeight(15),
  },
});

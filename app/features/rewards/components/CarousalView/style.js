import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";
export default StyleSheet.create({
  faqHead: { flexDirection: "row", margin: 5 },
  rewardFlex1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20,
  },
  offerText: {
    color: "#2f2f2f",
    fontFamily: "Avenir-Black",
    fontSize: 13,
    lineHeight: getLineHeight(13),
    fontWeight: "500"
  },
  rewardFlex2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingTop: 5,
    paddingRight: 20,
  },
  carousalStyle: { height: 200, width: "100%", resizeMode: "contain" }
});

import { StyleSheet } from "react-native";
import { normalize, getLineHeight } from "../../../../utils/StyleUtils";

export default styles = StyleSheet.create({
  bonusTagContainer: {
    backgroundColor: "#ed1b2e",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginLeft: 6,
  },
  bonusText: {
    color: "#ffffff",
    fontFamily: "Avenir-Roman",
    fontSize: normalize(9),
    lineHeight: getLineHeight(9),
    marginLeft: 3,
  },
  discountIcon: {
    height: 9,
    width: 9,
  },
});

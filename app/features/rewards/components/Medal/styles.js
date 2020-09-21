import { StyleSheet } from "react-native";
import { normalize } from "../../../../utils/StyleUtils";
export default styles = StyleSheet.create({
  badgeContainer: {
    alignContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    flexDirection: "row",
    height: 38,
    justifyContent: "center",
    width: 118,
  },
  countText: {
    color: "#fd555b",
    fontFamily: "Avenir-Roman",
    fontSize: normalize(13),
    lineHeight: normalize(18),
    marginLeft: 3,
  },
  medalContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  medalIcon: {
    height: 25,
    width: 25,
  },
  winnerContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  winnerIcon: {
    height: 18,
    width: 25,
  },
});

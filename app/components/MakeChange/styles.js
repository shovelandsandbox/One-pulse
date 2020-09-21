import { StyleSheet, Platform } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";

export default StyleSheet.create({
  title: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    flex: 0.5,
    color: "#68737a",
    fontSize: 15,
    lineHeight: 17.3,
  },
  timestamp: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 15.6,
    marginVertical: 8,
    paddingRight: 5,
    color: "#6b6a6d",
  },
  titleWrapper: {
    marginVertical: 8,
    flexDirection: "row",
  },
  horizontalLine: {
    borderBottomWidth: 1,
    marginTop: 17.2,
    borderBottomColor: colors.silver,
  },
  rowFlexMt: {
    marginTop: 19,
    flexDirection: "row",
    paddingRight: 10,
  },
});

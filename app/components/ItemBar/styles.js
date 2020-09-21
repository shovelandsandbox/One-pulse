import { StyleSheet, Platform } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";

export default StyleSheet.create({
  title: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 11.3,
    color: colors.nevada,
    lineHeight: 13,
    flex: 0.5,
  },
  timestamp: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 10,
    color: colors.nevada,
    lineHeight: 11.3,
    marginVertical: 8,
    flex: 0.5,
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
  flxRow: {
    flexDirection: "row",
    flex: 1,
    marginBottom: 5,
  },
  rightText: {
    textAlign: "right",
  },
  split: {
    flex: 0.5,
    color: "#6b6a6d",
    fontSize: 13.3,
    lineHeight: 15.6,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    marginTop: 4
  },
  goodLine: {
    borderBottomWidth: 2,
    marginBottom: 17.2,
    borderBottomColor: colors.green,
  },
  cautionLine: {
    borderBottomWidth: 2,
    marginBottom: 17.2,
    borderBottomColor: colors.orange,
  },
  alertLine: {
    borderBottomWidth: 2,
    marginBottom: 17.2,
    borderBottomColor: colors.red,
  },
  wrapper: {
    padding: 10,
  },
});

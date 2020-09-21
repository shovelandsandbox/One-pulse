import { StyleSheet, Platform } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 25,
  },
  diseaseTitle: {
    marginBottom: 8.7,
    fontSize: 15,
    lineHeight: 17.3,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    color: "#68737a",
  },
  backCloseBtnWrapper: {
    width: 35,
    height: 35,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  diseaseDescription: {
    textAlign: "justify",
    fontSize: 13.3,
    lineHeight: 15,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    color: "#6b6a6d",
  },
  horizontalLine: {
    borderBottomWidth: 1,
    marginVertical: 17.2,
    borderBottomColor: colors.silver,
  },
  iconText: {
    marginRight: 20,
  },
  flexRow: {
    flexDirection: "row",
  },
  riskRange: {
    flex: 0.25,
    alignItems: "center",
    justifyContent: "center",
  },
  riskValueText: {
    marginBottom: 8.7,
    fontSize: 18.3,
    lineHeight: 21,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-regular",
    color: colors.nevada,
  },
  riskRangeText: {
    textAlign: "justify",
    fontSize: 13.3,
    lineHeight: 15,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    color: "#6b6a6d",
  },
  riskDescription: {
    flex: 0.75,
    alignItems: "center",
    justifyContent: "center",
  },
  influenceText: {
    fontSize: 15,
    lineHeight: 17.3,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-regular",
    marginVertical: 6.5,
    color: "#68737a",
  },
  influenceListText: {
    textAlign: "justify",
    fontSize: 13.3,
    lineHeight: 15,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    color: colors.nevada,
    marginVertical: 4,
  },
});

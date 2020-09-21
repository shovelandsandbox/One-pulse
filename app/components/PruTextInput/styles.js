/* eslint-disable react-native/no-color-literals */
import { StyleSheet, Platform } from "react-native";

const fontFamily = Platform.OS === "ios" ? "PruSansNormal" : "pru-regular";

export default StyleSheet.create({
  column: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  left: {
    flex: 0.2,
    height: 40,
    justifyContent: "center",
  },
  messageText: {
    color: "#515b61",
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 3,
  },
  right: {
    flex: 0.2,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  title: {
    color: "#515B61",
    fontFamily,
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  txtInputStyle: {
    color: "#515B61",
    flex: 1,
    fontSize: 14,
    height: 40,
    paddingLeft: 6,
  },
});

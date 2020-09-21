import { StyleSheet, Platform, Dimensions } from "react-native";

import { CoreConfig } from "@pru-rt-internal/pulse-common";

const { colors, width } = CoreConfig;

export default StyleSheet.create({
  langStyle: {
    fontSize: 20
  },
  langHeader: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
  },
  container: {
      flex: 1,
      justifyContent: 'space-between'
  },
  disclaimer: {
      width: '100%',
      alignItems: 'center',
      marginVertical: 20,
  },
  disclaimerPadding: {
      width: '85%',
      marginVertical: 10
  },
  disclaimerFont: {
      fontSize: 16,
      textAlign: "center",
  },
  underline: {
      textDecorationLine: "underline"
  },
  loginMail: {
    width: 295,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ed1b2e",
    marginBottom: 12,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#ed1b2e",
    paddingRight: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
  },
  iconMailLogo: {
    height: 20,
    width: 20,
    marginLeft: 34,
  },
  mailLoginText: {
    fontSize: 14,
    lineHeight: 26,
    letterSpacing: 1.12,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    color: "#ffffff",
    textTransform: "uppercase",
    marginLeft: 14,
    flex: 1,
  }
});
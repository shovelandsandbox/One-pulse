/* eslint-disable react-native/no-color-literals */
import { StyleSheet, Platform } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";
import theme from "../../../../../themes/default";

const fontFamily = Platform.OS === "ios" ? "Avenir" : "pru-regular";

export default StyleSheet.create({
  addressHeader: {
    color: "#515B61",
    fontFamily,
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  addressListContainerStyle: {
    backgroundColor: colors.white,
    borderColor: colors.grey63,
    borderWidth: 0.5,
    position: "absolute",
    top: 80,
    width: "100%",
    zIndex: Platform.OS === "ios" ? 2 : 1,
  },
  addressListItemStyle: {
    borderColor: colors.grey63,
    borderWidth: 0.5,
  },
  addressListMainTextStyle: { color: colors.black, fontSize: 18 },
  addressListTextStyle: {
    fontSize: 16,
  },
  clearIcon: {
    backgroundColor: theme.Colors.greyC7c7c7,
    borderColor: theme.Colors.greyC7c7c7,
    borderRadius: 10,
    borderWidth: 1,
    height: 20,
    width: 20,
  },
  clearIconContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: theme.Colors.greyd9dcde,
    borderRightWidth: 1,
    borderTopWidth: 1,
    flex: 1,
    height: 40,
    justifyContent: "center",
    width: 30,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  inputBox: {
    flex: 1,
    flexDirection: "row",
    minHeight: 30,
    borderRadius: 5,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    marginLeft: 4,
    backgroundColor: "white",
    borderColor: colors.lightGrey,
  },
  inputBoxContainer: {
    backgroundColor: colors.lightGrey,
    borderRadius: 5,
    flexDirection: "row",
    paddingBottom: 2,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 2,
  },
  searchBox: {
    backgroundColor: colors.white,
    height: 40,
    marginBottom: 10,
    marginLeft: 5,
  },
  searchIcon: {
    borderBottomWidth: 1,
    borderColor: theme.Colors.greyd9dcde,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    flex: 1,
    height: 40,
    justifyContent: "center",
    paddingLeft: 6,
  },
  searchInput: {
    backgroundColor: colors.white,
    color: "#5b6770",
  },
});

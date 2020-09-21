/* eslint-disable */
import { StyleSheet, Platform } from "react-native";

import { colors } from "@pru-rt-internal/pulse-common";
import { View } from "./NewAboutus";
import React from "react";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    alignItems: "center",
    marginBottom: 15
  },
  flexStyle: {
    flex: 1,
  },
  headingBox: {
    flex: 1,
    alignItems: "center",
  },
  containers: {
    backgroundColor: colors.white,
    flex: 1,
    // padding: 10,
    alignItems: "center",
  },
  contentViewItems: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 24,
    paddingTop: 24
  },
  fixedIcon: {
    alignItems: "flex-end",
    alignSelf: "flex-end",
    bottom: 20,
    justifyContent: "flex-end",
    position: "absolute",
    right: 20
  },
  heading: {
    color: "#515B61",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 16,
    lineHeight: 25,
    paddingBottom: 17
  },
  TCheading: {
    color: "#515B61",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 30,
    paddingBottom: 5
  },
  heading: {
    color: "#515B61",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 16,
    paddingBottom: 17
  },
  TCDescription: {
    color: "#222529",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 14,
    paddingBottom: 17,

  },
  headingR: {
    // color: "#515B61",
    // fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    // fontSize: 16,
    // lineHeight: 25,
    // paddingBottom: 17
  },
  bottomText: {
    color: "#515B61",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 12,
    marginBottom: 8,
  },
  horizontalLine: {
    borderBottomColor: colors.grey91,
    borderBottomWidth: 3
  },
  screenTitle: {
    color: colors.nevada,
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 21.7,
    lineHeight: 25,
    marginVertical: 16.7,
    textAlign: "center"
  },
  scroll: {
    flex: 0.9
  },
  text: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 15.3,
    lineHeight: 18.3
  }
});

export default styles;

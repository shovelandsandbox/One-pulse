import React, { Component } from "react";
import { StyleSheet, Dimensions, Platform } from "react-native";
import { Colors, Sizes } from "../../../configs";

const Styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  pdfContainer: {
    flex: 1,
    backgroundColor: "#EE172A"
  },
  pdfHeaderContainer: {
    width: "100%",
    height: 48,
    backgroundColor: "#fff",
    flexDirection: "row",
    elevation: 5,
    shadowColor: Colors.main.baseBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerLeftView: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerBody: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  headerRightContainer: {
    flex: 0.1,
    paddingRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { fontSize: 14, color: "black", fontWeight: 'bold' },
  headerRightImg: { width: 30, height: 30 },
  headerLeftImg: { width: 20, height: 20 },
  cntainerStyleToast: {
    backgroundColor: Platform.select({
      ios: '#EE172A',
      android: 'black'
    }),
    top: Platform.select({
      ios: 42,
      android: undefined
    })
  }
});
export default Styles;

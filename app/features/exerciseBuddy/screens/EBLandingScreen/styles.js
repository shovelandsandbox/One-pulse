import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

import colors from "../../utils/colors";

export const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "flex-end",
    borderRadius: 16.7,
    width: 130.7,
    paddingLeft: 2,
    paddingRight: 2,
  },
  buttonTextStyling: { 
    marginHorizontal: 6, 
    marginVertical: 0, 
    lineHeight: 20, 
  },
  container: {
    height,
    width,
  },
  flatList: {
    paddingBottom: 40,
  },
  groupSelectedLine: {
    borderRadius: 6.7,
    height: 3.3,
    marginTop: 2.5,
    width: "70%",
  },
  headerContainer: {
    backgroundColor: colors.baseBackground,
    elevation: 5,
    marginBottom: 8.7,
    paddingHorizontal: 16.7,
    paddingTop: 16.7,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerTitle: {
    color: colors.pickerItem,
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16.7,
  },
  imageHeader: { height: "100%", overflow: "hidden", width: "100%" },
  imageHeaderContainer: {
    borderRadius: 6.7,
    height: height*0.25,
    overflow: "hidden",
    width: width*0.91,
  },
  justifyCenter: { 
    justifyContent: "center" ,
  },
  levelBoxActiveAdvanced: {
    backgroundColor: colors.advanced,
    borderColor: colors.advanced,
    borderWidth: 1,
    height: 5,
    width: 16.7,
  },
  levelBoxActiveBeginnerFilled: {
    backgroundColor: colors.beginner,
    borderColor: colors.beginner,
    borderWidth: 1,
    height: 5,
    width: 16.7,
  },
  levelBoxActiveBeginnerOutline: {
    borderColor: colors.beginner,
    borderWidth: 1,
    height: 5,
    width: 16.7,
  },
  levelBoxActiveInterFilled: {
    backgroundColor: colors.intermediate,
    borderColor: colors.intermediate,
    borderWidth: 1,
    height: 5,
    width: 16.7,
  },
  levelBoxActiveInterOutline: {
    borderColor: colors.intermediate,
    borderWidth: 1,
    height: 5,
    width: 16.7,
  },
  levelBoxFilled: {
    backgroundColor: colors.inActive,
    borderColor: colors.inActive,
    borderWidth: 1,
    height: 5,
    width: 16.7,
  },
  levelBoxOutline: {
    borderColor: colors.inActive,
    borderWidth: 1,
    height: 5,
    width: 16.7,
  },
  levelHeading: {
    fontFamily: "Avenir-Roman",
    lineHeight: 15,
    marginBottom: 2,
  },
  pageClose: {
    color: colors.white,
    fontSize: 10.7,
    lineHeight: 16.7,
    marginBottom: 16.7,
    fontWeight: "400",
  },
  pageTitle: {
    color: colors.white,
    fontFamily: "Avenir-Heavy",
    fontSize: 12.7,
    fontWeight: "bold",
    lineHeight: 22.7,
    marginBottom: 11,
  },
  planDescription: {
    color: colors.planDescription,
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 16.7,
  },
  rightText: {
    color: colors.red,
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    lineHeight: 25,
  },
  toggleButtonArea: {
    paddingTop: 6,
    width: "33.33%",
  },
  toggleButtonStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 11,
  },
});

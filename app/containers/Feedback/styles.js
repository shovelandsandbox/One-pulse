import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors, CoreConfig } from "@pru-rt-internal/pulse-common";
const { iosDevice } = CoreConfig;

const window = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    // backgroundColor: '#f8a',
    flex: 1,
    paddingTop: 8,
    paddingBottom: 34,
    borderBottomWidth: 0.2,
    shadowColor: "#e2e2e2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  textStyle: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    textAlign: "left",
    fontSize: 13.3,
    lineHeight: 18.3
  },
  category: {
    height: 44.7,
    color: colors.nevada
  },
  leftSpacing: {
    marginBottom: 40,
    paddingHorizontal: 28,
    paddingVertical: 26,
  },
  feedbackRequiredErrorText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    fontFamily: "Avenir",
    color: "#E87722",
    marginTop: 3,
    marginLeft: 30
  },
  headerLayout: {
    borderBottomWidth: 0.2,
    shadowColor: "#e2e2e2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    backgroundColor: "#fff"
  },
  ratingLayout: {
    marginTop: 4,
    paddingHorizontal: 25,
    paddingVertical: 9,
    backgroundColor: '#fff'
  },
  inputLayout: {
    marginTop: 4,
    paddingHorizontal: 28,
    paddingVertical: 26,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderRadius: 6.7,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderWidth: 0.3,
    borderColor: "#d6d6d6"
  },
  buttonLayout: {
    marginTop: 4,
    paddingHorizontal: 28,
    paddingVertical: 26
  },
  buttonTouch: { 
    width: '100%',
    height: 44,
    borderRadius: 6.7,
    backgroundColor: "#ed1b2e",
    flex: 1,
    justifyContent: 'space-around',
    alignSelf: 'center'
  },
  buttonTextNew: { 
    fontSize: 12, 
    color: "#ffffff",
    textAlign: "center"
  }
});

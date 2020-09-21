import { StyleSheet, Platform } from "react-native";
import { Theme } from "../../themes";
const { Colors, Fonts } = Theme;

export default StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    flex: 1
  },
  DTImage: {
    flex: 1,
    height: 90,
    width: 90
  },
  DTText: {
    marginTop: 5,
    fontSize: 15,
    fontFamily: Fonts.fontFamilyRegular,
    lineHeight: 17,
    textAlign: "center"
  },
  activeSegment: {
    backgroundColor: Colors.nevada,
    marginHorizontal: 5,
    padding: 5
  },
  activeSegmentText: {
    color: Colors.white,
    textAlign: "center"
  },
  inactiveSegment: {
    backgroundColor: Colors.white,
    marginHorizontal: 5,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderWidth: 0.5,
    borderColor: Colors.warmGray
  },
  inactiveSegmentText: {
    color: Colors.nevada,
    textAlign: "center"
  },
  container: {
    backgroundColor: Colors.white,
    alignItems: "center",
    height: 250,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.nevada,
    padding: 10
  },
  selectedType: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.pulseRed,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 10
  },
  segment: {
    marginBottom: 20
  },
  nosegment: {
    marginBottom: 20
  },
  unselectedType: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.nevada,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 10
  },
  footer: {
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  footerAction: {
    marginHorizontal: 10,
    justifyContent: "flex-end"
  },
  selectLayerMargin: {
    marginVertical: 30
  }
});

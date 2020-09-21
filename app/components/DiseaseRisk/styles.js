import { StyleSheet } from "react-native";
import { Theme } from "../../themes";
const { Colors, Fonts } = Theme;

export default StyleSheet.create({
  title: {
    fontFamily: Fonts.fontFamilyBold,
    fontSize: 11.3,
    color: Colors.nevada,
    lineHeight: 13
  },
  timestamp: {
    fontFamily: Fonts.fontFamilyRegular,
    fontSize: 10,
    color: Colors.nevada,
    lineHeight: 11.3,
    marginVertical: 8,
    flex: 0.5
  },
  riskText: {
    marginTop: 5,
    fontFamily: Fonts.fontFamilyBold,
    color: Colors.pulseDarkGrey,
    fontSize: 13.3,
    lineHeight: 15.6
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  horizontalLine: {
    borderBottomWidth: 1,
    marginTop: 17.2,
    borderBottomColor: Colors.silver
  },
  diseaseTitleIcon: {
    width: 6.6,
    height: 9.8
  },
  mg_tp27: {
    marginTop: 27.5
  },
  viewmore: {
    color: Colors.darkGrey,
    fontSize: 13.3,
    lineHeight: 15.6,
    fontFamily: Fonts.fontFamilyRegular
  }
});

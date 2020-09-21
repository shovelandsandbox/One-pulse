import { StyleSheet } from "react-native";
import { Theme } from "../../../../themes";
const { Colors, Fonts } = Theme;

export default StyleSheet.create({
  pulseContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  headerLayout: {
    color: Colors.grey343A40,
    fontFamily: Fonts.AvenirRoman,
    fontSize: 14,
    shadowColor: Colors.grey747474,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  generateLinkLayout: {
    padding: 30
  },
  paymentLinkTitleContainer: {
    alignItems: "center"
  },
  titleText: {
    color: Colors.grey343A40,
    fontFamily: Fonts.AvenirRoman,
    fontSize: 18,
  },
  headerContainer: {
    width: "100%",
    height: 52,
    alignItems: "center",
    paddingLeft: 11,
    paddingRight: 11,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  customStyles: {
    backgroundColor: "rgba(52, 52, 52, 0)"
  },
  requestPaymentButton: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ED1B2E",
    borderRadius: 22,
    height: 44,
    justifyContent: "center",
    width: 200
  }
});

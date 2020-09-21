import { StyleSheet } from "react-native";
import { Theme } from "../../../../themes";
import { scale } from "../../../../utils/Scale";
const { Colors, Fonts } = Theme;

export default StyleSheet.create({
  amountRow: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
  },
  cancel: {
    color: "#ec1c2e",
    fontSize: 14,
  },
  cancelContainer: {
    marginRight: 40,
  },
  currencyWrapper: {
    borderColor: "#cccccc",
    borderRadius: 8,
    borderWidth: 0.6,
    flex: 0.8,
    marginRight: 20,
    marginTop: 15,
    overflow: "hidden",
    paddingHorizontal: 10,
  },
  customStyles: {
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  error: {
    fontSize: 11,
    color: "#ec1c2e",
    marginTop: 4,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 30,
  },
  generateLinkLayout: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: 52,
    justifyContent: "space-between",
    paddingLeft: 11,
    paddingRight: 11,
    width: "100%",
  },
  headerLayout: {
    color: Colors.grey343A40,
    fontFamily: Fonts.AvenirRoman,
    fontSize: 14,
    shadowColor: Colors.grey747474,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  paymentLinkTitleContainer: {
    alignItems: "center",
  },
  pulseContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  requestPaymentButton: {
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 30,
    height: 46,
    justifyContent: "center",
    width: scale(140),
  },
  sectionLabel: {
    color: "#707070",
    fontSize: 14,
    marginTop: 20,
  },
  textInput: { margin: 0, padding: 10 },
  textInputWrapper: {
    borderColor: "#cccccc",
    borderRadius: 8,
    borderWidth: 0.6,
    marginTop: 15,
    overflow: "hidden",
  },
  titleText: {
    color: "#4a5464",
    fontFamily: Fonts.AvenirRoman,
    fontSize: 18,
  },
});

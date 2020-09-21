import { StyleSheet, I18nManager } from "react-native";
import { Colors } from "../../configs";

export default StyleSheet.create({
  defaultTextFieldStyle: {
    borderColor: Colors.main.borderGray,
    borderRadius: 3,
    borderWidth: 1,
    color: Colors.main.baseBlack,
    height: 42,
    marginLeft: 3,
    textAlign: "center",
    width: 42,
  },
  otpContainer: {
    height: "100%",
    width: "100%",
  },
  otpFieldsModal: {
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    height: "100%",
    justifyContent: "space-between",
    width: "100%",
  },
});

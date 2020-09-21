import { StyleSheet, Platform, Dimensions } from "react-native";
import { CoreConfig } from "@pru-rt-internal/pulse-common";
const { colors } = CoreConfig;
const window = Dimensions.get("window");
const regular = Platform.OS === "ios" ? "PruSansNormal" : "pru-regular";
const bold = Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold";
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.white
  },
  modalStyle: {
    backgroundColor: colors.white,
    alignItems: "flex-start",
    height: window.height * 0.4,
    width: window.width * 0.85,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.nevada,
    padding: 10
  },
  modalButtonContainer: {
    flexDirection: "row"
    // paddingLeft: 10,
  },
  modalLabel: {
    fontSize: 15,
    lineHeight: 17,
    padding: 20,
    paddingLeft: 27,
    paddingRight: 30,
    letterSpacing: 0.5
  },
  modalButton: {
    padding: 8,
    paddingTop: 15,
    paddingLeft: 0,
    paddingBottom: 15,
    flexDirection: "row"
  },
  modalButtonLabel: {
    fontSize: 13.3,
    lineHeight: 16.7,
    paddingLeft: 10,
    letterSpacing: 0.5,
    flexWrap: "wrap"
  },
  modalFooterBtnContainer: {
    flex: 1,
    padding: 15,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  modalFooterBtn: {
    flex: 0.5
  },
  symptomsModalFooterBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalFooterLabel: {
    fontSize: 13.3,
    lineHeight: 15.3
  },
  symptomsTextInput: {
    color: colors.nevada,
    fontSize: 15.3,
    lineHeight: 18.3,
    textAlignVertical: "top",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    marginBottom: 4,
    borderWidth: 1,
    borderColor: colors.nevada,
    borderRadius: 3,
    height: 130,
    flex: 1
  }
});

/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 35,
    marginVertical: 10,
    alignItems: "center",
  },
  sendButton: {
    height: 27,
    marginLeft: 10,
    width: 27,
  },

  textInput: {
    backgroundColor: "#ffffff",
    borderColor: "#707070",
    borderRadius: 16,
    borderWidth: 0.3,
    color: "#393e46",
    flex: 1,
    fontFamily: "Avenir-Regular",
    fontSize: 12,
    height: "100%",
    paddingHorizontal: 20,
    lineHeight: getLineHeight(12),
  },
});

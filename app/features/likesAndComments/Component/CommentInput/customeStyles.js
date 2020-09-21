/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";

export default StyleSheet.create({
  cardViewStyle: {
    backgroundColor: "#ffffff",
    elevation: 5,
    height: 60,
    margin: 8,
    minWidth: 200,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    height: 40,
    alignItems: "center",
  },
  sendButton: {
    height: 27,
    marginLeft: 10,
    width: 27,
  },
  sendButtonContainer: {
    elevation: 5,
    padding: 5,
    position: "absolute",
    right: 0,
    zIndex: 99,
  },
  textInput: {
    backgroundColor: "#FFFF",
    color: "#393e46",
    elevation: 3,
    flex: 1,
    fontFamily: "Avenir-Regular",
    fontSize: 12,
    height: "100%",
    paddingLeft: 20,
    paddingRight: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    lineHeight: getLineHeight(12),
    shadowOpacity: 0.5,
    shadowRadius: 2.22,
    borderColor: "#707070",
    borderRadius: 16,
    borderWidth: 0.3,
  },
});

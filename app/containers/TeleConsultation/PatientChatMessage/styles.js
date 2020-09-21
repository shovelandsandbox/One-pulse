import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";

const window = Dimensions.get("window");

// CHATBOT MESSAGE STYLE
const styles = StyleSheet.create({
  labelStyle: {
    color: colors.white,
    fontFamily: Platform.OS === "ios" ? "Avenir" : "pru-regular",
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "500",
  },
  textInput: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
    lineHeight: 15,
  },
  undoButtonStyle: {
    justifyContent: "center",
    marginRight: 10,
  },
  userMessage: {
    backgroundColor: "#ED1B2E",
    lineHeight: 20,
    paddingTop: 9,
    paddingBottom: 9,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderBottomRightRadius: 5,
    maxWidth: window.width - 120
  },
  userMessageContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 7.5,
    flex: 1,
  },
  userProfileImage: {
    height: 42,
    marginLeft: 5,
    width: 42,
    borderRadius: 21
  }
});

export default styles;

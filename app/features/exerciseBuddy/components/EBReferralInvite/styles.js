import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";

export default StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "center",
  },
  headerStyle: {
    color: "#393939",
    fontFamily: "Avenir-Black",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 15,
    marginTop: 50,
  },
  imageStyle: {
    alignSelf: "center",
    height: 159,
    width: 246,
  },
  inviteModeContainerStyle: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 20,
  },
  messageStyle: {
    color: "#666666",
    fontFamily: "Avenir-Roman",
    fontSize: 14,
    marginLeft: 15,
    marginTop: 12,
    width: 294,
  },
  modeStyle: {
    flex: 1,
    justifyContent: "space-between",
  },
  textStyle: {
    color: "#6f6f6f",
    fontFamily: "Avenir-Roman",
    fontSize: 12,
  },
  tileContainer: {
    alignItems: "center",
  },
});

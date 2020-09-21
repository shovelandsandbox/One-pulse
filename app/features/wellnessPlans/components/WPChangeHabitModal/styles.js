import { StyleSheet, Dimensions } from "react-native";
const ModalWidth = Dimensions.get("window").width * 0.85;
export default StyleSheet.create({
  badgeImage: { height: 9.5, top: 3, width: 9.5 },
  container: {
    alignItems: "center",
    backgroundColor: "#000000",

    // flex: 1,
    justifyContent: "center",
    height: 260.7,
    width: "100%",
  },
  imageContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: "auto",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  imageStyle: {
    borderRadius: 10,
    height: 84,
    width: 110,
  },
  imageText: {
    color: "#000000",
    fontSize: 12,
    top: 6.7,
    width: 110,
  },
  subContainer: {
    backgroundColor: "#000000",
    borderRadius: 3.3,
    height: "auto",
    padding: 16,
    width: ModalWidth,
  },
});

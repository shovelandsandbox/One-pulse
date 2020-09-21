import { StyleSheet, Dimensions } from "react-native";
const ModalWidth = Dimensions.get("window").width * 0.85;
export default StyleSheet.create({
  badgeContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  badgeImage: { height: 34.6, width: 34.6 },
  badgeText: {
    color: "#e84c5a",
    fontSize: 11.3,
    left: 4,
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  container1: {
    height: "auto",
    width: "100%",
  },
  imageContainer: { flexDirection: "row", height: "auto" },
  imageStyle: {
    borderRadius: 30,
    height: 78,
    position: "relative",
    width: 91.7,
  },
  imageText: {
    color: "#393939",
    fontSize: 12,
    top: 6.7,
  },
  letsgoButton: {
    alignItems: "center",
    backgroundColor: "#e84c5a",
    borderColor: "#e84c5a",
    borderRadius: 3.3,
    borderWidth: 1,
    elevation: 4,
    height: 31.3,
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    width: 248.7,
  },
  letsgoButtonContainer: {
    justifyContent: "flex-end",
    marginTop: 43.7,
  },
  noButton: {
    alignItems: "center",
    borderRadius: 3.3,
    height: 31.3,
    justifyContent: "center",
    width: 99.7,
  },
  subContainer: {
    backgroundColor: "#000000",
    borderRadius: 10,
    height: "auto",
    padding: 16,
    width: ModalWidth,
  },
});

import { StyleSheet, Dimensions } from "react-native";
const ModalWidth = Dimensions.get("window").width * 0.85;

export default StyleSheet.create({
  badgeImage: { height: 9.5, top: 3, width: 9.5 },
  container: {
    alignItems: "center",
    backgroundColor: "#FFFF",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center"
  },
  imageContainer: { flexDirection: "row", height: "auto" },
  imageStyle: {
    borderRadius: 3.3,
    height: 92.7,
    position: "relative",
    width: 100
  },
  imageText: {
    color: "#ffffff",
    fontSize: 12,
    top: 4.7
  },
  yesButton: {
    alignItems: "center",
    backgroundColor: "#ec1c2e",
    borderColor: "#ec1c2e",
    borderRadius: 15.3,
    borderWidth: 1,
    elevation: 4,
    height: 31.3,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    width: 99.7
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    top: 7
  },
  noButton: {
    alignItems: "center",
    borderRadius: 3.3,
    height: 31.3,
    justifyContent: "center",
    width: 99.7
  },
  subContainer: {
    backgroundColor: "#000000",
    borderRadius: 3.3,
    height: "auto",
    padding: 16,
    width: ModalWidth,
    height: 180,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: { fontSize: 14, color: "#ffffff", lineHeight: 16.3 },
  descriptionContainer: { flexDirection: "row", padding: 3, bottom: 3 },
  descriptionText: { color: "#ffffff", fontSize: 10.7 },
  badgeContainer: { paddingLeft: 3 },
  badgeCountContainer: { paddingLeft: 3 },
  badgeCountText: {
    color: "#ec1c2e",
    fontSize: 10.7,
    fontWeight: "bold",
    width : 20
    
  },
  imageSubContainer: { flex: 0.8 },
  redeemTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  redeemText: {
    color: "#292929",
    fontSize: 10.7,
    lineHeight: 16.7,
    bottom: 10
  },
  noText: { color: "#ec1c2e" },
  yesText: { color: "#FFFF" }
});

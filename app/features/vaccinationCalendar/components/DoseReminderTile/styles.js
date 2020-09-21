import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#eb1b2e",
    borderColor: "#6e6e6e",
    borderWidth: 0.3,
    flexDirection: "row",
    height: 65,
    justifyContent: "center",
    width: 70,
  },
  contentView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  dateText: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
    transform: [{ rotate: "90deg" }],
    width: 100,
  },
  dateView: {
    alignItems: "center",
    backgroundColor: "#000000",
    height: "100%",
    justifyContent: "center",
    width: 15,
  },
  descriptionText: {
    color: "#212529",
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    lineHeight: 20,
    fontWeight :"normal",
  },
  imageView: {
    flexDirection: "row",
    fontWeight: "normal",
    justifyContent: "space-around",
    marginTop: 5,
    paddingHorizontal: 5,
    width: "100%",
  },
  numberText: {
    color: "#212529",
    fontFamily: "Avenir-Heavy",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 20,
  },
  tickImage: {
    height: 15,
    width: 15,
  },
  whiteContainer: {
    backgroundColor: "#fff",
  },
  greyDateView :{
    backgroundColor: "#c9c9c9",
  },
  blackDateText: {
    color: "#000000",
  },
  whiteDoseText: {
    color: "#ffffff",
  },
});

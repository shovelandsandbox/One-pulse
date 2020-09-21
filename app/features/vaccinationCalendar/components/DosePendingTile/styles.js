import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    borderColor: "#6e6e6e",
    borderWidth: 0.3,
    backgroundColor: "#f5f6fa",
    height: 65,
    justifyContent: "center",
    width: 70,
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
    justifyContent: "space-around",
    marginTop: 5,
    paddingHorizontal: 10,
    width: "100%",
    fontWeight: "normal",
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
});

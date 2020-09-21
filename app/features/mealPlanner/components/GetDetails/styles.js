import { StyleSheet } from "react-native";

export default StyleSheet.create({
  buttonSelectedText: {
    color: "white",
    fontSize: 13,
    lineHeight: 24,
  },
  buttonSelectedView: {
    alignItems: "center",
    backgroundColor: "#f1172b",
    borderColor: "#f1172b",
    borderRadius: 50,
    borderWidth: 1,
    height: 42,
    justifyContent: "center",
    width: 182,
  },
  contentView: {
    position: "absolute",
    top: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
  },
  buttonText: {
    color: "#515b61",
    fontSize: 13,
    lineHeight: 24,
  },
  buttonView: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#b2b2b2",
    borderRadius: 50,
    borderWidth: 1,
    height: 42,
    justifyContent: "center",
    width: 182,
  },
  checkBox: {
    height: 21,
    marginRight: 28,
    position: "absolute",
    right: 20,
    width: 22,
  },
  container: {
    backgroundColor: "white",
    flex: 1, 
  },
  descText: {
    color: "#202022",
    fontSize: 13,
    lineHeight: 18,
  },
  descriptionContainer: {
    marginRight: 14,
    width: "100%",
  },
  imageStyle: {
    resizeMode: "cover",
  },
  itemContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    paddingLeft: 10,
    width: "100%",
  },
  itemImage: {
    borderRadius: 10,
    height: 48,
    width: 48,
  },
  tileText: {
    color: "#2f2f2f",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 21,
  },
  titleContainer: {
    marginLeft: 10,
  },
});

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  buttonSelectedView: {
    backgroundColor: "#f1172b",
    borderColor: "#f1172b",
    borderRadius: 50,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    height: 55,
    width: "90%",
    marginLeft: 10,
  },
  buttonText: {
    color: "#515b61",
    fontSize: 13,
    lineHeight: 24,
  },
  buttonView: {
    backgroundColor: "white",
    borderColor: "#b2b2b2",
    borderRadius: 50,
    borderWidth: 1,
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    height: 55,
    width: "90%",
    marginLeft: 10,
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
    marginBottom: 50,
  },
  contentView: {
    alignItems: "center",
    justifyContent: "center",
  },
  descText: {
    color: "#202022",
    fontSize: 13,
    lineHeight: 18,
  },
  descriptionContainer: {
    width: "100%",
  },
  imageStyle: {
    resizeMode: "cover",
  },
  itemContainer: {
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
    width: "100%",
  },
  itemImage: {
    borderRadius: 10,
    height: 48,
    marginLeft: 25,
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

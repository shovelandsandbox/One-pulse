import { StyleSheet } from "react-native";

export default StyleSheet.create({
  Image: {
    height: 15,
    width: 20,
  },
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 10,
  },
  flatListView: {
    flex: 1,
    marginRight: 30,
  },
  separator: {
    width: 5,
  },
  videoIconView: {
    backgroundColor:"red",
    borderRadius : 5,
    height: 27,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  videoIconGrey :{
    alignItems: "center",
    backgroundColor:"grey",
    borderRadius : 5,
    height: 27,
    justifyContent: "center",
    marginHorizontal: 10,
    width: 35,
  }
});

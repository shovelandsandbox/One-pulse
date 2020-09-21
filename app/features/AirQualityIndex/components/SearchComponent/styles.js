import { StyleSheet, Platform } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const fontFamily = Platform.OS === "ios" ? "Avenir" : "pru-regular";

export const styles = StyleSheet.create({
  containerStyle: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: Colors.white,
    borderRadius: 6,
    elevation: 5,
    height: 45,
  },
  viewStyle: {
    width: "87%",
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    flexDirection: "row",
  },
  autoComplete: { width: "100%" },
  inputContainerStyle: {
    position: 'relative',
    width: '100%',
    backgroundColor: 'transparent',
    height: 45,
    paddingLeft: 10,
    fontSize: 16
  },
  autoCompleteContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 45,
    position: 'relative',
    elevation: 10
  },
  listStyle: {
    width: '100%',
    backgroundColor: Colors.offwhite,
    maxHeight: 300,
    position: 'absolute',
    left: -10,
    elevation: 5
  },
  titleView: {
    width: '100%',
    backgroundColor: Colors.offwhite,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 12
  },
  titleText: {
    fontFamily: "Avenir",
    color: Colors.grey393939,
    fontSize: 16
  },
  searchViewStyle: {
    position: 'absolute',
    right: 50,
    top: '30%',
    zIndex: 2
  },
  searchImageStyle: {
    width: 18,
    height: 18
  },
  searchArrowView: {
    width: "13%"
  },
  searchArrowImage: {
    height: 45,
    width: "100%"
  },

  addressHeader: {
    color: "#515B61",
    fontFamily,
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  leftStyle: {
    flex: 0.12
  },
  textInputStyle: {
    borderColor: Colors.greyd9dcde,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  addressListContainerStyle: {
    backgroundColor: Colors.whiteSmoke,

    position: "absolute",
    top: 70,
    width: "97%",
    zIndex: Platform.OS === "ios" ? 2 : 1,
    marginLeft: 10,
    marginRight: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  addressListItemStyle: {

    padding: 10,
    borderColor: Colors.dimGray717171,
    borderBottomWidth: 0.5,
  },
  addressListMainTextStyle: { color: Colors.black, fontSize: 18 },
  addressListTextStyle: {
    fontSize: 14,
    lineHeight: 16.7,
    color: Colors.color4a4a4a
  },
  clearIcon: {
    backgroundColor: Colors.greyC7c7c7,
    borderColor: Colors.greyC7c7c7,
    borderRadius: 10,
    borderWidth: 1,
    height: 20,
    width: 20,
  },
  clearIconContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.greyd9dcde,
    borderRightWidth: 1,
    borderTopWidth: 1,
    height: 40,
    justifyContent: "center",
    width: 20,
    paddingRight: 10
  },
  container: {
    flex: 0.1,
    padding: 10,
  },
  inputBox: {
    flex: 1,
    flexDirection: "row",
    minHeight: 30,
    borderRadius: 5,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    marginLeft: 4,
    backgroundColor: "white",
    borderColor: Colors.lightGrey,
  },
  inputBoxContainer: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 5,
    flexDirection: "row",
    paddingBottom: 2,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 2,
  },
  searchBox: {
    backgroundColor: Colors.white,
    height: 40,
    marginBottom: 10,
    marginLeft: 5,
  },
  searchIcon: {
    borderBottomWidth: 1,
    borderColor: Colors.greyd9dcde,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    flex: 1,
    height: 40,
    justifyContent: "center",
    paddingLeft: 6,
  },
  searchInput: {
    backgroundColor: Colors.white,
    color: "#5b6770",
  },


})
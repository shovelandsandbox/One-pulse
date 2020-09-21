import { StyleSheet, Platform, Dimensions } from "react-native";
const window = Dimensions.get("window");
const width = window.width;
import { Theme } from "../../../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  actionBarStyle: {
    flexDirection: "row",
    height: 54,
    backgroundColor: Colors.white,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: 5
  },
  viewCon: {
    backgroundColor: Colors.white
  },
 
  searchBarStyle: {
    flexDirection: "row",
    height: 54,
    backgroundColor: Colors.white,
    alignItems: "center",
    paddingBottom: 14,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: 5,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 20,
    paddingTop: 15
  },
  backImageStyle: {
    width: 20,
    height: 15
  },
  actionBarRightContainerStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 120
  },
  haloDocImageContainerStyle: {
    width: 76,
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  haloDocImageStyle: {
    width: 60,
    height: 30
  },
  cardViewStyle: {
    margin: 10
  },
  searchIconStyle: {
    height: 21,
    width: 21
  },

  closeIconStyle: {
    height: 29,
    width: 29
  },

  recentSearchesRowStyle: {
    borderBottomColor: Colors.pattensBlueRGB,
    borderBottomWidth: 1,
    paddingVertical: 15
  },

  recentSearchContainer: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: Colors.white
    // position: 'absolute',
    // top: 50,
    // zIndex: 10,
    // marginTop: 10,
  },

  recentTextStyle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.silverRGB
  },

  recentItemTextStyle: {
    fontSize: 18,
    fontWeight: "400",
    color: Colors.Fiord
  },

  gridViewStyle: {
    marginTop: 20,
    flex: 1
  },

  searchResultTextStyle: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    color: Colors.black
  },

  searchTextStyle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.silverRGB,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: -10
  },

  searchDoctorTextStyle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.silverRGB,
    marginHorizontal: 15,
    marginVertical: 10,
  },

  searchvalue: {
    color: Colors.Mischka,
    fontSize: 16
  },

  cardViewStyle2: {
    marginHorizontal: -10,
    marginTop: -15,
    zIndex: -1
  },

  textStyleView: {
    color: Colors.Fiord,
    textTransform: "capitalize",
  },
  flexView: {
    flex: 1
  }

});

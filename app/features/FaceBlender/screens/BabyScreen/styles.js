import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const screenWidth = Dimensions.get('window').width

export const BabyScreenStyles = StyleSheet.create({
  safeViewTop: {
    backgroundColor: Colors.alizarin,
    flex: 0,
  },

  safeViewBottom: {
    backgroundColor: Colors.white,
    flex: 1,
  },

  mainView: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },

  title: {
    color: Colors.charcoal,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Avenir",
    marginBottom: 20
  },

  subTitle: {
    fontSize: 15,
    color: Colors.grey676767,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },

  selectSkin: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginVertical: 20
  },

  skinIconBox: {
    borderColor: Colors.white,
    borderWidth: 2,
    borderRadius: 8,
    width: screenWidth / 5,
    height: screenWidth / 5,
    alignItems: "center",
    justifyContent: "center",
  },

  skinicon: {
    width: screenWidth / 5,
    height: screenWidth / 5,
    borderRadius: 8,
    borderWidth: 2
  },

  selectGender: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20
  },

  genderIconBox: {
    borderColor: Colors.greydddddd,
    borderWidth: 2,
    borderRadius: 8,
    width: screenWidth / 5,
    height: screenWidth / 5,
    alignItems: "center",
    justifyContent: "center",
  },

  gendericon: {
    width: 40,
    height: 40,
  },

  SelectedGender: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },

  dropdown: {
    flexDirection: "row",
    borderBottomColor: Colors.greydddddd,
    borderBottomWidth: 1,
    alignItems: "center",
    paddingVertical: 5
  },

  ageInput: {
    padding: 0,
    height: 20,
    flex: 1,
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "Avenir",
    color: Colors.grey676767
  },

  arrowicon: {
    width: 16,
    height: 8,
    marginRight: 25
  },

  msgFont: {
    color: Colors.pulseDarkGrey,
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Avenir",
    paddingTop: 15,
    paddingBottom: 10
  },

  msgTxt: {
    color: Colors.pulseDarkGrey,
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Avenir",
    paddingTop: 15,
    paddingBottom: 10
  },

  btnView: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 30
  },

  btnBgActive: {
    backgroundColor: Colors.alizarin,
    borderRadius: 50,
    width: screenWidth / 2.5,
    paddingVertical: 10,
    alignItems: "center",
    alignSelf: "center",
  },

  btnBgInactive: {
    backgroundColor: Colors.veryLightGrey,
    borderRadius: 50,
    width: screenWidth / 2.5,
    paddingVertical: 10,
    alignItems: "center",
    alignSelf: "center",
  },

  btntexts: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Avenir",
    lineHeight: 20
  },

  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.modalBackground
  },

  fontModalBg: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.charcoalOpacity,
  },

  fontModalView: {
    padding: 10,
    backgroundColor: Colors.offwhite,
    marginHorizontal: 20,
    borderRadius: 10
  },

  fontModalOptionView: {
    marginVertical: 7.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  fontModalOptionText: {
    color: Colors.dodgerBlue,
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "Avenir"
  },

  fontModalOptionDivider: {
    width: "100%",
    height: 0.5,
    backgroundColor: Colors.greyb5b5b5
  },


});

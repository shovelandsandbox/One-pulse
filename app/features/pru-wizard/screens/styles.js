import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mainContainer:{
    height:"100%",
    width:"100%",
    backgroundColor: "#fff"
  },
  container: {
    paddingBottom: 16.7,
    paddingHorizontal: 16.7,
    flex:1,
    backgroundColor: "#fff"
  },
  block: {
    height: "auto",
    borderRadius: 10,
    borderWidth: 0.3,
    marginTop: 16.7,
  },
  congratsBlockBorder: {
    borderColor: "#ee1a30",
  },
  blockHeader: {
    paddingVertical: 8,
    alignContent: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  congratsBlockHeader: {
    backgroundColor: "#ee1a30",
  },
  detailsBlockHeader: {
    backgroundColor: "#d5d5d5",
  },
  congratsBlockHeaderText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  detailsBlockHeaderText: {
    color: "#5b6770",
    fontWeight: "bold",
  },
  congratsBlockBody: {
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  textCenter: {
    textAlign: "center",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  pointer: {
    marginTop: 10,
  },
  pointerTick: { 
    height: 16.6, 
    width: 16.6,
    marginTop: 5,
  },
  detailsBlockBorder: {
    borderColor: "#cccccc",
  },
  detailFontStyle: {
    fontSize: 12,
    lineHeight: 22,
  },
  detailKeyStyle: {
    color: "#aeaeae",
    width: "30%",
  },
  detailValStyle: {
    color: "#4a4a4a",
    marginLeft: 18,
    width: "70%",
  },
  selectedView: {
    backgroundColor: "#ec1c2e",
    borderColor: "#ec1c2e",
    borderWidth: 0.3,
    height: 14,
    width: 14,
    marginTop: 12,
  },
  unSelectedView: {
    borderColor: "#ec1c2e",
    borderWidth: 0.3,
    height: 14,
    width: 14,
    marginTop: 12,
  },
  consentTermsContainer: {
    marginLeft: 20,
  },
  consentTerms: {
    color: "#5b6770",
    fontSize: 11,
    lineHeight: 20,
    textAlign: "left",
  },
  consentBlock: {
    marginTop: 27,
  },
  laterText: { 
    fontSize: 11, 
    lineHeight: 20, 
    color: "#475662",
    textDecorationLine: 'underline',
    textDecorationStyle: "solid",
    textDecorationColor: "#475662", 
  },
});

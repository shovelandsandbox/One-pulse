/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  bottomRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    width: "100%",
  },
  cancelLink: {
    elevation: 2,
    padding: 10,
  },
  cancelText: {
    color: "#ec1c2e",
    fontFamily: "Avenir-Black",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 5,
    textAlign: "center",
  },
  centeredView: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  dobText: {
    marginLeft: 5,
  },
  dobView: {
    justifyContent: "flex-start",
  },
  dropDownImage: {
    height: 6,
    width: 10,
  },
  dropDownStyle: {
    height: 36,
    minWidth: 100,
  },
  dropDownText: {
    color: "#727272",
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    lineHeight: 23,
  },
  dropDownView: {
    alignItems: "center",
    borderColor: "#707070",
    borderRadius: 5,
    borderWidth: 0.3,
    flexDirection: "row",
    height: 40,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    width: "100%",
  },
  inputBox: {
    borderColor: "#707070",
    borderRadius: 5,
    borderWidth: 0.3,
    color: "#727272",
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    height: 40,
    justifyContent: "center",
    lineHeight: 23,
    paddingHorizontal: 10,
    width: "100%",
  },

  inputTitle: {
    color: "#212529",
    fontFamily: "Avenir-Heavy",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 20,
  },
  inputView: {
    marginTop: 5,
    width: "100%",
  },
  modalText: {
    color: "#212529",
    fontFamily: "Avenir-Heavy",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 28,
  },
  modalView: {
    alignItems: "flex-start",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: "100%",
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 6,
    elevation: 2,
    padding: 10,
  },
  saveRoundedButton: {
    borderRadius: 20,
    width: 100,
  },
  saveText: {
    color: "#fff",
    fontFamily: "Avenir-Black",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  textStyle: {
    color: "white",
    fontFamily: "Avenir",
    fontWeight: "bold",
    textAlign: "center",
  },
});

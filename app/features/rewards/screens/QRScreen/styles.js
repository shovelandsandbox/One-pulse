import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
  },
  qrCodeImage: {
    aspectRatio: 1,
    marginBottom: 20,
    width: "100%",
  },
  redeemText: {
    fontFamily: "Avenir-Roman",
    fontSize: 14,
    marginVertical: 10,
  },
  redeemTitle: {
    color: "#222529",
    fontFamily: "Avenir-Black",
    fontSize: 20,
    fontWeight: "bold",
  },
  tncText: {
    fontFamily: "Avenir-Black",
    fontSize: 14,
  },
  tncUnderLineText: {
    textDecorationLine: "underline",
    color: "blue",
  },
  tncView: {
    marginVertical: 10,
  },
  voucherCodeText: {
    alignSelf: "center",
    color: "#222529",
    fontFamily: "Avenir-Black",
    fontSize: 30,
    marginBottom: 20,
    marginTop: 30,
  },
  voucherImage: {
    height: 200,
    resizeMode: "stretch",
    width: "100%",
  },
});

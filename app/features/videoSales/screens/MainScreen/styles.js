import { StyleSheet } from "react-native";

export default StyleSheet.create({
  All: {
    width: window.width,
    height: window.height,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  headerContainer: {
    width: "100%",
    height: 52,
    alignItems: "center",
    paddingLeft: 11,
    paddingRight: 11,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  customStyles: {
    backgroundColor: "rgba(52, 52, 52, 0)"
  },
  headerButtonStyle: {
    width: 55,
    height: 55,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  headerBackImage: { width: 20, height: 20, left: 0 },
  cardViewStyle: {
    minWidth: 200,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: "#e1e7ed",
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  cardBtn: {
    justifyContent: "center",
    marginLeft: 20,
    flex: 0.4,
    borderRadius: 20,
    height: 40,
    alignItems: "center"
  },
  flexStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  scrollableCardView: {
    paddingHorizontal: 20,
    marginBottom: 5,
    flexDirection: "column",
    flex: 1
  },
  bookConsultation: {
    flexDirection: "row",
    backgroundColor: "#ec1c2e",
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  whiteBgColor: {
    backgroundColor: "#ffffff"
  },
  redBgColor: {
    backgroundColor: "#ec1c2e"
  },
  btnShadowContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5
  },
  lastCardStyle: {
    marginBottom: 10
  }
});

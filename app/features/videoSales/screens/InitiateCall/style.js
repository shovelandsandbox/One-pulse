/* eslint-disable react-native/no-color-literals */
import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";
import { Theme } from "../../../../themes";
const { Colors, Fonts } = Theme;

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  addButton: {
    alignItems: "center",
    backgroundColor: colors.crimson,
    borderRadius: 30,
    height: 40,
    justifyContent: "center",
    width: 100
  },
  addButtonText: {
    color: colors.white,
    fontSize: 20
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30
  },
  callButton: {
    alignItems: "center",
    backgroundColor: colors.crimson,
    borderRadius: 30,
    height: 60,
    justifyContent: "center",
    width: 180
  },
  center: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  container: {
    borderColor: colors.lightGray,
    borderTopWidth: 1,
    flex: 1,
    padding: 20
  },
  pulseContainer: {
    flex: 1,
    backgroundColor: "#f4f7fc"
  },
  headerLayout: {
    color: Colors.grey343A40,
    fontFamily: Fonts.AvenirRoman,
    fontSize: 14,
    shadowColor: Colors.grey747474,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  description: {
    alignItems: "flex-start",
    color: colors.black,
    fontFamily: "bold",
    fontSize: 20,
    justifyContent: "flex-start",
    margin: 25
  },
  email: {
    borderBottomWidth: 1,
    borderColor: colors.solidGray,
    flex: 1,
    height: 40,
    lineHeight: 20,
    marginRight: 20,
    paddingLeft: 10
  },
  error: {
    color: colors.crimson
  },
  flatList: {
    backgroundColor: colors.white,
    flex: 1,
    marginBottom: 2
  },
  inputRow: {
    alignItems: "center",
    flexDirection: "row",
    height: 70
  },
  messageContainer: { alignItems: "center", flex: 1, justifyContent: "center" },
  messageText: {
    fontSize: 20
  },
  participantRow: {
    flex: 1
  },
  picture: {
    borderRadius: 25,
    height: 50,
    marginRight: 18,
    width: 50
  },
  primaryText: {
    color: colors.black,
    fontSize: 19,
    paddingLeft: 20
  },
  radioButtonContainer: {
    alignItems: "flex-end",
    flex: 1,
    justifyContent: "center",
    marginEnd: 10
  },
  row: {
    alignItems: "center",
    flexDirection: "row"
  },
  seperator: {
    backgroundColor: "#DCDCDC",
    height: 4,
    width: "100%"
  },
  searchContainer: { flexDirection: "row", paddingLeft: 20, paddingTop: 15 },
  searchMainContainer: {
    marginTop: 143,
  },
  searchMainSecondaryContainer: {
    marginTop: 5,
  },
  pageTitleContainer: {
    flex: 3,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  pageTitle: { fontFamily: "Avenir-Book", fontSize: 20, color: "#ec1c2e" },
  searchIconHolder: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  iconContainer: {
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  modalView: {
    marginTop: 10,
    padding: 20,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%",
    height: 300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  openButtonAlert: {
    backgroundColor: "#F194FF",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    elevation: 2
  },
  openButtonCall: {
    backgroundColor: "#ec1c2e",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    elevation: 2
  },
  textStyleAlert: {
    color: "black",
    textAlign: "center"
  },
  textStyleCall: {
    color: "white",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "left",
  },
  tabsLayout: {
    paddingVertical: 12,
    flexDirection: "row"
  },
  contactEmail: {
    fontSize: 12,
    color: "#858c94"
  },
  fullName: {
    fontSize: 14,
    color: "#414141"
  },
  dateContainer: {
    paddingRight: 4,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  conversationDate: {
    fontSize: 9.3,
    lineHeight: 12.7,
    fontWeight: "bold",
    color: "#414141",
  },
  conversationTime: {
    fontSize: 9.3,
    lineHeight: 12.7,
    color: "#858c94",
  },
  conversationDuration: {
    fontSize: 8,
    lineHeight: 12.7,
    color: "#858c94"
  },
  durationTime: {
    fontSize: 9.3,
    lineHeight: 12.7,
    color: "#858c94"
  },
  tabContainer: {
    height: 35,
    width: "100%",
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  modalEmail: { fontFamily: "Avenir-Book", color: "#ffffff" },
  modalName: { fontFamily: "Avenir-Book", color: "#ffffff" },
  modalDOBContainer: { marginVertical: 10, flexDirection: "row" },
  modalDobText: { fontFamily: "Avenir-Book", color: "#ffffff" },
  modalPhoneText: { fontFamily: "Avenir-Book", color: "#ffffff" },
  modalEmailButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chatIcon: { height: 80, width: 80 },
  roomButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  bottomBorder: {
    width: "100%",
    borderBottomWidth: 3,
    borderBottomColor: "red",
  },
  scrollViewContainer: { paddingHorizontal: 20, paddingTop: 15 },
  swiping: {
    fontSize: 7,
    lineHeight: 10,
    color: "#ffffff",
  },
  contactView: {
    flexDirection: "row",
  },
  emailView: {
    flex: 9,
  },
  swipeView: {
    alignContent: "center",
    flex: 1,
  },
  callogStyle: {
    marginTop: 50,
  },
  customTextStyles: {
    color: "#707070",
    fontSize: 17,
    paddingHorizontal: 10,
    marginTop: 80,
    marginBottom: 10,
  },
  callLogViewStyle: {
    marginTop: 13,
    marginHorizontal: 6.5,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 14,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
  },
  searchInput: {
    width: '88%',
    height: 35,
    backgroundColor: "#fff",
    textAlign: 'center',
  },
  searchAction: {
    height: 35,
    width: "12%",
    backgroundColor: "#ec1c2e",
    justifyContent: "center",
    alignItems: "center",
  },
  dismissIcon: {
    width: 20,
    height: 20,
  },
});

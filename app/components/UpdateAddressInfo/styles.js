import { StyleSheet, Platform } from "react-native";
import { Colors } from "../../mypolicy/configs";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 17,
    marginVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    elevation: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
  },
  leftContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,

  },
  bodycontainer: {
    flex: 1,

  },
  editButtonContainer: {
    alignItems: "flex-end",
    flex: 1,
    height: 25,
    justifyContent: "center",
    width: 60,
  },
  editContainer: {
    alignContent: "stretch",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editContainerMap: {
    alignContent: "stretch",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    zIndex: -1
  },
  errorMsg: {
    color: Colors.main.baseRed,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
  },
  iconContainer: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    marginRight: 15,
  },
  iconStyle: {
    alignContent: "stretch",
  },
  inputContainer: () => ({
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
    borderColor: Colors.main.baseGray,
  }),
  inputContainerAddress: () => ({
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
    marginHorizontal: 17,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomColor: "#000000"
  }),
  inputContainerCity: () => ({
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
    marginHorizontal: 17,
    borderBottomColor: "#000000"
  }),
  text: {
    color: "#ED1B2E",
    fontSize: 13,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontFamily: 'Avenir-Heavy',
    letterSpacing: .3
  },
  textSave: {
    color: "#fff",
    fontSize: 13,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontFamily: 'Avenir-Heavy',
    letterSpacing: .3
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 14,
    paddingHorizontal: 16,
  },
  titleCity: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 7
  },
  titleZipCode: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 7
  },
  titleContainerNoEdit: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingTop: 14,
    paddingHorizontal: 16
  },
  editText: {
    color: "#ED1B2E",
    fontSize: 13,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontFamily: 'Avenir-Heavy',
    letterSpacing: .3
  },
  languageAddressText: {
    color: '#515B61',
    fontSize: 13,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontFamily: 'Avenir-Heavy'
  },
  langAddress: {
    color: '#212529',
    fontSize: 15,
    fontFamily: 'Avenir-Roman',
    paddingRight: 28,
    textAlign: 'left'
  },
  textInputAdd: { color: '#212529', fontSize: 15, fontFamily: 'Avenir-Roman' },
  errorView: { paddingHorizontal: 17, paddingBottom: 10 },
  cityZipcodeContainer: { flexDirection: 'column', flex: 1 },
  cityZipcodeView: { flexDirection: 'row', width: '100%' },
  columnStyle: { flex: .5, paddingBottom: 16 },
  addressInputs: { color: '#212529', fontSize: 15, fontFamily: 'Avenir-Roman', paddingBottom: 4 },
  padding17: { paddingHorizontal: 17 },
  titleHeader: {
    color: '#515B61',
    fontSize: 13,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontFamily: 'Avenir-Heavy'
  },
  cancelButton: {
    width: 80,
    height: 30,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveButton: {
    width: 80,
    height: 30,
    borderRadius: 17,
    backgroundColor: '#EC1C2E',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

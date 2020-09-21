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
    // padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
  },
  containerBox: {
    flex: 1,

    flexDirection: 'row'
  },
  editButtonContainer: {
    alignItems: "flex-end",
    flex: 1,
    // height: 35,
    // justifyContent: "center",
    width: 60,
  },
  editContainer: {
    alignContent: "stretch",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingRight:16,

  },
  errorMsg: {
    color: Colors.main.baseRed,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
  },
  iconContainer: {
    alignItems: "center",
    height: 25,
    justifyContent: "center",
    marginRight: 15,
  },
  iconStyle: {
    alignContent: "stretch",
  },
  inputContainer: () => ({
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.main.baseGray,
    width: "100%",
  }),
  isdCode: {
    color: Colors.main.lightGray,
    fontFamily: 'Avenir-Roman',
    marginRight: 4,
    fontSize: 15,
    paddingTop: Platform.OS === "ios" ? 5 : null,
  },
  showTip: {
    color: Colors.main.baseGray,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
    paddingTop: 2,
  },
  text: {
    color: '#ED1B2E',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16,
    fontWeight: 'bold',
    fontFamily: 'Avenir-Heavy'
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 0,
    // borderWidth:1,
    // lineHeight:10
  },
  leftContainer: {
    // flex: .2,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7
  },
  bodycontainer: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'green'
  },
  editText: {
    color: "#ED1B2E",
    fontSize: 13,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontFamily: 'Avenir-Heavy',
    letterSpacing: .3
  },
  titleHeader: {
    color: '#515B61',
    fontSize: 13,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontFamily: 'Avenir-Heavy'
  },
  textInputContainer: { 
    flexDirection: 'row', 
    paddingBottom: 18, 
    paddingHorizontal: 16,
  },
  inputTextStyle: { 
    color: '#212529', 
    fontSize: 15, 
    fontFamily: 'Avenir-Roman',
    textAlign: 'left',
  },
  errorView: { 
    paddingHorizontal: 17, 
    paddingBottom: 10 
  },


});

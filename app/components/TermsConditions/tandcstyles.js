/* eslint-disable */
import { StyleSheet, Platform } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    // color: '#68737a',
    marginTop: 20,
    marginBottom: 20,
    lineHeight: 30,
    // fontFamily: Platform.OS === 'ios' ? 'PruSansNormal-Demi' : 'pru-bold',
    margin: 16,
    height: 30,
    color: '#515B61',
    fontFamily: 'Avenir',
    fontWeight: '900',
    // line-height: 30px;

  },
  headingBox: {
    flex: 1,
    alignItems: "center",
  },
  TCheading: {
    color: "#515B61",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 30,
    paddingBottom: 5
  },
  heading: {
    color: "#515B61",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 18,
    paddingBottom: 17
  },
  subTitle: {
    fontSize: 14,
    textAlign: 'left',
    color: '#68737a',
    marginTop: 16,
    marginBottom: 16,
    lineHeight: 17,
    fontFamily: Platform.OS === 'ios' ? 'PruSansNormal-Demi' : 'pru-bold',
    marginLeft: 16,
    marginRight: 16,
  },
  instructions: {
    fontSize: 14,
    textAlign: 'left',
    color: '#68737a',
    marginBottom: 5,
    lineHeight: 17,
    fontFamily: Platform.OS === 'ios' ? 'PruSansNormal' : 'pru-regular',
    marginLeft: 16,
    marginRight: 16,
  },
  actionBtnsContainer: {
    // width: window.width,
    // flexDirection: 'row',
    justifyContent: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
    backgroundColor: '#fff',
    height: 50,
    // padding: 10,
    // shadowColor: '#000000',
    // elevation: 1,
    // shadowRadius: 5,
    // shadowOpacity: 0.8,
    // shadowOffset: { width: 0, height: 10 },
    alignSelf: 'center',
    paddingTop: 10
  },
  closeBtn: {
    margin: 16,
  },
  negativeBtn: {
    flex: 1,
    height: 40,
    width: window.width / 2 - 20,
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#707070',
    borderWidth: 1,
    // textAlign: 'center',
    // color: '#68737a',
    padding: 12,
    // fontSize: 14,
    // lineHeight: 15,
    // fontFamily: 'PruSansNormal-Demi',
    alignSelf: 'center',
  },
  positiveBtn: {
    // flex: 1,
    borderRadius: 50,
    borderColor: '#ed1b2e',
    borderWidth: 1,
    backgroundColor: '#ed1b2e',
    height: 40,
    paddingHorizontal: 77,
    // marginLeft: 5,
    // alignItems: 'center',
    // padding: 12,
    justifyContent: 'center',
    // fontSize: 14,
    // lineHeight: 15,
    // fontFamily: 'PruSansNormal-Demi',
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 15,
    fontFamily: Platform.OS === 'ios' ? 'PruSansNormal-Demi' : 'pru-bold',
    color: '#68737a',
  },
  activeButtonText: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 15,
    fontFamily: Platform.OS === 'ios' ? 'PruSansNormal-Demi' : 'pru-bold',
    color: '#ffffff',
  },
  closeContainer: {
    // flexDirection: 'row',
    justifyContent: 'flex-end',
    // backgroundColor: '#a445',
    paddingRight: 10,
    paddingTop: 10,
    width: 50,
    height: 42,
    // flex: 1
  },
  backContainer: {
    // backgroundColor: '#4a45',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingTop: 10,
    width: 50,
    height: 42,
    flex: 1
  },
  closeContainerone: {
    paddingLeft: 10,
    paddingTop: 10,
    width: 50,
    paddingRight: 10,
    height: 42,
    flex: 1,
    alignItems: "flex-end"
  },
  closeone: {
    width: 50,
    height: 30,
    resizeMode: "contain",
    alignItems: "flex-end"
  },
  close: {
    width: 30,
    height: 30,
  },
  back: {
    width: 20,
    height: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#707070',
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    width: window.width / 2 - 20,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
  },
  loaderUI: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBtn: {
    // backgroundColor: '#8ac5',
    marginTop: 8,
    flex: 1,
    // borderRadius: 10,
    // borderColor: '#ffffff',
    // borderWidth: 1,
    // backgroundColor: '#ffffff',
    height: 40,
    // width: window.width / 2 - 20,
    marginLeft: 5,
    alignItems: 'center',
    padding: 12,
    justifyContent: 'center',
    // fontSize: 14,
    // lineHeight: 15,
    // fontFamily: 'PruSansNormal-Demi',
    alignSelf: 'center',
  },
}));

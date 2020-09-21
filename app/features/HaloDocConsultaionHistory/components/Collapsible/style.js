/*
 * @Description:
 * @Author: BinBin
 * @Date: 2019-08-13 15:13:42
 * @LastEditors: BinBin
 * @LastEditTime: 2019-08-19 10:40:03
 */
import {
  StyleSheet,
  Platform,
  Dimensions
} from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    marginBottom: 20
  },
  box: {
    marginTop: -10
    // width: 350
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold"
  },
  press: {
    width: 350,
    backgroundColor: Colors.ghostWhite,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    height: 140
  },
  docName: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
    justifyContent: "space-around"
  },
  docImage: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  docText: {
    width: 209,
    color: Colors.grey515B61,
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 16,
    flexWrap: "wrap"
  },
  chevron: {
    width: 14,
    height: 7
  },
  funcList: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
    marginLeft: 60,
    paddingVertical: 20
  },
  funcList1: {
    width: 15,
    height: 15,
    marginRight: 5
  },
  funcList1Text: {
    height: 16,
    width: 52,
    color: Colors.pulseDarkGrey,
    fontFamily: "Avenir",
    fontSize: 12,
    lineHeight: 16
  },
  boxDetail: {
    backgroundColor: Colors.ghostWhite,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    width: 350,
    marginTop: 0
  },
  detailArrow: {
    marginLeft: 20,
    marginRight: 20
  },
  attach: {
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  },
  attachTitle: {
    flexDirection: "row",
    marginTop: 17
  },
  attachTitleImage: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  attachTitleText: {
    width: 189,
    color: Colors.grey515B61,
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 22
  },
  attachList: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  listDetail: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10
  },
  badge: {
    position: "absolute",
    top: -10,
    left: 16,
    backgroundColor: Colors.pulseRed
  },
  badgeImage: {
    width: 46,
    height: 46,
    borderRadius: 30
  },
  nameText: {
    fontWeight: "600",
    fontSize: 12
  },
  cardMainView: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black
  },
  textView: {
    flexDirection: "row",
    marginBottom: 10
  },
  dateText: {
    marginRight: 10,
    width: 120,
    justifyContent: "flex-end"
  },
  patientText: {
    marginRight: 10,
    width: 120,
    justifyContent: "flex-end"
  },
  diagnosisText: {
    marginRight: 10,
    width: 120,
    justifyContent: "flex-end"
  },
  modalView: {
    alignItems: "flex-end",
    margin: 10
  },
  closeIcon: {
    width: 28,
    height: 28
  },
  imageDimensions: {
    width: 40,
    height: 40
  }
});

export default styles;

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  aimeStyle: {
    color: '#222529',
    fontFamily: 'Avenir',
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
  },
  termsconditions: {
    color: '#515B61',
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
    textDecorationLine: "underline",
  },
  myDocTncCloseContainer: {
    width: 38,
    height: 55,
    alignItems: "flex-start",
    justifyContent: "center",
    position: 'absolute',
    right: 0,
  },
  myDocTnCContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  tncAgreeAndContinueButton: {
    position: "absolute",
    bottom: "3%",
    alignSelf: "center",
    height: 44,
    width: "58.67%",
    borderRadius: 255,
    backgroundColor: "#ED1B2E",
    justifyContent: "center",
  },
  tncAgreeContinueText: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  byContinueText: {
    color: '#515B61',
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 20,
  },
  talkToDoctorTextContainer: {
    paddingHorizontal: 18,
    marginTop: 10,
  },
  docLogo: {
    height: 26,
    width: 58,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  docLogoPosition: {
    justifyContent: 'center',
    height: 26,
    width: 60,
    lineHeight: 20,
    marginTop: -4,
  },
  consultWithQualifiedText: {
    marginVertical: 10,
    color: '#222529',
    fontFamily: 'Avenir',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  wheneverContainer: {
    width: '90%',
    marginVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  talktoDoctorLabelText: {
    alignSelf: 'center',
    color: '#515B61',
    fontFamily: 'Avenir',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    marginVertical: 6
  },
  talkToDocContainer: {
    marginHorizontal: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstView: {
    height: 44,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  closeBtn: {
    width: 60,
    padding: 15
  },
  closeImg: {
    height: 18,
    width: 18,
    alignSelf: "center"
  },
});

export default styles;

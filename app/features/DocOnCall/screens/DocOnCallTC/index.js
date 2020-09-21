/* eslint-disable */
import React, { PureComponent } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler
} from "react-native";
import {
  CLOSE_ICON,
  DOCTORHEAD,
  DOC_INLINE_LOGO
} from "../../../../config/images";
import { connect } from "react-redux";
import {
  CoreUtils,
  metaHelpers,
  CoreConfig
} from "@pru-rt-internal/pulse-common";

const KEYS = {
  DOC_ON_CALL_NAME: "docOnCallName",
  DOC_ON_CALL_TC_TITLE: "docOnCallTCTitle",
  DOC_ON_CALL_PRIVACY_TITLE: "docOnCallPrivacyTitle",
  DOC_ON_CALL_TC_DETAIL: "docOnCallTCDetail",
  DOC_ON_CALL_PRIVACY_DETAIL: "docOnCallPrivacyDetail"
};

const fetchLabel = (value, defaultValue) =>
  value ? value.label : defaultValue;

const initializeDOCMeta = () => {
  return {
    docOnCallName: fetchLabel(
      helpers(screenNames.DOC_INTRO_TERMS_CONDITION, KEYS.DOC_ON_CALL_NAME),
      ""
    ),
    docOnCallTCTitle: fetchLabel(
      helpers(screenNames.DOC_INTRO_TERMS_CONDITION, KEYS.DOC_ON_CALL_TC_TITLE),
      ""
    ),
    docOnCallPrivacyTitle: fetchLabel(
      helpers(
        screenNames.DOC_INTRO_TERMS_CONDITION,
        KEYS.DOC_ON_CALL_PRIVACY_TITLE
      ),
      ""
    ),
    docOnCallTCDetail: fetchLabel(
      helpers(
        screenNames.DOC_INTRO_TERMS_CONDITION,
        KEYS.DOC_ON_CALL_TC_DETAIL
      ),
      ""
    ),
    docOnCallPrivacyDetail: fetchLabel(
      helpers(
        screenNames.DOC_INTRO_TERMS_CONDITION,
        KEYS.DOC_ON_CALL_PRIVACY_DETAIL
      ),
      ""
    )
  };
};

const sh = Dimensions.get("window").height;
const sw = Dimensions.get("window").width;
const {
  pageKeys,
  TALKTOADOCTOR,
  TALKADOCTOR,
  CONSULTWITHAQUALIFIED,
  TALKTOADOCTOR_WHENEVER,
  TALKTOADOCTOR_APPEARSONCALL,
  TALKTOADOCTOR_BYCLICKINGAGREEBELOW,
  TALKTOADOCTOR_AND,
  TALKTOADOCTOR_PRIVACY_NOTICW,
  TALKTOADOCTOR_TC,
  TALKTOADOCTOR_DOC,
  TALKTOADOCTOR_IAGREE,
  COMMON_KEY_PRIVACY_MY_DOC,
  NEW_PRIVACYNOTICE,
  NEW_TERMSCONDITIONS,
  NEW_TERMSCONDITIONS_DOCONCALL
} = CoreConfig;

import PropTypes from "prop-types";
const AIME_STYLE = {
  color: "#222529",
  fontSize: 14,
  fontWeight: "300",
  textAlign: "center"
};

import screenNames from "../../configs/ScreenNames";
import actionNames from "../../configs/actionNames";
import { initDocMeta } from "../../meta";

class DocOnCallTC extends PureComponent {
  constructor(props) {
    super(props);
    this.metaConstants = initDocMeta();
  }
  _presentTermsAndConditions() {
    const { navigation } = this.props;
    navigation.navigate("DengueTermsDetail");
  }

  _agreeTermsOfDengueAlert() {
    const tncData = {
      termsConditions: {
        DOC: {
          consent: "ACCEPT",
          consentDate: CoreUtils.getTimeStamp(),
          version: metaHelpers.findCommon("DOCONCALL_TnC_VERSION").value,
          org: "DOC",
          privacy: "ACCEPT",
          privacyDate: CoreUtils.getTimeStamp(),
          privacyVersion: metaHelpers.findCommon("DOCONCALL_PP_VERSION").value
        }
      }
    };
    this.props.handleDocTnCAcceptance(tncData);
  }
  goBack = () => {
    this.props.gotHomePage();
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.goBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.goBack);
  }

  render() {
    const { navigation } = this.props;
    const termsMyDoc = this.metaConstants.docOnCallTCDetail;
    // const termsMyDoc = metaHelpers.findCommon(COMMON_KEY_TERMS_MY_DOC).label;
    const title = this.metaConstants.docOnCallTCTitle; //helpers.findScreen(SCREEN_KEY_TERMS_AND_CONDITIONS).label;
    const privacyPolicyMyDoc = this.metaConstants.docOnCallPrivacyDetail; //helpers.findCommon(COMMON_KEY_PRIVACY_MY_DOC)
    // .label;
    const title_privacy = this.metaConstants.docOnCallPrivacyTitle; //helpers.findScreen(NEW_PRIVACYNOTICE).label;
    const PRIVACYNOTICE_DOCONCALL = this.metaConstants.docOnCallName; //helpers.findElement(

    return (
      <ScrollView
        style={{
          backgroundColor: "#fff",
          width: "100%",
          height: "100%"
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff"
          }}
        >
          <View
            style={{
              height: 44,
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
          >
            <TouchableOpacity
              style={{ width: 60, padding: 15 }}
              onPress={() => {
                this.goBack();
              }}
            >
              <Image
                style={{ flex: 1, alignSelf: "center" }}
                source={CLOSE_ICON}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </View>

          {/* Header Image */}
          <View
            style={{
              backgroundColor: "#fff",
              marginBottom: 24
            }}
          >
            <Image
              style={{
                height: sh * 0.357,
                alignSelf: "center",
                resizeMode: "contain"
              }}
              source={DOCTORHEAD}
            />
          </View>

          <View
            style={{
              marginHorizontal: 40,
              backgroundColor: "#fff"
            }}
          >
            {/* Title */}
            <Text
              style={{
                alignSelf: "center",
                color: "#515B61",
                fontSize: 22,
                fontWeight: "900",
                textAlign: "center"
              }}
            >
              {metaHelpers.findElement(TALKTOADOCTOR, TALKADOCTOR).label}
              {/* {`Talk to a Doctor!`} */}
            </Text>

            {/* Description */}
            <Text
              style={{
                // marginTop: "3%",
                color: "#222529",
                fontSize: 16,
                fontWeight: "500",
                textAlign: "center"
                // backgroundColor: '#4Fa'
              }}
            >
              {
                metaHelpers.findElement(TALKTOADOCTOR, CONSULTWITHAQUALIFIED)
                  .label
              }

              {/* Consult with a qualified and board-certified doctor who can provide you with care recommendations and issue electronic prescriptions on demand. */}
            </Text>

            {/* Icon Description */}
            <View
              style={{
                // backgroundColor: '#ac3',
                marginTop: 24,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                height: 70
              }}
            >
              <Text style={AIME_STYLE}>
                {
                  metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_WHENEVER)
                    .label
                }

                {/* {`Whenever  `} */}
              </Text>
              <View
                style={{
                  // paddingLeft: 3,
                  justifyContent: "center",
                  height: 26,
                  width: 44,
                  lineHeight: 20,
                  marginTop: -6
                  // backgroundColor: '#a43',\
                }}
              >
                <Image
                  style={{
                    // flex:
                    height: 26,
                    width: 44,
                    resizeMode: "contain",
                    alignSelf: "center"
                  }}
                  source={DOC_INLINE_LOGO}
                />
              </View>

              {metaHelpers
                .findElement(TALKTOADOCTOR, TALKTOADOCTOR_APPEARSONCALL)
                .label.split(" ")
                .map(str => {
                  return <Text style={AIME_STYLE}>{" " + str}</Text>;
                })}
            </View>
          </View>

          {/* Terms Dexcription */}
          <View
            style={{
              paddingHorizontal: 40,
              // position: 'absolute',
              // bottom: '12.5%',
              fontSize: 12,
              fontWeight: "300"
            }}
          >
            <Text
              style={{
                color: "#515B61",
                fontSize: 12,
                fontWeight: "300",
                textAlign: "center",
                lineHeight: 20
              }}
            >
              {
                metaHelpers.findElement(
                  TALKTOADOCTOR,
                  TALKTOADOCTOR_BYCLICKINGAGREEBELOW
                ).label
              }
              {/* {'By clicking on Continue below, you confirm that you have read and agree to the  '} */}
              <Text
                style={{
                  color: "#515B61",
                  fontSize: 12,
                  fontWeight: "300",
                  textAlign: "center",
                  textDecorationLine: "underline"
                }}
                onPress={() => this.props.loadTermsAndCondition()}
              >
                {` ${
                  metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_TC).label
                } `}
                {/* {'Terms & Conditions'} */}
              </Text>
              {metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_AND).label}

              <Text
                style={{
                  color: "#515B61",
                  fontSize: 12,
                  fontWeight: "300",
                  textAlign: "center",
                  textDecorationLine: "underline"
                }}
                onPress={() => this.props.loadPrivacyPolicy()}
              >
                {
                  metaHelpers.findElement(
                    TALKTOADOCTOR,
                    TALKTOADOCTOR_PRIVACY_NOTICW
                  ).label
                }
                {/* {privacy notice} */}
              </Text>

              {metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_DOC).label}
              {/* {` to use the services from DoctorOnCall.`} */}
            </Text>
          </View>
          {/* Button */}
          <TouchableOpacity
            style={{
              // position: 'absolute',
              // bottom: '3%',
              marginTop: 14,
              alignSelf: "center",
              height: 44,
              width: "58.67%",
              borderRadius: 255,
              backgroundColor: "#ED1B2E",
              justifyContent: "center"
            }}
            onPress={() => {
              this._agreeTermsOfDengueAlert();
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "500",
                textAlign: "center"
              }}
            >
              {
                metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_IAGREE)
                  .label
              }
              {/* {`Continue`} */}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

DocOnCallTC.PropTypes = {
  agreeAction: PropTypes.func
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  handleDocTnCAcceptance: tncData => ({
    context: screenNames.DOC_INTRO_TERMS_CONDITION,
    type: actionNames.DOC_SERVICE_TNC_ACCEPTED,
    payload: {
      tncData
    }
  }),
  goToCommon: params => ({
    context: screenNames.DOC_INTRO_TERMS_CONDITION,
    type: actionNames.GO_TO_COMMON,
    payload: {
      params
    }
  }),
  gotHomePage: () => ({
    context: screenNames.DOC_INTRO_TERMS_CONDITION,
    type: actionNames.GO_TO_HEALTH_TAB
  }),
  loadTermsAndCondition: () => ({
    context: "LOAD_TNC_AND_PRIVACY_POLICY",
    type: "TncandPrivacyPolicy/getTnCandPrivacyPolicy",
    payload: {
      source: "Mydoc",
      value: "TermAndConditions"
    }
  }),
  loadPrivacyPolicy: () => ({
    context: "LOAD_TNC_AND_PRIVACY_POLICY",
    type: "TncandPrivacyPolicy/getTnCandPrivacyPolicy",
    payload: {
      source: "Mydoc",
      value: "PrivacyPolicy"
    }
  })
})(DocOnCallTC);

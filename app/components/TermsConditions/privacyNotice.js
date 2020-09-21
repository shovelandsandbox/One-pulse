/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
/* eslint-disable */

import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from "react-native";
import { connect } from "react-redux";
import HTML from "react-native-render-html";
import { isNil, path } from "ramda";
import { PropTypes } from "prop-types";
// import { makeTermsAndConditionApiCall, acceptBabylonTnC } from "../../actions";
import { without } from "ramda";
import styles from "./tandcstyles";
import {
  colors,
  CoreActionTypes,
  CoreConfig,
  CoreConstants,
  ElementErrorManager,
  metaHelpers,
  CoreSelectors
} from "@pru-rt-internal/pulse-common";
const { AuthSelector } = CoreSelectors;
import { gotoPulseRegistration, goto } from "../../actions";
const {
  NEW_PRIVACYNOTICE,
  pageKeys,
  NEW_PRIVACYNOTICE_PULSE,
  COMMON_KEY_PRIVACY,
  TALKTOADOCTOR,
  TALKTOADOCTOR_IAGREE
} = CoreConfig;
const {
  COMMON_KEY_TERMS_BABYLON,
  SCREEN_KEY_CHAT_TERMS,
  COMMON_KEY_COMBINE_TERMS_PRIVACY_APP
} = CoreConstants;

const {
  ACCEPT_MAIN_TERMS_AND_CONDITIONS,
  BABYLON_ACCEPT_TNC
} = CoreActionTypes;

const KEY_AGREE = "accept";
const KEY_BACK = "goback";

const fontFamily = Platform.OS === "ios" ? "PruSansNormal" : "pru-regular";
const containerStyle = {
  margin: 15
};
const baseFontStyle = {
  fontFamily
};
import { IGNORED_TAGS } from "react-native-render-html/src/HTMLUtils";
import Privacy from "../../containers/Aboutus/Privacy";
import { CLOSE_NEW } from "../../config/images";

const tags = without(
  [
    "table",
    "caption",
    "col",
    "colgroup",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "tr"
  ],
  IGNORED_TAGS
);

const tableDefaultStyle = {
  flex: 1,
  justifyContent: "flex-start",
  borderWidth: 0.3
};

const tableColumnStyle = {
  ...tableDefaultStyle,
  flexDirection: "column",
  alignItems: "stretch"
};

const tableRowStyle = {
  ...tableDefaultStyle,
  flexDirection: "row",
  alignItems: "stretch"
};

const tdStyle = {
  ...tableDefaultStyle,
  padding: 2
};

const thStyle = {
  ...tdStyle,
  backgroundColor: "#CCCCCC",
  alignItems: "center"
};

const renderers = {
  table: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  col: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  colgroup: (x, c) => <View style={tableRowStyle}>{c}</View>,
  tbody: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  tfoot: (x, c) => <View style={tableRowStyle}>{c}</View>,
  th: (x, c) => <View style={thStyle}>{c}</View>,
  thead: (x, c) => <View style={tableRowStyle}>{c}</View>,
  caption: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  tr: (x, c) => <View style={tableRowStyle}>{c}</View>,
  td: (x, c) => <View style={tdStyle}>{c}</View>
};
const tagsStyles = {
  p: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    marginVertical: 10,
    fontSize: 13.3
  },
  span: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    marginVertical: 10,
    fontSize: 13.3
  },
  div: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    marginVertical: 10,
    fontSize: 13.3
  },
  strong: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-regular"
  },
  li: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    marginTop: -5
  }
};
class PrivacyNotice extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.navigate = this.navigate.bind(this);
    this.state = {
      socialAccessType: ""
    };
  }

  onSubmit() {
    const { navigation, isLoggedIn, isRegistered, workflowId } = this.props;
    const { commons } = this.props.meta.metaDetail;
    const fromAuthAction = path(
      ["state", "params", "fromAuthAction"],
      navigation
    );

    const socialAccessType = path(
      ["state", "params", "socialAccessType"],
      navigation
    );

    const tncVersion = metaHelpers.findCommon("PULSE_TnC_VERSION").value;
    const privacyVersion = metaHelpers.findCommon("PULSE_PP_VERSION").value;

    if (fromAuthAction && (isLoggedIn || isRegistered)) {
      const userDetails = {
        firstName: this.props.firstName,
        surName: this.props.lastName,
        contactDetails: {
          email: {
            channel: "EMAIL",
            value: this.props.registeredEmail
          }
        }
      };
      return this.props.acceptTnC({
        workflowId,
        email: this.props.registeredEmail,
        userDetails,
        socialAccessType,
        tncVersion,
        privacyVersion
      });
    }
    this.props.acceptBabylonTnC({
      tncAccepted: true,
      ...navigation.state.params
    });
  }

  onClose() {
    const { navigation } = this.props;
    const fromAuthAction = path(
      ["state", "params", "fromAuthAction"],
      navigation
    );

    if (fromAuthAction) {
      this.props.gotoPulseRegistration();
      return;
    }
    this.props.goBack();
  }

  navigate(page) {
    this.props.goto(page);
  }

  getTnCHtml(termsKey) {
    const { commons } = this.props.meta.metaDetail;

    return (
      <HTML
        style={styles.instructions}
        containerStyle={containerStyle}
        baseFontStyle={baseFontStyle}
        tagsStyles={tagsStyles}
        html={metaHelpers.findCommon(termsKey).label}
        ignoredTags={tags}
        renderers={renderers}
      />
    );
  }

  componentDidMount() {
    // console.log(this.props.navigation.state.params, "<<<<1111<<<<<<<<")
    let socialAccessType = this.props.navigation.state.params.socialAccessType
      ? this.props.navigation.state.params.socialAccessType
      : "";
    this.setState({
      socialAccessType: socialAccessType
    });
  }
  getAccept = res => {
    const { meta, navigation, loading } = this.props;

    const agree = metaHelpers.findElement(SCREEN_KEY_CHAT_TERMS, KEY_AGREE)
      .label;
    // let agree = metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_IAGREE).label

    // console.log(res,">>>>>>>>>>>>>")
    if (!true) {
      return false;
    } else {
      return (
        <View
          style={[
            styles.actionBtnsContainer,
            { marginBottom: 20, paddingTop: 0 }
          ]}
        >
          <Text
            style={{
              fontFamily: "Avenir",
              fontSize: 14,
              fontWeight: "300",
              lineHeight: 16,
              textAlign: "center",
              alignSelf: "center",
              marginTop: 10,
              marginBottom: 10,
              color: "black",
              paddingHorizontal: 10,
              fontWeight: "600"
            }}
          >
            {/* By continuing, you confirm that you have read and agree to the Terms & Conditions and Privacy Notice to use the services. */}
          </Text>
          {!this.props.loading && (
            <TouchableOpacity
              style={styles.positiveBtn}
              onPress={e => {
                e.preventDefault();
                this.onSubmit();
              }}
            >
              <Text style={styles.activeButtonText}>{agree}</Text>
            </TouchableOpacity>
          )}
          {loading && (
            <TouchableOpacity
              style={styles.loaderBtn}
              onPress={e => {
                e.preventDefault();
              }}
            >
              <View style={styles.loaderUI}>
                <ActivityIndicator size="large" color={colors.crimson} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      );
    }
  };
  render() {
    const { meta, navigation, loading } = this.props;
    ElementErrorManager.setCurrentScreen(SCREEN_KEY_CHAT_TERMS);
    const message = this.props.navigation.state.params.message;
    const title = metaHelpers.findScreen(SCREEN_KEY_CHAT_TERMS).label;
    const title1 = metaHelpers.findScreen(NEW_PRIVACYNOTICE).label;

    const agree = metaHelpers.findElement(SCREEN_KEY_CHAT_TERMS, KEY_AGREE)
      .label;
    const back = metaHelpers.findElement(SCREEN_KEY_CHAT_TERMS, KEY_BACK).label;
    const terms = this.getTnCHtml(COMMON_KEY_COMBINE_TERMS_PRIVACY_APP);
    // const terms = isNil(navigation.state.params.babylon)
    //   ? this.getTnCHtml(COMMON_KEY_COMBINE_TERMS_PRIVACY_APP)
    //   : this.getTnCHtml(COMMON_KEY_TERMS_BABYLON);

    let TERMSCONDITIONS_PULSE = metaHelpers.findElement(
      NEW_PRIVACYNOTICE,
      NEW_PRIVACYNOTICE_PULSE
    ).label;
    let termsPrutopia = metaHelpers.findCommon(COMMON_KEY_PRIVACY).label;

    return (
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end"
          }}
        >
          {/* <TouchableOpacity
            onPress={e => {
              this.props.navigation.goBack()
              // this.onClose();
            }}
            style={styles.backContainer}
          >
            <Image
              style={styles.back}
              source={require("../../images/back.png")}
            />
          </TouchableOpacity> */}

          <TouchableOpacity
            // style={{
            //   width: 45,
            //   height: 45,
            //   backgroundColor: "red"
            // }}
            onPress={e => {
              this.props.navigation.goBack();
              // this.onClose();
            }}
            style={styles.closeContainer}
          >
            <Image
              style={styles.close}
              source={CLOSE_NEW}
            />
          </TouchableOpacity>
          {/* <View style={styles.closeContainerone}>
            <Image
              style={styles.closeone}
              source={require("../../images/slider_logo_white.png")}
            />
          </View> */}
        </View>
        <ScrollView showsVerticalScrollIndicator>
          <View style={styles.headingBox}>
            <Text style={styles.TCheading}>{message}</Text>
            <Text style={styles.heading}>{title1} </Text>
          </View>
          {/* {terms} */}

          {
            <HTML
              html={termsPrutopia}
              style={styles.instructions}
              containerStyle={containerStyle}
              baseFontStyle={baseFontStyle}
              tagsStyles={tagsStyles}
              // html={metaHelpers.findCommon(termsKey).label}
              ignoredTags={tags}
              renderers={renderers}
            />
          }
          {/* <Text style={{
            height: 32,
            width: 317,
            color: '#515B61',
            fontFamily: 'Avenir',
            fontSize: 12,
            fontWeight: '300',
            lineHeight: 16,
            textAlign: 'center',
            alignSelf: 'center',
            marginBottom: 40,
          }}>By clicking Agree below, I agree to the Terms of Service
and Privacy Policy</Text> */}
        </ScrollView>
        {this.getAccept(this.state.socialAccessType)}
      </View>
    );
  }
}

PrivacyNotice.propTypes = {
  accountEmail: PropTypes.string,
  email: PropTypes.string,
  firstName: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  isRegistered: PropTypes.bool,
  isSocialLoggedIn: PropTypes.bool,
  lastName: PropTypes.string,
  loading: PropTypes.bool,
  meta: PropTypes.object,
  password: PropTypes.string,
  profilePic: PropTypes.string,
  profilePicData: PropTypes.string,
  sessionId: PropTypes.string,
  socialAccessType: PropTypes.string,
  socialEmailReturned: PropTypes.string,
  socialLoginID: PropTypes.string,
  workflowId: PropTypes.string,
  navigation: PropTypes.object,
  makeTermsAndConditionApiCall: PropTypes.func,
  //acceptBabylonTnC: PropTypes.func,
  registeredEmail: PropTypes.string
};

const mapStateToProps = state => {
  // console.log(state, "__________")
  return {
    accountEmail: state.account.email,
    currentScreen: state.trigger.currentScreen,
    email: AuthSelector.getUserEmail(state),
    firstName: state.account.firstName,
    isLoggedIn: state.auth.isLoggedIn,
    isRegistered: state.register.isRegistered,
    isSocialLoggedIn: state.account.isSocialLoggedIn,
    lastName: state.account.lastName,
    loading: state.auth.loading,
    meta: state.meta,
    navigateToMainScreen: state.auth.navigateToMainScreen,
    password: state.auth.password,
    profilePic: state.account.profilePic,
    profilePicData: state.account.profilePicData,
    refreshImage: state.meta.refreshImage,
    sessionId: state.auth.token,
    socialAccessType: state.account.socialAccessType,
    socialEmailReturned: state.account.socialEmailReturned,
    socialLoginID: state.account.socialLoginID,
    termsAccepted: state.auth.termsAccepted,
    workflowId: state.register.workflowId,
    registeredEmail: state.register.email
  };
};
export default connect(mapStateToProps, {
  goBack: () => ({
    context: pageKeys.REGISTRATION,
    type: CoreActionTypes.GO_BACK_TO_PREVIOUS_STACK
  }),
  acceptTnC: payload => ({
    context: pageKeys.REGISTRATION,
    type: ACCEPT_MAIN_TERMS_AND_CONDITIONS,
    payload: payload
  }),
  acceptBabylonTnC: payload => ({
    context: pageKeys.HEALTH_CHECK_HOME_PAGE,
    type: BABYLON_ACCEPT_TNC,
    payload: payload
  }),
  gotoPulseRegistration,
  goto
})(PrivacyNotice);

import React from "react";
import { ScrollView, View, Text, TouchableOpacity,Image,ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import HTML from "react-native-render-html";
import { without, path } from "ramda";
import { IGNORED_TAGS } from "react-native-render-html/src/HTMLUtils";
import { PropTypes } from "prop-types";

import {
  CoreActionTypes,
  CoreConfig,
  CoreStyles,
  metaHelpers,
  colors
} from "@pru-rt-internal/pulse-common";
import styles from "./styles";
import {
  CLOSE_PAGE,
} from "../../config/images";

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
    "tr",
  ],
  IGNORED_TAGS
);

const tableDefaultStyle = {
  flex: 1,
  justifyContent: "flex-start",
  borderWidth: 0.3,
};

const tableColumnStyle = {
  ...tableDefaultStyle,
  flexDirection: "column",
  alignItems: "stretch",
};

const tableRowStyle = {
  ...tableDefaultStyle,
  flexDirection: "row",
  alignItems: "stretch",
};

const tdStyle = {
  ...tableDefaultStyle,
  padding: 2,
};

const thStyle = {
  ...tdStyle,
  backgroundColor: "#CCCCCC",
  alignItems: "center",
};

const baseFontStyle = {
  fontFamily: CoreStyles.fontFamily.normal,
};

/* eslint-disable */
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
  td: (x, c) => <View style={tdStyle}>{c}</View>,
};

const { GO_TO_COMMON, ACCEPT_MAIN_TERMS_AND_CONDITIONS } = CoreActionTypes;
const helpers = metaHelpers;

const {
  pageKeys,
  SCREEN_KEY_TERMS_AND_CONDITIONS,
  SCREEN_KEY_CHAT_TERMS,
  COMMON_KEY_TERMS,
  COMMON_KEY_PRIVACY,
  NEW_TERMSCONDITIONS,
  NEW_TERMSCONDITIONS_PULSE,
  NEW_PRIVACYNOTICE,
  NEW_PRIVACYNOTICE_PULSE
} = CoreConfig;

const KEY_PRUTOPIA = "prutopia";
const KEY_BABYLON = "babylon";
const KEY_DOC_ON_CALL = "docservice";
const KEY_AGREE = "accept";
const KEY_BACK = "goback";

class TNCNPrivacyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      socialAccessType: ""
    }
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
                    value: this.props.registeredEmail,
                },
            },
        };
        return this.props.acceptTnC({
            workflowId,
            email: this.props.registeredEmail,
            userDetails,
            socialAccessType,
            tncVersion,
            privacyVersion,
        });
    }
    this.props.acceptBabylonTnC({
        tncAccepted: true,
        ...navigation.state.params,
    });
}  
  getAccept = (res, showPrivacy) => {
    const { loading } = this.props;

    const agree = metaHelpers.findElement(SCREEN_KEY_CHAT_TERMS, KEY_AGREE).label;
    if (!res) {
      return false
    } else {
      return <View style={[styles.actionBtnsContainer, { marginBottom: 20, paddingTop: 0 }]}>
        <Text style={{
          fontFamily: 'Avenir',
          fontSize: 14,
          fontWeight: '300',
          lineHeight: 16,
          textAlign: 'center',
          alignSelf: 'center',
          marginTop: 10,
          marginBottom: 10,
          color: "black",
          paddingHorizontal: 10,
          fontWeight: "600"
        }}>
          {/* By continuing, you confirm that you have read and agree to the Terms & Conditions and Privacy Notice to use the services. */}
        </Text>
        {!this.props.loading && (
          <TouchableOpacity
            style={styles.positiveBtn}
            onPress={e => {
              if(showPrivacy) {
                e.preventDefault();
                this.onSubmit();
              } else {
                this.props.navigation.navigate("TNCNPrivacyContainer", {
                  fromAuthAction: true,
                  socialAccessType: "FB",
                  showPrivacy: true
                })  
              }
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

}

  }
  render() {
     ;
    let privacyPrutopia = this.props.navigation.state.params.privacyPrutopia;
    let privacyBabylon = this.props.navigation.state.params.privacyBabylon;
    let privacyPolicyMyDoc = this.props.navigation.state.params.privacyPolicyMyDoc;
    let termsPrutopia = this.props.navigation.state.params.termsPrutopia;
    let termsBabylon = this.props.navigation.state.params.termsBabylon;
    let termsMyDoc = this.props.navigation.state.params.termsMyDoc;
    let termsAime = this.props.navigation.state.params.termsAime;
    let showPrivacy = this.props.navigation.state.params.showPrivacy;

    let title = this.props.navigation.state.params.title;
    let message = this.props.navigation.state.params.message;
    if(this.props.navigation.state.params.socialAccessType) {
      if(showPrivacy) {
        privacyPrutopia = helpers.findCommon(COMMON_KEY_PRIVACY).label;
        title = helpers.findScreen(NEW_PRIVACYNOTICE).label;
        message = helpers.findElement(NEW_PRIVACYNOTICE,NEW_PRIVACYNOTICE_PULSE).label;
      } else {
        termsPrutopia = helpers.findCommon(COMMON_KEY_TERMS).label;
        title = helpers.findScreen(NEW_TERMSCONDITIONS).label;
        message = helpers.findElement(NEW_TERMSCONDITIONS,NEW_TERMSCONDITIONS_PULSE).label;
      }
    }
    let param = privacyPrutopia || privacyBabylon || privacyPolicyMyDoc || termsPrutopia || termsBabylon || termsMyDoc || termsAime;
    //  ;
    // const title = metaHelpers.findScreen(SCREEN_KEY_TERMS_AND_CONDITIONS).label;
    const tagsStyles = {
      p: {
        fontFamily: CoreStyles.fontFamily.bold,
        marginVertical: 10,
        fontSize: 14,
      },
      span: {
        fontFamily: CoreStyles.fontFamily.bold,
        marginVertical: 10,
        fontSize: 14,
      },
      div: {
        fontFamily: CoreStyles.fontFamily.bold,
        marginVertical: 10,
        fontSize: 14,
      },
      strong: {
        fontFamily: CoreStyles.fontFamily.bold,
        fontSize: 16,
      },
      li: {
        fontFamily: CoreStyles.fontFamily.bold,
        fontSize: 14,
      },
    };
    const { navigation } = this.props;
    return (
      <View style={styles.containers}>
        <View style={{ width:"100%",height: 44, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity style={{ width: 60, padding: 15 }} onPress={()=>{
            navigation.goBack()
          }}>
            <Image style={{ flex: 1, alignSelf: 'center' }}
                   source={CLOSE_PAGE} resizeMode={"contain"} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headingBox}>
            <Text style={styles.TCheading}>{message}</Text>
            <Text style={styles.heading}>{title}</Text>
          </View>
          
          <HTML
            html={param}
            tagsStyles={tagsStyles}
            ignoredTags={tags}
            renderers={renderers}
            baseFontStyle={baseFontStyle}
          />
        </ScrollView>
        {
          this.getAccept(this.props.navigation.state.params.socialAccessType, this.props.navigation.state.params.showPrivacy)
        }
      </View>
      </View>
    );
  }
}
TNCNPrivacyContainer.propTypes = {
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
  registeredEmail: PropTypes.string,
};

const mapStateToProps = state => {
  // console.log(state, "__________")
  return {
    accountEmail: state.account.email,
    currentScreen: state.trigger.currentScreen,
    email: state.auth.email,
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
    registeredEmail: state.register.email,
  }
};
export default connect(
  mapStateToProps,
  {
    GoToTNCNPrivacyContainer: (params) => ({
      context: pageKeys.ABOUT_TERMS,
      type: GO_TO_COMMON,
      payload: {
        params
      }
    }),
    acceptTnC: payload => ({
      context: pageKeys.REGISTRATION,
      type: ACCEPT_MAIN_TERMS_AND_CONDITIONS,
      payload: payload,
  }),
  }
)(TNCNPrivacyContainer);

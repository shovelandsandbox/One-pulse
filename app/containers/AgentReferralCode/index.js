/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image, Text, TouchableOpacity, Platform } from "react-native";
import { connect } from "react-redux";
import NewTextInput from "../../components/NewTextInput";
import { CLOSE_PAGE, REWARDS_EMAIL_SENT } from "../../config/images";
import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../Profile/styles";
import MetaConstants from "./meta";
const {
  pageKeys,
  REWARDNRIC,
  REFERAL_CODE,
  REFERAL_CODE_REQUIRED,
  AGENT_BOOST_CODE_MSG,
  ENTER_REFERRAL_CODE,
  AGENT_REFERRAL_TEXT,
  SUBMIT,
  SPLASH,
  SPLASH_SKIP,
} = CoreConfig;

class RewardsRecommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      CodeErrorMessage: "",
      CodeException: false,
    };
    this.MetaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.redeem.agentReferralCodeValid !==
        nextProps.redeem.agentReferralCodeValid &&
      nextProps.redeem.agentReferralCodeValid === true
    ) {
      this.props.fetchUserDetail();
    }
  }

  _onClose() {
    const { navigation, navigateToLandingPage } = this.props;

    const firstTimeLogin = navigation.getParam("firstTimeLogin");

    if (firstTimeLogin) {
      navigateToLandingPage();
    } else {
      navigation.goBack();
    }
  }

  _onSendCode() {
    const {
      navigation,
      validateBoostCode,
      validateAgentReferralCode,
    } = this.props;
    let { code } = this.state;
    let referalCode = "";
    if (code) {
      referalCode = code;
    } else {
      referalCode = navigation.getParam("referalCode", "");
    }
    if (!referalCode) {
      this.setState({
        // CodeErrorMessage: "Agent/Boost code is required",
        CodeErrorMessage: this.MetaConstants.codeErrorMessage,
        CodeException: true,
      });
      return false;
    }
    const formattedNumber = Number(referalCode);

    const firstTimeLogin = navigation.getParam("firstTimeLogin");

    if (isNaN(formattedNumber)) {
      // is boost code
      validateBoostCode(referalCode || "");
    } else {
      // is referral code
      validateAgentReferralCode(formattedNumber, firstTimeLogin);
    }
  }

  resetErr = (err, ect) => {
    this.setState({
      [err]: "",
      [ect]: false,
    });
  };

  renderCloseButton = firstTimeLogin =>
    firstTimeLogin ? (
      <TouchableOpacity
        dataTestRef="firstTimeSkipButton"
        onPress={this._onClose.bind(this)}
      >
        <Text style={styles.skip}>{this.MetaConstants.splashSkip}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        dataTestRef="closeButton"
        style={{ width: 60, padding: 15 }}
        onPress={this._onClose.bind(this)}
      >
        <Image
          style={{ flex: 1, alignSelf: "center" }}
          source={CLOSE_PAGE}
          resizeMode={"contain"}
        />
      </TouchableOpacity>
    );

  render() {
    const { navigation } = this.props;

    const firstTimeLogin = navigation.getParam("firstTimeLogin");

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            height: 44,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {this.renderCloseButton(firstTimeLogin)}
        </View>
        <KeyboardAwareScrollView
          style={styles.container}
          enableOnAndroid
          extraScrollHeight={Platform.OS == "ios" ? 10 : -58}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: "100%",
              // paddingTop: 10
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Image
                source={REWARDS_EMAIL_SENT}
                style={{
                  width: "100%",
                  height: 290,
                }}
                resizeMode="contain"
              ></Image>
            </View>

            <View
              style={{
                paddingLeft: 40,
                paddingRight: 40,
              }}
            >
              <Text
                style={{
                  height: "auto",
                  color: "#515B61",
                  fontFamily: "Avenir",
                  fontSize: 22,
                  fontWeight: "900",
                  lineHeight: 30,
                  textAlign: "center",
                  marginTop: 24,
                }}
              >
                {this.MetaConstants.referralCode}
              </Text>
              <Text
                style={{
                  height: "auto",
                  color: "#222529",
                  fontFamily: "Avenir-Medium",
                  fontSize: 14,
                  fontWeight: "500",
                  lineHeight: 22,
                  textAlign: "center",
                  marginTop: 16,
                  marginBottom: 24,
                }}
              >
                {this.MetaConstants.enterReferralCode}
              </Text>
              <View>
                <NewTextInput
                  hideTitle={true}
                  labelValue={this.MetaConstants.agentReferralText}
                  placeholder={this.MetaConstants.agentReferralText}
                  exception={false}
                  keyboardType={"number-pad"}
                  autoCorrect={false}
                  presetValue={
                    !this.state.code
                      ? this.props.navigation.getParam("referalCode", "")
                      : ""
                  }
                  returnKeyType={"send"}
                  onChange={content => {
                    this.setState({
                      code: content,
                    });
                  }}
                  errorMessage={this.state.CodeErrorMessage}
                  exception={this.state.CodeException}
                  onBlur={() => {
                    this.resetErr("CodeErrorMessage", "CodeException");
                  }}
                  onFocus={() => {
                    this.resetErr("CodeErrorMessage", "CodeException");
                  }}
                  onSubmit={e => {
                    this._onSendCode();
                  }}
                  showTipOnFocus={true}
                />
                <View
                  style={{
                    marginBottom: 24,
                    alignItems:"center"
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 220,
                      height: 44,
                      borderRadius: 22,
                      justifyContent: "center",
                      alignItems: "center",
                      flexShrink: 0,
                      backgroundColor: "#ED1B2E",
                    }}
                    onPress={() => {
                      this._onSendCode();
                    }}
                    accessibilityLabel="home"
                    accesible
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#FFFFFF",
                        fontFamily: "Avenir",
                        fontWeight: "500",
                        lineHeight: 22,
                      }}
                    >
                      {this.MetaConstants.submit}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {firstTimeLogin && (
                <View dataTestRef="firstTimeSkipMessage">
                  <Text>
                    If you choose to "Skip" at this time, you may enter your
                    referral code by editing your profile
                  </Text>
                </View>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.profile,
    redeem: state.redeem,
  };
};

export default connect(mapStateToProps, {
  validateAgentReferralCode: (code) => {
      const type = CoreActionTypes.VALIDATE_AGENT_REFERRAL
      return {
          context: pageKeys.REWARD,
          type,
          payload: {
              referral: code.toString()
          }
      }
  },
  validateBoostCode: (code) => {
      return {
          context: pageKeys.REWARD,
          type: CoreActionTypes.VALIDATE_BOOST_CODE,
          payload: {
              boostCode: code
          }
      }
  },
  fetchUserDetail: () => ({
      context: pageKeys.PROFILE,
      type: CoreActionTypes.GET_CUSTOMER_DETAILS,
  }),
  navigateToLandingPage: () => ({
      context: pageKeys.LOGIN,
      type: CoreActionTypes.GET_CUSTOMER_DETAILS,
  }),
})(RewardsRecommend);

import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView, Image, TextInput } from "react-native";

import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers,
  ElementErrorManager,
} from "@pru-rt-internal/pulse-common";

import styles from "./styles";
import { PropTypes } from "prop-types";
import { GREEN_TICK } from "../../config/images";

const helpers = metaHelpers;
const { pageKeys, SCREEN_KEY_ACCOUNT } = CoreConfig;

const KEY_SUBTITLE = "currentsetting";
const KEY_CONNECTED = "youareconnected";
const KEY_EMAIL = "email";
const KEY_PASSWORD = "password";
const KEY_CHANGE_PASSWORD = "changepassword";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "email",
    };
    this.settings = this.settings.bind(this);
  }

  onChangePassword = () => {
    this.props.goToChangePassword();
  };

  settings() {
    const accountScreen = helpers.findScreen(SCREEN_KEY_ACCOUNT);
    const title = accountScreen.label;
    const subTitle = helpers.findElement(SCREEN_KEY_ACCOUNT, KEY_SUBTITLE)
      .label;
    const connected = helpers.findElement(SCREEN_KEY_ACCOUNT, KEY_CONNECTED)
      .label;
    const email = helpers.findElement(SCREEN_KEY_ACCOUNT, KEY_EMAIL).label;
    const password = helpers.findElement(SCREEN_KEY_ACCOUNT, KEY_PASSWORD)
      .label;
    const changePassword = helpers.findElement(
      SCREEN_KEY_ACCOUNT,
      KEY_CHANGE_PASSWORD
    ).label;
    return (
      <View style={styles.contentView}>
        <Text style={styles.title}>{title}</Text>
        <View>
          <Text style={styles.subTitle}>{subTitle}</Text>
          <View style={styles.firstContainer}>
            <Image
              source={GREEN_TICK}
              style={styles.imageStyle}
            />
            <Text style={styles.label}>
              {connected}
              {this.props.isSocialLoggedIn
                ? ` ${this.props.socialLoginType
                    .split("_")
                    .pop()
                    .toLowerCase()}`
                : ` ${email.toLowerCase()}`}
            </Text>
          </View>
          {!this.props.isSocialLoggedIn && (
            <View style={styles.changePassContainer}>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.label, styles.changePassLabel]}>
                  {email}
                </Text>
                <Text style={styles.label}>{this.props.email}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.label, styles.changePassLabel]}>
                  {password}
                </Text>
                <TextInput
                  editable={false}
                  style={styles.passwordLabel}
                  secureTextEntry
                  value="Test12345"
                />
              </View>
              <Text
                style={[styles.label, styles.actionButton]}
                onPress={e => {
                  e.preventDefault();
                  this.onChangePassword();
                }}
              >
                {changePassword}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  render() {
    ElementErrorManager.setCurrentScreen(SCREEN_KEY_ACCOUNT);
    return <ScrollView style={styles.container}>{this.settings()}</ScrollView>;
  }
}

Account.propTypes = {
  isSocialLoggedIn: PropTypes.bool,
  socialLoginType: PropTypes.string,
};

const mapStateToProps = state => ({
  email: state.profile.email,
  sessionId: state.auth.token,
  socialLoginType: state.account.socialAccessType,
  isSocialLoggedIn: state.account.isSocialLoggedIn,
});

export default connect(
  mapStateToProps,
  {
    goToChangePassword: () => ({
      context: pageKeys.ACCOUNT_SCREEN,
      type: CoreActionTypes.KEY_CHANGE_PASSWORD,
    }),
  }
)(Account);

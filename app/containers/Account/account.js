import {
  View,
  ScrollView,
  Text,
  Animated,
  Modal,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";

import {
  CoreActionTypes,
  CoreConfig,
  CoreActions,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";
const {
  pageKeys,
  NEW_PROVIDEFEEDBACK,
  NEW_PROVIDEFEEDBACK_THANK,
  NEW_PRPFILE,
  NEW_PRPFILE_YOURPROFILEHAS,
  NEW_SECURITY,
  NEW_SECURITY_PASSWORDCHANGED,
  HOMETAB_ACCOUNT,
  SCREEN_KEY_HOME_TAB,
} = CoreConfig;

import { screenFeatures } from "../../core/Features";
const { dispatchFeedbackReset } = CoreActions;
const { CHANGE_PASSWORD_RESET, RESET_UPDATE_NOTIFICATION } = CoreActionTypes;
import PruCamera from "../../components/PruCamera";
import {
  gotoRewardCentre,
  checkScreenFeatures,
  getScreenRenderingConfig,
} from "../../actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles";
import { PruHeaderText } from "../../components";
import PulseAppHeader from "../../components/PulseAppHeader";
import { AVATAR, NEW_SETTINGS_ICON } from "../../config/images";

import PropTypes from "prop-types";
import VerticalGroupedLayout from "../../components/ScreenLayouts/VerticalGroupedLayout";
import config from "./account-layout-defn.json";
import { clone } from "ramda";

import MetaConstants from "./meta";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const findElement = (screenKey, elementKey) =>
  metaHelpers.findElement(screenKey, elementKey) || {
    label: elementKey,
  };
// eslint-disable-next-line react/require-optimization
class NewAccount extends Component {
  constructor(props) {
    super(props);
    (this.fadeOutOpacity = new Animated.Value(100)),
      (this.opacityAnime = new Animated.Value(0)),
      (this.animatedXValue = new Animated.Value(-windowHeight)),
      (this.state = {
        showCamera: false,
      });
    this.MetaConstants = {
      ...MetaConstants.initializeScreenMeta()
    };
  }

  componentDidMount() {
    const { resetProfileNotification, checkScreenFeatures } = this.props;
    resetProfileNotification();
    checkScreenFeatures(screenFeatures[pageKeys.ACCOUNT_SCREEN]);
    // this.props.setAcctScreenConfig();
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.onRefresh();
      }
    );
  }

  onRefresh = () => {
    this.props.getScreenRenderingConfig({
      id: `m::doc::account_menu_${this.props.language}`,
    });
  };

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  callXToast() {
    Animated.timing(this.animatedXValue, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      this.closeXToast();
    });
  }

  closeXToast() {
    const {
      resetProfileNotification,
      resetPassword,
      dispatchFeedbackReset,
    } = this.props;
    setTimeout(() => {
      Animated.timing(this.animatedXValue, {
        toValue: -windowWidth,
        duration: 350,
        useNativeDriver: true,
      }).start(() => {
        resetProfileNotification();
        resetPassword();
        dispatchFeedbackReset();
      });
    }, 3000);
  }

  renderGrid = () => {
    return <VerticalGroupedLayout config={this.props.accountScreenConfig} />;
  };

  showThatsAll = () => {
    if (this.MetaConstants.thatsAllConfig == "enable")
      return (
        <View style={{ justifyContent: 'center', alignItem: 'center', padding: 10 }}>
          <Text style={JSON.parse(this.MetaConstants.thatsAllStyle)}>{this.MetaConstants.thatsAllText}</Text>
        </View>
      )
    return null
  }

  // eslint-disable-next-line complexity
  render() {
    const {
      userIcon,
      // country,
      changePasswordSuccess,
      feedback,
      userProfile,
    } = this.props;
    const { submitFeedbackDone } = feedback;
    const accountHeader = findElement(SCREEN_KEY_HOME_TAB, HOMETAB_ACCOUNT)
      .label;
    let notification = "";
    if (submitFeedbackDone) {
      notification = findElement(NEW_PROVIDEFEEDBACK, NEW_PROVIDEFEEDBACK_THANK)
        .label;

      this.callXToast();
    }

    if (changePasswordSuccess) {
      notification = findElement(NEW_SECURITY, NEW_SECURITY_PASSWORDCHANGED)
        .label;

      this.callXToast();
    }

    if (userProfile.updatingUserNotification) {
      notification = findElement(NEW_PRPFILE, NEW_PRPFILE_YOURPROFILEHAS).label;

      this.callXToast();
    }
    const showHeaderBackButton = this.props.navigation.getParam("showBackButton") || false;

    return (
      <View style={styles.container}>
        {notification !== "" ? (
          <Animated.View
            style={[
              styles.toastAnime,
              { transform: [{ translateX: this.animatedXValue }] },
            ]}
          >
            <View style={styles.notificationView}>
              <Text style={styles.notificationText}>{notification || ""}</Text>
            </View>
          </Animated.View>
        ) : null}

        <PulseAppHeader showBackButton={showHeaderBackButton} onPress={null} goBack={this.props.goBack}/>
        <PruHeaderText text={accountHeader} style={styles.headerText} />
        <ScrollView
          onMomentumScrollEnd={() => this.setState({ reachedScrollEnd: true })}
        >
          {/* <TouchableOpacity style={{
              flex: -1,
              flexDirection: "row",
              marginLeft: 30.5,
              paddingVertical: 33,
              borderBottomColor: "#dcdcdc",
              borderBottomWidth: 0.3,
              paddingRight: 18,
            }}
              onPress={() => {
                console.log("::::jnjkdbkjdvjkvkj")
              }}
            >
            <Image style={{
              alignSelf: "center",
              height: 20,
              justifyContent: "flex-start",
              width: 18,
            }} resizeMode={"contain"} source={NEW_SETTINGS_ICON} />
            <Text style={{
              color: "#434343",
              fontFamily: "Avenir-Light",
              fontSize: 14,
              marginLeft: 15,
            }}>Customize</Text>
          </TouchableOpacity> */}
          <View style={styles.accountListView}>{this.renderGrid()}</View>
          {this.state.reachedScrollEnd && this.showThatsAll()}
        </ScrollView>
        <Modal visible={this.state.showCamera}>
          <PruCamera
            setPicture={this.setPicture}
            closeCamera={this.closeCamera}
          />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.profile,
    userCountryDetails: state.auth.countryInfo,
    isFaceAuthEnrolled: state.auth.isFaceAuthEnrolled,
    babylonUserLoggedIn: state.babylonAuth.babylonUserLoggedIn,
    socialAccessType: state.account.socialAccessType,
    feedback: state.feedback,
    userIcon: state.profile.profilePicture,
    language: state.userPreferences.language,
    changePasswordSuccess: state.auth.changePasswordSuccess,
    country: state.auth.countryInfo.simCountry,
    accountScreenConfig: state.screenConfig.Account,
  };
};

export default connect(mapStateToProps, {
  goBack: () => ({
    type: CoreActionTypes.GO_BACK_TO_PREVIOUS_SCREEN
  }),
  resetPassword: () => ({
    context: pageKeys.ACCOUNT_SCREEN,
    type: CHANGE_PASSWORD_RESET,
  }),
  resetProfileNotification: () => ({
    context: pageKeys.ACCOUNT_SCREEN,
    type: RESET_UPDATE_NOTIFICATION,
  }),
  setAcctScreenConfig: () => ({
    type: CoreActionTypes.CMS_GET_SCREEN_CONFIG_SUCCESS,
    payload: {
      response: {
        body: {
          Account: clone([config])[0],
        },
      },
    },
  }),
  gotoRewardCentre,
  dispatchFeedbackReset,
  getScreenRenderingConfig,
  checkScreenFeatures,
})(NewAccount);

NewAccount.propTypes = {
  userProfile: PropTypes.instanceOf(Object),
  resetProfileNotification: PropTypes.func,
  checkScreenFeatures: PropTypes.func,
  resetPassword: PropTypes.func,
  dispatchFeedbackReset: PropTypes.func,
  getScreenRenderingConfig: PropTypes.func,
  changePasswordSuccess: PropTypes.bool,
  submitFeedbackDone: PropTypes.bool,
  feedback: PropTypes.instanceOf(Object),
  userIcon: PropTypes.string,
  language: PropTypes.string,
  accountScreenConfig: PropTypes.object,
  userCountryDetails: PropTypes.object,
  navigation: PropTypes.object,
};

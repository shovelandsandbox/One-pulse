import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { includes } from "ramda";
import PruDetailArrowCell from "../../components/PruDetailArrowCell";
import { connect } from "react-redux";
import {
  NEW_PRIVACY_ICON,
  NEW_SETTINGS_ICON,
  NEW_SIGN_OUT,
  NEW_PROFILE_ICON,
  NEW_FEEDBACK_ICON_,
  REWARD_ICON_RED,
  NOTIFICATION_ICON_RED,
  POLICY_ICON,
  FITNESS_TRACKER
} from "../../config/images";
// import icons from "../../config/images";
import {
  CoreActionTypes,
  CoreConfig,
  CoreActions,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;

const {
  doAppLogout,
  doSocialLogout,
  resetFingerPrintBoolean,
  babylonLogout,
  clearBabylonUserData,
  clearChatData,
} = CoreActions;

class ProfileTile extends PureComponent {
  getKey = key => CoreConfig[key] || key;

  findElement = (screenKey, elementKey) =>
    metaHelpers.findElement(
      this.getKey(screenKey),
      this.getKey(elementKey)
    ) || {
      label: elementKey,
    };

  getToast = ({ toastScreenKey, toastElementKey }) =>
    this.findElement(toastScreenKey, toastElementKey).label;

  getCellName({ screenKey, elementKey }) {
    return this.findElement(screenKey, elementKey).label;
  }

  iconMap = {
    NEW_PROFILE_ICON: NEW_PROFILE_ICON,
    NEW_SETTINGS_ICON: NEW_SETTINGS_ICON,
    REWARD_ICON_RED: REWARD_ICON_RED,
    NOTIFICATION_ICON_RED: NOTIFICATION_ICON_RED,
    NEW_FEEDBACK_ICON_: NEW_FEEDBACK_ICON_,
    NEW_PRIVACY_ICON: NEW_PRIVACY_ICON,
    NEW_SIGN_OUT: NEW_SIGN_OUT,
    POLICY_ICON: POLICY_ICON,
    FITNESS_TRACKER: FITNESS_TRACKER
  };

  getPayload = screenPath => {
    return {
      path: screenPath,
      userData: {
        ...this.props.userProfile,
        profilePicture: this.props.userIcon,
      },
      editable: true,
      related: false,
      newProfile: false,
    };
  };

  onLogoutPress() {
    const {
      babylonUserLoggedIn,
      babylonLogout,
      clearChatDataAction,
      clearBabylonUserDataAction,
      destroyBabylonChat,
      socialAccessType,
      doAppLogout,
      resetFingerPrintBoolean,
    } = this.props;
    let socialLoginType = "";
    if (socialAccessType) {
      socialLoginType = socialAccessType.socialAccessType;
    }
    if (babylonUserLoggedIn) {
      babylonLogout();
      destroyBabylonChat();
    }
    clearBabylonUserDataAction();
    clearChatDataAction();
    resetFingerPrintBoolean();
    doAppLogout();
    doSocialLogout(socialLoginType);
  }

  onClick = actionType => {
    switch (actionType) {
      case "logout":
        return this.onLogoutPress();
      default:
        this.props.handler("click", this.getPayload(actionType));
    }
  };

  checkVisibility = (properties, country) => {
    return properties.countries === undefined ||
      includes(country, properties.countries)
      ? properties.visibility
      : false;
  };

  render() {
    let { properties } = this.props;
    const { country } = this.props;
    const cellName = this.getCellName(properties);
    const icon = this.iconMap[properties.icon];
    const toastText = this.getToast(properties);
    const visibility = this.checkVisibility(properties, country);
    properties = { ...properties, cellName, icon, toastText };
    if (!visibility) {
      return null;
    }
    return (
      <PruDetailArrowCell
        {...properties}
        key={properties.actionType}
        onclick={() => this.onClick(properties.actionType)}
      />
    );
  }
}

ProfileTile.propTypes = {
  properties: PropTypes.object,
  handler: PropTypes.func,
  actionType: PropTypes.object,
  userProfile: PropTypes.object,
  country: PropTypes.string,
  babylonUserLoggedIn: PropTypes.any,
  babylonLogout: PropTypes.any,
  clearChatDataAction: PropTypes.any,
  clearBabylonUserDataAction: PropTypes.any,
  destroyBabylonChat: PropTypes.any,
  socialAccessType: PropTypes.any,
  doAppLogout: PropTypes.any,
  resetFingerPrintBoolean: PropTypes.any,
};

ProfileTile.defaultProps = {};

const mapStateToProps = state => {
  return {
    userProfile: state.profile,
    babylonUserLoggedIn: state.babylonAuth.babylonUserLoggedIn,
    socialAccessType: state.account.socialAccessType,
    userIcon: state.profile.profilePicture,
    country: state.auth.countryInfo.simCountry,
    language: state.userPreferences.language,
  };
};

export default connect(mapStateToProps, {
  babylonLogout,
  resetFingerPrintBoolean,
  doAppLogout,
  clearChatDataAction: clearChatData,
  clearBabylonUserDataAction: clearBabylonUserData,
  destroyBabylonChat: () => ({
    context: pageKeys.CHAT_CONVERSATION,
    type: CoreActionTypes.DESTROY_BABYLON_CHAT,
  }),
})(ProfileTile);

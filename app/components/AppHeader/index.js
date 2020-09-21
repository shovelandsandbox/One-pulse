import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import {
  NEW_PULSE_LOGO,
  NEW_PULSE_LOGO_VARIED,
  NEW_PULSE_LOGO_TAIWAN,
  REWARD_ICON,
  NOTIFICATION_ICON,
  MENU_LEFT_ARROW_WHITE
} from "../../config/images";
import { gotoNotificationCentre, gotoAccountsTab } from '../../actions';
import Styles from './styles';
import { path } from "ramda";
import {
  CoreActionTypes
} from "@pru-rt-internal/pulse-common";
const configureLogo = country => {
  switch (country) {
    case "PH":
      return NEW_PULSE_LOGO_VARIED;
    case "TW":
      return NEW_PULSE_LOGO_TAIWAN;
  }
  return NEW_PULSE_LOGO;
};

const HeaderActionIcon = ({ icon, count, callback, imageStyles, countPosition }) => (

  <View>
    <TouchableOpacity onPress={(e) => { e.preventDefault(); callback(); }}>
      <Image source={icon} style={imageStyles} />
      <View style={[Styles.countContainer, { ...countPosition }]}>
        <Text style={Styles.countStyle}>{count}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const AppHeaderComponent = props => {
  const {
    style,
    profilelogo,
    country,
    gotoNotificationCentre,
    unreadNotificationCount,
    showBackButton,
    profileImageClickable,
    gotoAccountsTab
  } = props;
  const applogo = configureLogo(country);
  return (
    <View style={style}>
      {showBackButton ?
        <TouchableOpacity onPress={() => { props.goBack(); }} style={Styles.backButtonContainer}>
          <Image source={MENU_LEFT_ARROW_WHITE} style={Styles.backButtonImage} />
        </TouchableOpacity> : null
      }
      <View style={Styles.logoContainer}>
        <Image source={applogo} style={Styles.logo} resizeMode={"contain"} />
      </View>

      <View style={Styles.actionContainer}>

        {/* //DO NOT remove this code, as we are going to place it later point
          <HeaderActionIcon 
            icon={REWARD_ICON}
            callback={()=>{}}
            count={0}
            imageStyles={{
              width: 22,
              height: 24,
            }}
            countPosition={{
              top: -4,
              right: -2
            }}
          />*/}
        <View style={Styles.rewardsNotificationContainer}>
          <HeaderActionIcon
            icon={NOTIFICATION_ICON}
            callback={gotoNotificationCentre}
            count={unreadNotificationCount}
            imageStyles={{
              width: 22,
              height: 24,
              marginRight: 10,
            }}
            countPosition={{
              top: -4,
              right: 5
            }}
          />
        </View>
        {profileImageClickable ?
          <TouchableOpacity
            style={Styles.profileContainer}
            onPress={gotoAccountsTab}
          >
            <Image style={Styles.profile} source={profilelogo} />
          </TouchableOpacity> :
          <View style={Styles.profileContainer}>
            <Image style={Styles.profile} source={profilelogo} />
          </View>
        }
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    unreadNotificationCount: state.notifications.unreadNotificationCount,
    country: path(["auth", "countryInfo", "simCountry"], state),
  };
};

export default connect(mapStateToProps, {
  goBack: () => ({
    type: CoreActionTypes.GO_BACK_TO_PREVIOUS_SCREEN
  }),
  gotoNotificationCentre,
  gotoAccountsTab
})(AppHeaderComponent);

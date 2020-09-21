/* eslint-disable */
import React from "react";
import {
  Image,
  View,
  Text,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import PruDetailArrowCell from "../../components/PruDetailArrowCell";
import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers,
  CoreActions
} from "@pru-rt-internal/pulse-common";
import { ABOUT, ABOUT_VARIED, ABOUT_TAIWAN } from "../../config/images";
import styles from "./styles";
const { dispatchFeedbackReset } = CoreActions;
const helpers = metaHelpers;

const {
  pageKeys,
  NEW_ABOUT,
  NEW_ABOUT_TERMSCONDITIONS,
  NEW_ABOUT_PRIVACYNOTICE,
  NEW_ABOUT_APPVERSION,
  NEW_ABOUT_ABOUT,
  NEW_ABOUT_PRUSHOP_TERMS_PRIVACY
} = CoreConfig;
const { GO_TO_TERMSANDCOND, GO_TO_PRIVACY_POLICY } = CoreActionTypes;
import { gotoNewTNC, gotoNewPrivacy, goToPruShopTnC } from "../../actions";

const isIphoneX = () => {
  const { height, width } = Dimensions.get("window");
  return Platform.OS === "ios" && (height >= 812 || width >= 812);
};
class NewAboutus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appVersion: ""
    };
  }

  componentDidMount() {
    this.props.resetPassword();
    this.props.resetProfileNotification();
    this.props.dispatchFeedbackReset();
    this.setState({ appVersion: this.props.userAgent.appVersion });
  }
  configureLogo = country => {
    switch (country) {
      case "PH":
        return ABOUT_VARIED;
      case "TW":
        return ABOUT_TAIWAN;
    }
    return ABOUT;
  };
  whichAction(action) {
    switch (action) {
      case 'terms':
        return this.props.gotoNewTNC();
      case 'privacy':
        return this.props.gotoNewPrivacy();
      case 'prushop':
        return this.props.goToPruShopTnC();
      default:
        return;
    }
  }

  render() {
    const { termsConditions } = this.props;
    const SCREEN_ABOUT_TERMSCONDITIONS = helpers.findElement(
      NEW_ABOUT,
      NEW_ABOUT_TERMSCONDITIONS
    ).label;
    const SCREEN_ABOUT_PRIVACYNOTICE = helpers.findElement(
      NEW_ABOUT,
      NEW_ABOUT_PRIVACYNOTICE
    ).label;
    const SCREEN_ABOUT_APPVERSION = helpers.findElement(
      NEW_ABOUT,
      NEW_ABOUT_APPVERSION
    ).label;
    const SCREEN_ABOUT_APPVERSION_NUMBER = `Pulse ${this.state.appVersion}`;
    const SCREEN_ABOUT_ABOUT = helpers.findElement(NEW_ABOUT, NEW_ABOUT_ABOUT)
      .label;
    const SCREEN_ABOUT_PRUSHOP_TERMS_PRIVACY = helpers.findElement(
      NEW_ABOUT,
      NEW_ABOUT_PRUSHOP_TERMS_PRIVACY
    ).label;
    const columns = [
      {
        cellName: SCREEN_ABOUT_TERMSCONDITIONS,
        thirdColumn: true,
        isSwitch: false,
        actionType: 'terms',
        thirdComponent: 'arrow',
        icon: null,
        visibility: true,
      },
      {
        cellName: SCREEN_ABOUT_PRIVACYNOTICE,
        thirdColumn: true,
        isSwitch: false,
        actionType: 'privacy',
        thirdComponent: 'arrow',
        visibility: true,
      },
      {
        cellName: SCREEN_ABOUT_PRUSHOP_TERMS_PRIVACY,
        thirdColumn: true,
        isSwitch: false,
        actionType: 'prushop',
        thirdComponent: 'arrow',
        visibility: termsConditions.Prushoppe?.consent == "ACCEPT"

      },
      {
        cellName: SCREEN_ABOUT_APPVERSION,
        thirdColumn: true,
        isSwitch: false,
        actionType: '',
        thirdComponent: 'text',
        thirdColumnText: SCREEN_ABOUT_APPVERSION_NUMBER,
        visibility: true,
      },
    ];
    const PULSE_LOGO = this.configureLogo(this.props.userCountryDetails.simCountry)
    return (
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <ScrollView contentContainerStyle={[styles.container]}>
          <Image
            resizeMode="contain"
            source={PULSE_LOGO}
            style={{
              marginBottom: 20,
              height: 44,
              width: 88,
            }}
          />
          <View style={{ width: '100%' }}>
            {
              columns.map(column => (
                column.visibility &&
                <PruDetailArrowCell
                  {...column}
                  key={column.cellName}
                  onclick={() => this.whichAction(column.actionType)}
                />
              ))
            }
          </View>
        </ScrollView>
        <Text
          style={{
            color: "#515B61",
            fontFamily: "Avenir",
            fontSize: 12,
            fontWeight: "300",
            lineHeight: 16,
            textAlign: "center",
            marginBottom: isIphoneX() ? 40 : 20,
            marginHorizontal: 40,
            alignSelf: "flex-end",
          }}
        >
          {SCREEN_ABOUT_ABOUT}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userAgent: state.auth.userAgent,
  userCountryDetails: state.auth.countryInfo,
  termsConditions: state.profile.termsConditions
});

export default connect(mapStateToProps, {
  goToTnC: () => ({
    context: pageKeys.ABOUT_US_SCREEN,
    type: GO_TO_TERMSANDCOND
  }),
  goToPrivacyPolicy: () => ({
    context: pageKeys.ABOUT_US_SCREEN,
    type: GO_TO_PRIVACY_POLICY
  }),
  resetPassword: () => ({
    context: pageKeys.ACCOUNT_SCREEN,
    type: CoreActionTypes.CHANGE_PASSWORD_RESET
  }),
  resetProfileNotification: () => ({
    context: pageKeys.ACCOUNT_SCREEN,
    type: CoreActionTypes.RESET_UPDATE_NOTIFICATION
  }),
  dispatchFeedbackReset,
  gotoNewTNC,
  gotoNewPrivacy,
  goToPruShopTnC
})(NewAboutus);

import React, { Component } from "react";
import { View, Image, Text, Share } from "react-native";
import MetaConstants from "./meta";
import { connect } from "react-redux";
import PruProgressSteps from "../../components/PruProgressSteps";
import PruToggleButton from "../../components/PruToggleButton";
import PruNumberCard from "../../components/PruNumberCard";
import { Theme } from "../../themes/";
const { Colors, Styles, Sizes } = Theme;
import styles from "./styles";
import { DUMMY_BARCODE, SHOW_FRIEND_ABOUT_PULSE } from "../../config/images";

import {
  CoreComponents,
  CoreConfig,
  CoreActionTypes
} from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;
const { AppButton } = CoreComponents;

class ReferAFriend extends Component {
  state = {
    activeTab: "invite"
  };

  constructor(props) {
    super(props);
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    this.steps = [
      {
        stepNumber: 1,
        stepName: this.metaConstants.referAFriendYouReferLabel
      },
      {
        stepNumber: 2,
        stepName: this.metaConstants.referAFriendTheyJoinLabel
      },
      {
        stepNumber: 3,
        stepName: this.metaConstants.referAFriendYouRewardLabel
      },
      {
        stepNumber: 4,
        stepName: this.metaConstants.referAFriendTheyRewardLabel
      }
    ];
  }

  componentWillMount() {
    this.props.getReferralCode();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.userLanguagePreference !== nextProps.userLanguagePreference
    ) {
      this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.equalShareContent}>
          <PruProgressSteps
            steps={this.steps}
            stepsStyle={styles.stepsStyle}
            stepsNumberStyle={styles.stepsNumberStyle}
            height={30}
            stepNameStyle={styles.stepNameStyle}
          ></PruProgressSteps>
          <View style={styles.equalShareContent}>
            <PruToggleButton
              leftLabel={this.metaConstants.referAFriendInviteLabel}
              rightLabel={this.metaConstants.referAFriendDashboardLabel}
              leftPress={() => {
                this.setState({ activeTab: "invite" });
              }}
              rightPress={() => {
                this.setState({ activeTab: "dashboard" });
              }}
              height={50}
              onColor={Colors.hkShade}
            ></PruToggleButton>
          </View>
        </View>
        {this.state.activeTab === "invite" ? (
          <View style={styles.equalShare2x}>
            <View style={styles.showYourFriendsContainer}>
              <Image
                style={styles.showYourFriendsImage}
                source={SHOW_FRIEND_ABOUT_PULSE}
              ></Image>
              <Text>{this.metaConstants.referAFriendShareQrCodeLabel}</Text>
            </View>
            <View style={styles.qrCodeContainer}>
              <Image
                style={styles.barCodeImage}
                source={{ uri: `data:image/jpeg;base64,${this.props.qrCode}` }}
              />
              <Text style={styles.barCodeText}>
                {this.metaConstants.referAFriendScanningAppStoreLabel}
              </Text>
            </View>
            <View style={styles.shareButtonContainer}>
              <AppButton
                type={[Styles.btn, Styles.primary, styles.shareButton]}
                title={this.metaConstants.referAFriendShareURLLabel}
                press={this.onShare}
              />
            </View>
          </View>
        ) : (
          <View style={[styles.equalShare2x, styles.alignHorizontally]}>
            <PruNumberCard
              cardStyle={styles.invitedBackgroud}
              numberDesc={this.metaConstants.referAFriendInvitedLabel}
              number={"0"}
            ></PruNumberCard>
            <PruNumberCard
              cardStyle={styles.joinedBackground}
              numberDesc={this.metaConstants.referAFriendJoinedLabel}
              number={"0"}
            ></PruNumberCard>
            <PruNumberCard
              cardStyle={styles.rewardsBackground}
              numberDesc={this.metaConstants.referAFriendRewardsLabel}
              number={"$0"}
            ></PruNumberCard>
          </View>
        )}
      </View>
    );
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message: this.props.referralDescription
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
}

const mapStateToProps = state => {
  return {
    qrCode: state.referralGroup.qrCode,
    referralCode: state.referralGroup.referralCode,
    referralDescription: state.referralGroup.referralDescription,
    referralStatus: state.referralGroup.referralStatus,
    auditDetail: state.referralGroup.auditDetail,
    userLanguagePreference: state.userPreferences.language
  };
};

export default connect(mapStateToProps, {
  getReferralCode: () => ({
    context: pageKeys.REFER_A_FRIEND,
    type: CoreActionTypes.GET_REFERRAL_CODE
  })
})(ReferAFriend);

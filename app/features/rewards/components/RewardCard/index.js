import React, { PureComponent } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { metaFinderRewards } from "../../../../features/rewards/configs/meta-utils";
import {
  ELEMENT_KEY_CLAIM,
  ELEMENT_KEY_COMPLETE,
  ELEMENT_KEY_CHECKNOW,
  ELEMENT_KEY_CHECK_BMI,
} from "../../../../features/rewards/configs/metaConstant";

import { connect } from "react-redux";

import { goToScreens } from "../../actions";
import { SR_ICON, REWARD_VOUCHER_HEAD } from "../../../../config/images";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { CoreActions } from "@pru-rt-internal/pulse-common";
import AppConfig from "../../../../config/AppConfig";

const { setEntreBabylon } = CoreActions;

class RewardCard extends PureComponent {
  handleGoPress = item => {
    const { goToScreens, gotoReferAFriend, gotoHealthAssessment } = this.props;
    let params = item.params;
    if (item.screenId === "newProfile") {
      params = {
        path: "newProfile",
        userData: {
          ...this.props.userProfile,
          profilePicture: this.props.userIcon,
        },
        editable: true,
        related: false,
        newProfile: false,
      };
    } else if (item?.params?.pageKey === "HEAHTH_ASSESSMENT") {
      gotoHealthAssessment();
      return;
    } else if (item.screenId === "BabylonTnCScreen") {
      this.nextAction(item);
      return;
    } else if (item.screenId === "ReferAFriend") {
      gotoReferAFriend();
      return;
    }
    goToScreens(params, item.screenId);
  };

  nextAction = item => {
    const { goToScreens, isRegDone, setEntreBabylon } = this.props;

    setEntreBabylon({ pageKey: "" });
    let screen = item.screenId;
    let params = item.params;
    if (isRegDone) {
      screen = "BabylonSymptomCheckerScreen";
      params = {};
    }
    goToScreens(params, screen);
  };

  isCompleted = item => {
    const { transactions } = this.props;

    const searched = transactions.find(obj => obj.referenceNo == item.id);

    if (item.id === "Your friend just registered on Pulse.") {
      //This string is the ReferenceNo unique id for identifying the refer a friend transactions
      const result = transactions.filter(obj => obj.referenceNo == item.id);
      return result.length >= 25;
    } else if (searched) {
      return true;
    }
    return false;
  };

  render() {
    const { item, style } = this.props;
    const isCompleted = this.isCompleted(item);
    const value = isCompleted
      ? metaFinderRewards(ELEMENT_KEY_COMPLETE)
      : metaFinderRewards(ELEMENT_KEY_CHECKNOW);

    return (
      <ImageBackground
        style={[
          {
            width: 200,
            height: 240,
            backgroundColor: "#000",
            borderRadius: 20,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "space-between",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.7,
            shadowRadius: 3,
            elevation: 4,
            // margin: 4,
          },
          style ? style : null,
        ]}
        imageStyle={{ opacity: 1 }}
        source={{
          uri: AppConfig.getCMSUrl() + item.url,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "#FFF",
              paddingTop: 10,
              fontSize: 18,
              fontWeight: "900",
              textAlign: "center",
            }}
          >
            {item.activityName}
          </Text>
          {item.type !== "voucher" ? (
            <Text
              style={{
                color: "#FFF",
                fontSize: 12,
                textAlign: "center",
                padding: 6,
              }}
            >
              {item.desc}
            </Text>
          ) : null}
        </View>
        <View style={{ alignItems: "center" }}>
          {item.type === "voucher" ? (
            <>
              <Image
                source={REWARD_VOUCHER_HEAD}
                style={{ width: 38, height: 38, tintColor: "#FFF" }}
              />
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 12,
                  textAlign: "center",
                  padding: 6,
                }}
              >
                {item.desc}
              </Text>
            </>
          ) : (
            <>
              <Image source={SR_ICON} style={{ width: 42, height: 42 }} />
              <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>
                {item.badgeCount}
              </Text>
            </>
          )}
        </View>
        {isCompleted ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <MaterialIcons
              style={{
                alignSelf: "center",
                margin: 6,
                marginLeft: -16,
                backgroundColor: "white",
                borderRadius: 20,
              }}
              name="check-circle"
              size={24}
              color="#216e3f"
            />
            <Text style={{ color: "#FFF", fontSize: 14 }}>{value}</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "#ec1c2e",
              width: "100%",
              alignItems: "center",
              paddingVertical: 12,
            }}
            onPress={() => this.handleGoPress(item)}
          >
            <Text style={{ color: "#FFF" }}>{value}</Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.profile,
    userIcon: state.profile.profilePicture,
    isRegDone: state.babylonAuth.babylonUserLoggedIn,
    transactions: state.rewardCenter.transactions,
  };
};

export default connect(mapStateToProps, {
  goToScreens,
  setEntreBabylon,
  gotoReferAFriend: () => ({
    context: "CMS_DISPATCHES",
    type: "REFERRALS",
    payload: {},
  }),
  gotoHealthAssessment: () => ({
    context: "PulseHealth",
    type: "BABYLON_GOTO_HEALTHASSESSMENT",
  }),
})(RewardCard);

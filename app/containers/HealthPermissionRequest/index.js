/* eslint-disable */
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Modal,
  Platform
} from "react-native";
import { HEALTH_PERMISSION_REQUEST_BG, CLOSE_PAGE } from "../../config/images";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AHK from "rn-apple-healthkit";
import * as GoogleFitService from "../../utils/GoogleFitServices";
import {
  CoreConfig,
  CoreComponents,
  metaHelpers,
  CoreSelectors
} from "@pru-rt-internal/pulse-common";
const { AuthSelector } = CoreSelectors;
const { TrackActivity } = CoreComponents;
const {
  HOMECHALLENGES,
  HOMECHALLENGES_HEALTHDATA,
  HOMECHALLENGES_PERMISSION
} = CoreConfig;

class HealthPermissionRequest extends Component {
  _goBack() {
    this.props.navigation.goBack();
  }

  _requestHealthKitPermissions() {
    if (Platform.OS == "ios") {
      const options = {
        permissions: {
          read: ["StepCount", "ActiveEnergyBurned", "DistanceWalkingRunning"]
        }
      };

      AHK.initHealthKit(options, (err, results) => {
        if (err) {
          return;
        }
      });
    } else {
      GoogleFitService.authorizeFitnessTracking(
        err => {
          if (!err) {
            GoogleFitService.startTracking(() => {
              GoogleFitService.fetchLatestFitnessData().then(res => {
                this.props.setFitnessData(res); //传出的steps、distance、calories集合
              });
            }, refreshInterval); //refreshInterval传入的时间集合
          }
        },
        "11111", //请求权限的title
        "2222" //请求权限的message
      );
    }
  }

  renderActivityTracking = isNotNowRow => {
    return (
      <View style={[styles.centerContent]}>
        <TrackActivity {...this.props} isNotNowRow={isNotNowRow} />
      </View>
    );
  };
  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff"
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row-reverse",
            height: 44
          }}
        >
          <TouchableOpacity
            style={{
              width: 44,
              justifyContent: "center"
            }}
            onPress={this._goBack.bind(this)}
          >
            <Image
              style={{
                alignSelf: "center"
              }}
              source={CLOSE_PAGE}
            />
          </TouchableOpacity>
        </View>
        <Image
          style={{
            marginTop: 40,
            alignSelf: "center",
            width: "100%"
          }}
          source={HEALTH_PERMISSION_REQUEST_BG}
        />
        {metaHelpers.findElement(HOMECHALLENGES, HOMECHALLENGES_HEALTHDATA) &&
          metaHelpers.findElement(HOMECHALLENGES, HOMECHALLENGES_HEALTHDATA)
            .label && (
            <Text
              style={{
                marginTop: 20,
                color: "#515B61",
                fontFamily: "Avenir",
                fontSize: 22,
                fontWeight: "900",
                textAlign: "center"
              }}
            >
              {
                metaHelpers.findElement(
                  HOMECHALLENGES,
                  HOMECHALLENGES_HEALTHDATA
                ).label
              }
            </Text>
          )}
        {metaHelpers.findElement(HOMECHALLENGES, HOMECHALLENGES_PERMISSION) &&
          metaHelpers.findElement(HOMECHALLENGES, HOMECHALLENGES_PERMISSION)
            .label && (
            <Text
              style={{
                marginTop: 20,
                marginHorizontal: 40,
                color: "#222529",
                fontFamily: "Avenir",
                fontSize: 16,
                fontWeight: "300",
                textAlign: "center"
              }}
            >
              {
                metaHelpers.findElement(
                  HOMECHALLENGES,
                  HOMECHALLENGES_PERMISSION
                ).label
              }
            </Text>
          )}
        <View
          style={{
            height: 20
          }}
        ></View>

        {this.renderActivityTracking(false)}
        {JSON.stringify(this.props.fitnessTracker.steps)}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    meta: state.meta,
    language: state.userPreferences.language,
    sessionId: state.auth.token,
    userProfile: state.profile,
    isNewUser: state.auth.isNewUser,
    bmiLoading: state.bmi.loading,

    babylonToken: AuthSelector.getBabylonToken(state),
    babylonStatus: state.auth.babylonStatus,
    healthFlowsData: state.healthCheck.healthFlows,
    bmiResponse: state.bmi.successData,
    fitnessTracker: state.fitnessTracker,
    babylonScStatus: state.register.babylonScStatus,
    babylonHaStatus: state.register.babylonHaStatus,
    babylonUserLoggedIn: state.babylonAuth.babylonUserLoggedIn,
    regStatus: state.regAIME.registrationStatus,
    currentTour: state.tour.currentTour,
    BMIResponse: state.bmi.BMIResponse,
    BMIErrorMessage: state.bmi.errorMess.errorMsg,
    successFeedbackData: state.bmi.successFeedbackData,
    isBMIFeedbackCall: state.bmi.isFeedbackCall,
    isNotificationProcessed: state.userPreferences.notificationProcessed
  };
};
export default connect(mapStateToProps, {})(HealthPermissionRequest);

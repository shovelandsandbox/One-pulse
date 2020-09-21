/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-key */
/* eslint-disable react/require-optimization */
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
} from "react-native";
import { connect } from "react-redux";
import pruRatingsStyle from "./styles";
import MetaConstants from "./meta";
import PruRoundedButton from "../../../components/PruRoundedButton";
import {
  RATINGS_STAR_BORDER,
  ABOUT_VARIED,
  FEEDBACK_MODAL_IMAGE,
  RATING_YELLOW_STAR2,
} from "../../../config/images";
import {
  CoreUtils,
} from "@pru-rt-internal/pulse-common";
import {
  firebaseEvents,
  platformEvents
} from "../events";
import { dispatchEvent } from "../../../actions";
import { path } from "ramda";
const { logFirebaseEvent } = CoreUtils;

class AppRatingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRating: 0,
    };

    this.MetaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    logFirebaseEvent(firebaseEvents.RatingModalOpenEvent.name, firebaseEvents.RatingModalOpenEvent.params);
  }

  getRatingStyleBasedOnSelection = (selectedRating, itemValue) => {
    let rateLevelBackground = {};
    if (itemValue <= selectedRating) {
      rateLevelBackground = pruRatingsStyle.selectedYellow;
    }
    if (selectedRating > 3 && itemValue <= selectedRating) {
      rateLevelBackground = pruRatingsStyle.selectedGreen;
    }
    return rateLevelBackground;
  };

  onRateSelection = selectedNumber => {
    this.setState({ selectedRating: selectedNumber });
  };

  onCancel = () => {
    logFirebaseEvent(firebaseEvents.RatingSkipEvent.name, firebaseEvents.RatingSkipEvent.params);
    platformEvents.RatingSkipEvent.attributes.appVersion = path(["auth", "userAgent", "appVersion"], this.props);
    this.props.dispatchEvent(platformEvents.RatingSkipEvent);
    this.closeRatingModal();
  };

  closeRatingModal = () => {
    this.props.openRatingModal({
      showModal: false
    });
  };

  onSubmit = () => {
    if (this.state.selectedRating == 0) {
      alert(this.MetaConstants.AppRatingAlertMsg);
    } else {
      firebaseEvents.RatingSubmitEvent.params.value = this.state.selectedRating;
      platformEvents.RatingSubmitEvent.attributes.value = this.state.selectedRating;
      platformEvents.RatingSubmitEvent.attributes.appVersion = path(["auth", "userAgent", "appVersion"], this.props);
      logFirebaseEvent(firebaseEvents.RatingSubmitEvent.name, firebaseEvents.RatingSubmitEvent.params);
      this.props.dispatchEvent(platformEvents.RatingSubmitEvent);
      if (this.state.selectedRating >= 4) {
        if (Platform.OS != "ios") {
          //To open the Google Play Store
          Linking.openURL(
            "https://play.google.com/store/apps/details?id=com.prudential.pulse.my&hl=en_IN"
          ).catch(err => alert("Please check for the Google Play Store"));
        } else {
          //To open the Apple App Store
          Linking.openURL(
            `https://apps.apple.com/sg/app/pulse-by-prudential/id1507904780`
          ).catch(err => alert("Please check for the App Store"));
        }
      }
      this.closeRatingModal();
    }
  };

  render() {
    const ratingTitles = [
      {
        value: 1,
      },
      {
        value: 2,
      },
      {
        value: 3,
      },
      {
        value: 4,
      },
      {
        value: 5,
      },
    ];
    const { selectedRating } = this.state;
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          margin: 5,
          borderRadius: 5,
          height: 350
        }}
      >
        <Image style={pruRatingsStyle.doclogo} source={FEEDBACK_MODAL_IMAGE} />
        <View style={{ marginTop: 10, marginLeft: 10 }}>
      <Text style={{ fontSize: 20, color: "#828282" }}>{this.MetaConstants.AppratingExperience}</Text>

          <Text
            style={{
              marginTop: 10,
              fontSize: 12
            }}
          >
            {this.MetaConstants.AppRatingTitle}
          </Text>
          <Text style={{ marginTop: 10, fontSize: 12, color: "#828282", alignSelf: 'center' }}>      
                {this.MetaConstants.AppRatingThanks}
          </Text>
        </View>

        <View style={pruRatingsStyle.ratingContainer}>
          {ratingTitles.map((tile, index) => {
            return (
              <TouchableOpacity
                onPress={() => this.onRateSelection(tile.value)}
              >
                <View style={pruRatingsStyle.ratingItem}>
                  <Image
                    source={
                      index < selectedRating
                        ? RATING_YELLOW_STAR2
                        : RATINGS_STAR_BORDER
                    }
                    style={pruRatingsStyle.ratingStarSize}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={pruRatingsStyle.buttonView}>
          <TouchableOpacity
            style={pruRatingsStyle.submitButtonStyle}
            onPress={() => this.onCancel()}
          >
            <Text style={pruRatingsStyle.buttonText}>{this.MetaConstants.AppRatingSkip}</Text>
          </TouchableOpacity>
          <PruRoundedButton
            textStyling={pruRatingsStyle.buttonText1}

            style={pruRatingsStyle.continueButtonStyle}
            buttonTitle={this.MetaConstants.AppRatingSubmit}
            onPress={() => this.onSubmit()}

          ></PruRoundedButton>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {
  openRatingModal: payload => ({
    type: "SHOW_MODAL_FOR_APP_RATING",
    payload,
  }),
  dispatchEvent
})(AppRatingScreen);

import React from "react";
import { View, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import { Theme } from "../../themes";
const { Styles, Colors, Fonts } = Theme;
import { events, CoreActionTypes } from "@pru-rt-internal/pulse-common";
import _ from "lodash";
import { makeTouchable } from "../../hocs";
const TouchableView = makeTouchable(View);
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import MetaConstants from "./meta";
import BmiWrinkleResult from "../../components/BmiWrinkleResult";

class WrinkleIndex extends React.Component {
  constructor(props) {
    super(props);
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.userLanguagePreference !== nextProps.userLanguagePreference
    ) {
      this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
  }

  prepareShareButton = () => {
    return (
      <TouchableView
        event={events.ShareBMI}
        onPress={this.onPress}
        style={styles.shareButtonStyle}
      >
        <MaterialIcons
          style={{ marginHorizontal: 5 }}
          name="share"
          size={18}
          color="white"
        />
        <Text style={{ color: Colors.white, fontSize: 17 }}>
          Share
          {/* {this.metaConstants.wrinkleIdxResultsShare} */}
        </Text>
      </TouchableView>
    );
  };

  viewMoreTipsButton = () => {
    return (
      <TouchableView
        event={events.ShareBMI}
        onPress={this.onPress}
        style={styles.viewMoreTipsButton}
      >
        <Text style={styles.vieMoreTipsText}>
          {this.metaConstants.wrinkleIdxResultsViewMoreLabel}
        </Text>
      </TouchableView>
    );
  };

  getWrinkleColor(wrinklePercentage) {
    if (wrinklePercentage < 10) {
      return "#77D97B";
    } else if (wrinklePercentage < 30) {
      return "#FFB330";
    } else if (wrinklePercentage < 50) {
      return "#D9BF77";
    } else if (wrinklePercentage < 70) {
      return "#E9526B";
    } else {
      return "#FF002A";
    }
  }

  getWrinkleStatus(wrinklePercentage) {
    if (isNaN(wrinklePercentage)) {
      return "";
    }
    if (wrinklePercentage < 10) {
      return this.metaConstants.noVisiblyWrinkleLabel;
    } else if (wrinklePercentage < 30) {
      return this.metaConstants.shallowWrinkleLabel;
    } else if (wrinklePercentage < 50) {
      return this.metaConstants.someWrinkleLabel;
    } else if (wrinklePercentage < 70) {
      return this.metaConstants.moderateWrinkleLabel;
    } else if (wrinklePercentage < 70) {
      return this.metaConstants.deepWrinkleLabel;
    } else {
      return this.metaConstants.severeWrinkleLabel;
    }
  }

  renderGuideLine() {
    const guidelineTitle = this.metaConstants.wrinkleValueGuideLabel;
    const valueTitle = this.metaConstants.valueInPercentageLabel;
    const descriptionTitle = this.metaConstants.descriptionLabel;
    const indexArray = [
      this.metaConstants.zeroToNineLabel,
      this.metaConstants.tenToTwentyNineLabel,
      this.metaConstants.thirtyToFortyNineLabel,
      this.metaConstants.fiftyToSixtyNineLabel,
      this.metaConstants.seventyToEightyNineLabel,
      this.metaConstants.nintyToHundredLabel,
    ];
    const descriptionArray = [
      this.metaConstants.noVisiblyWrinkleLabel,
      this.metaConstants.shallowWrinkleLabel,
      this.metaConstants.someWrinkleLabel,
      this.metaConstants.moderateWrinkleLabel,
      this.metaConstants.deepWrinkleLabel,
      this.metaConstants.severeWrinkleLabel,
    ];
    return (
      <View style={{ margin: 30, flex: 1 }}>
        <Text style={{ fontSize: 12, textDecorationLine: "underline" }}>
          {guidelineTitle}
        </Text>
        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <View style={{ flex: 2 }}>
            <Text style={{ fontSize: 12, lineHeight: 18 }}>{valueTitle}</Text>
            {indexArray.map(item => (
              <Text style={{ fontSize: 12, lineHeight: 18, fontWeight: "500" }}>
                {item}
              </Text>
            ))}
          </View>
          <View style={{ width: 1, backgroundColor: "#878786" }}></View>
          <View style={{ flex: 7.9, marginLeft: 15 }}>
            <Text style={{ fontSize: 12, lineHeight: 18 }}>
              {descriptionTitle}
            </Text>
            {descriptionArray.map(item => (
              <Text style={{ fontSize: 12, lineHeight: 18, fontWeight: "500" }}>
                {item}
              </Text>
            ))}
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { attributes, ageNextBday } = this.props.BMIResponse.lifestyle;
    const wrinkle = pathOr(
      0,
      ["BMIResponse", "lifestyle", "attributes", "wrinkle"],
      this.props
    );
    const wrinklePercentage = _.floor(wrinkle);
    const status = attributes.skinTone;
    return (
      <ScrollView>
        <View
          style={[
            styles.container,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <BmiWrinkleResult
            imageUrl={{
              uri: `data:image/png;base64,${this.props.bmiImageData}`,
            }}
            result={wrinklePercentage}
            status={this.getWrinkleStatus(wrinklePercentage)}
            age={ageNextBday}
            resultHeading={this.metaConstants.wrinkleIndexLabel}
            statusHeading={this.metaConstants.classificationLabel}
            ageHeading={this.metaConstants.ageLabel}
            color={this.getWrinkleColor(wrinklePercentage)}
            numberOfLines={2}
          />
        </View>
        <View style={{ flex: 1 }}>{this.renderGuideLine()}</View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  meta: state.meta,
  language: state.userPreferences.language,
  sessionId: state.auth.token,
  bmiFeedbackLoading: state.bmi.feedbackLoading,
  bmiFeedbackData: state.bmi.successFeedbackData,
  bmiImageData: state.bmi.bmiImage,
  facialToken: state.bmi.facialToken,
  BMIResponse: state.bmi.BMIResponse,
  languageSelected: state.userPreferences.language,
  isBMIFeedbackCall: state.bmi.isFeedbackCall,
  userLanguagePreference: state.userPreferences.language,
});

export default connect(mapStateToProps, {
  BMIFeedback: (sessionId, data) => ({
    context: pageKeys.MAIN_PAGE,
    type: CoreActionTypes.KEY_BMI_FEEDBACK,
    payload: {
      sessionId,
      data: data,
      bmiFeedbackCall: true,
    },
  }),
  UpdateBMI: data => ({
    type: CoreActionTypes.ESTIMATE_BMI_SUCCESS,
    payload: {
      bmiRequest: data,
      bmiResponse: data,
      isFeedbackCall: true,
    },
  }),
})(WrinkleIndex);

// Doc Success
import React, { Component } from "react";
import { View, BackHandler } from "react-native";
import { connect } from "react-redux";
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  CoreComponents,
  CoreConstants,
  CoreConfig,
  CoreActionTypes,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";
const { Label, AppButton } = CoreComponents;
const { pageKeys } = CoreConfig;
import styles from "./styles";

const {
  SCREEN_KEY_DOC_ON_CALL_FEEDBACK_PAGE,
} = CoreConstants;
import moment from "moment";
const FEEDBACK_DESCRIPTION = "feedbackDescription";
const THANK_YOU = "thankyou";
const SUBMIT_RATING = "submitrating";
const SUBMIT = "submitBtn";
const SKIP = "skipBtn";

class ConsultationFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 2.5,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.goBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onGoBack);
  }

  submit = () => {
    this.goBack();
  }

  skip = () => {
    this.goBack();
  }

  goBack = () => {
    this.props.dispatch({
      context: pageKeys.ALL,
      type: CoreActionTypes.GO_TO_MAIN_PAGE,
    });
  };

  onStarRatingPress = (rating) => {
    this.setState({
      starCount: rating,
    });
  }

  render() {
    const now = moment();
    const docFeedbackScreen = metaHelpers.findScreen(
      SCREEN_KEY_DOC_ON_CALL_FEEDBACK_PAGE
    );
    const description = metaHelpers.findElementWithScreen(
      docFeedbackScreen,
      FEEDBACK_DESCRIPTION
    ).label;
    const thankYou = metaHelpers.findElementWithScreen(
      docFeedbackScreen,
      THANK_YOU
    ).label;
    const rating = metaHelpers.findElementWithScreen(
      docFeedbackScreen,
      SUBMIT_RATING
    ).label;
    const submitbtn = metaHelpers.findElementWithScreen(
      docFeedbackScreen,
      SUBMIT
    ).label;
    const skipbtn = metaHelpers.findElementWithScreen(docFeedbackScreen, SKIP)
      .label;

    return (
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Label value={description} style={styles.heading} />
        </View>
        <View style={styles.container}>
          <View style={styles.consultationBtnContainer}>
            <Label value={thankYou} style={styles.title} />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer} />
            <View style={styles.contentCenter}>
              <Label
                value={this.props.doctorName}
                style={[
                  styles.consultationSubhead,
                  styles.labelBold,
                  styles.nameLabel,
                ]}
              />
              <Label
                value={now.format("DD/MM/YYYY")}
                style={styles.consultationSubhead}
              />
              <Label
                value={now.format("LT")}
                style={styles.consultationSubhead}
              />
            </View>
          </View>
          <View style={styles.consultationBtnContainer}>
            <View style={styles.titleContainer}>
              <Label
                value={rating}
                style={[
                  styles.consultationSubhead,
                  styles.info,
                  styles.textCenter,
                  styles.success,
                  styles.labelBold,
                ]}
              />
            </View>
            <Stars
              half={true}
              default={0}
              update={this.onStarRatingPress}
              spacing={4}
              count={5}
              fullStar={<Icon size={30} name={"star"} style={[styles.star]} />}
              emptyStar={
                <Icon
                  name={"star-outline"}
                  size={30}
                  style={[styles.star, styles.emptyStar]}
                />
              }
              halfStar={
                <Icon size={30} name={"star-half"} style={[styles.star]} />
              }
            />
          </View>
        </View>
        <View>
          <AppButton
            type={[styles.btn, styles.primary, {
              borderRadius: 25,
              height: 50
            }]}
            title={submitbtn}
            press={this.submit}
          />
          <AppButton
            type={[styles.btn, styles.default, {
              borderRadius: 25,
              height: 50
            }]}
            title={skipbtn}
            press={this.skip}
            textStyle={styles.btnTextStyle}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  doctorName: state.doctorServices.consultation.doctorName,
});

export default connect(mapStateToProps)(ConsultationFeedback);

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
import { Header } from "../../../../components/ChatComponent/Header";

const {
  DOC_SERVICE_FEEDBACK,
  GO_BACK_TO_PREVIOUS_STACK,
  SCREEN_KEY_DOC_ON_CALL_FEEDBACK_PAGE,
} = CoreConstants;
import moment from "moment";
import actionNames from "../../configs/actionNames";
import ScreenNames from "../../configs/ScreenNames";
const FEEDBACK_DESCRIPTION = "feedbackDescription";
const THANK_YOU = "thankyou";
const SUBMIT_RATING = "submitrating";
const SUBMIT = "submitBtn";
const SKIP = "skipBtn";

class DocOnCallConsultationFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 2.5,
    };
    this.submit = this.submit.bind(this);
    this.skip = this.skip.bind(this);
    this.onStarRatingPress = this.onStarRatingPress.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.goBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onGoBack);
  }

  submit() {
    this.goBack();
  }
  skip() {
    this.goBack();
  }

  goBack = () => {
    this.props.dispatch({
      context: ScreenNames.DOC_SERVICE_FEEDBACK,
      type: actionNames.GO_BACK_TO_PREVIOUS_STACK,
    });
  };

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  render() {
    const { meta } = this.props;
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
        <Header
          leftIconType="back"
          onLeftPress={() => this.goBack()}
          showRightIcon={false}
          showRightDocOnCallLogo={true}
        />
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
                value={now.format("DD MMMM YYYY")}
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
              default={1}
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
            type={[styles.btn, styles.primary,{
              borderRadius:25,
              height:50
            }]}
            title={submitbtn}
            press={this.submit}
          />
          <AppButton
            type={[styles.btn, styles.default,{
              borderRadius:25,
              height:50
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
  meta: state.meta,
  doctorName: state.doctorOnCallService.consultation.doctorName,
});
export default connect(mapStateToProps)(DocOnCallConsultationFeedback);

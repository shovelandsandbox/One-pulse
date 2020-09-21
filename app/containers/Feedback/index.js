import React, { PureComponent } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import styles from "./styles";
import MetaConstants from "./meta";
import {
  CoreActions,
  CoreActionTypes,
  CoreConfig,
} from "@pru-rt-internal/pulse-common";
import { PruBackHeader, PruRating, PruSectionGrid } from "../../components";
import { getScreenRenderingConfig } from "../../actions";

const { dispatchFeedbackReset } = CoreActions;
const MAX_LENGTH = 255;

const { ElementErrorManager, pageKeys, SCREEN_KEY_FEEDBACK } = CoreConfig;
const { SUBMIT_FEEDBACK } = CoreActionTypes;

class NewFeedback extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedRating: 0,
      categories: [],
      category: "",
      feedbackHasError: false,
      description: "",
    };

    this.MetaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  UNSAFE_componentWillMount() {
    this.props.dispatchFeedbackReset();
    this.props.getScreenRenderingConfig({
      id: `m::ui::appFeedback_${this.props.language}`,
    });
  }

  componentDidMount() {
    this.props.resetPassword();
    this.props.resetProfileNotification();
    this.props.dispatchFeedbackReset();
  }

  onRateSelection = selectedNumber => {
    this.setState({ selectedRating: selectedNumber });
  };

  onChange(name, val) {
    this.setState({ description: val });
  }

  groupByTitle = () => {
    const feedbackGrid = this.props.feedbackScreenConfig;
    const feedbackGridGroupByTitle = _.groupBy(
      feedbackGrid.containers,
      "title"
    );
    return feedbackGridGroupByTitle;
  };

  updateState = val => {
    if (_.isUndefined(val)) {
      val.selected = false;
    }
    val.selected = !val.selected;
    const categorySet = _.unionBy([val], this.state.categories, "id");
    this.setState({
      category: val.title,
      categories: categorySet,
    });
  };

  submitFeedback() {
    const { selectedRating, category } = this.state;
    if (selectedRating === 0 || _.isEmpty(category)) {
      this.setState({
        feedbackHasError: true,
      });
      return;
    }
    if (_.trim(this.state.description) === "") {
      this.setState({
        feedbackHasError: true,
        description: "",
      });
    } else {
      this.setState({
        feedbackHasError: false,
      });
      const selectedCategories = _.filter(this.state.categories, {
        selected: true,
      });
      const keyValueObj = selectedCategories.reduce((result, item) => {
        let key = item.title; //first property: a, b, c
        key = key.replace(/\s/g, "");
        result[key] = this.state.selectedRating;
        return result;
      }, {});
      const payload = {
        notes: this.state.description,
        categories: {
          ...keyValueObj,
        },
      };
      this.props.feedbackData(payload);
    }
  }

  renderGrid = () => {
    const grid = this.groupByTitle();
    const headers = Object.keys(grid);

    return headers.map(value => {
      return (
        <PruSectionGrid
          data={grid[value][0].components}
          horizontal={grid[value][0].horizontal}
          itemsPerRow={grid[value][0].itemsPerRow}
          aspectRatio={1}
          timeStamp={this.state.timeStamp}
          onPress={this.updateState}
          numberOfLines={2}
          outsideTitle={true}
          itemHighLight={true}
          width={40}
        />
      );
    });
  };

  keyboardDidShow = () => {
    this._scrollView.scrollTo({ x: 0, y: 200, animated: true });
  };

  keyboardDidHide = () => {
    this._scrollView.scrollTo({ x: 0, y: 0, animated: true });
  };

  render() {
    const { description } = this.state;
    const { submitFeedbackDone, submitFeedbackError } = this.props;

    const ratingTitles = [
      {
        value: 1,
        label: this.MetaConstants.FEEDBACK_VERYPOOR,
        titleBasedOnRate: this.MetaConstants.FEEDBACK_WHATTO_IMPROVE,
      },
      {
        value: 2,
        label: this.MetaConstants.FEEDBACK_POOR,
        titleBasedOnRate: this.MetaConstants.FEEDBACK_WHATTO_IMPROVE,
      },
      {
        value: 3,
        label: this.MetaConstants.FEEDBACK_AVERAGE,
        titleBasedOnRate: this.MetaConstants.FEEDBACK_WHATTO_IMPROVE,
      },
      {
        value: 4,
        label: this.MetaConstants.FEEDBACK_GOOD,
        titleBasedOnRate: this.MetaConstants.FEEDBACK_WENTGOOD,
      },
      {
        value: 5,
        label: this.MetaConstants.FEEDBACK_VERYGOOD,
        titleBasedOnRate: this.MetaConstants.FEEDBACK_WENTGOOD,
      },
    ];

    ElementErrorManager.setCurrentScreen(SCREEN_KEY_FEEDBACK);
    if (submitFeedbackDone) {
      this.props.navigation.goBack();
    } else if (submitFeedbackError) {
      this.props.dispatchFeedbackReset();
      Alert.alert("", this.MetaConstants.COMMON_ERROR_KEY_GENERIC_ERROR);
    }

    return (
      <View style={{ backgroundColor: "#f9fcff", flex: 1 }}>
        <View style={styles.headerLayout}>
          <PruBackHeader
            title={this.MetaConstants.FEEDBACK_TITLE}
          ></PruBackHeader>
        </View>
        <KeyboardAwareScrollView
          ref={component => (this._scrollView = component)}
          style={loginStyles.scrollContainer}
          enableOnAndroid
          extraScrollHeight={Platform.OS == "ios" ? 30 : 58}
        >
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
              <PruRating
                titleText={this.MetaConstants.FEEDBACK_IMPROVE}
                selectedRating={this.state.selectedRating}
                ratingTitles={ratingTitles}
                onRateSelection={this.onRateSelection}
              />
            </View>
            <View style={styles.ratingLayout}>
              {this.state.selectedRating === 0 ? (
                <View style={{ height: 16 }}></View>
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    color: "#000000",
                    fontSize: 12,
                  }}
                >
                  {ratingTitles[this.state.selectedRating - 1].titleBasedOnRate}
                </Text>
              )}
              <View style={{ marginTop: 10 }}>{this.renderGrid()}</View>
            </View>
            <View style={styles.inputLayout}>
              <TextInput
                style={styles.textInput}
                autoFocus={false}
                multiline={true}
                maxLength={MAX_LENGTH}
                placeholderTextColor="#525a60"
                placeholder={this.MetaConstants.SHARE_THOUGHTS}
                selectionColor="#ff4f39"
                value={description}
                onChangeText={value => this.onChange("description", value)}
              />
            </View>
            <View style={styles.buttonLayout}>
              <TouchableOpacity
                style={styles.buttonTouch}
                onPress={() => this.submitFeedback()}
              >
                <Text style={styles.buttonTextNew}>
                  {this.MetaConstants.SCREEN_PROVIDEFEEDBACK_SUBMIT}
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.feedbackHasError && (
              <Text style={styles.feedbackRequiredErrorText}>
                {this.MetaConstants.SCREEN_PROVIDEFEEDBACK_FEEDBACKISREQUIRED}
              </Text>
            )}
          </ScrollView>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

NewFeedback.propTypes = {
  language: PropTypes.string,
  feedbackScreenConfig: PropTypes.object,
  dispatchFeedbackReset: PropTypes.func,
  resetPassword: PropTypes.func,
  getScreenRenderingConfig: PropTypes.func,
  navigation: PropTypes.func,
  resetProfileNotification: PropTypes.func,
  feedbackData: PropTypes.object,
};

const mapStateToProps = state => ({
  loading: state.feedback.loading,
  submitFeedbackDone: state.feedback.submitFeedbackDone,
  submitFeedbackError: state.feedback.submitFeedbackError,
  feedbackScreenConfig: state.screenConfig.Feedback,
  language: state.userPreferences.language,
});

export default connect(mapStateToProps, {
  resetPassword: () => ({
    context: pageKeys.ACCOUNT_SCREEN,
    type: CoreActionTypes.CHANGE_PASSWORD_RESET,
  }),
  resetProfileNotification: () => ({
    context: pageKeys.ACCOUNT_SCREEN,
    type: CoreActionTypes.RESET_UPDATE_NOTIFICATION,
  }),
  dispatchFeedbackReset,
  feedbackData: payload => ({
    context: pageKeys.FEEDBACK_SCREEN,
    type: SUBMIT_FEEDBACK,
    payload,
  }),
  getScreenRenderingConfig,
})(NewFeedback);

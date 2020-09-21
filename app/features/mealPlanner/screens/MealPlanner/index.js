import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import ShadowWrapper from "../../../../components/ShadowWrapper";
import { PruBackHeader, CustomAlert } from "../../../../components";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import { getMetaForMetrics } from "../../utils";
import { metaHelpers, CoreServices } from "@pru-rt-internal/pulse-common";
import GetDetails from "../../components/GetDetails";
import * as Progress from "react-native-progress";
import AllergiesList from "../../components/AllergiesList";
import FoodPreferences from "../../components/FoodPreferences";
import BottomBar from "../../components/BottomBar";
import { PropTypes } from "mobx-react";
import { connect } from "react-redux";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";
const { NavigationService } = CoreServices;
import { pathOr } from "ramda";

import MealPlannerScreens from "../../configs/screen-names";
import actions from "../../configs/actions";

class MealPlanner extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progressCount: 0,
    };
    this.mealPlannerData = {};
    const mealPlan = metaHelpers.findScreen("mealPlan");
    if (mealPlan) {
      this.mealPlannerData = metaHelpers.findElementWithScreen(
        mealPlan,
        "mealPlanner"
      );
    }
    this.finalPreferences = props.userPreferences;
  }

  componentDidMount() {
    this.props.registerEvent(eventNames.mealPlanLaunch);
    this.didFocusListener = this.props.navigation.addListener("didBlur", () => {
      this.setState({ progressCount: 0 });
    });
  }

  isFromMyMealPlanner = () => {
    return pathOr(
      false,
      ["navigation", "state", "params", "fromMyMealPlanner"],
      this.props
    );
  };

  handleNextButtonClick = () => {
    const { progressCount } = this.state;
    if (progressCount < 1) {
      this.props.registerEvent(eventNames.onNextPress);
      this.setState({
        progressCount: this.state.progressCount + 1,
      });
    } else {
      const fromMyMealPlanner = this.isFromMyMealPlanner();
      !fromMyMealPlanner && this.props.resetMealPlan();
      this.props.registerEvent(eventNames.updateMyPreferences, {
        ...this.finalPreferences,
      });
      this.updatePreferences(fromMyMealPlanner);
    }
  };

  updatePreferences = fromMyMealPlanner => {
    this.props.updateCustomerPreferences({
      ...this.finalPreferences,
      fromMyMealPlanner,
    });
  };

  handleBackButtonClick = () => {
    const { progressCount } = this.state;
    if (progressCount > 0) {
      this.setState({
        progressCount: progressCount - 1,
      });
    } else {
      this.isFromMyMealPlanner()
        ? NavigationService.navigate(MealPlannerScreens.MyMealPlan)
        : NavigationService.goBack();
    }
  };

  renderTitle = () => {
    return (
      <Text style={styles.headerText}>
        {
          getMetaForMetrics("progressText", this.mealPlannerData)[
            this.state.progressCount
          ]
        }
      </Text>
    );
  };

  getHeader = () => {
    return (
      <ShadowWrapper>
        <PruBackHeader
          customStyles={{}}
          renderTitle={this.renderTitle}
          onPress={this.handleBackButtonClick}
        />
      </ShadowWrapper>
    );
  };

  getProgressBar = () => {
    const progess = (this.state.progressCount + 1) / 2;
    return (
      <Progress.Bar
        progress={progess}
        width={null}
        height={6}
        color={"rgba(241,23,43,1)"}
        unfilledColor={"rgba(233,233,233,1)"}
        borderColor={"rgba(0,0,0,0)"}
      />
    );
  };

  getTitleAndDesc = () => {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {" "}
          {
            getMetaForMetrics("headerTiles", this.mealPlannerData)[
              this.state.progressCount
            ]
          }
        </Text>
        <Text style={styles.description}>
          {" "}
          {
            getMetaForMetrics("headerDesc", this.mealPlannerData)[
              this.state.progressCount
            ]
          }
        </Text>
      </View>
    );
  };

  renderGetDetails = () => {
    const { userPreferences } = this.props;
    return (
      <View style={styles.contentView}>
        <GetDetails
          savePreferences={this.savePreferences}
          dietList={this.finalPreferences.dietList || userPreferences.dietList}
        />
        <BottomBar
          handleClick={this.handleNextButtonClick}
          showSkip={false}
          progressCount={this.state.progressCount}
          label={safeMetaLabelFinder("mealPlan", "next")}
        />
      </View>
    );
  };

  renderFoodPreferenceList = () => {
    const { userPreferences } = this.props;
    return (
      <View style={styles.contentView}>
        <FoodPreferences
          savePreferences={this.savePreferences}
          cuisines={this.finalPreferences.cuisines || userPreferences.cuisines}
        />
        <BottomBar
          handleClick={this.handleNextButtonClick}
          progressCount={this.state.progressCount}
          showSkip={true}
          label={safeMetaLabelFinder("mealPlan", "next")}
        />
      </View>
    );
  };

  renderAllergicList = () => {
    const { userPreferences } = this.props;
    return (
      <View style={styles.contentView}>
        <AllergiesList
          savePreferences={this.savePreferences}
          exclusionList={
            this.finalPreferences.exclusionList || userPreferences.exclusionList
          }
          dietList={this.finalPreferences.dietList || userPreferences.dietList}
        />
        <BottomBar
          handleClick={this.handleNextButtonClick}
          progressCount={this.state.progressCount}
          showSkip={false}
          label={safeMetaLabelFinder("mealPlan", "done")}
        />
      </View>
    );
  };

  savePreferences = preferences => {
    this.finalPreferences = {
      ...this.finalPreferences,
      ...preferences,
    };
  };

  showMealPlannerError = () => {
    CustomAlert.show("", safeMetaLabelFinder("mealPlan", "alertFailure"), {
      positiveText: safeMetaLabelFinder("mealPlan", "okay"),
      onPositivePress: () => {
        this.props.resetErrorMsg();
      },
    });
  };

  renderContent = () => {
    switch (this.state.progressCount) {
      case 0:
        return this.renderGetDetails();
      case 1:
        return this.renderAllergicList();
      case 2:
        return this.renderFoodPreferenceList();
      default:
        return null;
    }
  };

  render() {
    this.props.showErrorMsgOnPreferenceUpdate && this.showMealPlannerError();
    return (
      <View style={styles.container}>
        {this.getHeader()}
        {this.getProgressBar()}
        {this.getTitleAndDesc()}
        {this.renderContent()}
      </View>
    );
  }
}

MealPlanner.propTypes = {
  resetMealPlan: PropTypes.func,
  updateCustomerPreferences: PropTypes.func,
  showErrorMsgOnPreferenceUpdate: PropTypes.bool,
  resetErrorMsg: PropTypes.func,
  registerEvent: PropTypes.func,
  userPreferences: PropTypes.object,
  navigation: PropTypes,
};

const mapStateToProps = state => {
  return {
    showErrorMsgOnPreferenceUpdate: pathOr(
      false,
      ["mealPlanner", "showErrorMsgOnPreferenceUpdate"],
      state
    ),
    userPreferences: pathOr(
      {
        dietList: null,
        exclusionList: null,
        cuisines: null,
      },
      ["mealPlanner", "userPreferences", "meta"],
      state
    ),
  };
};

const mapDispatchToProps = {
  registerEvent,
  resetMealPlan: () => ({
    type: actions.resetMealPlan,
    context: MealPlannerScreens.MealPlanOptions,
  }),
  updateCustomerPreferences: payload => ({
    type: actions.updateCustomerPreference,
    context: MealPlannerScreens.MealPlanner,
    payload,
    disableTimeout: true,
  }),
  resetErrorMsg: () => ({
    type: actions.resetUpdatePreferenceError,
    context: MealPlannerScreens.MealPlanner,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(MealPlanner);

import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import LinearGradient from "react-native-linear-gradient";
import ContentLoader from "react-native-easy-content-loader";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import { connect } from "react-redux";
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import screens from "../../configs/screen-names";
import actions from "../../configs/actions";
import { CustomAlert } from "../../../../components";
import {
  ARROW_UP_ICON,
  ARROW_DOWN_ICON,
  ARROW_RIGHT_ICON,
} from "../../../../config/images";
import { metaFinder } from "../../utils/meta-utils";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";

class MealSlot extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showContent: true,
    };
  }

  getSlotIndicator = slotName => {
    switch (slotName) {
      case "Breakfast":
        return "slot1";
      case "Lunch":
        return "slot2";
      case "Dinner":
        return "slot3";
      default:
        return "slot1";
    }
  };

  getRecipeIndicator = slotName => {
    switch (slotName) {
      case "Breakfast":
        return "recipe1";
      case "Lunch":
        return "recipe2";
      case "Dinner":
        return "recipe3";
      default:
        return "recipe1";
    }
  };

  renderSlotTime = slotName => {
    switch (slotName) {
      case "Breakfast":
        return safeMetaLabelFinder("mealPlan", "breakfastTime");
      case "Lunch":
        return safeMetaLabelFinder("mealPlan", "lunchTime");
      case "Dinner":
        return safeMetaLabelFinder("mealPlan", "dinnerTime");
      default:
        return "";
    }
  };

  toggleContent = () => {
    this.setState({ showContent: !this.state.showContent });
  };

  renderHeader = () => {
    const { slotName } = this.props;
    return (
      <ContentLoader
        active
        avatar={true}
        aSize={20}
        primaryColor={"rgba(232, 237, 241, 1)"}
        secondaryColor={"rgba(220, 222, 224, 1)"}
        title={false}
        pRows={2}
        pHeight={[17, 9]}
        pWidth={["25%", "15%"]}
        containerStyles={{
          marginTop: 10,
        }}
        loading={this.props.showMealLoader}
      >
        <View>
          <View style={styles.header}>
            <View style={styles.headerTitle}>
              <View
                style={[
                  styles.slotIndicator,
                  styles[this.getSlotIndicator(slotName)],
                ]}
              />
              <Text style={styles.slotTitle}>{slotName.toUpperCase()}</Text>
            </View>
            <TouchableOpacity
              style={styles.dropDownContainer}
              onPress={this.toggleContent}
            >
              <Image
                style={styles.dropDown}
                source={
                  this.state.showContent ? ARROW_DOWN_ICON : ARROW_UP_ICON
                }
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.slotTime}>{this.renderSlotTime(slotName)}</Text>
        </View>
      </ContentLoader>
    );
  };

  renderContent = () => {
    const { slotData, slotName } = this.props;
    return (
      <ContentLoader
        active
        primaryColor={"rgba(232, 237, 241, 1)"}
        secondaryColor={"rgba(220, 222, 224, 1)"}
        title={false}
        pRows={3}
        pHeight={[37, 37, 37]}
        pWidth={["100%", "100%", "100%"]}
        loading={this.props.showMealLoader}
      >
        <View style={styles.content}>
          {slotData.map((item, index) => (
            <TouchableOpacity
              onPress={() => this.onRecipePress(item, slotName)}
              key={index}
              style={[styles.recipe, styles[this.getRecipeIndicator(slotName)]]}
            >
              <Text style={styles.recipeText} numberOfLines={1}>
                {item.foodItem.name}
              </Text>
              <Image style={styles.dropDown} source={ARROW_RIGHT_ICON} />
            </TouchableOpacity>
          ))}
        </View>
      </ContentLoader>
    );
  };
  onRecipePress = (item, slotName) => {
    this.props.registerEvent(eventNames.onRecipePress, {
      foodItem: item?.foodItem?.id,
    });
    this.props.getRecipe({ id: item?.foodItem?.id, slotName });
  };

  changeRecipe = () => {
    const {
      onPressChangeRecipe,
      changeRecipe,
      slotName,
      slotData,
    } = this.props;
    onPressChangeRecipe(slotData, slotName);
    changeRecipe();
  };

  renderChangeRecipe = () => {
    const { slotData = [] } = this.props;
    return (
      <TouchableOpacity onPress={this.changeRecipe}>
        <LinearGradient
          colors={["#ec1c2e", "#a21421"]}
          style={styles.buttonContainer}
        >
          <Text style={styles.changeRecipe}>
            {slotData.length === 0
              ? safeMetaLabelFinder("mealPlan", "addRecipe")
              : safeMetaLabelFinder("mealPlan", "changeRecipe")}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  renderErrorModal = () => {
    CustomAlert.show("", metaFinder("alertFailure"), {
      positiveText: metaFinder("okay"),
      onPositivePress: () => {
        this.props.hideErrorModal();
      },
    });
  };

  render() {
    if (this.props.showErrorMessage) {
      this.renderErrorModal();
    }
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <View
          style={
            this.state.showContent ? { display: "flex" } : { display: "none" }
          }
        >
          {this.renderContent()}
          {!this.props.showMealLoader && this.renderChangeRecipe()}
        </View>
      </View>
    );
  }
}

MealSlot.propTypes = {
  slotData: PropTypes.object,
  slotName: PropTypes.string,
  changeRecipe: PropTypes.func,
  onPressChangeRecipe: PropTypes.func,
  getRecipe: PropTypes.func,
  showErrorMessage: PropTypes.bool,
  hideErrorModal: PropTypes.func,
  registerEvent: PropTypes.func,
  showMealLoader: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    showErrorMessage: state.mealPlanner.showErrorMessage,
    showMealLoader: state.mealPlanner.showMealLoader,
  };
};

const mapDispatchToProps = {
  registerEvent,
  changeRecipe: () => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: screens.ChangeRecipe,
  }),
  getRecipe: payload => ({
    type: actions.analyseFood,
    context: screens.ChangeRecipe,
    payload,
    disableTimeout: true,
  }),
  hideErrorModal: () => ({
    type: actions.disableErrorModal,
    context: screens.MyMealPlan,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(MealSlot);

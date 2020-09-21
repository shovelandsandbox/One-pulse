import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Animated } from "react-native";
import PropTypes from "prop-types";

import Actions from "../../config/actions";
import { WPDarkModal, WPSetReminderModal } from "../../components";
import MetaConstants from "../../meta";

import { PruFloatingIcon, CustomAlert } from "../../../../components";
import {
  WELLNESS_HEART_BEATS,
  WELLNESS_HEART_NEW,
  WELLNESS_BELL,
  WELLNESS_STAT,
  WELLNESS_GROUP,
  REWARD_CLOSE,
} from "../../../../config/images";

class WPMenuButton extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      animation: new Animated.Value(0),
      isOpen: false,
    };
    this._open = 1;
    this.metaConstants = { ...MetaConstants.screenMeta() };
  }

  getInterPolateValue = value =>
    this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, value],
    });

  getCustomStyles = () => {
    const customStyles = [];
    const interPolateValues = [-70, -140, -210, -280];

    interPolateValues.forEach(value => {
      customStyles.push({
        transform: [
          {
            scale: this.state.animation,
          },
          {
            translateY: this.getInterPolateValue(value),
          },
        ],
      });
    });

    return customStyles;
  };

  getConfig = () => ({
    animeStyle: true,
    isOpen: this.state.isOpen,
    // images: [WELLNESS_HEART_NEW, WELLNESS_BELL, WELLNESS_STAT, WELLNESS_GROUP],
    // titles: ["Affinity", "Reminders", "Progress", "Groups"],
    images: [WELLNESS_BELL],
    titles: ["Reminders"],
    customStyles: this.getCustomStyles(),
    onPress: this.onPressOfMenuIcon,
  });

  onPressOfMenuIcon = whichMenu => {
    switch (whichMenu) {
      case "Affinity":
        this.props.goTo("AffinityGroupScreen");
        break;
      case "Reminders":
        if (this.props.habits.length === 0) {
          CustomAlert.show("", "There are no in progress Habits", {
            positiveText: "Ok",
            invert: false
          });
        } else {
          WPDarkModal.show({
            Component: () => (
              <WPSetReminderModal
                habits={this.props.habits}
                negativeText={this.metaConstants.cancel}
                positiveText="Save"
                negativePress={() => {
                  WPDarkModal.hide();
                }}
                positivePress={({ habitId, isToggleOn, intervals }) => {
                  WPDarkModal.hide();
                  this.props.setReminder({
                    intervals: intervals,
                    habitId: habitId,
                    enabled: isToggleOn,
                    actionPlanId: this.props.actionPlanId,
                  });
                }}
              />
            ),
          });
        }
        break;
      case "Progress":
        this.props.goTo("WellnessProfile");
        break;
      case "Groups":
        console.log("Groups pressed");
        break;
    }
    this.toggleOpen();
  };

  toggleOpen = () => {
    this.setState(
      {
        isOpen: this._open,
      },
      () => {
        Animated.timing(this.state.animation, {
          toValue: this._open,
          duration: 600,
          useNativeDriver: true,
        }).start();

        this._open = this._open === 0 ? 1 : 0;
      }
    );
  };

  render() {
    const bgStyle = {
      transform: [
        {
          scale: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 40],
          }),
        },
      ],
    };

    return (
      <PruFloatingIcon
        toggleOpen={this.toggleOpen}
        bgStyle={bgStyle}
        heart_red={this.state.isOpen ? REWARD_CLOSE : WELLNESS_HEART_BEATS}
        {...this.getConfig()}
      />
    );
  }
}

WPMenuButton.PropTypes = {
  goTo: PropTypes.func,
};

const mapStateToProps = state => {};

export default connect(mapStateToProps, {
  goTo: Actions.goto,
  setReminder: Actions.setReminder,
})(WPMenuButton);

import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";

import styles from "./styles";

import { WPSetReminder } from "../../../wellnessPlans/components";
import { WELLNESS_BELL_ICON } from "../../../../config";
import { PruRoundedButton } from "../../../../components";

class EBSetReminderModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      intervals: {
        0: false,
        1: false,
        2: false,
        3: false,
      },
      error: false,
    };
    this.REMINDERS = [
      { time: "8 am", timeZone: "Morning", value: "8:00" },
      { time: "7 pm", timeZone: "Afternoon", value: "19:00" },
    ];
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    this.setState({
      isToggleOn: true,
      intervals: this.initIntervals(),
    });
  }

  initIntervals = () => {
    const intervals = {};
    return intervals;
  };

  renderSeparator = () => {
    return <View style={{ marginLeft: 11.3 }} />;
  };

  setIntervalTime = (index, isChecked) => {
    const { intervals, error } = this.state;
    let isError = error;
    if (isChecked) {
      isError = false;
    }
    this.setState({
      intervals: {
        [index]: isChecked,
      },
      error: isError,
    });
  };

  getIntervals = () => {
    const { intervals } = this.state;
    const result = [];
    Object.keys(intervals).forEach((key, index) => {
      if (intervals[key]) {
        result.push(this.REMINDERS[key].value);
      }
    });
    return result;
  };

  saveIntervals = () => {
    const { positivePress } = this.props;
    const { isToggleOn } = this.state;

    const intervals = this.getIntervals();

    if (intervals.length === 0 && isToggleOn) {
      this.setState({
        error: true,
      });
    } else {
      this.setState(
        {
          error: false,
        },
        () => {
          positivePress({
            isToggleOn,
            intervals,
          });
        }
      );
    }
  };

  render() {
    const { positiveText, negativePress, negativeText } = this.props;
    const { isToggleOn, error } = this.state;

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>{"Set Reminder"}</Text>
        <View style={styles.iconContainer}>
          {isToggleOn && (
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.bellIconContainer}>
                <Image source={WELLNESS_BELL_ICON} style={styles.bellIcon} />
              </View>
            </TouchableOpacity>
          )}
          <View style={styles.switchContainer}>
            <ToggleSwitch
              isOn={this.state.isToggleOn}
              onColor="#ec1c2e"
              offColor="#c3c3c3"
              size="small"
              onToggle={isToggleOn => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                this.setState({ isToggleOn });
              }}
            />
          </View>

          <Text style={styles.enableText}>
            {this.state.isToggleOn ? "Enable" : "Disabled"}
          </Text>
        </View>
        {isToggleOn && (
          <>
            <View style={styles.reminderContainer}>
              <View style={styles.selectReminderContainer}>
                <Text style={styles.reminderText}>
                  {"Select Reminder Times"}
                </Text>
              </View>
            </View>
            <View style={styles.timeContainer}>
              <FlatList
                extraData={this.state}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={this.REMINDERS}
                renderItem={({ item, index }) => (
                  <WPSetReminder
                    {...item}
                    checked={this.state.intervals[index]}
                    remindParent={isChecked =>
                      this.setIntervalTime(index, isChecked)
                    }
                  />
                )}
                ItemSeparatorComponent={this.renderSeparator}
              />
            </View>
          </>
        )}
        {error && (
          <View style={styles.errorView}>
            <Text style={styles.errorViewText}>
              {
                "Please select at least one slot as you have 'enabled' reminders"
              }
            </Text>
          </View>
        )}
        <View style={styles.letsgoButtonContainer}>
          {negativeText && (
            <TouchableOpacity style={styles.noButton} onPress={negativePress}>
              <Text style={styles.noText}>{negativeText}</Text>
            </TouchableOpacity>
          )}
          {positiveText && (
            <PruRoundedButton
              buttonTitle={positiveText}
              style={styles.letsgoButton}
              onPress={this.saveIntervals}
            />
          )}
        </View>
      </View>
    );
  }
}

export default EBSetReminderModal;

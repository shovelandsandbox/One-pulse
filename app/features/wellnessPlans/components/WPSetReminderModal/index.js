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
import { pathOr } from "ramda";

import styles from "./styles";
import { WPSetReminder } from "../../components";
import MetaConstants from "../../meta";
import {getHabitDetails} from "../../utils";

import { WELLNESS_BELL_ICON } from "../../../../config";
import { PruRoundedButton } from "../../../../components";

class WPSetReminderModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      selectedHabit: 0,
      intervals: {
        0: false,
        1: false,
        2: false,
        3: false,
      },
      error: false,
    };
    this.metaConstants = { ...MetaConstants.screenMeta() };

    this.REMINDERS = pathOr([], ["reminderValues", "reminders"], this.metaConstants);
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    this.setState({
      isToggleOn: this.props.habits[0]?.reminder?.enabled,
      intervals: this.initIntervals(0),
    });
  }

  initIntervals = selectedHabit => {
    const reminder = this.props.habits[selectedHabit]?.reminder;
    let intervals = {};
    if (reminder) {
      let habitIntervals = reminder.repeat?.intervals;

      habitIntervals &&
        this.REMINDERS.map((item, index) => {
          intervals[index] = false;
          habitIntervals.map(habitItem => {
            if (item.time === habitItem || item.value === habitItem) {
              intervals[index] = true;
            }
          });
        });
    }
    return intervals;
  };

  renderSeparator = () => {
    return <View style={{ marginLeft: 11.3 }} />;
  };

  setHabit = index => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState(
      {
        selectedHabit: index,
        isToggleOn: !this.props.habits[index]?.reminder?.enabled,
        intervals: this.initIntervals(index),
      },
      () => {
        setTimeout(() => { //Required to hard refresh
          this.setState({
            isToggleOn: !this.state.isToggleOn,
          });
        }, 250);
      }
    );
  };

  renderImage = (habit, index) => {
    const { selectedHabit } = this.state;
    return (
      <TouchableOpacity
        onPress={() => this.setHabit(index)}
        style={[
          styles.habitItem,
          selectedHabit === index ? styles.habitSelectedItem : null,
        ]}
      >
        <Image
          source={{ uri: habit?.habit?.icons?.badge?.tags?.["200*200"] }}
          style={[
            styles.imageStyle,
            selectedHabit === index ? null : styles.habitDisabledImage,
          ]}
          resizeMode={"cover"}
        />
        <Text
          numberOfLines={1}
          style={[
            styles.titleStyle,
            selectedHabit === index ? null : styles.habitDisabledText,
          ]}
        >
          {getHabitDetails(habit.habit, "name")}
        </Text>
      </TouchableOpacity>
    );
  };

  setIntervalTime = (index, isChecked) => {
    const { intervals, error } = this.state;

    let isError = error;
    
    if (isChecked) {
      isError = false;
    }

    this.setState({
      intervals: {
        ...intervals,
        [index]: isChecked,
      },
      error: isError,
    });
  };

  getIntervals = () => {
    const { intervals } = this.state;
    let result = [];
    Object.keys(intervals).forEach((key, index) => {
      if (intervals[key]) {
        result.push(this.REMINDERS[key].value);
      }
    });
    return result;
  };

  saveIntervals = () => {
    const {
      habits,
      positivePress,
    } = this.props;
    const { isToggleOn, selectedHabit } = this.state;

    const intervals = this.getIntervals();
    
    if (intervals.length === 0 && isToggleOn) {
      this.setState({
        error: true
      });
    } else {
      this.setState({
        error: false
      }, () => {
        positivePress({
          habitId: habits[selectedHabit]?.habit?.id,
          isToggleOn,
          intervals,
        });
      });
    }
  }

  render() {
    const {
      habits,
      positiveText,
      negativePress,
      negativeText,
    } = this.props;
    const { isToggleOn, error } = this.state;

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>{this.metaConstants.reminderHeading}</Text>
        <View style={styles.imageContainer}>
          <FlatList
            contentContainerStyle={styles.flatlistContainer}
            extraData={this.state}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={habits}
            renderItem={({ item, index }) => this.renderImage(item, index)}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>

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
                <Text style={styles.reminderText}>{this.metaConstants.selectReminder}</Text>
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
        {
          error && (
            <View style={styles.errorView}>
              <Text style={styles.errorViewText}>
                {this.metaConstants.reminderError}
              </Text>
            </View>
          )
        }
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

export default WPSetReminderModal;

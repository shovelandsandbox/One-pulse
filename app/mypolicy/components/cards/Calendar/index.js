/* eslint-disable max-params */
/* eslint-disable complexity */
import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../../configs";
import Styles from "./style";
import { TextS } from "../../derivatives/Text";

export default class Calendar extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  renderDate(
    dateRaw,
    isHoliday = false,
    isToday = false,
    isSelected = false,
    rangeMode = "",
    isDisabled = false,
    index
  ) {
    date = (dateRaw + "").slice(6);

    let isBold = isToday;
    let color = isSelected
      ? Colors.main.baseWhite
      : isHoliday
      ? Colors.main.baseRed
      : isToday
      ? Colors.main.fontGray
      : Colors.main.baseGray;
    let outerBackgroundColor =
      rangeMode == "mid" && !isSelected
        ? Colors.main.softGray
        : Colors.main.transparent;
    let backgroundColor = isSelected
      ? Colors.main.inactiveGray
      : Colors.main.transparent;

    let halfConnectorRender = null;
    if (rangeMode == "start" || rangeMode == "end") {
      halfConnectorRender = (
        <View
          style={[
            Styles.day.halfConnector,
            rangeMode == "start" ? { right: -1 } : { left: -1 },
          ]}
        />
      );
    }

    if (isDisabled) {
      return (
        <View key={index} style={Styles.day.container}>
          <View style={[Styles.day.innerContainer, { opacity: 0.3 }]}>
            <TextS color={color}>{date}</TextS>
          </View>
        </View>
      );
    }

    return (
      <View
        key={index}
        style={[
          Styles.day.container,
          { backgroundColor: outerBackgroundColor },
        ]}
      >
        {halfConnectorRender}

        <TouchableOpacity
          style={[Styles.day.innerContainer, { backgroundColor }]}
          onPress={() => this.props.selectDate(dateRaw)}
        >
          <TextS color={color} bold={isBold}>
            {date}
          </TextS>
        </TouchableOpacity>
      </View>
    );
  }

  renderEmptyDate(index) {
    return <View key={index} style={Styles.day.container} />;
  }

  renderWeek(dates = [], index) {
    return (
      <View key={index} style={Styles.week.container}>
        <View style={Styles.day.grouper}>
          {dates.map((date, innerIndex) => {
            if (date == 0) {
              return this.renderEmptyDate(innerIndex);
            }

            return this.renderDate(
              date,
              innerIndex == 5 || innerIndex == 6,
              date == this.props.today,
              date == this.props.start || date == this.props.end,
              this.props.end == null
                ? ""
                : date == this.props.start
                ? "start"
                : date == this.props.end
                ? "end"
                : date > this.props.start && date < this.props.end
                ? "mid"
                : "",
              date > this.props.today,
              innerIndex
            );
          })}
        </View>
      </View>
    );
  }

  renderDaysItem(momentDate) {
    const monthStart = momentDate.clone().startOf("month");
    let date = monthStart.format("YYYYMMDD") * 1;
    let startIndex = monthStart.format("d") - 1;
    let limit =
      momentDate
        .clone()
        .endOf("month")
        .format("YYYYMMDD") * 1;

    const weeks = [];
    index = 0;
    while (true) {
      if (date == 0) {
        break;
      }

      if (startIndex < 0) {
        startIndex = 6;
      }

      firstRowLimit = 7 - startIndex;

      weekDays = [];
      for (i = startIndex; i > 0; i--) {
        weekDays.push(0);
      }
      startIndex = 0;

      for (i = 0; i < firstRowLimit; i++) {
        newDate = date + i;

        if (newDate > limit) {
          newDate = 0;
        }

        weekDays.push(newDate);
      }

      date = newDate == 0 ? 0 : newDate + 1;
      weeks.push(this.renderWeek(weekDays, index));
      index++;
    }

    return <View>{weeks}</View>;
  }

  render() {
    if (this.props.date.clone) {
      return (
        <View style={Styles.dayScroll.container}>
          {this.renderDaysItem(this.props.date)}
        </View>
      );
    }

    return (
      <View style={Styles.dayScroll.emptyContainer}>
        <Text>{this.props.date}</Text>
      </View>
    );
  }
}

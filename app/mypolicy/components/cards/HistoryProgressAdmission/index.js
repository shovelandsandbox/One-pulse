/* eslint-disable max-params */
/* eslint-disable complexity */
import React, { Component } from "react";
import { View } from "react-native";
import { Colors } from "../../../configs";
import {
  HistoryProgressHead as HistoryProgressHeadCard,
  HistorySubProgress as HistorySubProgressCard,
} from "../index";

export default class HistoryProgressAdmission extends Component {
  renderSubItem(color, subProgress, isLastProgress, isLast, index) {
    return subProgress.map((subProgressItem, subIndex) => {
      isLast = subIndex == subProgress.length - 1;

      return (
        <HistorySubProgressCard
          key={subIndex}
          color={color}
          title={subProgressItem.title}
          steps={subProgressItem.steps}
          needAdditionalAction={subProgressItem.needAction}
          document={subProgressItem.document}
          isLast={isLast && isLastProgress}
          isActive={subProgressItem.is_active}
          language={this.props.language}
        />
      );
    });
  }

  renderSubs(color, subProgresses, isLastProgress = false) {
    return subProgresses.map((subProgress, index) => {
      return this.renderSubItem(
        color,
        subProgress,
        isLastProgress,
        index == subProgresses.length - 1,
        index
      );
    });
  }

  renderProgress(
    status,
    date,
    title,
    subProgresses = [],
    nextProgress = null,
    isLast = false,
    index
  ) {
    switch (status) {
      case "APPROVED":
      case "CLOSED":
        color = Colors.main.successGreen;
        icon = "checked-small";
        break;

      case "DECLINED":
        color = Colors.main.errorRed;
        icon = "rejected";
        break;

      case "ON_PROGRESS":
        color = Colors.main.warningYellow;
        icon = "ongoing";
        break;

      case "NEXT":
      default:
        color = Colors.main.borderGray;
        icon = "not-clear";
        break;
    }

    return (
      <View key={index}>
        <HistoryProgressHeadCard
          color={color}
          icon={icon}
          date={date}
          title={title}
          status={status}
          isLast={isLast && subProgresses.length == 0}
          isActiveWithNoChild={
            (subProgresses.length == 0 &&
              (nextProgress && nextProgress.status == "NEXT")) ||
            index === this.props.progresses.length - 1
          }
          meta={this.props.meta}
        />

        {this.renderSubs(
          color,
          subProgresses,
          nextProgress && nextProgress.status == "NEXT"
        )}
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.props.progresses.map((progress, index) => {
          return this.renderProgress(
            progress.status,
            progress.date,
            progress.progress,
            progress.sub_progresses,
            this.props.progresses[index + 1],
            index == this.props.progresses.length - 1,
            index
          );
        })}
      </View>
    );
  }
}

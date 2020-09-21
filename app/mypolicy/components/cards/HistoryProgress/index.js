/* eslint-disable max-params */
/* eslint-disable complexity */
import React, { Component } from "react";
import { View } from "react-native";
import { Colors } from "../../../configs";

import {
  HistoryProgressHead as HistoryProgressHeadCard,
  HistorySubProgress as HistorySubProgressCard,
} from "../index";

export default class HistoryProgress extends Component {
  renderSubItem(color, subProgress, isLastProgress, isLast, index) {
    const { subSubmissionId } = this.props;
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
          subSubmissionId={subSubmissionId}
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
    stage,
    subProgresses = [],
    nextProgress = null,
    isLast = false,
    index
  ) {
    const statusCode = status && status.length>2 ? status.substring(0,2) : ''
    let title = "";
    let status1 = 'NEXT'

     switch(statusCode){
       case "PN":
       title = 'Claim Received'
       status1 = stage? stage : 'ON_PROGRESS'
       break;

       case "PA" :
       title = "Under Analysis"
       status1 = stage? stage : "ON_PROGRESS"
       break;

       case 'AL':
       title = "Claim Approved"
       status1 = stage? stage : 'APPROVED'
       break;

       case 'CL':
       title = "Claim Declined"
       status1 = stage? stage : 'DECLINED'
       break;

       case 'BT' :
       title = "Decision"
       status1 = stage? stage : 'CLOSED'
       break;


       case 'ML':
       title = 'Terminated'
       status1 = stage? stage : 'DECLINED'
       break;

       default:
       title = 'Claim Submitted';
       status1 = stage? stage : 'APPROVED'
       break;

     }


    switch (status1) {
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
            progress.transactionDate,
            progress.stage,
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

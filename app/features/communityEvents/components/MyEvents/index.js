import React, { PureComponent } from "react";
import { Text, RefreshControl, SectionList } from "react-native";
import { connect } from "react-redux";
import moment from "moment";

import { metaFinderCommunityEventLanding } from "./../../meta";
import { goto, gotoWithParams } from "./../../../../actions";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";
import {
  getCustomerGroups,
  groupStatusUpdate,
  startWebinarOrVideoCall,
  goToWebinar,
  saveWebinarId,
} from "../../actions";
import EventCard from "../EventCard";
import { CustomAlert } from "../../../../components";
import { withNavigation } from "react-navigation";
import { pathOr } from "ramda";
import styles from "./styles";

class MyEvents extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCustomerGroups();
  }

  isCurrentMomentBetweenEvent = (startDateTime, endDateTime) => {
    const currDateTime = moment();
    const startDateTimeMoment = moment(startDateTime);
    const endDateTimeMoment = moment(endDateTime);
    return currDateTime.isBetween(startDateTimeMoment, endDateTimeMoment);
  };

  showEventNotStartedAlert = () => {
    CustomAlert.show(
      "",
      metaFinderCommunityEventLanding("pulseTvLandingEventNotHappeningNow"), //"Event is not happening now, please check back when its time",
      {
        positiveText: "Ok",
        onPositivePress: () => {},
      }
    );
  };

  gotoStreamer = (
    startDateTime,
    endDateTime,
    groupId,
    noOfParticipant,
    eventName
  ) => {
    const isEventInProgress = this.isCurrentMomentBetweenEvent(
      startDateTime,
      endDateTime
    );
    if (!isEventInProgress) {
      this.showEventNotStartedAlert();
      return;
    }
    const liveServerMode = metaFinderCommunityEventLanding(
      "pulseTvLiveServerMode"
    );
    if (liveServerMode === "RTMP") {
      this.props.registerEvent(eventNames.startEventStream, {
        groupId,
      });
      this.props.groupStatusUpdate(groupId, "ACTIVE");

      this.props.gotoWithParams("PulseTvStreamer", {
        roomName: this.props.userEmail,
        userName: this.props.userEmail,
        groupId: groupId,
      });
    } else if (liveServerMode === "TWILIO") {
      const screenIdPostForParticipant =
        noOfParticipant === 1 ? "PULSE_TV_VIDEO_CALL" : "PULSE_TV_WEBINAR";
      this.props.startWebinarOrVideoCall(
        groupId,
        screenIdPostForParticipant,
        eventName
      );
    }
  };

  gotoViewer = (startDateTime, endDateTime, eventOwnerId, webinarCall, id) => {
    const isEventInProgress = this.isCurrentMomentBetweenEvent(
      startDateTime,
      endDateTime
    );
    if (!isEventInProgress) {
      this.showEventNotStartedAlert();
      return;
    }
    const liveServerMode = metaFinderCommunityEventLanding(
      "pulseTvLiveServerMode"
    );
    if (liveServerMode === "RTMP") {
      this.props.gotoWithParams("PulseTvViewer", {
        roomName: eventOwnerId,
        userName: this.props.userEmail,
        data: {
          roomName: eventOwnerId,
        },
      });
    } else if (liveServerMode === "TWILIO") {
      if (!webinarCall) {
        this.showEventNotStartedAlert();
        return;
      }
      this.props.saveWebinarId(id);
      this.props.goToWebinar(webinarCall);
    }
  };

  onRefresh = () => {
    this.props.getCustomerGroups();
  };

  getEvents = () => {
    const data = this.props.myEvents;
    const reducer = (acc, cur) => {
      let item = acc.find(
        x =>
          new Date(x.date).toDateString() ===
          new Date(cur.groupActivity.startTime).toDateString()
      );
      if (moment(cur?.groupActivity?.endTime).isAfter()) {
        if (item) {
          item.data.push(cur);

          item.data.sort((x, y) => {
            return moment(y.groupActivity.startTime).diff(
              moment(x.groupActivity.startTime)
            );
          });
        } else {
          acc.push({
            date: cur.groupActivity.startTime,
            data: [cur],
          });
        }
      }
      return acc;
    };
    return data
      .reduce(reducer, [])
      .sort((x, y) => moment(x.date) - moment(y.date));
  };

  getDisplayDate = date => {
    if (moment(date).isSame(moment(), "day")) {
      return metaFinderCommunityEventLanding("pulseTvLandingToday");
    } else if (moment(date).isSame(moment().add(1, "d"), "day")) {
      return metaFinderCommunityEventLanding("pulseTvLandingTommorow");
    } else if (moment(date).isSame(moment().add(2, "d"), "day")) {
      return "Later";
    }
    {
      return moment(date).format("DD MMM YYYY");
    }
  };

  render() {
    const { userId } = this.props;
    const myEventsForSectionList = this.getEvents();
    return (
      <SectionList
        sections={myEventsForSectionList}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              this.onRefresh();
            }}
            refreshing={false}
          />
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <EventCard
              item={item}
              isSelf={userId === item.createdBy.id}
              onStreamStart={this.gotoStreamer}
              onJoinStream={this.gotoViewer}
              isSpecial={false}
            />
          );
        }}
        renderSectionHeader={({ section: { date } }) => {
          const displayDate = this.getDisplayDate(date);
          if (displayDate) {
            return <Text style={styles.dateText}>{displayDate}</Text>;
          } else {
            return null;
          }
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.profile.id,
    userEmail: state.profile.email,
    myEvents: pathOr([], ["communityEvents", "myEvents"], state),
  };
};

const mapDispatchToProps = {
  goto,
  gotoWithParams,
  registerEvent,
  getCustomerGroups,
  groupStatusUpdate,
  startWebinarOrVideoCall,
  goToWebinar,
  saveWebinarId,
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(MyEvents)
);

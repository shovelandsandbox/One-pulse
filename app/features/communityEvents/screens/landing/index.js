import React, { PureComponent } from "react";
import { SafeAreaView, View } from "react-native";
import {
  headers,
  CommunityEventTabs,
  MyEvents,
  AllEvents,
  EventHistory,
} from "./../../components";
import { connect } from "react-redux";
import styles from "./../../styles";
import { metaFinderCommunityEventLanding } from "./../../meta";
import { goto, gotoWithParams } from "./../../../../actions";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";
import screens from "../../config/screens";
import moment from "moment";
import { CustomAlert } from "../../../../components";

import { getCommunityEvents, setCurrentJourney } from "../../actions";
import { setStreamingUrls } from "../../config";
import { initSocketManager } from "../../socketManager";

class CommunityEventsLanding extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      menuVisible: false,
    };
    const streamingServerIpAddr = metaFinderCommunityEventLanding(
      "streamingServerIp"
    );
    setStreamingUrls(streamingServerIpAddr);
    initSocketManager();
  }

  componentWillMount() {
    this.props.setCurrentJourney("COMMUNITY_EVENTS");
    this.props.registerEvent(eventNames.communityEventsLandingScreen);
  }

  rightAction = () => {
    this.props.setEditEvent(null);
    this.props.goto(screens.CREATE_COMMUNITY_EVENT);
  };

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

  gotoStreamer = (startDateTime, endDateTime, groupId) => {
    const isEventInProgress = this.isCurrentMomentBetweenEvent(
      startDateTime,
      endDateTime
    );
    if (!isEventInProgress) {
      this.showEventNotStartedAlert();
    } else {
      this.props.registerEvent(eventNames.startEventStream, {
        groupId,
      });
      this.props.gotoWithParams("PulseTvStreamer", {
        roomName: this.props.userEmail,
        userName: this.props.userEmail,
      });
    }
  };

  gotoViewer = (startDateTime, endDateTime, eventOwnerId) => {
    const isEventInProgress = this.isCurrentMomentBetweenEvent(
      startDateTime,
      endDateTime
    );
    if (!isEventInProgress) {
      this.showEventNotStartedAlert();
    } else {
      this.props.gotoWithParams("PulseTvViewer", {
        roomName: eventOwnerId,
        userName: this.props.userEmail,
        data: {
          roomName: eventOwnerId,
        },
      });
    }
  };

  renderContent = () => {
    const { selectedTab } = this.state;
    return (
      <View style={styles.scrollContainer}>
        {selectedTab === 0 ? <MyEvents /> : null}
        {selectedTab === 1 ? <AllEvents /> : null}
        {selectedTab === 2 ? <EventHistory /> : null}
      </View>
    );
  };

  render() {
    const title = metaFinderCommunityEventLanding("pulseTvLandingMyEvents");
    return (
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.shadow}>
          {headers.renderPlainBackHeader(title, false)}
          <CommunityEventTabs
            tabs={[
              {
                tabName: metaFinderCommunityEventLanding(
                  "pulseTvLandingMyEvents"
                ),
                tabIndex: 0,
              },
              {
                tabName: metaFinderCommunityEventLanding(
                  "pulseTvLandingAllEvents"
                ),
                tabIndex: 1,
              },
              {
                tabName: metaFinderCommunityEventLanding(
                  "pulseTvLandingMyEventsHistory"
                ),
                tabIndex: 2,
              },
            ]}
            selectedTabIndex={this.state.selectedTab}
            onTabSelect={selectedTab => {
              this.setState({ selectedTab: selectedTab.tabIndex });
            }}
          />
        </View>
        {this.renderContent()}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.profile.id,
    userEmail: state.profile.email,
    communityEvents: state.communityEvents.communityEventsData,
  };
};

const mapDispatchToProps = {
  goto,
  gotoWithParams,
  registerEvent,
  getCommunityEvents,
  setCurrentJourney,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommunityEventsLanding);

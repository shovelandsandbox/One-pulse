import React, { PureComponent } from "react";
import {
  FlatList,
  View,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import moment from "moment";

import { metaFinderCommunityEventLanding } from "./../../meta";
import { goto, gotoWithParams } from "./../../../../actions";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";
import {
  getCommunityEvents,
  createGroupMembers,
  goToWebinar,
  getCustomerGroups,
  resetAllCommunityEvents,
  joinGroup,
} from "../../actions";
import EventCard from "../EventCard";
import { CustomAlert } from "../../../../components";
import { withNavigation } from "react-navigation";

class AllEvents extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 0,
    };
  }
  componentDidMount() {
    this.props.resetAllCommunityEvents();
    this.props.getCustomerGroups(true);
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

  onRefresh = () => {
    this.props.resetAllCommunityEvents();
    this.props.getCustomerGroups(true);
    this.setState({
      pageNo: 0,
    });
  };

  renderLoader() {
    return (
      <View style={{ marginVertical: 20 }}>
        <ActivityIndicator size="large" color={"red"} />
      </View>
    );
  }

  onEndReached = () => {
    if (this.props.nextPage) {
      this.setState(
        prevState => ({
          pageNo: prevState.pageNo + 1,
        }),
        () => {
          this.props.getCommunityEvents(this.state.pageNo);
        }
      );
    }
  };

  render() {
    const { communityEvents, userId, goToWebinar } = this.props;
    return (
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={this.onRefresh} refreshing={false} />
        }
        keyExtractor={(item, index) => index.toString()}
        data={communityEvents}
        extraData={this.props}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.9}
        contentContainerStyle={{ paddingTop: 14 }}
        bounces={false}
        ListFooterComponent={() => {
          return this.props.nextPage && !this.props.isLoading
            ? this.renderLoader()
            : false;
        }}
        renderItem={({ item }) => {
          return (
            <EventCard
              item={item}
              isAllEvents={true}
              onAttend={item => {
                const contact = [
                  {
                    email: this.props.userEmail,
                  },
                ];
                this.props.joinGroup(contact, item.id);
              }}
            />
          );
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.profile.id,
    userEmail: state.profile.email,
    communityEvents: state.communityEvents.filteredAllEvent,
    nextPage: state.communityEvents.nextPage,
    isLoading: state.trigger.isLoading,
  };
};

const mapDispatchToProps = {
  goto,
  gotoWithParams,
  registerEvent,
  getCommunityEvents,
  createGroupMembers,
  goToWebinar,
  getCustomerGroups,
  resetAllCommunityEvents,
  joinGroup,
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(AllEvents)
);

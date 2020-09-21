import React, { PureComponent } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  SectionList,
  RefreshControl,
} from "react-native";
import {
  headers,
  EventManagerNoEvents,
  CommunityEventTabs,
} from "../../components";
import {
  getCustomerEventsForManager,
  setCurrentJourney,
  setEditEvent,
  deleteEvent,
} from "../../actions";
import { goto } from "./../../../../actions";
import { connect } from "react-redux";
import EventCard from "../../components/EventCard";
import moment from "moment";
import { filter, pathOr, groupBy } from "ramda";
import { ADD_EVENT_IMAGE, INFO_WARNING } from "../../assets/communityGroup";
import screens from "../../config/screens";
import styles from "./styles";
import { MenuProvider } from "react-native-popup-menu";
import {
  PruRoundedButton,
  CustomAlert,
  ShadowWrapper,
} from "../../../../components";
import { WPDarkModal } from "../../../wellnessPlans/components/WPDarkModal";
import { metaFinderCommunityEventLanding } from "./../../meta";

const isEventInPast = event => {
  const eventEndDateMoment = moment(event.groupActivity.endTime);
  return eventEndDateMoment.isBefore(moment());
};

const isEventInFuture = event => {
  const eventEndDateMoment = moment(event.groupActivity.endTime);
  return eventEndDateMoment.isAfter(moment());
};

const groupEventsByDate = groupBy(event => {
  const eventStartDateMoment = event.groupActivity.startTime;
  if (moment(eventStartDateMoment).isSame(moment(), "day")) {
    return "Today";
  } else if (moment(eventStartDateMoment).isSame(moment().add(1, "d"), "day")) {
    return "Tomorrow";
  } else {
    return "";
  }
});

const sectionListDataFormat = groupByData => {
  const keys = Object.keys(groupByData);
  const sectionListData = keys.map(keyName => {
    return {
      title: keyName,
      data: groupByData[keyName],
    };
  });
  return sectionListData;
};

class EventManagerLanding extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
    };
  }

  componentDidMount() {
    this.props.setCurrentJourney("EVENT_MANAGER");
    this.props.getCustomerEventsForManager();
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.setState({
          selectedTab: 0,
        });
      }
    );
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  handleCreateEvent = () => {
    this.props.setEditEvent(null);
    this.props.goto(screens.CREATE_COMMUNITY_EVENT);
  };

  onRefresh = () => {
    this.props.getCustomerEventsForManager();
  };

  getEventsForTab = () => {
    let allEvents = this.props.eventsForEventMgr;
    if (this.state.selectedTab === 0) {
      allEvents = filter(isEventInFuture, allEvents);
    } else if (this.state.selectedTab === 1) {
      allEvents = filter(isEventInPast, allEvents);
    }
    const groupedEvents = groupEventsByDate(allEvents);
    return sectionListDataFormat(groupedEvents);
  };

  getDisplayDate = date => {
    if (moment(date).isSame(moment(), "day")) {
      return "Today";
    } else if (moment(date).isSame(moment().add(1, "d"), "day")) {
      return "Tomorrow";
    } else if (moment(date).isSame(moment().add(2, "d"), "day")) {
      return "Later";
    } else {
      return moment(date).format("DD MMM YYYY");
    }
  };

  onEditPress = item => {
    if (this.canHandleMoreActions(item)) {
      this.props.setEditEvent(item);
      this.props.goto(screens.CREATE_COMMUNITY_EVENT);
    } else {
      this.showCantEditAlert();
    }
  };

  onInviteMore = item => {
    if (this.canHandleMoreActions(item)) {
      this.props.setEditEvent(item);
      this.props.goto(screens.EVENT_UPDATE_INVITE);
    } else {
      this.showCantEditAlert();
    }
  };

  canHandleMoreActions = item => {
    return moment(item?.groupActivity?.startTime).diff(moment(), "hours") >= 1;
  };

  onDeleteEvent = item => {
    if (this.canHandleMoreActions(item)) {
      WPDarkModal.show({
        Component: () => (
          <View style={styles.deleteAlertContainer}>
            <Image
              source={INFO_WARNING}
              style={styles.deleteAlertIcon}
              resizeMode={"contain"}
            />
            <Text style={styles.deleteAlertTitle}>{metaFinderCommunityEventLanding("pulseTvAreYouSure")}</Text>
            <Text style={styles.deleteAlertDesc}>
            {metaFinderCommunityEventLanding("pulseTvWantToDel")} 
            </Text>
            <View style={styles.deleteConfirmActions}>
              <TouchableOpacity
                style={styles.noButton}
                onPress={() => {
                  WPDarkModal.hide();
                }}
              >
                <Text style={styles.noText}>{metaFinderCommunityEventLanding("pulseTvCancel")}</Text>
              </TouchableOpacity>
              <PruRoundedButton
                buttonTitle={"Delete"}
                style={styles.delete}
                onPress={() => {
                  WPDarkModal.hide();
                  this.props.deleteEvent(item.id);
                }}
              />
            </View>
          </View>
        ),
        onNegativePress: () => {},
        modalConfig: {
          onBackButtonPress: () => null,
          onBackdropPress: () => null,
        },
      });
    } else {
      this.showCantEditAlert();
    }
  };

  showCantEditAlert = () => {
    CustomAlert.show(
      "",
      metaFinderCommunityEventLanding("pulseTvSorryEditOrDelete"), 
    );
  };

  render() {
    const eventsToShow = this.getEventsForTab();
    const { selectedTab } = this.state;
    const { userId } = this.props;

    return (
      <MenuProvider
        customStyles={{
          backdrop: {
            backgroundColor: "black",
            opacity: 0.5,
          },
        }}
      >
        <View style={styles.container}>
          <ShadowWrapper style={{ borderRadius: 0, padding: 0 }}>
            {headers.renderPlainBackHeader("My Events", false)}
            {this.props.eventsForEventMgr.length !== 0 ? (
              <CommunityEventTabs
                tabs={[
                  {
                    tabName: metaFinderCommunityEventLanding("pulseTvLandingAllEvents"),
                    tabIndex: 0,
                  },
                  {
                    tabName: metaFinderCommunityEventLanding("pulseTvLandingMyEventsHistory"),
                    tabIndex: 1,
                  },
                ]}
                selectedTabIndex={this.state.selectedTab}
                onTabSelect={selectedTab => {
                  this.setState({ selectedTab: selectedTab.tabIndex });
                }}
              />
            ) : null}
          </ShadowWrapper>
          {this.props.eventsForEventMgr.length === 0 ? (
            <EventManagerNoEvents
              handleCreateEvent={this.handleCreateEvent}
            ></EventManagerNoEvents>
          ) : (
            <>
              <SectionList
                sections={eventsToShow}
                contentContainerStyle={{ paddingBottom: 120 }}
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
                  const canEdit =
                    selectedTab === 0 &&
                    item.attributes?.eventOrganizerId === userId;
                  return (
                    <EventCard
                      item={item}
                      eventMgr={true}
                      isSpecial={false}
                      onEditPress={
                        canEdit
                          ? () => {
                              this.onEditPress(item);
                            }
                          : null
                      }
                      onInviteMore={() => this.onInviteMore(item)}
                      onDeleteEvent={this.onDeleteEvent}
                    />
                  );
                }}
                renderSectionHeader={({ section: { title } }) => {
                  return <Text style={styles.dateText}>{title}</Text>;
                }}
              />
            </>
          )}
          {this.props.eventsForEventMgr.length != 0 ? (
            <View style={{ position: "absolute", bottom: 15, right: 15 }}>
              <TouchableOpacity onPress={this.handleCreateEvent}>
                <Image
                  source={ADD_EVENT_IMAGE}
                  style={{ height: 100, width: 100 }}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </MenuProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventsForEventMgr: pathOr(
      [],
      ["communityEvents", "eventsForEventMgr"],
      state
    ),
    userId: state.profile.email,
  };
};

const mapDispatchToProps = {
  getCustomerEventsForManager,
  goto,
  setCurrentJourney,
  setEditEvent,
  deleteEvent,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventManagerLanding);

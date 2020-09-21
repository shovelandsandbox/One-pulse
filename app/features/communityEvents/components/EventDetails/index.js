import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import styles from "./styles";
import moment from "moment";
import { EXERCISE_IMAGE } from "../../assets/communityGroup";
import { pathOr } from "ramda";
import { ordinal_suffix_of } from "../../utils/utility";
import { metaFinderCommunityEventLanding } from "./../../meta";

export default class EventDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderAllEvents = () => {
    const {
      communityEvents,
      selectedTab,
      onStreamStart,
      onJoinStream,
      userId,
      onRefresh,
      isFetching,
    } = this.props;

    return (
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={isFetching} />
        }
        keyExtractor={(item, index) => index.toString()}
        data={communityEvents}
        extraData={this.props}
        contentContainerStyle={{ paddingTop: 14 }}
        renderItem={({ item }) => {
          const startDateMoment = moment(item.groupActivity.startTime);
          const endDateTimeMoment = moment(item.groupActivity.endTime);
          const eventDate = startDateMoment.format("DD");
          const eventMonth = startDateMoment.format("MMM");
          const eventYear = startDateMoment.format("YYYY");
          const eventStartTime = startDateMoment.format("hh:mm A");
          const eventEndTime = endDateTimeMoment.format("hh:mm A");
          const startDateSuffix = ordinal_suffix_of(eventDate);

          const eventEndDate = endDateTimeMoment.format("DD");
          const eventEndMonth = endDateTimeMoment.format("MMM");
          const eventEndYear = endDateTimeMoment.format("YYYY");
          const endDateSuffix = ordinal_suffix_of(eventEndDate);

          if (!startDateMoment.isValid()) {
            return null;
          }
          return (
            <View style={styles.eventContainer}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <Text style={styles.eventDate}>
                  {`${eventDate}${startDateSuffix} ${eventMonth} ${eventYear}`}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                <Text style={{ color: "#707070", fontSize: 12 }}>
                  End Date:{" "}
                  <Text
                    style={{
                      paddingHorizontal: 5,
                      color: "#1a1a1a",
                      fontSize: 13,
                      fontWeight: "400",
                    }}
                  >
                    {`${eventEndDate}${endDateSuffix} ${eventEndMonth} ${eventEndYear}`}
                  </Text>
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 5,
                    color: "#1a1a1a",
                    fontSize: 13,
                    fontWeight: "400",
                  }}
                >
                  <Text style={{ color: "#707070", fontSize: 12 }}>
                    Timing:{" "}
                  </Text>
                  {`${eventStartTime} to ${eventEndTime}`}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#ffbbbe",
                  marginVertical: 5,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 6,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "400" }}>
              <Text style={{ color: "#2a2a2a" }}>{metaFinderCommunityEventLanding("pulseTvLocation")}</Text>
                  <Text style={{ color: "#db192a" }}>{metaFinderCommunityEventLanding("pulseTvLiveEvent")}</Text>
                </Text>
              </View>
              <Text style={styles.eventDate}>{item.name}</Text>
              {item?.icon?.url ? (
                <View style={{ padding: 1, marginVertical: 5 }}>
                  <Image
                    style={styles.eventDetailsPic}
                    source={{
                      uri: item.icon.url ? item.icon.url : null,
                    }}
                    resizeMode="cover"
                  />
                </View>
              ) : null}
              <View
                style={{
                  marginTop: 4,
                  borderWidth: 1,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderColor: "#70707070",
                  borderRadius: 4,
                }}
              >
                <Text style={{ fontSize: 12, color: "#414141" }}>
                  {item.description}
                </Text>
              </View>
              <View style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 14, color: "#a4a4a4" }}>
                {metaFinderCommunityEventLanding("pulseTvInvitedBy")}
                  <Text style={{ fontWeight: "600", color: "#2f2f2f" }}>
                    {` ${item.createdBy.firstName} ${item.createdBy.surName}`}
                  </Text>
                </Text>
                <Text style={{ fontSize: 14, color: "#6e6e6e" }}>
                {metaFinderCommunityEventLanding("pulseTvCommunityName")} {item.classification}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginRight: 10,
                }}
              >
                {userId === item.createdBy.id ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#34a853",
                      width: 60,
                      height: 26,
                      borderRadius: 5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      onStreamStart(
                        item.groupActivity.startTime,
                        item.groupActivity.endTime,
                        item.id
                      );
                    }}
                  >
                    <Text style={{ color: "#FFF" }}>{metaFinderCommunityEventLanding("pulseTvLandingEventStart")}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#34a853",
                      width: 60,
                      height: 26,
                      borderRadius: 5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      onJoinStream(
                        item.groupActivity.startTime,
                        item.groupActivity.endTime,
                        pathOr(
                          "",
                          ["createdBy", "contactDetails", "email", "value"],
                          item
                        )
                      );
                    }}
                  >
                    <Text style={{ color: "#FFF" }}>{metaFinderCommunityEventLanding("pulseTvLandingEventJoin")}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
      />
    );
  };

  render() {
    return this.renderAllEvents();
  }
}

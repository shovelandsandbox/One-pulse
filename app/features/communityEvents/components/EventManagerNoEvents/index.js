import React, { PureComponent } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import styles from "./styles";
import { NO_EVENT_IMAGE, ADD_EVENT_IMAGE } from "../../assets/communityGroup";
import { metaFinderCommunityEventLanding } from "./../../meta";

export default class EventManagerNoEvents extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { handleCreateEvent } = this.props;
    return (
      <View style={styles.noEventsContainer}>
        <Image source={NO_EVENT_IMAGE} style={styles.imageStyle} />
        <View style={{ padding: 20, margin: 10 }}>
          <Text
            style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}
          >
          {metaFinderCommunityEventLanding("pulseTvYouHaveNoEventsYet")}  
          </Text>
          <Text style={{ marginTop: 5, textAlign: "center", fontSize: 16 }}>
          {metaFinderCommunityEventLanding("pulseTvCreateAndOrgEvent")}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end", marginBottom: 15 }}>
          <TouchableOpacity onPress={handleCreateEvent}>
            <Image
              source={ADD_EVENT_IMAGE}
              style={{ height: 100, width: 100 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

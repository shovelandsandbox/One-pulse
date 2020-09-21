import React, { PureComponent } from "react";
import { View } from "react-native";
import styles from "./styles";
import EventProfile from "../EventProfile";
import EventContent from "../EventContent";
import PropTypes from "prop-types";
import LikeAndComments from "../../../../features/likesAndComments";
import moment from "moment";

export default class EventHistoryMain extends PureComponent {
  render() {
    const { data, onVideoPress } = this.props;
    const name = data.name;
    const description = data.description;
    const startDateMoment = moment(data.groupActivity.startTime);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.borderContainer}>
          <EventProfile
            name={name}
            time={
              !startDateMoment.isValid()
                ? ""
                : `Was live on ${startDateMoment.format("DD-MMM-YYYY HH:MM A")}`
            }
          />
          <EventContent data={data} onPress={() => onVideoPress(data)} />
          <View>
            <LikeAndComments
              showSeperator={false}
              groupId={data.id}
              uri={data?.icon?.url}
              articleData={{
                uri: data?.icon?.url,
                title: name,
                desc: description,
              }}
              type={"image"}
              isShareDisabled={true}
            />
          </View>
        </View>
      </View>
    );
  }
}
EventHistoryMain.propTypes = {
  data: PropTypes.object,
  onVideoPress: PropTypes.func,
};

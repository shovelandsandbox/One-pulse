import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { PLAY_BUTTON } from "../../../../config/images";
import styles from "./styles";
const EventContent = ({ data, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(data)} style={{ height: 190 }}>
      <ImageBackground
        style={styles.imageStyle}
        source={{
          uri: data.icon.url ? data.icon.url : null,
        }}
        resizeMode="cover"
      >
        <View style={styles.videoViewStyle}>
          <Image source={PLAY_BUTTON} style={styles.playButton} />
        </View>
      </ImageBackground>
      <Text style={styles.headingStyle} numberOfLines={1}>
        {data.description}
      </Text>
    </TouchableOpacity>
  );
};

EventContent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onPress: PropTypes.func,
  data: PropTypes.object,
};

export default EventContent;

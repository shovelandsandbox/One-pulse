import React from "react";
import { 
  View, 
  Image,
  ImageBackground, 
  Text, 
  TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import { MAN_DOING_SQUATS, BACK_WHITE } from "../../../config/images";

import styles from "../exercises/styles";

export default BreakScreen = props => {
  const { 
    displayText,
    onPressOfBack, 
    timer,
  } = props;

  return (
    <View>
      <ImageBackground
        style={styles.imgBackgroundStyle}
        source={MAN_DOING_SQUATS}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={onPressOfBack}
        >
          <Image source={BACK_WHITE} />
        </TouchableOpacity>
        <View style={styles.startActivityContainer}>
          <Text style={styles.getReadyText}>{"Get Ready!"}</Text>
          <Text style={styles.challengeStartText}>{displayText}</Text>
          <Text style={styles.startTimerStyle}>{timer}</Text>
        </View>
      </ImageBackground>
    </View>
  )
};

BreakScreen.propTypes = {
  displayText: PropTypes.string,
  onPress: PropTypes.func,
  timer: PropTypes.number,
}

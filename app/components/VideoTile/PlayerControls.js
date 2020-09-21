import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import {
  VideoSkipBack,
  VideoPrevious,
  VideoPause,
  VideoPlay,
  VideoNext,
  VideoSkipForward,
} from "../../../assets/icons";

const PlayerControls = ({
  playing,
  showPreviousAndNext,
  showSkip,
  previousDisabled,
  nextDisabled,
  onPlay,
  onPause,
  skipForwards,
  skipBackwards,
  onNext,
  onPrevious,
}) => (
  <View style={styles.wrapper}>
    {showPreviousAndNext && (
      <TouchableOpacity
        style={[styles.touchable, previousDisabled && styles.touchableDisabled]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={onPrevious}
        disabled={previousDisabled}
      >
        <VideoPrevious />
      </TouchableOpacity>
    )}

    {showSkip && (
      <TouchableOpacity
        style={styles.touchable}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={skipBackwards}
      >
        <VideoSkipBack />
      </TouchableOpacity>
    )}

    <TouchableOpacity
      style={styles.touchable}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPress={playing ? onPause : onPlay}
    >
      {playing ? <VideoPause /> : <VideoPlay />}
    </TouchableOpacity>

    {showSkip && (
      <TouchableOpacity
        style={styles.touchable}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={skipForwards}
      >
        <VideoSkipForward />
      </TouchableOpacity>
    )}

    {showPreviousAndNext && (
      <TouchableOpacity
        style={[styles.touchable, nextDisabled && styles.touchableDisabled]}
        onPress={onNext}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        disabled={nextDisabled}
      >
        <VideoNext />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  touchable: {
    padding: 5,
  },
  touchableDisabled: {
    opacity: 0.3,
  },
  wrapper: {
    alignItems: "center",
    flexDirection: "row",
    flex: 3,
    justifyContent: "space-evenly",
    paddingHorizontal: 5,
  },
});

export default PlayerControls;

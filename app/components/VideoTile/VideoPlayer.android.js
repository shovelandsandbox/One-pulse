/* eslint-disable complexity */
/* eslint-disable react-native/no-color-literals */
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Video from "react-native-video";
import { VideoComponentType } from "../ScreenLayouts/propType";
import FastImage from "react-native-fast-image";
import { VideoPlay } from "../../../assets/icons";

import YoutubePlayer from "react-native-youtube-iframe";

const VideoPlayer = ({ config, style }) => {
  const [state, setState] = useState({ loadVideo: false });

  const urlArray = config.properties.uri
    ? config.properties.uri.split(":")
    : [null, null];

  const isYoutube = urlArray[0] === "youtube";
  const { width, ...rest } = config.style;

  return (
    <View style={styles.container}>
      {!state.loadVideo && (
        <View>
          {config.properties.thumb && (
            <FastImage
              style={rest}
              defaultSource={{ uri: config.properties.thumb }}
              source={{ uri: config.properties.thumb }}
              resizeMode={FastImage.resizeMode.stretch}
            />
          )}
          <View style={styles.overlay}>
            <TouchableOpacity
              style={[styles.fill, styles.centerAlign]}
              onPress={() => setState({ loadVideo: true })}
            >
              <VideoPlay></VideoPlay>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {state.loadVideo && !isYoutube && (
        <Video
          source={{ uri: config.properties.uri }}
          style={[styles.video, style]}
          controls={true}
          resizeMode={config.resizeMode || "stretch"}
          poster={config.properties.thumb}
          // paused={!config.autoPlay}
          paused={false}
        />
      )}
      {state.loadVideo && isYoutube && (
        <YoutubePlayer
          height={style.height}
          videoId={urlArray[1]}
          play
          webViewProps={{
            injectedJavaScript: `
            var element = document.getElementsByClassName('container')[0];
            element.style.paddingBottom = '${style.height}px';
            true;
          `,
          }}
        />
      )}
    </View>
  );
};

VideoPlayer.defaultProps = {};

VideoPlayer.propTypes = {
  config: VideoComponentType,
};

const styles = StyleSheet.create({
  centerAlign: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  fill: {
    flex: 1,
  },
  iconContainer: {
    flex: 1,
  },
  overlay: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  video: {
    backgroundColor: "black",
  },
});

export default VideoPlayer;

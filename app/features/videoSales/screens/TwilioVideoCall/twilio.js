import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  BackHandler,
  Animated,
  Platform,
  Image,
  Keyboard,
  Alert,
  Dimensions,
  NativeModules,
} from "react-native";

import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
  TwilioBroadcastButton,
} from "react-native-twilio-video-webrtc";
import { connect } from "react-redux";
import Orientation from "react-native-orientation";

import { last, isEmpty, pathOr } from "ramda";

import {
  CoreComponents,
  colors,
  VideoCallImages,
  events,
} from "@pru-rt-internal/pulse-common";
import { dispatchEvent } from "../../../../actions";
import { OfflineImage } from "react-native-image-offline";
import PropType from "prop-types";
const { CustomTwilioVideoViewModule } = NativeModules;
const { RoundedImage } = CoreComponents;
const { MIC_MUTE, VIDEO, CAM_FLIP, CALL_DISCONNECT } = VideoCallImages;
import {registerEvent} from "../../../../utils/registerEvents/actions";
import {eventNames} from "../../events";

import {
  videoResize,
  createChatChannel,
  getCustomerByEmail,
  updateChatSession,
  clearContactList,
} from "../../actions";
import actionNames from "../../configs/actionNames";
import userDefaults from "react-native-user-defaults";
import AppConfig from "../../../../config/AppConfig";
import {
  SALE_SCREEN_SHARE,
  MINIMIZE_ICON,
  VIDEO_TEXT_CHAT_ICON,
  ADD_PEOPLE,
} from "../../../../config/images";
import MetaConstants from "../../meta";
import { CustomAlert } from "../../../../components";
const AUTO_HIDE_CONTROLS_TIME = 5000; //in ms
const window = Dimensions.get("window");
const deviceHeight = window.height;
const deviceWidth = window.width;

const CALL_STATUS = {
  CONNECTING: "CONNECTING",
  CONNECTED: "CONNECTED",
  CONNECTION_FAILED: "CONNECTION_FAILED",
  DISCONNECTED: "DISCONNECTED",
};

const ORIENTATION_MODE = {
  PORTRAIT: 0,
  LANDSCAPE: 1,
  UNLOCK: 2,
};

class Twilio extends PureComponent {
  constructor(props) {
    super(props);
    this.metaConstants = { ...MetaConstants.screenMeta() };
    this.state = {
      isAudioEnabled: true,
      isVideoEnabled: true,
      status: CALL_STATUS.CONNECTING,
      videoTracks: [],
      shareShareTrack: [],
      showLocalInFullScreen: false,
      screenSharing: false,
      totalParticipants: 0,
      androidStartShare: false,
      controlPosition: new Animated.Value(250),
      isParticipantScreenShareStarted: false,
    };
  }

  timeOutHolder = null;
  showControls = false;
  orientation = null;

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    this.changeOrientation(ORIENTATION_MODE.PORTRAIT);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    this.changeOrientation(ORIENTATION_MODE.PORTRAIT);
  }

  changeOrientation = mode => {
    //store the current mode only for fixed ones - potrait and landscape only
    switch (mode) {
      case ORIENTATION_MODE.PORTRAIT:
        Orientation.lockToPortrait();
        this.orientation = mode;
        break;
      case ORIENTATION_MODE.LANDSCAPE:
        Orientation.lockToLandscape();
        this.orientation = mode;
        break;
      case ORIENTATION_MODE.UNLOCK:
        Orientation.unlockAllOrientations();
        break;
    }
  };

  resizeVideo = () => {
    const {
      chatDetails: { chatToken },
      callState,
      videoCallWith,
      videoResize,
      initiator,
      createChatChannel,
      registerEvent
    } = this.props;

    registerEvent(eventNames.minimizeVideoCall)

    if (!chatToken && callState === "VIDEO_CALL_IN_PROGRESS") {
      createChatChannel({ email: videoCallWith });
    }

    videoResize(true);
    this.props.dispatchEvent(events.switchFromChatToVideo);
  };

  handleBackButtonClick = () => {
    const minimize_video_call = this.metaConstants.minimize_video_call;
    const Yes = this.metaConstants.exit_yes;
    const No = this.metaConstants.exit_no;

    if (!this.props.initiator || this.props.isVideoResized) {
      return true;
    }
    CustomAlert.show("", minimize_video_call, {
      positiveText: Yes,
      onPositivePress: () => {
        
        this.resizeVideo();
        return false;
      },
      negativeText: No,
      onNegativePress: () => {
        return true;
      },
    });
    return true;
  };

  componentDidMount() {
    const { channelId, chatToken } = this.props.callDetails;
    this.refs.twilioVideo.connect({
      roomName: channelId,
      accessToken: chatToken,
    });
    if (Platform.OS == "ios") {
      this.setUserDefaults();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isVideoResized !== this.props.isVideoResized) {
      //if video is resized - user is in chat page - unlock all orientations
      if (this.props.isVideoResized) {
        this.changeOrientation(ORIENTATION_MODE.UNLOCK);
      } else {
        // video is fullsized from chat window - restore to previous orientation
        this.changeOrientation(this.orientation);
      }
    }
  }

  setUserDefaults = () => {
    const appGroupId = AppConfig.getAppGroupId();

    const roomName = this.props.callDetails.channelId;
    const apiUrl = `${AppConfig.getHttpUrl()}/chat/${roomName}/session?realm=chat`;
    const apikey = AppConfig.getPruApiKey();
    const auth = `Bearer ${this.props.token}`;

    userDefaults.set("room_name", roomName, appGroupId);
    userDefaults.set("a_t", auth, appGroupId);
    userDefaults.set("api_key", apikey, appGroupId);
    userDefaults.set("api_url", apiUrl, appGroupId);
  };

  _onEndButtonPress = () => {
    const { totalParticipants, androidStartShare } = this.state;
    if (this.props.initiator || totalParticipants === 1) {
      if (androidStartShare && Platform.OS !== "ios") {
        this.refs.twilioVideo.stopShare();
        this.setState({ androidStartShare: false });
        this.onScreenshareStop();
      }
      this.refs.twilioVideo.disconnect();
      this.props.onEnd();
    } else {
      this.refs.twilioVideo.stopPublishingVideo();
      this.refs.twilioVideo
        .setLocalAudioEnabled(false)
        .then(isEnabled => this.setState({ isAudioEnabled: false }));
    }
    this.props.emptyChatToken();
    this.props.goBack();
  };

  _onMuteButtonPress = () => {
    this.props.registerEvent(eventNames.muteCall);
    this.refs.twilioVideo
      .setLocalAudioEnabled(!this.state.isAudioEnabled)
      .then(isEnabled => this.setState({ isAudioEnabled: isEnabled }));
    this._resetTimerAndStartHideCountdown();
    this.props.dispatchEvent(events.toggleMuteUnMute);
  };

  _onVideoButtonPressed = () => {
    this.refs.twilioVideo
      .setLocalVideoEnabled(!this.state.isVideoEnabled)
      .then(isEnabled => this.setState({ isVideoEnabled: isEnabled }));
    this._resetTimerAndStartHideCountdown();
  };

  _onFlipButtonPress = () => {
    this.props.registerEvent(eventNames.switchCamera)
    this.refs.twilioVideo.flipCamera();
    this._resetTimerAndStartHideCountdown();
    this.props.dispatchEvent(events.switchCameraFrontBack);
  };

  _onAndroidScreenShareStart = async () => {
    if (!this.state.androidStartShare) {
      await CustomTwilioVideoViewModule.setIntent();
      this.setState({ androidStartShare: true });
      this.onScreenshareStart();
      this.refs.twilioVideo.startShare();
    } else {
      this.refs.twilioVideo.stopShare();
      this.setState({ androidStartShare: false });
      this.onScreenshareStop();
    }
  };

  _onRoomDidConnect = () => {
    this.setState({ status: CALL_STATUS.CONNECTED });
    this.props.onConnect();
  };

  _onRoomDidDisconnect = ({ error }) => {
    this.props.emptyChatToken();
    this.props.goBack();
    this.setState({ status: CALL_STATUS.DISCONNECTED });
  };

  _onRoomDidFailToConnect = error => {
    const technical_glitch = this.metaConstants.technical_glitch;
    const Ok = this.metaConstants.all_permission_ok;

    this.setState({ status: CALL_STATUS.CONNECTION_FAILED });
    CustomAlert.show("", technical_glitch, {
      positiveText: Ok,
      onPositivePress: () => {
        this.props.onDrop();
        this.props.emptyChatToken();
        this.props.goBack();
        return false;
      },
    });
  };

  onScreenshareStart = () => {
    //this method is called when user start sharing
    //if a screen track is present remove it - you should not show your own screen
    this.setState(state => ({
      screenSharing: true,
      videoTracks: state.videoTracks.filter(
        videoTrack => videoTrack.trackName != "Screen"
      ),
    }));
    this.props.registerEvent(eventNames.screenShareStart)
    // this.props.dispatchEvent(events.screenShareStart);
  };

  onScreenshareStop = () => {
    this.setState({
      screenSharing: false,
    });
    this.props.registerEvent(eventNames.screenShareEnd)
    // this.props.dispatchEvent(events.screenShareEnd);
  };

  _onParticipantAddedVideoTrack = ({ participant, track }) => {
    //do not add your own screen to the track
    if (this.state.screenSharing && track.trackName === "Screen") {
      return;
    }

    this.setState(
      state => ({
        videoTracks: [
          ...state.videoTracks,
          {
            participantSid: participant.sid,
            videoTrackSid: track.trackSid,
            trackName: track.trackName,
          },
        ],
        totalParticipants: state.totalParticipants + 1,
      }),
      () => {
        //if another participant shares screen share stop publishing your own video
        if (track.trackName === "Screen") {
          //stop publishing
          this.refs.twilioVideo.stopPublishingVideo();
          this.setState({
            isParticipantScreenShareStarted: true,
            shareShareTrack: this.state.videoTracks.filter(
              videoTrack => videoTrack.trackName === "Screen"
            ),
          });
          this.changeOrientation(ORIENTATION_MODE.LANDSCAPE);
        }
      }
    );
  };

  _onParticipantRemovedVideoTrack = ({ track }) => {
    this.setState(
      state => ({
        videoTracks: state.videoTracks.filter(
          videoTrack => videoTrack.videoTrackSid != track.trackSid
        ),
        totalParticipants: state.totalParticipants - 1,
      }),
      () => {
        //if another participant shares screen share stop publishing your own video
        if (track.trackName === "Screen") {
          this.setState({
            isParticipantScreenShareStarted: false,
            shareShareTrack: this.state.videoTracks.filter(
              videoTrack => videoTrack.trackName !== "Screen"
            ),
          });
          //stop publishing
          this.refs.twilioVideo.startPublishingVideo();
          this.changeOrientation(ORIENTATION_MODE.PORTRAIT);
        }
      }
    );
  };

  _onContainerPressed = () => {
    const { isVideoResized, videoResize } = this.props;
    if (isVideoResized) {
      videoResize(false);
      this.props.dispatchEvent(events.switchFromVideoToChat);
    }
    if (!this.showControls) {
      this._resetTimerAndStartHideCountdown();
      Animated.timing(this.state.controlPosition, {
        toValue: 0,
        duration: 1000 * 0.3,
      }).start();
    }
    Keyboard.dismiss();
  };

  _resetTimerAndStartHideCountdown = () => {
    if (this.timeOutHolder) {
      clearTimeout(this.timeOutHolder);
    }
    this.timeOutHolder = setTimeout(() => {
      Animated.timing(this.state.controlPosition, {
        toValue: 250,
        duration: 1000 * 0.3,
      }).start();
    }, AUTO_HIDE_CONTROLS_TIME);
  };

  renderTopControls = () => {
    const { navigation,registerEvent } = this.props;
    return (
      <View style={styles.topOptionsContainer}>
        {this.props.initiator && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              registerEvent(eventNames.addPeople)
              navigation.navigate("AddToVideoChat")
            }}
          >
            <Image source={ADD_PEOPLE} style={styles.controlIcon} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  renderShareButton = () => {
    if (!this.props.initiator) {
      return null;
    }

    if (Platform.OS === "ios") {
      return (
        <View style={styles.optionButton}>
          <View style={styles.broadcastButtonView}>
            <TwilioBroadcastButton
              style={styles.broadcastButton}
              extId={AppConfig.getBroadcastExtId()}
            />
            <View style={styles.broadcastButtonImgView}>
              <Image
                style={styles.broadcastButtonImg}
                source={SALE_SCREEN_SHARE}
              />
            </View>
          </View>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.shareButtonView,
          {
            backgroundColor: this.state.androidStartShare
              ? colors.red
              : colors.green,
          },
        ]}
      >
        <View style={styles.broadcastButtonImgView}>
          <TouchableOpacity onPress={this._onAndroidScreenShareStart}>
            <Image style={styles.androidShareIcon} source={SALE_SCREEN_SHARE} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderControls = () => {
    return (
      <Animated.View
        style={[
          styles.optionsContainer,
          { transform: [{ translateY: this.state.controlPosition }] },
        ]}
      >
        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={styles.callButton}
            onPress={this._onEndButtonPress}
          >
            <OfflineImage
              accessibilityLabel="logo"
              accesible
              resizeMode={"contain"}
              style={styles.btnBar}
              fallbackSource={CALL_DISCONNECT}
              source={CALL_DISCONNECT}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.optionsRow}>
          {this.renderShareButton()}
          <TouchableOpacity
            style={styles.optionButton}
            onPress={this._onFlipButtonPress}
          >
            <RoundedImage imgUrl={CAM_FLIP} backgroundColor={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={this._onVideoButtonPressed}
          >
            <RoundedImage
              imgUrl={VIDEO}
              backgroundColor={
                this.state.isVideoEnabled ? colors.green : colors.red
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={this._onMuteButtonPress}
          >
            <RoundedImage
              imgUrl={MIC_MUTE}
              backgroundColor={
                this.state.isAudioEnabled ? colors.green : colors.red
              }
            />
          </TouchableOpacity>
          {this.props.initiator ? (
            <TouchableOpacity
              style={styles.optionButton}
              onPress={this.handleBackButtonClick}
            >
              <Image source={VIDEO_TEXT_CHAT_ICON} style={styles.controlIcon} />
            </TouchableOpacity>
          ) : (
            this.props.chatDetails.chatToken && (
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => this.props.videoResize(true)}
              >
                <Image source={MINIMIZE_ICON} style={styles.controlIcon} />
              </TouchableOpacity>
            )
          )}
        </View>
      </Animated.View>
    );
  };

  renderLocalVideo = () => {
    return (
      <TwilioVideoLocalView enabled={true} style={styles.fillUpParentView} />
    );
  };

  renderParticipants = () => {
    const { isVideoResized } = this.props;
    const {
      isParticipantScreenShareStarted,
      totalParticipants,
      videoTracks,
      shareShareTrack,
    } = this.state;

    if (isEmpty(this.state.videoTracks)) {
      return null;
    }
    const participantView = isParticipantScreenShareStarted
      ? shareShareTrack
      : videoTracks;
    const Videos = participantView.map(item => {
      const { participantSid, videoTrackSid, trackName } = item;
      const trackIdentifier = {
        participantSid,
        videoTrackSid,
      };

      let scaleType = Platform.OS === "ios" ? "fit" : "fill";
      if (trackName == "Screen") {
        scaleType = "fit";
      }
      const viewHeight =
        totalParticipants > 0 ? deviceHeight / totalParticipants : deviceHeight;
      return (
        <TwilioVideoParticipantView
          style={
            isVideoResized || isParticipantScreenShareStarted
              ? styles.fillUpParentView
              : {
                  height: viewHeight,
                  width: deviceWidth,
                }
          }
          key={videoTrackSid}
          trackIdentifier={trackIdentifier}
          scaleType={scaleType}
        />
      );
    });
    return Videos;
  };
  videoPress = () => {};
  renderFullScreenVideoView = () => {
    if (
      isEmpty(this.state.videoTracks) ||
      this.state.showLocalInFullScreen ||
      this.props.callerType == "local"
    ) {
      return this.renderLocalVideo();
    }
    return this.renderParticipants();
  };

  renderWindowedVideoView = () => {
    const { isVideoResized } = this.props;

    if (isEmpty(this.state.videoTracks) || isVideoResized) {
      return;
    }
    return (
      <TouchableOpacity
        style={styles.windowedVideo}
        // onPress={this._onWindowedViewPressed}
      >
        {this.state.showLocalInFullScreen
          ? this.renderParticipants()
          : this.renderLocalVideo()}
      </TouchableOpacity>
    );
  };

  _onWindowedViewPressed = () => {
    this.setState({ showLocalInFullScreen: !this.state.showLocalInFullScreen });
    this._resetTimerAndStartHideCountdown();
  };

  _onParticipantDidConnect = () => {
    // this.setState(state => ({
    //   totalParticipants: state.totalParticipants + 1,
    // }));
  };

  _onParticipantDidDisconnect = () => {
    // this.setState(state => ({
    //   totalParticipants: state.totalParticipants - 1,
    // }));
  };

  onParticipantDisabledVideoTrack = () => {
    this.props.registerEvent(eventNames.videoTrackDisabled)
    console.log("INFO: ", "Participant disabled video track");
  };

  _onParticipantEnabledVideoTrack = () => {
    this.props.registerEvent(eventNames.videoTrackEnabled)
    console.log("INFO: ", "Participant enabled video");
  };

  _onParticipantDisabledAudioTrack = () => {
    this.props.registerEvent(eventNames.AudioTrackDisabled)
    console.log("INFO: ", "Participant disabled audio");
  };

  _onParticipantEnabledAudioTrack = () => {
    this.props.registerEvent(eventNames.AudioTrackEnabled)
    console.log("INFO: ", "Participant enabled audio");
  };

  renderMessage = () => {
    const sharing_screen = this.metaConstants.sharing_screen;
    const connecting = this.metaConstants.connecting;

    let message = null;

    if (this.state.status === CALL_STATUS.CONNECTING) {
      message = connecting;
    } else if (
      this.state.status === CALL_STATUS.CONNECTED &&
      this.state.screenSharing
    ) {
      message = sharing_screen;
    }
    if (!message) {
      return null;
    }

    return (
      <View style={styles.displayStatus}>
        <Text style={styles.displayStatusText}>{message}</Text>
      </View>
    );
  };

  render() {
    const { isVideoResized } = this.props;

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          style={styles.fillUpParentView}
          onPress={this._onContainerPressed}
        >
          <View style={styles.callContainer}>
            {this.state.status === CALL_STATUS.CONNECTED &&
              this.renderFullScreenVideoView()}
            {this.renderMessage()}
            {!isVideoResized && this.renderTopControls()}
            {!isVideoResized && this.renderControls()}
            {this.state.status === CALL_STATUS.CONNECTED &&
              this.renderWindowedVideoView()}
            <TwilioVideo
              ref="twilioVideo"
              onRoomDidConnect={this._onRoomDidConnect}
              onRoomDidDisconnect={this._onRoomDidDisconnect}
              onRoomDidFailToConnect={this._onRoomDidFailToConnect}
              onParticipantAddedVideoTrack={this._onParticipantAddedVideoTrack}
              onParticipantRemovedVideoTrack={
                this._onParticipantRemovedVideoTrack
              }
              onRoomParticipantDidConnect={this._onParticipantDidConnect}
              onRoomParticipantDidDisconnect={this._onParticipantDidDisconnect}
              onParticipantDisabledVideoTrack={
                this.onParticipantDisabledVideoTrack
              }
              onParticipantEnabledVideoTrack={
                this._onParticipantEnabledVideoTrack
              }
              onParticipantEnabledAudioTrack={
                this._onParticipantEnabledAudioTrack
              }
              onParticipantDisabledAudioTrack={
                this._onParticipantDisabledAudioTrack
              }
              onScreenshareStart={this.onScreenshareStart}
              onScreenshareStop={this.onScreenshareStop}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {
    videoSales: {
      isVideoResized,
      chatDetails,
      videoCallWith,
      initiator,
      contacts,
    },
  } = state;

  return {
    isVideoResized,
    token: state.auth.token,
    chatDetails,
    videoCallWith,
    callState: state.videoSales.state,
    initiator,
    contacts,
  };
};

export default connect(mapStateToProps, {
  registerEvent,
  videoResize,
  emptyChatToken: () => ({
    type: actionNames.emptyCallDetails,
  }),
  createChatChannel,
  dispatchEvent,
  getCustomerByEmail,
  updateChatSession,
  clearContactList,
})(Twilio);

Twilio.propTypes = {
  callDetails: PropType.shape({
    chatToken: PropType.string,
    channelId: PropType.string,
  }),
};

const styles = StyleSheet.create({
  addButton: {
    alignItems: "center",
    borderRadius: 100 / 2,
    flex: 1,
    height: 50,
    justifyContent: "center",
    marginRight: 10,
    position: "absolute",
    right: 0,
    top: 0,
    width: 50,
  },
  androidShareIcon: {
    height: 30,
    width: 30,
  },
  broadcastButton: {
    borderRadius: 50,
    height: 50,
    width: 50,
    zIndex: 10,
  },
  broadcastButtonImg: {
    height: 35,
    width: 35,
  },
  broadcastButtonImgView: {
    alignItems: "center",
    borderColor: colors.white,
    borderRadius: 25.15,
    borderWidth: 1,
    height: 50.3,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    width: 50.3,
  },
  broadcastButtonView: {
    backgroundColor: colors.white,
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  btnBar: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    height: 60,
    justifyContent: "space-evenly",
    marginBottom: 5,
    width: "89%",
  },
  button: {
    marginTop: 100,
  },
  callButton: {
    alignItems: "center",
    borderRadius: 75,
    height: 75,
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    width: 75,
  },
  callContainer: {
    backgroundColor: colors.black,
    bottom: 0,
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  container: {
    flex: 1,
  },
  controlIcon: {
    height: 60,
    width: 60,
  },
  displayStatus: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  displayStatusText: {
    color: colors.white,
  },
  fillUpParentView: {
    flex: 1,
  },
  optionButton: {
    alignItems: "center",
    borderRadius: 100 / 2,
    flex: 1,
    height: 50,
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    width: 50,
  },
  optionsContainer: {
    alignItems: "center",
    bottom: 0,
    height: 200,
    left: 0,
    position: "absolute",
    right: 0,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
    height: 100,
    justifyContent: "space-between",
  },
  shareButtonView: {
    borderRadius: 50,
    height: 50,
    marginLeft: 5,
    width: 50,
  },
  topOptionsContainer: {
    alignItems: "center",
    height: 200,
    marginTop: 5,
    position: "absolute",
    right: 0,
    top: 0,
  },
  windowedVideo: {
    flex: 1,
    height: 150,
    left: 10,
    position: "absolute",
    top: 10,
    width: 100,
  },
});

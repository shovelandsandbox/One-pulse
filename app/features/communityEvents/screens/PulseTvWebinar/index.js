import React, { PureComponent } from "react";
import {
  View,
  Text,
  Platform,
  Animated,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  Image,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import {
  startWebinarOrVideoCall,
  endChatSession,
  createComment,
  updateLikeDislike,
} from "../../actions";
import { headers } from "./../../components";
import { CustomAlert } from "../../../../components";
import { pathOr, last, isEmpty, values, pickBy, any } from "ramda";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from "react-native-twilio-video-webrtc";
import { changeKeepAwake } from "../../../../utils/app-awake-utils";

import {
  CAMERA,
  CAMERA_ACTIVE,
  MICROPHONE,
  MICROPHONE_ACTIVE,
} from "../../../../config/images";
import {
  VideoCallImages,
  events,
  colors,
  CoreServices,
  CoreActionTypes,
  CoreComponents,
} from "@pru-rt-internal/pulse-common";
const { RoundedImage } = CoreComponents;
import { OfflineImage } from "react-native-image-offline";
const { checkDevicePermission, grantDevicePermissions } = CoreServices;
const { CALL_DISCONNECT, CAM_FLIP, MIC_MUTE, VIDEO } = VideoCallImages;
const AUTO_HIDE_CONTROLS_TIME = 5000; //in ms
import OpenSettings from "react-native-open-settings";
import actionNames from "../../config/actions";
import { TextInput } from "react-native-paper";
import ProfileImage from "../../../../components/ProfileImage";
import { metaFinderCommunityEventLanding } from "./../../meta";

const CALL_STATUS = {
  CONNECTING: "CONNECTING",
  CONNECTED: "CONNECTED",
  CONNECTION_FAILED: "CONNECTION_FAILED",
  DISCONNECTED: "DISCONNECTED",
};
const requiredPermissions = [
  {
    key: "camera",
    permissionKey: "camera",
    display: "Camera",
    activeImg: CAMERA_ACTIVE,
    inactiveImg: CAMERA,
  },
  {
    key: "microPhone",
    permissionKey: "micro_phone",
    display: "Microphone",
    activeImg: MICROPHONE_ACTIVE,
    inactiveImg: MICROPHONE,
  },
];
class PulseTvWebinar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: CALL_STATUS.CONNECTING,
      videoTracks: [],
      isAudioEnabled: true,
      controlPosition: new Animated.Value(250),
      permissions: null,
      modalVisible: false,
      areAllPermissionsAvailable: false,
      isVideoEnabled: true,
      commentText: "",
      isLiked: false,
      lastComment: null,
    };
    this.callerId = "";
    this.id = "";
  }
  timeOutHolder = null;
  showControls = false;

  componentDidMount() {
    this.checkRequiredPermissions().then(permissions => {
      const areAllPermissionsAvailable =
        values(pickBy(val => !val, permissions)).length === 0;

      this.setState({
        permissions,
        modalVisible: !areAllPermissionsAvailable,
        areAllPermissionsAvailable,
      });
      if (areAllPermissionsAvailable) {
        this.connectRoom();
      }
    });

    if (Platform.OS == "ios") {
      this.setUserDefaults();
    }
    changeKeepAwake(true);
  }

  componentWillUnmount() {
    changeKeepAwake(false);
  }

  connectRoom = () => {
    const webinarToken = pathOr(
      "",
      ["navigation", "state", "params"],
      this.props
    );
    const roomDetails = webinarToken.webinarCall || this.props.webinarCall;
    const { channelId, chatToken, callerId } = roomDetails;
    this.callerId = callerId;
    this.channelId = channelId;
    this.refs.twilioVideo.connect({
      roomName: channelId,
      accessToken: chatToken,
      enableVideo: this.props.isInitiator ? true : false,
      enableAudio: this.props.isInitiator ? true : false,
    });
    if (!this.props.isInitiator) {
      this.refs.twilioVideo.setLocalAudioEnabled(false);
      this.refs.twilioVideo.setLocalVideoEnabled(false);
    }
  };

  checkRequiredPermissions = () => {
    const promises = requiredPermissions.map(item =>
      checkDevicePermission(item.permissionKey)
    );
    return Promise.all(promises).then(results => {
      const permissions = {};
      requiredPermissions.map((item, idx) => {
        permissions[item.key] = results[idx];
      });
      return permissions;
    });
  };

  hidePermissionsPopup = () => {
    this.setState({
      modalVisible: false,
    });
    this.props.navigation.goBack();
  };

  onGrantAccess = () => {
    const { permissions } = this.state;
    //have to grant access one by one - so chaining each permission promise
    //else device can't show two dialogs together
    const allPermissions = requiredPermissions.reduce(
      (promiseChain, permission) => {
        return promiseChain.then(results => {
          let currentPromise = Promise.resolve(true);
          if (!permissions[permission.key]) {
            currentPromise = grantDevicePermissions(permission.permissionKey);
          }
          return currentPromise.then(result => [...results, result]);
        });
      },
      Promise.resolve([])
    );

    allPermissions.then(results => {
      const All_Permission_Desc = metaFinderCommunityEventLanding("pulseTvPleaseGrantAccess"); //this.metaConstants.all_permission_desc;
      const All_Permission_Ok = metaFinderCommunityEventLanding("pulseTvOk"); //this.metaConstants.all_permission_ok;
      const All_Permission_Cancel = metaFinderCommunityEventLanding("pulseTvCancel"); //this.metaConstants.all_permission_cancel;
      //0 is permission granted
      const permissionDenied = any(x => !x)(results);
      if (permissionDenied) {
        CustomAlert.show("", All_Permission_Desc, {
          positiveText: All_Permission_Ok,
          onPositivePress: () => {
            this.hidePermissionsPopup();
            OpenSettings.openSettings();
          },
          negativeText: All_Permission_Cancel,
          onNegativePress: this.hidePermissionsPopup,
        });
      } else {
        this.setState(
          {
            areAllPermissionsAvailable: true,
            modalVisible: false,
          },
          () => {
            this.connectRoom();
          }
        );
      }
    });
  };

  renderPermissionsList() {
    const granted = metaFinderCommunityEventLanding("pulseTvGranted"); //this.metaConstants.granted;
    const not_granted = metaFinderCommunityEventLanding("pulseTvNotGranted"); //this.metaConstants.granted;

    return requiredPermissions.map(item => {
      const { permissions } = this.state;
      const hasPermission = permissions[item.key];
      return (
        <View style={styles.modalButton} key={item.key}>
          <View>
            <OfflineImage
              key="camera"
              resizeMode="contain"
              style={styles.icons}
              fallbackSource={hasPermission ? item.activeImg : item.inactiveImg}
              source={hasPermission ? item.activeImg : item.inactiveImg}
            />
          </View>
          <View style={styles.contentCenter}>
            <Text style={styles.modalButtonLabel}>
              {hasPermission
                ? item.display + `${granted}`
                : item.display + ` ${not_granted}`}
            </Text>
          </View>
        </View>
      );
    });
  }

  renderPermissionsModal = () => {
    const And = metaFinderCommunityEventLanding("pulseTvAnd"); //this.metaConstants.video_and;
    const Camera = metaFinderCommunityEventLanding("pulseTvCamera"); //this.metaConstants.camera;
    const Cancel = metaFinderCommunityEventLanding("pulseTvCancel"); //this.metaConstants.all_permission_cancel;
    const grant_access = metaFinderCommunityEventLanding("pulseTvGrantAccess"); //this.metaConstants.grant_access;
    const Need_Access_To = metaFinderCommunityEventLanding("pulseTvNeedAccTo");//this.metaConstants.need_access_to;
    const Microphone = metaFinderCommunityEventLanding("pulseTvMicrophone"); //this.metaConstants.microphone;
    return (
      <Modal
        isVisible={this.state.modalVisible}
        onBackdropPress={() => this.setState({ modalVisible: true })}
      >
        <View style={styles.modalStyle}>
          <Text style={styles.modalLabel}>
            {Need_Access_To}
            <Text>{Camera}</Text>
            {And}
            <Text>{Microphone}</Text>
          </Text>
          <View style={styles.permissionsContainer}>
            {this.renderPermissionsList()}
          </View>
          <View style={styles.modalFooterBtnContainer}>
            <View style={{ padding: 20, margin: 15 }}>
              <TouchableOpacity
                style={styles.modalFooterBtn}
                onPress={() => {
                  this.setState({ modalVisible: false });
                  this.props.navigation.goBack();
                }}
              >
                <Text
                  style={[
                    styles.modalFooterLabel,
                    styles.labelBold,
                    styles.textCenter,
                  ]}
                >
                  {Cancel}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ padding: 20, margin: 15 }}>
              <TouchableOpacity
                style={styles.modalFooterBtn}
                onPress={e => {
                  e.preventDefault();
                  this.onGrantAccess();
                }}
              >
                <Text
                  style={[
                    styles.modalFooterLabel,
                    styles.labelBold,
                    styles.textCenter,
                  ]}
                >
                  {grant_access}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  setUserDefaults = () => {
    // const appGroupId = AppConfig.getAppGroupId();
    // const roomName = this.props.callDetails.channelId;
    // const apiUrl = `${AppConfig.getHttpUrl()}/chat/${roomName}/session?realm=chat`;
    // const apikey = AppConfig.getPruApiKey();
    // const auth = `Bearer ${this.props.token}`;
    // userDefaults.set("room_name", roomName, appGroupId);
    // userDefaults.set("a_t", auth, appGroupId);
    // userDefaults.set("api_key", apikey, appGroupId);
    // userDefaults.set("api_url", apiUrl, appGroupId);
  };
  _onParticipantAddedVideoTrack = ({ participant, track }) => {
    //do not add your own screen to the track
    if (participant.identity === this.callerId) {
      this.setState(state => ({
        videoTracks: [
          ...state.videoTracks,
          {
            participantSid: participant.sid,
            videoTrackSid: track.trackSid,
            trackName: track.trackName,
          },
        ],
      }));
    }
  };

  _onParticipantRemovedVideoTrack = ({ participant, track }) => {
    this.setState(state => ({
      videoTracks: state.videoTracks.filter(
        videoTrack => videoTrack.videoTrackSid != track.trackSid
      ),
      totalParticipants: state.totalParticipants - 1,
    }));
  };
  _onParticipantDidDisconnect = ({ participant }) => {
    if (participant.identity === this.callerId) {
      CustomAlert.show("", metaFinderCommunityEventLanding("pulseTvThankForParticipating"), {
        positiveText: "Ok",
        onPositivePress: () => {
          this.props.emptyChatToken();
          this.props.navigation.goBack();
          return false;
        },
      });
    }
  };
  _onEndButtonPress = () => {
    if (this.props.isInitiator) {
      this.props.endChatSession(this.channelId);
      this.props.emptyChatToken();
    }
    this.refs.twilioVideo.disconnect();
    this.props.navigation.goBack();
  };

  _onMuteButtonPress = () => {
    this.refs.twilioVideo
      .setLocalAudioEnabled(!this.state.isAudioEnabled)
      .then(isEnabled => this.setState({ isAudioEnabled: isEnabled }));
    this._resetTimerAndStartHideCountdown();
    //   this.props.dispatchEvent(events.toggleMuteUnMute);
  };

  _onVideoButtonPressed = () => {
    this.refs.twilioVideo
      .setLocalVideoEnabled(!this.state.isVideoEnabled)
      .then(isEnabled => this.setState({ isVideoEnabled: isEnabled }));
    this._resetTimerAndStartHideCountdown();
  };

  _onFlipButtonPress = () => {
    this.refs.twilioVideo.flipCamera();
    this._resetTimerAndStartHideCountdown();
    // this.props.dispatchEvent(events.switchCameraFrontBack);
  };

  _onRoomDidConnect = () => {
    this.setState({ status: CALL_STATUS.CONNECTED });
    if (!this.props.isInitiator) {
      this.refs.twilioVideo.setLocalAudioEnabled(false);
      this.refs.twilioVideo.setLocalVideoEnabled(false);
    }
  };

  _onRoomDidDisconnect = ({ error }) => {
    // this.props.emptyChatToken();
    // this.props.goBack();
    // this.setState({ status: CALL_STATUS.DISCONNECTED });
  };

  _onRoomDidFailToConnect = error => {
    // const technical_glitch = this.metaConstants.technical_glitch;
    // const Ok = this.metaConstants.all_permission_ok;
    // this.setState({ status: CALL_STATUS.CONNECTION_FAILED });
    // CustomAlert.show("", technical_glitch, {
    //   positiveText: Ok,
    //   onPositivePress: () => {
    //     this.props.onDrop();
    //     this.props.emptyChatToken();
    //     this.props.goBack();
    //     return false;
    //   },
    // });
  };
  rightAction = () => {
    this.props.navigation.goBack();
  };
  renderMessage = () => {
    //const sharing_screen = this.metaConstants.sharing_screen;
    //const connecting = this.metaConstants.connecting;

    let message = null;

    if (this.state.status === CALL_STATUS.CONNECTING) {
      message = "Connecting";
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
  renderFullScreenVideoView = () => {
    if (this.props.isInitiator) {
      return this.renderLocalVideo();
    }
    return this.renderParticipantVideo();
  };
  _onContainerPressed = () => {
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
        {this.props.isInitiator && (
          <View style={styles.optionsRow}>
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
          </View>
        )}
      </Animated.View>
    );
  };

  sendViewerComment = () => {
    const { commentText } = this.state;
    const webinarCall = pathOr(
      "",
      ["navigation", "state", "params", "webinarCall"],
      this.props
    );
    Keyboard.dismiss();
    console.log(commentText);
    this.props.createComment({
      group: webinarCall.groupId,
      message: commentText,
    });
    this.setState({
      lastComment: commentText,
      commentText: "",
    });
  };

  sendViewerLike = () => {
    const { isLiked } = this.state;
    const webinarCall = pathOr(
      "",
      ["navigation", "state", "params", "webinarCall"],
      this.props
    );
    this.props.updateLikeDislike({
      group: webinarCall.groupId,
      type: isLiked ? "DISLIKE" : "LIKE",
    });
    this.setState(prevState => {
      return {
        isLiked: !prevState.isLiked,
      };
    });
  };

  renderLikesAndComments = () => {
    const { commentText, status, isLiked } = this.state;
    const { isInitiator } = this.props;
    if (isInitiator || status !== CALL_STATUS.CONNECTED) {
      return null;
    }

    return (
      <View style={styles.likesAndCommentsContainer}>
        <TouchableOpacity onPress={this.sendViewerLike}>
          <Icon
            name="heart"
            size={28}
            color={isLiked ? "#ec1c2e" : "#707070"}
          />
        </TouchableOpacity>
        <View style={styles.commentWrapper}>
          <TextInput
            style={{
              fontSize: 14,
              height: 38,
              paddingVertical: 0,
            }}
            placeholder="Comment"
            underlineColorAndroid="transparent"
            underlineColor="transparent"
            autoCorrect={false}
            value={commentText}
            selectionColor="transparent"
            onChangeText={text =>
              this.setState({
                commentText: text,
              })
            }
            onSubmitEditing={this.sendViewerComment}
          />
        </View>
        <TouchableOpacity onPress={this.sendViewerComment}>
          <Icon
            name="send"
            size={28}
            color={commentText?.length === 0 ? "#707070" : "#ec1c2e"}
          />
        </TouchableOpacity>
      </View>
    );
  };

  showUserMessage = () => {
    const { lastComment } = this.state;
    const { userInfo } = this.props;

    if (!lastComment) {
      return null;
    }

    const fullName =
      (userInfo.firstName ? userInfo.firstName : "") +
      " " +
      (userInfo.surName ? userInfo.surName : "");
    return (
      <View
        style={{
          backgroundColor: "#0003",
          paddingHorizontal: 16,
          paddingVertical: 10,
          flexDirection: "row",
          bottom: 56,
          left: 0,
          right: 0,
          position: "absolute",
        }}
      >
        <ProfileImage
          userInfo={{
            participantName: fullName,
          }}
          profilePicture={userInfo.profilePicture}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: "#DDD", fontSize: 12 }}>{fullName}</Text>
          <Text style={{ color: "#FFF", fontSize: 13 }}>{lastComment}</Text>
        </View>
      </View>
    );
  };

  renderLocalVideo = () => {
    return (
      <TwilioVideoLocalView enabled={true} style={styles.fillUpParentView} />
    );
  };
  renderParticipantVideo = () => {
    if (isEmpty(this.state.videoTracks)) {
      return null;
    }
    const {
      participantSid,
      videoTrackSid,
      trackName,
    } = this.state.videoTracks[0];
    const trackIdentifier = {
      participantSid,
      videoTrackSid,
    };
    let scaleType = Platform.OS === "ios" ? "fit" : "fill";
    if (trackName == "Screen") {
      scaleType = "fit";
    }
    return (
      <TwilioVideoParticipantView
        style={styles.fillUpParentView}
        key={videoTrackSid}
        trackIdentifier={trackIdentifier}
        scaleType={scaleType}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* {headers.renderBackHeaderWithIcon("PulseTv", null, false)} */}
        {this.state.modalVisible && this.renderPermissionsModal()}
        <TouchableWithoutFeedback
          style={styles.fillUpParentView}
          onPress={this._onContainerPressed}
        >
          <View style={styles.callContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
              <TouchableOpacity
                style={styles.btnClose}
                onPress={this._onEndButtonPress}
              >
                <Image
                  style={styles.icoClose}
                  source={require("../../assets/close.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnLive}>
                <Text style={styles.btnNext}>{
                 metaFinderCommunityEventLanding("pulseTvLive")}</Text>
              </TouchableOpacity>
            </View>
            {this.state.status === CALL_STATUS.CONNECTED &&
              this.renderFullScreenVideoView()}
            {this.renderMessage()}
            {this.renderControls()}
            {this.showUserMessage()}
            {this.renderLikesAndComments()}
            {this.state.areAllPermissionsAvailable && (
              <TwilioVideo
                ref="twilioVideo"
                onRoomDidConnect={this._onRoomDidConnect}
                onRoomDidDisconnect={this._onRoomDidDisconnect}
                onRoomDidFailToConnect={this._onRoomDidFailToConnect}
                onParticipantAddedVideoTrack={
                  this._onParticipantAddedVideoTrack
                }
                onParticipantRemovedVideoTrack={
                  this._onParticipantRemovedVideoTrack
                }
                onRoomParticipantDidConnect={this._onParticipantDidConnect}
                onRoomParticipantDidDisconnect={
                  this._onParticipantDidDisconnect
                }
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
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    webinarCall: state.communityEvents.webinarCall,
    isInitiator: state.communityEvents.isInitiator,
    userInfo: state.profile,
  };
};

const mapDispatchToProps = {
  emptyChatToken: () => ({
    type: actionNames.emptyWebinarDetails,
  }),
  startWebinarOrVideoCall,
  endChatSession,
  createComment,
  updateLikeDislike,
};

export default connect(mapStateToProps, mapDispatchToProps)(PulseTvWebinar);

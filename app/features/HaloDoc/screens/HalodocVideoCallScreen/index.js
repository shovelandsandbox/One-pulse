import React, { Component } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  NativeModules,
  Platform,
  NativeEventEmitter,
  requireNativeComponent,
  BackHandler,
  DeviceEventEmitter,
} from "react-native";
import {
  events
} from "@pru-rt-internal/pulse-common";
import {
  HaloDoc_CamOff,
  HaloDoc_FlipCamera
} from "../../../../config/images";
import styles from "./styles";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import maduraConfig from "../HalodocVoiceCallScreen/madura-config";
import { dispatchEvent } from "../../../../actions";
const VideoCallView = requireNativeComponent("VideoCallView");
import {
  sendCallStartMessageVideo,
  sendCallEndMessageVideo,
  setVideoCallStatus,
  gotoConsultationScreenVideo,
  resetRoomDetails,
  fetchRoomDetailsFromNotifcaiton,
  haloDocChatVideo
} from "../../actions";
import metaConstants from '../../meta'
import { Theme } from "../../../../themes";
const { Colors } = Theme;
class HalodocVideoCallScreen extends Component {
  constructor() {
    super();
    this.state = {
      connectionStatus: false,
      counter: 0,
      token: "",
      roomId: "",
      halodocUserId: "",
      consultationId: "",
      isSetUpCallServiceDone: false,
      isSpeakerOn: false,
      isMuteAudio: false,
      joinCallStatus: false,
      remoteAndLocalViewsAvailable: false,
      docObject: null,
      isBackCamera: false
    };
    // this.eventEmitter = DeviceEventEmitter;
    this.metaConstants = { ...metaConstants.talkToDoctorMeta() }
  }

  calTime = () => {
    var sec_num = parseInt(this.state.counter, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = `${"0"}${hours}`
    }
    if (minutes < 10) {
      minutes = `${"0"}${minutes}`
    }
    if (seconds < 10) {
      seconds = `${"0"}${seconds}`
    }
    return `${hours}${":"}${minutes}${":"}${seconds}`
  };

  backPress = () => {
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backPress);
    const incommingCalRoomDetails = this.props.navigation.getParam("roomDetails");

    if (incommingCalRoomDetails && incommingCalRoomDetails.incommingCall) {
      const roomDetails = {
        chatRoomId: incommingCalRoomDetails.chatRoomId,
        callRoomId: incommingCalRoomDetails.roomId,
        halodocUserId: incommingCalRoomDetails.halodocUserId,
        callUid: incommingCalRoomDetails.callUid,
        token: incommingCalRoomDetails.token
      };
      this.props.fetchRoomDetailsFromNotifcaiton(roomDetails);
    } else {
      this.props.resetRoomDetails();
      this.requestForRoomInfo();
    }
    // if (Platform.OS == "ios") {
    //   const { DeviceEventEmitter } = NativeModules;
    //   this.eventEmitter = new NativeEventEmitter(DeviceEventEmitter);
    // } else {
    //   this.eventEmitter = new NativeEventEmitter(NativeModules.HalodocMadura);
    // }

    // this.eventEmitter.addListener("CallEvents", event => {
    //   if (event.eventName === "CallServiceInitialized") {
    //     this.setUpAndJoinCall();
    //   }
    //   if (event.eventName === "CallRemoteConnected") {
    //     this.interval = setInterval(() => {
    //       this.setState({
    //         counter: this.state.counter + 1
    //       });
    //     }, 1000);
    //     this.props.setVideoCallStatus(true);
    //     this.setState({ connectionStatus: true });
    //   }

    //   if (event.eventName === "CallDisconnected") {
    //     this.onCallEndButtonClick();
    //   }
    //   if (event.eventName === "UpdatedVideoViews") {
    //     this.setState({ remoteAndLocalViewsAvailable: true });
    //   }

    //   if (event.eventName === "CallEnded") {
    //     this.sendCallEndMessage();
    //   }
    // });
  }

  componentDidUpdate() {
    this.checkAndInitMadura();
  }

  checkAndInitMadura() {
    if (
      !this.state.isSetUpCallServiceDone &&
      this.props.chatRoomId &&
      this.props.roomId
    ) {
      this.initializeAndSetupMaduraCallService();
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPress);
    // this.eventEmitter.removeAllListeners('CallEvents');
    this.props.resetRoomDetails();
  }

  initializeAndSetupMaduraCallService = () => {
    this.initMadura().then(() => {
      console.log("when component recieved props - init madura is done");
      this.setUpCallService().then(() => {
        this.setState({ isSetUpCallServiceDone: true });
        console.log(
          "when component recieved props - setup call service is done"
        );
      });
    });
  };

  initMadura = async () => {
    await NativeModules.HalodocMadura.execute("init_madura", maduraConfig);
  };

  setUpCallService = async () => {
    await NativeModules.HalodocMadura.execute("setup_call_service", {});
  };

  joinCall = async () => {
    const joinCallStatus = await NativeModules.HalodocMadura.execute(
      "join_call",
      {}
    );
    if (joinCallStatus == "success") {
      this.setState({ joinCallStatus: true });
      this.sendCallStartMessage();
    } else {
      alert("Not able to join the call");
      this.onCallEndButtonClick();
    }
  };

  sendCallStartMessage = () => {
    const {
      chatRoomId,
      roomId
    } = this.props;
    const payload = {
      message: 'Patient joined the call',
      callRoomId: roomId,
      callUserName: this.props.docObject.first_name,
      consultationId: this.props.appointmentData.customer_consultation_id,
      chatRoomId,
      customMessageType: 'application/hd.consultation.call_start'
    }
    this.props.sendCallStartMessageVideo(payload);
    this.props.dispatchEvent(events.HaloDocConsultaionStartVideoCall);
  }

  sendCallEndMessage = () => {
    const {
      chatRoomId,
      roomId
    } = this.props;
    const payload = {
      message: 'Patient ended the call',
      callRoomId: roomId,
      callUserName: this.props.docObject.first_name,
      consultationId: this.props.appointmentData.customer_consultation_id,
      chatRoomId,
      customMessageType: 'application/hd.consultation.call_end'
    }
    this.props.sendCallEndMessageVideo(payload);
    this.props.dispatchEvent(events.HaloDocConsultaionEndVideoCall);
  }

  requestForRoomInfo = () => {
    const body = {
      consultation_id: this.props.appointmentData.customer_consultation_id,
      capability: "video"
    };
    this.props.haloDocChatVideo(body);
  };

  initMadura = async () => {
    await NativeModules.HalodocMadura.execute("init_madura", maduraConfig);
  };

  setUpCallService = async () => {
    await NativeModules.HalodocMadura.execute("setup_call_service", {});
  };

  setUpAndJoinCall = async () => {
    const isIncoming = this.props.navigation.getParam("incomming");
    const callUid = isIncoming ? this.props.callUid : "";
    const { chatRoomId, roomId, token, halodocUserId, halodocAccessToken, appointmentData } = this.props;
    // const { token } = this.state
    if (
      chatRoomId &&
      roomId &&
      token &&
      halodocUserId &&
      halodocAccessToken &&
      appointmentData &&
      appointmentData.customer_consultation_id
    ) {
      const payload = {
        chatRoomId: chatRoomId,
        callRoomId: roomId,
        callUserToken: token,
        callUserId: isIncoming ? callUid : halodocUserId,
        halodocAccessToken: halodocAccessToken,
        consultationId: appointmentData.customer_consultation_id,
        incomingOutgoing: false,
        call_type: "VIDEO"
      };

      const setUpCallStatus = await NativeModules.HalodocMadura.execute(
        "setup_call",
        payload
      );
      if (setUpCallStatus == "success") {
        this.joinCall();
      } else {
        alert("Already in active call");
        this.onCallEndButtonClick();
      }
    } else {
      console.log(
        "mkmk_call_unable_to_set",
        `chatRoomId: ${chatRoomId}`,
        `roomId: ${roomId}`,
        `token: ${token}`,
        `halodocUserId: ${halodocUserId}`,
        `halodocAccessToken: ${halodocAccessToken}`,
        `customer_consultation_id: ${appointmentData.customer_consultation_id}`
      );

      alert("Not able to setup the call");
      this.onCallEndButtonClick();
    }
  };

  loginToChatAndSendCallStartMessage = async () => {
    await NativeModules.HalodocMadura.execute("login_to_chat", {});
    await NativeModules.HalodocMadura.execute("send_call_start", {
      consultationId: this.props.appointmentData.customer_consultation_id,
      chatRoomId: this.props.chatRoomId
    });
  };

  onCallEndButtonClick = async () => {
    this.props.navigation.navigate('HaloDocConsultation')

    const leaveCallStatus = await NativeModules.HalodocMadura.execute(
      "leave_call",
      {}
    );
    const cleanUpMadura = await NativeModules.HalodocMadura.execute(
      "cleanup_madura",
      {}
    );
    if (leaveCallStatus == "success") {
      this.props.setVideoCallStatus(false);
      this.sendCallEndMessage();
      this.props.gotoConsultationScreenVideo(this.state.docObject);
    } else {
      alert("Not able to leave the call");
    }
    this.setState({ remoteAndLocalViewsAvailable: false });
  };

  onSpeakerToggle = async () => {
    const speakerStatus = await NativeModules.HalodocMadura.execute(
      "toggle_speaker",
      {}
    );
    this.setState({ isSpeakerOn: speakerStatus });

  };

  onMicToggle = async () => {
    const micStatus = await NativeModules.HalodocMadura.execute(
      "toggle_mic",
      {}
    );
    this.setState({ isMuteAudio: micStatus });

  };

  onCameraToggle = async () => {
    const cameraStatus = await NativeModules.HalodocMadura.execute(
      "switch_camera",
      {}
    );
    if (cameraStatus)
      this.setState({ isBackCamera: cameraStatus })
  };
  onVideoOff = () => {
    this.props.navigation.navigate('HalodocVoiceCallScreen')

  };

  renderMaduraVideoCall(viewType) {
    const showVideoCall = this.state.remoteAndLocalViewsAvailable;
    return (
      <View style={styles.renderVideoCallView}>
        {
          showVideoCall ? (
            <VideoCallView
              viewType={viewType}
              style={styles.renderVideoCallView}
            ></VideoCallView>
          ) : null
        }
      </View>
    );
  }

  renderViewControl = () => {
    return (
      <View style={styles.camOff}>
        {/* <TouchableOpacity style={styles.touchableButton} onPress={this.onVideoOff}>
          <Image style={styles.haloDoc_camOff} source={HaloDoc_CamOff} />
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.touchableButton} onPress={this.onCameraToggle}>
          <Image style={styles.haloDoc_flipCamera} source={HaloDoc_FlipCamera} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={this.onCallEndButtonClick}>
          <Icon name={"call-end"} size={30} color={"rgb(255,255,255)"} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchableButton} onPress={this.onMicToggle}>
          <Icon name={this.state.isMuteAudio ? "mic-off" : "mic"} size={25} color={"rgb(255,255,255)"} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchableButton} onPress={this.onSpeakerToggle}>
          <Icon name={this.state.isSpeakerOn ? "volume-up" : "volume-mute"} size={30} color={"rgb(255,255,255)"} />
        </TouchableOpacity>
      </View>
    )
  }

  renderView = () => {
    const docObject = this.props.docObject;
    this.state.docObject = docObject;
    return (
      <View style={styles.container}>
        <View style={styles.docView}>
          <Text style={styles.docNameText}>
            {this.metaConstants.Dr}{" "}
            {docObject.first_name}
          </Text>
        </View>

        <View style={styles.connectionStatus}>
          {this.state.connectionStatus ? (
            <Text style={styles.connectionText}>{this.calTime()}</Text>
          ) : (
              <Text style={styles.connectionText}>
                {
                  this.metaConstants.Connecting
                }
              </Text>
            )}
        </View>

        <View style={styles.remoteView}>
          {this.renderMaduraVideoCall("remote")}
        </View>

        <View style={styles.renderVideoCallContainer}>
          <View style={styles.renderVideoCallContainer2}>
            {this.renderMaduraVideoCall("local")}
          </View>
          {this.renderViewControl()}
        </View>
      </View>
    )
  }

  render() {
    console.log('isBackCamera', this.state.isBackCamera);
    return (
      this.renderView()
    );
  }
}

const mapStateToProps = state => {
  return {
    meta: state.meta,
    appointmentData: state.haloDocServices.appointmentData,
    appointmentRequestSuccess: state.haloDocServices.appointmentRequestSuccess,
    token: state.haloDocServices.token,
    roomId: state.haloDocServices.roomId,
    halodocUserId: state.auth.haloDocUserId,
    halodocAccessToken: state.auth.haloDocAccessToken,
    chatRoomId: state.haloDocServices.chatRoomId,
    callUid: state.haloDocServices.callUid,
    docObject: state.haloDocServices.docObject,
  };
};
export default connect(
  mapStateToProps,
  {
    dispatchEvent,
    haloDocChatVideo,
    fetchRoomDetailsFromNotifcaiton,
    resetRoomDetails,
    gotoConsultationScreenVideo,
    setVideoCallStatus,
    sendCallStartMessageVideo,
    sendCallEndMessageVideo,
  }
)(HalodocVideoCallScreen);

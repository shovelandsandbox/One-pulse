import React, { Component } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  NativeModules,
  DeviceEventEmitter,
  NativeEventEmitter,
  BackHandler,
  ImageBackground, Platform
} from "react-native";
import {
  HaloDoc_VideoOn,
  AVATAR
} from "../../../../config/images";
import {
  events
} from "@pru-rt-internal/pulse-common";
import styles from "./styles";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import maduraConfig from "./madura-config";
import Modal from "react-native-modal";
import { dispatchEvent } from "../../../../actions";
import {
  sendCallStartMessageVoice,
  sendCallEndMessageVoice,
  gotoVideoScreen,
  setAudioCallStatus,
  gotoConsultationScreenVoice,
  resetRoomDetails,
  fetchRoomDetailsFromNotifcaiton,
  haloDocChatVoice
} from "../../actions";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
import metaConstants from '../../meta'

class HalodocVoiceCallScreen extends Component {
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
      docObject: null,
      isCallSwitchModalVisible: false
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
    // return hours + ":" + minutes + ":" + seconds;
    return `${hours}${":"}${minutes}${":"}${seconds}`
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backPress);
    const incommingCalRoomDetails = this.props.navigation.getParam(
      "roomDetails"
    );
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
    //   this.eventEmitter = DeviceEventEmitter;
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
    //     this.props.setAudioCallStatus(true);
    //     this.setState({ connectionStatus: true });
    //   }
    //   if (event.eventName === "CallDisconnected") {
    //     this.onCallEndButtonClick();
    //   }

    //   if (event.eventName === "CallEnded") {
    //     this.sendCallEndMessage();
    //   }
    // });
  }

  backPress = () => {
    return true;
  };

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
    // this.eventEmitter.removeAllListeners("CallEvents");
    this.props.resetRoomDetails();
  }

  initializeAndSetupMaduraCallService = () => {
    this.initMadura().then(() => {
      this.setUpCallService().then(() => {
        this.setState({ isSetUpCallServiceDone: true });
      });
    });
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
    const {
      chatRoomId,
      roomId,
      token,
      halodocUserId,
      halodocAccessToken,
      appointmentData
    } = this.props;

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
        call_type: "AUDIO"
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
      this.props.gotoConsultationScreenVoice(this.state.docObject);
    }
  };

  joinCall = async () => {
    console.log("Called joined call native module");
    const joinCallStatus = await NativeModules.HalodocMadura.execute(
      "join_call",
      {}
    );
    console.log("Called join_call call native module with response  = " + joinCallStatus);
    if (joinCallStatus == "success") {
      this.setState({ joinCallStatus: true });
      this.sendCallStartMessage();
    } else {
      alert("Not able to join the call");
      this.onCallEndButtonClick();
    }
  };

  sendCallStartMessage = () => {
    const { chatRoomId, roomId } = this.props;
    const payload = {
      message: "Patient joined the call",
      callRoomId: roomId,
      callUserName: this.props.docObject.first_name,
      consultationId: this.props.appointmentData.customer_consultation_id,
      chatRoomId,
      customMessageType: "application/hd.consultation.call_start"
    };

    this.props.sendCallStartMessageVoice(payload);
    this.props.dispatchEvent(events.HaloDocConsultaionStartVoiceCall);
  };

  sendCallEndMessage = () => {
    const { chatRoomId, roomId } = this.props;
    const payload = {
      message: "Patient ended the call",
      callRoomId: roomId,
      callUserName: this.props.docObject.first_name,
      consultationId: this.props.appointmentData.customer_consultation_id,
      chatRoomId,
      customMessageType: "application/hd.consultation.call_end"
    };
    this.props.sendCallEndMessageVoice(payload);
    this.props.dispatchEvent(events.HaloDocConsultaionEndVoiceCall);
  };

  requestForRoomInfo = () => {
    const body = {
      consultation_id: this.props.appointmentData.customer_consultation_id,
      capability: "audio"
    };
    this.props.haloDocChatVoice(body);
  };

  onCallEndButtonClick = async (switchToVideo = false) => {
    const leaveCallStatus = await NativeModules.HalodocMadura.execute(
      "leave_call",
      {}
    );
    const cleanUpMadura = await NativeModules.HalodocMadura.execute(
      "cleanup_madura",
      {}
    );
    this.props.gotoConsultationScreenVoice(this.state.docObject);
    console.log("Leave Call Response = " + leaveCallStatus, "Cleanup call Response = " + cleanUpMadura);
    if (leaveCallStatus == "success") {
      this.props.setAudioCallStatus(false);
      this.sendCallEndMessage();
      this.props.gotoConsultationScreenVoice(this.state.docObject);
    } else {
      alert("Not able to leave the call");
    }
  };

  onSpeakerToggle = async () => {
    console.log('NativeModules.HalodocMadura', NativeModules);
    const speakerStatus = await NativeModules.HalodocMadura.execute(
      "toggle_speaker",
      {}
    );
    console.log('speakerStatus', speakerStatus)
    this.setState({ isSpeakerOn: speakerStatus });
    // this.setState({ isSpeakerOn: !this.state.isSpeakerOn });
  };

  onMicToggle = async () => {
    const micStatus = await NativeModules.HalodocMadura.execute(
      "toggle_mic",
      {}
    );
    console.log('micStatus', micStatus)
    this.setState({ isMuteAudio: micStatus });
    // this.setState({ isMuteAudio: !this.state.isMuteAudio });
  };

  onSwitchToVideoButtonPress = () => {
    this.setState({ isCallSwitchModalVisible: true });
    this.onCallEndButtonClick(true);

    this.setState({ isCallSwitchModalVisible: true });
    // this.props.navigation.navigate('HalodocVideoCallScreen')
    setTimeout(() => {
      this.setState({ isCallSwitchModalVisible: false });
      const incommingCalRoomDetails = this.props.navigation.getParam(
        "roomDetails"
      );
      this.props.gotoVideoScreen(this.state.docObject, incommingCalRoomDetails);
      // this.props.navigation.navigate('HalodocVideoCallScreen')
    }, 100);
  };

  renderViewControl = () => {
    return (
      <View style={styles.renderViewStyle}>
        <View style={styles.buttonsStyle}>
          <TouchableOpacity style={styles.touchableButton} onPress={this.onSpeakerToggle}>
            <Icon
              name={this.state.isSpeakerOn ? "volume-up" : "volume-mute"}
              size={30}
              color={"rgb(255,255,255)"}
            />
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.haloDoctouchableButtonVideo} onPress={this.onSwitchToVideoButtonPress}>
            <Image style={styles.haloDoc_camOff} source={HaloDoc_VideoOn} />
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.touchableButton} onPress={this.onMicToggle}>
            <Icon
              name={this.state.isMuteAudio ? "mic-off" : "mic"}
              size={30}
              color={"rgb(255,255,255)"}
            />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity onPress={this.onCallEndButtonClick} style={styles.cancelBtn}>
            <Icon
              name={"call-end"}
              size={30}
              color={"rgb(255,255,255)"}
              style={{ marginRight: 2 }}
            />
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  renderView = () => {
    this.state.docObject = this.props.docObject;
    const docObject = this.state.docObject;
    return (
      <View style={styles.outerView}>

        <View style={{ alignSelf: "center" }}>
          <Text style={styles.voiceText}>Voice call</Text>
        </View>

        <View style={styles.docName}>
          <Text style={styles.docFirstName}>{this.metaConstants.Dr}{docObject.first_name}</Text>
          <Text style={styles.docFirstName}>{docObject.last_name}</Text>
        </View>

        <View style={styles.connectionView}>
          {this.state.connectionStatus ? (
            <Text style={styles.connectionText}>{this.calTime()}</Text>
          ) : (
              <Text style={styles.connectionText}>{this.metaConstants.Connecting}</Text>
            )}
        </View>

        <View style={styles.imgView}>
          <ImageBackground style={styles.imgStyle} source={AVATAR}>
            <Image style={styles.imgStyle} source={{ uri: docObject.image_url }} />
          </ImageBackground>
        </View>

        <View style={styles.renderView}>
          {this.renderViewControl()}
        </View>
      </View>
    )
  }

  render() {
    console.log("::inside voicecall", this.state.token)
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.isCallSwitchModalVisible}
          transparent={true}
          backdropColor={Colors.black}
          backdropOpacity={0.5}
          style={styles.mainContainer}
        >
          <Text>{this.metaConstants.switchToVideo}</Text>
        </Modal>

        {this.renderView()}

      </View>
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
    docObject: state.haloDocServices.docObject
  };
};
export default connect(mapStateToProps, {
  dispatchEvent,
  haloDocChatVoice,
  fetchRoomDetailsFromNotifcaiton,
  resetRoomDetails,
  gotoConsultationScreenVoice,
  setAudioCallStatus,
  gotoVideoScreen,
  sendCallStartMessageVoice,
  sendCallEndMessageVoice
})(HalodocVoiceCallScreen);



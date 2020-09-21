import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  PermissionsAndroid,
  Platform,
  BackHandler,
} from "react-native";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { NodeCameraView } from "react-native-nodemediaclient";
import get from "lodash/get";
import { LIVE_STATUS, videoConfig, audioConfig } from "../../utils/constants";
import SocketManager from "../../socketManager";
import styles from "./styles";
import LiveStreamActionButton from "./LiveStreamActionButton";
import ChatInputGroup from "../../components/ChatInputGroup";
import MessagesList from "../../components/MessagesList/MessagesList";
import FloatingHearts from "../../components/FloatingHearts";
import { getRTMPServer } from "../../config";
import Logger from "../../utils/logger";
import { CustomAlert } from "../../../../components";
import { connect } from "react-redux";

import { groupStatusUpdate } from "../../actions";

class Streamer extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = props;
    const roomName = get(navigation, "state.params.roomName");
    const userName = get(navigation, "state.params.userName", "");
    this.state = {
      currentLiveStatus: LIVE_STATUS.PREPARE,
      messages: [],
      countHeart: 0,
      isVisibleMessages: true,
    };
    this.roomName = roomName;
    this.userName = userName;
  }

  componentDidMount() {
    this.requestCameraPermission();
    SocketManager.instance.emitPrepareLiveStream({
      userName: this.userName,
      roomName: this.roomName,
    });
    SocketManager.instance.emitJoinRoom({
      userName: this.userName,
      roomName: this.roomName,
    });
    SocketManager.instance.listenBeginLiveStream(data => {
      const currentLiveStatus = get(data, "liveStatus", "");
      this.setState({ currentLiveStatus });
    });
    SocketManager.instance.listenFinishLiveStream(data => {
      const currentLiveStatus = get(data, "liveStatus", "");
      this.setState({ currentLiveStatus });
    });
    SocketManager.instance.listenSendHeart(() => {
      this.setState(prevState => ({ countHeart: prevState.countHeart + 1 }));
    });
    SocketManager.instance.listenSendMessage(data => {
      const messages = get(data, "messages", []);
      this.setState({ messages });
    });
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
  }

  componentWillUnmount() {
    if (this.nodeCameraViewRef) this.nodeCameraViewRef.stop();
    SocketManager.instance.emitLeaveRoom({
      userName: this.userName,
      roomName: this.roomName,
    });
    this.backHandler.remove();
  }

  handleBackPress = () => {
    // const groupId = get(this.props.navigation, "state.params.groupId", "");
    // this.props.groupStatusUpdate(groupId, "COMPLETE");
    return false;
  };

  onPressHeart = () => {
    SocketManager.instance.emitSendHeart({
      roomName: this.roomName,
    });
  };

  onPressSend = message => {
    if (message) {
      SocketManager.instance.emitSendMessage({
        roomName: this.roomName,
        userName: this.userName,
        message,
      });
      this.setState({ isVisibleMessages: true });
    }
  };

  onEndEditing = () => this.setState({ isVisibleMessages: true });

  onFocusChatGroup = () => {
    this.setState({ isVisibleMessages: false });
  };

  onPressClose = () => {
    const { navigation } = this.props;

    // const groupId = get(this.props.navigation, "state.params.groupId", "");
    // this.props.groupStatusUpdate(groupId, "COMPLETE");
    navigation.goBack();
  };

  onPressLiveStreamButton = () => {
    const { navigation } = this.props;
    const userName = get(navigation, "state.params.userName", "");
    const { currentLiveStatus } = this.state;
    if (Number(currentLiveStatus) === Number(LIVE_STATUS.PREPARE)) {
      /**
       * Waiting live stream
       */
      SocketManager.instance.emitBeginLiveStream({
        userName,
        roomName: userName,
      });
      SocketManager.instance.emitJoinRoom({ userName, roomName: userName });
      if (this.nodeCameraViewRef) this.nodeCameraViewRef.start();
    } else if (Number(currentLiveStatus) === Number(LIVE_STATUS.ON_LIVE)) {
      /**
       * Finish live stream
       */
      SocketManager.instance.emitFinishLiveStream({
        userName,
        roomName: userName,
      });
      if (this.nodeCameraViewRef) this.nodeCameraViewRef.stop();
      CustomAlert.show("", "Thanks for your live stream", {
        positiveText: "Ok",
        onPositivePress: () => {
          const groupId = get(
            this.props.navigation,
            "state.params.groupId",
            ""
          );
          this.props.groupStatusUpdate(groupId, "COMPLETE");
          navigation.goBack();
          SocketManager.instance.emitLeaveRoom({
            userName,
            roomName: userName,
          });
        },
      });
    }
  };

  requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.requestMultiple(
          [
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ],
          {
            title: "Live TV need Camera And Microphone Permission",
            message:
              "Live TV needs access to your camera so you can take awesome pictures.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (
          granted["android.permission.CAMERA"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted["android.permission.RECORD_AUDIO"] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          if (this.nodeCameraViewRef) this.nodeCameraViewRef.startPreview();
        } else {
          Logger.log("Camera permission denied");
        }
      } catch (err) {
        Logger.warn(err);
      }
    } else {
      request(PERMISSIONS.IOS.CAMERA).then(result => {
        if (result === RESULTS.GRANTED) {
          request(PERMISSIONS.IOS.MICROPHONE).then(result => {
            if (result === RESULTS.GRANTED) {
              if (this.nodeCameraViewRef) this.nodeCameraViewRef.startPreview();
            }
          });
        }
      });
    }
  };

  renderChatGroup = () => {
    return (
      <ChatInputGroup
        onPressHeart={this.onPressHeart}
        onPressSend={this.onPressSend}
        onFocus={this.onFocusChatGroup}
        onEndEditing={this.onEndEditing}
      />
    );
  };

  renderListMessages = () => {
    const { messages, isVisibleMessages } = this.state;
    if (!isVisibleMessages) return null;
    return <MessagesList messages={messages} />;
  };

  setCameraRef = ref => {
    this.nodeCameraViewRef = ref;
  };

  render() {
    const { navigation } = this.props;
    const { currentLiveStatus, countHeart } = this.state;
    const userName = get(navigation, "state.params.userName", "");
    const outputUrl = `${getRTMPServer()}/live/${userName}`;
    return (
      <SafeAreaView style={styles.container}>
        <NodeCameraView
          style={styles.streamerView}
          ref={this.setCameraRef}
          outputUrl={outputUrl}
          camera={{ cameraId: 1, cameraFrontMirror: true }}
          audio={audioConfig}
          video={videoConfig}
          smoothSkinLevel={3}
          autopreview={false}
        />
        <SafeAreaView style={styles.contentWrapper}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.btnClose}
              onPress={this.onPressClose}
            >
              <Image
                style={styles.icoClose}
                source={require("../../assets/close.png")}
                tintColor="white"
              />
            </TouchableOpacity>
            <LiveStreamActionButton
              currentLiveStatus={currentLiveStatus}
              onPress={this.onPressLiveStreamButton}
            />
          </View>
          <View style={styles.center} />
          <View style={styles.footer}>
            {this.renderChatGroup()}
            {this.renderListMessages()}
          </View>
        </SafeAreaView>
        <FloatingHearts count={countHeart} />
      </SafeAreaView>
    );
  }
}

Streamer.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};

Streamer.defaultProps = {
  navigation: {
    goBack: null,
  },
};

const mapStateToProps = state => {};

const mapDispatchToProps = {
  groupStatusUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Streamer);

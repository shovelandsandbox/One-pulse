import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, Text, SafeAreaView, Animated, Alert, PermissionsAndroid, Platform } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import get from 'lodash/get';
import { NodePlayerView } from 'react-native-nodemediaclient';
import moment from 'moment';
import SocketManager from '../../socketManager';
import styles from './styles';
import FloatingHearts from '../../components/FloatingHearts';
import ChatInputGroup from '../../components/ChatInputGroup';
import MessagesList from '../../components/MessagesList/MessagesList';
import { LIVE_STATUS } from '../../utils/constants';
import { getRTMPServer } from '../../config';
import { CustomAlert } from "../../../../components";

export default class Viewer extends PureComponent {
  constructor(props) {
    super(props);
    this.Animation = new Animated.Value(0);
    const { navigation } = props;
    const data = get(navigation, 'state.params.data');
    const roomName = get(data, 'roomName');
    const liveStatus = get(data, 'liveStatus', LIVE_STATUS.PREPARE);
    const userName = get(navigation, 'state.params.userName', '');
    this.state = {
      messages: [],
      countHeart: 0,
      isVisibleMessages: true,
      inputUrl: null,
    };
    this.roomName = roomName;
    this.userName = userName;
    this.liveStatus = liveStatus;
    this.timeout = null;
  }

  componentDidMount() {
    this.requestCameraPermission();
    const { navigation } = this.props;
    /**
     * Just for replay
     */
    if (this.liveStatus === LIVE_STATUS.FINISH) {
      SocketManager.instance.emitReplay({
        userName: this.userName,
        roomName: this.roomName,
      });
      SocketManager.instance.listenReplay((data) => {
        const { beginAt, messages } = data;
        const start = moment(beginAt);
        for (let i = 0; i < messages.length; i += 1) {
          ((j, that) => {
            const end = moment(messages[j].createdAt);
            const duration = end.diff(start);
            setTimeout(() => {
              that.setState((prevState) => ({ messages: [...prevState.messages, messages[j]] }));
            }, duration);
          })(i, this);
        }
      });
      const inputUrl = `${getRTMPServer()}/live/${this.roomName}/replayFor${this.userName}`;
      this.setState({ inputUrl });
    } else {
      this.setState({
        inputUrl: `${getRTMPServer()}/live/${this.roomName}`,
        messages: this.messages,
      });
      SocketManager.instance.emitJoinRoom({
        userName: this.userName,
        roomName: this.roomName,
      });
      SocketManager.instance.listenSendHeart(() => {
        this.setState((prevState) => ({ countHeart: prevState.countHeart + 1 }));
      });
      SocketManager.instance.listenSendMessage((data) => {
        const messages = get(data, 'messages', []);
        this.setState({ messages });
      });
      SocketManager.instance.listenFinishLiveStream(() => {
        CustomAlert.show(
          "",
          "Thanks for watching this live stream",
          {
            positiveText: "Ok",
            onPositivePress: () => {
              navigation.goBack();
            },
          }
        );
      });
      this.startBackgroundAnimation();
    }
  }

  requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.requestMultiple(
          [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
          {
            title: 'Live TV need Camera And Microphone Permission',
            message:
              'Live TV needs access to your camera so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (
          granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          //if (this.nodeCameraViewRef) this.nodeCameraViewRef.startPreview();
        } else {
          Logger.log('Camera permission denied');
        }
      } catch (err) {
        Logger.warn(err);
      }
    } else {
      request(PERMISSIONS.IOS.CAMERA).then(
        (result) => {
          if (result === RESULTS.GRANTED) {
            request(PERMISSIONS.IOS.MICROPHONE).then(
              (result) => {
                if (result === RESULTS.GRANTED) {
                  //if (this.nodeCameraViewRef) this.nodeCameraViewRef.startPreview();
                }
              }
            )
          }
        },
      );
    }
  };

  componentWillUnmount() {
    if (this.nodePlayerView) this.nodePlayerView.stop();
    SocketManager.instance.emitLeaveRoom({
      userName: this.userName,
      roomName: this.roomName,
    });
    this.setState({
      messages: [],
      countHeart: 0,
      isVisibleMessages: true,
      inputUrl: null,
    });
    clearTimeout(this.timeout);
  }

  startBackgroundAnimation = () => {
    this.Animation.setValue(0);
    Animated.timing(this.Animation, {
      toValue: 1,
      duration: 15000,
      useNativeDriver: false,
    }).start(() => {
      this.startBackgroundAnimation();
    });
  };

  onPressHeart = () => {
    SocketManager.instance.emitSendHeart({
      roomName: this.roomName,
    });
  };

  onPressSend = (message) => {
    if (message) {
      SocketManager.instance.emitSendMessage({
        roomName: this.roomName,
        userName: this.userName,
        message,
      });
      this.setState({ isVisibleMessages: true });
    };
  }

  onEndEditing = () => this.setState({ isVisibleMessages: true });

  onFocusChatGroup = () => {
    this.setState({ isVisibleMessages: false });
  };

  onPressClose = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  renderBackgroundColors = () => {
    const backgroundColor = this.Animation.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
      outputRange: ['#1abc9c', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#1abc9c'],
    });
    if (this.liveStatus === LIVE_STATUS.FINISH) return null;
    return (
      <Animated.View style={[styles.backgroundContainer, styles.blackContainer]}>
        <SafeAreaView style={styles.wrapperCenterTitle}>
        <Text style={styles.titleText}>
            This meeting has not yet started. You will be able to access the live once the host arrives.
          </Text>
          <Text style={styles.titleText}>
           Please Wait!
          </Text>
        </SafeAreaView>
      </Animated.View>
    );
  };

  renderNodePlayerView = () => {
    const { inputUrl } = this.state;
    if (!inputUrl) return null;
    return (
      <NodePlayerView
        style={styles.playerView}
        ref={(vb) => {
          this.nodePlayerView = vb;
        }}
        inputUrl={inputUrl}
        scaleMode="ScaleAspectFit"
        bufferTime={300}
        maxBufferTime={1000}
        autoplay
      />
    );
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

  render() {
    const { countHeart } = this.state;
    /**
     * Replay mode
     */
    if (this.liveStatus === LIVE_STATUS.FINISH) {
      return (
        <View style={styles.blackContainer}>
          {this.renderNodePlayerView()}
          {this.renderListMessages()}
          <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
            <Image
              style={styles.icoClose}
              source={require('../../assets/close.png')}
              tintColor="black"
            />
          </TouchableOpacity>
          <TouchableOpacity style={{
              position: 'absolute',
              top: 55,
              left: 80,
            }} onPress={this.onPressClose}>
              <Image
                style={styles.icoClose}
                source={require('../../assets/icon_ionic_ios_reverse_camera.png')}
              />
            </TouchableOpacity>  
          <FloatingHearts count={countHeart} />
        </View>
      );
    }
    /**
     * Viewer mode
     */
    return (
      <View style={styles.container}>
        {this.renderBackgroundColors()}
        {this.renderNodePlayerView()}
        {this.renderChatGroup()}
        {this.renderListMessages()}
        <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
          <Image
            style={styles.icoClose}
            source={require('../../assets/close.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{
              position: 'absolute',
              top: 55,
              left: 80,
            }} onPress={this.onPressClose}>
              <Image
                style={styles.icoClose}
                source={require('../../assets/icon_ionic_ios_reverse_camera.png')}
              />
            </TouchableOpacity>
        <FloatingHearts count={countHeart} />
      </View>
    );
  }
}

Viewer.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};

Viewer.defaultProps = {
  navigation: {
    goBack: () => null,
  },
};

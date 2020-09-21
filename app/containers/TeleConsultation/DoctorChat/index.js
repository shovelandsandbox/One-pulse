import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  TextInput,
  Keyboard,
  Platform,
  Dimensions,
  Alert,
  SafeAreaView,
} from "react-native";
import {
  CoreActions,
  CoreSelectors,
  CoreConfig,
  CoreConstants,
  CoreActionTypes,
  CoreUtils,
  events
} from "@pru-rt-internal/pulse-common";
import styles from "./styles";
import { path } from "ramda";
import {
  BACK,
  DOCLOGO,
  PLANE,
  CLOSE_ICON,
  NEWCAMERA,
  NEWFILE,
  CLOSE,
  AttachedLink,
} from "../../../config/images"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DoctorChatBotMessage from "../DoctorChatBotMessage";
import { ChatUserMessage } from "../PatientChatMessage";
import ImagePicker from "react-native-image-crop-picker";

const { pageKeys } = CoreConfig;
import OpenSettings from "react-native-open-settings";
import TimeoutLinstener from "../../../utils/timeout/index";
import MetaConstants from "./meta";
import * as ActionTypes from "../../../actions/Types";
import { CustomAlert } from "../../../components";
import { dispatchEvent } from "../../../actions";
import Pdf from "react-native-pdf";
const { isNilOrEmpty } = CoreUtils;
const {
  sendChatMessage,
  updateChatMessage,
  setReceiver,
  clearState,
  doAppLogout,
} = CoreActions;
const {
  MYDOC_SEND_CHAT_MESSAGE,
  MYDOC_LOAD_CHAT_MESSAGES,
  MYDOC_CLEAR_STATE,
} = CoreActionTypes;
const { MY_DOC_CHAT_SCREEN } = pageKeys;
const { InternalChatSelector } = CoreSelectors;
const { height } = Dimensions.get("window");

class DoctorChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalVisible: false,
      answerKey: `${new Date()}-key`,
      imgModalVisible: false,
      source: "",
      path: "",
      imgData: "",
      isPdf: false
    };
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    const chatId = path(["navigation", "state", "params", "episodeId"], this.props);
    const { doAppLogout } = this.props;
    const episodeId = chatId ? chatId : this.props.episodeId;
    this.loadMessages(episodeId);
    TimeoutLinstener.start(doAppLogout);
    this.props.dispatchEvent(events.MyDocChatScreen)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updateMessages != nextProps.updateMessages) {
      const chatId = path(["navigation", "state", "params", "episodeId"], nextProps);
      const episodeId = chatId ? chatId : nextProps.episodeId;
      this.loadMessages(episodeId);
    }
    if (this.props.userLanguagePreference !== nextProps.userLanguagePreference) {
      this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
  }

  componentWillUnmount() {
    this.props.clearState({ type: MYDOC_CLEAR_STATE });
    TimeoutLinstener.stop();
  }

  handleBlur() {
    Keyboard.dismiss();
  }

  showCameraGalleryModal() {
    this.setState({ modalVisible: true });
  }

  showCamera() {
    const { cameraPermission } = this.metaConstants;
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      useFrontCamera: true,
      includeBase64: true,
      compressImageQuality: 0.7,
      photo: "photo",
    }).then(data => {
      console.log("ImagePicker", data);
      const file = data.data;
      const time = new Date().getTime();
      const name = "pic" + time + ".jpg";
      this.setState({ imgData: file })
      console.log("android filename", name);
      this.saveCapturedFile(file, name);
      this.setState({
        modalVisible: false,
      });
    })
      .catch(error => {
        this.setState({
          modalVisible: false,
        });
        console.log("openCamera error:", error);
        if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
          CustomAlert.show(
            "",
            cameraPermission,
            {
              positiveText: "Ok",
              onPositivePress: () => {
                OpenSettings.openSettings();
              },
            },
            {
              negativeText: "Cancel",
              onNegativePress: () => { },
            }
          );
        }
      });
  }

  showGalleryFiles() {
    ImagePicker.openPicker({
      mediaType: "photo",
      width: 200,
      height: 200,
      includeBase64: true,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      compressImageQuality: 0.8,
      photo: "photo",
    }).then(data => {
      console.log("ImagePicker", data);
      const file = data.data;
      const name = data.hasOwnProperty("filename")
        ? data.filename
        : data.path.substr(data.path.lastIndexOf("/") + 1);
      console.log("android filename", name);
      this.setState({ imgData: file })
      this.saveCapturedFile(file, name);
      this.setState({
        modalVisible: false,
      });
    })
      .catch(error => {
        // alert(error);
      });
  }

  saveCapturedFile(file, name) {
    const agentChat = path(["navigation", "state", "params", "agentChat"], this.props);
    const sender = path(["navigation", "state", "params", "sender"], this.props);
    const chatId = path(["navigation", "state", "params", "episodeId"], this.props);
    const { doctorId, orderRef } = this.props;
    this.props.updateDocument({
      content: file,
      filename: name,
      doctorId,
      orderRef,
      episodeId: chatId,
      agentChat: true,
      callback: this.callback,
    });
  }

  callback = (chatType, file) => {
    let episodeId =
      this.props.navigation.state &&
      this.props.navigation.state.params &&
      this.props.navigation.state.params.episodeId;
    if (!episodeId) {
      episodeId = this.props.episodeId;
    }
    this.loadMessages(episodeId);
  };

  renderUserInput = () => {
    return (
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            this.showCameraGalleryModal();
          }}>
          <Image
            resizeMode="contain"
            style={styles.enterButton}
            source={AttachedLink}
          />
        </TouchableOpacity>
        <TextInput
          key={this.state.answerKey}
          onBlur={this.handleBlur}
          style={styles.chatInsertBox}
          maxLength={255}
          onChangeText={this.props.updateChatMessage}
          underlineColorAndroid="#F1F1F1" />
        <TouchableOpacity
          onPress={() => {
            const chatId = path(["navigation", "state", "params", "episodeId"], this.props);
            const episodeId = chatId ? chatId : this.props.episodeId;
            this.sendMessage(this.props.message, episodeId);
            this.setState({ answerKey: `${new Date()}-key` });
          }}>
          <Image
            resizeMode="contain"
            style={styles.enterButton}
            source={PLANE}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderQuestionnaireLog = (data, type) => {
    return (
      <View style={{ paddingVertical: 10 }}>
        <FlatList
          ref={ref => (this.flatList = ref)}
          onContentSizeChange={() => {
            setTimeout(() => {
              this.flatList && this.flatList.scrollToEnd({ animated: true });
            });
          }}
          onLayout={() => this.flatList.scrollToEnd({ animated: true })}
          style={[styles.flexStyle, { minHeight: type ? height - 152 : height - 88 }]}
          data={data}
          renderItem={this.renderItem}
          extraData={this.state}
          showsVerticalScrollIndicator={false} />
      </View>
    );
  };

  renderItem = (data) => {
    const profilePicture = this.props.profilePicture ? this.props.profilePicture : "";
    const { item, index } = data;
    let url = {};
    if (!isNilOrEmpty(item.imgBase) && !item.imgBase.includes("?")) {
      url = {
        uri: item.imgBase,
      };
    } else {
      let imgBase = !isNilOrEmpty(item.imgBase) ? item.imgBase.split("?") : "";
      let imgUrl = !isNilOrEmpty(item.imgBase) ? imgBase[0] : "";
      let token = !isNilOrEmpty(item.imgBase) ? imgBase[1].split("=")[1] : ""
      url = {
        uri: imgUrl,
        headers: {
          Authorization: "Bearer " + token,
        }
      };
    }
    if (item.type === 'chat') {
      return (
        <View style={styles.chatItemContainer}>
          <View style={styles.chatItemContent}>
            <Text style={styles.chatItemText}>{item.question}</Text>
          </View>
        </View>
      );
    } else if (!item.isQuestion) {
      return (
        <ChatUserMessage
          style={styles.chatAnswerText}
          key={index}
          value={item.question}
          item={item}
          imgBase={item.imgBase ? url : item.imgBase}
          token={this.props.doctorToken}
          profilePicture={profilePicture}
          imgPress={() => {
            if (item.imgBase) {
              this.setState({
                imgModalVisible: true,
                source: url,
                path: "",
                isPdf: false
              });
            }
          }}
        />
      );
    } else {
      if (item.fileType && item.fileType !== "image") {
        return (<DoctorChatBotMessage
          key={index}
          value={item.question}
          title={item.title}
          data={item.title ? {} : null}
          isPdf={true}
          isChat={true}
          profilePicture={profilePicture}
        >
          {this.pdfDocument(url, "")}
        </DoctorChatBotMessage>)
      } else {
        return (
          <DoctorChatBotMessage
            key={index}
            value={item.question}
            title={item.title}
            data={item.title ? {} : null}
            imgBase={item.imgBase ? url : item.imgBase}
            isChat={true}
            profilePicture={profilePicture}
            imgPress={() => {
              if (item.imgBase) {
                this.setState({
                  imgModalVisible: true,
                  source: url,
                  path: "",
                  isPdf: false
                });
              }
            }}
          />
        );
      }
    }
  };
  pdfDocument = (source, path) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            imgModalVisible: true,
            source,
            path,
            isPdf: true
          });
        }}
      >
        {source ? (
          <Pdf
            source={source}
            style={styles.pdfStyle}
            onLoadComplete={(numberOfPages, filePath) => { }}
          />
        ) : null}
      </TouchableOpacity>
    );
  };

  render() {
    const chathistory = path(["navigation", "state", "params", "chathistory"], this.props);
    const agentChat = path(["navigation", "state", "params", "agentChat"], this.props);
    const { messages } = this.props;
    let data = [];
    TimeoutLinstener.reStart();
    if (messages) {
      const mags = JSON.parse(JSON.stringify(messages));
      const list = mags.reverse();
      let userName = "";

      list.map(item => {
        if (!userName && item.senderId === "doctor") {
          userName = "doctor";
        } else if (!userName && item.senderId === "agent") {
          userName = "agent";
        }
        data.push({
          question: item.message,
          type: "textInput",
          isQuestion: item.senderId === "doctor" || item.senderId === "agent",
          imgBase: item.imgUrl,
          fileType: item.fileType,
          fileName: item.fileName,
        });
      });

      data.unshift({
        question: `${this.metaConstants.doctorChatStartToChatWithLabel} ${userName}`,
        type: "chat",
        isQuestion: true,
      });
    }
    return (
      <SafeAreaView style={styles.flexStyle}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.headerButtonStyle}
            onPress={() => {
              if (chathistory) {
                this.props.navigation.goBack();
              } else {
                if (agentChat) {
                  this.props.navigation.goBack();
                }
                else {
                  this.props.goBack();
                }
              }
            }}>
            <Image style={styles.headerBackImage} source={BACK} />
          </TouchableOpacity>
          <View accessibilityLabel="home" accesible style={styles.headerDocLogoContainer}>
            <Image style={{ width: 80, height: 24, }} resizeMode="contain" source={DOCLOGO} />
          </View>
        </View>
        <View style={{ height: height - 52 }}>
          <KeyboardAwareScrollView
            keyboardOpeningTime={0}
            enableOnAndroid
            contentContainerStyle={styles.wrapper}>
            {!chathistory ? (
              <View>
                <View style={{ backgroundColor: "#fff", height: height - 140 }}>
                  {this.renderQuestionnaireLog(data, !chathistory)}
                </View>
                {this.renderUserInput()}
              </View>
            ) : (
                <View style={{ backgroundColor: "#fff", height: height - 55 }}>
                  {this.renderQuestionnaireLog(data, !chathistory)}
                </View>
              )}
          </KeyboardAwareScrollView>
        </View>

        {this.state.modalVisible ? this.prepareCameraGalleryModal() : null}
        {this.state.imgModalVisible ? this.prepareImageViewingModal() : null}
      </SafeAreaView>
    );
  }

  prepareImageViewingModal = () => {
    return (
      <View style={styles.documentContainer} >
        <View style={styles.documentView} >
          <TouchableOpacity onPress={() => this.setState({ imgModalVisible: false })} >
            <Image style={styles.documentImg} source={CLOSE} />
          </TouchableOpacity>
        </View>
        <View style={styles.documentView1}>
          {this.state.isPdf ? (
            <Pdf
              source={this.state.source}
              style={styles.pdfview}
              onLoadComplete={(numberOfPages, filePath) => { }}
            />
          ) : (
              <Image style={styles.pdfImg} source={this.state.source} />
            )}
        </View>
      </View>
    )
  }

  prepareCameraGalleryModal = () => {
    return (
      <View style={styles.cameraGalleryModalContainer}>
        <TouchableOpacity
          style={styles.profileModalContent}
          onPress={() => {
            this.setState({ modalVisible: false });
          }}>
          <View style={styles.cameraGalleryContent}>
            <View style={styles.cameraGalleryCloseIconContainer}>
              <TouchableOpacity style={styles.flexDirectionReverse}
                onPress={() => this.setState({ modalVisible: false })}>
                <Image style={{ width: 18, height: 18, }} source={CLOSE_ICON} />
              </TouchableOpacity>
            </View>
            <Text style={styles.cameraGalleryModalText}>
              {this.metaConstants.doctorChatSelectPhotoLabel}
            </Text>
            <View style={styles.flexDirectionRow}>
              <View style={styles.showCameraGalleryContainer}>
                <TouchableOpacity style={styles.showCameraButton}
                  onPress={e => {
                    e.preventDefault();
                    this.showCamera();
                  }}>
                  <View style={styles.cameraGalleryImageContainer}>
                    <Image style={{ width: 50, height: 50 }} source={NEWCAMERA} />
                  </View>
                </TouchableOpacity>
                <Text style={styles.cameraText}>
                  {this.metaConstants.doctorChatCameraLabel}
                </Text>
              </View>
              <View style={styles.showCameraGalleryContainer}>
                <TouchableOpacity
                  style={styles.showCameraGalleryButton}
                  onPress={e => {
                    e.preventDefault();
                    this.showGalleryFiles();
                  }}>
                  <View style={styles.cameraGalleryImageContainer}>
                    <Image style={{ width: 50, height: 50 }} source={NEWFILE} />
                  </View>
                </TouchableOpacity>
                <Text style={styles.cameraGalleryText}>
                  {this.metaConstants.doctorChatGalleryLabel}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  sendMessage(message, episodeId) {
    const payload = {
      message,
      episodeId: episodeId,
      type: MYDOC_SEND_CHAT_MESSAGE,
      context: MY_DOC_CHAT_SCREEN,
    };
    this.props.sendChatMessage(payload);
  }

  loadMessages(episodeId) {
    this.props.getChatMessages(episodeId);
  }
}

const mapStateToProps = state => {
  return {
    messages: InternalChatSelector.getMessages(state),
    message: InternalChatSelector.getMessage(state),
    updateMessages: InternalChatSelector.updateMessages(state),
    episodeId: InternalChatSelector.getEpisodeId(state),
    doctorId: state.doctorServices.doctorId,
    doctorToken: state.doctorServices.doctorToken,
    orderRef: state.doctorServices.paymentConfirmation && state.doctorServices.paymentConfirmation.refNo,
    profilePicture: state.profile.profilePicture,
    userLanguagePreference: state.userPreferences.language,
  };
};

export default connect(
  mapStateToProps,
  {
    doAppLogout,
    sendChatMessage,
    updateChatMessage,
    setReceiver,
    clearState,
    dispatchEvent,
    getChatMessages: episodeId => ({
      context: pageKeys.MY_DOC_CHAT_SCREEN,
      type: CoreActionTypes.MYDOC_LOAD_CHAT_MESSAGES,
      payload: {
        episodeId
      },
    }),
    getImageData: (payload) => ({
      context: pageKeys.MY_DOC_CHAT_SCREEN,
      type: ActionTypes.MYDOC_GET_IMG_BASE,
      payload: {
        value: payload,
      },
    }),
    updateDocument: params => ({
      context: pageKeys.DOC_SERVICE_PRE_CONSULTATION_QUESTIONS,
      type: ActionTypes.DOC_SERVICE_UPDATE_FILE,
      payload: {
        content: params.content,
        filename: params.filename,
        doctorId: params.doctorId,
        orderRef: params.orderRef,
        episodeId: params.episodeId,
        agentChat: params.agentChat,
        callback: params.callback,
      },
    }),
    goBack: () => ({
      context: pageKeys.ALL,
      type: CoreActionTypes.GO_BACK_TO_PREVIOUS_SCREEN
    }),
  }
)(DoctorChatScreen);

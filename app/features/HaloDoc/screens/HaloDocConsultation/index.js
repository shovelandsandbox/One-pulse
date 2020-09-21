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
  Modal as RNModal,
  Platform,
  Dimensions,
  Alert,
  BackHandler
} from "react-native";
import {
  CoreActions,
  CoreSelectors,
  CoreConfig,
  CoreActionTypes,
  CoreServices,
  events
} from "@pru-rt-internal/pulse-common";
import styles from "./styles";
import * as HalodocActions from "../../configs/actionNames";
import { screenNames } from "../../configs/screenNames"
import {
  CLOSE_ICON,
  CLOSE,
  PLANE,
  EDITOR,
  NEWCAMERA,
  NEWFILE,
  CAMERA,
  MICROPHONE,
  MICROPHONE_ACTIVE,
  CAMERA_ACTIVE,
  AVATAR
} from "../../../../config/images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePicker from "react-native-image-crop-picker";
import Pdf from "react-native-pdf";
import OpenSettings from "react-native-open-settings";
import HaloChatBotMessage from "../../components/HaloChatBotMessage";
import { HalodocChatUserMessage } from "../../components/HalodocChatUserMessage";
import TimeoutLinstener from "../../../../utils/timeout/index";
import { OfflineImage } from "react-native-image-offline";
import { values, pickBy, any, path, map, forEach } from "ramda";
import HaloDocActionBar from "../../components/actionBar";
import Modal from "react-native-modal";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import { dispatchEvent } from "../../../../actions";
import { isNil } from "ramda";
import {
  getImageData,
  setFile,
  getConsultationById,
  gotoVoiceCallScreen,
  gotoVideoScreen,
  gotoHealthScreen,
  setConsultationStatus
} from '../../actions'
import { Theme } from "../../../../themes";
const { Colors } = Theme;

import { MYDOC_CLEAR_STATE } from '../../configs/actionNames'

import moment from "moment";
import FileSelect from "../../components/FileSelect";
import metaConstants from "../../meta";

const { pageKeys } = CoreConfig;

const {
  sendChatMessage,
  updateChatMessage,
  getChatMessages,
  setReceiver,
  clearState,
  doAppLogout
} = CoreActions;

const { InternalChatSelector } = CoreSelectors;
const { height } = Dimensions.get("window");

const { checkDevicePermission, grantDevicePermissions } = CoreServices;

class HaloDocChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalVisible: false,
      imgModalVisible: false,
      source: "",
      path: "",
      imgData: "",
      isPdf: false,
      connectionStatus: false,
      counter: 0,
      token: "",
      roomId: "",
      halodocUserId: "",
      consultationId: "",
      isSetUpCallServiceDone: false,
      isCallSwitchModalVisible: false,
      permissionModalVisible: false,
      docObject: null,
      roomDetails: null,
      permissions: {
        camera: false,
        microPhone: false
      }
    };
    this.metaConstants = { ...metaConstants.talkToDoctorMeta() }
    this.permsRequired = [
      {
        key: "camera",
        permissionKey: "camera",
        display: "Camera",
        activeImg: CAMERA_ACTIVE,
        inactiveImg: CAMERA
      },
      {
        key: "microPhone",
        permissionKey: "micro_phone",
        display: "Microphone",
        activeImg: MICROPHONE_ACTIVE,
        inactiveImg: MICROPHONE
      }
    ];
  }

  showVideoScreen = (docObject, roomDetails) => {
    this.props.gotoVideoScreen(docObject, roomDetails);
    this.props.dispatchEvent(events.HaloDocConsultaionVideoCall);
  };

  showVoiceScreen = (docObject, roomDetails) => {
    this.props.gotoVoiceCallScreen(docObject, roomDetails);
    this.props.dispatchEvent(events.HaloDocConsultaionVoiceCall);
  };

  checkRequiredPermissions() {
    const permsRequired = this.permsRequired;
    const promises = map((item =>
      checkDevicePermission(item.permissionKey)), permsRequired)

    return Promise.all(promises)
      .then(results => {
        const newPermissions = {};
        permsRequired.map(((item, idx) => {
          newPermissions[item.key] = results[idx];
        }))
        const allPermissionsAvailable =
          values(pickBy(val => !val, newPermissions)).length === 0;
        this.setState({
          ...this.state,
          permissionModalVisible: !allPermissionsAvailable,
          permissions: newPermissions
        });
        return allPermissionsAvailable;
      })
      .catch(error => console.log(`Error in promises ${error}`));
  }

  hidePermissionsPopup() {
    this.setState({
      permissionModalVisible: false
    });
  }

  renderPermissionsList() {
    return map((item => {
      const { permissions } = this.state;
      const hasPermission = permissions[item.key];
      return (
        <View style={styles.modalButton} key={item.key}>
          <View style={styles.permissionListView}>
            <OfflineImage
              key="camera"
              resizeMode="contain"
              style={styles.icons}
              fallbackSource={hasPermission ? item.activeImg : item.inactiveImg}
              source={hasPermission ? item.activeImg : item.inactiveImg}
            />

            <View style={styles.contentCenter}>
              <Text style={styles.modalButtonLabel}>
                {hasPermission
                  ? item.display + ` - ${this.permissionGranted}`
                  : item.display + ` - ${this.permissionNotGranted}`}
              </Text>
            </View>
          </View>
        </View>
      );
    }), this.permsRequired
    )
  }

  onGrantAccessClick = () => {
    this.setState({ permissionModalVisible: false });

    setTimeout(() => {
      this.onGrantAccess();
    }, 300);
  };

  onGrantAccess = () => {
    const { permissions } = this.state;

    const allPermissions = this.permsRequired.reduce(
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
      const permissionDenied = any(x => !x)(results);
      if (permissionDenied) {
        Alert.alert(this.permissionRequired, this.permissionDescription, [
          {
            text: this.ok,
            onPress: () => {
              OpenSettings.openSettings();
              this.hidePermissionsPopup();
            }
          },
          {
            text: this.permCancel,
            style: "cancel",
            onPress: () => this.hidePermissionsPopup()
          }
        ]);
      } else {
        this.allPermissionsAvailable = true;
        this.hidePermissionsPopup();
      }
    });
  };


  componentWillMount() {
    this.props.setConsultationStatus();
    this.props.getConsultationById(this.props.consultationId);
  }

  backPress = () => {
    this.props.gotoHealthScreen();
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backPress);
    this.checkRequiredPermissions().then(allPermissionsAvailable => {
      if (allPermissionsAvailable) {
        console.log("permission granted");
      } else {
        console.log("Don't have permissions");
      }
    });

    const chatId = path(
      ["navigation", "state", "params", "episodeId"],
      this.props
    );
    const { doAppLogout } = this.props;
    const episodeId = chatId ? chatId : this.props.episodeId;
    this.loadMessages(episodeId);
    TimeoutLinstener.start(doAppLogout);
    this.props.dispatchEvent(events.TalkTDChatScreen);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.chatRoomId &&
      this.props.chatRoomId !== prevProps.chatRoomId
    ) {
      this.chatRoomId = this.props.chatRoomId;
    }
  }

  onCancel = () => {
    this.setState({ permissionModalVisible: false });
  };

  onVideoCallClick = (docObject, roomDetails) => {
    this.props.dispatchEvent(events.VideoCallBtnClick);
    this.checkRequiredPermissions().then(allPermissionsAvailable => {
      if (allPermissionsAvailable) {
        this.showVideoScreen(docObject, roomDetails);
      }
    });
  };

  onVoiceCallClick = (docObject, roomDetails) => {
    this.checkRequiredPermissions().then(allPermissionsAvailable => {
      if (allPermissionsAvailable) {
        this.showVoiceScreen(docObject, roomDetails);
      }
    });
    this.props.dispatchEvent(events.VoiceCallBtnClick);
  };

  onCallClick = () => {
    const docObject = path(["joinCallDocObject", "doctor"], this.props);
    const param = this.props.navigation.getParam("content");
    let content = JSON.parse(param);
    const roomDetails = {
      token: this.props.navigation.getParam("token"),
      roomId: content.av_room_id,
      incommingCall: true,
      chatRoomId: this.props.chatRoomId || this.chatRoomId,
      halodocUserId: this.props.halodocUserId,
      callType: content.call_type,
      callUid: this.props.navigation.getParam("uId")
    };
    this.props.dispatchEvent(events.JoinCallBtnClick);
    this.setState({ docObject, roomDetails });
    // if (this.isAudioCall(roomDetails)) {
    if (roomDetails.callType === "voice") {
      this.onVoiceCallClick(docObject, roomDetails);
    } else {
      this.onVideoCallClick(docObject, roomDetails);
    }
  };

  isAudioCall = roomDetails => {
    return roomDetails.callType === "voice";
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.updateMessages !== nextProps.updateMessages) {
      const chatId = path(
        ["navigation", "state", "params", "episodeId"],
        nextProps
      );
      const episodeId = chatId ? chatId : nextProps.episodeId;
      this.loadMessages(episodeId);
    } else if (this.props.sendingError !== nextProps.sendingError) {
      if (nextProps.sendingError) {
        alert(nextProps.sendingError);
      }
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPress);
    this.props.clearState({ type: MYDOC_CLEAR_STATE });
    TimeoutLinstener.stop();
  }

  handleBlur() {
    Keyboard.dismiss();
  }

  showModal() {
    this.setState({ modalVisible: true });
  }
  showCamera() {
    const cameraPermission = this.metaConstants.Camera_Permission
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      useFrontCamera: true,
      includeBase64: true,
      compressImageQuality: 0.7,
      photo: "photo"
    })
      .then(data => {
        const file = data.data;
        const time = new Date().getTime();
        const name = "pic" + time + ".jpg";
        this.setState({ imgData: file });
        this.getChildFile(file, name);
      })
      .catch(error => {
        this.setState({
          modalVisible: false
        });
        if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
          Alert.alert(
            "",
            cameraPermission,
            [
              { text: "Ok", onPress: () => OpenSettings.openSettings() },
              { text: "Cancel", style: "cancel" }
            ],
            { cancelable: false }
          );
        }
      });
  }

  getFiles() {
    ImagePicker.openPicker({
      mediaType: "photo",
      width: 200,
      height: 200,
      includeBase64: true,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      compressImageQuality: 0.8,
      photo: "photo"
    })
      .then(data => {
        const file = data.data;
        const name = data.hasOwnProperty("filename")
          ? data.filename
          : data.path.substr(data.path.lastIndexOf("/") + 1);
        this.setState({ imgData: file });
        this.getChildFile(file, name);
      })
      .catch(error => {
        // alert(error);
      });
  }

  getChildFile(file, name) {
    this.setState({
      showModal: false,
      modalVisible: false
    });
    const { doctorId, orderRef, consultationId } = this.props;
    this.props.setFile({
      content: file,
      consultationId: consultationId,
      filename: name,
      doctorId,
      orderRef,
      callback: this.callback
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

  close() {
    this.setState({
      showModal: false
    });
  }

  onSubmitMessageClick = () => {
    const chatId = path(
      ["navigation", "state", "params", "episodeId"],
      this.props
    );
    const episodeId = chatId ? chatId : this.props.episodeId;
    let messageStatus = this.props.message;
    if (messageStatus && messageStatus.replace(/\s/g, '').length) {
      this.sendMessage(this.props.message, episodeId);
      this.sendMessageInput.clear();
    }
  };

  renderUserInput = () => {
    return (
      <View style={styles.bottomView}>
        <TouchableOpacity onPress={() => { this.showModal() }}  >
          <Image
            resizeMode="contain"
            style={styles.enterButton}
            source={EDITOR}
          />
        </TouchableOpacity>
        <TextInput
          ref={ref => { this.sendMessageInput = ref }}
          onBlur={this.handleBlur}
          style={styles.chatInsertBox}
          maxLength={255}
          onChangeText={this.props.updateChatMessage}
          underlineColorAndroid={Colors.whiteSmoke}
          onSubmitEditing={this.onSubmitMessageClick}
        />
        <TouchableOpacity onPress={this.onSubmitMessageClick}>
          <Image resizeMode="contain" style={styles.enterButton} source={PLANE} />
        </TouchableOpacity>
      </View>
    );
  };

  renderQuestionnaireLog = (
    dataObject,
    type,
    docObject,
    onVideoCallClick,
    onVoiceCallClick,
    onCallClick,
    showJoinCall
  ) => {
    const data = [
      { hasDoctorJoinedChat: true },

      ...dataObject.map(item => {
        return {
          ...item,
          profilePicture: docObject.image_url
        };
      }),


      { isJoinCallType: true, onCallClick, showJoinCall, docObject },
      { isFreeSpace: true }
    ];

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
          style={[
            styles.flexStyle,
            { minHeight: type ? height - 152 : height - 88 }
          ]}
          data={data}
          renderItem={this.renderItem}
          extraData={this.state}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  renderItem = data => {
    const Doc_Join_Chat = this.metaConstants.Doc_Join_Chat;
    const Doc_Join_Call = this.metaConstants.Doc_Join_Call;
    const profilePicture = this.props.profilePicture
      ? this.props.profilePicture
      : "";
    const { item, index } = data;
    if (item.hasDoctorJoinedChat) {
      return (
        <View style={styles.docOnChatContainerStyle}>
          <View style={styles.docOnChatDashStyle} />
          <Text>{Doc_Join_Chat}</Text>
          <View style={styles.docOnChatDashStyle} />
        </View>
      );
    } else if (item.isJoinCallType) {
      const time = moment(new Date()).format("Do MMMM YYYY h:mm a");
      return (
        item.showJoinCall && (
          <View style={{ display: "flex", flexDirection: "row", margin: 10 }}>
            <Image
              style={styles.chatbotIcon}
              source={{ uri: item.docObject.image_url }}
            />

            <View style={styles.joinCallContainer}>
              <View style={styles.joinCallContainer1}>
                <View style={styles.joinCallPart1Container}>
                  <Image
                    resizeMode="contain"
                    style={styles.joinCallImageContainer}
                    source={{ uri: item.docObject.image_url }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.joinCallDocNameStyle}>
                    {item.docObject
                      ? `${item.docObject.first_name || item.docObject.doctor_first_name} ${item.docObject.last_name || item.docObject.doctor_last_name}`
                      : ""}
                  </Text>
                  <Text style={styles.joinCallTimeStyle}>{time}</Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.onCallClick()}
              >
                <View style={styles.joinCallView}>
                  <Text style={styles.joinCallTextStyle}>{Doc_Join_Call}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )
      );
    } else if (item.isFreeSpace) {
      return <View style={styles.viewStyle}></View>;
    } else if (item.type === "chat") {
      return (
        <View style={styles.chatContainer}>
          <View style={styles.chatView} >
            <Text style={styles.chatText}>
              {item.question}
            </Text>
          </View>
        </View>
      );
    } else if (!item.isQuestion) {
      return (
        <HalodocChatUserMessage
          style={styles.chatMsgStyle}
          key={index}
          value={item.question}
          item={item}
          imgBase={item.imgBase}
          token={this.props.doctorToken}
          profilePicture={profilePicture}
          imgPress={() => {
            if (item.imgBase) {
              this.setState({
                imgModalVisible: true,
                source: item.imgBase,
                path: ""
              });
            }
          }}
        />
      );
    } else {
      if (
        item.fileType &&
        item.fileType !== "image" &&
        item.fileType !== "document"
      ) {
      } else {
        return (
          <HaloChatBotMessage
            key={index}
            value={item.question}
            title={item.title}
            data={item.title ? {} : null}
            imgBase={item.imgBase}
            isChat={true}
            isPdf={item.fileType === "document"}
            profilePicture={this.props.docObject.image_url}
            portrait={this.props.docObject.image_url ? true : false}
            imgPress={() => {
              if (item.imgBase) {
                this.setState({
                  imgModalVisible: true,
                  source: item.imgBase,
                  path: "",
                  isPdf: false
                });
              }
            }}
          >
            {this.pdfDocument(item.attachmentUrl, "")}
          </HaloChatBotMessage>
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
            source={{ uri: source }}
            style={styles.pdfStyle}
            onLoadComplete={(numberOfPages, filePath) => { }}
          />
        ) : null}
      </TouchableOpacity>
    );
  };

  renderPermissionModal() {
    const deviceAccess = this.metaConstants.deviceAccess
    const cameraPermission = this.metaConstants.Camera
    const and = this.metaConstants.And
    const microphonePermission = this.metaConstants.MicroPhone
    const proceed = this.metaConstants.BeforeProceed
    const cancel = this.metaConstants.Cancel
    this.permCancel = this.metaConstants.Cancel
    this.ok = this.metaConstants.OK
    const grantAccess = this.metaConstants.grantAccess

    return (
      <Modal
        isVisible={this.state.permissionModalVisible}
        onBackdropPress={() =>
          this.setState({ permissionModalVisible: true })
        }
        onModalHide={() => {
          if (this.allPermissionsAvailable) {
            this.initializeAndSetupMaduraCallService();
          }
        }}
      >
        <View style={styles.profileModalContent}>
          <View style={styles.modalStyle}>
            <Text style={styles.modalLabel}>
              {` ${
                deviceAccess
                } `}
              <Text style={styles.labelBold}>{cameraPermission}</Text>
              {` ${
                and
                } `}
              <Text style={styles.labelBold}>{microphonePermission}</Text>
              {` ${
                proceed
                } `}
            </Text>
            <View>{this.renderPermissionsList()}</View>
            <View style={styles.modalFooterBtnContainer}>
              <TouchableOpacity
                style={styles.modalFooterBtn}
                onPress={this.onCancel}
              >
                <Text
                  style={[
                    styles.modalFooterLabel,
                    styles.labelBold,
                    styles.textLeft
                  ]}
                >
                  {cancel}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalFooterBtn}
                onPress={e => {
                  e.preventDefault();
                  this.onGrantAccessClick();
                }}
              >
                <Text
                  style={[
                    styles.modalFooterLabel,
                    styles.labelBold,
                    styles.textRight
                  ]}
                >
                  {grantAccess}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }


  switchToVideoAlert() {
    return (

      <Modal
        visible={this.state.isCallSwitchModalVisible}
        transparent={true}
        backdropColor={Colors.black}
        backdropOpacity={0.5}
        style={styles.mainContainer}
      >
        <Text>{this.metaConstants.switchToVideo}</Text>
      </Modal>
    )
  }

  renderChatScreen() {

    const Doc_Video = this.metaConstants.Doc_Video;
    const Doc_Audio = this.metaConstants.Doc_Audio;
    let showJoinCall = this.props.navigation.getParam("showJoinCall");
    let docObject = this.props.navigation.getParam("docObject", this.props.docObject);
    if (!docObject) {
      docObject = {
        image_url: this.props.navigation.getParam("doctorImageUrl"),
        first_name: this.props.navigation.getParam("doctorName"),
        last_name: this.props.navigation.getParam("doctorLastName")
      };
    }
    const chathistory = path(
      ["navigation", "state", "params", "chathistory"],
      this.props
    );

    const { messages } = this.props;

    let data = [];
    TimeoutLinstener.reStart();

    if (messages) {
      const mags = JSON.parse(JSON.stringify(messages));
      const list = !isNil(mags) && Array.isArray(mags) ? mags.reverse() : [];
      let userName = "";


      map((item => {
        if (!userName && item.sender === "doctor") {
          userName = "doctor";
        } else if (!userName && item.sender === "agent") {
          userName = "agent";
        }
        if (item.message) {
          const attachmentUrl = path(
            ["message", "attributes", "attachment_url"],
            item
          );

          let fileType = attachmentUrl
            ? attachmentUrl.substring(attachmentUrl.lastIndexOf(".") + 1).toLowerCase()
            : null;
          let imageBase = null;
          if (
            fileType &&
            (fileType === "png" ||
              fileType === "jpg" ||
              fileType === "tiff" ||
              fileType === "jpeg" ||
              fileType === "gif")
          ) {
            (fileType = "image"), (imageBase = attachmentUrl);
          } else if (fileType && fileType === "pdf") {
            fileType = "document";
          }

          data.push({
            question: item.message.text,
            type: "textInput",
            isQuestion: item.sender === "doctor" || item.sender === "agent",
            imgBase: imageBase,
            fileType: item.fileType || fileType,
            fileName: item.fileName,
            attachmentUrl: attachmentUrl
          });
        }
      }), list)

    }


    return (
      <View style={styles.chatContainer1}>
        <View style={styles.audioVideoContainerStyle}>
          <TouchableOpacity onPress={() => {
            if (!showJoinCall) {
              this.onVideoCallClick(docObject);
            } else {
              alert(this.metaConstants.DocJoined);
            }
          }}>
            <View style={styles.videoView}>
              <FontAwesomeIcons
                name="video-camera"
                size={22}
                color={Colors.pulseRed}
              />
              <Text style={styles.videoText}>
                {
                  Doc_Video
                }
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.audioVideoLineStyle} />

          <TouchableOpacity onPress={() => {
            if (!showJoinCall) {
              this.onVoiceCallClick(docObject)
            } else {
              alert(this.metaConstants.DocJoined);
            }
          }}>
            <View style={styles.audioView}>
              <FontAwesomeIcons name="phone" size={22} color={Colors.pulseRed} />
              <Text style={styles.audioText}>
                {
                  Doc_Audio
                }
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView
          keyboardOpeningTime={0}
          enableOnAndroid
          contentContainerStyle={styles.wrapper}
          keyboardShouldPersistTaps='always'
          keyboardDismissMode='on-drag'>
          {!chathistory ? (
            <View>
              <View style={styles.chatMsgStyle}>
                {this.renderQuestionnaireLog(
                  data,
                  !chathistory,
                  docObject,
                  this.onVideoCallClick,
                  this.onVoiceCallClick,
                  this.onCallClick,
                  showJoinCall
                )}
              </View>
              {this.renderUserInput()}
            </View>
          ) : (
              <View style={styles.questionStyle}>
                {this.renderQuestionnaireLog(
                  data,
                  !chathistory,
                  docObject,
                  this.onVideoCallClick,
                  this.onVoiceCallClick,
                  this.onCallClick,
                  showJoinCall
                )}
              </View>
            )}
        </KeyboardAwareScrollView>
      </View>
    )
  }



  closeModal() {
    return (
      <RNModal
        animationType="slide"
        transparent={false}
        visible={this.state.showModal}
        onRequestClose={() => {
          alert(this.metaConstants.ModalClosed);
        }}
      >
        <FileSelect
          fileList={this.fileArr}
          getFile={(file, name) => {
            this.getChildFile(file, name);
          }}
          close={() => {
            this.close();
          }}
        />
      </RNModal>
    )
  }

  renderPdfView() {
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
              source={{ uri: this.state.source }}
              style={styles.pdfview}
              onLoadComplete={(numberOfPages, filePath) => { }}
            />
          ) : (
              <Image style={styles.pdfImg} source={{ uri: `${this.state.source}` }} />
            )}
        </View>
      </View>
    )
  }

  renderUploadImageView() {
    return (
      <View style={styles.visibleModalView} >
        <TouchableOpacity
          style={styles.profileModalContent}
          onPress={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <View style={styles.modalStyle} >
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.touchStyle}
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Image style={styles.imgStyle} source={CLOSE_ICON} />
              </TouchableOpacity>
            </View>
            <Text style={styles.selectPicStyle} >
              Select photo from
            </Text>
            <View style={styles.cameraStyle}>
              <View style={styles.cameraView}>
                <TouchableOpacity
                  style={styles.onCameraStyle}
                  onPress={e => {
                    e.preventDefault();
                    this.showCamera();
                  }}
                >
                  <View style={styles.cameraPicTouch}>
                    <Image style={styles.cameraPic} source={NEWCAMERA} />
                  </View>
                </TouchableOpacity>
                <Text style={styles.cameraText}>
                  {this.metaConstants.Camera}
                </Text>
              </View>
              <View style={styles.galleryContainer}>
                <TouchableOpacity
                  style={styles.galleryBtn}
                  onPress={e => {
                    e.preventDefault();
                    this.getFiles();
                  }}
                >
                  <View style={styles.galleryView} >
                    <Image style={styles.galleryImg} source={NEWFILE} />
                  </View>
                </TouchableOpacity>
                <Text style={styles.gallerytext} >
                  {this.metaConstants.Gallery}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    let docObject = this.props.navigation.getParam("docObject", this.props.docObject);
    let showJoinCall = this.props.navigation.getParam("showJoinCall");

    if (!docObject) {
      docObject = {
        image_url: this.props.navigation.getParam("doctorImageUrl"),
        first_name: this.props.navigation.getParam("doctorName"),
        last_name: this.props.navigation.getParam("doctorLastName")
      };
    }
    this.permCancel = this.metaConstants.Cancel
    this.ok = this.metaConstants.Ok
    const grantAccess = this.metaConstants.grantAccess
    this.proceed = this.metaConstants.Proceed
    this.permissionRequired = this.metaConstants.permRequired
    this.permissionDescription = this.metaConstants.permDesc
    this.permissionGranted = this.metaConstants.permGranted
    this.permissionNotGranted = this.metaConstants.permNotGranted

    const chathistory = path(
      ["navigation", "state", "params", "chathistory"],
      this.props
    );
    const agentChat = path(
      ["navigation", "state", "params", "agentChat"],
      this.props
    );
    const { messages } = this.props;
    let data = [];
    TimeoutLinstener.reStart();
    if (messages) {
      const mags = JSON.parse(JSON.stringify(messages));

      const list = !isNil(mags) && Array.isArray(mags) ? mags.reverse() : [];
      let userName = "";

      map((item => {
        if (!userName && item.sender === "doctor") {
          userName = "doctor";
        } else if (!userName && item.sender === "agent") {
          userName = "agent";
        }
        if (item.message) {
          const attachmentUrl = path(
            ["message", "attributes", "attachment_url"],
            item
          );

          let fileType = attachmentUrl
            ? attachmentUrl.substring(attachmentUrl.lastIndexOf(".") + 1).toLowerCase()
            : null;
          let imageBase = null;
          if (
            fileType &&
            (fileType === "png" ||
              fileType === "jpg" ||
              fileType === "tiff" ||
              fileType === "jpeg" ||
              fileType === "gif")
          ) {
            (fileType = "image"), (imageBase = attachmentUrl);
          } else if (fileType && fileType === "pdf") {
            fileType = "document";
          }

          data.push({
            question: item.message.text,
            type: "textInput",
            isQuestion: item.sender === "doctor" || item.sender === "agent",
            imgBase: imageBase,
            fileType: item.fileType || fileType,
            fileName: item.fileName,
            attachmentUrl: attachmentUrl
          });
        }
      }), list
      )
    }

    return (
      <View style={styles.mainContainer1}>
        <HaloDocActionBar
          onGoBack={() => this.props.gotoHealthScreen()}
        ></HaloDocActionBar>

        {this.switchToVideoAlert()}
        {this.closeModal()}
        {this.renderPermissionModal()}
        {this.renderChatScreen()}
        {this.state.modalVisible ? this.renderUploadImageView() : null}
        {this.state.imgModalVisible ? this.renderPdfView() : null}
      </View >
    );
  }

  sendMessage(message, episodeId) {
    const payload = {
      message,
      episodeId: episodeId,
      consultationId: this.props.consultationId,
      type: HalodocActions.HALODOC_SEND_CHAT_MESSAGE,
      context: screenNames.HALODOC_CONSULTATION
    };
    this.props.sendChatMessage(payload);
  }

  loadMessages(episodeId) {
    const payload = {
      type: HalodocActions.HALODOC_LOAD_CHAT_MESSAGES,
      context: screenNames.HALODOC_CONSULTATION,
      consultationId: this.props.consultationId,
      toggleLoader: false
    };
    this.props.getChatMessages(payload);
  }
}

const mapStateToProps = state => {
  return {
    messages: InternalChatSelector.getMessages(state),
    message: InternalChatSelector.getMessage(state),
    updateMessages: InternalChatSelector.updateMessages(state),
    episodeId: InternalChatSelector.getEpisodeId(state),
    doctorId: state.haloDocServices.doctorId,
    doctorToken: state.haloDocServices.doctorToken,
    orderRef:
      state.haloDocServices.paymentConfirmation &&
      state.haloDocServices.paymentConfirmation.refNo,
    profilePicture: state.profile.profilePicture,
    appointmentRequestSuccess: state.haloDocServices.appointmentRequestSuccess,
    consultationId: state.haloDocServices.consultationId,

    halodocUserId: state.auth.haloDocUserId,
    chatRoomId: state.haloDocServices.chatRoomId,

    sendingError: InternalChatSelector.getSendingError(state),
    docObject: state.haloDocServices.docObject,
  };
};
export default connect(mapStateToProps, {
  dispatchEvent,
  doAppLogout,
  sendChatMessage,
  getChatMessages,
  updateChatMessage,
  setReceiver,
  clearState,

  getImageData,
  setFile,
  getConsultationById,
  gotoVoiceCallScreen,
  gotoVideoScreen,
  gotoHealthScreen,
  setConsultationStatus

})(HaloDocChat);


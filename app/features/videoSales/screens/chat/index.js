/* eslint-disable react/require-optimization */
import React, { Component } from "react";
import {
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  PermissionsAndroid,
  CameraRoll,
  Share,
  FlatList,
  ImageBackground,
} from "react-native";
import moment from "moment";
import { path, values, pickBy, any, pathOr, isNil } from "ramda";
import { connect } from "react-redux";
import { Client as TwilioChatClient } from "twilio-chat";
import Pdf from "react-native-pdf";
import RNFetchBlob from "rn-fetch-blob";
import { Bubble, GiftedChat, Time, Day } from "react-native-gifted-chat";
import RNFS from "react-native-fs";
import { OfflineImage } from "react-native-image-offline";
import OpenSettings from "react-native-open-settings";
import { dispatchEvent } from "../../../../actions";
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";
import Styles from "./styles";
import styles from "../TwilioVideoCall/styles";
import Thumbnail from "../../components/Thumbnail";
import Twilio from "../TwilioVideoCall/twilio";
import ProfileImage from "../../components/ProfileImage";
import {
  createRoom,
  createChatChannel,
  clearTextChatSession,
  videoCallConnected,
  videoCallEnded,
  videoCallDropped,
  getSelfDetails,
  videoResize,
  endChatSession,
  uploadDocumentCall,
  getDocumentOrProfilePic,
  resetDocumentFlag,
  resetProfilePic,
  goTo,
  gotoWithParams,
  updatePaymentDetails,
  setUploadCancelled,
  resetUploadCancelled,
} from "../../actions";
import screenNames from "../../configs/screenNames";
import actionNames from "../../configs/actionNames";
import ProductModal from "../../components/ProductModal/ProductModal";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import {registerEvent} from "../../../../utils/registerEvents/actions";
import {eventNames} from "../../events";

const metaFinderVideoSales = key => {
  return safeMetaLabelFinder("VideoSales", key);
};

import {
  SALE_DOWNLOAD,
  SALE_CLOSE,
  CAMERA,
  CAMERA_ACTIVE,
  MICROPHONE,
  MICROPHONE_ACTIVE,
  CHAT_BACKGROUND,
  SALE_VIDEO_CHAT_WHITE,
  SALE_PAYMENT_LINK,
} from "../../../../config/images";
import { CustomAlert } from "../../../../components";
import Orientation from "react-native-orientation";
import ChatMenuActions from "../../components/ChatMenuActions";
import {
  CoreActionTypes,
  CoreComponents,
  CoreServices,
  events,
} from "@pru-rt-internal/pulse-common";
const { Loader } = CoreComponents;
import MetaConstants from "../../meta";
import DocSignature from "../../components/DocSignature";
import { WatermarkUtils } from "../../../../utils/WatermarkUtils";
const { addTextToPdf, addTextToImageBase64 } = WatermarkUtils;

const applyWaterMark = async (document, fileType) => {
  let waterMarkedDocument;
  const waterMarkConfig = {
    waterMarkText: metaFinderVideoSales("water_mark_text"),
    waterMarkDateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
  };
  if (fileType === "pdf") {
    waterMarkedDocument = await addTextToPdf(document, waterMarkConfig);
  } else {
    waterMarkedDocument = await addTextToImageBase64(document, waterMarkConfig);
    waterMarkedDocument = waterMarkedDocument.content;
  }
  return waterMarkedDocument;
};

const {
  checkDevicePermission,
  grantDevicePermissions,
  NavigationService,
} = CoreServices;
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
let documentFileName = "";
let documentFiletype = "";
const base64Type = "data:image/jpeg;base64,";
const signCommonObj = {
  x: 65,
  y: 370,
  width: 150,
  height: 40,
  pageNumber: 1,
  action: "Send Back",
  message: "Customer",
};
const dateHourCommonObj = {
  x: 110,
  y: 375,
  pageNumber: 1,
  format: "YYYY-MM-DD h:mm:ss",
};
const dateCommonObj = {
  x: 112,
  y: 435,
  pageNumber: 1,
  format: "YYYY/MM/DD",
};
const policySignatur = [
  {
    policyName: "needAnalysis_Testing",
    policyDocumentFileName: "cust_signed_needAnalysis_1598290081548.pdf",
    fileNameRegex: "^(cust_signed_needAnalysis_)([a-zA-Z0-9_.]*)$",
    fileType: "needAnalysis_",
    partyType: "agent_",
    signatureCoordinate: [
      {
        x: 65,
        y: 370,
        width: 150,
        height: 40,
        pageNumber: 1,
        action: "Send Back",
        message: "FC/LC'",
        dateCoordinate: [
          {
            x: 110,
            y: 375,
            pageNumber: 1,
            format: "YYYY-MM-DD HH:mm:ss",
          },
        ],
      },
    ],
  },
  {
    policyName: "needAnalysis_Testing",
    policyDocumentFileName: "needAnalysis_1598290081548.pdf",
    fileNameRegex: "^(needAnalysis_)([a-zA-Z0-9_.]*)$",
    fileType: "needAnalysis_",
    partyType: "cust_signed_",
    signatureCoordinate: [
      {
        x: 385,
        y: 372,
        width: 150,
        height: 40,
        pageNumber: 1,
        action: "Send Back",
        message: "Customer",
        dateCoordinate: [
          {
            x: 400,
            y: 375,
            pageNumber: 1,
            format: "YYYY-MM-DD HH:mm:ss",
          },
        ],
      },
    ],
  },
];
const getCurrentScreenMeta = key => {
  return safeMetaLabelFinder("DocumentSignature", key);
};
class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      typingMessage: "",
      showLoader: false,
      showPdfModal: false,
      filetype: "",
      showImageModal: false,
      filenameToWrite: "",
      permissions: null,
      modalVisible: false,
      areAllPermissionsAvailable: false,
      chatDetails: props.chatDetails,
      showSignatureView: false,
      policySignatureCoords: {},
      productDocumentModal: false,
    };
    this.metaConstants = { ...MetaConstants.screenMeta() };
    this.policySignatureCoords = getCurrentScreenMeta("signature_coords_configuration");
  }
  initializeMessenging(chatToken) {

    // inititateChat event
    this.props.registerEvent(eventNames.initiateChat);

    this.setState({ showLoader: true });
    const { profilePictureId } = this.props;
    if (profilePictureId) {
      this.props.getDocumentOrProfilePic(profilePictureId, "profilePicture");
    }
    TwilioChatClient.create(chatToken, { logLevel: "debug" })
      .then(chatClient => {
        this.client = chatClient;
        this.setupChatClient(this.client);
      })
      .catch(e => {
        console.log(e)
        // initiatechat failure event
        this.props.registerEvent(eventNames.initiateChatFailure)
      });

  }

  setupChatClient(client) {
    const {
      chatDetails: { channelId },
    } = this.props;
    const customChannelId = channelId.substr(0, 33); //max 33 letters
    this.client = client;
    this.client
      .getChannelByUniqueName(customChannelId)
      .then(channel => channel)
      .catch(error => {
        if (error.body.code === 50300) {
          return this.client.createChannel({ uniqueName: customChannelId });
        }
        this.handleError(error);
      })
      .then(channel => {
        this.channel = channel;
        return this.channel.join().catch(() => { });
      })
      .then(() => {
        this.channel.getMessages().then(this.messagesLoaded);
        this.channel.on("messageAdded", this.messageAdded);
        this.channel.on("messageRemoved", this.messagesRemoved);
        this.setState({ showLoader: false });

        // initiatechat success event
        this.props.registerEvent(eventNames.initiateChatSuccess)
      })
      .catch(this.handleError);
  }

  getPaymentStatusMessage = messageOnEntry => {
    return `Payment of ${messageOnEntry.currency} ${messageOnEntry.paymentAmount} is successfully completed.\n\nTransaction id - ${messageOnEntry.orderRef}`;
  };

  postMessageOnEntry = () => {
    const { messageOnEntry } = this.props;
    if (messageOnEntry) {
      if (messageOnEntry.type === "payment-link") {
        this.channel.sendMessage(
          {
            contentType: "application/json",
            media: "1",
          },
          { ...messageOnEntry }
        );
      } else if (messageOnEntry.type === "payment-status") {
        const paymentStatusMessage = this.getPaymentStatusMessage(
          messageOnEntry
        );
        this.channel.sendMessage(paymentStatusMessage);
      }
      this.props.updatePaymentDetails({});
    }
  };

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.postMessageOnEntry();
      }
    );
    const { getSelfDetails, userProfile, myAccountId, isLoggedIn } = this.props;
    const {
      chatDetails: { chatToken },
    } = this.state;

    this.checkRequiredPermissions().then(permissions => {
      const areAllPermissionsAvailable =
        values(pickBy(val => !val, permissions)).length === 0;

      this.setState({
        permissions,
        modalVisible: !areAllPermissionsAvailable,
        areAllPermissionsAvailable,
      });
    });
    if (isLoggedIn && chatToken) this.initializeMessenging(chatToken);
    if (isLoggedIn && !myAccountId) getSelfDetails(userProfile.email);

    Orientation.unlockAllOrientations();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const chatTokenFromProps = pathOr(
      null,
      ["chatDetails", "chatToken"],
      nextProps
    );
    const isLoggedIn = pathOr(false, ["isLoggedIn"], nextProps);
    const chatTokenFromState = pathOr(
      null,
      ["chatDetails", "chatToken"],
      prevState
    );

    if (chatTokenFromProps !== chatTokenFromState && isLoggedIn) {
      return {
        chatDetails: nextProps.chatDetails,
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const chatTokenFromCurrState = pathOr(
      null,
      ["chatDetails", "chatToken"],
      this.state
    );
    const chatTokenFromPrevState = pathOr(
      null,
      ["chatDetails", "chatToken"],
      prevState
    );

    if (chatTokenFromPrevState !== chatTokenFromCurrState) {
      this.initializeMessenging(chatTokenFromCurrState);
      if (this.props.callStatus === "VIDEO_CALL_IN_PROGRESS") {
        this.props.videoResize(true);
        // this.props.dispatchEvent(events.switchFromChatToVideo);
        this.props.registerEvent(eventNames.switchFromVideoToChat)
      }
    }
    if (this.props.uploadingDocument != prevProps.uploadingDocument) {
      if (this.props.uploadingDocument) {
        if (this.props.uploadCancelled) {
          this.props.resetUploadCancelled();
        } else {
          CustomAlert.hide();
          this.handleSend(prevProps.documentId, "pdf/image");
        }
      }
    }
  }

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
    this.props.goBack();
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
      const All_Permission_Desc = this.metaConstants.all_permission_desc;
      const All_Permission_Ok = this.metaConstants.all_permission_ok;
      const All_Permission_Cancel = this.metaConstants.all_permission_cancel;
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
        this.setState({
          areAllPermissionsAvailable: true,
          modalVisible: false,
        });
      }
    });
  };

  renderPermissionsList() {
    const granted = this.metaConstants.granted;
    const not_granted = this.metaConstants.granted;
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
            <Text style={{...styles.modalButtonLabel, ...configureLineHeight("13")}}>
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
    const Camera = this.metaConstants.camera;
    const Microphone = this.metaConstants.microphone;
    const Cancel = this.metaConstants.all_permission_cancel;
    const grant_access = this.metaConstants.grant_access;
    const Need_Access_To = this.metaConstants.need_access_to;
    const And = this.metaConstants.video_and;

    return (
      <Modal
        isVisible={this.state.modalVisible}
        onBackdropPress={() => this.setState({ modalVisible: true })}
      >
        <View style={styles.modalStyle}>
          <Text style={{...styles.modalLabel, ...configureLineHeight("15")}}>
            {Need_Access_To}
            <Text style={styles.labelBold}>{Camera} </Text>
            {And}
            <Text style={styles.labelBold}> {Microphone}</Text>
          </Text>
          <View style={styles.permissionsContainer}>
            {this.renderPermissionsList()}
          </View>
          <View style={styles.modalFooterBtnContainer}>
            <TouchableOpacity
              style={styles.modalFooterBtn}
              onPress={e => {
                e.preventDefault();
                this.onGrantAccess();
              }}
            >
              <Text
                style={{
                  ...styles.modalFooterLabel,
                  ...styles.labelBold,
                  ...styles.textRight,
                  ...styles.whiteText,
                  ...styles.normalText,
                  ...configureLineHeight("13")
                }}
              >
                {grant_access}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalFooterBtnCancel}
              onPress={() => {
                this.setState({ modalVisible: false });
                this.props.goBack();
              }}
            >
              <Text
                style={{
                  ...styles.modalFooterLabel,
                  ...styles.labelBold,
                  ...styles.textLeft,
                  ...styles.normalText,
                  ...configureLineHeight("13")
                }}
              >
                {Cancel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  renderCustomActions = props => (
    <ChatMenuActions
      {...props}
      onSend={this.uploadDocument}
      platformEvent={eventObj => {
        this.props.dispatchEvent(eventObj);
      }}
    />
  );
  renderDay = props => <Day {...props} textStyle={{ color: "#000" }} />;

  componentWillUnmount() {
    this.props.videoResize(false);
    this.props.onDrop();
    this.onVideoCallEnded();
    this.props.emptyChatToken();
    this.props.clearTextChatSession();
    this.props.resetProfilePic();
    Orientation.lockToPortrait();
  }

  twilioMessage(message) {
    const { userProfile, myAccountId } = this.props;
    return {
      _id: Math.round(Math.random() * 1000000),
      uniqueId: message.sid,
      text: message.body,
      date: message.timestamp,
      createdAt: new Date(message.dateUpdated),
      user: {
        _id: message.author === myAccountId ? 1 : 2,
        name: message.author,
      },
      documentId: message.attributes.documentId,
      fileName: message.attributes.filename,
      fileType: message.attributes.type,
      msgAttrs: message.attributes,
    };
  }
  messagesRemoved = message => {
    const filteredItems = this.state.messages.filter(
      item => item.uniqueId !== message.sid
    );
    this.setState({ messages: filteredItems });
  };

  messagesLoaded = async messagePage => {
    const { myAccountId } = this.props;

    const msg = await Promise.all(
      messagePage.items.map(async message => {
        return {
          _id: Math.round(Math.random() * 1000000),
          uniqueId: message.sid,
          text: message.body,
          date: message.timestamp,
          createdAt: new Date(message.dateUpdated),
          user: {
            _id: message.author === myAccountId ? 1 : 2,
            name: message.author,
          },
          documentId: message.attributes.documentId,
          fileName: message.attributes.filename,
          fileType: message.attributes.type,
          msgAttrs: message.attributes,
        };
      })
    );
    this.setState({
      messages: msg,
    });
  };

  customViewPressHandler = currentMessage => {
    if (currentMessage.fileType === "payment-link") {
      // this.props.dispatchEvent(events.paymentLinkClick);
      this.props.registerEvent(eventNames.paymentLinkClick)
      this.props.gotoWithParams(screenNames.PAYMENT_VIEW, {
        paymentParams: currentMessage,
      });
    } else {
      this.props.getDocumentOrProfilePic(
        currentMessage.documentId,
        "documentContent"
      );
      this.setState({
        filetype: currentMessage.fileType,
        filenameToWrite: currentMessage.fileName,
      });
      if (currentMessage.fileType === "image") {
        this.setState({ showImageModal: true });
      } else {
        const cordinatesToshow = this.getSignatureCoords(currentMessage.fileName)
        if (cordinatesToshow) {
          this.setState({
            showSignatureView: true,
            policySignatureCoords: cordinatesToshow,
          });
        } else {
          this.setState({ showPdfModal: true });
        }
      }
    }
  };

  getSignatureCoords = fileName => {
    const cordinatesToshow = this.policySignatureCoords.find(element => {
      const isFileNameMatching = element.policyDocumentFileName === fileName;
      const fileNameRegexp = new RegExp(element.fileNameRegex);
      const matches = fileNameRegexp.exec(fileName);
      const filePatternMatch = !isNil(matches)
        ? matches[1] === element.fileType
          ? true
          : false
        : false;
      return filePatternMatch || isFileNameMatching;
    });
    return cordinatesToshow;
  };

  renderLongPress = async (context, message) => {
    const deleteMsg = this.metaConstants.delete_chat_message;
    const delete_Yes = this.metaConstants.exit_yes;

    const delete_No = this.metaConstants.exit_no;
    const duration = moment.duration(moment().diff(message.createdAt));
    const minutes = duration.asMinutes();
    if (message.user._id === 1 && minutes < this.props.messageDeleteMinTime) {
      const completeMessage = await this.channel.getMessages();
      const messageToDelete = completeMessage.items.find(
        element => element.sid === message.uniqueId
      );
      CustomAlert.show("", deleteMsg, {
        positiveText: delete_Yes,
        onPositivePress: () => {
          messageToDelete.remove();
        },
        negativeText: delete_No,
      });
    }
  };

  renderCustomView = props => (
    <Thumbnail
      {...props}
      onPress={this.customViewPressHandler}
      onLongPress={this.renderLongPress}
    />
  );

  messageAdded = async message => {
    this.setState(prevState => ({
      messages: [...prevState.messages, this.twilioMessage(message)],
      showLoader: false,
    }));
  };

  Close = () => {
    this.setState({
      showPdfModal: false,
      showImageModal: false,
    });
  };

  CloseSignature = () => {
    this.setState({
      showSignatureView: false,
    });
  };

  renderPdf = () => {
    return (
      <View>
        <Modal
          visible={this.state.showPdfModal}
          animationType="fade"
          transparent={true}
        >
          <View style={Styles.imgModalContainer}>
            <View style={Styles.closedownloadstyle}>
              {this.props.documentContent ? (
                <TouchableOpacity
                  style={{ paddingRight: 30 }}
                  onPress={() => {
                    const fileType = "pdf";
                    this.download(fileType);
                  }}
                >
                  <Image
                    style={{
                      width: 28,
                      height: 28,
                    }}
                    source={SALE_DOWNLOAD}
                  />
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                style={{ paddingRight: 30 }}
                onPress={() => {
                  this.setState({ showPdfModal: false });
                }}
              >
                <Image
                  style={{
                    width: 28,
                    height: 28,
                  }}
                  source={SALE_CLOSE}
                />
              </TouchableOpacity>
            </View>
            <Pdf
              source={{
                uri:
                  "data:application/pdf;base64," + this.props.documentContent,
              }}
              onLoadComplete={(numberOfPages, filePath) => { }}
              onPageChanged={(page, numberOfPages) => { }}
              onError={error => { }}
              style={{ flex: 1 }}
            />
          </View>
        </Modal>
      </View>
    );
  };

  download = fileType => {
    let device_path = RNFetchBlob.fs.dirs;
    if (Platform.OS === "ios") {
      device_path = RNFS.CachesDirectoryPath;
      this.writeFile(device_path, fileType);
    } else {
      try {
        const granted = PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        granted.then(res => {
          if (res === PermissionsAndroid.RESULTS.GRANTED) {
            this.writeFile(device_path.DownloadDir, fileType);
          }
        });
      } catch (err) {
        console.warn(err);
      }
    }

    this.props.registerEvent(eventNames.downloadDocument)
  };

  writeFile = (device_path, fileType) => {
    const Successfully_Downloaded = this.metaConstants.successfully_downloaded;
    const Download_Failed = this.metaConstants.download_failed;
    const OK = this.metaConstants.all_permission_ok;
    const path = `${device_path}/${this.state.filenameToWrite}.${fileType}`;
    RNFS.writeFile(path, this.props.documentContent, "base64")
      .then(success => {
        CustomAlert.show("", Successfully_Downloaded, {
          positiveText: OK,
        });
        if (Platform.OS === "ios") {
          Share.share({
            url: path,
          });
        }
      })
      .catch(error => {
        CustomAlert.show("", Download_Failed, {
          positiveText: OK,
        });
      });
  };

  renderImage = () => {
    return (
      <View>
        <Modal
          visible={this.state.showImageModal}
          animationType="fade"
          transparent={true}
        >
          <View style={Styles.imgModalContainer}>
            <View style={Styles.closedownloadstyle}>
              {this.props.documentContent ? (
                <TouchableOpacity
                  style={{ paddingRight: 30 }}
                  onPress={() => {
                    const fileType = "png";
                    this.download(fileType);
                  }}
                >
                  <Image
                    style={{
                      width: 28,
                      height: 28,
                    }}
                    source={SALE_DOWNLOAD}
                  />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                style={{ paddingRight: 30 }}
                onPress={() => {
                  this.setState({ showImageModal: false });
                }}
              >
                <Image
                  style={{
                    width: 28,
                    height: 28,
                  }}
                  source={SALE_CLOSE}
                />
              </TouchableOpacity>
            </View>
            <View style={{ margin: 10, flex: 1 }}>
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                }}
                source={{
                  uri: `${base64Type}${this.props.documentContent}`,
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  sendMessage = (res, fileName, fileType) => {
    this.renderDocumentUploadModal();
    if (!this.props.textinitiator && !this.getSignatureCoords(fileName)) {
      applyWaterMark(res, fileType).then(waterMarkedDocument => {
        const documentBase64 = waterMarkedDocument.replace(
          "data:image/jpeg;base64,",
          ""
        );
        this.props.uploadDocumentCall(documentBase64, fileName, fileType);
      });
    } else {
      this.props.uploadDocumentCall(res, fileName, fileType);
    }
  };

  sendDocuments = (docId, fileName, fileType) => {
    this.channel.sendMessage(
      {
        contentType: "application/json",
        media: "1",
      },
      { documentId: docId, filename: fileName, type: fileType }
    );
  };

  uploadDocument = (message, fileName, type, os) => {
    this.props.registerEvent(eventNames.uploadDocument)
    this.setState({ showSignatureView: false });
    documentFileName = fileName;
    documentFiletype = type;
    if (os === "ios") {
      this.sendMessage(message, fileName, type);
    } else {
      RNFS.readFile(message, "base64").then(res => {
        this.sendMessage(res, fileName, type);
      });
    }
    // this.props.dispatchEvent(events.documentSentBack);
    this.props.registerEvent(eventNames.documentSentBack)
  };
  handleSend = (message, type) => {
    if (this.client) {
      if (type === "pdf/image") {
        this.props.resetDocumentFlag();
        // this.setState({showLoader: true });
        this.sendDocuments(
          this.props.documentId,
          documentFileName,
          documentFiletype
        );
      } else {
        this.channel.sendMessage(message[0].text);
      }
    }
  };

  onVideoCallEnded = () => {
    const channelId = this.props.callDetails.channelId;

    this.props.registerEvent(eventNames.videoCallEnd, {
      channelId
    })
    this.props.videoCallEnded();
    this.props.endChatSession(channelId);
  };

  renderChatExitModal = () => {
    const { initiator, callStatus } = this.props;

    const Exit_Chat_Desc = this.metaConstants.exit_chat_desc;
    const Exit_Yes = this.metaConstants.exit_yes;
    const Exit_No = this.metaConstants.exit_no;

    if (!initiator && callStatus === "VIDEO_CALL_IN_PROGRESS") {
      return;
    }

    CustomAlert.show("", Exit_Chat_Desc, {
      positiveText: Exit_Yes,
      onPositivePress: () => {
        this.props.registerEvent(eventNames.userChatExit)
        NavigationService.goBack();
      },
      negativeText: Exit_No,
    });
  };

  renderDocumentUploadModal = () => {
    CustomAlert.show("", "Document is getting uploaded", {
      positiveText: "Cancel",
      onPositivePress: () => {
        this.props.setUploadCancelled();
      },
    });
  };

  getHeader = () => {
    const { callStatus, initiator } = this.props;
    const Chat = this.metaConstants.chat;

    if (!initiator && callStatus === "VIDEO_CALL_IN_PROGRESS") {
      return (
        <View style={Styles.chatMainHeader}>
          <Text style={{...Styles.chatHeaderText, ...configureLineHeight("14")}}>{Chat}</Text>
        </View>
      );
    }

    return (
      <View style={Styles.chatMainHeader}>
        <Text style={{...Styles.chatHeaderText, ...configureLineHeight("14")}}>{Chat}</Text>
        <TouchableOpacity onPress={this.renderChatExitModal}>
          <Image source={SALE_CLOSE} style={Styles.chatClose} />
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const {
      showLoader,
      showPdfModal,
      showImageModal,
      modalVisible,
      showSignatureView,
      policySignatureCoords,
      productDocumentModal,
    } = this.state;
    const {
      chatDetails: { initiatedWith, callerEmail },
      isVideoResized,
      userProfile,
      profilePictureId,
      profilePicture,
      documentContent,
      textinitiator,
    } = this.props;
    const agentorCustname = initiatedWith ? initiatedWith : callerEmail;
    if (showSignatureView && documentContent) {
      return (
        <DocSignature
          registerEvent = {this.props.registerEvent}
          documentContent={documentContent}
          onSend={this.uploadDocument}
          Close={this.CloseSignature}
          textinitiator={textinitiator}
          policySignatureCoords={policySignatureCoords}
          Name={this.props.userProfile.firstName}
          platformEvent={eventObj => {
            this.props.dispatchEvent(eventObj);
          }}
          fileName={this.state.filenameToWrite}
        />
      );
    }
    return (
      <View style={Styles.container}>
        {showLoader && <Loader />}
        {showPdfModal && this.renderPdf()}
        {showImageModal && this.renderImage()}
        {modalVisible && this.renderPermissionsModal()}
        {this.getHeader()}
        {this.state.areAllPermissionsAvailable &&
          this.props.callDetails.chatToken && (
            <TouchableOpacity
              style={
                isVideoResized ? Styles.smallVideoScreen : Styles.bigVideoScreen
              }
            >
              <Twilio
                navigation={this.props.navigation}
                callDetails={this.props.callDetails}
                goBack={this.props.goBack}
                onConnect={this.props.onConnect}
                onEnd={this.onVideoCallEnded}
                onDrop={this.props.onDrop}
              />
            </TouchableOpacity>
          )}
        <View style={Styles.container}>
          <View style={Styles.headerContainer}>
            <View style={Styles.agentNameViewStyle}>
              <ProfileImage userInfo={""} profilePicture={profilePicture} />
              <Text style={Styles.agentNameStyle}>{agentorCustname}</Text>
            </View>

            <View style={Styles.iconContainer}>
              {textinitiator && (
                <TouchableOpacity
                  onPress={() => this.props.goTo(screenNames.GEN_PAYMENT_LINK)}
                >
                  <Image source={SALE_PAYMENT_LINK} style={Styles.icon} />
                </TouchableOpacity>
              )}
              {!isVideoResized && (
                <TouchableOpacity
                  onPress={() => this.props.createRoom([initiatedWith])}
                >
                  <Image source={SALE_VIDEO_CHAT_WHITE} style={Styles.icon} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <ImageBackground source={CHAT_BACKGROUND} style={{ flex: 1 }}>
            <GiftedChat
              ref={c => (this._GiftedMessenger = c)}
              styles={{
                bubbleRight: Styles.giftedCustomStylesBubbleRight,
              }}
              user={{
                _id: 1,
                name: this.props.userProfile.firstName,
              }}
              messages={this.state.messages}
              onSend={this.handleSend}
              inverted={false}
              alignTop={true}
              showUserAvatar={false}
              renderAvatar={null}
              onLongPress={this.renderLongPress}
              renderCustomView={this.renderCustomView}
              renderActions={this.renderCustomActions}
              renderDay={this.renderDay}
              renderBubble={props => (
                <Bubble
                  {...props}
                  containerToNextStyle={{
                    left: { marginTop: 10 },
                    right: { marginTop: 10 },
                  }}
                  containerToPreviousStyle={{
                    left: { marginTop: 10 },
                    right: { marginTop: 10 },
                  }}
                  wrapperStyle={{
                    left: {
                      backgroundColor: "#fff",
                      color: "black",
                    },
                    right: {
                      backgroundColor: "#ec1c2e",
                    },
                  }}
                  textStyle={{
                    left: {
                      color: "#000",
                      fontFamily: "Avenir-Regular",
                    },
                    right: {
                      color: "#fff",
                      fontFamily: "Avenir-Regular",
                    },
                  }}
                  renderTime={() => (
                    <Time
                      {...props}
                      timeTextStyle={{
                        left: { color: "#000", textAlign: "right" },
                        right: { color: "#ffdaba" },
                      }}
                    ></Time>
                  )}
                />
              )}
            />
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {
    profile,
    auth: { token, isLoggedIn },
    videoSales: {
      callDetails,
      chatDetails,
      isCustomerNotificationArrived,
      myAccountId,
      isVideoResized,
      initiator,
      uploadingDocument,
      documentId,
      documentContent,
      profilePictureId,
      profilePicture,
      messageOnEntry,
      uploadCancelled,
      textinitiator,
    },
  } = state;

  return {
    userProfile: profile,
    token,
    chatDetails,
    callDetails,
    isCustomerNotificationArrived,
    isVideoResized,
    myAccountId,
    callStatus: state.videoSales.state,
    initiator,
    isLoggedIn,
    uploadingDocument,
    documentId,
    documentContent,
    profilePictureId,
    profilePicture,
    messageOnEntry,
    // policySignatureCoords: pathOr(
    //   policySignatur,
    //   ["meta", "countryCommonMeta", "policySignatureCoords"],
    //   state
    // ),
    messageDeleteMinTime: pathOr(
      1,
      ["meta", "countryCommonMeta", "messageDeleteMinTime"],
      state
    ),
    uploadCancelled,
    textinitiator,
  };
};

const mapDispatchToProps = {
  registerEvent,
  createRoom,
  createChatChannel,
  clearTextChatSession,
  goBack: () => ({
    context: screenNames.TWILIO_VIDEO_CALL,
    type: CoreActionTypes.GO_BACK_TO_PREVIOUS_SCREEN,
  }),
  onConnect: videoCallConnected,
  videoCallEnded,
  endChatSession,
  onDrop: videoCallDropped,
  getSelfDetails,
  videoResize,
  uploadDocumentCall,
  getDocumentOrProfilePic,
  resetDocumentFlag,
  emptyChatToken: () => ({
    type: actionNames.emptyCallDetails,
  }),
  resetProfilePic,
  goTo,
  gotoWithParams,
  updatePaymentDetails,
  setUploadCancelled,
  resetUploadCancelled,
  dispatchEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

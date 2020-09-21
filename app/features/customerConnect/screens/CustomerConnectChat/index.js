import React, { Component } from "react";
import {
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  PermissionsAndroid,
  Share,
} from "react-native";
import moment from "moment";
import { values, pickBy, any, pathOr, isNil } from "ramda";
import { connect } from "react-redux";
import { Client as TwilioChatClient } from "twilio-chat";
import Pdf from "react-native-pdf";
import RNFetchBlob from "rn-fetch-blob";
import {
  Avatar,
  Send,
  Bubble,
  GiftedChat,
  Time,
  Day,
  Composer,
} from "react-native-gifted-chat";
import RNFS from "react-native-fs";
import { OfflineImage } from "react-native-image-offline";
import OpenSettings from "react-native-open-settings";
import { dispatchEvent } from "../../../../actions";

import Styles from "./styles";
import styles from "../TwilioVideoCall/styles";
import Thumbnail from "../../components/Thumbnail";
import Twilio from "../TwilioVideoCall/twilio";
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
  fetchGroupMembers,
  closeMemberWindow,
  leaveGroup,
} from "../../redux/actions";
import screenNames from "../../constants/screenNames";
import actionNames from "../../redux/actionNames";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";

import {
  SALE_DOWNLOAD,
  SALE_CLOSE,
  CAMERA,
  CAMERA_ACTIVE,
  MICROPHONE,
  MICROPHONE_ACTIVE,
  CHAT_PAYMENT,
  CHAT_CAMERA,
  CHAT_ATTACHMENT,
  CHAT_SEND,
  CHAT_BACK_ARROW,
  CHAT_VIDEO_CALL,
  CHAT_ADD_PEOPLE,
  COMMUNITY_GROUPS,
} from "../../../../config/images";
import {
  CustomAlert,
  PruBackHeader,
  ShadowWrapper,
} from "../../../../components";

import ChatMenuActions from "../../components/ChatMenuActions";
import CustomAvatar from "../../components/CustomAvatar";
import {
  CoreActionTypes,
  CoreComponents,
  CoreServices,
} from "@pru-rt-internal/pulse-common";
const { Loader } = CoreComponents;
import {
  metaFinderCustomerConnect as metaFinderVideoSales,
  getDocSignatureScreenMeta,
} from "../../meta";
import DocSignature from "../../components/DocSignature";
import GroupMembers from "../../components/GroupMembers";
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

class CustomerConnectChat extends Component {
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
      showGroupMembers: false,
    };
    this.policySignatureCoords = getDocSignatureScreenMeta(
      "signature_coords_configuration"
    );
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
        console.log(e);
        // initiatechat failure event
        this.props.registerEvent(eventNames.initiateChatFailure);
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
        return this.channel.join().catch(() => {});
      })
      .then(() => {
        this.channel.getMessages().then(this.messagesLoaded);
        this.channel.on("messageAdded", this.messageAdded);
        this.channel.on("messageRemoved", this.messagesRemoved);
        this.setState({ showLoader: false });

        // initiatechat success event
        this.props.registerEvent(eventNames.initiateChatSuccess);
      })
      .catch(this.handleError);
  }

  getPaymentStatusMessage = messageOnEntry => {
    return `Payment of ${messageOnEntry.currency} ${messageOnEntry.paymentAmount} is successfully completed.\n\nTransaction id - ${messageOnEntry.orderRef}`;
  };

  postMessageOnEntry = () => {
    const {
      messageOnEntry,
      userProfile,
      myAccountId,
      updatePaymentDetails,
    } = this.props;

    if (messageOnEntry) {
      if (messageOnEntry.type === "payment-link") {
        this.channel.sendMessage(
          {
            contentType: "application/json",
            media: "1",
          },
          {
            ...messageOnEntry,
            name: userProfile.firstName,
            myAccountId: myAccountId,
          }
        );
      } else if (messageOnEntry.type === "payment-status") {
        const paymentStatusMessage = this.getPaymentStatusMessage(
          messageOnEntry
        );
        this.channel.sendMessage(
          {
            contentType: "application/json",
            media: "1",
          },
          {
            text: paymentStatusMessage,
            name: userProfile.firstName,
            myAccountId: myAccountId,
          }
        );
      }
      updatePaymentDetails({});
    }
  };

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.postMessageOnEntry();
        //this.props.fetchGroupMembers();
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

    // Orientation.unlockAllOrientations();
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
        this.props.registerEvent(eventNames.switchFromVideoToChat);
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
      const All_Permission_Desc = metaFinderVideoSales("all_permission");
      const All_Permission_Ok = metaFinderVideoSales("all_permission_ok");
      const All_Permission_Cancel = metaFinderVideoSales(
        "all_permission_cancel"
      );
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
    const granted = metaFinderVideoSales("granted");
    const not_granted = metaFinderVideoSales("not_granted");
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
    const Camera = metaFinderVideoSales("camera_permission");
    const Microphone = metaFinderVideoSales("microphone_permission");
    const Cancel = metaFinderVideoSales("all_permission_cancel");
    const grant_access = metaFinderVideoSales("grant_access");
    const Need_Access_To = metaFinderVideoSales("need_access_to");
    const And = metaFinderVideoSales("and");

    return (
      <Modal
        isVisible={this.state.modalVisible}
        onBackdropPress={() => this.setState({ modalVisible: true })}
      >
        <View style={styles.modalStyle}>
          <Text style={styles.modalLabel}>
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
                style={[
                  styles.modalFooterLabel,
                  styles.labelBold,
                  styles.textRight,
                  styles.whiteText,
                  styles.normalText,
                ]}
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
                style={[
                  styles.modalFooterLabel,
                  styles.labelBold,
                  styles.textLeft,
                  styles.normalText,
                ]}
              >
                {Cancel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  renderComposer = props => (
    <Composer
      {...props}
      textInputStyle={{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#E4E9F2",
        paddingRight: "14%",
        marginTop: 5,
        marginRight: props.text ? "0%" : "10%",
      }}
    />
  );

  navigatePayment = () => {
    const { goTo } = this.props;
    goTo(screenNames.GEN_PAYMENT_LINK);
  };

  renderCustomActions = (props, currentJourneyType) => {
    const { dispatchEvent } = props;

    return (
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          zIndex: 2,
          right: props.text ? "11%" : "2%",
          justifyContent: "center",
        }}
      >
        {currentJourneyType === "AGENT" ? (
          <ChatMenuActions
            {...props}
            onSend={this.uploadDocument}
            navigatePayment={this.navigatePayment}
            imgUrl={CHAT_PAYMENT}
            buttonIndex={2}
          />
        ) : null}
        <ChatMenuActions
          {...props}
          onSend={this.uploadDocument}
          platformEvent={eventObj => dispatchEvent(eventObj)}
          imgUrl={CHAT_ATTACHMENT}
          buttonIndex={0}
        />
        {!props.text ? (
          <ChatMenuActions
            {...props}
            onSend={this.uploadDocument}
            platformEvent={eventObj => dispatchEvent(eventObj)}
            imgUrl={CHAT_CAMERA}
            buttonIndex={1}
          />
        ) : null}
      </View>
    );
  };

  renderDay = props => <Day {...props} textStyle={{ color: "#000" }} />;

  componentWillUnmount() {
    this.props.videoResize(false);
    this.props.onDrop();
    this.onVideoCallEnded();
    this.props.emptyChatToken();
    this.props.clearTextChatSession();
    this.props.resetProfilePic();
    // Orientation.lockToPortrait();
  }

  twilioMessage(message) {
    const { userProfile, myAccountId } = this.props;
    const customMessage = pathOr("", ["attributes", "text"], message);
    return {
      _id: Math.round(Math.random() * 1000000),
      uniqueId: message.sid,
      text: customMessage ? customMessage : message.body,
      date: message.timestamp,
      createdAt: new Date(message.dateUpdated),
      user: {
        _id: message.attributes.myAccountId === myAccountId ? 1 : 2,
        name: message.attributes.name,
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
    const {
      myAccountId,
      userProfile,
      chatDetails: { caller, callerEmail },
      calllogList,
    } = this.props;

    const user = (calllogList || []).filter(user => user.email === callerEmail);
    const userImage = pathOr("", ["0", "profilePic"], user);

    const msg = await Promise.all(
      messagePage.items.map(async message => {
        const customMessage = pathOr("", ["attributes", "text"], message);
        const name =
          message.attributes.myAccountId === myAccountId
            ? `${userProfile.firstName} ${userProfile.surName}`
            : caller;

        const imgUrl =
          message.attributes.myAccountId === myAccountId
            ? userProfile.profilePicture
              ? `${userProfile.profilePicture}`
              : userProfile.profilePicture
            : userImage
            ? `${userImage}`
            : userImage;

        return {
          _id: Math.round(Math.random() * 1000000),
          uniqueId: message.sid,
          text: customMessage ? customMessage : message.body,
          date: message.timestamp,
          createdAt: new Date(message.dateUpdated),
          user: {
            _id: message.attributes.myAccountId === myAccountId ? 1 : 2,
            name,
            avatar: imgUrl,
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
      this.props.registerEvent(eventNames.paymentLinkClick);
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
        const cordinatesToshow = this.getSignatureCoords(
          currentMessage.fileName
        );
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
    const deleteMsg = metaFinderVideoSales("delete_msg");
    const delete_Yes = metaFinderVideoSales("exit_yes");

    const delete_No = metaFinderVideoSales("exit_no");
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
      containerStyle={{ marginTop: 0 }}
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
              onLoadComplete={(numberOfPages, filePath) => {}}
              onPageChanged={(page, numberOfPages) => {}}
              onError={error => {}}
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

    this.props.registerEvent(eventNames.downloadDocument);
  };

  writeFile = (device_path, fileType) => {
    const Successfully_Downloaded = metaFinderVideoSales(
      "successfully_downloaded"
    );
    const Download_Failed = metaFinderVideoSales("download_failed");
    const OK = metaFinderVideoSales("all_permission_ok");
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
      {
        documentId: docId,
        filename: fileName,
        type: fileType,
        name: this.props.userProfile.firstName,
        myAccountId: this.props.myAccountId,
      }
    );
  };

  uploadDocument = (message, fileName, type, os) => {
    this.props.registerEvent(eventNames.uploadDocument);
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
    this.props.registerEvent(eventNames.documentSentBack);
  };
  handleSend = (message, type) => {
    const {
      documentId,
      userProfile,
      myAccountId,
      resetDocumentFlag,
    } = this.props;

    if (this.client) {
      if (type === "pdf/image") {
        resetDocumentFlag();
        // this.setState({showLoader: true });
        this.sendDocuments(documentId, documentFileName, documentFiletype);
      } else {
        this.channel.sendMessage(
          {
            contentType: "application/json",
            media: "1",
          },
          { text: message[0].text, name: userProfile.firstName, myAccountId }
        );
      }
    }
  };

  onVideoCallEnded = () => {
    const channelId = this.props.callDetails.channelId;

    this.props.registerEvent(eventNames.videoCallEnd, {
      channelId,
    });
    this.props.videoCallEnded();
    this.props.endChatSession(channelId);
  };

  renderChatExitModal = () => {
    const { initiator, callStatus } = this.props;

    const Exit_Chat_Desc = metaFinderVideoSales("exit_chat");
    const Exit_Yes = metaFinderVideoSales("exit_yes");
    const Exit_No = metaFinderVideoSales("exit_no");

    if (!initiator && callStatus === "VIDEO_CALL_IN_PROGRESS") {
      return;
    }

    CustomAlert.show("", Exit_Chat_Desc, {
      positiveText: Exit_Yes,
      onPositivePress: () => {
        this.props.registerEvent(eventNames.userChatExit);
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

  getHeaderRenderMethod = () => {
    const {
      createRoom,
      navigation,
      textinitiator,
      isVideoResized,
      groupPeople,
      currentJourneyType,
      chatDetails,
    } = this.props;

    if (currentJourneyType !== "AGENT") {
      return null;
    }

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.fetchGroupMembers(chatDetails.channelId);
          }}
        >
          <Image
            style={{ height: 14.9, width: 22.3 }}
            source={COMMUNITY_GROUPS}
          />
        </TouchableOpacity>
        {textinitiator && !isVideoResized && (
          <TouchableOpacity onPress={() => createRoom(groupPeople)}>
            <Image
              style={{ height: 14.9, width: 22.3 }}
              source={CHAT_VIDEO_CALL}
            />
          </TouchableOpacity>
        )}
        {!isVideoResized && (
          <TouchableOpacity
            style={{ paddingLeft: 15 }}
            onPress={() =>
              navigation.navigate("AddToVideoChat", {
                groupChat: true,
                mode: "TEXT",
                feature: "VideoSale",
              })
            }
          >
            <Image
              style={{ height: 18.6, width: 23.3 }}
              source={CHAT_ADD_PEOPLE}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  getHeader = () => {
    const { callStatus, initiator, contactDetails } = this.props;

    const name = pathOr("", ["fullName"], contactDetails);

    if (!initiator && callStatus === "VIDEO_CALL_IN_PROGRESS") {
      return (
        <View style={Styles.chatMainHeader}>
          <Text style={Styles.chatHeaderText}>{name}</Text>
        </View>
      );
    }

    return (
      <ShadowWrapper>
        <PruBackHeader
          title={name}
          backIcon={CHAT_BACK_ARROW}
          onBackPress={this.renderChatExitModal}
          rightImageRenderMethod={this.getHeaderRenderMethod}
          rightImage={true}
        />
      </ShadowWrapper>
    );
  };

  renderAvatar = props => {
    const { user } = props.currentMessage;
    const { name, avatar, _id } = user;

    if (name) {
      return <CustomAvatar name={name} thumbnail={avatar} invert={_id === 1} />;
    }

    return null;
  };

  leaveGroup = groupId => {
    this.props.leaveGroup(groupId, this.props.userProfile.email);
  };

  close = () => {
    this.props.closeMemberWindow();
  };
  renderSend = props => (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 22,
        height: 22,
        zIndex: 3,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: "3%",
      }}
    >
      <Image style={{ width: 23, height: 20 }} source={CHAT_SEND} />
    </Send>
  );
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
      chatDetails: { initiatedWith, callerEmail, channelId },
      isVideoResized,
      userProfile,
      profilePictureId,
      profilePicture,
      documentContent,
      textinitiator,
      currentJourneyType,
      showGroupMembers,
    } = this.props;
    if (showGroupMembers) {
      return (
        <GroupMembers
          groupMembers={this.props.groupMembers}
          leaveGroup={this.leaveGroup}
          close={this.close}
          channelId={channelId}
        ></GroupMembers>
      );
    }
    if (showSignatureView && documentContent) {
      return (
        <DocSignature
          registerEvent={this.props.registerEvent}
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
          <GiftedChat
            renderAvatarOnTop={true}
            ref={c => (this._GiftedMessenger = c)}
            styles={{
              bubbleRight: Styles.giftedCustomStylesBubbleRight,
            }}
            user={{
              _id: 1,
              name: this.props.userProfile.firstName,
              avatar:
                "data:image/jpeg;base64," +
                this.props.userProfile.profilePicture,
            }}
            messages={this.state.messages}
            renderUsernameOnMessage={true}
            onSend={this.handleSend}
            inverted={false}
            alignTop={true}
            showUserAvatar={true}
            showAvatarForEveryMessage={true}
            onLongPress={this.renderLongPress}
            renderCustomView={this.renderCustomView}
            renderComposer={this.renderComposer}
            renderSend={this.renderSend}
            renderActions={props =>
              this.renderCustomActions(props, currentJourneyType)
            }
            renderDay={this.renderDay}
            renderAvatar={this.renderAvatar}
            renderBubble={props => (
              <Bubble
                {...props}
                containerStyle={{
                  left: { marginTop: 10 },
                  right: { marginTop: 10 },
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: "#fff",
                    color: "black",
                    borderRadius: 20,
                    borderBottomLeftRadius: 0,
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 3 },
                    shadowRadius: 6,
                    shadowOpacity: 0.26,
                    elevation: 8,
                  },
                  right: {
                    backgroundColor: "#ec1c2e",
                    borderRadius: 20,
                    borderBottomRightRadius: 0,
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
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {
    profile,
    auth: { token, isLoggedIn },
    customerConnect: {
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
      contacts,
      callerList,
      groupPeople,
      calllogList,
      currentJourneyType,
      showGroupMembers,
      groupMembers,
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
    callStatus: state.customerConnect.state,
    calllogList,
    initiator,
    isLoggedIn,
    uploadingDocument,
    documentId,
    documentContent,
    profilePictureId,
    profilePicture,
    messageOnEntry,
    callerList,
    groupPeople,
    messageDeleteMinTime: pathOr(
      1,
      ["meta", "countryCommonMeta", "messageDeleteMinTime"],
      state
    ),
    uploadCancelled,
    textinitiator,
    contactDetails: contacts[0],
    currentJourneyType,
    showGroupMembers,
    groupMembers,
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
  fetchGroupMembers,
  closeMemberWindow,
  leaveGroup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerConnectChat);

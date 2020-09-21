/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { isEmpty, pathOr, isNil, path, or } from "ramda";
import { connect } from "react-redux";
import Styles from "./styles";
import { dispatchEvent } from "../../../../actions";
import { PruChatComponent } from "../../../../components/PruChatComponent";
import missPrudenceAvatar from "../../../../images/ChatBot/missPrudenceAvatar.png";
import missPrudence from "../../../../images/ChatBot/missPrudence.png";
import chatBotBackground from "../../../../images/ChatBot/chatBotBackground.png";
import plusIcon from "../../../../images/ChatBot/plus.png";
import BubbleComponent from "../../../../components/Bubble";
import attachIcon from "../../../../images/ChatBot/attach.png";
import { AVATAR, CONTACT_BACK } from "../../../../config/images";
import { CustomAlert } from "../../../../components";
import { CoreActionTypes, CoreServices } from "@pru-rt-internal/pulse-common";
import { chatbotActions } from "../../configs/chatbot-actions";
import PropTypes from "prop-types";
import { metaFinderCB } from "../../meta-utils";
import AddressSelector from "../../../pru-wizard/components/AddressSelector";
import PruTextInput from "../../../../components/PruTextInput";
import metaKeys from "../../screenMetaKeys";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import CaptureIdOcr from "../../components/capture-id-ocr";
// import Tts from "react-native-tts";

const { NavigationService } = CoreServices;

const aptNoLabel = () => {
  return (
    <View>
      <Text style={Styles.aptNoLabel}>
        {safeMetaLabelFinder(metaKeys.screenName, metaKeys.address.aptSuite)}
      </Text>
    </View>
  );
};

class Chat extends PureComponent {
  constructor(props) {
    super(props);
    this.chatBotCount = 0;
    this.state = {
      messages: [],
      disableTextInput: false,
    };
    this.userInfo = {
      _id: "userId",
      avatar: AVATAR,
    };
  }

  setInitialState = () => {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "",
          value: "",
          createdAt: new Date(),
          user: {
            _id: "chatBot",
            startMessage: true,
          },
          image: missPrudence,
          spoken: false,
        },
      ],
      disableTextInput: false,
    });
    const payload = {
      text: "Hi",
    };
    this.props.startChat(payload);
  };

  componentDidMount() {
    this.setInitialState();
  }

  componentDidUpdate(prevProps) {
    const { enableVoicebot } = this.props;
    // if (
    //   enableVoicebot &&
    //   prevProps.currentResponse !== this.props.currentResponse
    // ) {
    //   this.props.currentResponse.forEach(item => {
    //     item.text && Tts.speak(item.text);
    //   });
    // }

    if (this.props.chatBotArray !== prevProps.chatBotArray) {
      const { messages } = this.state;
      const { chatBotArray } = this.props;
      const newMsgs = [];
      if (this.chatBotCount < chatBotArray.length) {
        const index = this.chatBotCount;
        for (let i = index; i < chatBotArray.length; i++) {
          const body = chatBotArray[i];
          !isEmpty(body) && newMsgs.push(this.getChatBotResponse(body));
          this.chatBotCount++;
        }
      }
      this.setState({ messages: [...messages, ...newMsgs] });
    }
  }

  componentWillUnmount() {
    this.props.resetChatState();
  }

  handleSend = inputMsg => {
    const { chatState, workflowId } = this.props;
    Keyboard.dismiss();

    const { messages } = this.state;
    let payload = {
      text: inputMsg[inputMsg.length - 1].payload
        ? inputMsg[inputMsg.length - 1].payload
        : inputMsg[inputMsg.length - 1].text,
    };
    if (chatState === "start") {
      this.props.startChat(payload);
    } else {
      payload = { ...payload, workflowId };
      this.props.sendChat(payload);
    }
    this.setState({ messages: [...messages, ...inputMsg] });
  };

  getChatBotResponse = message => {
    if (isEmpty(message) || isNil(message)) {
      return null;
    }

    if (message.options) {
      this.setState({ disableTextInput: true });
    }

    return {
      _id: this.chatBotCount,
      text: message.text,
      firstMessage: message.firstMessage ? message.firstMessage : false,
      quickReplies: {
        values: message.options ? message.options : [],
        enable: true,
      },
      createdAt: new Date(),
      user: {
        _id: "chatBot",
        avatar: missPrudenceAvatar,
      },
      type:
        path(["data", "contentType"], message) ||
        path(["data", "type"], message),
      documentId: pathOr("", ["data", "id"], message),
      spoken: false,
    };
  };

  renderChatExitModal = () => {
    const Exit_Chatbot_Desc = metaFinderCB("exitChatDesc");
    const Exit_Chatbot = metaFinderCB("exitChat");
    const Exit_Yes = metaFinderCB("exit_yes");
    const Exit_No = metaFinderCB("exit_no");

    CustomAlert.show(Exit_Chatbot, Exit_Chatbot_Desc, {
      positiveText: Exit_Yes,
      onPositivePress: () => {
        NavigationService.goBack();
      },
      negativeText: Exit_No,
    });
  };

  clearCurrentChat = () => {
    this.props.resetChatState();
    this.setInitialState();
    this.chatBotCount = 0;
  };

  addChat = () => {
    const Exit_Chatbot_Desc = metaFinderCB("exitChatDesc");
    const Exit_Chatbot = metaFinderCB("createNewRequest");
    const Exit_Yes = metaFinderCB("exit_yes");
    const Exit_No = metaFinderCB("exit_no");

    CustomAlert.show(Exit_Chatbot, Exit_Chatbot_Desc, {
      positiveText: Exit_Yes,
      onPositivePress: () => {
        this.clearCurrentChat();
      },
      negativeText: Exit_No,
    });
  };

  getHeader = () => {
    return (
      <View style={Styles.chatMainHeader}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableOpacity onPress={this.renderChatExitModal}>
            <Image source={CONTACT_BACK} style={Styles.chatClose} />
          </TouchableOpacity>
          <Text style={Styles.chatHeaderText}>
            {metaFinderCB("chatSupport")}
          </Text>
        </View>
        <TouchableOpacity onPress={this.addChat}>
          <Image source={plusIcon} style={Styles.plusIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  isChatBot = currentMessage => {
    return pathOr("", ["user", "_id"], currentMessage) === "chatBot";
  };

  isChatBotStart = currentMessage => {
    return pathOr("", ["user", "startMessage"], currentMessage) === true;
  };

  setMessage = messages => {
    this.setState({
      messages: messages,
      disableTextInput: false,
    });
  };

  fetchAndViewPDF = id => {
    const payload = {
      id,
    };

    this.props.fetchPDFDocument(payload);
  };

  renderPdf = currentMessage => {
    return (
      <TouchableOpacity
        style={Styles.viewPDFStyle}
        onPress={() => this.fetchAndViewPDF(currentMessage.documentId)}
      >
        <Icon raised name="file" color={"white"} size={16} />
        <Text style={Styles.pdfTextStyle}>{metaFinderCB("viewDocument")}</Text>
      </TouchableOpacity>
    );
  };

  updateAddress = address => {
    this.handleSend([
      {
        createdAt: new Date(),
        text: address,
        user: this.userInfo,
        _id: Math.round(Math.random() * 1000000),
      },
    ]);
  };

  renderAddressSelector = mapAddressVal => {
    const fullAddress = pathOr("", ["text", "houseNo"], mapAddressVal)
      .concat(", ")
      .concat(pathOr("", ["text", "address"], mapAddressVal));

    return (
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "column",
          justifyContent: "space-evenly",
          borderRadius: 10,
          width: "80%",
          padding: 10,
        }}
      >
        <View>
          <AddressSelector
            onChange={newVal => {
              this.updateMessage(mapAddressVal._id, {
                ...mapAddressVal.text,
                address: newVal,
              });
            }}
            fieldValue={path(["text", "address"], mapAddressVal)}
            //exception={!isNil(mapAddressErr) && !isEmpty(mapAddressErr)}
            //errorMessage={mapAddressErr}
            title={safeMetaLabelFinder(
              metaKeys.screenName,
              metaKeys.address.address
            )}
          />
          <PruTextInput
            leftComponent={aptNoLabel(this.props)}
            leftStyle={{ flex: 0.3, marginTop: 8 }}
            txtInputStyle={{
              borderWidth: 1,
              borderColor: "#d9dcde",
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderTopWidth: 0,
            }}
            underlineColorAndroid="transparent"
            placeholder={safeMetaLabelFinder(
              metaKeys.screenName,
              metaKeys.address.enterAptSuiteNo
            )}
            title={" "}
            //messageType={!isNil(houseNoErr) && !isEmpty(houseNoErr) && "error"}
            //message={houseNoErr}
            onChange={newVal =>
              this.updateMessage(mapAddressVal._id, {
                ...mapAddressVal.text,
                houseNo: newVal,
              })
            }
            value={path(["text", "houseNo"], mapAddressVal)}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              backgroundColor: "red",
              paddingVertical: 3,
              paddingHorizontal: 5,
              borderRadius: 5,
            }}
            onPress={() => this.updateAddress(fullAddress)}
          >
            <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
              {metaFinderCB("confirmAddress")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  fetchOcrData = image => {
    const { country } = this.props;

    const payload = {
      countryCode: country,
      // realm: or(
      //   isNil(ocrRealmFromProductDef) ? undefined : ocrRealmFromProductDef,
      //   ocrRealmFromPolicy
      // ),
      image,
      //selectedProductCode,
      //__actions: { resolve, reject },
    };

    return this.props.fetchOcrData(payload);
  };

  renderOcrCapture = () => {
    const pickerLabels = {
      camera: "Camera",
      gallery: "Gallery",
      instructions: "Select photo from",
      imageSizeWarning: "Please select an image with a size less than {0} MB.",
    };

    const settings = {
      ocrImageSettings: {
        width: 1024,
        height: 768,
        compressImageMaxWidth: 1024,
        compressImageMaxHeight: 768,
      },
      compressImageQualityAndroid: 1,
      compressImageQualityIos: 0.8,
      hidePickerIcon: false,
      maxImageSizeAllowed: 5242880,
    };

    return (
      <View
        style={{
          //alignItems: "center",
          backgroundColor: "white",
          flexDirection: "column",
          //height: "60%",
          justifyContent: "space-evenly",
          borderRadius: 10,
          width: "80%",
          padding: 10,
        }}
      >
        <CaptureIdOcr
          label={"ID No."}
          //onChange={valueChanged}
          readOnly={false}
          pickerLabels={pickerLabels}
          //value={value}
          settings={settings}
          testID={"id"}
          placeholder={"Enter Beneficiary ID."}
          labels={{}}
          fetchOcrData={this.fetchOcrData}
        ></CaptureIdOcr>
        {/* {Platform.OS === "android" && <View style={styles.rDivider} />}
        {renderLineBelow()}
        {renderErrorMessage()} */}
      </View>
    );
  };

  renderCustomView = ({ currentMessage }) => {
    const isChatBot = this.isChatBot(currentMessage);
    const isChatBotStartMessage = this.isChatBotStart(currentMessage);

    if (
      currentMessage &&
      pathOr("", ["type"], currentMessage).endsWith("pdf")
    ) {
      return this.renderPdf(currentMessage);
    } else if (
      currentMessage &&
      pathOr("", ["type"], currentMessage).endsWith("address")
    ) {
      return this.renderAddressSelector(currentMessage);
    }

    return (
      <BubbleComponent
        isChatBot={isChatBot}
        isChatBotStartMessage={isChatBotStartMessage}
        currentMessage={currentMessage}
        handleSend={this.handleSend}
        setMessage={this.setMessage}
        messages={this.state.messages}
        userInfo={this.userInfo}
      />
    );
  };

  updateMessage = (id, value) => {
    this.setState(({ messages }) => ({
      messages: messages.map(item => {
        return item._id === id
          ? {
              ...item,
              text: value,
            }
          : item;
      }),
    }));
  };

  renderCustomActions = () => {
    return (
      <TouchableOpacity
        style={{
          alignSelf: "flex-start",
          alignItems: "center",
          justifyContent: "center",
          height: 34,
          width: 34,
          backgroundColor: "#ffffff",
          borderRightColor: "black",
          borderRightWidth: 1,
        }}
      >
        <Image style={{ width: 20, height: 19.7 }} source={attachIcon} />
      </TouchableOpacity>
    );
  };

  render() {
    const { messages } = this.state;
    const {
      chatDetails: { initiatedWith, callerEmail },
      profilePicture,
    } = this.props;

    return (
      <View style={Styles.container}>
        {this.getHeader()}
        <View style={Styles.container}>
          <ImageBackground source={chatBotBackground} style={Styles.image}>
            <PruChatComponent
              ref={c => (this._GiftedMessenger = c)}
              bubbleStyles={{
                bubbleRight: Styles.giftedCustomStylesBubbleRight,
              }}
              user={this.userInfo}
              messages={messages}
              handleSend={this.handleSend}
              inverted={false}
              alignTop={false}
              showUserAvatar={true}
              showAvatarForEveryMessage={true}
              //renderCustomActions={null}
              renderBubble={this.renderCustomView}
              renderToolbar={this.state.disableTextInput}
              dayViewStyle={Styles.dayView}
              profilePicture={profilePicture}
              //renderCustomActions={this.renderCustomActions}
            />
          </ImageBackground>
        </View>
      </View>
    );
  }
}

Chat.propTypes = {
  chatState: PropTypes.string,
  workflowId: PropTypes.string,
  startChat: PropTypes.func,
  sendChat: PropTypes.func,
  chatDetails: PropTypes.object,
  chatBotArray: PropTypes.array,
  resetChatState: PropTypes.func,
  fetchPDFDocument: PropTypes.func,
  fetchOcrData: PropTypes.func,
  country: PropTypes.string,
  currentResponse: PropTypes.array,
  enableVoicebot: PropTypes.bool,
};

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
    profilePicture: pathOr("", ["profile", "profilePicture"], state),
    messageOnEntry,
    messageDeleteMinTime: pathOr(
      1,
      ["meta", "countryCommonMeta", "messageDeleteMinTime"],
      state
    ),
    uploadCancelled,
    textinitiator,
    chatState: pathOr("", ["chatBot", "chatState"], state),
    workflowId: pathOr("", ["chatBot", "workflowId"], state),
    chatBotArray: pathOr([], ["chatBot", "chatBotArray"], state),
    currentResponse: pathOr([], ["chatBot", "currentResponse"], state),
    country: path(["auth", "countryInfo", "simCountry"], state),
    enableVoicebot: pathOr(
      false,
      ["meta", "countryCommonMeta", "enableVoicebot"],
      state
    ),
  };
};

const mapDispatchToProps = {
  goBack: () => ({
    context: "",
    type: CoreActionTypes.GO_BACK_TO_PREVIOUS_SCREEN,
  }),
  dispatchEvent,
  startChat: payload => ({
    context: "ChatBot",
    type: chatbotActions.botStartChat,
    payload,
  }),
  sendChat: payload => ({
    context: "ChatBot",
    type: chatbotActions.botSendChat,
    payload,
  }),
  resetChatState: () => ({
    context: "ChatBot",
    type: chatbotActions.resetChatState,
  }),
  fetchPDFDocument: payload => ({
    context: "ChatBot",
    type: chatbotActions.getResource,
    payload,
  }),
  fetchOcrData: payload => ({
    context: "ChatBot",
    type: chatbotActions.getOcrData,
    payload,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

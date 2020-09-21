import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import styles from "./styles";
import { path, forEach, isNil } from "ramda";
import { BACK, HALODOC_INLINE_LOGO, CLOSE } from "../../../../config/images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HaloChatBotMessage from "../../../HaloDoc/components/HaloChatBotMessage";
import { HalodocChatUserMessage } from "../../../HaloDoc/components/HalodocChatUserMessage";
import Pdf from "react-native-pdf";
import TimeoutLinstener from "../../../../utils/timeout/index";
import {
  resetChatHistory,
  getConsultationMessages
} from '../../action'
import MetaConstants from "../../meta";

const { height, width } = Dimensions.get("window");

class ConsultationHistoryChat extends Component {
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
      page: 1,
      history: [],
      isPdf: false
    };
    this.keyboardScroll = null;
    this.MetaConstants = { ...MetaConstants.consultationHistoryMeta() };
  }

  renderQuestionnaireLog = (dataObject, type, showMoreMessages, docItem) => {
    const haveChatData =
      dataObject && dataObject.length > 0 && Array.isArray(dataObject);
    let data = [];
    if (!haveChatData) {
      data = [
        { isLoadMore: true, message: { text: this.MetaConstants.loadMore } },
        ...dataObject
      ];
    } else {
      data = [
        { isLoadMore: true, message: { text: this.MetaConstants.loadMore } },
        ...dataObject
      ];
    }

    return (
      <View style={{ paddingVertical: 10 }}>
        <FlatList
          ref={ref => (this.flatList = ref)}
          style={[
            styles.flexStyle,
            { minHeight: type ? height - 152 : height - 88 }
          ]}
          data={data}
          renderItem={data => this.renderItem(data, showMoreMessages, docItem)}
          extraData={this.state}
          showsVerticalScrollIndicator={false}
          onLayout={() => this.flatList.scrollToEnd({ animated: true })}
          onContentSizeChange={() => {
            setTimeout(() => {
              this.flatList && this.flatList.scrollToEnd({ animated: true });
            });
          }}
        />
      </View>
    );
  };

  renderItem = (data, showMoreMessages, docItem) => {
    const profilePicture = this.props.profilePicture
      ? this.props.profilePicture
      : "";

    const { item, index } = data;
    const textValue = path(["message", "text"], item);
    if (item.isLoadMore) {
      if (this.props.consultationHistoryChatHasMore) {
        return (
          <TouchableOpacity
            onPress={() => showMoreMessages(docItem)}
            style={styles.loadBtn}
          >
            <Text style={styles.loadText}>{this.MetaConstants.loadMore}</Text>
          </TouchableOpacity>
        );
      } else {
        return null;
      }
    } else if (!item.isQuestion) {
      return (
        <HalodocChatUserMessage
          style={{ fontSize: 14, fontFamily: "Avenir-Medium" }}
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
            profilePicture={item.profilePicture}
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
    // }
  };

  componentDidMount() {
    const docItem = this.props.navigation.getParam("item", null);
    const chatId = path(
      ["navigation", "state", "params", "episodeId"],
      this.props
    );
    const page = this.state.page;
    const consultationID = docItem.id;
    this.props.getConsultationMessages(consultationID, page);
  }

  componentDidUpdate() {
    if (this.keyboardScroll) {
      this.keyboardScroll.scrollToEnd();
    }
  }

  showModal() {
    this.setState({ modalVisible: true });
  }

  showMoreMessages = docItem => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
    const page = this.state.page;
    const consultationID = docItem.id;
    this.consultationMessages(consultationID, page + 1);
  };

  consultationMessages = (consultationID, page) => {
    this.props.getConsultationMessages(consultationID, page);
  };

  componentWillUnmount() {
    this.props.resetChatHistory();
  }

  componentWillReceiveProps(nextProps) { }

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
            onLoadComplete={(numberOfPages, filePath) => {
            }}
          />
        ) : null}
      </TouchableOpacity>
    );
  };

  pdfViewComponent() {
    return (
      <View style={styles.modalMainView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => this.setState({ imgModalVisible: false })}
          >
            <Image
              style={styles.closeIcon}
              source={CLOSE}
            />
          </TouchableOpacity>
        </View>
        <View
          style={styles.pdfView}
        >
          {this.state.isPdf ? (
            <Pdf
              source={{ uri: this.state.source }}
              style={styles.pdf}
              onLoadComplete={(numberOfPages, filePath) => {
              }}
            />
          ) : (
              <Image
                style={styles.onlineImage}
                source={{ uri: `${this.state.source}` }}
              />
            )}
        </View>
      </View>
    )
  }
  backViewComponent() {
    const chathistory = path(
      ["navigation", "state", "params", "chathistory"],
      this.props
    );
    return (
      <View style={styles.viewStyle}>
        <TouchableOpacity
          onPress={() => {
            if (chathistory) {
              this.props.navigation.goBack();
            } else {
              this.props.navigation.popToTop();
            }
          }}
          style={styles.touchableStyle}
        >
          <Image style={styles.imgBack} source={BACK} />
        </TouchableOpacity>
        <View
          accessibilityLabel="home"
          accesible
          style={styles.touchableView}
        >
          <Image
            style={styles.imgHaloDoc}
            resizeMode="contain"
            source={HALODOC_INLINE_LOGO}
          />
        </View>
      </View>
    )
  }

  chatHistoryView() {
    const docItem = this.props.navigation.getParam("item", null);
    const chathistory = path(
      ["navigation", "state", "params", "chathistory"],
      this.props
    );
    const messages = this.props.consultationHistoryChat;
    let data = [];
    TimeoutLinstener.reStart();
    if (messages) {

      const mags = JSON.parse(JSON.stringify(messages));
      const list = !isNil(mags) && Array.isArray(mags) ? mags.reverse() : [];      
      let userName = "";
      forEach((item) => {
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
      }, list);
    }
    return (
      <View style={{ height: height - 52 }}>
        <KeyboardAwareScrollView
          keyboardOpeningTime={0}
          enableOnAndroid
          contentContainerStyle={styles.wrapper}
          innerRef={ref => {
            this.keyboardScroll = ref;
          }}
        >
          {!chathistory ? (
            <View>
              <View style={styles.chatHistoryView}>
                {this.renderQuestionnaireLog(
                  data,
                  this.props.consultationHistoryChat,
                  this.showMoreMessages,
                  docItem
                )}
              </View>
            </View>
          ) : (
              <View style={styles.chatHistory}>
                {this.renderQuestionnaireLog(
                  data,
                  this.props.consultationHistoryChat,
                  this.showMoreMessages,
                  docItem
                )}
              </View>
            )}
        </KeyboardAwareScrollView>
      </View>
    )
  }

  render() {
    const messages = this.props.consultationHistoryChat;
    let data = [];
    TimeoutLinstener.reStart();
    if (messages) {
      const mags = JSON.parse(JSON.stringify(messages));
      const list = !isNil(mags) && Array.isArray(mags) ? mags.reverse() : [];
      let userName = "";
      forEach((item) => {
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
      }, list);
    }
    return (
      <View style={styles.mainContainer}>
        {this.backViewComponent()}
        {!data || (data && data.length === 0) ?
          <View style={styles.noConversationText}>
            <Text style={styles.emptyConversationTextStyle}>
              {this.MetaConstants.noConversationText}
            </Text>
          </View>
          : null}
        {data && data.length > 0 ?
          this.chatHistoryView() : null}
        {this.state.imgModalVisible && data && data.length > 0 ? this.pdfViewComponent() : null}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    consultationHistoryChat: state.haloDocServices.consultationHistoryChat,
    consultationHistoryChatHasMore: state.haloDocServices.consultationHistoryChatHasMore
  };
};
export default connect(mapStateToProps, {
  resetChatHistory,
  getConsultationMessages
})(ConsultationHistoryChat);

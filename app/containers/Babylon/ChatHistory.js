/* eslint-disable */
import React, { Component } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { OfflineImage } from "react-native-image-offline";
import moment from "moment";
import Swipeout from "react-native-swipeout";
import Modal from "react-native-modal";
import {
  CoreActionTypes,
  CoreComponents,
  CoreActions,
  CoreConfig,
  metaHelpers,
  CoreConstants,
  EventUtils,
} from "@pru-rt-internal/pulse-common";
import {configureLineHeight} from "../../utils/lineHeightsUtils";

const { clearChatData } = CoreActions;

import { ChatHistoryStyle as styles } from "./styles";
import PropTypes from "prop-types";
import { CROSS_ICON, PHONEBOOK_ICON,BABYLON_LOGO_BLUE } from "../../config/images";
import { Header } from "../../components/ChatComponent/Header";
import { BACK, TRASH } from "../../config/images"
import { CustomAlert } from "../../components"

const { Label } = CoreComponents;
const { pageKeys } = CoreConfig;
const { SCREEN_KEY_CHAT_HISTORY,
  COMMON_KEY_MONDAY,
  COMMON_KEY_TUESDAY,
  COMMON_KEY_WEDNESDAY,
  COMMON_KEY_THURSDAY,
  COMMON_KEY_FRIDAY,
  COMMON_KEY_SATURDAY,
  COMMON_KEY_SUNDAY,
  COMMON_KEY_JANUARY,
  COMMON_KEY_FEBRUARY,
  COMMON_KEY_MARCH,
  COMMON_KEY_APRIL,
  COMMON_KEY_MAY,
  COMMON_KEY_JUNE,
  COMMON_KEY_JULY,
  COMMON_KEY_AUGUST,
  COMMON_KEY_SEPTEMBER,
  COMMON_KEY_OCTOBER,
  COMMON_KEY_NOVEMBER,
  COMMON_KEY_DECEMBER } = CoreConstants;

const KEY_CHAT_HISTORY = "chathistory";
const KEY_ALERT = "alert";
const KEY_NO = "no";
const KEY_YES = "yes";
const KEY_REMOVE = <Image source={TRASH} style={{
  width: 35,
  height: 35,
}}></Image>;
const KEY_DELETE_CONFIRM_PREFIX = "deleteConfirmationPrefix";
const KEY_DELETE_CONFIRM_TEXT = "deleteConfirmationText";
const KEY_DELETE_CONFIRM_SUFFIX = "deleteConfirmationSuffix";

const renderChatHistoryItemLeft = data => {
  const day = moment(data.item.timeStamp).format("ddd");
  const date = moment(data.item.timeStamp).format("DD MMM YYYY");

  return (
    <React.Fragment>
      <Label value={day} style={{...styles.chatHistoryDateLabel, ...configureLineHeight("12")}} />
      <Label value={date} style={{...styles.chatHistoryDateLabel, ...configureLineHeight("12")}} />
    </React.Fragment>
  );
};

const renderChatHistoryItemContent = data => {
  const time = moment(data.item.timeStamp).format("hh:mm a");
  return (
    <React.Fragment>
      <Label value={data.item.summary} style={{...styles.chatHistoryMessage, ...configureLineHeight("14")}} />
      <Label value={time} style={{...styles.chatHistoryTime, ...configureLineHeight("12")}} />
    </React.Fragment>
  );
};
export class ChatHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
      deleteConfirmModalVisible: false,
      conversationIDToBeDeleted: null,
    };
    this.listeners = [];
    this.onClosePressed = this.onClosePressed.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.removeHistoryItem = this.removeHistoryItem.bind(this);
  }

  onClosePressed() {
    this.props.navigation.goBack(null);
  }

  componentWillUnmount() {
    EventUtils.removeListeners(this.listeners);
  }

  componentDidMount() {
    this.props.getConversationHistory();
  }

  keyExtractor = item => item.id;

  openConversation = id =>{
    this.props.updateFromChatHistory();
    this.props.clearChatData();
    this.props.goToChatConversation({ fromChatHistory: true, conversationId:id });
  }

  removeHistoryItem(id) {
    this.props.removeHistoryItem(id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.updateChatHistoryFlag) {
      this.props.updateChatHistory(false);
      this.props.getConversationHistory();
    }
  }

  swipeSettings = data => {
    const alert = metaHelpers.findElement(SCREEN_KEY_CHAT_HISTORY, KEY_ALERT)
      .label;

    const no = metaHelpers.findElement(SCREEN_KEY_CHAT_HISTORY, KEY_NO).label;
    const yes = metaHelpers.findElement(SCREEN_KEY_CHAT_HISTORY, KEY_YES).label;
    const remove = metaHelpers.findElement(SCREEN_KEY_CHAT_HISTORY, KEY_REMOVE)
      .label;
    const deleteConfirmationPrefix = metaHelpers.findElement(
      SCREEN_KEY_CHAT_HISTORY,
      KEY_DELETE_CONFIRM_PREFIX
    ).label;
    const deleteConfirmationText = metaHelpers.findElement(
      SCREEN_KEY_CHAT_HISTORY,
      KEY_DELETE_CONFIRM_TEXT
    ).label;
    const deleteConfirmationSuffix = metaHelpers.findElement(
      SCREEN_KEY_CHAT_HISTORY,
      KEY_DELETE_CONFIRM_SUFFIX
    ).label;
    const wanttoremove = deleteConfirmationText
    return {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if (this.state.activeRowKey != null && direction) {
          this.setState({ activeRowKey: null });
        }
      },
      onOpen: (secId, rowId, direction) => {
        if (direction) {
          this.setState({ activeRowKey: data.item.conversationID });
        }
      },
      right: [
        {
          onPress: () => {
            CustomAlert.show(alert, wanttoremove, {
              positiveText: yes,
              onPositivePress: () => {
                this.removeHistoryItem(data.item.conversationID)
              },
              negativeText: no,
             
            });
          },
          text: remove,
          type: "delete",
          backgroundColor: "#fff"
        },
      ],
      rowId: data.item.conversationID,
      sectionId: 1,
      sensitivity: 10,
      style: { backgroundColor: "#fff" },
    };
  };

  renderItem = (data) => {
    // if (this.props.chatHistoryDeletionMode === "swipeout") {
    const swipeSettings = this.swipeSettings(data);
    return (
      <Swipeout key={data.index} {...swipeSettings}>
        {this.renderItemInternal(data)}
      </Swipeout>
    );
    // }
    // return this.renderItemInternal(data, index);
  };

  renderItemInternal = data => {
    let {userPreferences } = this.props;
    const { language} = userPreferences
    let day=""
    let date1=""
    let date=""
    const days = moment(data.item.timeStamp).format("ddd");
    const dates = moment(data.item.timeStamp).format("DD MMM YYYY").split(" ");

    switch (days) {
    case "Sun": day = metaHelpers.findCommon(COMMON_KEY_SUNDAY).value; break;;
      case "Mon": day = metaHelpers.findCommon(COMMON_KEY_MONDAY).value; break;;
      case "Tue": day = metaHelpers.findCommon(COMMON_KEY_TUESDAY).value; break;;
      case "Wed": day = metaHelpers.findCommon(COMMON_KEY_WEDNESDAY).value; break;;
      case "Thu": day = metaHelpers.findCommon(COMMON_KEY_THURSDAY).value; break;;
      case "Fri": day = metaHelpers.findCommon(COMMON_KEY_FRIDAY).value; break;;
      case "Sat": day = metaHelpers.findCommon(COMMON_KEY_SATURDAY).value; break;;
    }
    switch (dates[1]) {
      case "Jan": date1 = metaHelpers.findCommon(COMMON_KEY_JANUARY).value; break;;
      case "Feb": date1 = metaHelpers.findCommon(COMMON_KEY_FEBRUARY).value; break;;
      case "Mar": date1 = metaHelpers.findCommon(COMMON_KEY_MARCH).value; break;;
      case "Apr": date1 = metaHelpers.findCommon(COMMON_KEY_APRIL).value; break;;
      case "May": date1 = metaHelpers.findCommon(COMMON_KEY_MAY).value; break;;
      case "Jun": date1 = metaHelpers.findCommon(COMMON_KEY_JUNE).value; break;;
      case "Jul": date1 = metaHelpers.findCommon(COMMON_KEY_JULY).value; break;;
      case "Aug": date1 = metaHelpers.findCommon(COMMON_KEY_AUGUST).value; break;;
      case "Sep": date1 = metaHelpers.findCommon(COMMON_KEY_SEPTEMBER).value; break;;
      case "Oct": date1 = metaHelpers.findCommon(COMMON_KEY_OCTOBER).value; break;;
      case "Nov": date1 = metaHelpers.findCommon(COMMON_KEY_NOVEMBER).value; break;;
      case "Dec": date1 = metaHelpers.findCommon(COMMON_KEY_DECEMBER).value; break;;
    }
    date= dates[0]+" "+date1 +" "+dates[2]
    const time = moment(data.item.timeStamp).format("hh:mm a");
    return (
      <TouchableOpacity
        onPress={e => {
          e.preventDefault();
          this.openConversation(data.item.conversationID);
        }}
      >
        <View style={styles.chatHistoryItem}>
          <View style={styles.chatHistoryItemDateContainer}>
            <Label value={day} style={{...styles.chatHistoryDateLabel, ...configureLineHeight("12")}} />
            <Label value={date} style={{...styles.chatHistoryDateLabel, ...configureLineHeight("12")}} />
          </View>
          <View style={styles.chatHistoryItemContentContainer}>
            <Label
              value={data.item.summary}
              style={{...styles.chatHistoryMessage, ...configureLineHeight("14")}}
            />
            <Label value={time} style={{...styles.chatHistoryTime, ...configureLineHeight("12")}} />
          </View>
          {/* {this.props.chatHistoryDeletionMode !== "swipeout" && (
          <View>
            <TouchableOpacity
              testID="removeHistory"
              accessible
              accessibilityLabel="removeHistory"
              onPress={e => {
                e.preventDefault();
                this.setState({
                  deleteConfirmModalVisible: true,
                  conversationIDToBeDeleted: data.item.conversationID,
                });
              }}
              style={{ alignItems: "flex-end", zIndex: 99, padding: 10 }}
            >
              <Image
                source={CROSS_ICON}
                style={{ width: 19.2, height: 19.2 }}
              />
            </TouchableOpacity>
          </View>
          )} */}
        </View>
      </TouchableOpacity>
    );
  };

  getDeleteConfirmModal() {
    const deleteConfirmationPrefix = metaHelpers.findElement(
      SCREEN_KEY_CHAT_HISTORY,
      KEY_DELETE_CONFIRM_PREFIX
    ).label;
    const deleteConfirmationText = metaHelpers.findElement(
      SCREEN_KEY_CHAT_HISTORY,
      KEY_DELETE_CONFIRM_TEXT
    ).label;
    const deleteConfirmationSuffix = metaHelpers.findElement(
      SCREEN_KEY_CHAT_HISTORY,
      KEY_DELETE_CONFIRM_SUFFIX
    ).label;
    return (
      <Modal
        isVisible={this.state.deleteConfirmModalVisible}
        onBackdropPress={() =>
          this.setState({ deleteConfirmModalVisible: false })
        }
        presentationStyle={"overFullScreen"}
        hideModalContentWhileAnimating
      >
        <View style={styles.deleteConfirmModalContainer}>
          <View style={styles.deleteConfirmationModalTop}>
            <OfflineImage
              source={{ uri: "" }}
              resizeMode="contain"
              fallbackSource={PHONEBOOK_ICON}
              style={styles.phonebookIcon}
            />

            <Text style={{
              ...styles.deleteConfirmationModalMsg,
              ...configureLineHeight("14")
              }}>
              {deleteConfirmationPrefix}
              <Text style={{
                ...styles.deleteConfirmationModalMsgUserName,
                ...configureLineHeight("14")
                }}>
                {" "}
                {deleteConfirmationText}
              </Text>
              {deleteConfirmationSuffix}
            </Text>
          </View>
          <View style={styles.deleteConfirmationModalBtns}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  deleteConfirmModalVisible: false,
                  conversationIDToBeDeleted: null,
                });
              }}
            >
              <Text style={{
                ...styles.deleteConfirmBtn,
                ...configureLineHeight("12")
                }}>GO BACK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.removeHistoryItem(this.state.conversationIDToBeDeleted);
                this.setState({
                  deleteConfirmModalVisible: false,
                  conversationIDToBeDeleted: null,
                });
              }}
            >
              <Text style={{
                ...styles.deleteConfirmBtn,
                ...configureLineHeight("12")
                }}>REMOVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const chathistory = metaHelpers.findElement(
      SCREEN_KEY_CHAT_HISTORY,
      KEY_CHAT_HISTORY
    ).label;
    return (
      <View style={styles.container}>
        <View style={[{
          width: "100%",
          height: 52,
          backgroundColor: "#ffffff",
          alignItems: "center",
          paddingLeft: 11,
          paddingRight: 11,
          flexDirection: "row",
        }]}>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack()
            }
            }
            style={{
              width: 55,
              height: 55,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Image style={{
              width: 20, height: 20, left: 0
            }} source={BACK} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <Image
            source={BABYLON_LOGO_BLUE}
            resizeMode={"contain"}
            style={{

            }}
          ></Image>

        </View>
        <Label value={chathistory} style={{...styles.chatHistoryLabel, ...configureLineHeight("22")}} />
        <FlatList
          style={styles.container}
          data={this.props.chatHistoryData}
          renderItem={this.renderItem}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

ChatHistory.propTypes = {
  chatHistoryDeletionMode: PropTypes.string, //one of "swipe", "crossButton"
  renderChatHistoryItemLeft: PropTypes.func,
  renderChatHistoryItemContent: PropTypes.func,
  chatHistoryItemLeftStyle: PropTypes.number,
  chatHistoryItemContentStyle: PropTypes.number,
  clearChatData: PropTypes.func,
};

ChatHistory.defaultProps = {
  renderChatHistoryItemLeft: renderChatHistoryItemLeft,
  renderChatHistoryItemContent: renderChatHistoryItemContent,
  chatHistoryItemLeftStyle: styles.chatHistoryItemDateContainer,
  chatHistoryItemContentStyle: styles.chatHistoryItemContentContainer,
};

const mapStateToProps = state => ({
  meta: state.meta,
  chatHistoryData: state.chat.chatHistoryData,
  updateChatHistoryFlag: state.chat.updateChatHistoryFlag,
  userPreferences: state.userPreferences,

});

export default connect(
  mapStateToProps,
  {
    getConversationHistory: () => ({
      context: pageKeys.CHAT_HISTORY,
      type: CoreActionTypes.GET_CONVERSATION_HISTORY,
    }),
    updateFromChatHistory: () => ({
      type: CoreActionTypes.FROM_CHAT_HISTORY,
      payload: true,
    }),
    clearChatData,
    openConversation: id => ({
      context: pageKeys.CHAT_HISTORY,
      type: CoreActionTypes.OPEN_CONVERSATION,
      payload: {
        id,
      },
    }),
    removeHistoryItem: id => ({
      context: pageKeys.CHAT_HISTORY,
      type: CoreActionTypes.ARCHIVE_CONVERSATION_BY_ID,
      payload: {
        id,
      },
    }),
    updateChatHistory: value => ({
      type: CoreActionTypes.UPDATE_CHAT_HISTORY,
      payload: value,
    }),
    goToChatConversation: params => ({
      context: pageKeys.CHAT_HISTORY,
      type: CoreActionTypes.GO_TO_CHAT_CONVERSATION,
      payload: {
        params,
      },
    }),
  }
)(ChatHistory);

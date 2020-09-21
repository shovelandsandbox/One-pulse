import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Modal,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import PropType from "prop-types";
import { TextField } from "react-native-material-textfield";
import { pathOr } from "ramda";
import LinearGradient from "react-native-linear-gradient";

import styles from "./style";
import {
  createRoom,
  getCustomerByEmail,
  fetchCallLogs,
  clearContactList,
  setSearchedCallLogs,
  resetContactCallLogs,
  createChatChannel,
  getSelfDetails,
} from "../../actions";
import ChatHistory from "../ChatContacts";
import ContactCard from "../../components/ContactCard";

import { dispatchEvent } from "../../../../actions";
import {
  events
} from "@pru-rt-internal/pulse-common";

import { isValidEmail } from "../../../../utils/UserCredentials";
import { PruBackHeader } from "../../../../components";
import SelectedContacts from "../../components/SelectedContacts";
import {
  SALE_VIDEO_CHAT,
  SALE_TEXT_CHAT,
  SALE_RIGHT_ARROW,
  CONTACT_SEARCH,
  SALE_CLOSE_WHITE
} from "../../../../config/images";
const momentTZ = require("moment-timezone");
import MetaConstants from "../../meta";
const window = Dimensions.get("window");
const deviceHeight = window.height;
import { VideoSalesSelector } from "../../Selector";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";

export class AddParticipant extends Component {
  constructor(props) {
    super(props);
    this.metaConstants = { ...MetaConstants.screenMeta() };
    this.state = {
      values: {},
      errors: {},
      participants: [],
      searchSelected: false,
      customerEmailSrch: "",
      contactModalVisible: false,
      contactToShowInModal: props.filteredContacts[0],
      selectedTab: {
        id: 1,
        title: "Select Client",
      },
      filteredValue: props.filteredContacts[0] || {},
      selectedContacts: [],
    };
  }

  componentDidMount() {
    const { getSelfDetails, email } = this.props;
    this.props.fetchCallLogs();
    getSelfDetails(email);
    this.props.registerEvent(eventNames.InitiateCallScreen)
    // this.props.dispatchEvent(events.InitiateCallScreen);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const currentValue = pathOr("", ["filteredValue", "email"], prevState);
    const searchSelected = prevState.searchSelected;
    const futureValue = pathOr("", ["filteredContacts", "0", "email"], nextProps);
    const selectedTabId = prevState.selectedTab.id;
    const tempContacts = prevState.selectedContacts;

    if ((currentValue !== futureValue) && searchSelected && selectedTabId === 2) {
      const contact = nextProps.filteredContacts[0];
      if (contact) {
        tempContacts.push(contact);
        return {
          selectedContacts: tempContacts,
          filteredValue: nextProps.filteredContacts[0] || {},
        }
      }
    }

    if ((currentValue !== futureValue) && searchSelected && selectedTabId !== 2) {
      return {
        contactToShowInModal: nextProps.filteredContacts[0] || {},
        contactModalVisible: true,
        filteredValue: nextProps.filteredContacts[0] || {},
        participants: [futureValue],
      }
    }
  }

  createRoom = () => {
    const participants = this.state.participants.map(email => email);

    this.setState(
      {
        values: {},
        errors: {},
        participants: [],
      },
      () => {
        // this.props.dispatchEvent(events.InitiateCall);
        this.props.registerEvent(eventNames.initiateCall)

        this.props.createRoom(participants);
      }
    );
  };

  addParticipant = () => {
    const Incorrect_Email = this.metaConstants.incorrect_email;
    const modalContact = this.state.contactToShowInModal;

    Keyboard.dismiss();
    if (isValidEmail(modalContact.email)) {
      this.setState({
        participants: [modalContact.email],
        values: {},
        errors: {},
      });
    } else {
      this.setState({
        errors: {
          email: Incorrect_Email,
        },
      });
    }
  };

  updateSelectedContacts = item => {
    const { selectedContacts } = this.state;
    const tempContacts = selectedContacts;
    const i = tempContacts.findIndex(contact => contact.id == item.id);
    if (i == -1) {
      tempContacts.push(item);
    }
    this.setState({
      selectedContacts: tempContacts,
    });
  };

  handleContactPress = item => {
    const { dispatchEvent } = this.props;
    const { selectedTab } = this.state;
    switch (selectedTab.id) {
      case 1:
        // dispatchEvent(events.initiateCallFromHistory);
        this.props.registerEvent(eventNames.intitiateCallFromHistory)
        this.setState(
          {
            contactToShowInModal: item,
            contactModalVisible: true,
          },
          this.addParticipant
        );
        break;
      case 2:
        this.updateSelectedContacts(item);
        break;
    }
  };

  renderCallLogList = list => {
    return (
      <FlatList
        data={list}
        renderItem={item => (
          <ContactCard
            contact={item}
            onSelection={item => {
              this.handleContactPress(item);
            }}
          />
        )}
        extraData={list}
      />
    );
  };

  searchHandler = id => {
    const {
      getCustomerByEmail,
      dispatchEvent,
      setSearchedCallLogs,
      filteredContacts,
      registerEvent
    } = this.props;
    const { customerEmailSrch } = this.state;
    switch (id) {
      case 1:
      case 2:
        getCustomerByEmail(customerEmailSrch);
        // dispatchEvent(events.SearchForUser);
        registerEvent(eventNames.searchForUser)
        break;
      case 3:
        const searchedCustomerData = filteredContacts.find(
          contact => contact.email === customerEmailSrch
        );
        searchedCustomerData && setSearchedCallLogs(searchedCustomerData);
        break;
    }
  };

  dismissModal = () => {
    this.setState({
      contactModalVisible: false,
      searchSelected: false,
      filteredValue: {},
    });
  };

  renderContactModal = () => {
    const { contactToShowInModal, contactModalVisible } = this.state;
    const { createChatChannel } = this.props;
    const Email = this.metaConstants.email;
    const Name = this.metaConstants.name;
    const Phone = this.metaConstants.phone;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={contactModalVisible}
        onRequestClose={() => {
          this.setState({ contactModalVisible: false });
        }}
      >
        <View style={styles.centeredView}>
          <LinearGradient style={styles.modalView} colors={["#be2323", "#ff8b6f"]}>
            <View style={styles.contactView}>
              <View style={styles.emailView}>
                <Text style={styles.modalEmail}>{Email}</Text>
                <Text style={styles.modalText}>
                  {contactToShowInModal.email}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.swipeView}
                onPress={this.dismissModal}
              >
                <Image source={SALE_CLOSE_WHITE} style={styles.dismissIcon} />
              </TouchableOpacity>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text style={styles.modalName}>{Name}</Text>
              <Text style={styles.modalText}>
                {contactToShowInModal.fullName}
              </Text>
            </View>
            <View style={styles.modalDOBContainer}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalPhoneText}>{Phone}</Text>
                <Text style={styles.modalText}>
                  {contactToShowInModal.phoneNumber}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <TouchableOpacity
                style={styles.modalEmailButton}
                onPress={() => {
                  this.dismissModal();
                  createChatChannel(
                    contactToShowInModal,
                  );
                }}
              >
                <Image source={SALE_TEXT_CHAT} style={styles.chatIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.roomButton}
                onPress={() => {
                  this.dismissModal();
                  this.createRoom();
                }}
              >
                <Image source={SALE_VIDEO_CHAT} style={styles.chatIcon} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    );
  };

  renderTab = item => {
    let customStyles = {
      ...styles.titleContainer,
    };

    let customTextStyles = {
      color: "#707070",
      fontSize: 17,
    };

    if (this.state.selectedTab.id === item.id) {
      customStyles = { ...customStyles, ...styles.bottomBorder };
      customTextStyles = { ...customTextStyles, color: "#ec1c2e" };
    }

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ selectedTab: item, searchSelected: false });
          this.props.clearContactList();
          if (item.id === 1) {
            this.props.registerEvent(eventNames.callLogs)
          }
          if (item.id === 2) {
            this.props.fetchCallLogs();
          }
        }}
      >
        <View style={customStyles}>
          <Text style={customTextStyles}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderTabs = () => {
    const select_client = this.metaConstants.select_client;
    const call_history = this.metaConstants.call_history;
    const call_log = this.metaConstants.call_logs;
    const group_video_call = this.metaConstants.groupVideoCall;

    const tabs = [
      {
        id: 1,
        title: call_log,
      },
      {
        id: 2,
        title: group_video_call,
      },
      {
        id: 3,
        title: call_history,
      },
    ];
    return (
      <View
        style={{
          flex: 4,
          paddingTop: 5,
          borderBottomColor: "#c8cbd0",
          borderBottomWidth: 0.3,
          paddingLeft: 10,
        }}
      >
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={tabs}
          keyExtractor={item => item.id}
          renderItem={tab => this.renderTab(tab.item)}
        />
      </View>
    );
  };

  renderSearch = (id, customerEmailSrch) => {
    const Customer_Email_Id = this.metaConstants.customer_email_id;
    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          autoFocus={false}
          multiline={false}
          maxLength={255}
          placeholderTextColor="#707070"
          placeholder={Customer_Email_Id}
          selectionColor="#ff4f39"
          value={customerEmailSrch}
          onChangeText={value => this.setState({ customerEmailSrch: value })}
        />
        <TouchableOpacity
          onPress={() => {
            this.setState({
              searchSelected: true,
            });
            this.searchHandler(id);
          }}
          style={styles.searchAction}
          disabled={customerEmailSrch ? false : true}
        >
          <Image source={CONTACT_SEARCH} style={{ width: 19, height: 14, }} />
        </TouchableOpacity>
      </View>
    );
  };

  renderCallLogTabView = () => {
    const { contactsFromLog, calllogList } = this.props;
    const { selectedTab } = this.state;
    return (
      <ScrollView style={{ height: deviceHeight - 80 }}>
        <View style={styles.callLogViewStyle}>
          {this.renderCallLogList(
            selectedTab.id === 1 ? calllogList : contactsFromLog
          )}
        </View>
      </ScrollView>
    );
  };

  renderSelectedContacts = () => {
    const { selectedContacts } = this.state;

    return (
      <View style={{ height: 80 }}>
        <SelectedContacts
          data={selectedContacts}
          onVideoPress={this.handleVideoPress}
          onCancelContactPress={this.handleCancelContactPress}
          disableVideoIcon={selectedContacts.length < 2}
        />
      </View>
    );
  };

  handleVideoPress = () => {
    const { dispatchEvent, createRoom, registerEvent } = this.props;
    const { selectedContacts } = this.state;
    const selectedEmails = selectedContacts.map(contact => contact.email);
    this.setState(
      {
        selectedContacts: [],
      },
      () => {
        registerEvent(eventNames.initiateCall)

        // dispatchEvent(events.InitiateCall);
        createRoom(selectedEmails);
      }
    );
  };

  handleCancelContactPress = item => {
    const { selectedContacts } = this.state;
    const tempContacts = selectedContacts;
    const i = tempContacts.findIndex(contact => contact.id == item.id);
    if (i > -1) {
      tempContacts.splice(i, 1);
    }
    this.setState({
      selectedContacts: tempContacts,
      filteredValue: {},
    });
    this.props.resetContactCallLogs();
  };

  render() {
    const initiate_conference = this.metaConstants.initiate_conference;
    const {
      customerEmailSrch,
      selectedTab,
      contactModalVisible,
      selectedContacts,
    } = this.state;
    return (
      <View style={styles.pulseContainer}>
        {contactModalVisible && this.renderContactModal()}

        <View style={styles.headerLayout}>
          <PruBackHeader title={initiate_conference}></PruBackHeader>
        </View>
        <View style={styles.tabsLayout}>{this.renderTabs()}</View>
        {(selectedTab.id === 1 || selectedTab.id === 2) && (
          <View>
            {this.renderSearch(selectedTab.id, customerEmailSrch)}
            {selectedContacts.length > 0 &&
              selectedTab.id === 2 &&
              this.renderSelectedContacts()}
            {this.renderCallLogTabView()}
          </View>
        )}
        {selectedTab.id === 3 && <ChatHistory />}
      </View>
    );
  }
}

AddParticipant.propTypes = {
  createRoom: PropType.func,
  contactsFromLog: PropType.array,
  calllogList: PropType.array,
};

const mapStateToProps = state => ({
  errors: state.videoSales.errors,
  contacts: state.videoSales.contacts,
  filteredContacts: state.videoSales.filteredContacts,
  email: state.profile.email,
  calllogList: state.videoSales.calllogList,
  contactsFromLog: VideoSalesSelector.getContactsFromLogs(
    state.videoSales.calllogList
  ),
});

const mapDispatchToProps = {
  registerEvent,
  createRoom,
  getCustomerByEmail,
  fetchCallLogs,
  clearContactList,
  setSearchedCallLogs,
  resetContactCallLogs,
  createChatChannel,
  getSelfDetails,
  dispatchEvent,

};

export default connect(mapStateToProps, mapDispatchToProps)(AddParticipant);

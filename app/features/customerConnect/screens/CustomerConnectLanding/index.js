import React, { PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Modal,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import {
  PruBackHeader,
  PruTabView,
  ShadowWrapper,
} from "../../../../components";
import styles from "./styles";

import { NO_EVENT_IMAGE } from "../../../communityEvents/assets/communityGroup";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextField } from "react-native-material-textfield";
import screenNames from "../../constants/screenNames";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

import {
  HistoryCard,
  ContactSearch,
  CallOrChatActionButton,
} from "../../components";
import {
  getChatHistory,
  fetchCallLogs,
  clearSelectedContacts,
  createRoom,
  createChatChannel,
  getChatSession,
  createGroup,
  goTo,
} from "../../redux/actions";
import { metaFinderCustomerConnect } from "../../meta";

class CustomerConnectLanding extends PureComponent {
  constructor(props) {
    super(props);
    this.TABS = [
      metaFinderCustomerConnect("conversations"),
      metaFinderCustomerConnect("call_logs"),
    ];

    this.state = {
      selectedTab: this.TABS[0],
      createGroupModal: false,
      groupName: "",
    };
  }

  componentDidMount() {
    this.props.getChatHistory();
    this.props.fetchCallLogs();
  }

  onTabchange = selectedTab => {
    this.setState({
      selectedTab: selectedTab,
    });
  };

  renderHeaderRight = () => {
    const { currentJourneyType } = this.props;
    return currentJourneyType === "AGENT" ? (
      <View style={styles.rightActionContainer}>
        <TouchableOpacity
          onPress={() => this.props.goTo(screenNames.NEW_CONTACTS)}
        >
          <Icon name="phone-plus" size={24} style={styles.rightActionIcon} />
        </TouchableOpacity>
      </View>
    ) : null;
  };

  handleOnHistoryItemPress = item => {
    const { selectedTab } = this.state;
    const selectedEmails = item.participants.map(contact => {
      const email = pathOr("", ["contactDetails", "email", "value"], contact);
      const phone = pathOr("", ["contactDetails", "phone", "value"], contact);
      if (email) {
        return { type: "email", value: email };
      }
      return { type: "phone", value: phone };
    });

    if (selectedTab === this.TABS[1]) {
      this.props.createRoom(selectedEmails);
    } else if (selectedTab === this.TABS[0]) {
      this.props.getChatSession(
        item.outgoingCall ? item.email : "",
        item.detail,
        item.fullName,
        selectedEmails,
      );
    }
  };

  renderHistoryContent = () => {
    const { selectedTab } = this.state;
    const { chatHistory, calllogList, selectedContacts } = this.props;

    if (selectedContacts.length > 0) {
      return null;
    }

    const data = selectedTab === this.TABS[0] ? chatHistory : calllogList;

    if (
      (selectedTab === this.TABS[0] && chatHistory.length === 0) ||
      (selectedTab === this.TABS[1] && calllogList.length === 0)
    ) {
      return null;
    }

    return (
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return (
            <HistoryCard
              onPress={() => {
                this.handleOnHistoryItemPress(item);
              }}
              isOutgoing={item.outgoingCall}
              name={item.fullName}
              participants={item.participants}
              convDate={item.convDate}
              thumbnail={item.profilePic}
              canShowCallStatus={selectedTab === this.TABS[1]}
              item={item}
              duration={item.duration}
            />
          );
        }}
      />
    );
  };

  renderContent = () => {
    const { currentJourneyType } = this.props;
    return (
      <View style={styles.contentWrapper}>
        {currentJourneyType === "AGENT" ? <ContactSearch /> : null}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          {this.renderHistoryContent()}
          {this.renderNoContent()}
        </ScrollView>
      </View>
    );
  };

  renderNoContent = () => {
    const { selectedTab } = this.state;
    const { chatHistory, calllogList, selectedContacts } = this.props;

    if (selectedContacts.length > 0) {
      return null;
    }
    if (
      (selectedTab === this.TABS[0] && chatHistory.length !== 0) ||
      (selectedTab === this.TABS[1] && calllogList.length !== 0)
    ) {
      return null;
    }

    const emptyMsg =
      selectedTab === this.TABS[0]
        ? metaFinderCustomerConnect("conversationEmpty")
        : metaFinderCustomerConnect("callLogsEmpty");

    return (
      <View style={styles.noContentWrapper}>
        <Image
          source={NO_EVENT_IMAGE}
          style={styles.noContentImage}
          resizeMode="contain"
        />
        <Text style={styles.emptyMessage}>{emptyMsg}</Text>
      </View>
    );
  };

  renderActionButton = () => {
    const { selectedTab } = this.state;
    const { selectedContacts } = this.props;

    return selectedContacts.length > 0 ? (
      <CallOrChatActionButton
        handleOnStartCall={this.handleOnStartCall}
        handleOnStartChat={this.handleOnStartChat}
        isCallVisible={selectedTab === this.TABS[1]}
        isChatVisible={selectedTab === this.TABS[0]}
      />
    ) : null;
  };

  handleOnStartCall = () => {
    const { selectedContacts } = this.props;
    const selectedEmails = selectedContacts.map(contact => {
      const email = pathOr("", ["email"], contact);
      const phoneNumber = pathOr("", ["phone"], contact);
      if (email) {
        return { type: "email", value: email };
      }
      return { type: "phone", value: phoneNumber };
    });
    if (selectedEmails.length > 0) {
      this.props.createRoom(selectedEmails);
      this.props.clearSelectedContacts();
    }
  };

  handleOnStartChat = () => {
    const { selectedContacts, userEmail, userPhone } = this.props;
    const selectedEmails = selectedContacts.map(contact => {
      const email = pathOr("", ["email"], contact);
      const phoneNumber = pathOr("", ["phone"], contact);
      if (email) {
        return { type: "email", value: email };
      }
      return { type: "phone", value: phoneNumber };
    });
    if (selectedEmails.length === 1) {
      this.props.createChatChannel(
        selectedEmails,
        userEmail ? userEmail : userPhone
      );
    } else if (selectedEmails.length > 1) {
      this.selectedEmails = selectedEmails;
      this.setState({ createGroupModal: true });
    }
    this.setState({ groupName: "" });
  };

  showCreateGroupModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={this.state.createGroupModal}
      >
        <View style={styles.modalTopView}>
          <View style={styles.modalSecondView}>
            <TextField
              value={this.state.groupName}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={() => { }}
              onChangeText={value => {
                this.setState({ groupName: value });
              }}
              onSubmitEditing={() => { }}
              fontSize={16}
              textColor={Colors.black}
              tintColor={Colors.grayaf}
              baseColor={Colors.grayaf}
              label={metaFinderCustomerConnect("groupName")}
            />
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    createGroupModal: false,
                  });
                }}
                style={styles.touchableView}
              >
                <Text style={styles.red}>
                  {metaFinderCustomerConnect("cancel")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    createGroupModal: false,
                  });
                  this.props.createGroup(
                    this.selectedEmails,
                    this.state.groupName
                  );
                }}
                disabled={this.state.groupName.length === 0}
                style={[
                  styles.createTouchable,
                  this.state.groupName ?.length === 0 ? styles.bgA0Gray : null,
                ]}
              >
                <Text style={styles.white}>
                  {metaFinderCustomerConnect("create")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const { selectedTab, createGroupModal } = this.state;
    
    return (
      <View style={styles.container}>
        <ShadowWrapper style={styles.headerShadow}>
          <View>
            <PruBackHeader
              title={metaFinderCustomerConnect("customerConnectTitle")}
              rightImage
              rightImageRenderMethod={this.renderHeaderRight}
            />
            <PruTabView
              tabs={this.TABS}
              onChange={this.onTabchange}
              selectedTab={selectedTab}
            />
          </View>
        </ShadowWrapper>
        {this.renderContent()}
        {this.renderActionButton()}
        {createGroupModal && this.showCreateGroupModal()}
      </View>
    );
  }
}

CustomerConnectLanding.propTypes = {
  calllogList: PropTypes.array,
  chatHistory: PropTypes.array,
  selectedContacts: PropTypes.array,
  currentJourneyType: PropTypes.string,
  getChatHistory: PropTypes.func,
  fetchCallLogs: PropTypes.func,
  createRoom: PropTypes.func,
  createChatChannel: PropTypes.func,
  getChatSession: PropTypes.func,
  clearSelectedContacts: PropTypes.func,
  createGroup: PropTypes.func,
  goTo: PropTypes.func,
};

const mapStateToProps = state => ({
  calllogList: state.customerConnect.calllogList,
  chatHistory: state.customerConnect.chatHistory,
  selectedContacts: state.customerConnect.selectedContacts,
  currentJourneyType: state.customerConnect.currentJourneyType,
  userEmail: state.profile.email,
  userPhone: state.profile.phone,
});

const mapDispatchToProps = {
  getChatHistory,
  fetchCallLogs,
  createRoom,
  createChatChannel,
  getChatSession,
  clearSelectedContacts,
  createGroup,
  goTo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerConnectLanding);

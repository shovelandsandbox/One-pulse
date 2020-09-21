/* eslint-disable react/require-optimization */
import React, { Component } from "react";
import { ScrollView, View, FlatList } from "react-native";
import { connect } from "react-redux";

import {
  createChatChannel,
  goTo,
  getChatHistory,
  getChatSession,
  getCustomerByEmail,
} from "../../actions";
import Styles from "./styles";
import MetaConstants from "../../meta";
import ContactCard from "../../components/ContactCard";
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";

class ChatContacts extends Component {
  constructor(props) {
    super(props);
    this.metaConstants = { ...MetaConstants.screenMeta() };
  }

  componentDidMount() {
    this.props.registerEvent(eventNames.accessChatHistory)
    this.props.getChatHistory();
  }

  contactListClicked = contact => {
    const { getChatSession, getCustomerByEmail } = this.props;
    this.props.registerEvent(eventNames.initiateChatFromHistory)
    // this.props.dispatchEvent(events.initiateChatFromHistory);
    getChatSession(contact.outgoingCall ? contact.email : "", contact.outgoingCall);
    getCustomerByEmail(contact.email);
  };

  render() {
    let { chatHistory } = this.props;
    chatHistory = chatHistory.filter(conversation => conversation.email);

    return (
      <View style={Styles.container}>
        <ScrollView style={Styles.contactContainer}>
          <View>
            <FlatList
              data={chatHistory}
              renderItem={item => (
                <ContactCard
                  contact={item}
                  type={"chat"}
                  onSelection={item => {
                    this.contactListClicked(item);
                  }}
                />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  chatHistory: state.videoSales.chatHistory,
  chatRoomDetails: state.videoSales.chatRoomDetails,
  email: state.profile.email,
});

export default connect(mapStateToProps, {
  registerEvent,
  createChatChannel,
  goTo,
  getChatHistory,
  getChatSession,
  getCustomerByEmail,
  dispatchEvent,
})(ChatContacts);

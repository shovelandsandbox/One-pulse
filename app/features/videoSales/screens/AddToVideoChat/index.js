import React, { PureComponent } from "react";
import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Keyboard,
} from "react-native";
import { connect } from "react-redux";
import {
  getCustomerByEmail,
  updateChatSession,
  clearContactList,
  createGroup,
} from "../../../customerConnect/redux/actions";
import { pathOr } from "ramda";
import { metaFinderCustomerConnect } from "../../../customerConnect/meta";
import actionNames from "../../../customerConnect/redux/actionNames";
import styles from "./styles";
import { CoreServices } from "@pru-rt-internal/pulse-common";
import { CONTACT_SEARCH, BACK } from "../../../../config/images";
import ContactCard from "../../components/ContactCard";
import { PruBackHeader, CustomAlert } from "../../../../components";
const { NavigationService } = CoreServices;
import { dispatchEvent } from "../../../../actions";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";

class AddToVideoChat extends PureComponent {
  constructor(props) {
    super(props);
    //  this.metaConstants = { ...MetaConstants.screenMeta() };
    this.state = {
      customerEmailSrch: "",
    };
  }

  renderCallLogTabView = () => {
    return (
      <ScrollView>
        <View style={styles.callLogViewStyle}>{this.renderCallLogList()}</View>
      </ScrollView>
    );
  };

  errorMessage = () => {
    CustomAlert.show(
      "",
      "The user being invited is already present in the call",
      {
        positiveText: "OK",
        onPositivePress: () => {},
      }
    );
  };
  isPresentInCall = customerEmailSrch => {
    return this.props.callerList.find(
      element => element.value.toLowerCase() === customerEmailSrch.toLowerCase()
    );
  };

  renderCallLogList = () => {
    const {
      contacts,
      callerList,
      createGroup,
      updateChatSession,
      email,
    } = this.props;
    const groupChat = pathOr(
      "",
      ["navigation", "state", "params", "groupChat"],
      this.props
    );
    const mode = pathOr(
      "VIDEO",
      ["navigation", "state", "params", "mode"],
      this.props
    );
    const feature = pathOr(
      "VIDEO",
      ["navigation", "state", "params", "feature"],
      this.props
    );
    let roomId = pathOr("", ["callDetails", "channelId"], this.props);
    if (groupChat) {
      roomId = pathOr("", ["chatDetails", "channelId"], this.props);
    }
    return (
      <FlatList
        data={this.props.contacts}
        renderItem={item => (
          <ContactCard
            contact={item}
            onSelection={item => {
              const value = item.email
                ? { type: "email", value: item.email }
                : { type: "phone", value: item.phoneNumber };
              if (
                item.email.toLowerCase() !== email.toLowerCase() &&
                !this.isPresentInCall(item.email)
              ) {
                if (
                  callerList &&
                  callerList.length === 2 &&
                  feature === "VideoSale"
                ) {
                  createGroup(callerList, roomId, [value], mode);
                } else {
                  updateChatSession([value], roomId, mode);
                }
                NavigationService.goBack();
              } else {
                this.errorMessage();
              }
            }}
          />
        )}
        keyExtractor={item => item.id}
      />
    );
  };
  isNumber = n => {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  };
  render() {
    const { customerEmailSrch } = this.state;
    const { email } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerLayout}>
          <PruBackHeader title={"Add Person"} />
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            autoFocus={false}
            multiline={false}
            maxLength={255}
            placeholderTextColor="#707070"
            placeholder={metaFinderCustomerConnect("searchPlaceholder")}
            selectionColor="#ff4f39"
            value={customerEmailSrch}
            onChangeText={value => this.setState({ customerEmailSrch: value })}
          />
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              const isFound = this.isPresentInCall(customerEmailSrch);
              if (
                !isFound &&
                customerEmailSrch.toLowerCase() !== email.toLowerCase()
              ) {
                this.props.getCustomerByEmail(
                  customerEmailSrch,
                  this.isNumber(customerEmailSrch)
                );
              } else {
                this.errorMessage();
              }
            }}
            style={styles.searchAction}
          >
            <Image source={CONTACT_SEARCH} style={{ width: 19, height: 14 }} />
          </TouchableOpacity>
        </View>
        {this.renderCallLogTabView()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {
    customerConnect: { contacts, callDetails, callerList, chatDetails },
    profile: { email },
  } = state;
  return {
    contacts,
    callDetails,
    callerList,
    chatDetails,
    email,
  };
};
export default connect(mapStateToProps, {
  emptyChatToken: () => ({
    type: actionNames.emptyCallDetails,
  }),
  dispatchEvent,
  createGroup,
  getCustomerByEmail,
  updateChatSession,
  clearContactList,
})(AddToVideoChat);

/* eslint-disable */
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
} from "react-native"; import Icon from "react-native-vector-icons/FontAwesome";
import Contacts from "react-native-contacts";

import { connect } from "react-redux";
import { CoreActions, CoreServices } from "@pru-rt-internal/pulse-common";
import { sendEmail } from "../../utils/send-email";
import { PruBackHeader } from '../../components';
import { WPSearchBar } from "../wellnessPlans/components";
import { pathOr } from "ramda";
import HealthChannelTab from "../../components/HealthChannelTab";
import ContactRowItem from "./components/ContactRowItem";
import styles from "./styles";
import { readEmailContacts, updateCustomersContact } from "./actions";
import MetaConstants from "./meta";

const { readContacts } = CoreActions;
const { NavigationService } = CoreServices;


class SocialInvite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "Contacts",
      emailContactList: [],
      enableIndividualInvite: true,
      enableBulkInvite: false,
    };
    this.MetaConstants = { ...MetaConstants.initializeScreenMeta(), getLabelByContext: MetaConstants.getLabelByContext };
    this.headersTab = [
      { channelId: "Contacts", channelName: this.MetaConstants.contacts },
      { channelId: "Invited", channelName: this.MetaConstants.invited },
    ];
  }

  componentDidMount() {
    const { readContacts, readEmailContacts, isPulseConnectScreen } = this.props;
    const storedContacts = this.props.emailContacts;
    Contacts.getAll((err, contacts) => {
      let modifiedContacts = contacts.map(contact => {
        let index = storedContacts.findIndex(el => el.recordID === contact.recordID);
        const selectedForSend = index !== -1 ? !storedContacts[index].invitationSent : true;
        return { ...contact, isSelectedForInvite: selectedForSend, invitationSent: index !== -1 ? storedContacts[index].invitationSent : false };
      })
      const emailContacts = modifiedContacts.filter(item => {
        return item.emailAddresses.length !== 0;
      });
      let inviteList = emailContacts.filter(el => el.isSelectedForInvite == true);
      const enableBulkInviteFlag = inviteList.length !== 0;
      this.uploadCustomersContact(contacts);
      readContacts(modifiedContacts);
      readEmailContacts(emailContacts);
      this.setState({ emailContactList: emailContacts, enableBulkInvite: enableBulkInviteFlag, enableIndividualInvite: !enableBulkInviteFlag });
      if (isPulseConnectScreen) {
        this.setState({ selectedTab: "Invited" });
      }
    });
  }

  uploadCustomersContact = (newContacts) => {
    const { updateCustomersContact, contacts } = this.props;
    let modifiedContacts = newContacts.filter(item => {
      let index = contacts.findIndex(el => el.recordID === item.recordID);
      return index == -1 && item.phoneNumbers.length !== 0;
    }).map(contact => {
      let userDetail = {
        firstName: contact.givenName,
        surName: contact.familyName,
        contactDetails: {
          phone: {
            channel: "PHONE",
            value: contact.phoneNumbers[0].number,
          }
        }
      }
      if (contact.emailAddresses.length !== 0) {
        const email = {
          channel: "EMAIL",
          value: contact.emailAddresses[0].email,
        };
        userDetail.contactDetails.email = email;
      }
      return userDetail;
    });
    if (modifiedContacts.length !== 0) {
      updateCustomersContact(modifiedContacts);
    }
  }

  getContactsByTab(selectedTab) {
    const { emailContactList } = this.state;
    if (!emailContactList || emailContactList.length == 0) {
      return [];
    }
    switch (selectedTab) {
      case "Invited":
        return emailContactList.filter(item => {
          return item.invitationSent == true;
        });
      case "Contacts":
      default:
        return emailContactList.filter(item => {
          return item.invitationSent == false;
        });
    }
  }

  updateFilter = filter => {
    this.resetFilter(true);
    this.setState({ selectedTab: filter });
  }

  handleOnSelect = item => {
    const { emailContacts, readEmailContacts } = this.props;
    let index = emailContacts.findIndex(el => el.emailAddresses === item.emailAddresses);
    emailContacts[index] = { ...emailContacts[index], isSelectedForInvite: !item.isSelectedForInvite };
    let inviteList = emailContacts.filter(el => el.isSelectedForInvite == true);
    readEmailContacts(emailContacts);
    if (inviteList.length !== 0) {
      this.setState({ emailContactList: emailContacts, enableIndividualInvite: false, enableBulkInvite: true });
    } else {
      this.setState({ emailContactList: emailContacts, enableIndividualInvite: true, enableBulkInvite: false });
    }
  }

  handleOnInvite = item => {
    const { emailContacts, readEmailContacts } = this.props;
    this.handleEmail([item.emailAddresses[0].email]);
    let index = emailContacts.findIndex(el => el.emailAddresses === item.emailAddresses);
    emailContacts[index] = { ...emailContacts[index], isSelectedForInvite: false, invitationSent: true };
    readEmailContacts(emailContacts);
    this.setState({ emailContactList: emailContacts });
  }

  handleOnCancelInvite = item => {
    const { emailContacts, readEmailContacts } = this.props;
    let index = emailContacts.findIndex(el => el.emailAddresses === item.emailAddresses);
    emailContacts[index] = { ...emailContacts[index], isSelectedForInvite: false, invitationSent: false };
    readEmailContacts(emailContacts);
    this.setState({ emailContactList: emailContacts });
  }

  handleEmail(emailIdlist) {
    const { referralDescription, socialShareReferralContext } = this.props;
    const fitter_with_app = this.MetaConstants.getLabelByContext(socialShareReferralContext).shareMessage
    const heading = this.MetaConstants.greeting;
    const mailStr = fitter_with_app + "\n\n" + referralDescription;
    sendEmail(
      null,
      { subject: heading, body: mailStr, bcc: emailIdlist }
    ).then(() => {
      console.log('Our email successful provided to device mail ');
    });
  }

  handleBulkInvite = () => {
    const { emailContacts, readEmailContacts } = this.props;
    let emailList = emailContacts.map(contact => {
      if (!contact.invitationSent && contact.isSelectedForInvite) {
        return contact.emailAddresses[0].email
      }
    })
    this.handleEmail(emailList);
    const modifiedContacts = emailContacts.map(contact => {
      contact.invitationSent = contact.isSelectedForInvite ? true : contact.invitationSent;
      contact.isSelectedForInvite = false;
      return contact;
    })
    readEmailContacts(modifiedContacts)
    this.setState({ emailContactList: modifiedContacts, enableIndividualInvite: true, enableBulkInvite: false });
    NavigationService.goBack();
    //this.props.bulkInviteSent();
  }

  handleCancelBulkInvited = () => {
    const { emailContacts, readEmailContacts } = this.props;
    const modifiedContacts = emailContacts.map(contact => {
      contact.invitationSent = contact.isSelectedForInvite ? false : contact.invitationSent;
      contact.isSelectedForInvite = false;
      return contact;
    })
    readEmailContacts(modifiedContacts)
    this.setState({ emailContactList: modifiedContacts, enableIndividualInvite: true, enableBulkInvite: false });
  }

  resetFilter = flag => {
    const { emailContacts, readEmailContacts } = this.props;
    let modifiedContacts = emailContacts.map(contact => (
      { ...contact, isSelectedForInvite: !flag }
    ))
    readEmailContacts(modifiedContacts);
    this.setState({ emailContactList: modifiedContacts, enableIndividualInvite: flag, enableBulkInvite: !flag });
  }

  handleSearch = name => {
    const { emailContacts } = this.props;
    let modifiedContacts = emailContacts.filter(item => {
      const givenName = item.givenName ? item.givenName : "";
      const middleName = item.middleName ? item.middleName : "";
      const familyName = item.familyName ? item.familyName : "";
      return givenName.includes(name) || middleName.includes(name) || familyName.includes(name);
    });
    this.setState({ emailContactList: modifiedContacts });
  }

  renderEmptyContainer = () => {
    const noContactsMessage = this.MetaConstants.noEmailContacts;
    return (
      <View style={styles.noContactsBody}>
        <Text style={styles.noContactsText}>{noContactsMessage}</Text>
      </View>
    );
  }

  render() {
    const { enableIndividualInvite, enableBulkInvite, selectedTab } = this.state;
    const { isPulseConnectScreen } = this.props;
    const emailList = this.getContactsByTab(selectedTab);
    const headerText = this.MetaConstants.addEmailContacts;
    const skip = this.MetaConstants.skip;
    const clear = this.MetaConstants.clear;
    const selectAll = this.MetaConstants.selectAll;
    const search = this.MetaConstants.search;
    const invite = this.MetaConstants.invite;
    const cancel = this.MetaConstants.cancel;
    return (
      <View
        style={isPulseConnectScreen ? styles.pulseConnectContainer : styles.container}
      >
        {
          !isPulseConnectScreen && (
            <View>
              <PruBackHeader title={headerText} customStyles={styles.headerStyle} />
              <View style={styles.tabStyle}>
                <HealthChannelTab
                  onPress={filter => this.updateFilter(filter)}
                  selectedValue={selectedTab}
                  filters={this.headersTab}
                />
              </View>
              <TouchableOpacity
                onPress={e => {
                  e.preventDefault();
                  NavigationService.goBack();
                }}
                style={styles.skipView}
              >
                <Text style={styles.skipText}>{skip}</Text>
              </TouchableOpacity>
            </View>
          )
        }
        <KeyboardAvoidingView>
          {
            isPulseConnectScreen ? (
              <WPSearchBar
                onChange={name => this.handleSearch(name)}
                placeholder={search}
                containerStyle={styles.searchContainer}
                iconStyle={styles.searchIcon}
                textStyle={styles.inputText}
                iconSize={22}
              />
            ) : (
              <WPSearchBar
                onChange={name => this.handleSearch(name)}                
                placeholder={search}
                containerStyle={styles.searchView}
                iconStyle={{color: "#afafaf"}}
                textStyle={styles.searchText}
                iconSize={10}
              />                
              )
          }
        </KeyboardAvoidingView>
        {
          !isPulseConnectScreen && (
            <View style={styles.filterView}>
              <TouchableOpacity
                onPress={e => {
                  e.preventDefault();
                  this.resetFilter(true);
                }}
              >
                <Text style={styles.clearText}>{clear}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={e => {
                  e.preventDefault();
                  this.resetFilter(false);
                }}
              >
                <Text style={styles.selectText}>{selectAll}</Text>
              </TouchableOpacity>
            </View>
          )
        }
        <FlatList
          style={emailList.length !== 0 && enableBulkInvite ? styles.flatlistViewWithSpace : styles.flatlistView}
          contentContainerStyle={styles.flatlistContainer}
          data={emailList}
          renderItem={({ item }) => <ContactRowItem item={item} onSelected={this.handleOnSelect} onInvite={selectedTab == "Contacts" ? this.handleOnInvite : this.handleOnCancelInvite} enableInvite={enableIndividualInvite} />}
          ListEmptyComponent={this.renderEmptyContainer()}
        />
        {!isPulseConnectScreen && emailList.length !== 0 && enableBulkInvite && (
          <TouchableOpacity
            onPress={e => {
              e.preventDefault();
              if (selectedTab == "Contacts") {
                this.handleBulkInvite();
              } else {
                this.handleCancelBulkInvited();
              }

            }}
            style={styles.inviteButton}
          >
            <Text style={styles.inviteText}>{selectedTab == "Contacts" ? invite : cancel}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts.contacts,
    emailContacts: state.contacts.emailContacts,
    referralDescription: state.referralGroup.referralDescription,
    socialShareReferralContext: state.socialReferralReducer.socialShareReferralContext,
  };
};

export default connect(mapStateToProps, {
  readContacts,
  readEmailContacts,
  bulkInviteSent: () => ({
    type: "socialInvite/enableInviteDoneModal",
  }),
  updateCustomersContact,
})(SocialInvite);

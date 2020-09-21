import React, { PureComponent } from "react";
import {
  Text,
  View,
  Platform,
  PermissionsAndroid,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  BackHandler,
} from "react-native";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import Contacts from "react-native-contacts";
import { TextField } from "react-native-material-textfield";
import {
  PruTabView,
  PruBackHeader,
  ShadowWrapper,
  CustomAlert,
  PruKeyboardAvoidingView,
} from "../../../../components";
import InviteView from "../../components/InviteView";
import { ContactCard, CallOrChatActionButton } from "../../components";
import {
  updateCustomersContact,
  getCustomerContacts,
  resetCustomerContacts,
  addToSelectedContact,
  removeContact,
  clearSelectedContacts,
  createRoom,
  createChatChannel,
  createGroup,
} from "../../redux/actions";
import ContactSearch from "../../components/ContactSearch";
import { metaFinderCustomerConnect } from "../../meta";

import { scale, verticalScale } from "../../../../utils/Scale";
class NewContacts extends PureComponent {
  constructor(props) {
    super(props);
    this.TABS = [
      metaFinderCustomerConnect("pulseConnect"),
      metaFinderCustomerConnect("invite"),
    ];
    this.state = {
      isPermissionGranted: false,
      selectedTab: this.TABS[0],
      pageNo: 0,
      createGroupModal: false,
      groupName: "",
    };
    this.selectedEmails = [];
  }

  componentDidMount() {
    this.props.resetCustomerContacts();
    this.props.getCustomerContacts(0);
    if (Platform.OS === "android") {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.onAndroidBackPress
      );
    }
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.onAndroidBackPress
    );
  };

  onAndroidBackPress = () => {
    this.onBackPress();
    return true;
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.isContactsSynced != this.props.isContactsSynced &&
      !this.props.isContactsSynced
    ) {
      this.showContactSync();
    }
  }

  onBackPress = () => {
    this.props.clearSelectedContacts();
    this.props.navigation ?.goBack();
  };

  checkPermissionAndHandle = () => {
    if (Platform.OS === "android") {
      try {
        const granted = PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        );
        granted.then(res => {
          if (res === PermissionsAndroid.RESULTS.GRANTED) {
            this.readContacts();
          }
        });
      } catch (err) {
        console.warn(err);
      }
    } else {
      Contacts.checkPermission((err, permission) => {
        if (err) throw err;
        // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
        if (permission === "undefined") {
          Contacts.requestPermission((err, permission) => {
            if (permission === "authorized") {
              this.readContacts();
            }
          });
        }
        if (permission === "authorized") {
          this.readContacts();
        }
      });
    }
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
            <PruKeyboardAvoidingView>
              <TextField
                value={this.state.groupName}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={() => { }}
                onChangeText={value => {
                  this.setState({ groupName: value });
                }}
                onSubmitEditing={value => { }}
                fontSize={16}
                textColor={"#000"}
                tintColor={"#afafaf"}
                baseColor={"#afafaf"}
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
                    this.state.groupName ?.length === 0
                      ? { backgroundColor: "#A0A0A0" }
                      : null,
                  ]}
                >
                  <Text style={styles.white}>
                    {metaFinderCustomerConnect("create")}
                  </Text>
                </TouchableOpacity>
              </View>
            </PruKeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    );
  };

  readContacts = () => {
    Contacts.getAll((err, contacts) => {
      this.uploadCustomersContact(contacts);
    });
  };

  uploadCustomersContact = newContacts => {
    const { updateCustomersContact, customerContacts } = this.props;
    const modifiedContacts = newContacts
      .filter(item => {
        return item.phoneNumbers.length !== 0;
      })
      .map(contact => {
        const userDetail = {
          firstName: contact.givenName,
          surName: contact.familyName,
          contactDetails: {
            phone: {
              channel: "PHONE",
              value: contact.phoneNumbers[0].number,
            },
          },
        };
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
  };

  onContactSelect = (contact, isSelected) => {
    if (isSelected) {
      this.props.removeContact(contact.id);
    } else {
      this.props.addToSelectedContact(contact);
    }
  };

  showContactSync = async () => {
    let permission = true;
    if (Platform.OS === "android") {
      permission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );
    }
    if (!permission) {
      CustomAlert.show(
        metaFinderCustomerConnect("contactSyncTitle"),
        metaFinderCustomerConnect("contactSyncDescription"),
        {
          positiveText: metaFinderCustomerConnect("contactSyncPosText"),
          negativeText: metaFinderCustomerConnect("contactSyncNegText"),
          onPositivePress: () => {
            this.checkPermissionAndHandle();
          },
          onNegativePress: () => { },
        }
      );
    } else {
      this.checkPermissionAndHandle();
    }
  };

  onEndReached = () => {
    if (this.props.nextPage) {
      this.setState(
        prevState => ({
          pageNo: prevState.pageNo + 1,
        }),
        () => {
          this.props.getCustomerContacts(this.state.pageNo);
        }
      );
    }
  };

  renderLoader() {
    return (
      <View style={{ marginVertical: 20 }}>
        <ActivityIndicator size="large" color={"red"} />
      </View>
    );
  }

  renderContent = () => {
    const { selectedTab } = this.state;
    const { customerContacts, selectedContacts } = this.props;

    if (selectedTab === this.TABS[1]) {
      return (
        <ScrollView keyboardShouldPersistTaps="always">
          <InviteView />
        </ScrollView>
      );
    }
    return (
      <>
        <ContactSearch />
        {this.props.isContactsLoading ? (
          this.renderLoader()
        ) : customerContacts.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 30,
            }}
          >
            <Text
              style={{
                color: "#343434",
                fontSize: 16,
                textAlign: "center",
                lineHeight: 22,
              }}
            >
              None of your contacts are using Pulse App, please invite from
              Invite Tab.
            </Text>
          </View>
        ) : (
              <FlatList
                extraData={this.state && this.props}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={customerContacts}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={0.9}
                bounces={false}
                ListFooterComponent={() => {
                  return this.props.nextPage && !this.props.isLoading
                    ? this.renderLoader()
                    : false;
                }}
                renderItem={({ item }) => {
                  const isSelected = selectedContacts.find(
                    contact => contact.id === item.id
                  );
                  return (
                    <ContactCard
                      name={item.fullName}
                      email={item.email}
                      phone={item.phone}
                      thumbnail={""}
                      isSelected={isSelected}
                      onContactSelect={() => this.onContactSelect(item, isSelected)}
                    />
                  );
                }}
              />
            )}
      </>
    );
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

  initiateAction = () => {
    const { selectedContacts } = this.props;
    if (
      selectedContacts.length === 0 ||
      this.state.selectedTab !== this.TABS[0]
    ) {
      return null;
    }

    return (
      <CallOrChatActionButton
        handleOnStartCall={this.handleOnStartCall}
        handleOnStartChat={this.handleOnStartChat}
        isCallVisible={true}
        isChatVisible={true}
      />
    );
  };

  render() {
    const { createGroupModal } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: "#FFF" }}>
        <ShadowWrapper style={{ padding: 0, borderRadius: 0 }}>
          <PruBackHeader
            title={metaFinderCustomerConnect("newContactsTitle")}
            onBackPress={this.onBackPress}
          />
          <PruTabView
            tabs={this.TABS}
            selectedTab={this.state.selectedTab}
            onChange={selected => {
              this.setState({ selectedTab: selected });
            }}
          />
        </ShadowWrapper>
        {this.renderContent()}
        {this.initiateAction()}
        {createGroupModal && this.showCreateGroupModal()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  customerContacts: state.customerConnect.customerContacts.filter(
    contact => contact.email || contact.phone
  ),
  nextPage: state.customerConnect.nextPage,
  isLoading: state.trigger.isLoading,
  isContactsSynced: state.customerConnect.isContactsSynced,
  selectedContacts: state.customerConnect.selectedContacts,
  userEmail: state.profile.email,
  userPhone: state.profile.phone,
  isContactsLoading: state.customerConnect.isContactsLoading,
});

const mapDispatchToProps = {
  createRoom,
  createChatChannel,
  updateCustomersContact,
  getCustomerContacts,
  resetCustomerContacts,
  addToSelectedContact,
  createGroup,
  removeContact,
  clearSelectedContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewContacts);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
  },
  createTouchable: {
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    width: "40%",
  },
  modalSecondView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: scale(290),
    height: scale(160),
  },
  modalTopView: {
    alignItems: "center",
    backgroundColor: "#000c",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  red: {
    color: "red",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: 20,
  },
  touchableView: {
    width: "40%",
    borderColor: "red",
    borderWidth: 2,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  white: {
    color: "white",
  },
});

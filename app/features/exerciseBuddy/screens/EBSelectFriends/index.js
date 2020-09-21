import React from "react";
import { View, Platform } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import ImagePicker from "react-native-image-crop-picker";
import OpenSettings from "react-native-open-settings";
import moment from "moment";

import styles from "./styles";
import {
  GroupDetailModal,
  InviteMenu,
  ReferralInvite,
  PulseConnect,
  EBSetReminderModal,
} from "../../components";

import { CoreServices } from "@pru-rt-internal/pulse-common";
import { PruBackHeader, CustomAlert } from "../../../../components";
import EventInvite from "../../../communityEvents/screens/EventInvite";
import { metaLabelFinder } from "../../../../utils/meta-utils";
import { createGroup } from "../../actions";
import { WPDarkModal } from "../../../wellnessPlans/components";

const { NavigationService } = CoreServices;

class SelectFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: {},
      type: "",
      selectedMenu: "invite",
      showGroupModal: false,
      showCameraPicker: false,
      selectedContacts: [],
      capturedImage: "",
      groupName: "",
      selectedStartTime: moment(),
      errorMessage: "",
      isReminderEnabled: false,
      reminderTime: "8:00",
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const selectedGroup = pathOr({}, ["state", "params", "group"], navigation);
    const type = pathOr("", ["state", "params", "type"], navigation);
    this.setState({ selectedGroup, type });
  }

  handleMenuPress = item => {
    this.setState({ selectedMenu: item.type });
  };

  openCreateGroupModal = contacts => {
    const showModal = contacts.length <= 4;
    if (showModal) {
      this.setState({
        showCameraPicker: showModal,
        selectedContacts: contacts,
      });
    } else {
      CustomAlert.show("", "You can select a maximum of 4 members", {
        positiveText: "OK",
        onPositivePress: () => {},
      });
    }
  };

  handleClosePress = () => {
    this.setState({ showGroupModal: false, groupName: "" });
  };

  handleEditPress = () => {
    this.setState({ showGroupModal: false });
    WPDarkModal.show({
      Component: () => (
        <EBSetReminderModal
          negativeText="Cancel"
          positiveText="Save"
          negativePress={() => {
            WPDarkModal.hide();
          }}
          positivePress={({ isToggleOn, intervals }) => {
            this.setState({
              showGroupModal: true,
              isReminderEnabled: isToggleOn,
              reminderTime: intervals[0],
            });
            WPDarkModal.hide();
          }}
        />
      ),
    });
  };

  handleCloseReminder = () => {
    this.setState({ showGroupModal: true });
  };

  handleSetReminder = selectedTime => {
    this.setState({
      showGroupModal: true,
      selectedStartTime: selectedTime,
    });
  };

  handleGroupNameChange = text => {
    this.setState({ groupName: text, errorMessage: "" });
  };

  handleContactCancelPress = contact => {
    const { selectedContacts } = this.state;
    const modifiedContacts = selectedContacts.filter(
      item => item.email != contact.email
    );
    const showGroupModal = modifiedContacts.length !== 0;
    this.setState({ selectedContacts: modifiedContacts, showGroupModal });
  };

  renderContent = () => {
    const { auth } = this.props;
    const { selectedMenu } = this.state;
    switch (selectedMenu) {
      case "invite":
        return <ReferralInvite auth={auth} />;
      case "connect":
        return (
          <EventInvite
            isFromExerciseBuddy={true}
            onEBCreateGroupPress={this.openCreateGroupModal}
          />
        );
      case "group":
        return <PulseConnect isGroup={true} />;
    }
  };

  showCamera = () => {
    const cameraPermission = metaLabelFinder(
      "manageprofile",
      "cameraPermission"
    );
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      includeBase64: true,
      useFrontCamera: true,
      compressImageQuality: 0.8,
      photo: "photo",
    })
      .then(image => {
        this.setState({
          capturedImage: image.data,
          showCameraPicker: false,
          showGroupModal: true,
        });
      })
      .catch(error => {
        if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
          CustomAlert.show(
            "",
            cameraPermission,
            {
              positiveText: "Ok",
              onPositivePress: () => {
                OpenSettings.openSettings();
              },
            },
            {
              negativeText: "Cancel",
              onNegativePress: () => {},
            }
          );
        }
      });
  };

  getModifiedContacts = selectedContacts => {
    const modifiedContacts = selectedContacts.map(contact => {
      const temContact = {
        customer: {
          contactDetails: {
            email: {
              channel: "EMAIL",
              value: contact.email,
            },
          },
        },
      };
      return temContact;
    });
    return modifiedContacts;
  };

  handleStartPress = () => {
    const { createGroup } = this.props;
    const {
      selectedGroup,
      type,
      selectedContacts,
      capturedImage,
      groupName,
      selectedStartTime,
      isReminderEnabled,
      reminderTime,
    } = this.state;
    let level = "_0";
    switch (type) {
      case "intermediate":
        level = "_1";
        break;
      case "advanced":
        level = "_2";
        break;
    }
    const modifiedContacts = this.getModifiedContacts(selectedContacts);
    let errorMsg = "";
    if (!groupName) {
      errorMsg = "Please enter group name";
      this.setState({ errorMessage: errorMsg });
      return;
    }
    const body = {
      name: groupName,
      classification: "WorkoutBuddy",
      icon: {
        url: "image url",
        content: "base64encodedStr",
        contentType: "JPEG",
        extension: "jpg",
        filename: capturedImage,
      },
      groupActivity: {
        startTime: JSON.stringify(selectedStartTime),
      },
      tags: {
        workoutId: selectedGroup.id,
        level,
        reminderEnabled: isReminderEnabled,
        reminderTime: reminderTime,
      },
      status: selectedGroup.status,
    };
    createGroup({ body, isGroup: true, groupMembersBody: modifiedContacts });
    this.setState({ showGroupModal: false });
    NavigationService.goBack();
  };

  render() {
    const {
      selectedMenu,
      showGroupModal,
      selectedContacts,
      showCameraPicker,
      capturedImage,
      groupName,
      errorMessage,
      reminderTime,
    } = this.state;
    const selectFriendsHeader = "Select Friends";
    const menuList = [
      { type: "invite", text: "Invite" },
      { type: "connect", text: "Pulse Connect" },
      { type: "group", text: "Groups" },
    ];
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <PruBackHeader
            title={selectFriendsHeader}
            customStyles={styles.headerStyle}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.menuView}>
            <InviteMenu
              menuList={menuList}
              onMenuClick={this.handleMenuPress}
              selectedMenu={selectedMenu}
            />
          </View>
          <View style={styles.contentView}>{this.renderContent()}</View>
        </View>
        {showGroupModal && (
          <GroupDetailModal
            onChangeText={this.handleGroupNameChange}
            groupPicture={capturedImage}
            isModalVisible={showGroupModal}
            onClosePress={this.handleClosePress}
            contacts={selectedContacts}
            onContactCancelPress={this.handleContactCancelPress}
            onEditPress={this.handleEditPress}
            startTime={reminderTime}
            groupName={groupName}
            onStartPress={this.handleStartPress}
            errorMessage={errorMessage}
          />
        )}
        {showCameraPicker && this.showCamera()}
      </View>
    );
  }
}

SelectFriends.propTypes = {
  auth: PropTypes.object,
  createGroup: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { createGroup })(SelectFriends);

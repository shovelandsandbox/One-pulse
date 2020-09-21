import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Twilio from "./twilio";
import { connect } from "react-redux";
import PropType from "prop-types";
import {
  CAMERA,
  CAMERA_ACTIVE,
  MICROPHONE,
  MICROPHONE_ACTIVE,
} from "../../../../config/images";
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";
import { CoreServices, CoreActionTypes, events } from "@pru-rt-internal/pulse-common";
import Modal from "react-native-modal";
import { values, pickBy, any } from "ramda";
import styles from "./styles";
import { OfflineImage } from "react-native-image-offline";
import OpenSettings from "react-native-open-settings";
import {
  videoCallConnected,
  videoCallEnded,
  videoCallDropped,
  endChatSession,
} from "../../actions";
import screenNames from "../../configs/screenNames";
import { dispatchEvent } from "../../../../actions";
import MetaConstants from "../../meta";
import {registerEvent} from "../../../../utils/registerEvents/actions";
import {eventNames} from "../../events";

const { checkDevicePermission, grantDevicePermissions } = CoreServices;
const requiredPermissions = [
  {
    key: "camera",
    permissionKey: "camera",
    display: "Camera",
    activeImg: CAMERA_ACTIVE,
    inactiveImg: CAMERA,
  },
  {
    key: "microPhone",
    permissionKey: "micro_phone",
    display: "Microphone",
    activeImg: MICROPHONE_ACTIVE,
    inactiveImg: MICROPHONE,
  },
];
class VideoCall extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      permissions: null,
      modalVisible: false,
      areAllPermissionsAvailable: false,
    };
    this.metaConstants = { ...MetaConstants.screenMeta() };
  }

  componentDidMount() {
    this.checkRequiredPermissions().then(permissions => {
      const areAllPermissionsAvailable =
        values(pickBy(val => !val, permissions)).length === 0;

      this.setState({
        permissions,
        modalVisible: !areAllPermissionsAvailable,
        areAllPermissionsAvailable,
      });
    });
    this.props.dispatchEvent(events.TwilioVideoCallScreen);
  }

  checkRequiredPermissions = () => {
    const promises = requiredPermissions.map(item =>
      checkDevicePermission(item.permissionKey)
    );
    return Promise.all(promises).then(results => {
      const permissions = {};
      requiredPermissions.map((item, idx) => {
        permissions[item.key] = results[idx];
      });
      return permissions;
    });
  };

  hidePermissionsPopup = () => {
    this.setState({
      modalVisible: false,
    });
    this.props.goBack();
  };

  onGrantAccess = () => {
    const { permissions } = this.state;
    //have to grant access one by one - so chaining each permission promise
    //else device can't show two dialogs together
    const allPermissions = requiredPermissions.reduce(
      (promiseChain, permission) => {
        return promiseChain.then(results => {
          let currentPromise = Promise.resolve(true);
          if (!permissions[permission.key]) {
            currentPromise = grantDevicePermissions(permission.permissionKey);
          }
          return currentPromise.then(result => [...results, result]);
        });
      },
      Promise.resolve([])
    );

    allPermissions.then(results => {
      const All_Permission_Desc = this.metaConstants.all_permission_desc;
      const All_Permission_Ok = this.metaConstants.all_permission_ok;
      const All_Permission_Cancel = this.metaConstants.all_permission_cancel;
      //0 is permission granted
      const permissionDenied = any(x => !x)(results);
      if (permissionDenied) {
        CustomAlert.show("", All_Permission_Desc, {
          positiveText: All_Permission_Ok,
          onPositivePress: () => {
            this.hidePermissionsPopup();
            OpenSettings.openSettings();
          },
          negativeText: All_Permission_Cancel,
          onNegativePress: this.hidePermissionsPopup,
        });
      } else {
        this.setState({
          areAllPermissionsAvailable: true,
          modalVisible: false,
        });
      }
    });
  };

  renderPermissionsList() {
    const granted = this.metaConstants.granted;
    const not_granted = this.metaConstants.granted;

    return requiredPermissions.map(item => {
      const { permissions } = this.state;
      const hasPermission = permissions[item.key];
      return (
        <View style={styles.modalButton} key={item.key}>
          <View>
            <OfflineImage
              key="camera"
              resizeMode="contain"
              style={styles.icons}
              fallbackSource={hasPermission ? item.activeImg : item.inactiveImg}
              source={hasPermission ? item.activeImg : item.inactiveImg}
            />
          </View>
          <View style={styles.contentCenter}>
            <Text style={{...styles.modalButtonLabel, ...configureLineHeight("13")}}>
              {hasPermission
                ? item.display + `${granted}`
                : item.display + ` ${not_granted}`}
            </Text>
          </View>
        </View>
      );
    });
  }

  renderPermissionsModal = () => {
    const Camera = this.metaConstants.camera;
    const Microphone = this.metaConstants.microphone;
    const Cancel = this.metaConstants.all_permission_cancel;
    const grant_access = this.metaConstants.grant_access;
    const Need_Access_To = this.metaConstants.need_access_to;
    const And = this.metaConstants.video_and;
    return (
      <Modal
        isVisible={this.state.modalVisible}
        onBackdropPress={() => this.setState({ modalVisible: true })}
      >
        <View style={styles.modalStyle}>
          <Text style={{...styles.modalLabel, ...configureLineHeight("15")}}>
            {Need_Access_To}
            <Text style={styles.labelBold}>{Camera}</Text>
            {And}
            <Text style={styles.labelBold}>{Microphone}</Text>
          </Text>
          <View style={styles.permissionsContainer}>
            {this.renderPermissionsList()}
          </View>
          <View style={styles.modalFooterBtnContainer}>
            <TouchableOpacity
              style={styles.modalFooterBtn}
              onPress={() => {
                this.setState({ modalVisible: false });
                this.props.goBack();
              }}
            >
              <Text
                style={{
                  ...styles.modalFooterLabel,
                  ...styles.labelBold,
                  ...styles.textLeft,
                  ...configureLineHeight("13")
                }}
              >
                {Cancel}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalFooterBtn}
              onPress={e => {
                e.preventDefault();
                this.onGrantAccess();
              }}
            >
              <Text
                style={{
                  ...styles.modalFooterLabel,
                  ...styles.labelBold,
                  ...styles.textLeft,
                  ...configureLineHeight("13")
                }}
              >
                {grant_access}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  onVideoCallEnded = () => {
    const channelId = this.props.callDetails.channelId;
    this.props.registerEvent(eventNames.videoCallEnd, {
      channelId
    })
    this.props.videoCallEnded();
    this.props.endChatSession(channelId);
    // this.props.dispatchEvent(events.callEnded);
  }

  onCallConnectHandler = () => {
    this.props.onConnect();
    this.props.dispatchEvent(events.CallConnected);
  }

  onCallDropHandler = () => {
    this.props.onDrop();
    this.props.dispatchEvent(events.CallDropped);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.modalVisible && this.renderPermissionsModal()}
        {this.state.areAllPermissionsAvailable &&
          this.props.callDetails.chatToken && (
            <Twilio
              navigation={this.props.navigation}
              callDetails={this.props.callDetails}
              goBack={this.props.goBack}
              onConnect={this.onCallConnectHandler}
              onEnd={this.onVideoCallEnded}
              onDrop={this.onCallDropHandler}
            />
          )}
      </View>
    );
  }
}

VideoCall.propTypes = {
  callDetails: PropType.shape({
    chatToken: PropType.string,
    channelId: PropType.string,
  }),
};

const mapStateToProps = state => ({
  callDetails: state.videoSales.callDetails,
});

const mapDispatchToProps = {
  registerEvent,
  goBack: () => ({
    context: screenNames.TWILIO_VIDEO_CALL,
    type: CoreActionTypes.GO_BACK_TO_PREVIOUS_SCREEN,
  }),
  onConnect: videoCallConnected,
  videoCallEnded,
  endChatSession,
  onDrop: videoCallDropped,
  dispatchEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoCall);

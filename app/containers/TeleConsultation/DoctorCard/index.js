import React, { PureComponent } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { path } from "ramda";
import {
  ACCESS_GRANTED,
  AVATAR,
  CAMERA,
  CAMERA_ACTIVE,
  MICROPHONE,
  MICROPHONE_ACTIVE,
} from "../../../config/images";
import {
  metaHelpers,
  CoreActionTypes,
  CoreConfig,
  CoreConstants,
  CoreServices,
  events
} from "@pru-rt-internal/pulse-common";
import styles from "./styles";
import Modal from "react-native-modal";
import { OfflineImage } from "react-native-image-offline";
import { any, pickBy, values } from "ramda";
import OpenSettings from "react-native-open-settings";
import moment from "moment";
import { goto } from "../../../actions";
import * as ActionTypes from "../../../actions/Types";
import { dispatchEvent } from "../../../actions";

const {
  ConsultationStatus,
  CONSULTATION_TIME_OUT_VALUE,
} = CoreConstants;
const {
  pageKeys,
  TALKTOADOCTOR,
  CONSULTATION_PLACEHOLDER_FROM,
  CONSULTATION_PLACEHOLDER_TO
} = CoreConfig;
const { checkDevicePermission, grantDevicePermissions } = CoreServices;
import MetaConstants from "./meta";
import { CustomAlert } from "../../../components";
class DoctorCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      permissions: {
        camera: false,
        microPhone: false,
      },
    };
    this.docRequestFailed = "";
    this.docRequestTimeOut = "";
    this.docRequest = "";
    this.timeOut = "timedout";
    this.accepted = "accepted";
    this.failed = "failed";
    this.notesHead = "noteshead";
    this.reqSent = "";
    this.startConsultation = this.startConsultation.bind(this);

    this.consultationWaitTimer = null;
    this.callReceivetimer = null;
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userLanguagePreference !== nextProps.userLanguagePreference) {
      this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
  }

  render() {
    return (
      <View>
        {this.preparePermissionsModal()}
        {this.joinCall()}
      </View>
    );
  }

  componentDidMount() {
    this.circularProgress &&
      this.circularProgress.animate(100, CONSULTATION_TIME_OUT_VALUE);
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  onConsultationPress = () => {
    this.props.dispatchEvent(events.MyDocPreConsultationQuestionJoinCallClick)
    this.checkRequiredPermissions().then(allPermissionsAvailable => {
      if (allPermissionsAvailable) {
        this.startConsultation();
      }
    });
  };

  checkRequiredPermissions = () => {
    const permissionsMeta = this.metaConstants.permissionsMeta;
    const promises = permissionsMeta.map(item =>
      checkDevicePermission(item.key)
    );

    return Promise.all(promises).then(results => {
      const newPermissions = {};
      permissionsMeta.map((item, idx) => {
        newPermissions[item.key] = results[idx];
      });
      const allPermissionsAvailable =
        values(pickBy(val => !val, newPermissions)).length === 0;
      this.setState({
        ...this.state,
        modalVisible: !allPermissionsAvailable,
        permissions: newPermissions,
      });

      return allPermissionsAvailable;
    });
  };

  getFallbackPermissionImage = (key, active) => {
    let image = "";
    switch (key) {
      case "camera":
        image = active ? CAMERA_ACTIVE : CAMERA;
        break;
      case "micro_phone":
        image = active ? MICROPHONE_ACTIVE : MICROPHONE;
        break;
      default:
        break;
    }
    return image;
  };

  getSourcePermissionImage = (key, active) => {
    const cameraActive = this.metaConstants.cameraActive;
    const cameraInActive = this.metaConstants.cameraInActive;
    const microphoneActive = this.metaConstants.microphoneActive;
    const microphoneInActive = this.metaConstants.microphoneInActive;
    let image = "";
    switch (key) {
      case "camera":
        image = active ? cameraActive.image : cameraInActive.image;
        break;
      case "micro_phone":
        image = active ? microphoneActive.image : microphoneInActive.image;
        break;
      default:
        break;
    }
    return image;
  };

  renderPermissionsList = () => {
    const permissionsMeta = this.metaConstants.permissionsMeta;
    return permissionsMeta.map(item => {
      const { permissions } = this.state;
      const hasPermission = permissions[item.key];
      return (
        <View style={styles.modalButton} key={item.key}>
          <View style={styles.contentCenter}>
            {hasPermission && (
              <OfflineImage
                key="access_granted"
                resizeMode="contain"
                style={styles.access_icons}
                fallbackSource={ACCESS_GRANTED}
                source={ACCESS_GRANTED}
              />
            )}
          </View>
          <View>
            <OfflineImage
              key={item.key}
              resizeMode="contain"
              style={styles.icons}
              fallbackSource={this.getFallbackPermissionImage(
                item.key,
                hasPermission
              )}
              source={this.getSourcePermissionImage(item.key, hasPermission)}
            />
          </View>
          <View style={styles.contentCenter}>
            <Text style={[styles.modalButtonLabel, { flexWrap: "wrap" }]}>
              {hasPermission
                ? item.label + this.metaConstants.permGranted
                : item.label + this.metaConstants.permNotGranted}
            </Text>
          </View>
        </View>
      );
    });
  };

  hidePermissionsPopup = () => {
    this.setState({
      ...this.state,
      modalVisible: false,
    });
    this.startConsultation();
  };

  onGrantAccess = () => {
    const { permissions } = this.state;
    const permissionsMeta = this.metaConstants.permissionsMeta;

    const allPermissions = permissionsMeta.reduce(
      (promiseChain, permission) => {
        return promiseChain.then(results => {
          let currentPromise = Promise.resolve(true);
          if (!permissions[permission.key]) {
            currentPromise = grantDevicePermissions(permission.key);
          }
          return currentPromise.then(result => [...results, result]);
        });
      },
      Promise.resolve([])
    );

    allPermissions.then(results => {
      //0 is permission granted
      const permissionDenied = any(x => !x)(results);
      if (permissionDenied) {
        CustomAlert.show(
          this.metaConstants.permissionRequiredTitle,
          this.metaConstants.permissionRequiredDescription,
          {
            positiveText: this.metaConstants.permOk,
            onPositivePress: () => {
              OpenSettings.openSettings();
              this.hidePermissionsPopup();
            }
          },
          {
            negativeText: this.metaConstants.permCancel,
            onNegativePress: () => {
              this.hidePermissionsPopup();
            },
          }
        );
      } else {
        this.hidePermissionsPopup();
        this.startConsultation();
      }
    });
  };

  startConsultation() {
    this.props.startCall();
    this.clearTimer();
  }

  clearTimer = () => {
    this.callReceivetimer && clearTimeout(this.callReceivetimer);
    this.consultationWaitTimer && clearTimeout(this.consultationWaitTimer);
  };

  timeElapsed = () => {
    // return new Date() - new Date(this.props.lastRequestTimestamp);
    return moment(this.props.appointmentDate) - moment();
  };

  getStatusText = status => {
    switch (status) {
      case ConsultationStatus.REQUESTED:
        return this.notesHead;
      case ConsultationStatus.FAILED:
        return this.failed;
      case ConsultationStatus.TIMED_OUT:
        return this.timeOut;
      case ConsultationStatus.ACCEPTED:
      case ConsultationStatus.AVAILABLE:
        return this.accepted;
      default:
        return " ";
    }
  };

  navigateDoctorProfile = () => {
    this.props.goToDoctorProfile(this.props.doctorId);
  };

  componentWillReceiveProps(nextProps) {
    const doctorname = path(["payload", 0, "name"], nextProps.doctorProfile);
    if (nextProps.doctorProfile != this.props.doctorProfile && doctorname != undefined) {
      this.props.goto(pageKeys.DOCTOR_PROFILE);
    }
  }

  isConsultationInProgress = () => {
    const { appointmentDate } = this.props;
    if (appointmentDate) {
      const isRequestTimedOut =
        CONSULTATION_TIME_OUT_VALUE > moment() - moment(appointmentDate);
      return isRequestTimedOut;
    }
    return false;
  };

  preparePermissionsModal = () => {
    return (
      <Modal
        style={{ margin: 0, padding: 0 }}
        isVisible={this.state.modalVisible}
        onBackdropPress={() => this.setState({ modalVisible: false })}>
        <View style={styles.profileModalContent}>
          <View style={styles.modalStyle}>
            <Text style={styles.modalLabel}>
              {this.metaConstants.descriptionPart1}{" "}
              <Text style={styles.labelBold}>{this.metaConstants.permCamera}</Text>
              {this.metaConstants.and}{" "}
              <Text style={styles.labelBold}>{this.metaConstants.permMicrophone}</Text>{" "}
              {this.metaConstants.descriptionPart2}
            </Text>
            <View style={styles.modalButtonContainer}>
              {this.renderPermissionsList()}
            </View>
            <View style={styles.modalFooterBtnContainer}>
              <TouchableOpacity
                style={styles.modalFooterBtn}
                onPress={e => {
                  e.preventDefault();
                  this.hidePermissionsPopup();
                }}>
                <Text
                  style={[
                    styles.modalFooterLabel,
                    styles.labelBold,
                    styles.textLeft,
                  ]}>
                  {this.metaConstants.cancel}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalFooterBtn}
                onPress={e => {
                  e.preventDefault();
                  this.onGrantAccess();
                }}>
                <Text
                  style={[
                    styles.modalFooterLabel,
                    styles.labelBold,
                    styles.textRight,
                  ]}>
                  {this.metaConstants.grantAccess}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>);
  }

  // eslint-disable-next-line complexity
  joinCall() {
    const fromKey = metaHelpers.findElement(TALKTOADOCTOR, CONSULTATION_PLACEHOLDER_FROM).label;
    const toKey = metaHelpers.findElement(TALKTOADOCTOR, CONSULTATION_PLACEHOLDER_TO).label.toLowerCase();
    const { status, time, doctorName, imgBase, appointmentStatus, disableRouting } = this.props;
    return (
      <View style={styles.joinCallContainer}>
        <View style={styles.joinCallContainerItems}>
          <TouchableOpacity
            style={styles.joinCallButton}
            onPress={this.navigateDoctorProfile}>
            <View
              style={styles.joinCallDoctorProfileContainer}>
              <Image
                resizeMode="contain"
                style={{ width: "100%", height: "100%" }}
                source={imgBase ? { uri: `data:image/jpeg;base64,${imgBase}` } : AVATAR} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.doctorNameText}>
                {doctorName}
              </Text>
              <Text style={styles.timeRemainingText}>
                {!this.isConsultationInProgress()
                  ? "With 15:00"
                  : fromKey + " " +
                  moment(time).format("DD/MM/YYYY h:mm A") + " " +
                  toKey + " " +
                  moment(time)
                    .add(15, "minutes")
                    .format("DD/MM/YYYY h:mm A")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {!this.isConsultationInProgress() ? (
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTextDisabled}>
              {this.metaConstants.doctorCardCallEndedLabel}
            </Text>
          </View>
        ) : status === ConsultationStatus.AVAILABLE &&
          appointmentStatus === "joined" &&
          !disableRouting ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.onConsultationPress}>
                <View style={styles.cardTextContainer}>
                  {status !== ConsultationStatus.FAILED &&
                    status !== ConsultationStatus.TIMED_OUT && (
                      <Text style={styles.cardTextEnabled}>
                        {this.metaConstants.doctorCardJoinCallLabel}
                      </Text>
                    )}
                </View>
              </TouchableOpacity>
            ) : (
              <View
                style={styles.cardTextContainer}>
                <Text style={styles.cardTextDisabled}>
                  {this.metaConstants.doctorCardJoinCallLabel}
                </Text>
              </View>
            )}
      </View>
    );
  }
}
DoctorCard.propTypes = {
  status: PropTypes.isRequired,
  doctorName: PropTypes.string,
  time: PropTypes.string,
  appointmentDate: PropTypes.any,
};

DoctorCard.defaultProps = {
  type: "",
  status: "",
  doctorName: "",
  time: "27 May 2019 1:35 PM",
};

const mapStateToProps = state => ({
  meta: state.meta,
  doctorId: state.doctorServices.doctorId,
  status: state.doctorServices.consultationStatus,
  appointmentStatus: state.doctorServices.appointmentStatus,
  disableRouting: state.doctorServices.disableRouting,
  lastRequestTimestamp: state.doctorServices.lastRequestTimestamp,
  consultationId: state.doctorServices.consultationId,
  doctorProfile: state.doctorProfile.doctorProfile,
  appointmentDate: state.doctorServices.consultation
    ? state.doctorServices.consultation.appointmentDate
    : "",
  startTime: state.doctorServices.consultation
    ? state.doctorServices.consultation.startTime
    : "",
  endTime: state.doctorServices.consultation
    ? state.doctorServices.consultation.endTime
    : "",
  userLanguagePreference: state.userPreferences.language,
});

export default connect(mapStateToProps, {
  goto,
  dispatchEvent,
  startCall: () => ({
    context: pageKeys.DOC_SERVICE_CONSULTATION,
    type: CoreActionTypes.DOC_SERVICE_START_CALL,
  }),
  goToDoctorProfile: (doctorId) => ({
    context: pageKeys.DOCTOR_PROFILE,
    type: ActionTypes.GET_DOCTOR_PROFILE,
    payload: {
      doctorId,
    },
  }),
})(DoctorCard);

class TryAgain extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.tryAgainContainer}>
        <View style={styles.tryAgainRequestCallBlock}>
          <Text style={styles.tryAgainRequestingCallText}>
            Requesting Call
          </Text>
        </View>
        <View style={styles.tryAgainButton}>
          <TouchableOpacity onPress={this.props.submit}>
            <Text style={styles.tryAgainButtonText}>
              Try again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export { TryAgain };

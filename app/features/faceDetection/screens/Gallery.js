import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  ActivityIndicator,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pathOr } from "ramda";
import actions from "../configs/actions";
import screenNames from "../configs/screen-names";
import OpenSettings from "react-native-open-settings";
import ImagePicker from "react-native-image-crop-picker";
import Icons from "react-native-vector-icons/FontAwesome";
import { CustomAlert } from "../../../components";
import { styles } from "./style";
import { safeMetaLabelFinder } from "../../../utils/meta-utils";
import { registerEvent } from "../../../utils/registerEvents/actions";
import { eventNames } from "../events";
import {
  CoreConfig,
  CoreConstants,
  CoreServices,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";

const { NavigationService } = CoreServices;
const { SCREEN_KEY_MANAGE_PROFILE } = CoreConstants;
const {
  SCREEN_KEY_CHAT_REPORT,
  KEY_GALLERY_PERMISSION,
  SCREEN_KEY_PROFILE,
} = CoreConfig;

const KEY_OK = "ok";
const KEY_CANCEL = "cancel";
const KEY_CAMERA = "camera";
const KEY_GALLERY = "gallery";
const KEY_SELECT = "selectphoto";

class EyeDetectionGallery extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModalVisible: true,
      showCamera: false,
    };
  }

  componentDidMount() {
    this.props.registerEvent(eventNames.onGalleryLoad);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.shouldResetModal) {
      nextProps.setShouldResetModal(false);
      return {
        ...prevState,
        modalVisible: nextProps.enableGallery,
      };
    }
    return prevState;
  }

  showGallery = () => {
    const galleryPermission = metaHelpers.findElement(
      SCREEN_KEY_MANAGE_PROFILE,
      KEY_GALLERY_PERMISSION
    ).label;
    const ok = metaHelpers
      .findElement(SCREEN_KEY_CHAT_REPORT, KEY_OK)
      .label.toUpperCase();
    const cancel = metaHelpers.findElement(
      SCREEN_KEY_MANAGE_PROFILE,
      KEY_CANCEL
    ).label;
    ImagePicker.openPicker({
      mediaType: "photo",
      width: 200,
      height: 200,
      includeBase64: true,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      compressImageQuality: 0.8,
      photo: "photo",
    }).then(this.imageCallbackHandler.bind(this))
      .catch(error => {
        this.setState({
          modalVisible: false,
          showCamera: false,
        });
        if (error.code === "E_PICKER_CANCELLED") {
          this.props.setShouldResetModal(true);
        }
        if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
          CustomAlert.show(
            "",
            galleryPermission,
            {
              positiveText: ok,
              onPositivePress: () => {
                OpenSettings.openSettings();
              },
            },
            {
              negativeText: cancel,
              onNegativePress: () => {},
            }
          );
        }
      });
  };

  imageCallbackHandler = image => {
    this.setState({
      modalVisible: false,
      showCamera: false,
    });
    const data = {
      base64: image.data,
    };
    this.props.registerEvent(eventNames.savePictureApi);
    this.props.savePicture(data);
  };

  closeCamera = () => {
    this.props.registerEvent(eventNames.closeModal);
    NavigationService.navigate("MainTab");
  };

  renderLoadScreen = () => {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#FF0266" />
        <Text
          style={{
            fontSize: 14,
            lineHeight: 19,
            alignSelf: "center",
            textAlign: "center",
            paddingHorizontal: 10,
          }}
          numberOfLines={2}
        >
          {safeMetaLabelFinder("healthAI", "loadCameraText")}
        </Text>
      </View>
    );
  };

  showErrorMessage = () => {
    CustomAlert.show(
      "",
      safeMetaLabelFinder("healthAI", "eyeMonitoringErrorMsg"),
      {
        positiveText: safeMetaLabelFinder("healthAI", "okay"),
        onPositivePress: () => {
          this.props.hideErrorMessage();
          this.closeCamera();
        },
      }
    );
  };

  renderErrorModal = () => {
    const { showErrorMessage } = this.props;
    if (showErrorMessage) {
      this.props.registerEvent(eventNames.errorModal);
      this.showErrorMessage();
    }
  };

  render() {
    this.renderErrorModal();
    if (this.props.showLoadingText) {
      return this.renderLoadScreen();
    }
    return (
      <Modal visible={this.state.modalVisible}>
        <TouchableOpacity
          style={styles.profileModalContent}
          onPress={() => {
            this.setState({ modalVisible: false });
            this.closeCamera();
          }}
        >
          <View style={styles.modalStyle}>
            <Text style={styles.modalLabel}>
              {metaHelpers.findElement(SCREEN_KEY_PROFILE, KEY_SELECT).label}
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalLeftButton}
                onPress={e => {
                  e.preventDefault();
                  this.setState(
                    {
                      modalVisible: false,
                      showCamera: true,
                    },
                    () => {
                      this.props.registerEvent(eventNames.onCameraClick);
                      this.props.goToFaceDetection();
                    }
                  );
                }}
              >
                <View style={styles.link}>
                  <Icons name="camera" size={50} color="#ed1b2e" />
                </View>
                <Text style={styles.modalButtonLabel}>
                  {
                    metaHelpers.findElement(SCREEN_KEY_PROFILE, KEY_CAMERA)
                      .label
                  }
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalRightButton}
                onPress={e => {
                  e.preventDefault();
                  this.props.registerEvent(eventNames.onGalleryClick);
                  this.showGallery();
                }}
              >
                <View style={styles.link}>
                  <Icons name="photo" size={50} color="#ed1b2e" />
                </View>
                <Text style={styles.modalButtonLabel}>
                  {
                    metaHelpers.findElement(SCREEN_KEY_PROFILE, KEY_GALLERY)
                      .label
                  }
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

EyeDetectionGallery.propTypes = {
  savePicture: PropTypes.func,
  goToFaceDetection: PropTypes.func,
  showLoadingText: PropTypes.bool,
  shouldResetModal: PropTypes.bool,
  setShouldResetModal: PropTypes.func,
  enableGallery: PropTypes.bool,
  registerEvent: PropTypes.func,
  showErrorMessage: PropTypes.bool,
  hideErrorMessage: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    showLoadingText: state.faceDetection.showLoadingText,
    enableButtonClick: pathOr(
      true,
      ["meta", "countryCommonMeta", "faceDetection", "enableButtonClick"],
      state
    ),
    enableGallery: pathOr(
      false,
      ["meta", "countryCommonMeta", "faceDetection", "enableGallery"],
      state
    ),
    shouldResetModal: state.faceDetection.shouldResetModal,
    showErrorMessage: state.faceDetection.showErrorMessage,
  };
};

export default connect(mapStateToProps, {
  registerEvent,
  savePicture: (pictureInfo, enableButtonClick) => ({
    context: screenNames.FACE_DETECTION,
    type: actions.savePicture,
    payload: {
      pictureInfo,
    },
    disableTimeout: true,
    mode: enableButtonClick ? "manual" : "auto",
  }),
  setShouldResetModal: shouldReset => ({
    type: actions.shouldResetModal,
    context: screenNames.FACE_DETECTION,
    payload: {
      shouldResetModal: shouldReset,
    },
  }),
  goToFaceDetection: () => ({
    type: "GO_TO_SCREEN",
    navigateTo: screenNames.faceDetection,
    payload: {
      params: { sourceType: "gallery" },
    },
  }),
  hideErrorMessage: () => ({
    type: actions.hideErrorMessage,
    context: screenNames.FACE_DETECTION,
  }),
})(EyeDetectionGallery);

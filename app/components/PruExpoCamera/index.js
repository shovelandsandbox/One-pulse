/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from "react";
import {
  Alert,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { PropTypes } from "mobx-react";
// import { Camera as PruCamera } from "expo-camera";
import * as Permissions from "expo-permissions";
import OpenSettings from "react-native-open-settings";
import { pathOr } from "ramda";
import {
  CoreConfig,
  CoreConstants,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";
import { EYE_CAMERA_ICON } from "../../config/images";
const { width } = Dimensions.get("window");

const { SCREEN_KEY_MANAGE_PROFILE } = CoreConstants;
const { KEY_CAMERA_PERMISSION } = CoreConfig;
class PruCameraComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isCameraReady: false,
      isCameraPermissionGranted: false,
      type: pathOr("front", ["cameraSettings", "type"], this.props),
    };
  }

  async componentDidMount() {
    const { cameraMounted } = this.props;
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      const cameraPermission = metaHelpers.findElement(
        SCREEN_KEY_MANAGE_PROFILE,
        KEY_CAMERA_PERMISSION
      ).label;
      Alert.alert("", cameraPermission, [
        {
          text: "OK",
          onPress: () => {
            OpenSettings.openSettings();
            this.props.closeCamera && this.props.closeCamera();
          },
        },
        {
          text: "cancel",
          style: "cancel",
          onPress: () => {
            this.props.closeCamera && this.props.closeCamera();
          },
        },
      ]);
    } else {
      this.setState({
        isCameraPermissionGranted: true,
      });
      cameraMounted && cameraMounted();
    }
  }

  takePicture = async function(type) {
    const {
      uploadPicture,
      pauseCapture,
      takePictureOptions,
      resetTakePicture,
      onTakePicture,
    } = this.props;
    onTakePicture && onTakePicture(type);
    if (this.camera) {
      try {
        pauseCapture && pauseCapture();
        const data = await this.camera.takePictureAsync(takePictureOptions);
        if (data) {
          uploadPicture && uploadPicture(data);
        }
      } catch (error) {
        resetTakePicture && resetTakePicture();
        console.log("Health AI : capture failed ", error);
      }
    }
  };

  onCameraToggle = () => {
    if (this.state.type === "front") {
      this.setState({
        type: "back",
      });
    } else {
      this.setState({
        type: "front",
      });
    }
  };

  startTakingPicture = () => {
    const { takePictureCheck } = this.props;
    setTimeout(() => {
      if (!takePictureCheck || takePictureCheck()) {
        this.takePicture("auto");
      }
    }, 2000);
  };

  renderErrorModal = () => {
    const { showErrorMessage, shouldTakePicture } = this.props;
    if (showErrorMessage && shouldTakePicture && shouldTakePicture()) {
      this.takePicture();
    }
  };

  render() {
    const { isCameraPermissionGranted, isCameraReady, type } = this.state;
    const {
      cameraSettings,
      enableButtonClick,
      enableCameraToggle,
    } = this.props;
    const { zoom, whiteBalance, focusDepth } = cameraSettings;
    if (!isCameraPermissionGranted) {
      return null;
    }
    this.renderErrorModal();
    return (
      <View style={styles.wrapper}>
        {/* <PruCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.container}
          type={type}
          zoom={zoom}
          whiteBalance={whiteBalance}
          focusDepth={focusDepth}
          onCameraReady={() => {
            this.setState({
              isCameraReady: true,
            });
            if (!enableButtonClick) {
              this.startTakingPicture();
            }
          }}
        /> */}
        {enableButtonClick && isCameraReady && (
          <React.Fragment>
            <View style={styles.closeOuter}></View>
            <View style={styles.closeInner}></View>
            <View style={styles.absoluteFill}>
              <TouchableOpacity
                style={styles.close}
                onPress={() => {
                  this.takePicture("buttonClick");
                }}
              ></TouchableOpacity>
            </View>
          </React.Fragment>
        )}
        {enableCameraToggle && isCameraReady && (
          <React.Fragment>
            <TouchableOpacity
              style={styles.toggleIcon}
              onPress={() => {
                this.onCameraToggle();
              }}
            >
              <Image source={EYE_CAMERA_ICON} />
            </TouchableOpacity>
          </React.Fragment>
        )}
      </View>
    );
  }
}

PruCameraComponent.propTypes = {
  pauseCapture: PropTypes.func,
  resetTakePicture: PropTypes.func,
  enableButtonClick: PropTypes.bool,
  uploadPicture: PropTypes.func,
  shouldTakePicture: PropTypes.func,
  takePictureOptions: PropTypes.objectOrObservableObject,
  cameraSettings: PropTypes.object,
  takePictureCheck: PropTypes.func,
  screenId: PropTypes.string,
  cameraMounted: PropTypes.func,
  onTakePicture: PropTypes.func,
  showErrorMessage: PropTypes.bool,
  enableCameraToggle: PropTypes.bool,
  closeCamera: PropTypes.func,
};

PruCameraComponent.defaultProps = {
  cameraSettings: {
    type: "front",
    zoom: 0,
    whiteBalance: "auto",
    focusDepth: 0,
  },
  takePictureOptions: {
    quality: 0.1,
    base64: true,
  },
};

export default PruCameraComponent;

const styles = StyleSheet.create({
  absoluteFill: {
    bottom: 30,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    width: width,
  },
  close: {
    backgroundColor: "#bbbebe",
    borderRadius: 30,
    bottom: 40,
    height: 60,
    left: width / 2 - 30,
    position: "absolute",
    width: 60,
    zIndex: 27,
  },
  toggleIcon: {
    bottom: 60,
    position: "absolute",
    right: 20,
    zIndex: 27,
  },
  // eslint-disable-next-line react-native/no-color-literals
  closeInner: {
    backgroundColor: "white",
    borderRadius: 35,
    bottom: 65,
    height: 70,
    left: width / 2 - 35,
    position: "absolute",
    width: 70,
  },
  // eslint-disable-next-line react-native/no-color-literals
  closeOuter: {
    backgroundColor: "white",
    borderRadius: 40,
    bottom: 60,
    height: 80,
    left: width / 2 - 40,
    position: "absolute",
    width: 80,
  },
  container: {
    height: "100%",
    width: "100%",
  },
  wrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
});

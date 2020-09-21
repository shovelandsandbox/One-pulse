/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from "react";
import { Alert, View, StyleSheet, TouchableOpacity } from "react-native";
// import { RNCamera } from "react-native-camera";
// import { Camera as RNCamera } from "expo-camera";
import * as Permissions from "expo-permissions";
import PropTypes from "prop-types";
import PruIcon from "../PruIcon";
import OpenSettings from "react-native-open-settings";
import {
  CoreConfig,
  CoreConstants,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";

const { SCREEN_KEY_MANAGE_PROFILE } = CoreConstants;
const { KEY_CAMERA_PERMISSION } = CoreConfig;

class PruCamera extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isCameraReady: false,
      isCameraPermissionGranted: false,
    };
  }

  async componentDidMount() {
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
            this.props.closeCamera();
          },
        },
        {
          text: "cancel",
          style: "cancel",
          onPress: () => {
            this.props.closeCamera();
          },
        },
      ]);
    } else {
      this.setState({
        isCameraPermissionGranted: true,
      });
    }
  }

  takePicture = async function() {
    if (this.camera) {
      const options = {
        base64: true,
        // quality: this.props.quality,
        // height: 501,
        // width: 500,
      };
      const data = await this.camera.takePictureAsync(options);
      data.base64 = data.base64.replace(/(?:\r\n|\r|\n)/g, "");
      this.props.setPicture(data);
    }
  };

  render() {
    const { isCameraReady, isCameraPermissionGranted } = this.state;
    if (!isCameraPermissionGranted) {
      return null;
    }
    return (
      <View style={{ flex: 1 }}>
        {/* <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          onCameraReady={() =>
            this.setState({
              isCameraReady: true,
            })
          }
          style={styles.container}
          type={this.props.type}
          autoFocus={this.props.autoFocus}
          zoom={this.props.zoom}
          whiteBalance={this.props.whiteBalance}
          focusDepth={this.props.focusDepth}
        > */}
          <View style={StyleSheet.absoluteFill}>
            <View style={styles.close}>
              <TouchableOpacity
                onPress={() => {
                  this.props.closeCamera();
                }}
              >
                <PruIcon name="cancel" size={40} color="white" />
              </TouchableOpacity>
            </View>

            {isCameraReady && (
              <View
                style={{
                  backgroundColor: "transparent",
                  flexDirection: "row",
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  bottom: 20,
                  width: "100%",
                  flex: 1,
                }}
              >
                <View style={styles.circle}>
                  <TouchableOpacity
                    style={styles.innerCircle}
                    onPress={this.takePicture.bind(this)}
                  ></TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        {/* </RNCamera> */}
      </View>
    );
  }
}

PruCamera.propTypes = {
  autoFocus: PropTypes.string,
  focusDepth: PropTypes.string,
  type: PropTypes.string,
  zoom: PropTypes.number,
  whiteBalance: PropTypes.string,
  closeCamera: PropTypes.func,
  setPicture: PropTypes.func,
  quality: PropTypes.number,
};

PruCamera.defaultProps = {
  autoFocus: "on",
  type: "front",
  whiteBalance: "auto",
  zoom: 0,
  focusDepth: 0,
  quality: 0.1,
};

export default PruCamera;

const styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 50,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  close: {
    paddingTop: 50,
    paddingRight: 25,
    alignItems: "flex-end",
  },
  container: {
    backgroundColor: "#000",
    flex: 1,
    paddingTop: 10,
  },

  innerCircle: {
    borderRadius: 50,
    borderWidth: 1,
    height: 48,
    width: 48,
  },
});

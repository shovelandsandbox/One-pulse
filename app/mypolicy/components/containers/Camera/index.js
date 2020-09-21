import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
// import { Camera as RNCamera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";
import Styles from "./style";
import { Base as BaseContainer } from "../index";
import { metaHelpers } from "@pru-rt-internal/pulse-common";

const TYPE_CLAIM = "mpolicyClaim";
const KEY_TAKE_PICTURE = "step_4_add_document";

const PERMISSION_AUTHORIZED = "authorized";
const CAMERA_PERMISSION = "camera";

class Camera extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    loading: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      isAuthorized: false,
      isAuthorizationChecked: false,
      clicked: false
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      this.props.closeCamera();
    }
  }

  capture = async function() {
    if (this.camera) {
      const options = { quality: 1, base64: true, width: 1280, height: 960 };
      const data = await this.camera.takePictureAsync(options);

      if (this.props.onCaptured) {
        this.props.onCaptured(data);
      }
    }
  };

  renderCamera() {
    const { loading } = this.props;
    return (
      <View style={Styles.camera.container}>
        <View style={Styles.camera.scanner.container}>
          {/* {loading ? null : (
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={Styles.camera.main}
              type={RNCamera.Constants.Type.back}
            />
          )} */}
        </View>

        <View style={Styles.camera.marker.container}>
          <View>
            <View style={Styles.camera.marker.layer} />

            <View style={Styles.camera.marker.middleGrouper}>
              <View style={Styles.camera.marker.layer} />
              {loading ? (
                <ActivityIndicator />
              ) : (
                <View
                  style={[
                    Styles.camera.marker.area,
                    {
                      width: this.props.width - 5,
                      height: this.props.height - 5
                    }
                  ]}
                />
              )}

              <View style={Styles.camera.marker.layer} />
            </View>

            <View style={Styles.camera.marker.layer} />
          </View>
        </View>
      </View>
    );
  }

  renderControl() {
    const { clicked } = this.state;
    return (
      <View style={Styles.control.container}>
        <TouchableOpacity
          style={Styles.control.circle}
          activeOpacity={clicked ? 1 : 0.8}
          onPress={() =>
            clicked
              ? {}
              : this.setState({ clicked: true }, () => this.capture())
          }
        >
          <View style={Styles.control.innerCircle} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <BaseContainer
        onBackPress={() => navigation.pop()}
        static
        title={claimMeta(KEY_TAKE_PICTURE).label}
        noSubtitleMargin
        bottomOrder={5}
        noBottomPadding
      >
        {this.renderCamera()}

        {this.renderControl()}
      </BaseContainer>
    );
  }
}

const claimMeta = key => {
  return metaHelpers.findElement(TYPE_CLAIM, key);
};

export default withNavigation(Camera);

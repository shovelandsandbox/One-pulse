import React, { PureComponent } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Modal,
  Dimensions,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Colors from "../../affinity-groups/utils/colors";
import ImagePicker from "react-native-image-crop-picker";
import OpenSettings from "react-native-open-settings";
import {
  CAMERA,
  UPLOAD,
  CANCEL,
} from "../../../../assets/images/affinityGroup";
import { metaFinderAG } from "../../affinity-groups/utils/meta-utils";

const imageURLPrefix = "data:image/png;base64,";

class UploadImages extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      singleFileObject: {},
      fileUploaded: false,
      replaceImage: props.replaceImage,
      changeImage: false,
    };
  }

  componentWillUnmount() {
    this.setState({
      replaceImage: false,
    });
  }

  cancelPicSelectModal = () => {
    const { fileUploaded } = this.state;
    this.setState({
      replaceImage: false,
    });
    !fileUploaded && this.props.onCancel();
  };

  setProfilePicSelectModal = () => {
    this.setState({
      replaceImage: true,
      changeImage: true,
    });
  };

  imageCallbackHandler = image => {
    image &&
      this.setState(
        {
          singleFileObject: image,
          fileUploaded: true,
          replaceImage: false,
        },
        () => {}
      );
    image && this.props.onUpload(image);
  };

  showGallery() {
    ImagePicker.openPicker({
      mediaType: "photo",
      includeBase64: true,
      compressImageQuality: 0.8,
      photo: "photo",
    })
      .then(this.imageCallbackHandler.bind(this))
      .catch(error => {
        if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
          Alert.alert(
            "",
            "galleryPermission",
            [
              { text: "ok", onPress: () => OpenSettings.openSettings() },
              { text: "cancel", style: "cancel" },
            ],
            { cancelable: false }
          );
        }
      });
  }

  showCamera = () => {
    ImagePicker.openCamera({
      useFrontCamera: true,
      includeBase64: true,
      compressImageQuality: 0.8,
      photo: "photo",
    })
      .then(this.imageCallbackHandler.bind(this))
      .catch(error => {
        if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
          Alert.alert(
            "",
            "cameraPermission",
            [
              { text: "ok", onPress: () => OpenSettings.openSettings() },
              { text: "cancel", style: "cancel" },
            ],
            { cancelable: false }
          );
        }
      });
  };

  prepareProfilePicSelectModal = () => {
    return (
      <View style={styles.modalButtonContainer}>
        <View style={styles.uploadButtonContainer}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={e => {
              e.preventDefault();
              this.showGallery();
            }}
          >
            <View style={styles.link}>
              <Image source={UPLOAD} style={styles.uploadIcon} />
            </View>
          </TouchableOpacity>
          <Text style={styles.textStyle}>{this.state.changeImage ? metaFinderAG("changeImage") : metaFinderAG("uploadPhoto")}</Text>
        </View>
        <View style={styles.uploadButtonContainer}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={e => {
              e.preventDefault();
              this.showCamera();
            }}
          >
            <View style={styles.link}>
              <Image source={CAMERA} style={styles.cameraIcon} />
            </View>
          </TouchableOpacity>
          <Text style={styles.textStyle}>{metaFinderAG("takePhoto")}</Text>
        </View>
      </View>
    );
  };

  removeAttachment = () => {
    this.setState({
      replaceImage: false,
      fileUploaded: false,
      singleFileObject: {},
    });
    this.props.onCancel();
  };

  renderUploadedFile = () => {
    const { singleFileObject } = this.state;
    // const { width, height } = singleFileObject;
    // const aspectRatio = width / height || 1.7;
    // const aspectRatio = 1.8;

    return (
      <ImageBackground
        style={[
          styles.uploadButtonContainer,
          {
            backgroundColor: "#000",
            height: 120,
          },
        ]}
        resizeMode={"cover"}
        imageStyle={{ opacity: 0.5 }}
        source={{ uri: imageURLPrefix.concat(singleFileObject.data) }}
      >
        <TouchableOpacity
          onPress={this.setProfilePicSelectModal}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>Change Image</Text>
        </TouchableOpacity>
        <View style={styles.optionsStyle}></View>
      </ImageBackground>
    );
  };

  ProfilePicSelectModal = () => {
    const { replaceImage } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={replaceImage}
        style={styles.modalContainer}
      >
        <View style={styles.postContainer}>
          <View style={styles.selectPicContainer}>
            <View>{this.prepareProfilePicSelectModal()}</View>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={this.cancelPicSelectModal}
            >
              <Image source={CANCEL} style={styles.cancelIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const { fileUploaded, replaceImage } = this.state;
    return (
      <View style={styles.baseContainer}>
        {replaceImage && this.ProfilePicSelectModal()}
        {fileUploaded && this.renderUploadedFile()}
        {/* {!fileUploaded && this.prepareProfilePicSelectModal()} */}
      </View>
    );
  }
}

UploadImages.propTypes = {
  onUpload: PropTypes.func,
  replaceImage: PropTypes.bool,
  onCancel: PropTypes.func,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UploadImages);

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 10,
    top: 10,
  },
  buttonTitle: {
    color: Colors.white,
    fontFamily: "Avenir-Regular",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  cameraIcon: {
    height: 41,
    width: 52,
  },
  cancelIcon: {
    height: 20,
    width: 20,
  },
  link: {
    alignItems: "center",
    borderColor: Colors.red,
    borderRadius: 5,
    height: 60,
    justifyContent: "center",
    width: 60,
  },
  modalButton: {
    borderColor: Colors.lightGrey,
    borderRadius: 5,
    borderWidth: 0.5,
    padding: 15,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
    paddingHorizontal: 15,
  },
  modalCloseButton: {
    alignItems: "center",
    paddingVertical: 25,
  },
  modalContainer: {
    alignSelf: "flex-end",
    flexDirection: "column",
    justifyContent: "center",
    margin: 0,
    padding: 0,
  },
  optionsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  postContainer: {
    backgroundColor: Colors.transparentBlack,
    height: window.height,
    justifyContent: "flex-end",
    width: window.width,
  },
  selectPicContainer: {
    backgroundColor: Colors.white,
    flexDirection: "column",
    height: "33%",
    justifyContent: "flex-end",
    paddingBottom: 10,
    width: "100%",
  },
  textStyle: {
    color: Colors.darkGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 16,
    paddingVertical: 10,
    textAlign: "center",
  },
  uploadButtonContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 10,
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  uploadIcon: {
    height: 41,
    width: 41,
  },
  uploadImage: {
    width: "100%",
    height: 120,
  },
});

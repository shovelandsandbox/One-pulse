/* eslint-disable complexity */
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import Icons from "react-native-vector-icons/FontAwesome";
import SIcons from "react-native-vector-icons/SimpleLineIcons";
import styles from "./styles";
import Modal from "react-native-modal";
import ImagePicker from "react-native-image-crop-picker";
import OpenSettings from "react-native-open-settings";
// import chatbotActions from "../../configs/chatbot-actions";
import { connect } from "react-redux";
import { CoreConfig, metaHelpers } from "@pru-rt-internal/pulse-common";
import Toast from "react-native-root-toast";

const {
  SCREEN_KEY_MANAGE_PROFILE,
  SCREEN_KEY_CHAT_REPORT,
  KEY_CAMERA_PERMISSION,
  KEY_GALLERY_PERMISSION,
} = CoreConfig;

const showToast = (message, onHidden) =>
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onHidden: onHidden ? onHidden : null,
  });

const CaptureIdOcr = ({
  value,
  label,
  placeholder,
  readOnly,
  style,
  onChange,
  pickerLabels: { camera, gallery, instructions, imageSizeWarning } = {},
  settings = {
    ocrImageSettings: {},
    hidePickerIcon: false,
  },
  //dispatch: { fetchOcrData },
  fetchOcrData,
  testID,
}) => {
  const KEY_OK = "ok";
  const KEY_CANCEL = "cancel";
  const placeHolderText = placeholder;
  const [showSpinner, setShowSpinner] = useState(false);
  const [inputValue, setInputValue] = useState(value || {});
  const [idPickerModalVisible, setIdPickerModalVisible] = useState(false);
  const valueChanged = data => {
    if (
      data &&
      !data.failed &&
      data.attributes &&
      data.attributes.isValid === "true"
    ) {
      setInputValue(data);
      onChange && onChange(data);
    }
  };
  const imagePickerQuality =
    Platform.OS === "ios"
      ? settings.compressImageQualityIos
      : settings.compressImageQualityAndroid;

  const imagePickerSettings = {
    width: 1200,
    height: 1200,
    compressImageMaxWidth: 1200,
    compressImageMaxHeight: 1200,
    includeBase64: true,
    photo: "photo",
    ...(settings.ocrImageSettings || {}),
    ...((imagePickerQuality && { compressImageQuality: imagePickerQuality }) ||
      {}),
  };
  console.log("[imagePickerSettings]", imagePickerSettings);

  // Need to uncomment to enable size check
  // const maxImageSizeAllowed = settings.maxImageSizeAllowed || 5120 * 1024; // 5120 KBs  or 5 MB

  const onChangeIdManually = text => {
    setInputValue({ id: text, source: "manual" });
    onChange && onChange({ id: text, source: "manual" });
  };

  useEffect(() => {
    setInputValue(value || {});
  }, [value]);

  const getOcrResponseFromMiddleware = async imageData => {
    const ocrResponse = await fetchOcrData(imageData);
    if (ocrResponse && !ocrResponse.isCleared) {
      if (ocrResponse.failed) {
        throw ocrResponse;
      } else {
        return { ...ocrResponse, source: "ocr" };
      }
    }
  };

  const handleKtpIDImageCamera = () => {
    const cameraPermission = metaHelpers.findElement(
      SCREEN_KEY_MANAGE_PROFILE,
      KEY_CAMERA_PERMISSION
    ).label;
    const ok = metaHelpers
      .findElement(SCREEN_KEY_CHAT_REPORT, KEY_OK)
      .label.toUpperCase();
    const cancel = metaHelpers.findElement(
      SCREEN_KEY_MANAGE_PROFILE,
      KEY_CANCEL
    ).label;
    ImagePicker.openCamera(imagePickerSettings)
      .then(response => {
        setIdPickerModalVisible(false);

        if (response.data) {
          // Need to uncomment to enable size check
          // if (response.data.size && response.data.size > maxImageSizeAllowed) {
          //     showToast(imageSizeWarning && imageSizeWarning.replace(/\{0\}/gi, `${maxImageSizeAllowed / (1024 * 1024)}`));
          //     return;
          // }
          const imageData = response.data.toString();
          setShowSpinner(true);
          // APi request for OCR data
          getOcrResponseFromMiddleware(imageData)
            .then(data => {
              console.log("[set-data]", data);
              valueChanged(data);
            })
            .catch(data => {
              console.log(data);
            })
            .finally(() => {
              console.log("[finally]");
              setShowSpinner(false);
            });
        }
      })
      .catch(error => {
        if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
          Alert.alert(
            "",
            cameraPermission,
            [
              { text: ok, onPress: () => OpenSettings.openSettings() },
              { text: cancel, style: "cancel" },
            ],
            { cancelable: false }
          );
        }
      });
  };

  const handleKtpIDImageGallery = () => {
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
    ImagePicker.openPicker(imagePickerSettings)
      .then(response => {
        setIdPickerModalVisible(false);

        if (response.data) {
          // Need to uncomment to enable size check
          // if (response.data.size && response.data.size > maxImageSizeAllowed) {
          //     showToast(imageSizeWarning && imageSizeWarning.replace(/\{0\}/gi, `${maxImageSizeAllowed / (1024 * 1024)}`));
          //     return;
          // }
          setShowSpinner(true);
          const imageData = response.data.toString();
          // APi request for OCR data
          getOcrResponseFromMiddleware(imageData)
            .then(data => {
              console.log(data);
              valueChanged(data);
            })
            .catch(data => {
              console.log(data);
            })
            .finally(() => {
              console.log("[finally]");
              setShowSpinner(false);
            });
        }
      })
      .catch(error => {
        if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
          Alert.alert(
            "",
            galleryPermission,
            [
              { text: ok, onPress: () => OpenSettings.openSettings() },
              { text: cancel, style: "cancel" },
            ],
            { cancelable: false }
          );
        }
      });
  };
  const renderPickIdModal = () => {
    return (
      <View>
        <Modal
          isVisible={idPickerModalVisible}
          transparent={true}
          hideModalContentWhileAnimating={true}
          onBackdropPress={() => setIdPickerModalVisible(false)}
          onBackButtonPress={() => setIdPickerModalVisible(false)}
        >
          <View style={styles.modalStyle}>
            <Text style={styles.modalLabel}>
              {instructions || "Select photo from"}
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalLeftButton}
                onPress={e => {
                  e.preventDefault();
                  handleKtpIDImageCamera();
                }}
              >
                <View style={styles.link}>
                  <Icons name="camera" size={50} color="#ed1b2e" />
                </View>
                <Text style={styles.modalButtonLabel}>
                  {camera || "Camera"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalRightButton}
                onPress={e => {
                  e.preventDefault();
                  handleKtpIDImageGallery();
                }}
              >
                <View style={styles.link}>
                  <Icons name="photo" size={50} color="#ed1b2e" />
                </View>
                <Text style={styles.modalButtonLabel}>
                  {gallery || "Gallery"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={{ ...style, alignItems: "stretch" }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={{ flexDirection: "row" }}>
        <TextInput
          value={inputValue.id}
          onChangeText={onChangeIdManually}
          placeholder={placeHolderText}
          style={[styles.input, { alignSelf: "flex-start", width: "90%" }]}
          editable={!readOnly}
          testID={testID}
          accessibilityLabel={testID}
          accessible={true}
        />
        {settings.hidePickerIcon || readOnly ? null : (
          <TouchableOpacity
            style={{ alignSelf: "flex-end", width: "10%", bottom: 1, right: 2 }}
            onPress={() => {
              setIdPickerModalVisible(true);
            }}
          >
            {showSpinner ? (
              <ActivityIndicator
                style={{ alignSelf: "flex-end" }}
                size="large"
                color="#EF182B"
              />
            ) : (
              <SIcons
                style={{ alignSelf: "flex-end", marginBottom: 3 }}
                name="camera"
                size={22}
                color="#EF182B"
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      {renderPickIdModal()}
    </View>
  );
};

export default connect(null, dispatch => {
  return {
    dispatch: {
      fetchOcrData: image => dispatch(this.props.fetchOcrData(image)),
    },
  };
})(CaptureIdOcr);

/* eslint-disable react/require-optimization */
import PropTypes from "prop-types";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewPropTypes,
  Image,
  Platform,
} from "react-native";
import moment from "moment";
import ImagePicker from "react-native-image-crop-picker";

import { CustomAlert } from "../../../components";

import DocumentPicker from "react-native-document-picker";
import { events } from "@pru-rt-internal/pulse-common";
import { metaFinderCustomerConnect as metaFinderVideoSales } from "../meta";

export default class ChatMenuActions extends React.Component {
  constructor(props) {
    super(props);
  }

  async SingleFilePicker(onSend) {
    const upload_pdf_image = metaFinderVideoSales("upload_pdf_image");
    const OK = metaFinderVideoSales("all_permission_ok");
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      if (res.type === "application/pdf" || res.type === "image/jpeg") {
        onSend(
          res.uri,
          res.name,
          res.type === "application/pdf" ? "pdf" : "image"
        );
      } else {
        CustomAlert.show("", upload_pdf_image, {
          positiveText: OK,
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }

  onActionsPress = () => {
    const { navigatePayment, buttonIndex, onSend, platformEvent } = this.props;
    const Cancel = "Cancel";
    switch (buttonIndex) {
      case 0:
        let options = [];
        if (Platform.OS === "ios") {
          options = ["Document (PDF)", "Image (JPG/PNG)", Cancel];
        } else {
          options = ["Document (PDF/JPG/PNG)", Cancel];
        }
        const cancelButtonIndex =
          Platform.OS === "ios" ? options.length - 1 : options.length;
        this.context.actionSheet().showActionSheetWithOptions(
          {
            options,
            destructiveButtonIndex: 2,
            cancelButtonIndex,
          },
          async Index => {
            const { onSend, platformEvent } = this.props;
            switch (Index) {
              case 0:
                this.SingleFilePicker(onSend);
                events.documentUpload.attributes.type = "singleFilePicker";
                platformEvent(events.documentUpload);
                break;
              case 1:
                this.SingleImagePicker(onSend);
                events.documentUpload.attributes.type = "singleImagePicker";
                // platformEvent(events.documentUpload);
                break;
              default:
            }
          }
        );
        break;
      case 1:
        this.openCamera(onSend);
        events.documentUpload.attributes.type = "openCamera";
        platformEvent(events.documentUpload);
        break;
      case 2:
        navigatePayment();
        break;
      default:
    }
  };

  SingleImagePicker = onSend => {
    ImagePicker.openPicker({
      mediaType: "photo",
      includeBase64: true,
      compressImageQuality: 0.8,
    })
      .then(data => {
        onSend(data.data, data.filename, "image", "ios");
      })
      .catch(() => { });
  };

  openCamera = onSend => {
    const cameraConfig = {
      includeBase64: true,
      compressImageQuality: 0.8,
      photo: "photo",
    };

    ImagePicker.openCamera(cameraConfig)
      .then(image => {
        onSend(
          image.data,
          `IMG_${moment(new Date()).valueOf()}.png`,
          "image",
          "ios"
        );
      })
      .catch(() => { });
  };

  renderIcon = () => {
    if (this.props.renderIcon) {
      return this.props.renderIcon();
    }
    return (
      <TouchableOpacity onPress={() => this.onActionsPress()}>
        <Image source={this.props.imgUrl} style={styles.icon} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={this.onActionsPress}
      >
        {this.renderIcon()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 26,
    marginBottom: 10,
    marginLeft: 5,
    width: 26,
  },
  icon: {
    height: 20,
    resizeMode: "contain",
    width: 20,
  },
  iconText: {
    backgroundColor: "transparent",
    color: "#b2b2b2",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  wrapper: {
    borderColor: "#b2b2b2",
    borderRadius: 13,
    borderWidth: 2,
    flex: 1,
  },
});

ChatMenuActions.contextTypes = {
  actionSheet: PropTypes.func,
};

ChatMenuActions.defaultProps = {
  onSend: () => { },
  options: {},
  renderIcon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
};

ChatMenuActions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  renderIcon: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  iconTextStyle: Text.propTypes.style,
};

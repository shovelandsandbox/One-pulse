import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes,
  Text,
  View,
} from "react-native";
import { IMG_THUMBNAIL, PDF_NEW } from "../../../config/images";
import { scale } from "../../../utils/Scale";
export default class Thumbnail extends PureComponent {
  render() {
    const {
      containerStyle,
      currentMessage,
      imageStyle,
      imageProps,
      onPress,
      onLongPress,
    } = this.props;
    const paymentLinkTextStyle =
      currentMessage.user._id === 1
        ? styles.paymentLinkLeftStyle
        : styles.paymentLinkRightStyle;

    if (
      currentMessage.fileType !== "image" &&
      currentMessage.fileType !== "pdf" &&
      currentMessage.fileType !== "payment-link"
    ) {
      return null;
    }

    if (currentMessage.fileType !== "payment-link") {
      return (
        <TouchableOpacity
          style={styles.overLay}
          onLongPress={() => onLongPress(this.context, currentMessage)}
          onPress={() => {
            onPress(currentMessage);
          }}
        >
          <Image
            style={styles.image}
            source={
              currentMessage.fileType === "image" ? IMG_THUMBNAIL : PDF_NEW
            }
          />
          <View style={styles.seperator} />
          <View
            style={[
              currentMessage.user._id === 1
                ? styles.rightWrap
                : styles.leftWrap,
              styles.fileNameWrap,
            ]}
          >
            {currentMessage.fileName.split("").map(letter => (
              <Text
                key={letter}
                style={[
                  currentMessage.user._id === 1
                    ? styles.rightStyle
                    : styles.leftStyle,
                  styles.attachmentNameStyle,
                ]}
              >
                {letter}
              </Text>
            ))}
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.paymentLinkContainer}>
        <Text style={paymentLinkTextStyle}>
          To pay{" "}
          <Text
            style={styles.bold}
          >{`${currentMessage.msgAttrs?.currency} ${currentMessage.msgAttrs?.paymentAmount}`}</Text>{" "}
          for your insurance Policy{" "}
          <Text style={styles.bold}>{currentMessage.msgAttrs?.policyName}</Text>{" "}
          please click to pay
        </Text>
        <View
          style={[
            styles.border,
            {
              backgroundColor: "#C0c0c0",
            },
          ]}
        ></View>
        <TouchableOpacity
          onPress={() => {
            onPress(currentMessage);
          }}
        >
          <Text style={[paymentLinkTextStyle, styles.payText]}>PAY</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    width: "100%",
    height: 0.5,
    marginTop: 6,
  },
  bold: { fontWeight: "bold" },
  payText: {
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 4,
  },
  attachmentNameStyle: {
    fontSize: 12,
    lineHeight: 16.7,
    color: "#4a5464",
  },
  container: { width: 110 },
  fileNameWrap: { flexDirection: "row", flexWrap: "wrap", width: "70%" },
  image: {
    borderRadius: 13,
    height: 41,
    margin: 3,
    resizeMode: "cover",
    width: 35.9,
  },
  imageActive: {
    flex: 1,
    resizeMode: "contain",
  },
  leftStyle: {
    fontFamily: "Avenir-Regular",
    textAlign: "left",
  },
  leftWrap: { marginRight: 10, paddingLeft: 10 },
  mapView: {
    borderRadius: 13,
    height: 80,
    margin: 3,
    width: 150,
  },
  overLay: {
    backgroundColor: "#cccccc",
    borderRadius: 6.7,
    flexDirection: "row",
    alignItems: "center",
    margin: 9.3,
    justifyContent: "center",
  },
  paymentLinkContainer: {
    height: 80,
    padding: 6,
    width: scale(240),
  },
  paymentLinkLeftStyle: {
    color: "#fff",
    fontSize: 13,
    paddingLeft: 10,
    textAlign: "left",
  },
  paymentLinkRightStyle: {
    color: "#2f2f2f",
    fontSize: 13,
    paddingRight: 10,
    textAlign: "left",
  },
  rightStyle: {
    fontFamily: "Avenir-Regular",
    textAlign: "right",
  },
  rightWrap: { marginRight: 10, paddingRight: 10 },
  seperator: {
    borderLeftColor: "#4a5464",
    borderLeftWidth: 0.7,
    height: "80%",
    marginLeft: 8.3,
    marginRight: 12.8,
  },
  webview: {
    flex: 1,
  },
});

Thumbnail.defaultProps = {
  mapViewStyle: {},
  currentMessage: {
    image: null,
    file_type: null,
    template: null,
    template_html: null,
  },
  containerStyle: {},
  imageStyle: {},
};

Thumbnail.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  mapViewStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  imageProps: PropTypes.object,
};

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
import { PDF_THUMBNAIL, IMG_THUMBNAIL } from "../../../config/images";
export default class Thumbnail extends PureComponent {
  
  render() {
    const { containerStyle, currentMessage, imageStyle, imageProps, onPress, onLongPress } = this.props;
    const paymentLinkTextStyle = currentMessage.user._id === 1 ?
      styles.paymentLinkLeftStyle : styles.paymentLinkRightStyle;

    if (currentMessage.fileType !== "image" && currentMessage.fileType !== "pdf"
      && currentMessage.fileType !== "payment-link") {
      return null;
    }

    if (currentMessage.fileType !== "payment-link") {
      return (
        <TouchableOpacity
          style={[styles.container, containerStyle]}
          onLongPress={() => onLongPress(this.context,currentMessage)}
          onPress={() => {
            onPress(currentMessage);
          }}
        >
          <Image
            {...imageProps}
            style={[styles.image, imageStyle]}
            source={currentMessage.fileType === "image" ? IMG_THUMBNAIL : PDF_THUMBNAIL}
          />
          <Text
            style={currentMessage.user._id === 1 ? styles.rightStyle : styles.leftStyle}>
            {currentMessage.fileName}
          </Text>
        </TouchableOpacity>
      )
    } 
      return (
        <View style={styles.paymentLinkContainer}>
          <Text style={paymentLinkTextStyle}>
            Please click here to pay premium amount
          </Text>
          <Text></Text>
          <TouchableOpacity onPress={() => {
            onPress(currentMessage);
          }}>
            <Text style={[paymentLinkTextStyle, { textDecorationLine: "underline" }]}>
              Pay Now
            </Text>
          </TouchableOpacity>
        </View>
      );
    
  }
}

const styles = StyleSheet.create({
  container: { width: 110 },
  image: {
    borderRadius: 13,
    height: 100,
    margin: 3,
    resizeMode: "cover",
    width: 100,
  },
  imageActive: {
    flex: 1,
    resizeMode: "contain",
  },
  leftStyle: {
    color: "#000",
    fontFamily: "Avenir-Regular",
    textAlign: "left",
    paddingLeft: 10
  },
  mapView: {
    borderRadius: 13,
    height: 80,
    margin: 3,
    width: 150,
  },
  paymentLinkContainer: {
    height: 80,
    width: 200,
    padding: 6
  },
  paymentLinkLeftStyle: {
    color: "#fff",
    textAlign: "left",
    paddingLeft: 10,
    fontSize: 15,
  },
  paymentLinkRightStyle: {
    color: "#000",
    textAlign: "left",
    paddingRight: 10,
    fontSize: 15,
  },
  rightStyle: {
    color: "#fff",
    fontFamily: "Avenir-Regular",
    textAlign: "right",
    paddingRight: 10
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

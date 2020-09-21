import React, { PureComponent } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import ConnectedPruShare from "./ConnectedPruShare";
import { CLOSE } from "../../config/images";
import PropTypes from "prop-types";

export default class PruShareModal extends PureComponent {
  render() {
    if (!this.props.visible) {
      return null;
    }
    return (
      <Modal
        transparent={true}
        animationType="slide"
        style={styles.modalContainer}
      >
        <View style={styles.mainContainer}>
          <View style={styles.shareContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.titleText}>{this.props.title}</Text>
              <TouchableOpacity
                onPress={this.props.onClose}
                style={styles.closeButton}
              >
                <Image source={CLOSE} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.optionsContainer}>
              <ConnectedPruShare
                config={this.props.config}
                userAgent={this.props.userAgent}
                onDone={this.props.onClose}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

PruShareModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  config: PropTypes.object,
  userAgent: PropTypes.object,
};
/* eslint-disable react-native/no-color-literals */
const window = Dimensions.get("window");

const styles = StyleSheet.create({
  closeButton: {
    width: 25,
  },
  closeIcon: {
    height: 18,
    width: 18,
  },
  headerContainer: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  mainContainer: {
    backgroundColor: "rgba(0,0,0,0.3)",
    height: window.height,
    justifyContent: "flex-end",
  },
  modalContainer: {
    alignSelf: "flex-end",
    flexDirection: "column",
    height: window.height,
    justifyContent: "center",
    margin: 0,
    padding: 0,
  },
  optionsContainer: {
    flex: 1,
    paddingBottom: 5,
  },
  shareContainer: {
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "column",
    height: 120,
    justifyContent: "center",
    paddingBottom: 20,
  },
  titleText: {
    color: "#393939",
    flex: 1,
    fontFamily: "Avenir-Black",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
    paddingLeft: 12,
    paddingTop: 2,
    textAlign: "center",
  },
});

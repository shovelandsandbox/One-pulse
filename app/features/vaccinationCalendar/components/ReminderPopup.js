import React, { Component, useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";

const ReminderPopup = props => {
  const showModal = props.showModal || false;
  const toggleModal = props.toggle || (() => {});
  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.bottomView}>
        <View style={styles.popupView}>
          <Text style={styles.modalText}>Add information!</Text>

          <View style={styles.bottomRow}>
            <TouchableHighlight
              style={styles.cancelLink}
              onPress={() => {
                toggleModal(!showModal);
              }}
            >
              <Text style={styles.cancelText}>Not Now</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#ec1c2e" }}
            >
              <Text style={styles.textStyle}>Check now</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReminderPopup;

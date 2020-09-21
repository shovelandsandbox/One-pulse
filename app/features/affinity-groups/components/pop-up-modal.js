import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../utils/colors";
import Modal from "react-native-modal";
import { metaFinderAG } from "../utils/meta-utils";

const PopUpModal = ({ config = {}, style = {} }) => {
  const [state, setState] = useState({ showModal: config.showModal });

  const onButtonPress = () => {
    setState({ showModal: false });
    config.onPress();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={state.showModal}
      style={Styles.modalStyle}
    >
      <View style={[Styles.modalContainer, style]}>
        <View style={Styles.modalView}>
          <View>
            <Icon
              raised
              name={config.icon}
              color={config.iconColor}
              size={50}
            />
          </View>
          <View style={Styles.modalMessage}>
            <Text style={Styles.modalText}>{config.modalText}</Text>
          </View>
          <TouchableOpacity onPress={onButtonPress} style={Styles.modalButton}>
            <Text style={Styles.buttonText}>
              {config.buttonTitle || metaFinderAG("close")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

PopUpModal.propTypes = {
  config: PropTypes.string,
  style: PropTypes.object,
};

const window = Dimensions.get("window");

const Styles = StyleSheet.create({
  buttonText: {
    alignItems: "center",
    color: Colors.white,
    fontFamily: "Avenir-Regular",
    fontSize: 12,
    fontWeight: "bold",
    justifyContent: "center",
  },
  modalButton: {
    alignItems: "center",
    backgroundColor: Colors.red,
    borderRadius: 20,
    height: 30,
    justifyContent: "center",
    marginLeft: 5,
    marginTop: 5,
    width: 80,
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: Colors.transparentBlack,
    flex: 1,
    height: window.height,
    justifyContent: "center",
    width: window.width,
  },
  modalMessage: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  modalStyle: {
    margin: 0,
    padding: 0,
  },
  modalText: {
    color: Colors.lightGrey,
    fontFamily: "Avenir-Regular",
    textAlign: "center",
  },
  modalView: {
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 20,
    position: "absolute",
    width: "85%",
  },
});

export default PopUpModal;

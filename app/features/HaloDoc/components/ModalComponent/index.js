
import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    Text,
} from "react-native";
import Modal from "react-native-modal";
import styles from './styles'
import metaConstants from "../../meta";


 const ModalComponent = props => {
    let ModalMeta = { ...metaConstants.talkToDoctorMeta() }
    const Done = ModalMeta.Done
    return (
        <Modal
            visible={props.isVisible}
            transparent={true}
            style={styles.modalStyle}
        >
            <View style={styles.modalContainerStyle}>
                <View style={styles.modalWrapperStyle}>
                    <View style={styles.modalDoneButtonContainerStyle}>
                        <TouchableOpacity
                            style={styles.modalDoneButtonStyle}
                            onPress={props.onDonePress}
                        >
                            <Text style={styles.modalDoneTextStyle}>
                                {Done}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {props.children}
                </View>
            </View>
        </Modal>
    );
};

  
  export default ModalComponent
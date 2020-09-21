import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import { CLOSE, MEDICINE_STOCK } from "../../../../config/images";
import styles from "./styles";
import { path } from "ramda"
import { Theme } from "../../../../themes";
const { Colors } = Theme;

export default class ProductModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { selectedProduct } = this.props;
        return (
            <Modal
                visible={this.props.visible}
                hasBackdrop={true}
                backdropOpacity={2}
                backdropColor={Colors.black}
                onRequestClose={() => {
                    this.props.onClose;
                }}
                style={styles.modalContainer}
            >
                <View style={styles.container}>
                    <View style={styles.containerView}>
                        <Image
                            style={styles.image}
                            source={{ uri: path(["imageUrl"], selectedProduct) }}
                        />
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={styles.medicineName}>
                            {path(["identifier", 0, "value"], selectedProduct)}
                        </Text>
                        <Text style={styles.medicineName}>
                            {/* {path(["identifier", 0, "value", "description"], selectedProduct)} */}
                            {path(["identifier", 0, "type", "text"], selectedProduct)}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.onClose();
                            }}
                            style={styles.button}
                        >
                            <Image style={styles.closeIcon} source={CLOSE} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

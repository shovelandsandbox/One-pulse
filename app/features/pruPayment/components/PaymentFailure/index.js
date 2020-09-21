import React from "react";
import { Text, View } from "react-native";
import AntIcons from "react-native-vector-icons/AntDesign"
import PropTypes from "prop-types";
import styles from "./styles";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const PaymentFailure = ({ message }) => {
    return (
        <View style={styles.container}>
            <AntIcons
                style={{}}
                pointerEvents="none"
                name="checkcircle"
                size={35}
                color={Colors.pulseRed}
            />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

PaymentFailure.propTypes = {
    message: PropTypes.string,
};

export default PaymentFailure;

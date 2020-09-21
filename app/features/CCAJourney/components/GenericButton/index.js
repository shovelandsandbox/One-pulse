import React, { Component } from 'react';
import { Text, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from "prop-types";
import { GenericButtonStyles as styles } from "./styles";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

class GenericButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { label, onPress, backgroundColor, labelColor, widthOffset, labelSize, labelHeight, position, height, disabled } = this.props
        const screenWidth = Dimensions.get("window").width
        return (
            <TouchableOpacity
                disabled={disabled ? disabled : false}
                onPress={onPress}
                style={[styles.buttonBg, {
                    backgroundColor: backgroundColor ? backgroundColor : Colors.alizarin,
                    paddingVertical: height ? height : 14,
                    width: widthOffset ? screenWidth/widthOffset : screenWidth/2.5,
                    alignSelf: position ? position : "center"
                }]}
            >
                <Text
                    style={[styles.buttonText, {
                        color: labelColor ? labelColor : Colors.white,
                        fontSize: labelSize ? labelSize : 15,
                        lineHeight: labelHeight ? labelHeight : 18.75
                    }]}>
                    {label}
                </Text>
            </TouchableOpacity>
        )
    }
}

GenericButton.PropTypes = {
    backgroundColor: PropTypes.string,
    label: PropTypes.string,
    labelColor: PropTypes.string,
    labelHeight: PropTypes.number,
    onPress: PropTypes.func,
    widthOffset: PropTypes.string || PropTypes.number,
    height: PropTypes.string || PropTypes.number,
    labelSize: PropTypes.number,
    position: PropTypes.string,
    disabled: PropTypes.bool
};

export default GenericButton;


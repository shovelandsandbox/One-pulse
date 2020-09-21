import React, { Component } from 'react';
import { ImageBackground, Text, Image, TouchableOpacity } from "react-native";
import { HeaderStyles as styles } from "./styles";
import PropTypes from "prop-types";
import { foodSearchImages } from "../../images";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { onBackPress, headerTitle } = this.props

        return (
            <ImageBackground source={foodSearchImages.header} resizeMode="cover"
                style={styles.headerImgBg}>
                <TouchableOpacity onPress={onBackPress} style={styles.headerBackImgView}>
                    <Image source={foodSearchImages.whiteBackArrow} resizeMode="contain"
                        style={styles.headerBackImg}
                    />
                </TouchableOpacity>

                <Text style={styles.headerText}>{headerTitle}</Text>
            </ImageBackground>
        )
    }
}

Header.PropTypes = {
    onBackPress: PropTypes.func,
    headerTitle: PropTypes.string,
};

export default Header;
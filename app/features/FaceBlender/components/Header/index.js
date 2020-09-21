import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";
import { HeaderStyles as styles } from "./styles";
import PropTypes from "prop-types";
import { faceBlendImages } from "../../images";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { onBackPress, headerMainTitle, onCrossPress } = this.props

        return (
            <View style={styles.headerContainer}>

                {onBackPress &&
                    <TouchableOpacity style={styles.backImgView} onPress={onBackPress}>
                        <Image style={styles.headerLeftImage} source={{ uri: faceBlendImages.back }} />
                    </TouchableOpacity>
                }

                <Text style={styles.headerMainTitleText}>{headerMainTitle}</Text>

                {onCrossPress &&
                    <TouchableOpacity style={styles.crossImgView} onPress={onCrossPress}>
                        <Image style={styles.headerRightImage} source={{ uri: faceBlendImages.cross }} />
                    </TouchableOpacity>
                }

            </View>
        )
    }
}

Header.PropTypes = {
    onBackPress: PropTypes.func,
    headerMainTitle: PropTypes.string,
    onCrossPress: PropTypes.func,
};

export default Header;
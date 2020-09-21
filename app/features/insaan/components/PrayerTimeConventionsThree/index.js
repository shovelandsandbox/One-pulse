import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import PropTypes from 'prop-types'
import { DETAIL_ARROW } from "../../../../config/images"
import { conventionsThree as styles } from "./styles";


class PrayerTimeConventionsThree extends Component {
    render() {
        let { Texts, infoText, labelText, flag, onPress } = this.props;

        return (

            <TouchableOpacity onPress={onPress} >
                <View
                    style={styles.container1}>
                    <View style={styles.container2}>
                        <Text style={styles.Text}>
                            {Texts}
                        </Text>
                        <View style={{
                            marginTop: 7,
                        }}>
                            <Text style={styles.labelText}>{labelText}</Text>
                            <Text style={styles.infoText}>{infoText}</Text>
                        </View>
                    </View>
                    {
                        flag && <Image
                            style={{
                                height: 12.8,
                                width: 7.1,
                                background: "#979797",
                                marginTop: 7.1,
                            }}
                            source={DETAIL_ARROW} />
                    }

                </View>
            </TouchableOpacity >
        )

    }
}
PrayerTimeConventionsThree.PropTypes = {
    Texts: PropTypes.string,
    labelText: PropTypes.string,
    infoText: PropTypes.string,
    flag: PropTypes.bool,
};


export default PrayerTimeConventionsThree
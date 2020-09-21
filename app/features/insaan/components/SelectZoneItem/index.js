import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import PropTypes from 'prop-types'
import { INSAAN_CHECKBOX_ACTIVE, INSAAN_CHECKBOX_INACTIVE } from "../../../../config/images"
import {ZoneItemStyle as styles} from "./styles"


class SelectZoneItem extends Component {
    render() {
        let { labelText, isSelected, onSelected } = this.props;
        return (
            <View style={styles.container1}>
                <TouchableOpacity
                    style={styles.container2}
                    onPress={() => {


                        onSelected && onSelected({ labelText })
                    }}>
                    <Text style={styles.labelText}>
                        {labelText}
                    </Text>
                    {
                        isSelected
                            ? <Image
                                style={styles.checkboxActive}
                                source={INSAAN_CHECKBOX_ACTIVE} />

                            : <Image
                                style={styles.checkboxInactive}
                                source={INSAAN_CHECKBOX_INACTIVE} />
                    }
                </TouchableOpacity>
            </View>
        )
    }
}

SelectZoneItem.PropTypes = {
    labelText: PropTypes.string,
    onSelected: PropTypes.func,
    isSelected: PropTypes.bool
};

export default SelectZoneItem
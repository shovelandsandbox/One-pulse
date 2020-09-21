import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import PropTypes from 'prop-types';
import { INSAAN_CHECKBOX_ACTIVE, INSAAN_CHECKBOX_INACTIVE } from "../../../../config/images"
import { ConventionItemStyle as styles } from "./styles";

class PrayerTimeConventionsItem extends Component {
    render() {
        let { labelText, onSelected, isSelected, prayerInfoText } = this.props;
        return (
            <TouchableOpacity
                onPress={() => {
                    onSelected && onSelected()
                }}>

                <View style={styles.labelText}>
                    <View style={styles.container1}>
                        <Text style={styles.label}>{labelText}</Text>
                        <Text style={styles.prayerInfo}>{prayerInfoText}</Text>
                    </View>
                    {
                        isSelected
                            ? <Image
                                style={styles.checkboxActive}
                                source={INSAAN_CHECKBOX_ACTIVE} />

                            : <Image
                                style={styles.checkboxInactive}
                                source={INSAAN_CHECKBOX_INACTIVE} />
                    }
                </View>

            </TouchableOpacity>
        )
    }
}
PrayerTimeConventionsItem.PropTypes = {
    prayerInfoText: PropTypes.string,
    labelText: PropTypes.string,
    infoText: PropTypes.string,
    onSelected: PropTypes.func,
    isSelected: PropTypes.bool,
};
export default PrayerTimeConventionsItem
/* eslint-disable */
import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Switch, Platform } from "react-native";
import PropTypes from "prop-types";
import { INSAAN_CHECKBOX_ACTIVE, INSAAN_CHECKBOX_INACTIVE } from '../../../../config/images';
import { SelectStateStyle as styles } from "./styles";


export default class SelectStateItem extends Component {

    render() {
        const { labelText, isSelected, onSelected, item } = this.props;

        return <View style={styles.container1}>
            <TouchableOpacity onPress={() => {


                onSelected && onSelected(item)
            }}>
                <View style={styles.container2}>
                    <Text style={{
                        flex: 1,
                        width: 235,
                        height: 22,
                        color: isSelected ? '#ED1B2E' : '#515B61',
                        fontFamily: 'Avenir',
                        fontSize: 16,
                        fontWeight: '900',
                        lineHeight: 22,
                    }}>
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
                </View>
            </TouchableOpacity>
            <View style={{
                backgroundColor: '#d9dcde',
                height: 1,
            }} />
        </View >
    }
}

SelectStateItem.PropTypes = {
    labelText: PropTypes.string,
    onSelected: PropTypes.func,
    isSelected: PropTypes.bool,
}

SelectStateItem.defaultProps = {
    isSelected: false,
}
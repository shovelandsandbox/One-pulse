/* eslint-disable */
import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Switch, Platform } from "react-native";
import { CHECKBOX_ACTIVE } from '../../config/images';
import PropTypes from "prop-types";

/**
 * 选择类型的 Cell
 * isSelected:      控制初始选中状态，默认为 false
 * labelText:       左侧文字内容
 * onSelected:      选中时触发的事件
 * onDeselected:    反选时触发的事件
 */

export default class SelectionCell extends Component {

    render() {
        const { labelText, isSelected, onSelected, onDeselected } = this.props;
        return <View style={{ width: '100%' }}>
            <TouchableOpacity onPress={() => {
                if (onSelected && onDeselected) {
                    if (!isSelected) {
                        // Selected
                        onSelected && onSelected()
                        return
                    }
                    // Deselected
                    onDeselected && onDeselected()
                    return
                }

                onSelected && onSelected()
            }}>
                <View style={{
                    flexDirection: 'row',
                    height: 64,
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        flex: 1,
                        // height: 22,
                        color: isSelected ? '#ED1B2E' : '#515B61',
                        fontFamily: 'Avenir',
                        fontSize: 16,
                        fontWeight: '900',
                        // lineHeight: 22,
                    }}>
                        {labelText}
                    </Text>
                    {
                        isSelected && <Image
                            style={{
                                width: 22,
                                height: 22,
                                borderRadius: 11,
                            }}
                            source={CHECKBOX_ACTIVE} />
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

SelectionCell.PropTypes = {
    labelText: PropTypes.string,
    onSelected: PropTypes.func,
    onDeselected: PropTypes.func,
    isSelected: PropTypes.bool,
}

SelectionCell.defaultProps = {
    isSelected: false,
}
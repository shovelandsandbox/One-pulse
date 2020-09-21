/* eslint-disable */
import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Switch, Platform, Dimensions } from "react-native";
import { CHECKBOX_ACTIVE } from '../../config/images';
import PropTypes from "prop-types";
import { configureLineHeight } from "../../utils/lineHeightsUtils";
const sw = Dimensions.get('window').width
/**
 * 选择类型的 Cell
 * isSelected:      控制初始选中状态，默认为 false
 * labelText:       左侧文字内容
 * onSelected:      选中时触发的事件
 * onDeselected:    反选时触发的事件
 */

export default class SelectionFilterCell extends Component {

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
                    height: 60,
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                    <Text
                        style={{
                            ...{
                            flex: 1,
                            color: isSelected ? '#ED1B2E' : '#515B61',
                            fontFamily: 'Avenir',
                            fontSize: 14,
                            fontWeight: '600',
                            lineHeight: 22,
                            marginLeft: 40,
                            marginRight: isSelected ? 15 : 55,
                            width: sw - 80,
                            },
                            ...configureLineHeight("14")
                        }}
                        numberOfLines={2}
                    >
                        {labelText}
                    </Text>
                    {
                        isSelected && <Image
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 11,
                                marginRight: 19,
                                resizedMode: 'stretch',
                            }}
                            source={CHECKBOX_ACTIVE} />
                    }
                </View>
            </TouchableOpacity>
            <View style={{
                backgroundColor: '#d9dcde',
                height: 1,
                marginLeft: 20,
                marginRight: 20,
            }} />
        </View >
    }

}

SelectionFilterCell.PropTypes = {
    labelText: PropTypes.string,
    onSelected: PropTypes.func,
    onDeselected: PropTypes.func,
    isSelected: PropTypes.bool,
}

SelectionFilterCell.defaultProps = {
    isSelected: false,
}
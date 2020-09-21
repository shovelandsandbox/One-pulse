import React, { Component } from 'react'
import { View, Image, TouchableWithoutFeedback, Text, Animated, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { CLOSE_ICON } from '../../config/images'

const COLOR_TEXT = '#EC1226'
// const COLOR_INACTIVE = '#515B61'
const FF_AVENIR = 'Avenir'
const COLOR_RECT_BG = '#FEF3F4'

export default class FilterPillButton extends Component {
    render() {
        const { onPressAction } = this.props
        return (
            <TouchableOpacity
                onPress={() => {
                    onPressAction && onPressAction()
                }}
                activeOpacity={0.4}
            >
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    marginLeft: 8,
                    marginBottom: 8,
                    backgroundColor: COLOR_RECT_BG,
                    borderRadius: 20,
                    height: 20,
                }}>
                    <Text style={{
                        color: COLOR_TEXT,
                        alignSelf: 'center',
                        fontFamily: FF_AVENIR,
                        fontSize: 14,
                        fontWeight: '600'
                    }}>
                        {this.props.title}
                    </Text>
                    <Image
                        style={{
                            marginLeft: 8,
                            width: 8,
                            height: 8,
                            alignSelf: 'center',
                            tintColor: COLOR_TEXT,
                        }}
                        source={CLOSE_ICON}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}

FilterPillButton.PropTypes = {
    title: PropTypes.string.isRequired,
    onPressAction: PropTypes.func,
}
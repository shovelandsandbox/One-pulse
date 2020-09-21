import React, { Component } from 'react'
import { View, Image, TouchableWithoutFeedback, Text, Animated, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { UNIVERSE_DOWN_ARROW } from '../../config/images'

const COLOR_ACTIVE = '#ED1B2E'
const COLOR_INACTIVE = '#515B61'
const FF_AVENIR = 'Avenir'

export default class FoldableSectionHeaderCell extends Component {

    render() {
        const { isFolded, isEmpty, onFoldAction, section } = this.props
        return (<View>
            <TouchableOpacity
                activeOpacity={0.40}
                onPress={() => {
                    onFoldAction && onFoldAction(isFolded)
                }}
            >
                <View style={[
                    {
                        flex: 1,
                        height: 60,
                        justifyContent: 'center',
                        flexDirection: 'column',
                    },
                    this.props.style
                ]}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                color: isEmpty ? COLOR_INACTIVE : COLOR_ACTIVE,
                                fontWeight: isEmpty ? '800' : '500',
                                fontFamily: FF_AVENIR,
                                paddingLeft: 20,
                                paddingRight: 20,
                                alignSelf: 'center',
                                letterSpacing: 0.25,
                                flex: 1
                            }}
                            numberOfLines={2}
                        >
                            {section ? section : ' '}
                        </Text>
                        {/* <View style={{ flex: 1 }} /> */}
                        <Animated.Image
                            style={{
                                width: 16,
                                height: 12,
                                resizedMode: 'stretch',
                                alignSelf: 'center',
                                marginRight: 20,
                                transform: [
                                    { rotate: isFolded ? '0deg' : '180deg' }
                                ]
                            }}
                            source={UNIVERSE_DOWN_ARROW}
                        />
                    </View>
                </View>
            </TouchableOpacity>
            {isFolded && <View style={{
                backgroundColor: '#d9dcde',
                height: 1,
                marginLeft: 20,
                marginRight: 20,
            }} />}
        </View>
        )
    }
}

FoldableSectionHeaderCell.PropTypes = {
    isFolded: PropTypes.bool,
    isEmpty: PropTypes.bool,
    onFoldAction: PropTypes.func,
    section: PropTypes.string,
}

FoldableSectionHeaderCell.defaultProps = {
    isFolded: true,
    isEmpty: true
}
import React, { PureComponent } from "react";
import {
    View,
    TouchableOpacity,
    Image,
    Text,
} from "react-native";
import PropTypes from 'prop-types'
import { TO_USER_LOCATION } from '../../config/images'

export default class MapFloatingButton extends PureComponent {
    render() {

        const { style, onPress, icon, iconTintColor } = this.props

        return (
            <View style={[style, {
                borderRadius: 65535,
                shadowColor: '#000',
                shadowOpacity: 0.15,
                shadowOffset: {
                    width: 0,
                    height: 1,
                }
            }]}>
                <TouchableOpacity style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center'
                }}
                    onPress={() => {
                        onPress && onPress()
                    }}
                >
                    {/* <Text style={{
                        alignSelf: 'center',
                        fontSize: 20,
                    }}>L</Text> */}
                    {icon && <Image style={{
                        width: '60%',
                        height: '60%',
                        alignSelf: 'center',
                        tintColor: iconTintColor || '#515B61'
                    }}
                        source={icon} />
                    }
                </TouchableOpacity>
            </View>
        )

    }
}

MapFloatingButton.PropTypes = {
    onPress: PropTypes.func.isRequired,
    icon: PropTypes.string,
    iconTintColor: PropTypes.string,
}
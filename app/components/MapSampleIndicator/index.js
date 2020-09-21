import React, { PureComponent } from "react";
import {
    View,
    Text,
    Image,
} from "react-native";
import {
    MAP_SAMPLE_CLINIC,
    MAP_SAMPLE_HOSPITAL,
} from '../../config/images';


export default class MapSampleIndicator extends PureComponent {

    _displayIconForTitle(t) {
        switch (t) {
            case 'Hospital':

                return MAP_SAMPLE_HOSPITAL
            case 'Clinic':
                return MAP_SAMPLE_CLINIC;

            default:
                break;
        }
    }

    render() {

        const { tintColor, title, icon } = this.props
        // const icon = this._displayIconForTitle(title)
        return (
            <View style={[this.props.style, {
                flexDirection: 'row',
                borderRadius: 65535,
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 5,
                shadowOffset: {
                    height: 1,
                    width: 0,
                }
            }]}>
                <View style={{
                    width: 20,
                    height: 20,
                    marginLeft: 1,
                    marginTop: 1,
                    // backgroundColor: '#a43',
                    justifyContent: 'center',
                }}>
                    <Image
                        style={{
                            flex: 1,
                            width: 20,
                            height: 20,
                            resizedMode: 'contain',
                            alignSelf: 'center',
                            // borderRadius: 255,
                        }}
                        source={icon}
                    />
                </View>
                <Text
                    style={{
                        alignSelf: 'center',
                        marginRight: 10,
                        fontFamily: 'Avenir',
                        fontSize: 14,
                        fontWeight: '500',
                        color: tintColor && tintColor,
                    }}
                >
                    {title}
                </Text>
            </View>
        )
    }
}
/* eslint-disable */
import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated,
    Easing,
    LayoutAnimation,
    FlatList,
    Linking,
    Platform, PermissionsAndroid
} from "react-native";
import {
    CoreActions,
    CoreConfig,
    CoreUtils
} from "@pru-rt-internal/pulse-common"
const {
    appendHospitalSearchHistory,
    updateHospitalSearchHistoryCapacity,
    clearHospitalSearchHistory,
} = CoreActions

const { metaHelpers } = CoreUtils
const {
    FINDHOSPITAL,
    FINDHOSPITAL_SEEDETAILS,
    FINDHOSPITAL_CALL,
    FINDHOSPITAL_NAVIGATE,
} = CoreConfig
import PropTypes from 'prop-types'
import SearchBar from '../SearchBar'
import {
    CLOSE_PAGE,
    INFO_ADDRESS_NAVIGATOR,
    INFO_CONTACT_NAVIGATOR,
} from '../../config/images'
import DetailArrowCell from '../../components/DetailArrowCell'
import { connect } from "react-redux";
import {
    DISPLAY_MODE_HOSPITAL,
    DISPLAY_MODE_DENGUE,
} from '../../containers/NavigatorMap'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export const MAP_ANNOTATION_DESIGNED_HEIGHT_HOSPITAL = 230
export const MAP_ANNOTATION_DESIGNED_HEIGHT_DENGUE = 150
const sh = Dimensions.get('window').height
const sw = Dimensions.get('window').width
const default_fontFamily = 'Avenir'
const geolib = require('geolib');

export default class MapAnnotationDetail extends Component {



    _renderHospitaElements() {

        const { onCallAction, onNavigateAction, onCloseAction, selectedItem, currentLocation, onDetailAction } = this.props

        const fullName = selectedItem.name
        const address = selectedItem.address
        const addLine1 = address.line1 ? address.line1 : ''
        const addLine2 = address.line2 ? address.line2 : ''
        const addLine3 = address.line3 ? address.line3 : ''
        const addString = [addLine1, addLine2, addLine3].join(' ')
        const fullAddress = addString


        var possibleDistance = 0

        if (address && currentLocation) {

            const selectedLongitude = address.longitude
            const selectedLatitude = address.latitude

            const userLongitude = currentLocation.longitude
            const userLatitude = currentLocation.latitude

            possibleDistance = geolib.getDistance(
                { longitude: userLongitude, latitude: userLatitude },
                { longitude: selectedLongitude, latitude: selectedLatitude },
                0
            )

            if (isNaN(possibleDistance)) {
                possibleDistance = geolib.getPreciseDistance(
                    { longitude: userLongitude, latitude: userLatitude },
                    { longitude: selectedLongitude, latitude: selectedLatitude },
                    1
                )
            }

        }
        possibleDistance = isNaN(possibleDistance) ? 0 : possibleDistance
        const distance = geolib.convertDistance(possibleDistance, 'km')
        // const distanceStr = `${distance.toFixed(2)} km \n (Approx)`
        // const distanceStr = `Navigate`
        const distanceStr = metaHelpers.findElement(FINDHOSPITAL, FINDHOSPITAL_NAVIGATE).label
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          };
        return <GestureRecognizer
        onSwipeLeft={() => {
            onCloseAction && onCloseAction()
        }}
        onSwipeRight={() => {
            onCloseAction && onCloseAction()
        }}
        config={config}
        style={{
            // top: sh - MAP_ANNOTATION_DESIGNED_HEIGHT_HOSPITAL,
            width: '100%',
            // height: MAP_ANNOTATION_DESIGNED_HEIGHT_HOSPITAL,
            position: "absolute",
            bottom:0,
            backgroundColor: '#fff',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            overflow: 'hidden',
            zIndex: 2,
        }}>
             <View style={{
                        height: 4,
                        width: 100,
                        backgroundColor: '#D9DCDE',
                        borderRadius: 24,
                        marginTop: 10,
                        alignSelf: 'center'
                    }} />
            {/* Top elements */}
            <View
                style={{
                    flex: 1,
                    // backgroundColor: '#76a5',
                    flexDirection: 'row'
                }}
            >
                <View
                    style={{
                        flex: 1,
                        paddingTop: 20,
                        paddingHorizontal: 16,
                        flexDirection: 'column',
                        width: "80%",
                        // backgroundColor: '#7335',
                    }}>
                    <Text
                        style={{
                            color: '#515B61',
                            fontFamily: default_fontFamily,
                            fontSize: 14,
                            // height: 25,
                            fontWeight: '900',
                        }}
                        // adjustsFontSizeToFit={true}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                    >
                        {fullName}
                    </Text>
                    <Text
                        style={{
                            color: '#68737A',
                            fontFamily: default_fontFamily,
                            fontSize: 14,
                            // height: 45,
                            flexShrink: 0,
                        }}
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                    >{fullAddress}</Text>
                </View>
            </View>
            {/* Bottom elements */}
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    margin: 10,
                    marginTop:30,
                    marginBottom:16,
                    // backgroundColor: '#6a7a'
                }}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignSelf: "center"
                }}>
                    <View style={{
                        width: 48,
                        height: 48,
                        backgroundColor: '#E7F6F4',
                        borderRadius: 24,
                        justifyContent: "center",
                        marginRight: 20,
                        marginLeft: 10
                    }}>
                        <TouchableOpacity onPress={() => {
                                const number = selectedItem.contactDetails.phone.value
                                switch (Platform.OS) {
                                    case 'ios':
                                        const link_ios = `tel:${number}`
                                        Linking.openURL(link_ios)
                                        break;

                                    default:
                                        const link_android = `tel:${number}`
                                        this.requestLocationPermission(link_android)
                                        break;
                                }
                                onCallAction && onCallAction()
                            }}>
                            <Image style={{
                                width: 16,
                                height: 16,
                                resizeMode: 'contain',
                                alignSelf: 'center',
                                tintColor: '#5CC3B2',
                            }}
                                source={INFO_CONTACT_NAVIGATOR} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: 48,
                        height: 48,
                        marginLeft: 5,
                        backgroundColor: '#FEF3F4',
                        borderRadius: 24,
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity onPress={() => {
                            onNavigateAction && onNavigateAction()
                        }}>
                            <Image style={{
                                width: 14,
                                height: 14,
                                resizeMode: 'contain',
                                alignSelf: 'center',
                                tintColor: '#ED1A2D',
                            }}
                                source={INFO_ADDRESS_NAVIGATOR} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    flex:1,
                    justifyContent: "center",
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            onDetailAction && onDetailAction()
                        }}
                        activeOpacity={0.4}>
                        <Text
                            style={{
                                color: '#68737A',
                                fontFamily: default_fontFamily,
                                fontSize: 14,
                                // marginTop: 4,
                                flexShrink: 0,
                                fontWeight: '700',
                                textAlign: "center",
                                color: '#ED1A2D'
                            }}
                            numberOfLines={1}
                            ellipsizeMode={'tail'}
                        >{metaHelpers.findElement(FINDHOSPITAL, FINDHOSPITAL_SEEDETAILS).label}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </GestureRecognizer>
    }

    _renderDengueElements() {
        const { onCloseAction } = this.props
        return (
            <View
                style={{
                    top: sh - MAP_ANNOTATION_DESIGNED_HEIGHT_DENGUE,
                    width: '100%',
                    height: MAP_ANNOTATION_DESIGNED_HEIGHT_HOSPITAL,
                    position: "absolute",
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    overflow: 'hidden',
                }} >
                <View
                    style={{
                        flex: 1,
                        // backgroundColor: '#76a5',
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            paddingTop: 20,
                            paddingLeft: 20,
                            flexDirection: 'column',
                            // backgroundColor: '#7335',
                        }}>
                        <Text
                            style={{
                                color: '#515B61',
                                fontFamily: default_fontFamily,
                                fontSize: 22,
                                fontWeight: '900',
                            }}
                        >
                            {'{x} Cases Reported'}
                        </Text>
                        <View style={{
                            marginTop: 8,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            // backgroundColor: '#8ac3'
                        }}>
                            <Text
                                style={{
                                    color: '#515B61',
                                    fontFamily: default_fontFamily,
                                    fontSize: 16,
                                    fontWeight: '600',
                                }}
                            >
                                {'Near'}
                            </Text>
                            <Image
                                style={{
                                    height: 14,
                                    width: 14,
                                    marginHorizontal: 8,
                                    resizeMode: 'contain',
                                    tintColor: '#ED1B2E',
                                    alignSelf: 'center'
                                }}
                                source={INFO_ADDRESS_NAVIGATOR}
                            />
                            <Text
                                style={{
                                    color: '#515B61',
                                    fontFamily: default_fontFamily,
                                    fontSize: 16,
                                    color: '#ED1B2E',
                                    fontWeight: '600',
                                }}
                            >
                                {'{province contry road}'}
                            </Text>

                        </View>
                        <View style={{
                            marginTop: 8,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                        }}>
                            <Text
                                style={{
                                    color: '#68737A',
                                    fontFamily: default_fontFamily,
                                    fontSize: 12,
                                }}>{'Updated'}</Text>
                            <Text
                                style={{
                                    marginLeft: 8,
                                    color: '#68737A',
                                    fontFamily: default_fontFamily,
                                    fontSize: 12,
                                    fontWeight: '700',
                                }}>{'{day} {HH:mm} {ap}'}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{
                        marginTop: 24,
                        height: 24,
                        width: 24,
                        marginHorizontal: 16,
                        // backgroundColor: '#7335',
                        justifyContent: 'center',
                    }}
                        onPress={() => {
                            onCloseAction && onCloseAction()
                        }}
                    >
                        <Image
                            style={{
                                height: 16,
                                width: 16,
                                resizeMode: 'contain',
                                tintColor: '#515B61',
                                alignSelf: 'center',
                            }}
                            source={CLOSE_PAGE} />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
    async requestLocationPermission(link_android) {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CALL_PHONE,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Linking.openURL(link_android)
            } else {

            }
        } catch (err) {
        }
    }
    render() {
        const { contentType } = this.props
        switch (contentType) {
            case DISPLAY_MODE_HOSPITAL:
                return this._renderHospitaElements()
            case DISPLAY_MODE_DENGUE:
                return this._renderDengueElements()
            default:
                return <View style={{ flex: 1 }} />
        }
    }

}

MapAnnotationDetail.PropTypes = {
    onCallAction: PropTypes.func,
    onNavigateAction: PropTypes.func,
    onCloseAction: PropTypes.func,
    selectedItem: PropTypes.object,
    currentLocation: PropTypes.object,
    onDetailAction: PropTypes.func,
}
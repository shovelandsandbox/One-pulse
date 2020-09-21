/* eslint-disable */
import React, { Component } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Modal,
    Image,
    ImageBackground,
    PushNotificationIOS,
    Platform,
    findNodeHandle,
    UIManager,
    Dimensions,
    Alert,
    PermissionsAndroid,
} from "react-native";
import { BACK, DOC_PAY_SUC } from "../../config/images"
import { connect } from "react-redux";
import {
    CoreActions,
    CoreUtils,
    metaHelpers,
    CoreConfig,
    CoreActionTypes
} from '@pru-rt-internal/pulse-common'

import DetailArrowCell from '../../components/DetailArrowCell';

const { pageKeys } = CoreConfig;

import PropTypes from 'prop-types'

class DocPaySuc extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ConsultationAndMedic: false,
            payModal: false
        }
    }


    render() {

        const { navigation } = this.props

        return <View
            style={{
                flex: 1,
                backgroundColor: '#fff'
            }} >
            <View style={[{
                width: "100%",
                height: 52,
                backgroundColor: "#ffffff",
                alignItems: "center",
                paddingLeft: 11,
                paddingRight: 11,
                flexDirection: "row",
                borderBottomColor: "#D9D9D9",
                borderBottomWidth: 1
            }]}>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.goBack()
                    }
                    }
                    style={{
                        width: 55,
                        height: 55,
                        alignItems: "flex-start",
                        justifyContent: "center",
                    }}
                >
                    <Image style={{
                        width: 20, height: 20, left: 0
                    }} source={BACK} />
                </TouchableOpacity>

                {/* <View style={{
                    flex: 5,
                    // backgroundColor:"red",
                    alignItems: "flex-end"
                }}>
                    <Text style={{
                        fontSize: 40,
                        color: "#616161"
                    }}>···</Text>
                </View> */}
            </View>

            <View >
                <Text style={{
                    color: "#515B61",
                    fontSize: 22,
                    textAlign: "center",
                    marginTop: 16

                }}>Payment</Text>
            </View>

            <Text style={{
                color: "#515B61",
                fontSize: 16,
                paddingHorizontal: 30,
                marginTop: 12,
                textAlign: "center"
            }}>
                Payment Successful
            </Text>
            <View style={{
                alignItems: "center",
                marginTop: 35

            }}>
                <Image style={{
                    width: 81, height: 62,
                }} source={DOC_PAY_SUC} />
            </View>
            <Text style={{
                color: "#4A90E2",
                textAlign: "center",
                fontSize: 16,
                marginTop: 40
            }}>
                RM 1.00
            </Text>

            <Text style={{
                color: "#515B61",
                fontSize: 16,
                paddingHorizontal: 30,
                marginTop: 12,
                textAlign: "center"
            }}>
                Payment to Online Consultaion
            </Text>

            <Text style={{
                color: "#515B61",
                fontSize: 12,
                paddingHorizontal: 30,
                marginTop: 16,
                marginBottom: 22,
                textAlign: "center"
            }}>
                Order Summary
            </Text>
            <Text style={{
                color: "#515B61",
                fontSize: 12,
                paddingHorizontal: 30,
                marginTop: 12,
                textAlign: "center"
            }}>

                Your payment of RM1.00 to Online Consultation has beed successful


            </Text>
            <View style={{
                // backgroundColor:"red",
                position: 'absolute',
                bottom: '0%',
                width: "100%",
                height: 90,
                // borderTopColor:"rgba(175,175,175,0.50)",
                // borderTopWidth:2,
                justifyContent: "center"
            }}>
                <TouchableOpacity
                    style={{


                        alignSelf: 'center',
                        height: 44,
                        width: '80%',
                        borderRadius: 255,
                        backgroundColor: '#ED1B2E',
                        justifyContent: 'center',
                    }}
                    onPress={() => {
                        this._agreeTermsOfDengueAlert()
                    }}
                >
                    <Text style={{
                        color: '#fff',
                        fontFamily: 'Avenir',
                        fontSize: 16,
                        fontWeight: '500',
                        textAlign: 'center',
                    }}>
                        Confirm the Appointment
                </Text>
                </TouchableOpacity>

            </View>

        </View>
    }
}



const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps,
    {
        handleDocTnCAcceptance: tncData => ({
            context: pageKeys.DOC_SERVICE_INTRO,
            type: CoreActionTypes.DOC_SERVICE_TNC_ACCEPTED,
            payload: {
                tncData,
            },
        }),
    }
)(DocPaySuc)
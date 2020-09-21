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
import { BACK, REFRESH, ICON_AVATAR_HEAD, LARGEYELLOWROBOT } from "../../config/images"
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

class DocPay extends Component {
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
                marginTop: 30
            }}>
                Select your payment method
            </Text>
            <View style={{
                paddingHorizontal:30
            }}>

                <DetailArrowCell
                    key={"11"}
                    labelText={"Credit / Debit Card"}
                    onPress={() => {
                    }
                    }
                />
                 <DetailArrowCell
                    key={"11"}
                    labelText={"Online Banking (FPX)"}
                    onPress={() => {
                    }
                    }
                />
                 <DetailArrowCell
                    key={"11"}
                    labelText={"ATM / Bank Transfer"}
                    onPress={() => {
                    }
                    }
                />

            </View>






        </View >
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
)(DocPay)
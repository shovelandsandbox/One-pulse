import React, { Component } from "react";
import {
    Picker,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView
} from "react-native";
import DatePicker from "react-native-date-picker";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { connect } from "react-redux";

class ConsulationHistoryItems extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    _displayTypeForType = (t) => {
        switch (t) {
            case 'VIDEO_CHAT':
                return 'Video'
            case 'AUDIO_CHAT':
                return 'Audio'
            default:
                return 'Unknown'
        }
    }

    render() {
        let { name, onPress, times, type,userPreferences } = this.props;
        let {language} = userPreferences
        return <View style={{
            width: "100%",
            // height: 100,
            marginTop: 10,
            backgroundColor: "#fff",
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 10
        }}>
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: "#D9DCDE",

            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: "600",
                    marginTop: 10,
                    marginBottom: 8,
                    color: "#49545A",
                }}>
                    {language=="BM"?"Doktor":"Doctor"}:
                    {name}
                </Text>
            </View>
            <View style={{
                justifyContent: "space-between",
                width: "100%",
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                flexShrink: 0,
                marginTop: 12,
                // backgroundColor: '#8ac4'
            }}>
                <Text style={{
                    fontWeight: "600",
                    fontSize: 12,
                    color: "#515B61",
                }}>
                  {language=="BM"?"Jenis Panggilan":"Call Type"}:

                    
                    </Text>
                <Text style={{
                    fontWeight: "600",
                    fontSize: 12,
                    color: "#515B61",
                }}>{this._displayTypeForType(type)}</Text>
            </View>
            <View style={{
                justifyContent: "space-between",
                width: "100%",
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
                marginTop: 8,
                flexShrink: 0,
                // backgroundColor: '#a434'
            }}>
                <Text style={{
                    fontFamily: "Avenir",
                    fontSize: 12,
                    color: "#515B61",
                    width:"70%"
                }}>
                    {language=="BM"?"Tarikh & Masa Rundingan":" Consultation Date & Time"}
                   :{times}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        onPress && onPress()
                    }}
                    accesible
                    style={{
                        background: "#FFFFFF",
                        borderColor: "#DEDEDE",
                        borderWidth: 1,
                        borderRadius: 22,
                        height: 20,
                        justifyContent: "center",
                        borderColor: '#ed1b2e',
                    }}

                >
                    <Text style={{
                        fontFamily: "Avenir",
                        fontSize: 12,
                        color: "#ED1B2E",
                        textAlign: "center",
                        letterSpacing: 0,
                        // lineHeight: 20,
                        marginHorizontal: 10,
                    }}>
                   {language=="BM"?"Lihat Butiran":" View Detail"}:

                       
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    }
}
ConsulationHistoryItems.PropTypes = {
    onPress: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    times: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired

}
const mapStateToProps = state => {
    return {
        userProfile: state.profile,
        //correlationId: state.ChallengeReducer.correlationId,
        //tictrac: state.auth.tictrac,
        token: state.auth.token,
        userPreferences: state.userPreferences,

    }
}
export default connect(mapStateToProps)(ConsulationHistoryItems);
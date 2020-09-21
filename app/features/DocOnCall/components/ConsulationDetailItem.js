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
import {
    CoreActionTypes,
    CoreConfig,
    CoreUtils,
} from "@pru-rt-internal/pulse-common";
const {
    SCREEN_CONSULTATION_HISTORY,
    CONSULTATION_HISTORY_TITLE,
    CHATBOTPROFILE,
    CHATBOT_MYSYMPTOMS,
    CHATBOT_CALLTYPE,
    CHATBOT_VIDEO,
    CHATBOT_SYMPTOMS,
    CHATBOT_CONDETAILITEM_INFO,
    CHATBOT_CALLBIGTYPE,
    CHATBOT_DOCTOR,
    CHATBOT_DOCTOR_FEEDBACK
} = CoreConfig
const { metaHelpers } = CoreUtils
import DatePicker from "react-native-date-picker";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { connect } from "react-redux";

export const CONSULATION_DETAIL_TYPE_MY_SYMPTOMS = 'chd_t_symp'
export const CONSULATION_DETAIL_TYPE_DOCTOR_FEEDBACK = 'chd_t_dfdb'

const Avenir = {
    default: 'Avenir',
    light: 'Avenir-light',
    medium: 'Avenir-Medium',
    heavy: 'Avenir-Heavy',
}

const FontColor = '#515B61'


class ConsulationDetailItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    _renderMySymptoms() {
        let MySymptoms = metaHelpers.findElement(CHATBOTPROFILE, CHATBOT_MYSYMPTOMS).label;
        let Calltype = metaHelpers.findElement(CHATBOTPROFILE, CHATBOT_CALLTYPE).label;
        let Video = metaHelpers.findElement(CHATBOTPROFILE, CHATBOT_VIDEO).label;
        let Symptoms = metaHelpers.findElement(CHATBOTPROFILE, CHATBOT_SYMPTOMS).label;
    
        return (
            <View
                style={{
                    // height: 120,
                    backgroundColor: '#fff',
                    paddingHorizontal: 30,
                    borderTopWidth: 8,
                    borderTopColor: '#f7f7f7',
                    // borderBottomWidth: 8,
                    // borderBottomColor: '#f7f7f7',
                }}
            >
                {/* Head Title */}
                <View
                    style={{
                        borderBottomWidth: 0.5,
                        borderBottomColor: "#979797",
                    }}
                >
                    <Text style={{
                        fontSize: 16,
                        fontFamily: Avenir.heavy,
                        color: FontColor,
                        marginTop: 12,
                        marginBottom: 8,
                    }}>
                        {MySymptoms}
                        {/* {`My Symptoms`} */}
                    </Text>
                </View>
                {/* Type */}
                {/* <View style={{
                    flexDirection: 'row',
                    marginVertical: 8,
                }}>
                    <Text style={{
                        fontSize: 12,
                        flex: 1,
                        textAlign: 'left',
                        fontFamily: Avenir.medium,
                        color: FontColor,
                    }}>
                        {`Call type`}
                    </Text>
                    <Text style={{
                        fontSize: 12,
                        fontFamily: Avenir.medium,
                        color: FontColor,
                    }}>
                        {Video}
                    </Text>
                </View> */}
                {/* Symptoms Label */}
                <Text style={{
                    color: FontColor,
                    fontSize: 14,
                    fontFamily: Avenir.light,
                    marginBottom: 8,
                }}>
                    {/* {Symptoms} */}
                    {/* {`Symptoms`} */}
                </Text>
                <Text style={{
                    fontFamily: Avenir.medium,
                    fontSize: 12,
                    color: FontColor,
                    marginBottom: 19,
                }}>
                    {`${this.props.symptoms?this.props.symptoms:""}`}
                </Text>
            </View>
        )

    }
    _renderDoctorFeedback() {
        let DoctorFeedBack = metaHelpers.findElement(CHATBOTPROFILE, CHATBOT_DOCTOR_FEEDBACK).label;
        // console.log(this.props.feedback.note.items[0],"======")
        return (
            <View
                style={{
                    // height: 120,
                    backgroundColor: '#fff',
                    paddingHorizontal: 30,
                    borderTopWidth: 8,
                    borderTopColor: '#f7f7f7',
                    // borderBottomWidth: 8,
                    // borderBottomColor: '#f7f7f7',
                }}
            >
                {/* Head Title */}
                <View
                    style={{
                        borderBottomWidth: 0.5,
                        borderBottomColor: "#979797",
                    }}
                >
                    <Text style={{
                        fontSize: 16,
                        fontFamily: Avenir.heavy,
                        color: FontColor,
                        marginTop: 12,
                        marginBottom: 8,
                    }}>
                        {DoctorFeedBack}
                        {/* {`Doctor's Feedback`} */}
                    </Text>
                </View>
                {/* Feedback */}
                <Text style={{
                    fontFamily: Avenir.medium,
                    fontSize: 12,
                    color: FontColor,
                    marginTop: 8,
                    marginBottom: 19,
                }}>
                    {this.props.feedback.note?this.props.feedback.note.items[0]:""}
                </Text>
            </View>
        )

    }


    render() {
        const { contentType, name, onPress, times, type, title } = this.props;
        let CallType = metaHelpers.findElement(CHATBOTPROFILE, CHATBOT_CALLBIGTYPE).label;
        let Doctor = metaHelpers.findElement(CHATBOTPROFILE, CHATBOT_DOCTOR).label;
        let ConsulationDetailInfo = metaHelpers.findElement(CHATBOTPROFILE, CHATBOT_CONDETAILITEM_INFO).label;
        switch (contentType) {
            case CONSULATION_DETAIL_TYPE_MY_SYMPTOMS:
                {
                    const stack = this._renderMySymptoms()
                    return stack
                }
            case CONSULATION_DETAIL_TYPE_DOCTOR_FEEDBACK:
                {
                    const stack = this._renderDoctorFeedback()
                    return stack
                }
            default:
                {
                    return <View style={{
                        backgroundColor: '#fff',
                        paddingHorizontal: 30,
                        borderTopWidth: 8,
                        borderTopColor: '#f7f7f7',
                    }}>
                        <Text style={{
                            fontFamily: Avenir.medium,
                            fontSize: 14,
                            color: FontColor,
                            marginVertical: 50,
                            textAlign: 'center',
                        }}>
                            {ConsulationDetailInfo}
                            {/* {`Please visit a nearby local pharmacy, present your e-prescription, and pick up your medication.`} */}
                        </Text>
                    </View>
                }
        }
        return <View style={{
            width: "100%",
            height: 100,
            marginTop: 10,
            backgroundColor: "#fff",
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 10
        }}>
            <View style={{
                borderBottomWidth: 2,
                borderBottomColor: "#D9DCDE",

            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: "600",
                    marginTop: 10,
                    marginBottom: 8,
                    color: "#49545A",
                }}>
                    {/* Doctor */}
                    {Doctor}:{name}
                </Text>
            </View>
            <View style={{
                justifyContent: "space-between",
                width: "100%",
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
            }}>
                <Text style={{
                    fontWeight: "600",
                    fontSize: 14,
                    color: "#515B61",
                }}>
                    {CallType}
                    {/* Call Type */}
                </Text>
                <Text style={{
                    fontWeight: "600",
                    fontSize: 14,
                    color: "#515B61",
                }}>{type}</Text>
            </View>
            <Text>

            </Text>

        </View >
    }
}
ConsulationDetailItem.PropTypes = {
    onPress: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    times: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    contentType: PropTypes.string.isRequired,
    symptoms: PropTypes.string,
    feedback: PropTypes.string,
}

export default ConsulationDetailItem;
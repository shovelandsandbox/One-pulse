/* eslint-disable */
import React, { Component } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageBackground,
    PushNotificationIOS,
    Platform,
    findNodeHandle,
    UIManager,
    Dimensions,
    Alert,
    PermissionsAndroid,
    TextInput,

    KeyboardAvoidingView
} from "react-native";
import { BACK, DOC_PAY_SUC } from "../../config/images"
import { connect } from "react-redux";
import {
    CoreActions,
    CoreUtils,
    metaHelpers,
    CoreConfig,
    CoreActionTypes,
    CoreConstants
} from '@pru-rt-internal/pulse-common'

import Modal from "react-native-modal";
import styles from "../Payment/styles"
import DetailArrowCell from '../../components/DetailArrowCell';

const { setDengueAlertTermsProcessed } = CoreActions
const {CONSULTATION_SERVICE_ID,ConsultationType}=CoreConstants
const { 
  pageKeys,
  TALKTOADOCTOR_APPOINTMENTCONFIRMATION,
  TALKTOADOCTOR,
  TALKTOADOCTOR_ONLINECONSULTATIONAUDIO,
  TALKTOADOCTOR_PAYMENTSUCCESSFULLY,
  TALKTOADOCTOR_NEXT,
  TALKTOADOCTOR_PLEASEENTERANY,
  TALKTOADOCTOR_SUBMIT
 } = CoreConfig;

import PropTypes from 'prop-types'
import ConfirmationCodeInput from "react-native-confirmation-code-field";

class AppointConfirmation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ConsultationAndMedic: false,
            payModal: false,
            symptoms: "",
            isSymptomsModalVisible:false

        }
        this.symptoms = "";

    }
    requestConsultation = () => {
        this.setState({
          isSymptomsModalVisible: false,
        });
        const { serviceId, paymentStatus } = this.props.navigation.state.params;
        this.props.dispatch({
          context: pageKeys.DOC_SERVICE_PAYMENT_STATUS,
          type: CoreActionTypes.DOC_SERVICE_REQUEST_CONSULTATION,
          payload: {
            callType:
              serviceId === CONSULTATION_SERVICE_ID.VIDEO
                ? ConsultationType.VIDEO_CHAT
                : ConsultationType.AUDIO_CHAT,
            symptoms: this.state.symptoms,
            // orderRefNumber: this.state.orderRefnumber,
          },
        });
        // if (serviceId === CONSULTATION_SERVICE_ID.AUDIO) {
        //   this.goBack();
        // }
        this.setState({
          symptoms: "",
        });
      };

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

                }}>
                   {metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_APPOINTMENTCONFIRMATION).label}
{/* ApppoinTment  Confirmation */}
</Text>
            </View>

            {/* <Text style={{
                color: "#515B61",
                fontSize: 16,
                paddingHorizontal: 30,
                marginTop: 12,
                textAlign: "center"
            }}>
                Payment Successful
            </Text> */}
            <View style={{
                alignItems: "center",
                marginTop: 54,
                marginBottom:20

            }}>
                <Image style={{
                    width: 81, height: 62,
                }} source={DOC_PAY_SUC} />
            </View>


            <Text style={{
                color: "#515B61",
                fontSize: 16,
                paddingHorizontal: 30,
                marginTop: 39,
                textAlign: "center"
            }}>
                {metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_ONLINECONSULTATIONAUDIO).label}
                {/* Online Consultation Video Appointment */}
            </Text>
            <Text style={{
                color: "#515B61",
                fontSize: 12,
                paddingHorizontal: 30,
                marginTop: 12,
                textAlign: "center"
            }}>

{metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_PAYMENTSUCCESSFULLY).label.split("RM 1.00")[0]}
                {/* Payment Successf ully */}
                 <Text style={{
                    color: "#4A90E2",
                    textAlign: "center",
                    fontSize: 16,
                    marginTop: 40
                }}>
                    RM 0.00
            </Text> 
            {/* For Audio Call */}
            {metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_PAYMENTSUCCESSFULLY).label.split("RM 1.00")[1]}
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
                        this.setState({
                            isSymptomsModalVisible:true
                        })
                        //  this._agreeTermsOfDengueAlert()
                    }}
                >
                    <Text style={{
                        color: '#fff',
                        fontFamily: 'Avenir',
                        fontSize: 16,
                        fontWeight: '500',
                        textAlign: 'center',
                    }}>
                     
                        {metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_NEXT).label}
                </Text>
                </TouchableOpacity>

            </View>
            <Modal
        isVisible={this.state.isSymptomsModalVisible}
        onBackdropPress={() => this.setState({ isSymptomsModalVisible: false })}
      >
        <KeyboardAvoidingView behavior="position" enabled>
          <View style={[styles.profileModalContent,{borderRadius:10}]}>
            <View style={styles.modalStyle}>
              <Text style={{
                  fontSize:16,
                  color:"#515B61",
                  textAlign:"center",
                  marginVertical:22}}>
                     {metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_PLEASEENTERANY).label}
                    
                    {/* Please enter any symptoms you have */}
                     </Text>

              <View style={styles.modalButtonContainer}>
                <TextInput
                  style={styles.symptomsTextInput}
                  multiline={true}
                  numberOfLines={4}
                  maxLength={500}
                  onChangeText={symptoms =>
                    this.setState({
                      symptoms,
                    })
                  }
                />
              </View>

              <View style={{
                  justifyContent:"center",
                  alignItems:"center",
                  width:"100%",
                  marginTop:38
              }}>
                <TouchableOpacity
                  style={{
                      width:162,
                      height:38,
                      backgroundColor:"#ED1B2E",
                      borderRadius:22,
                      justifyContent:"center"
                    }}
                  onPress={e => {
                    e.preventDefault();
                    this.requestConsultation();
                  }}
                >
                  <Text
                    style={{color:"#FFF",textAlign:"center",fontSize:16}}
                  >
                    {metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_SUBMIT).label}
                    
                    {/* Submit */}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
        </View >
    }
}



const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps
)(AppointConfirmation)
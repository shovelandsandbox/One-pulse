import React, { Component } from "react";
import {
    View,
    FlatList,
    ScrollView,
    TouchableOpacity,
    NativeModules,
    DeviceEventEmitter,
    NativeEventEmitter,
    Platform,
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Text,
    Image,
    Modal
} from "react-native";
import { connect } from "react-redux"
import { BACK } from "../../config/images"
import NewTextInput from "../../components/NewTextInput";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LARGEYELLOWROBOT } from "../../config/images"
class StartConsultaion extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let { height } = Dimensions.get('window')

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#fff",
                }}>


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

                    <View style={{
                        flex: 5,
                        // backgroundColor:"red",
                        alignItems: "flex-end"
                    }}>
                        <Text style={{
                            fontSize: 40,
                            color: "#616161"
                        }}>···</Text>
                    </View>
                </View>
                <View style={{
                    alignItems: "flex-end",
                    position: "absolute",
                    top: 32,
                    right: 10

                }}>
                    <View style={{
                        marginLeft: 5,
                        marginTop: 1,
                        width: 0,
                        height: 0,
                        borderStyle: 'solid',
                        borderWidth: 10,
                        borderTopColor: '#fff',//下箭头颜色
                        borderLeftColor: '#fff',//右箭头颜色
                        borderBottomColor: '#A6E7EE',//上箭头颜色
                        borderRightColor: '#fff',//左箭头颜色
                        marginRight: 10
                    }}></View>
                    <View style={{
                        width: 152,
                        height: 67,
                        backgroundColor: "#A6E7EE",
                        paddingHorizontal: 10,
                        borderRadius: 5
                    }}>
                        <View style={{
                            borderBottomColor: "#FFF",
                            borderBottomWidth: 1,
                            flex: 1,
                        }}>
                            <Text style={{
                                color: "#fff",

                                lineHeight: 33,


                            }}>
                                Consultation History
                        </Text>
                        </View>

                        <View style={{
                            flex: 1,
                        }}>
                            <Text style={{
                                color: "#fff",
                                lineHeight: 33
                            }}>
                                Medication Order
                        </Text>
                        </View>


                    </View>

                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 30,
                        marginLeft: 15
                    }}>
                    <Image
                        source={LARGEYELLOWROBOT}
                        style={{
                            width: 38,
                            height: 38,
                            marginRight: 30
                        }}
                    />
                    <View style={{
                        width: 115,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#FFF"
                    }}>
                        <Text style={{
                            fontSize: 12,
                            color: '#515B61'
                        }}>
                            Welcome Linda
        </Text>
                    </View>
                </View>





                <View style={{
                    // backgroundColor:"red",
                    position: 'absolute',
                    bottom: '0%',
                    width:"100%",
                    height:90,
                    borderTopColor:"rgba(175,175,175,0.50)",
                    borderTopWidth:2,
                    justifyContent:"center"
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
                            this.props.navigation.navigate("SelectAudioVideo")
                        }}
                    >
                        <Text style={{
                            color: '#fff',
                            fontFamily: 'Avenir',
                            fontSize: 16,
                            fontWeight: '500',
                            textAlign: 'center',
                        }}>
                            Start a Consultaion
                </Text>
                    </TouchableOpacity>

                </View>

               
            </View>
        )
    }
}
export default connect()(StartConsultaion)
import React, { Component } from "react";
import {
    View,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Platform,
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Text,
    Image
} from "react-native";
import {
    WARNING,
    CLOSE_PAGE,
    DOCTORONCALL
} from "../../config/images";
import PropTypes from "prop-types";

import {configureLineHeight} from "../../utils/lineHeightsUtils";

class TcPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    _onClose = () => {
        this.props.naigation.goBack()
    }
    render() {
        return <ScrollView style={{
            backgroundColor: "#fff",
            width: "100%",
            height: "100%",

        }}>
            <View style={{
                flex: 1,
                justifyContent: "center"

            }}>
                <View style={{
                    width: "100%",
                    height: 60,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',

                    zIndex: 5,
                }}>

                    <TouchableOpacity style={{
                        width: 60,
                        height: 60,
                        position: "absolute",
                        top: 15,
                        right: 20,
                        justifyContent: "center"

                    }} onPress={this._onClose.bind(this)}>
                        <Image style={{ flex: 1, alignSelf: 'center' }}
                            source={CLOSE_PAGE} resizeMode={"contain"} />
                    </TouchableOpacity>
                </View>

                <Image
                    source={WARNING}
                    style={{

                    }}
                ></Image>
                <View style={{
                    paddingLeft: 40,
                    paddingRight: 40,
                }}>
                    <Text style={{
                        height: "auto",
                        color: "#515B61",
                        fontFamily: "Avenir",
                        fontSize: 22,
                        fontWeight: "900",
                        textAlign: "center",
                        marginTop: 24,
                        ...configureLineHeight("22")
                    }}>
                        {"Babylon Health"}
                    </Text>
                    <Text style={{
                        height: "auto",
                        color: "#222529",
                        fontFamily: "Avenir",
                        fontSize: 16,
                        fontWeight: "500",
                        textAlign: "center",
                        marginTop: 16,
                        ...configureLineHeight("16")
                    }}>
                        Check your symptoms and get personalized care recommendations with our AI-powered technology
                        </Text>
                    <View style={{
                        flexDirection: "row",
                        marginTop: 45,

                    }}>
                        <Text style={{
                            width: 70,
                            height: 20,
                            color: "#222529",
                            fontFamily: "Avenir",
                            fontSize: 14,
                            fontWeight: "300",
                            textAlign: "center",
                            ...configureLineHeight("14")
                        }}>Whenever</Text>
                        <Image
                            source={DOCTORONCALL}
                            resizeMode={"contain"}
                            style={{

                            }}
                        ></Image>
                        <Text style={{
                            color: "#222529",
                            fontFamily: "Avenir",
                            fontSize: 14,
                            fontWeight: "300",
                            height: 20,
                            textAlign: "center",
                            ...configureLineHeight("14")
                        }}>appears, you are receiving</Text>

                    </View>
                    <Text style={{
                        height: 20,
                        color: "#222529",
                        fontFamily: "Avenir",
                        fontSize: 14,
                        fontWeight: "300",
                        textAlign: "center",
                        marginBottom: 64,
                        ...configureLineHeight("14")
                    }}>
                        the services from Babylon.
                    </Text>
                    <Text style={{
                        height: 32,
                        width: 320,
                        color: "#515B61",
                        fontFamily: "Avenir",
                        fontSize: 12,
                        fontWeight: "300",
                        textAlign: "center",
                        ...configureLineHeight("12")
                    }}>
                        By clicking on Agree below, I confirm that I have read and agree to the Terms & Conditions for Babylon.
                    </Text>

                    <TouchableOpacity
                        style={{
                            width: 220,
                            height: 44,
                            borderRadius: 22,
                            justifyContent: "center",
                            alignItems: 'center',
                            marginLeft: 38,
                            marginRight: 77,
                            marginTop: 24,
                            flexShrink: 0,
                            marginBottom: 32,
                            backgroundColor: "#ED1B2E",
                            marginTop: 16
                        }}
                        onPress={() => {
                            onPress && onPress()
                        }
                        }
                        accessibilityLabel="home"
                        accesible
                    >
                        <Text style={{
                            fontSize: 16,
                            color: "#FFFFFF",
                            fontFamily: "Avenir",
                            fontWeight: "500",
                            ...configureLineHeight("16")
                        }}>
                            {"I Agree"}
                        </Text>
                    </TouchableOpacity>
                </View>



            </View>
        </ScrollView>
    }
}
export default TcPage;
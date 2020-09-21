import React, { Component } from "react";
import {
    View,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { CLOSE_PAGE, VERIFYCOMPLETE, STARBUCKS } from "../../../config/images"
import PropTypes from "prop-types"
class RewardsNotice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let { LableText, ButtonText, onPress, onCloseAction } = this.props;

        const { userProfile } = this.props
        const { email } = userProfile


        return (
            <ScrollView
                style={{
                    backgroundColor: "#fff",
                    width: "100%",
                    height: "100%",
                }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center"

                }}>
                    <View style={{ height: 44, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{
                            width: 60,
                            padding: 15,
                            // backgroundColor: '#8ac'
                        }}
                            onPress={() => {
                                onCloseAction && onCloseAction()
                            }}>
                            <Image style={{ flex: 1, alignSelf: 'center' }} source={CLOSE_PAGE} resizeMode={"contain"} />
                        </TouchableOpacity>
                    </View>

                    <Image
                        source={VERIFYCOMPLETE}
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
                            lineHeight: 30,
                            textAlign: "center",
                            marginTop: 24,

                        }}>
                            {LableText}
                        </Text>
                        {/* <Text style={{
                            height: "auto",
                            color: "#222529",
                            fontFamily: "Avenir",
                            fontSize: 16,
                            fontWeight: "500",
                            lineHeight: 22,
                            textAlign: "center",
                            marginTop: 16

                        }}>
                            {`Your reward voucher will be sent to ${email}`}
                        </Text> */}
                        {/* <Text style={{
                            height: "auto",
                            color: "#222529",
                            fontFamily: "Avenir",
                            fontSize: 16,
                            fontWeight: "500",
                            lineHeight: 22,
                            textAlign: "center",
                            marginTop: 16

                        }}>
                            Redeem it at anywhere in Singapore
                        </Text> */}
                        {/* <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 16
                        }}>
                            <Image
                                source={STARBUCKS}
                                style={{
                                    width: 100,
                                    height: 24,

                                }}
                            ></Image>
                        </View> */}
                        <TouchableOpacity
                            style={{
                                width: 220,
                                height: 44,
                                borderRadius: 22,
                                justifyContent: "center",
                                alignItems: 'center',
                                marginLeft: 38,
                                marginRight: 77,
                                flexShrink: 0,
                                marginBottom: 32,
                                backgroundColor: "#ED1B2E",
                                marginTop: 50
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
                                lineHeight: 22,
                            }}>
                                {ButtonText}
                            </Text>
                        </TouchableOpacity>
                    </View>



                </View>
            </ScrollView >
        )
    }
}
const mapStateToProps = state => {
    return {
        userProfile: state.profile,
    }
}
RewardsNotice.PropTypes = {
    LableText: PropTypes.string.isRequired,
    ButtonText: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    onCloseAction: PropTypes.func
};

export default connect(mapStateToProps)(RewardsNotice);
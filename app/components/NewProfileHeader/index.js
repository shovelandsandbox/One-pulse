/* eslint-disable */
import React from "react";
import { Text, View, ImageBackground, TouchableOpacity, Image, StyleSheet } from "react-native";

import {
    NEW_HEADER_IMAGE,
    LEFT_WHITE_ARROW,
    AVATAR
} from '../../config/images';

const NewProfileHeader = props => {
    const {
        firstName,
        lastName,
        logout,
        goToProfile,
        signOutText,
        email,
        icon
    } = props;

    return (
        <View style={{
            height: 145,
        }}>
            <ImageBackground
                style={Styles.backgroundImage}
                source={NEW_HEADER_IMAGE}
                resizeMode={'contain'}>
                <View style={Styles.mainView}>
                    <View style={Styles.mainView}>
                        {/* /* Should not remove this code, we will place this code when new design for toast is done
                            <Image style={Styles.arrowImage} source={LEFT_WHITE_ARROW} /> */}
                    </View>
                    {/* Should not remove this code, we will place this code when new design for toast is done
                        <View>
                            <TouchableOpacity onPress={() => logout()}>
                                <Text style={Styles.signoutText}>
                                    { signOutText }
                                </Text>
                            </TouchableOpacity>
                        </View> */}
                </View>
                <View style={Styles.profileView}>
                    <Image style={Styles.avatar} source={icon ? icon : AVATAR} />
                    <View style={Styles.nameView}>
                        <Text style={Styles.nameText}>
                            {`${firstName} ${lastName}`}
                        </Text>
                        <Text style={Styles.emailText}>
                            {email}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const Styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#EC1B2E',
        padding: 20
    },
    mainView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    arrowImage: {
        alignSelf: 'center',
        width: 16,
        height: 16,
        fontFamily: 'Avenir-Heavy',
        fontSize: 18,
    },
    profileText: {
        color: 'white',
        fontFamily: "Avenir-Heavy",
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 10
    },
    signoutText: {
        color: 'white',
        fontFamily: 'Avenir-heavy',
        fontWeight: 'bold',
        fontSize: 14,
        textTransform: 'uppercase'
    },
    profileView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 30,
        paddingLeft: 15
    },
    avatar: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    nameView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    nameText: {
        fontSize: 24,
        fontFamily: "Avenir-Heavy",
        color: '#FFFFFF',
        padding: 10,
        alignSelf: 'flex-start'
    },
    emailText: {
        fontSize: 16,
        fontFamily: "Avenir",
        color: '#FFD6DA',
        padding: 8,
        paddingTop: 4,
        alignSelf: 'flex-start'
    },
    editText: {
        fontSize: 14,
        fontFamily: "Avenir-Heavy",
        fontWeight: 'bold',
        color: '#FFFFFF',
        padding: 10
    }
})

export default NewProfileHeader;

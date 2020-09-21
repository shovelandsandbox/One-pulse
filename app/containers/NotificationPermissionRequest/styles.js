/* eslint-disable */
import { StyleSheet } from "react-native";

import { CoreConfig } from "@pru-rt-internal/pulse-common";

export default (notificationRequestStyles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    header: {
        height: 44,
        // backgroundColor: '#8ac',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    skip_btn: {
        // backgroundColor: '#96f6',
        paddingRight: 20,
        justifyContent: 'center',
    },
    skip_text: {
        fontFamily: 'Avenir',
        color: '#ed1b2e',
        fontSize: 16,
        textAlign: 'center',
    },
    imageContainer: {
        // justifyContent: "center",
        marginTop: 40,
        alignItems: "center",
        backgroundColor: "#ffffff",
        height: '40%',
    },
    text_kit_container: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text_kit: {
        marginTop: 20,
        // height: 30,
        textAlign: 'center',
        color: '#515B61',
        backgroundColor: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Avenir',
        marginLeft:10,
        marginRight:10,
    },
    text_detail: {
        marginTop: 18,
        marginLeft: 10,
        marginRight: 10,
        // height: 44,
        color: '#222529',
        backgroundColor: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Avenir',
    },
    text_tip: {
        marginTop: 24,
        marginLeft: 20,
        marginRight: 20,
        color: '#515B61',
        backgroundColor: '#fff',
        fontSize: 12,
        fontFamily: 'Avenir',
        textAlign: 'center',
    },
    allow_btn: {
        marginTop: 60,
        // marginBottom: 20,
        width: 220,
        // alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#ed1b2e',
        height: 44,
        borderRadius: 22,
    },
    allow_text: {
        alignSelf: 'center',
        color: '#fff',
        // backgroundColor: '#8ac',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Avenir',
    }
}));

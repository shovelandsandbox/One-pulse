/* eslint-disable */
import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import Styles from "./styles";
import { NOTIFICATION_REQUEST } from "../../config/images";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
    CoreActions,
    metaHelpers,
    CoreConfig,
    CoreServices,
    CoreActionTypes,
} from "@pru-rt-internal/pulse-common";
// import firebase from "react-native-firebase";
import OpenSettings from "react-native-open-settings";
import { CustomAlert } from "./../../components";

const { getFirebaseMsgToken, checkPermission } = CoreServices;
const {
    PERMISSIONPUSH,
    PERMISSIONPUSH_SKIP,
    PERMISSIONPUSH_LETKEEPINTOUCH,
    PERMISSIONPUSH_NOTIFY,
    PERMISSIONPUSH_PERMISSION,
    PERMISSIONPUSH_ALLOW,
    PERMISSIONPUSH_TITLE,
    PERMISSIONPUSH_SETTINGS_DESC,
    PERMISSIONPUSH_PERM_GRANTED_DESC,
    PERMISSIONPUSH_OK,
    pageKeys,
} = CoreConfig;
const {
    setNotificationProcessed
} = CoreActions

class NotificationRequest extends Component {

    requestPermission = async () => {
        const { navigation } = this.props;
        try {
            // await firebase.messaging().requestPermission();
            // const fcmToken = await getFirebaseMsgToken();
            // console.log("fcmToken = ", fcmToken);
            // this.props.sendFireBaseToken(fcmToken);
            // this.props.setNotificationProcessed(true, true);
            // navigation.goBack();
            return true;
        } catch (error) {
            //permission denied
            this.props.setNotificationProcessed(true, false);
            navigation.goBack();
            return false;
        }
    };

    _requestNotificationPermission() {
        if (!this.props.isNotificationProcessed) {
            this.requestPermission();
        } else {
            checkPermission().then((isPermAvailable) => {
                if (isPermAvailable) {
                    this.showAlertAndGoBack();
                } else {
                    this.showAlertAndOpenSettings();
                }
            });
        }
    }

    showAlertAndGoBack = () => {
        const { navigation } = this.props;
        const metaAlertTitle = metaHelpers.findElement(PERMISSIONPUSH, PERMISSIONPUSH_TITLE).label;
        const metaGrantedDesc = metaHelpers.findElement(PERMISSIONPUSH, PERMISSIONPUSH_PERM_GRANTED_DESC).label;
        const metaAlertOk = metaHelpers.findElement(PERMISSIONPUSH, PERMISSIONPUSH_OK).label;
        CustomAlert.show(metaAlertTitle, metaGrantedDesc, {
            positiveText: metaAlertOk,
            onPositivePress: () => {
                navigation.goBack();
            }
        });
    }

    showAlertAndOpenSettings = () => {
        const metaAlertTitle = metaHelpers.findElement(PERMISSIONPUSH, PERMISSIONPUSH_TITLE).label;
        const metaSettingsAlertDesc = metaHelpers.findElement(PERMISSIONPUSH, PERMISSIONPUSH_SETTINGS_DESC).label;
        const metaAlertOk = metaHelpers.findElement(PERMISSIONPUSH, PERMISSIONPUSH_OK).label;
        CustomAlert.show(metaAlertTitle, metaSettingsAlertDesc, {
            positiveText: metaAlertOk,
            onPositivePress: () => {
                OpenSettings.openSettings();
            }
        });
    }

    _onSkip() {
        this.props.setNotificationProcessed(false, false);
        const { navigation } = this.props;
        navigation.goBack();
    }

    render() {

        return (
            <View style={Styles.container}>
                <View style={Styles.header}>
                    <TouchableOpacity style={Styles.skip_btn} onPress={this._onSkip.bind(this)}>
                        <Text style={Styles.skip_text}>
                            {metaHelpers.findElement(PERMISSIONPUSH, PERMISSIONPUSH_SKIP).label}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={Styles.imageContainer}>
                    <Image source={NOTIFICATION_REQUEST} />
                </View>
                <Text style={Styles.text_kit}> {metaHelpers.findElement(PERMISSIONPUSH, PERMISSIONPUSH_LETKEEPINTOUCH).label}</Text>
                <Text style={Styles.text_detail}>
                    {metaHelpers.findElement(PERMISSIONPUSH, PERMISSIONPUSH_NOTIFY).label}
                </Text>
                <Text style={Styles.text_tip}>
                    {metaHelpers.findElement(PERMISSIONPUSH, PERMISSIONPUSH_PERMISSION).label}
                </Text>
                <TouchableOpacity style={Styles.allow_btn} onPress={this._requestNotificationPermission.bind(this)}>
                    <Text style={Styles.allow_text}>{metaHelpers.findElement(PERMISSIONPUSH, PERMISSIONPUSH_ALLOW).label}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

NotificationRequest.propTypes = {
    setNotificationProcessed: PropTypes.func,
}

const mapStateToProps = state => ({
    notificationGranted: state.userPreferences.notificationGranted,
    isNotificationProcessed: state.userPreferences.notificationProcessed,
});

export default connect(
    mapStateToProps,
    {
        setNotificationProcessed,
        sendFireBaseToken: fcmToken => ({
            context: pageKeys.LOGIN,
            type: CoreActionTypes.UPDATE_CUSTOMER_DEVICE_1,
            payload: {
                fcmToken
            }
        }),
    }
)(NotificationRequest)
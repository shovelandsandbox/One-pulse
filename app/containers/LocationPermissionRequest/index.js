/* eslint-disable */
import React, { Component } from "./node_modules/react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { NOTIFICATION_REQUEST } from "../../config/images";
import PropTypes from './node_modules/prop-types';
import { connect } from "./node_modules/react-redux";
import {
    CoreActions,
} from "./node_modules/@pru-rt-internal/pulse-common";

class LocationPermissionRequest extends Component {

    render() {
        return (
            <View style={Styles.container}>
                <View style={Styles.header}>
                    <TouchableOpacity style={Styles.skip_btn} onPress={this._onSkip.bind(this)}>
                        <Text style={Styles.skip_text}>
                            skip
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={Styles.imageContainer}>
                    <Image source={NOTIFICATION_REQUEST} />
                </View>
                <Text style={Styles.text_kit}>Let's keep in touch!</Text>
                <Text style={Styles.text_detail}>
                    It is important that we are able to notify you of important
                    information.
                </Text>
                <Text style={Styles.text_tip}>
                    We will ask for permission to send notifications.
                </Text>
                <TouchableOpacity style={Styles.allow_btn} onPress={this._requestNotificationPermission.bind(this)}>
                    <Text style={Styles.allow_text}>Allow</Text>
                </TouchableOpacity>
            </View>
        );
    }

}
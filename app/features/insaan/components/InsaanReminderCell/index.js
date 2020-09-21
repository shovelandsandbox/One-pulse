/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";
import { INSAAN_CARD_ALERT_MUTE, INSAAN_CARD_ALERT_ON_SOLID } from "../../../../config/images";
import * as InsaanType from '../../configs/insaanTypes';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    CoreUtils,
    CoreConfig,
} from '@pru-rt-internal/pulse-common'
import { InsaanReminderStyle as styles } from "./styles";
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
const {
    SCHEDULEINSAAN,
    SETREMINDERINSAAN,
    ATTIMEOFEVENTINSAAN,
    FIVEMININSAAN,
    TENMININSAAN,
    FIFTEENMININSAAN,
    THIRTYMININSAAN
} = CoreConfig
const { metaHelpers } = CoreUtils

class InsaanReminderCell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reminderIsOn: props.isOn,
            reminderTime: props.timeOffset,
            isOverrideMute: []
        };
    }


    setReminder = (time, status) => {
        const { type } = this.props
        this.props.typeTimeCallback(type, status, time)
    }

    snoozeReminder = (time, status) => {
        const { type, isOn, timeOffset } = this.props
        const { reminderIsOn = isOn, reminderTime = timeOffset } = this.props;
        if (reminderIsOn) {
            this.props.typeTimeCallback(type, status, time)
        }
        this.props.dispatchEvent(events.MuteOneClick);
    }

    render() {
        const {
            type,
            time,
            muteAll,
            isOn,
            timeOffset
        } = this.props

        InsaanType.validate(type)

        const displayName = InsaanType.displayNameForType(type);
        const displayIcon = InsaanType.iconForType(type);

        const { reminderIsOn = isOn, reminderTime = timeOffset } = this.props;

        return (

            <View
                style={styles.container1}
            >

                <View style={styles.container2}>

                    <View style={{ flexDirection: 'row' }}>

                        <Text style={styles.displayName}>{displayName}</Text>


                        <Text style={styles.timeStyle}>{time}</Text>

                    </View>

                    <Image
                        style={styles.displayInsaanIcon}
                        source={displayIcon}
                    />
                </View>

                <View style={styles.container3}>

                    <Text style={styles.setReminder}>
                        {metaHelpers.findElement(SCHEDULEINSAAN, SETREMINDERINSAAN).label}
                    </Text>

                    <TouchableOpacity onPress={() => this.snoozeReminder(0, false)} disabled={!reminderIsOn ? true : false}>
                        <Image
                            style={{
                                width: 16,
                                height: 16,
                                tintColor: reminderIsOn || (this.state.isOverrideMute.length > 0 && !muteAll) ? '#ed1b2c' : '#a9a9a9',
                                resizeMode: 'contain',
                            }}
                            source={reminderIsOn || (this.state.isOverrideMute.length > 0 && !muteAll) ? INSAAN_CARD_ALERT_ON_SOLID : INSAAN_CARD_ALERT_MUTE}
                        />
                    </TouchableOpacity>

                </View>

                <View>

                    <View style={{ flexDirection: "row", marginVertical: 10 }}>

                        <TouchableOpacity
                            style={{
                                marginRight: 8,
                                flex: 2,
                                borderRadius: 5,
                                borderWidth: 0.5,
                                borderColor: '#a9a9a9',
                                backgroundColor:
                                    reminderTime === 0 && reminderIsOn || (this.state.isOverrideMute.includes(0) && !muteAll)

                                        ? "#ed1b2c"
                                        : "#ffffff"
                            }}
                            onPress={() => {
                                this.setReminder(0, true);
                                this.props.dispatchEvent(events.ReminderZeroClick);
                            }}
                        >
                            <Text
                                style={{
                                    marginVertical: 10,
                                    marginHorizontal: 15,
                                    alignSelf: "center",
                                    color:
                                        reminderTime === 0 && reminderIsOn || (this.state.isOverrideMute.includes(0) && !muteAll)

                                            ? "#ffffff"
                                            : "#a9a9a9",
                                    fontFamily: "Avenir",
                                    fontSize: 14,
                                    fontWeight: "300"
                                }}
                            >
                                {metaHelpers.findElement(SCHEDULEINSAAN, ATTIMEOFEVENTINSAAN).label}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                flex: 1,
                                borderRadius: 5,
                                borderRadius: 5,
                                borderWidth: 0.5,
                                borderColor: '#a9a9a9',
                                backgroundColor:
                                    reminderTime === 5 && reminderIsOn || (this.state.isOverrideMute.includes(5) && !muteAll)

                                        ? "#ed1b2c"
                                        : "#ffffff"
                            }}
                            onPress={() => {
                                this.setReminder(5, true);
                                this.props.dispatchEvent(events.ReminderFiveClick);
                            }}
                        >
                            <Text
                                style={{
                                    marginVertical: 10,
                                    marginHorizontal: 15,
                                    alignSelf: "center",
                                    color:
                                        reminderTime === 5 && reminderIsOn || (this.state.isOverrideMute.includes(5) && !muteAll)

                                            ? "#ffffff"
                                            : "#a9a9a9",
                                    fontFamily: "Avenir",
                                    fontSize: 14,
                                    fontWeight: "300"
                                }}
                            >
                                {metaHelpers.findElement(SCHEDULEINSAAN, FIVEMININSAAN).label}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row" }}>

                        <TouchableOpacity
                            style={{
                                marginRight: 8,
                                flex: 1,
                                borderRadius: 5,
                                borderRadius: 5,
                                borderWidth: 0.5,
                                borderColor: '#a9a9a9',
                                backgroundColor:
                                    reminderTime === 10 && reminderIsOn || (this.state.isOverrideMute.includes(10) && !muteAll)
                                        ? "#ed1b2c"
                                        : "#ffffff"
                            }}
                            onPress={() => {
                                this.setReminder(10, true);
                                this.props.dispatchEvent(events.ReminderTenClick);
                            }}
                        >
                            <Text
                                style={{
                                    marginVertical: 10,
                                    marginHorizontal: 15,
                                    alignSelf: "center",
                                    color:
                                        reminderTime === 10 && reminderIsOn || (this.state.isOverrideMute.includes(10) && !muteAll)
                                            ? "#ffffff"
                                            : "#a9a9a9",
                                    fontFamily: "Avenir",
                                    fontSize: 14,
                                    fontWeight: "300"
                                }}
                            >
                                {metaHelpers.findElement(SCHEDULEINSAAN, TENMININSAAN).label}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                marginRight: 8,
                                flex: 1,
                                borderRadius: 5,
                                borderRadius: 5,
                                borderWidth: 0.5,
                                borderColor: '#a9a9a9',
                                backgroundColor:
                                    reminderTime === 15 && reminderIsOn || (this.state.isOverrideMute.includes(15) && !muteAll)
                                        ? "#ed1b2c"
                                        : "#ffffff"
                            }}
                            onPress={() => {
                                this.setReminder(15, true);
                                this.props.dispatchEvent(events.ReminderFifteenClick);
                            }}
                        >
                            <Text
                                style={{
                                    marginVertical: 10,
                                    marginHorizontal: 15,
                                    alignSelf: "center",
                                    color:
                                        reminderTime === 15 && reminderIsOn || (this.state.isOverrideMute.includes(15) && !muteAll)
                                            ? "#ffffff"
                                            : "#a9a9a9",
                                    fontFamily: "Avenir",
                                    fontSize: 14,
                                    fontWeight: "300"
                                }}
                            >
                                {metaHelpers.findElement(SCHEDULEINSAAN, FIFTEENMININSAAN).label}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                flex: 1,
                                borderRadius: 5,
                                borderRadius: 5,
                                borderWidth: 0.5,
                                borderColor: '#a9a9a9',
                                backgroundColor:
                                    reminderTime === 30 && reminderIsOn || (this.state.isOverrideMute.includes(30) && !muteAll)
                                        ? "#ed1b2c"
                                        : "#ffffff"
                            }}
                            onPress={() => {
                                this.setReminder(30, true);
                                this.props.dispatchEvent(events.ReminderThirtyClick);
                            }}
                        >
                            <Text
                                style={{
                                    marginVertical: 10,
                                    marginHorizontal: 15,
                                    alignSelf: "center",
                                    color:
                                        reminderTime === 30 && reminderIsOn || (this.state.isOverrideMute.includes(30) && !muteAll)
                                            ? "#ffffff"
                                            : "#a9a9a9",
                                    fontFamily: "Avenir",
                                    fontSize: 14,
                                    fontWeight: "300"
                                }}
                            >
                                {metaHelpers.findElement(SCHEDULEINSAAN, THIRTYMININSAAN).label}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        )
    }
}

InsaanReminderCell.PropTypes = {
    type: PropTypes.string,
    time: PropTypes.string,
    isOn: PropTypes.bool,
    timeOffset: PropTypes.number,
    typeTimeCallback: PropTypes.func
}

const mapStateToProps = state => {

};

export default connect(
    mapStateToProps,
    {
        dispatchEvent,
    }
)(InsaanReminderCell);
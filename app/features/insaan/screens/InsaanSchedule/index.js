/* eslint-disable */
import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    Platform,
    PermissionsAndroid,
    PushNotificationIOS
} from "react-native";
import { connect } from "react-redux";
import { INSAAN_CARD_ALERT_MUTE, EDIT_ICON } from "../../../../config/images";
import PropTypes from "prop-types";
import { InsaanScheduleStyle as styles } from "./styles"
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import * as InsaanType from "../../configs/insaanTypes";

import InsaanReminderCell from "../../components/InsaanReminderCell";
import Calendar from "../../components/Canlendar";
import {
    CoreActions,
    CoreConfig,
    CoreActionTypes,
    CoreUtils
} from "@pru-rt-internal/pulse-common";
import * as NotificationTool from "../../../../utils/NotificationScheduleTool";
import moment from "moment";
import Geolocation from "Geolocation";
const {
    INSAAN_PRAYER_CONVENTION,
    INSAAN_EGYPT,
    INSAAN_NORTHAMERICA,
    INSAAN_MUSLIM,
    INSAAN_UMMAL,
    INSAAN_ISLAM,
    INSAAN_JAKIM,
    INSAAN_CONFIRM,
    INSAAN_HOME_TILE,
    INSAAN_NEXTPRAYERIN,
    MUTEINSAAN,
    SCHEDULEINSAAN,
    INSAAN_PRAYERIN
} = CoreConfig
const { metaHelpers } = CoreUtils

const { updateScheduledNotification } = CoreActions;
import {
    getPrayerTimeJAKIM,
    getPrayerTimeOtherconvention,
    gotoPrayerTimeConventionsScreen
} from '../../actions'

class InsaanSchedule extends Component {
    constructor(props) {
        super(props);
        const date = new moment();
        const index = date.format("YYYYMMDD");
        this.state = {
            presentingModal: false,
            editingType: null,
            editingTime: null,
            editingDate: null,
            displaySource: ["00:00", "00:00", "00:00", "00:00", "00:00", "00:00"],
            presentingIslamicDate: "",
            displaySourceIndex: index,
            nameTimePair: {},
            toggleMute: false,
            countDown: "--:--:--",
        };
    }



    componentWillMount() {
        const { userPreferences } = this.props
        let {
            conventionCode,
            conventionStateCode,
            conventionZoneCode,
            Latitude,
            Longitude,
            scheduledNotifications
        } = userPreferences;

        const notifChecks = userPreferences && scheduledNotifications && scheduledNotifications[0];

        if (notifChecks) {
            let nameTimePair = this.state.nameTimePair
            for (let key in scheduledNotifications[0]) {
                nameTimePair[key] = {
                    isOn: scheduledNotifications[0][key].isOn,
                    offset: scheduledNotifications[0][key].offset
                }
            }
            this.setState({ nameTimePair })
        }

        const { prayerTimeJakimIndex, prayerTimeOtherIndex } = this.props;
        const cd = new moment();
        const editing = cd.format("YYYYMMDD");
        this.setState(
            {
                editingDate: editing
            },
            () => {
                let date = new moment();
                for (let i = 0; i < 7; i++) {
                    const fullDate = date.format("YYYY-MM-DD");
                    if (conventionStateCode && conventionZoneCode) {
                        this.getPrayerTimeJAKIMFun(fullDate);
                    } else {
                        if (Platform.OS == "ios") {
                            Geolocation.getCurrentPosition(
                                response => {
                                    const coords = response.coords;
                                    this.getPrayerTimeOtherconvention(
                                        coords.latitude,
                                        coords.longitude,
                                        fullDate
                                    );
                                },
                                err => { }
                            );
                        } else {
                            this.requestLocationPermission(fullDate);
                        }
                    }
                    date = date.add(1, "day");
                }
            }
        );
    }

    componentDidMount() {
        this._formatTimeFromResponse();

        let _this = this;
        this.timer = setInterval(() => {
            const { navigation } = this.props
            let nextPrayerTime = navigation.state.params.nextPrayerTime
            if (nextPrayerTime != undefined) {
                const tuple = nextPrayerTime.split("+")[0].split(":");
                const hour = parseInt(tuple[0]);
                const minu = parseInt(tuple[1]);

                var target = moment();
                target.set("hour", hour);
                target.set("minute", minu);
                target.set("second", 0);

                const current = moment();

                if (target.isBefore(current)) {
                    target.set("d", current.get('d') + 1) // caculate for next day
                }

                const value = target.unix() - current.unix();
                const date = moment.unix(value);
                const h = Math.floor(value / 60 / 60);
                const m = Math.floor((value - h * 3600) / 60);
                const s = Math.floor(value - (h * 60 * 60 + m * 60));

                const hs = h < 10 ? `0${h}` : `${h}`;
                const ms = m < 10 ? `0${m}` : `${m}`;
                const ss = s < 10 ? `0${s}` : `${s}`;

                const fs = `${hs}:${ms}:${ss}`;

                _this.setState({
                    countDown: fs
                });
            }
        }, 1000);
        this.props.dispatchEvent(events.InsaanScheduleScreen);
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    async requestLocationPermission(fullDate) {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    response => {
                        const coords = response.coords;
                        this.getPrayerTimeOtherconvention(
                            coords.latitude,
                            coords.longitude,
                            fullDate
                        );
                    },
                    err => { }
                );
            } else {
            }
        } catch (err) {
            console.warn(err);
        }
    }

    _didSelectCalendarItemByIndex(index, fullDate) {
        const key = fullDate.split("-").join("");
        this.setState({
            displaySourceIndex: key
        });
    }

    getPrayerTimeOtherconvention = (latitude, longitude, fullDate) => {
        let { token, userPreferences } = this.props;
        const conventionCode = userPreferences.conventionCode;
        var timeZone = moment.parseZone(moment().format()).format('ZZ')
        this.props.getPrayerTimeOtherconvention(
            {
                projs: null,
                filter: {
                    simpleExpression: null,
                    logicalExpression: {
                        op: "AND",
                        expressions: [
                            {
                                lhs: ["convention"],
                                op: "EQ",
                                value: {
                                    value: conventionCode
                                }
                            },
                            {
                                lhs: ["prayerDate"],
                                op: "EQ",
                                value: {
                                    value: fullDate
                                }
                            },
                            {
                                lhs: ["timeZone"],
                                op: "EQ",
                                value: {
                                    value: timeZone
                                }
                            },
                            {
                                lhs: ["latitude"],
                                op: "EQ",
                                value: {
                                    value: String(latitude)
                                }
                            },
                            {
                                lhs: ["longitude"],
                                op: "EQ",
                                value: {
                                    value: String(longitude)
                                }
                            }
                        ]
                    }
                },
                limit: null,
                orderBy: null
            },
            {
                realm: "prayerTimings",
                token: token
            }
        );
    };

    getPrayerTimeJAKIMFun = fullDate => {
        let { token, userPreferences } = this.props;
        const { conventionZoneCode } = userPreferences;
        var timeZone = moment.parseZone(moment().format()).format('ZZ')
        this.props.getPrayerTimeJAKIM(
            {
                projs: null,
                filter: {
                    simpleExpression: null,
                    logicalExpression: {
                        op: "AND",
                        expressions: [
                            {
                                lhs: ["id"],
                                op: "EQ",
                                value: {
                                    value: conventionZoneCode
                                }
                            },
                            {
                                lhs: ["convention"],
                                op: "EQ",
                                value: {
                                    value: "JAKIM"
                                }
                            },
                            {
                                lhs: ["prayerDate"],
                                op: "EQ",
                                value: {
                                    value: fullDate
                                }
                            },
                            {
                                lhs: ["timeZone"],
                                op: "EQ",
                                value: {
                                    value: timeZone
                                }
                            }
                        ]
                    }
                },
                limit: null,
                orderBy: null
            },
            {
                realm: "prayerTimings",
                token: token
            }
        );
    };

    _arrayIndexForInsaanType(t) {

        switch (t) {
            case InsaanType.INSAAN_TYPE_BEFORE_SUNRISE:
                return 0;
            case InsaanType.INSAAN_TYPE_SUNRISE:
                return 1;
            case InsaanType.INSAAN_TYPE_NOON:
                return 2;
            case InsaanType.INSAAN_TYPE_AFTERNOON:
                return 3;
            case InsaanType.INSAAN_TYPE_SUNSET:
                return 4;
            case InsaanType.INSAAN_TYPE_NIGHT:
                return 5;
            default:
                return null;
        }
    }

    askPermission = () => {
        PushNotificationIOS.requestPermissions();
    }

    onConfirmPress = () => {
        const { nameTimePair } = this.state

        let { conventionStateCode, conventionZoneCode } = this.props.userPreferences;

        const { prayerTimeJakimIndex, prayerTimeOtherIndex } = this.props;

        const configPre = this.props.userPreferences.scheduledNotifications[0];
        let config = configPre || {};

        for (let key in nameTimePair) {

            const indexForType = this._arrayIndexForInsaanType(key);
            let notificationTimeList = [];
            let dates = [];
            let currentDate = new moment();
            const isOn = nameTimePair[key].isOn;
            const timeOffset = nameTimePair[key].offset;

            for (let i = 0; i < 7; i++) {
                const key = currentDate.format("YYYYMMDD");
                dates.push(key);
                let dict = null;
                if (conventionStateCode && conventionZoneCode) {
                    // Jakim
                    dict = prayerTimeJakimIndex[key];
                } else {
                    // Other
                    dict = prayerTimeOtherIndex[key];
                }
                if (dict == undefined) {
                    continue;
                }
                const arr = this._valuesOrderByTime(dict, false);
                const targetTime = arr[indexForType];

                const year = key.substring(0, 4);
                const month = key.substring(4, 6);
                const date = key.substring(6, 8);
                const hour = Number(targetTime.split(":")[0]);
                const minu = Number(targetTime.split(":")[1]);

                let targetDate = new Date();
                targetDate.setHours(hour, minu - timeOffset, 0);
                targetDate.setFullYear(year, month - 1, date);
                notificationTimeList.push(targetDate);
                currentDate = currentDate.add(1, "day");
            }

            config[key] = {
                isOn: isOn,
                offset: timeOffset,
                times: isOn ? notificationTimeList : [],
                dates: dates
            };
        }

        if (Platform.OS == "ios") {
            this.askPermission();
            this.props.updateScheduledNotification([config]);
            NotificationTool.reScheduleAllInsaanNotificationForWeek(config);
        }
        else {
            this.props.updateScheduledNotification([config]);
            NotificationTool.reScheduleAllInsanNotificationForWeek(config);
        }
        this.props.navigation.goBack()
        this.props.dispatchEvent(events.InsaanScheduleConfirmClick);
    }

    onMutePress = () => {
        const { userPreferences } = this.props;
        const configPre = userPreferences && userPreferences.scheduledNotifications && userPreferences.scheduledNotifications[0];
        // if (configPre) {
        // Object.values(configPre).forEach(it => {
        // it.isOn = false;
        // it.offset = 0;
        // });
        // }

        if (Platform.OS == "ios") {
            this.props.updateScheduledNotification([]);
            NotificationTool.reScheduleAllInsaanNotificationForWeek({});
        }
        else {
            this.props.updateScheduledNotification([]);
            NotificationTool.reScheduleAllInsanNotificationForWeek({});
        }
        this.setState({ allMute: true, nameTimePair: {} })
        this.props.dispatchEvent(events.MuteAllClick);
    }


    _fetchOnOffStatusForType(type) {
        const { userPreferences } = this.props;
        const scheduled = userPreferences.scheduledNotifications[0]
            ? userPreferences.scheduledNotifications[0]
            : {};

        const key = type ? type : this.state.editingType;
        const preValue = scheduled[key];
        const { nameTimePair } = this.state

        return nameTimePair && nameTimePair[key] ? nameTimePair[key].isOn : preValue ? preValue.isOn : false;
    }

    _fetchSourceWithIndex(idx) {
        const { prayerTimeJakimIndex, prayerTimeOtherIndex } = this.props;
        const key = idx;
        // Fetch source by current config
        let source = null;
        if (conventionStateCode && conventionZoneCode) {
            source = prayerTimeJakimIndex[key];
        } else {
            source = prayerTimeOtherIndex[key];
        }

        return source;
    }

    _fetchIslamicDateWithKey(key) {
        const s = this._fetchSourceWithIndex(key);
    }

    _fetchDisplaySourceWithKey(key) {
        const s = this._fetchSourceWithIndex(key);
    }

    _fetchTimeOffsetForType(type) {
        const { userPreferences } = this.props;
        const scheduled = userPreferences.scheduledNotifications
            ? userPreferences.scheduledNotifications
            : {};
        const key = type ? type : this.state.editingType;
        const { nameTimePair } = this.state;
        if (nameTimePair && nameTimePair[key]) {
            return nameTimePair[key].offset
        }
        const config = scheduled[0];
        if (!config) {
            return 0;
        }
        const preValue = config[key];

        return preValue ? preValue.offset : 0;
    }

    _formatTimeFromResponse() {
        const { prayerTimeJAKIM, prayerTimeOther, userPreferences } = this.props;

        let {
            conventionCode,
            conventionStateCode,
            conventionZoneCode
        } = userPreferences;
        if (conventionCode) {
            var possibleItems = this.props.prayerTimeOther.prayerTimes;
        } else {
            var possibleItems = this.props.prayerTimeJAKIM.prayerTimes;
        }

        // if (!possibleItems) {
        // possibleItems = this.props.prayerTimeJAKIM.prayerTimes;
        // }
        if (!possibleItems) {
            // See if there is Time Other, if not ,fallback to JAKIM, if both empty, display empty data
            possibleItems = this._buildEmptyData();
        }
        // Order data
        const timeArray = this._valuesOrderByTime(possibleItems);

        return timeArray;
    }

    _valuesOrderByTime(dict, shouldUpdateState = true) {
        var array = [];
        var example = {};
        var result = {};
        let islamicDate = "";
        // Add all values to array
        for (const key in dict) {
            if (key == "gregorianDate") {
                continue;
            }
            if (key == "islamicDate") {
                islamicDate = dict[key];
                continue;
            }
            const v = dict[key];
            array.push(dict[key]);
            example[v] = key;
        }
        // Sort by asec
        array.sort();
        if (shouldUpdateState) {
            this.setState({
                displaySource: array,
                presentingIslamicDate: islamicDate
            });
        }
        return array;
    }

    _buildEmptyData() {
        return {
            subuhTime: "00:00",
            syurukTime: "00:00",
            zohorTime: "00:00",
            asarTime: "00:00",
            maghribTime: "00:00",
            isyakTime: "00:00",
        };
    }


    _transformToAMPM(timeString) {
        if (timeString == undefined) {
            return " ";
        }

        const h = parseInt(timeString.split(":")[0]);
        const m = parseInt(timeString.split(":")[1]);

        const hs =
            h > 12
                ? `${h - 12 < 10 ? "0" : ""}${h - 12}`
                : `${h < 10 ? "0" : ""}${h}`;
        const ms = m < 10 ? `0${m}` : `${m}`;
        const s = `${hs}:${ms} ${h >= 12 ? "PM" : "AM"}`;
        return s;
    }


    confirmButtonStyle = () => {
        var count = 0;
        let nameTimePair = this.state.nameTimePair
        for (let key in nameTimePair) {
            if (nameTimePair[key].isOn) {
                count += 1
                break;
            }
        }
        if (Object.keys(this.state.nameTimePair).length === 0 && count === 0) {
            return true
        }

        else if (count === 1) {
            return false
        }
        else {
            return true
        }
    }

    checkMuteVisibility = () => {
        const { userPreferences } = this.props
        const muteVisible = userPreferences && userPreferences.scheduledNotifications;
        if (muteVisible && muteVisible[0]) {
            const isVisiblePresent = Object.values(muteVisible[0]).find(it => it.isOn === true);
            if (isVisiblePresent) {
                return true;
            }
        }
        return false;
    }

    showPrayerAuthority = () => {
        const { userPreferences } = this.props;
        let conventionCode = userPreferences.conventionCode
        let stateName = userPreferences.stateName

        if (userPreferences && conventionCode) {

            if (conventionCode === "EGYPT") {
                return metaHelpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_EGYPT).label + ', ' + metaHelpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_JAKIM).label
            }
            else if (conventionCode === "ISNA") {
                return metaHelpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_NORTHAMERICA).label + ', ' + metaHelpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_JAKIM).label
            }
            else if (conventionCode === "WML") {
                return metaHelpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_MUSLIM).label + ', ' + metaHelpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_JAKIM).label
            }
            else if (conventionCode === "MAKKAH") {
                return metaHelpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_UMMAL).label + ', ' + metaHelpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_JAKIM).label
            }
            else if (conventionCode === "KARACHI") {
                return metaHelpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_ISLAM).label + ', ' + metaHelpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_JAKIM).label
            }
            else {
                return null
            }
        }

        if (userPreferences && stateName) {
            return stateName + ', ' + metaHelpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_JAKIM).label
        }

    }

    render() {

        const {
            displaySourceIndex,
            allMute,
            countDown,
            nameTimePair
        } = this.state;
        const {
            userPreferences,
            prayerTimeJAKIM,
            prayerTimeOther,
            prayerTimeJakimIndex,
            prayerTimeOtherIndex
        } = this.props;

        const muteVisible = this.checkMuteVisibility();

        const { conventionStateCode, conventionZoneCode } = userPreferences;
        const scheduled = userPreferences.scheduledNotifications
            ? userPreferences.scheduledNotifications
            : {};

        const date = moment();
        const year = date.format("YYYY");
        let moths = new Date().getMonth()
        let { language } = userPreferences
        let month = "";
        switch (moths) {
            case 0: month = language == "BM" ? "Januari" : "January"; break;
            case 1: month = language == "BM" ? "Februari" : "February"; break;
            case 2: month = language == "BM" ? "Mac" : "March"; break;
            case 3: month = language == "BM" ? "April" : "April"; break;
            case 4: month = language == "BM" ? "Mei" : "May"; break;
            case 5: month = language == "BM" ? "Jun" : "June"; break;
            case 6: month = language == "BM" ? "Julai" : "July"; break;
            case 7: month = language == "BM" ? "Ogos" : "August"; break;
            case 8: month = language == "BM" ? "September" : "September"; break;
            case 9: month = language == "BM" ? "Oktober" : "October"; break;
            case 10: month = language == "BM" ? "November" : "November"; break;
            case 11: month = language == "BM" ? "Disember" : "December"; break;
        }

        let useJakim = conventionStateCode && conventionZoneCode;

        const dataSource = useJakim
            ? prayerTimeJakimIndex[displaySourceIndex]
            : prayerTimeOtherIndex[displaySourceIndex];

        let authorityView = userPreferences && (userPreferences.conventionCode.trim() !== "" || userPreferences.stateName.trim !== "")

        let NextPrayerIn = metaHelpers.findElement(INSAAN_HOME_TILE, INSAAN_NEXTPRAYERIN).label
        let NextPrayerTwo = metaHelpers.findElement(INSAAN_HOME_TILE, INSAAN_PRAYERIN).label
        return (
            <View style={styles.container1}>

                <Calendar
                    onBackPress={() => {
                        this.props.navigation.goBack()
                        this.props.dispatchEvent(events.InsaanScheduleScreenBackClick);
                    }}
                    onItemSelectAction={(idx, date) => {
                        this._didSelectCalendarItemByIndex(idx, date);
                        this.props.dispatchEvent(events.DateClick);
                    }} />

                <View style={{ flex: 1 }}>

                    <ImageBackground
                        style={styles.backgroundImage}
                        resizeMode='cover'
                        source={{ uri: "https://apidev.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/8f05f3dd-590c-487a-bb1e-9b895ec714fc?namespace=MY" }}
                    >

                        <View style={styles.container2}>

                            <View>
                                <Text
                                    style={styles.date}
                                >
                                    {`${month} ${year}`}
                                </Text>
                                <Text
                                    style={styles.islamDate}
                                >
                                    {dataSource ? dataSource.islamicDate : ""}
                                </Text>
                            </View>

                            <View style={styles.nextPrayer}>
                                <Text style={styles.nextPrayerText}>{NextPrayerIn}</Text>
                                <Text style={styles.nextPrayerText}>{NextPrayerTwo}</Text>
                                <Text style={styles.countdown}>{this.state.countDown}</Text>
                            </View>

                        </View>

                        {authorityView &&
                            <View style={styles.container3}>
                                <View
                                    style={styles.authority}>
                                    <Text style={styles.showAuthority}>{this.showPrayerAuthority()}</Text>
                                    <TouchableOpacity onPress={() => {
                                        this.props.gotoPrayerTimeConventionsScreen();
                                        this.props.dispatchEvent(events.EditLocationClick);
                                    }}>
                                        <Image
                                            style={styles.icon}
                                            source={EDIT_ICON}
                                        >
                                        </Image>
                                    </TouchableOpacity>
                                </View>

                            </View>}

                    </ImageBackground>



                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        {muteVisible
                            ? <TouchableOpacity
                                onPress={() => this.onMutePress()}
                                style={styles.onMute}>
                                <Image source={INSAAN_CARD_ALERT_MUTE}
                                    style={styles.muteIcon} resizeMode='contain' />

                                <Text style={{
                                    fontSize: 15,
                                    color: Object.keys(this.state.nameTimePair).length === 0 ? "#e39198" : "#ed1b2c",
                                    fontWeight: 'normal'
                                }}>
                                    {metaHelpers.findElement(SCHEDULEINSAAN, MUTEINSAAN).label}
                                </Text>
                            </TouchableOpacity>
                            : null}


                        <InsaanReminderCell
                            type={InsaanType.INSAAN_TYPE_BEFORE_SUNRISE}
                            time={this._transformToAMPM(
                                this._valuesOrderByTime(dataSource, false)[0]
                            )}
                            isOn={this._fetchOnOffStatusForType(InsaanType.INSAAN_TYPE_BEFORE_SUNRISE)}
                            timeOffset={this._fetchTimeOffsetForType(InsaanType.INSAAN_TYPE_BEFORE_SUNRISE)}
                            muteAll={allMute}
                            typeTimeCallback={(prayerName, onOffStatus, reminderTime) => {

                                let nameTimePair = this.state.nameTimePair
                                nameTimePair[prayerName] = {
                                    isOn: onOffStatus,
                                    offset: reminderTime,
                                }

                                this.setState({ nameTimePair, allMute: false })
                            }}
                        />

                        <InsaanReminderCell
                            type={InsaanType.INSAAN_TYPE_SUNRISE}
                            time={this._transformToAMPM(
                                this._valuesOrderByTime(dataSource, false)[1]
                            )}

                            isOn={this._fetchOnOffStatusForType(InsaanType.INSAAN_TYPE_SUNRISE)}
                            timeOffset={this._fetchTimeOffsetForType(InsaanType.INSAAN_TYPE_SUNRISE)}
                            muteAll={allMute}
                            typeTimeCallback={(prayerName, onOffStatus, reminderTime) => {
                                let nameTimePair = this.state.nameTimePair
                                nameTimePair[prayerName] = {
                                    isOn: onOffStatus,
                                    offset: reminderTime,
                                }
                                this.setState({ nameTimePair, allMute: false })
                            }}
                        />

                        <InsaanReminderCell
                            type={InsaanType.INSAAN_TYPE_NOON}
                            time={this._transformToAMPM(
                                this._valuesOrderByTime(dataSource, false)[2]
                            )}

                            isOn={this._fetchOnOffStatusForType(InsaanType.INSAAN_TYPE_NOON)}
                            timeOffset={this._fetchTimeOffsetForType(InsaanType.INSAAN_TYPE_NOON)}
                            muteAll={allMute}
                            typeTimeCallback={(prayerName, onOffStatus, reminderTime) => {
                                let nameTimePair = this.state.nameTimePair
                                nameTimePair[prayerName] = {
                                    isOn: onOffStatus,
                                    offset: reminderTime,
                                }
                                this.setState({ nameTimePair, allMute: false })
                            }}
                        />

                        <InsaanReminderCell
                            type={InsaanType.INSAAN_TYPE_AFTERNOON}
                            time={this._transformToAMPM(
                                this._valuesOrderByTime(dataSource, false)[3]
                            )}

                            isOn={this._fetchOnOffStatusForType(InsaanType.INSAAN_TYPE_AFTERNOON)}
                            timeOffset={this._fetchTimeOffsetForType(InsaanType.INSAAN_TYPE_AFTERNOON)}
                            muteAll={allMute}
                            typeTimeCallback={(prayerName, onOffStatus, reminderTime) => {
                                let nameTimePair = this.state.nameTimePair
                                nameTimePair[prayerName] = {
                                    isOn: onOffStatus,
                                    offset: reminderTime,
                                }
                                this.setState({ nameTimePair, allMute: false })
                            }}
                        />

                        <InsaanReminderCell
                            type={InsaanType.INSAAN_TYPE_SUNSET}
                            time={this._transformToAMPM(
                                this._valuesOrderByTime(dataSource, false)[4]
                            )}

                            isOn={this._fetchOnOffStatusForType(InsaanType.INSAAN_TYPE_SUNSET)}
                            timeOffset={this._fetchTimeOffsetForType(InsaanType.INSAAN_TYPE_SUNSET)}
                            muteAll={allMute}
                            typeTimeCallback={(prayerName, onOffStatus, reminderTime) => {
                                let nameTimePair = this.state.nameTimePair
                                nameTimePair[prayerName] = {
                                    isOn: onOffStatus,
                                    offset: reminderTime,
                                }
                                this.setState({ nameTimePair, allMute: false })
                            }}
                        />

                        <InsaanReminderCell
                            type={InsaanType.INSAAN_TYPE_NIGHT}
                            time={this._transformToAMPM(
                                this._valuesOrderByTime(dataSource, false)[5]
                            )}

                            isOn={this._fetchOnOffStatusForType(InsaanType.INSAAN_TYPE_NIGHT)}
                            timeOffset={this._fetchTimeOffsetForType(InsaanType.INSAAN_TYPE_NIGHT)}
                            muteAll={allMute}
                            typeTimeCallback={(prayerName, onOffStatus, reminderTime) => {
                                let nameTimePair = this.state.nameTimePair
                                nameTimePair[prayerName] = {
                                    isOn: onOffStatus,
                                    offset: reminderTime,
                                }
                                this.setState({ nameTimePair, allMute: false })
                            }}
                        />

                    </ScrollView>

                    <View style={styles.confirmButton}>
                        <TouchableOpacity
                            style={{
                                borderRadius: 10,
                                alignSelf: 'flex-end',
                                justifyContent: "center",
                                alignItems: 'center',
                                backgroundColor: this.confirmButtonStyle() ? "#e39198" : "#ed1b2c",
                                paddingVertical: 8,
                                paddingHorizontal: 40
                            }}
                            onPress={() => { this.onConfirmPress() }}
                            //disabled={Object.keys(nameTimePair).length === 0 ? true : false}
                            disabled={this.confirmButtonStyle()}
                        >

                            <Text
                                style={styles.confirm}
                            >
                                {metaHelpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_CONFIRM).label}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        );
    }
}

InsaanSchedule.PropTypes = {
    navigation: PropTypes.object,
    nextPrayerTime: PropTypes.string
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userPreferences: state.userPreferences,
        prayerTimeJAKIM: state.InsanReducer.prayerTimeJAKIM,
        prayerTimeOther: state.InsanReducer.prayerTimeOther,
        prayerTimeJakimIndex: state.InsanReducer.prayerTimeJakimIndex,
        prayerTimeOtherIndex: state.InsanReducer.prayerTimeOtherIndex,
    };
};


export default connect(
    mapStateToProps,
    {
        updateScheduledNotification,
        getPrayerTimeJAKIM,
        getPrayerTimeOtherconvention,
        gotoPrayerTimeConventionsScreen,
        dispatchEvent,
    }
)(InsaanSchedule);
/* eslint-disable */
import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    ImageBackground,
    Image,
    Animated,
    Text,
    PermissionsAndroid,
    Dimensions,
    Platform,
    DeviceEventEmitter
} from 'react-native';
import {
    EDIT_ICON,
    HOME_TILE_COMPASS,
    INSAAN_COMPASS,
    INSAAN_FIXED,
    INSAAN_PIN,
} from '../../../../config/images'
import PropTypes from "prop-types";
import S from './styles';
import {
    CoreUtils,
    CoreConfig,
    CoreActionTypes
} from '@pru-rt-internal/pulse-common'
const { metaHelpers } = CoreUtils
import { connect } from "react-redux";
import Geolocation from "Geolocation";

const {
    INSAAN_HOME_TILE,
    INSAAN_CALENDAR,
    INSAAN_PRAYER,
    INSAAN_NEXTPRAYERIN,
    INSAAN_PRAYER_CONVENTION,
    INSAAN_EGYPT,
    INSAAN_NORTHAMERICA,
    INSAAN_MUSLIM,
    INSAAN_UMMAL,
    INSAAN_ISLAM,
    INSAAN_JAKIM,
    INSAAN_PRAYERIN
} = CoreConfig;
import moment from "moment";
import * as InsaanType from "../../configs/insaanTypes";
import { gotoPrayerTimeConventionsScreen } from '../../actions'
import * as ReactNativeHeading from 'react-native-heading';
import { InsaanCardStyle as styles } from "./styles";



class InsaanCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tiem: "123",
            Qubla: "0",
            Qubla1: "000",
            Direction: "",
            countDown: "--:--:--",
        };
        this.spinValue = new Animated.Value(0);
        this.spinValue1 = new Animated.Value(0);
    }

    componentDidMount() {
        ReactNativeHeading.start(1)
            .then(didStart => {
            })
        DeviceEventEmitter.addListener('headingUpdated', data => {
            data = Platform.OS === 'android' ? data : data.heading;
            this.spin(parseInt(data));
            this.spin1(parseInt(data));
            this.setState({
                Qubla: data
            });
        });


        if (Platform.OS == "android") {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(res => {

                if (res) {
                    this.getGeolocation();
                } else {
                    this.requestLocationPermission();
                }
            }, err => {

            });
        } else {
            this.getGeolocation();
        }


        let _this = this;
        this.timer = setInterval(() => {
            const { nextPrayerTime } = this.props
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
    }

    componentWillUnmount() {
        clearInterval(this.timer)
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

    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                this.getGeolocation();
            } else {
            }
        } catch (err) {
        }
    }

    getGeolocation() {
        // Geolocation.watchPosition(location => {

        let { userPreferences } = this.props;

        let Direction = this.computeAzimuth(
            {
                latitude: userPreferences.Latitude,
                longitude: userPreferences.Longitude
            },
            {
                latitude: 21.45,
                longitude: 39.81666667
            }
        );
        this.setState({
            Direction: Number(Direction)
        });

        const options = {
            enableHighAccuracy: Platform.OS == "ios",
            timeout: 5000,
            maximumAge: 0
        };
        Geolocation.getCurrentPosition(response => {
            const coords = response.coords;
            let Direction = this.computeAzimuth(
                {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                {
                    latitude: 21.45,
                    longitude: 39.81666667
                }
            );
            this.setState({
                Direction: Number(Direction)
            });
        }, err => {

        });
    }

    computeAzimuth(la1, la2) {
        ;
        // Alert.alert(la1.latitude + " " + la1.longitude);
        var lat1 = la1.latitude,
            lon1 = la1.longitude,
            lat2 = la2.latitude,
            lon2 = la2.longitude;
        var result = 0.0;

        var ilat1 = parseInt(0.5 + lat1 * 360000.0);
        var ilat2 = parseInt(0.5 + lat2 * 360000.0);
        var ilon1 = parseInt(0.5 + lon1 * 360000.0);
        var ilon2 = parseInt(0.5 + lon2 * 360000.0);

        lat1 = this.toRadians(lat1);
        lon1 = this.toRadians(lon1);
        lat2 = this.toRadians(lat2);
        lon2 = this.toRadians(lon2);

        if (ilat1 == ilat2 && ilon1 == ilon2) {
            return result;
        } else if (ilon1 == ilon2) {
            if (ilat1 > ilat2) result = 180;
        } else {
            var c = Math.acos(
                Math.sin(lat2) * Math.sin(lat1) +
                Math.cos(lat2) * Math.cos(lat1) * Math.cos(lon2 - lon1)
            );
            var A = Math.asin((Math.cos(lat2) * Math.sin(lon2 - lon1)) / Math.sin(c));
            result = this.toDegrees(A);
            if (ilat2 > ilat1 && ilon2 > ilon1) {
            } else if (ilat2 < ilat1 && ilon2 < ilon1) {
                result = 180 - result;
            } else if (ilat2 < ilat1 && ilon2 > ilon1) {
                result = 180 - result;
            } else if (ilat2 > ilat1 && ilon2 < ilon1) {
                result += 360;
            }
        }
        return result;
    }

    toRadians = res => {
        return (res / 180) * Math.PI;
    };
    toDegrees = angrad => {
        return (angrad * 180.0) / Math.PI;
    };

    spin = target => {
        this.spinValue.setValue(0);
        this.setState({
            Qubla1: target
        });
        Animated.timing(this.spinValue, {
            toValue: -Number(target), // 最终值 为1，这里表示最大旋转 360度
            duration: 0
        }).start();
    };
    spin1 = target => {
        this.spinValue1.setValue(0);

        Animated.timing(this.spinValue1, {
            toValue: -Number(target + this.state.Direction - 230), // 最终值 为1，这里表示最大旋转 360度
            duration: 0
        }).start();
    };


    render() {

        const spin = this.spinValue.interpolate({
            inputRange: [-360, 359],
            outputRange: ["-360deg", "359deg"]
        });
        const spin1 = this.spinValue1.interpolate({
            inputRange: [-360, 359],
            outputRange: ["-360deg", "359deg"]
        });

        const Prayer = metaHelpers.findElement(INSAAN_HOME_TILE, INSAAN_PRAYER).label
        const Calendar = metaHelpers.findElement(INSAAN_HOME_TILE, INSAAN_CALENDAR).label
        const {
            date,
            fullDate,
            description,
            userPreferences,
            nextPrayerTime,
            nextPrayerType,
            compassActionHandler
        } = this.props;
        let NextPrayerIn = metaHelpers.findElement(INSAAN_HOME_TILE, INSAAN_NEXTPRAYERIN).label
        let NextPrayerTwo = metaHelpers.findElement(INSAAN_HOME_TILE, INSAAN_PRAYERIN).label
        let authorityView = userPreferences && (userPreferences.conventionCode.trim() !== "" || userPreferences.stateName.trim !== "")

        var npts = " ";
        const targetTime = nextPrayerTime && nextPrayerTime.split("+")[0];
        if (targetTime != undefined) {
            const npth = parseInt(targetTime.split(":")[0]);
            const nptm = parseInt(targetTime.split(":")[1]);
            const display_npth = npth > 12 ? npth - 12 : npth;
            const npts_h = display_npth < 10 ? `${display_npth - 12 < 10 ? "0" : ""}${display_npth}` : `${display_npth < 10 ? "0" : ""}${display_npth}`;
            const npts_m = nptm < 10 ? `0${nptm}` : `${nptm}`;
            npts = `${npts_h}:${npts_m} ${npth >= 12 ? "PM" : "AM"}`
        }

        let cardView = userPreferences && userPreferences.scheduledNotifications && userPreferences.scheduledNotifications.length === 0

        return (

            <ImageBackground
                style={styles.mainHomeTile}
                source={{ uri: "https://apidev.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/8f05f3dd-590c-487a-bb1e-9b895ec714fc?namespace=MY" }}
            >


                {cardView
                    ? <View style={{ paddingTop: 30 }} >

                        <View style={styles.container1}>
                            <View style={{ justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={compassActionHandler}
                                    >
                                        <View
                                            style={styles.compassStyle}
                                        >
                                            <Animated.Image
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    position: "absolute",
                                                    transform: [{ rotate: spin }]
                                                }}
                                                source={INSAAN_COMPASS}
                                            />
                                            <Animated.Image
                                                style={{
                                                    position: "absolute",
                                                    width: 5,
                                                    height: 30,
                                                    transform: [{ rotate: spin1 }]
                                                }}
                                                source={INSAAN_PIN}
                                            />

                                            <Image
                                                style={styles.fixedStyle}
                                                source={INSAAN_FIXED}
                                            />
                                        </View>

                                    </TouchableOpacity>
                                    <View style={styles.Date}>
                                        <Text style={styles.dateStyle}>{date}</Text>
                                        <Text style={styles.descriptionStyle}>{description}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.nextPrayer}>
                                <Text style={styles.nextPrayerStyle}>{NextPrayerIn}</Text>
                                <Text style={styles.nextPrayerStyle}>{NextPrayerTwo}</Text>
                                <Text style={styles.countdownStyle}>{this.state.countDown}</Text>
                            </View>
                        </View>

                        <View style={styles.alignCalendar}>

                            <TouchableOpacity
                                onPress={() => { this.props.onCalendarPress() }}
                                style={styles.PrayerCalendar}>
                                <Text style={styles.PrayerCalendarStyle}>{Prayer}{'\n'}{Calendar}</Text>
                            </TouchableOpacity>
                        </View>

                        {authorityView &&
                            <View
                                style={styles.authorityViewStyle}>
                                <Text style={styles.prayerAuthorityStyle}
                                >{this.showPrayerAuthority()}</Text>

                                <TouchableOpacity
                                    onPress={() => { this.props.gotoPrayerTimeConventionsScreen() }}

                                >
                                    <Image
                                        style={styles.editIcon}
                                        source={EDIT_ICON} />

                                </TouchableOpacity>
                            </View>}

                    </View>

                    :

                    <View style={styles.container2}>

                        <View style={styles.container3}>
                            <View style={{ justifyContent: 'center'}}>
                                <View style={{ flexDirection: 'row' }}>

                                    <TouchableOpacity
                                        onPress={compassActionHandler}
                                    >
                                        <View
                                            style={styles.compassStyle}
                                        >
                                            <Animated.Image
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    position: "absolute",
                                                    transform: [{ rotate: spin }]
                                                }}
                                                source={INSAAN_COMPASS}
                                            />
                                            <Animated.Image
                                                style={{
                                                    position: "absolute",
                                                    width: 5,
                                                    height: 30,
                                                    transform: [{ rotate: spin1 }]
                                                }}
                                                source={INSAAN_PIN}
                                            />

                                            <Image
                                                style={styles.fixedStyle}
                                                source={INSAAN_FIXED}
                                            />
                                        </View>

                                    </TouchableOpacity>

                                    <Text style={styles.prayerTypeStyle}>
                                        {InsaanType.displayNameForType(nextPrayerType)}
                                    </Text>
                                </View>

                                <Text style={styles.nptsStyle}>{npts}, {fullDate} </Text>
                            </View>

                            <View style={styles.nextPrayer}>
                                <Text style={styles.nextPrayerStyle}>{NextPrayerIn}</Text>
                                <Text style={styles.nextPrayerStyle}>{NextPrayerTwo}</Text>
                                <Text style={styles.countdownStyle}>{this.state.countDown}</Text>
                            </View>
                        </View>

                        <View style={styles.container4}>

                            <View style={styles.islamDate}>
                                <Text style={styles.description1Style}>{description}</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => { this.props.onCalendarPress() }}
                                style={styles.PrayerCalendar}>
                                <Text style={styles.PrayerCalendarStyle}>{Prayer}{'\n'}{Calendar}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginBottom: -30 }}>
                            {authorityView &&


                                <View
                                    style={styles.authorityViewStyle1}>
                                    <Text style={styles.prayerAuthorityStyle}
                                    >{this.showPrayerAuthority()}</Text>

                                    <TouchableOpacity
                                        onPress={() => { this.props.gotoPrayerTimeConventionsScreen() }}
                                    >
                                        <Image
                                            style={styles.editIcon}
                                            source={EDIT_ICON} />

                                    </TouchableOpacity>
                                </View>}
                        </View>
                    </View>

                }


            </ImageBackground >

        )
    }
}


InsaanCard.PropTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    countDown: PropTypes.string,
    date: PropTypes.string,
    fullDate: PropTypes.string,
    description: PropTypes.string,
    compassActionHandler: PropTypes.func,
    moreActionHandler: PropTypes.func,
    toggleRemindActionHandler: PropTypes.func,
    reminderStatusOn: PropTypes.bool,
    nextPrayerTime: PropTypes.string,
    nextPrayerType: PropTypes.string,
    onCalendarPress: PropTypes.func
}

const mapStateToProps = state => {
    return {
        userPreferences: state.userPreferences,
        userIcon: state.profile.profilePicture,
    };
};

export default connect(mapStateToProps,
    {
        gotoPrayerTimeConventionsScreen,
    }
)(InsaanCard);
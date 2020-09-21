import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform,
    ImageBackground
} from "react-native";
import Geolocation from "Geolocation";
import { PrayerConventionStyle as styles } from "./styles"

import {
    BACK,
    DETAIL_ARROW,
    PRAYER_CONVENTION_TILE
} from "../../../../config/images";
import PrayerTimeConventionsItem from "../../components/PrayerTimeConventionsItem"
import PrayerTimeConventionsThree from "../../components/PrayerTimeConventionsThree"
import {
    CoreActions,
    CoreConfig,
    CoreActionTypes,
    metaHelpers
} from "@pru-rt-internal/pulse-common";
import {
    gotoMainPage,
} from "../../../../actions";

const {
    INSAAN_PRAYER_CONVENTION,
    INSAAN_EGYPT,
    INSAAN_NORTHAMERICA,
    INSAAN_MUSLIM,
    INSAAN_UMMAL,
    INSAAN_ISLAM,
    INSAAN_JAKIM,
    INSAAN_AFRICASYRIALEBANONMALAYSIA,
    INSAAN_NORTHAMERICA_US,
    INSAAN_EUROPEFAREASTPARTOFUS,
    INSAAN_ARABIANPENINSULA,
    INSAAN_PAKISTANAFGHANISTANBANGLADESHINDIA,
    INSAAN_PRAYERTIMECONVENTIONS,
    INSAAN_STATE,
    INSAAN_ZONE,
    INSAAN_CONFIRM
} = CoreConfig;
const helpers = metaHelpers;
import moment from "moment"
import { connect } from "react-redux"

import {
    getPrayerTimeOtherconvention
} from '../../actions'
import * as NotificationTool from "../../../../utils/NotificationScheduleTool";
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
const {
    setConvention,
    setConventionZone,
    setConventionState,
    setInsanHomeCard,
    setLongitudeLatitude,
    updateScheduledNotification
} = CoreActions


class PrayerTimeConventions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFingerprintEnabled: false,
            prayerArr: [
                {
                    Code: "EGYPT",
                    prayerLabelText: helpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_EGYPT).label,
                    prayerInfoText: helpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_AFRICASYRIALEBANONMALAYSIA).label,
                    isSelected: false,
                }, {
                    Code: "ISNA",
                    prayerLabelText: helpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_NORTHAMERICA).label,
                    prayerInfoText: helpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_NORTHAMERICA_US).label,
                    isSelected: false
                },
                {
                    Code: "WML",
                    prayerLabelText: helpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_MUSLIM).label,
                    prayerInfoText: helpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_EUROPEFAREASTPARTOFUS).label,
                    isSelected: false
                },
                {
                    Code: "MAKKAH",
                    prayerLabelText: helpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_UMMAL).label,
                    prayerInfoText: helpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_ARABIANPENINSULA).label,
                    isSelected: false
                },
                {
                    Code: "KARACHI",
                    prayerLabelText: helpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_ISLAM).label,
                    prayerInfoText: helpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_PAKISTANAFGHANISTANBANGLADESHINDIA).label,
                    isSelected: false
                }
            ],
            isSelected: false
        }
    }

    componentDidMount = () => {
        this.props.dispatchEvent(events.PrayerTimeConventionScreen);
    }

    getGeolocation() {
        let { userPreferences } = this.props

        if (userPreferences.Longitude == undefined || userPreferences.Longitude == '' || userPreferences.Latitude == undefined || userPreferences.Latitude == '') {
            const options = {
                enableHighAccuracy: Platform.OS == "ios",
                timeout: 5000,
                maximumAge: 0
            }
            Geolocation.getCurrentPosition(response => {
                const coords = response.coords
                this.getPrayerTimeOtherconvention(
                    coords.latitude,
                    coords.longitude
                );
            }, err => {

            }, options)
        } else {

            this.getPrayerTimeOtherconvention(
                userPreferences.Latitude,
                userPreferences.Longitude
            );
        }
    }


    getPrayerTimeOtherconvention = (latitude, longitude) => {
        let { token, userPreferences } = this.props;
        let conventionCode = userPreferences.conventionCode
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
                                    value: moment().format("YYYY-MM-DD")
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
    render() {
        let { prayerArr } = this.state;
        const { navigation, userPreferences } = this.props;
        let conventionCode = userPreferences.conventionCode ? userPreferences.conventionCode : ""
        let zoneName = userPreferences.zoneName ? userPreferences.zoneName : ""
        let stateName = userPreferences.stateName ? userPreferences.stateName : ""

        return (
            <View style={styles.container1}>

                <ImageBackground
                    style={styles.backgroundImage}
                    source={{ uri: "https://apidev.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/e7b2dd98-02b8-4e00-af37-e872834e9253?namespace=MY" }}
                >


                    <TouchableOpacity
                        style={styles.backImage}
                        onPress={() => {
                            this.props.navigation.goBack()
                            this.props.dispatchEvent(events.PrayerTimeConventionScreenBackClick);
                        }}
                        accessibilityLabel="home"
                        accesible
                    >
                        <Image style={styles.backSource} source={BACK} />
                    </TouchableOpacity>


                    <View style={styles.prayerText}>
                        <Text style={styles.convention}>{helpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_PRAYERTIMECONVENTIONS).label}</Text>
                    </View>

                </ImageBackground>


                <ScrollView
                    style={styles.ScrollViewStyle}
                    showsVerticalScrollIndicator={false}

                >
                    <PrayerTimeConventionsThree
                        Texts={helpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_JAKIM).label}
                        labelText={`${helpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_STATE).label}: ${userPreferences.stateName}`}
                        infoText={`${helpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_ZONE).label}: ${userPreferences.zoneName}`}
                        flag={true}
                        isJump={true}
                        onPress={() => {
                            navigation.navigate("SelectState");
                            this.props.dispatchEvent(events.StateZoneTabClick);
                        }} />

                    {
                        prayerArr && prayerArr.map((item, k) => {
                            return (
                                <PrayerTimeConventionsItem
                                    key={item.Code}
                                    isSelected={conventionCode == item.Code}
                                    Code={item.Code}
                                    infoText={item.infoText}
                                    labelText={item.prayerLabelText}
                                    prayerInfoText={item.prayerInfoText}
                                    onSelected={(id) => {

                                        this.props.setConvention(item.Code)
                                        this.props.setConventionZone({
                                            zoneCode: "",
                                            zoneName: ""
                                        })
                                        this.props.setConventionState({
                                            stateCode: "",
                                            stateName: ""
                                        })
                                        this.props.dispatchEvent(events.AuthorityClick);

                                    }}

                                />
                            )
                        })
                    }

                    <View
                        style={styles.backgroundStyle}
                    />
                </ScrollView>


                <TouchableOpacity
                    style={{
                        backgroundColor: userPreferences.conventionCode.trim() !== "" ||
                            (userPreferences.stateName.trim() !== "" &&
                                userPreferences.zoneName.trim() !== "") ? "#ed1b2e" : "#f3f3f3",
                        width: 220,
                        height: 44,
                        borderRadius: 22,
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: 'center',
                        marginLeft: 78,
                        marginRight: 77,
                        marginTop: 53,
                        flexShrink: 0,
                        marginBottom: 32,
                    }}
                    onPress={() => {
                        if (conventionCode || (stateName && zoneName)) {
                            this.props.setInsanHomeCard(true);
                            if (Platform.OS == "ios") {
                                this.props.updateScheduledNotification([]);
                                NotificationTool.reScheduleAllInsaanNotificationForWeek({});
                            }
                            else {
                                this.props.updateScheduledNotification([]);
                                NotificationTool.reScheduleAllInsanNotificationForWeek({});
                            }
                            this.props.gotoMainPage();
                            this.getGeolocation()
                        }
                        this.props.dispatchEvent(events.PrayerTimeConventionScreenConfirmClick);
                    }}
                    accessibilityLabel="home"
                    accesible
                    disabled={
                        userPreferences.conventionCode.trim() !== "" &&
                            (userPreferences.stateName.trim() !== "" &&
                                userPreferences.zoneName.trim() !== "") ? true : false}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color:
                                userPreferences.conventionCode.trim() !== "" ||
                                    (userPreferences.stateName.trim() !== "" &&
                                        userPreferences.zoneName.trim() !== "")
                                    ? "#FFFFFF"
                                    : "#BDBEC0"
                        }}
                    >
                        {metaHelpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_CONFIRM).label}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => {

    return {
        userPreferences: state.userPreferences,
        token: state.auth.token,
    }
}


export default connect(mapStateToProps, {
    setConvention,
    setConventionZone,
    setConventionState,
    setInsanHomeCard,
    setLongitudeLatitude,
    getPrayerTimeOtherconvention,
    gotoMainPage,
    updateScheduledNotification,
    dispatchEvent,
})(PrayerTimeConventions);

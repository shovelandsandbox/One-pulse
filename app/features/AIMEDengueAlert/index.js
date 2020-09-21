
import React from 'react';
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity, Picker, ScrollView, Alert, Platform, PermissionsAndroid } from 'react-native';
import MapView from 'react-native-maps';
import { AreaChart, Path, BarChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { LinearGradient, Stop, Defs } from 'react-native-svg';
import ProgressBar from 'react-native-progress/Bar';
import { connect } from "react-redux";
import { getAimeTrends } from "./actions";
import ModalDropdown from "react-native-modal-dropdown";
import Geolocation from "Geolocation";
import Modal from "react-native-modal";
import {
    BACK,
    PLUS_ICON,
    MINUS_ICON,
    DESTINATION_SMALL,
    ARROW_DOWN,
    CLOSE_ICON,
    DENGUE_ALERT_MARKER
} from "../../config/images";

import { AIMEDengueAlertStyles as styles } from "./styles";
import _ from "lodash";
import { pathOr, path } from 'ramda';
import { dispatchEvent } from "../../actions";
import {
    colors,
    metaHelpers,
    CoreConfig,
    events
} from '@pru-rt-internal/pulse-common'

const {
    AIME_DENGUE_ALERT,
    NEW_OUTBREAKS,
    THIS_WEEK,
    TOTAL_OUTBREAKS,
    NEW_CASE,
    TOTAL_CASES,
    DEATH,
    TOTAL,
    DENGUE_NEW,
    DENGUE,
    OUTBREAKS,
    CASES,
    WEEKLY,
    MONTHLY,
    DAILY,
    DENGUE_ZONE_COMPARISON,
    MALAYSIA,
    NOT_DATA,
    LETS_PROCEED_DENGUE,
    LIMITED_COPLIMENTARY_CHECK,
    DAILY_DATA_CHECK,
    MONTHLY_DATA_CHECK,
} = CoreConfig;
var { mWidth, mHeight } = Dimensions.get('window')
const ISDENGUEPRODUCTENABLED = "true";
class AIMEDengueAlert extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mapHeight: 300,
            mapIsNotFullScreen: true,
            stateCoordinates: {
                latitude: null,
                longitude: null,
                graphInputLabel: "",
                graphInputCasesOutbreaks: "",
                graphInputWeekLabel: "",
            },
            minZoomLevel: 0,
            stateLocationData: [],
            markerListCases: [],
            markersListOutbreaks: [],
            mapData: [],
            progressViewData: [],
            newOutbreaksProgressView: [],
            totalCaseProgressView: [],
            newOutbreaksProgressView: [],
            totalOutbreaksProgressView: [],
            states: [],
            aimeResponse: {},
            totalOutbreak: 0,
            totalCases: 0,
            area: "",
            outbreak: "",
            cases: "",
            graphData: [],
            casesData: [],
            lineOutbreakData: [],
            lineCasesData: [],
            latitude: null,
            longitude: null,
            mLatitudeDelta: null,
            mLongitudeDelta: null,
            selectedValue: "",
            dropDownData: [],
            graphSelectedValue: "",
            graphDropDownData: [],
            progressSelectedValue: "",
            progressDropDownData: [],
            newCasesSelected: false,
            totalCasesSelected: false,
            newOutbreakSelected: false,
            totalOutbreakSelected: false,
            shouldShowDengueProductModal: !props.dengueProductError,
            dengueZoneAlert: false,
            graphDataAlert: false,
            istmcAccepted: false,
            maxValueOutbreaks: 0,
            maxValueCases: 0,
            userLocation: false,
        };
        this.userLocation = { latitude: null, longitude: null, latitudeDelta: null, longitudeDelta: null };
    }


    componentDidMount() {
        if (Platform.OS == "android") {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(res => {
                if (res) {
                    Geolocation.getCurrentPosition(response => {
                        // debugger
                        const coords = response.coords;
                        this.userLocation = {
                            longitude: coords.longitude,
                            latitude: coords.latitude,
                            latitudeDelta: 0.00625 * 0.5 * 0.5,
                            longitudeDelta: 0.00625 * 0.5 * 0.5,
                        }
                        this.setState({
                            longitude: coords.longitude,
                            latitude: coords.latitude,
                            mLatitudeDelta: 0.00625 * 0.5 * 0.5,
                            mLongitudeDelta: 0.00625 * 0.5 * 0.5,
                            userLocation: true,
                        })

                    }, err => {

                    });
                    this._beginWatchGeoLocation();
                } else {
                    this.requestLocationPermission();
                }
            }, err => {

            });


        } else {
            Geolocation.getCurrentPosition(response => {
                const coords = response.coords;
                // debugger
                this.userLocation = {
                    longitude: coords.longitude,
                    latitude: coords.latitude,
                    latitudeDelta: 0.00625 * 0.5 * 0.5,
                    longitudeDelta: 0.00625 * 0.5 * 0.5,
                }
                this.setState({
                    longitude: coords.longitude,
                    latitude: coords.latitude,
                    mLatitudeDelta: 0.00625 * 0.5 * 0.5,
                    mLongitudeDelta: 0.00625 * 0.5 * 0.5,
                    userLocation: true,
                })
            }, err => {
                // debugger
            });
            this._beginWatchGeoLocation();
        }
        const { getAimeTrends } = this.props;
        getAimeTrends(this.props.token);
        this.props.dispatchEvent(events.AimeDengueAlert)

    }

    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(response => {
                    const coords = response.coords;
                    this.userLocation = {
                        longitude: coords.longitude,
                        latitude: coords.latitude,
                        latitudeDelta: 0.00625 * 0.5 * 0.5,
                        longitudeDelta: 0.00625 * 0.5 * 0.5,
                    }
                    this.setState({
                        longitude: coords.longitude,
                        latitude: coords.latitude,
                        mLatitudeDelta: 0.00625 * 0.5 * 0.5,
                        mLongitudeDelta: 0.00625 * 0.5 * 0.5,
                        userLocation: true,
                    })
                }, err => {
                });
                this._beginWatchGeoLocation();
            } else {
            }
        } catch (err) {
            console.warn(err);
        }
    }
    _beginWatchGeoLocation() {
        this.watcher = Geolocation.watchPosition(response => {
            const coords = response.coords;
            this.userLocation = {
                longitude: coords.longitude,
                latitude: coords.latitude,
                latitudeDelta: 0.00625 * 0.5 * 0.5,
                longitudeDelta: 0.00625 * 0.5 * 0.5,
            }
            this.setState({
                longitude: coords.longitude,
                latitude: coords.latitude,
                mLatitudeDelta: 0.00625 * 0.5 * 0.5,
                mLongitudeDelta: 0.00625 * 0.5 * 0.5,
                userLocation: true,
            })
        }, error => {
        }, {
            enableHighAccuracy: Platform.OS == "ios",
        }
        );
    }
    _stopWatchGeoLocation() {
        this.watcher && Geolocation.clearWatch(this.watcher);
    }

    componentWillUnmount() {
        this._stopWatchGeoLocation();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            nextProps.aimeResponse !== undefined &&
            nextProps.aimeResponse !== null &&
            nextProps.aimeResponse
        ) {
            return {
                aimeResponse: nextProps.aimeResponse
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.aimeResponse &&
            this.props.aimeResponse &&
            (prevProps.aimeResponse !== this.props.aimeResponse)
        ) {
            this.updateTrendsData();
            this.progressBarViewData();
            this.modelDropDownData();
        }
    }
    modelDropDownData() {
        const outbreaksTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, OUTBREAKS).value;
        const casesTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, CASES).value;
        const weeklyTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, WEEKLY).value;

        const selectedValue = outbreaksTxt
        const dropDownData = [outbreaksTxt, casesTxt]
        const graphSelectedValue = weeklyTxt
        const graphDropDownData = [weeklyTxt]
        const progressSelectedValue = weeklyTxt
        const progressDropDownData = [weeklyTxt]
        this.setState({
            selectedValue: selectedValue,
            dropDownData: dropDownData,
            graphSelectedValue: graphSelectedValue,
            graphDropDownData: graphDropDownData,
            progressSelectedValue: progressSelectedValue,
            progressDropDownData: progressDropDownData,
        })

    }

    progressBarViewData() {
        const response = this.props.aimeResponse;
        let totalCaseProgressView = [];
        let newCasesProgressView = [];
        let totalOutbreaksProgressView = [];
        let newOutbreaksProgressView = [];
        for (let i = 1; i < response.length; i++) {
            const outbreakArraySize = response[i].outbreaks.length;
            const currentWeekOutbreak = response[i].outbreaks[outbreakArraySize - 1];
            const casesArraySize = response[i].cases.length;
            const currentWeekCases = response[i].cases[casesArraySize - 1];
            const totalOutbreak = response[i].outbreaks.reduce((a, b) => a + b, 0);
            const totalCases = response[i].cases.reduce((a, b) => a + b, 0);
            newCasesProgressView.push({
                name: response[i].name,
                value: currentWeekCases
            })
            totalOutbreaksProgressView.push({
                name: response[i].name,
                value: totalOutbreak
            })
            newOutbreaksProgressView.push({
                name: response[i].name,
                value: currentWeekOutbreak
            })
            totalCaseProgressView.push({
                name: response[i].name,
                value: totalCases
            })
        }
        totalCaseProgressView.sort((a, b) => (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0));
        newCasesProgressView.sort((a, b) => (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0));
        totalOutbreaksProgressView.sort((a, b) => (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0));
        newOutbreaksProgressView.sort((a, b) => (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0));
        this.setState({
            totalCaseProgressView: totalCaseProgressView,
            newCasesProgressView: newCasesProgressView,
            totalOutbreaksProgressView: totalOutbreaksProgressView,
            newOutbreaksProgressView: newOutbreaksProgressView,
            progressViewData: totalOutbreaksProgressView,
        })
    }
    updateTrendsData = () => {
        const { aimeResponse, locationData } = this.props;
        const { states } = locationData;
        let stateLocation = [], markerListCases = [], state = [], markersListOutbreaks = [];
        let currentWeekOutbreak = 0, currentWeekCases = 0, totalOutbreak = 0, totalCases = 0;
        let maxValueOutbreaks = 0, maxValueCases = 0;
        if (Array.isArray(aimeResponse) && aimeResponse.length) {
            _.each(aimeResponse, (rs, index) => {
                state.push(rs.name)
                const deltaStates = _.get(states, rs.name);
                const stateObj = {
                    name: rs.name,
                    location: {
                        latitude: rs.latitude,
                        longitude: rs.longitude,
                        latitudeDelta: pathOr(1, ["latitudeDelta"], deltaStates),
                        longitudeDelta: pathOr(1, ["longitudeDelta"], deltaStates)
                    },
                };
                stateLocation.push(stateObj);

                if (index != 0) {
                    let outbreakRadius = rs.outbreaks.reduce((a, b) => a + b, 0);
                    let casesRadius = rs.cases.reduce((a, b) => a + b, 0);
                    if (maxValueOutbreaks < outbreakRadius) {
                        maxValueOutbreaks = outbreakRadius
                    }
                    if (maxValueCases < casesRadius) {
                        maxValueCases = casesRadius
                    }
                    const markerObj = {
                        latitude: rs.latitude,
                        longitude: rs.longitude,
                        shape: "CIRCLE",
                        radius: outbreakRadius,
                        fillColor: "rgba(255, 0, 0, 0.3)",
                    };
                    markerListCases.push({
                        ...markerObj,
                        radius: casesRadius,
                    });
                    markersListOutbreaks.push(markerObj);

                    const outbreakArraySize = rs.outbreaks.length;
                    const casesArraySize = rs.cases.length;
                    if (rs.outbreaks[outbreakArraySize - 1] > 0)
                        currentWeekOutbreak += rs.outbreaks[outbreakArraySize - 1];
                    if (rs.cases[casesArraySize - 1] > 0)
                        currentWeekCases += rs.cases[casesArraySize - 1];

                }
            });
            totalOutbreak = aimeResponse[0].outbreaks.reduce((a, b) => a + b, 0);
            totalCases = aimeResponse[0].cases.reduce((a, b) => a + b, 0);
        }
        let stateCoordinates = stateLocation[0].location;
        if (this.state.userLocation) {
            stateCoordinates = this.userLocation;
        }
        this.setState({
            aimeResponse,
            states: state,
            area: state[0],
            outbreak: currentWeekOutbreak,
            cases: currentWeekCases,
            graphData: aimeResponse[0].outbreaks,
            lineOutbreakData: aimeResponse[0].outbreaks,
            casesData: aimeResponse[0].cases,
            lineCasesData: aimeResponse[0].cases,
            totalOutbreak: totalOutbreak,
            totalCases: totalCases,
            latitude: stateCoordinates.latitude,
            longitude: stateCoordinates.longitude,
            mLatitudeDelta: stateCoordinates.latitudeDelta,
            mLongitudeDelta: stateCoordinates.longitudeDelta,
            mapData: markersListOutbreaks,
            markersListOutbreaks: markersListOutbreaks,
            markerListCases: markerListCases,
            stateCoordinates,
            stateLocationData: stateLocation,
            maxValueOutbreaks,
            maxValueCases,
        });
    }

    getMapMinZoomlevel = stateCoordinates => {
        let minZoomLevel = 0;
        return minZoomLevel;
    };
    onSelectPicker(index) {
        this.props.dispatchEvent(events.ZoneSelectAimeDengueAlert)
        const { aimeResponse } = this.state;
        const stateCoordinates = this.state.stateLocationData[index].location;
        const minZoomLevel = this.getMapMinZoomlevel(stateCoordinates);
        const outbreakArraySize = aimeResponse[index].outbreaks.length;
        let currentWeekOutbreak = aimeResponse[index].outbreaks[outbreakArraySize - 1];
        const casesArraySize = aimeResponse[index].cases.length;
        let currentWeekCases = aimeResponse[index].cases[casesArraySize - 1];
        const totalOutbreak = aimeResponse[index].outbreaks.reduce((a, b) => a + b, 0);
        const totalCases = aimeResponse[index].cases.reduce((a, b) => a + b, 0);
        if (index == 0) {
            currentWeekOutbreak = 0;
            currentWeekCases = 0;
            for (let i = 1; i < aimeResponse.length; i += 1) {
                const outbreakArraySize = aimeResponse[i].outbreaks.length;
                const casesArraySize = aimeResponse[i].cases.length;
                if (aimeResponse[i].outbreaks[outbreakArraySize - 1] > 0)
                    currentWeekOutbreak += aimeResponse[i].outbreaks[outbreakArraySize - 1];
                if (aimeResponse[i].cases[casesArraySize - 1] > 0)
                    currentWeekCases += aimeResponse[i].cases[casesArraySize - 1]
            }
        }
        this.setState({
            area: aimeResponse[index].name,
            minZoomLevel,
            stateCoordinates,
            latitude: stateCoordinates.latitude,
            longitude: stateCoordinates.longitude,
            mLatitudeDelta: stateCoordinates.latitudeDelta,
            mLongitudeDelta: stateCoordinates.longitudeDelta,
            graphData: aimeResponse[index].outbreaks,
            lineOutbreakData: aimeResponse[index].outbreaks,
            casesData: aimeResponse[index].cases,
            lineCasesData: aimeResponse[index].cases,
            totalOutbreak: totalOutbreak,
            totalCases: totalCases,
            outbreak: currentWeekOutbreak,
            cases: currentWeekCases,
        });
        return index;
    }

    setProgressViewdata(value) {
        if (value === "newOutbreak")
            this.setState({
                progressViewData: this.state.newOutbreaksProgressView,
                newCasesSelected: false,
                totalCasesSelected: false,
                newOutbreakSelected: true,
                totalOutbreakSelected: false,
            })
        else if (value === "totalOutbreak")
            this.setState({
                progressViewData: this.state.totalOutbreaksProgressView,
                newCasesSelected: false,
                totalCasesSelected: false,
                newOutbreakSelected: false,
                totalOutbreakSelected: true,
            })
        else if (value === "newCase")
            this.setState({
                progressViewData: this.state.newCasesProgressView,
                newCasesSelected: true,
                totalCasesSelected: false,
                newOutbreakSelected: false,
                totalOutbreakSelected: false,
            })
        else
            this.setState({
                progressViewData: this.state.totalCaseProgressView,
                newCasesSelected: false,
                totalCasesSelected: true,
                newOutbreakSelected: false,
                totalOutbreakSelected: false,
            })
    }

    getMonthsFromWeeks(value) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        if (value == 1) {
            var month = new Date().getMonth() - 3;
            return monthNames[month];
        } else if (value == 2) {
            var month = new Date().getMonth() - 2;
            return monthNames[month];
        } else if (value == 3) {
            var month = new Date().getMonth() - 1;
            return monthNames[month];
        } else {
            var month = new Date().getMonth();
            return monthNames[month];
        }

    }

    OnBack = () => {
        this.props.dispatchEvent(events.BackArrowAimeDengueAlert)
        this.props.navigation.goBack();
    };

    ZoomIn = () => {
        let mLatDelta = 0, mLongDelta = 0;
        if (this.state.mLatitudeDelta > 1 && this.state.mLongitudeDelta > 1) {
            mLatDelta = this.state.mLatitudeDelta - 0.6;
            mLongDelta = this.state.mLongitudeDelta - 0.6;
        } else if (this.state.mLatitudeDelta > 0.1 && this.state.mLongitudeDelta > 0.1) {
            mLatDelta = this.state.mLatitudeDelta - 0.125;
            mLongDelta = this.state.mLongitudeDelta - 0.125;
        } else {
            mLatDelta = this.state.mLatitudeDelta - 0.0125;
            mLongDelta = this.state.mLongitudeDelta - 0.0125;
        }
        if (mLatDelta > 0 && mLongDelta > 0) {
            this.setState({
                mLatitudeDelta: mLatDelta,
                mLongitudeDelta: mLongDelta,
            });
        }
    };

    ZoomOut = () => {
        let mLatDelta = 0, mLongDelta = 0;
        if (this.state.mLatitudeDelta > 1 && this.state.mLongitudeDelta > 1) {
            mLatDelta = this.state.mLatitudeDelta + 0.6;
            mLongDelta = this.state.mLongitudeDelta + 0.6;
        } else if (this.state.mLatitudeDelta > 0.1 && this.state.mLongitudeDelta > 0.1) {
            mLatDelta = this.state.mLatitudeDelta + 0.125;
            mLongDelta = this.state.mLongitudeDelta + 0.125;
        } else {
            mLatDelta = this.state.mLatitudeDelta + 0.0125;
            mLongDelta = this.state.mLongitudeDelta + 0.0125;
        }
        this.setState({
            mLatitudeDelta: mLatDelta,
            mLongitudeDelta: mLongDelta,
        });
    };

    renderCircle = (item) => {
        let minRadius = 0, difference = 8000, maxValue = 0, radius = 0;
        const casesTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, CASES).value;
        if (this.state.selectedValue == casesTxt)
            maxValue = this.state.maxValueCases, minRadius = 35000
        else
            maxValue = this.state.maxValueOutbreaks, minRadius = 28000
        return (item || []).map(mp => {
            radius = minRadius + (difference * (mp.radius / maxValue))
            return (
                <View>
                    <MapView.Circle
                        center={{
                            latitude: mp.latitude,
                            longitude: mp.longitude
                        }}
                        radius={radius}
                        strokeWidth={0}
                        strokeColor={'#000000'}
                        fillColor={'rgba(110, 11, 232, 0.2)'} />
                    <MapView.Marker
                        coordinate={{
                            latitude: mp.latitude,
                            longitude: mp.longitude
                        }}
                        image={DENGUE_ALERT_MARKER}
                    />
                </View >
            )
        });
    }

    FullScreen = () => {
        this.setState({
            mapHeight: Dimensions.get('window').height,
            mapIsNotFullScreen: false,
        });


    };

    handleNavigateToDengueProduct = () => {
        this.setState({
            shouldShowDengueProductModal: false
        });
        this.props.navigation.navigate('ProductDengueBriefing');
    }
    navigateAIME = () => {
        const { navigation, userProfile } = this.props;
        const AIMETncConsent = path(
            ["termsConditions", "AIME", "consent"],
            userProfile
        );
        if (AIMETncConsent !== "ACCEPT") {
            this.setState({ istmcAccepted: true, })
            navigation.navigate("AIMERegister");
        }
    };

    onPressDropDown = () => {
        if (this.dropDownRef) {
            this.dropDownRef.show();
        }
    };

    onPressDropDownMap = () => {
        if (this.dropDownRefMap) {
            this.dropDownRefMap.show();
        }
    }

    onPressOutbreak = () => {
        if (this.dropDownRefOutbreak) {
            this.dropDownRefOutbreak.show();
        }
    }

    onPressDropDownGraph = () => {
        if (this.dropDownRefGraph) {
            this.dropDownRefGraph.show();
        }
    }

    dengueZoneOnSelect(index) {
        const outbreaksTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, OUTBREAKS).value;
        const casesTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, CASES).value;
        const weeklyTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, WEEKLY).value;
        this.props.dispatchEvent(events.DengueZoneComparisonAimeDengueAlert)
        if (this.state.progressDropDownData[index] == weeklyTxt && this.state.selectedValue == outbreaksTxt) {
            let Data = this.state.progressViewData;
            this.setState({ progressSelectedValue: this.state.progressDropDownData[index], progressViewData: Data, dengueZoneAlert: false });
        } else if (this.state.progressDropDownData[index] == weeklyTxt && this.state.selectedValue == casesTxt) {
            let Data = this.state.progressViewData;
            this.setState({ progressSelectedValue: this.state.progressDropDownData[index], progressViewData: Data, dengueZoneAlert: false });
        }
        else {
            this.setState({ progressSelectedValue: this.state.progressDropDownData[index], dengueZoneAlert: true })
        }
    }

    renderDengueProductModal = () => {
        const limitedTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, LIMITED_COPLIMENTARY_CHECK).value;
        const letsProceedTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, LETS_PROCEED_DENGUE).value;
        return (<Modal
            visible={this.state.shouldShowDengueProductModal}
            transparent={true}
            style={styles.ModelStyle}
            onBackButtonPress={() => { }}
            onBackdropPress={() => { }}>
            <View style={styles.ModelViewStyle}>
                <View style={styles.ModelImageContStyle}>
                    <TouchableOpacity style={styles.ModelImageTouchStyle} onPress={() => this.setState({ shouldShowDengueProductModal: false })}>
                        <Image
                            source={CLOSE_ICON}
                            style={styles.ModelImageStyle} />
                    </TouchableOpacity>
                </View>
                <View style={styles.LimitedTxtContStyle}>
                    <Text style={styles.LimitedTxtStyle}>
                        {limitedTxt}
                    </Text>
                    <TouchableOpacity style={styles.ProceedTextContStyle} onPress={this.handleNavigateToDengueProduct}>
                        <Text style={styles.ProceedTextStyle}>{letsProceedTxt}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>)
    }

    hologramContainer() {
        const totalTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, TOTAL).value;
        const dengueNewTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, DENGUE_NEW).value;
        const dengueTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, DENGUE).value;
        const dailyCheckTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, DAILY_DATA_CHECK).value;
        const monthlyCheckTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, MONTHLY_DATA_CHECK).value;
        const outbreaksTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, OUTBREAKS).value;
        const casesTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, CASES).value;
        const weeklyTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, WEEKLY).value;
        const dailyTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, DAILY).value;
        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                    <Stop offset={'0%'} stopColor={'rgb(110, 11, 232)'} />
                    <Stop offset={'100%'} stopColor={'rgb(192, 155, 255)'} />
                </LinearGradient>
            </Defs>
        )
        return (
            <View style={styles.HologramContainerStyle}>
                <View style={{ paddingTop: 8 }}>
                    <Text style={styles.GraphText}>
                        {this.state.newOutbreakSelected || this.state.newCasesSelected ? dengueNewTxt : totalTxt} {dengueTxt} {this.state.selectedValue.toLowerCase()}
                    </Text>
                </View>
                <View
                    style={styles.HologramTextContainerStyle}>
                    <Text style={styles.HologramText}>
                        {this.state.selectedValue == outbreaksTxt ? this.state.newOutbreakSelected ? this.state.outbreak : this.state.totalOutbreak : this.state.newCasesSelected ? this.state.cases : this.state.totalCases}
                    </Text>
                    <TouchableOpacity
                        style={styles.HologramDropDownStyle}
                        onPress={() => { this.onPressDropDownGraph(); }}>
                        <ModalDropdown
                            ref={dropDownRefGraph => { this.dropDownRefGraph = dropDownRefGraph; }}
                            textStyle={styles.textStyle}
                            defaultValue={this.state.graphSelectedValue}
                            dropdownStyle={{ height: 35 }}
                            style={{ paddingHorizontal: 10 }}
                            options={this.state.graphDropDownData}
                            onSelect={index => {
                                if (this.state.graphDropDownData[index] == weeklyTxt && this.state.selectedValue == outbreaksTxt) {
                                    this.props.dispatchEvent(events.TotalDengueOutbreakAimeDengueAlert)
                                    let Data = this.state.graphData;
                                    this.setState({ graphSelectedValue: this.state.graphDropDownData[index], graphData: Data, graphDataAlert: false });
                                } else if (this.state.graphDropDownData[index] == weeklyTxt && this.state.selectedValue == casesTxt) {
                                    this.props.dispatchEvent(events.TotalDengueCaseAimeDengueAlert)
                                    let Data = this.state.casesData;
                                    this.setState({ graphSelectedValue: this.state.graphDropDownData[index], graphData: Data, graphDataAlert: false });
                                }
                                else {
                                    this.setState({ graphSelectedValue: this.state.graphDropDownData[index], graphDataAlert: true })
                                }
                            }
                            }
                            showsVerticalScrollIndicator={false}
                        />
                        <Image style={[styles.DropDownImage, { marginRight: 10 }]}
                            source={ARROW_DOWN} />
                    </TouchableOpacity>
                </View>
                {this.state.graphDataAlert ?
                    (<View style={styles.BarChartAlertStyle}>
                        <Text style={styles.GraphText}>
                            {this.state.graphSelectedValue == dailyTxt ? dailyCheckTxt : monthlyCheckTxt}
                        </Text>
                    </View>)
                    :
                    (<View style={{ paddingBottom: 20 }}>
                        <View style={{ paddingTop: 10 }}>
                            <BarChart style={styles.BarChartStyle}
                                data={this.state.selectedValue == outbreaksTxt ? this.state.graphData : this.state.casesData}
                                svg={{ strokeWidth: 1, fill: 'url(#gradient)', }}
                                contentInset={{ top: 10, bottom: 1 }}
                                spacingInner={0.5}
                                gridMin={0} >
                                <Gradient />
                            </BarChart>
                        </View>
                        <View style={styles.MonthTextViewStyle}>
                            <Text style={styles.barGraphText}>{this.getMonthsFromWeeks(1)}</Text>
                            <Text style={styles.barGraphText}>{this.getMonthsFromWeeks(2)}</Text>
                            <Text style={styles.barGraphText}>{this.getMonthsFromWeeks(3)}</Text>
                            <Text style={styles.barGraphText}>{this.getMonthsFromWeeks(4)}</Text>
                        </View>
                    </View>)}
            </View >
        )
    }

    progressBarView() {
        const dengueZoneComrsnTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, DENGUE_ZONE_COMPARISON).value;
        const malaysiaTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, MALAYSIA).value;
        const dailyCheckTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, DAILY_DATA_CHECK).value;
        const monthlyCheckTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, MONTHLY_DATA_CHECK).value;
        const dailyTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, DAILY).value;

        return (
            <View style={styles.CompBarContainerStyle}>
                <View style={styles.CompBarViewStyle}>
                    <View style={styles.ComBarTextContainerStyle}>
                        <Text style={styles.CompBarMainTextStyle}>{dengueZoneComrsnTxt}</Text>
                        <Text style={styles.CompBarTextStyle}>{malaysiaTxt}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.CompBarDropdownStyle}
                        onPress={() => {
                            this.onPressDropDown();
                        }}>
                        <ModalDropdown
                            ref={dropDownRef => {
                                this.dropDownRef = dropDownRef;
                            }}
                            textStyle={styles.textStyle}
                            defaultValue={this.state.progressSelectedValue}
                            dropdownStyle={{ height: 35 }}
                            style={{ paddingHorizontal: 10 }}
                            options={this.state.progressDropDownData}
                            onSelect={index => this.dengueZoneOnSelect(index)}
                            showsVerticalScrollIndicator={false} />
                        <Image style={[styles.DropDownImage, { marginRight: 10 }]}
                            source={ARROW_DOWN} />
                    </TouchableOpacity>
                </View>
                {this.state.dengueZoneAlert ?
                    <View style={{ paddingVertical: 20, justifyContent: 'center' }}>
                        <Text style={styles.GraphText}>
                            {this.state.progressSelectedValue == dailyTxt ? dailyCheckTxt : monthlyCheckTxt}
                        </Text>
                    </View> : this.state.progressViewData.map(item => {
                        if (item.value > 0)
                            return (
                                <View style={{ marginTop: 10 }}>
                                    <View style={styles.CompBarSubContainerStyle}>
                                        <View style={styles.ComBarStyle}>
                                            <ProgressBar
                                                progress={(item.value) / (this.state.progressViewData[0].value + 100)}
                                                width={null}
                                                height={10}
                                                borderWidth={0}
                                                color={'rgb(153, 117, 240)'}
                                                unfilledColor={'rgb(237, 237, 237)'}
                                                borderRadius={60} />
                                        </View>
                                        <View style={styles.CompBarNoView}>
                                            <Text style={styles.CompBarNoText}>{item.value}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.CompBarNameTextStyle}>{item.name}</Text>
                                </View>
                            )
                    })}
            </View>
        )
    }

    outrbreakView() {
        const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        const Line = ({ line }) => (
            <Path
                key={'line '}
                d={line}
                stroke={'rgb(0,0,0)'}
                fill={'none'}
            />
        )
        const Line2 = ({ line }) => (
            <Path
                key={'line '}
                d={line}
                stroke={'rgb(110, 11, 232)'}
                fill={'none'}
            />
        )
        const newOutbrealsTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, NEW_OUTBREAKS).value;
        const thisWeekTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, THIS_WEEK).value;
        const totalOutbreakTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, TOTAL_OUTBREAKS).value;
        const deathTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, DEATH).value;
        const noDataTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, NOT_DATA).value;
        return (
            <View style={styles.OutBreaksContainerStyle}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.dispatchEvent(events.BelowGraphTabsSelectAimeDengueAlert)
                        this.setProgressViewdata("newOutbreak")
                    }}>
                    <View style={styles.NewOutBreaksContainerStyle}>
                        <Text style={styles.GraphText}>{this.state.outbreak}</Text>
                        <Text style={styles.OutbreaksTxtStyle}>{newOutbrealsTxt}</Text>
                    </View>
                    <Text style={styles.ThisWeekTxtStyle}>({thisWeekTxt})</Text>
                    <AreaChart
                        style={styles.AreaChartStyle}
                        data={this.state.lineOutbreakData}
                        curve={shape.curveNatural}
                        gridMax={Math.max(...this.state.lineOutbreakData) + 100}
                        gridMin={Math.min(...this.state.lineOutbreakData) - 100}>
                        {this.state.newOutbreakSelected ? <Line2 /> : <Line />}
                    </AreaChart>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.dispatchEvent(events.BelowGraphTabsSelectAimeDengueAlert)
                        this.setProgressViewdata("totalOutbreak")
                    }} >
                    <Text style={styles.GraphText}>{this.state.totalOutbreak}</Text>
                    <Text style={styles.OutbreaksTxtStyle}>{totalOutbreakTxt}</Text>
                    <Text style={styles.ThisWeekTxtStyle}> </Text>
                    <AreaChart
                        style={styles.AreaChartStyle}
                        data={this.state.lineOutbreakData}
                        curve={shape.curveNatural}
                        gridMax={Math.max(...this.state.lineOutbreakData) + 100}
                        gridMin={Math.min(...this.state.lineOutbreakData) - 100}>
                        {this.state.totalOutbreakSelected ? <Line2 /> : <Line />}
                    </AreaChart>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 20 }}
                    onPress={() => {
                        this.props.dispatchEvent(events.BelowGraphTabsSelectAimeDengueAlert)
                    }}>
                    <View style={styles.DeathContainerStyle}>
                        <Text style={styles.GraphText}>{noDataTxt}</Text>
                        <Text style={styles.OutbreaksTxtStyle}>{deathTxt}</Text>
                    </View>
                    <Text style={styles.DeathWeekTextStyle}>({thisWeekTxt})</Text>
                    <AreaChart
                        style={styles.DeathAreaChartStyle}
                        data={data}
                        curve={shape.curveNatural}
                        gridMax={90}>
                        <Line />
                    </AreaChart>
                </TouchableOpacity>
            </View>
        )
    }

    casesView() {
        const thisWeekTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, THIS_WEEK).value;
        const newCaseTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, NEW_CASE).value;
        const totalCaseTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, TOTAL_CASES).value;
        const deathTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, DEATH).value;
        const noDataTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, NOT_DATA).value;
        const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        const Line = ({ line }) => (
            <Path
                key={'line '}
                d={line}
                stroke={'rgb(0,0,0)'}
                fill={'none'}
            />
        )
        const Line2 = ({ line }) => (
            <Path
                key={'line '}
                d={line}
                stroke={'rgb(110, 11, 232)'}
                fill={'none'}
            />
        )
        return (
            <View style={styles.OutBreaksContainerStyle}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.dispatchEvent(events.BelowGraphTabsSelectAimeDengueAlert)
                        this.setProgressViewdata("newCase")
                    }}>
                    <View style={styles.NewOutBreaksContainerStyle}>
                        <Text style={styles.GraphText}>{this.state.cases}</Text>
                        <Text style={styles.OutbreaksTxtStyle}>{newCaseTxt}</Text>
                    </View>
                    <Text style={styles.ThisWeekTxtStyle}>({thisWeekTxt})</Text>
                    <AreaChart
                        style={styles.AreaChartStyle}
                        data={this.state.lineCasesData}
                        curve={shape.curveNatural}
                        gridMax={Math.max(...this.state.lineCasesData) + 100}
                        gridMin={Math.min(...this.state.lineCasesData) + -100}>
                        {this.state.newCasesSelected ? <Line2 /> : <Line />}
                    </AreaChart>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginLeft: -10 }}
                    onPress={() => {
                        this.props.dispatchEvent(events.BelowGraphTabsSelectAimeDengueAlert)
                        this.setProgressViewdata("totalCase")
                    }}>
                    <Text style={styles.GraphText}>{this.state.totalCases}</Text>
                    <Text style={styles.OutbreaksTxtStyle}>{totalCaseTxt}</Text>
                    <Text style={styles.ThisWeekTxtStyle}> </Text>
                    <AreaChart
                        style={styles.AreaChartStyle}
                        data={this.state.lineCasesData}
                        curve={shape.curveNatural}
                        gridMax={Math.max(...this.state.lineCasesData) + 100}
                        gridMin={Math.min(...this.state.lineCasesData) - 100}>
                        {this.state.totalCasesSelected ? <Line2 /> : <Line />}
                    </AreaChart>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 20 }}
                    onPress={() => {
                        this.props.dispatchEvent(events.BelowGraphTabsSelectAimeDengueAlert)
                    }}>
                    <View style={styles.DeathContainerStyle}>
                        <Text style={styles.GraphText}>{noDataTxt}</Text>
                        <Text style={styles.OutbreaksTxtStyle}>{deathTxt}</Text>
                    </View>
                    <Text style={styles.DeathWeekTextStyle}>({thisWeekTxt})</Text>
                    <AreaChart
                        style={styles.DeathAreaChartStyle}
                        data={data}
                        curve={shape.curveNatural}
                        gridMax={90}>
                        <Line />
                    </AreaChart>
                </TouchableOpacity>
            </View>
        )
    }

    mapViewContainer() {
        const casesTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, CASES).value;
        return (
            <View style={[styles.MapContainer, { minHeight: this.state.mapHeight }]}>
                {this.state.stateLocationData.length > 0 && (
                    <TouchableOpacity style={styles.MyMapView} onPress={this.FullScreen} disabled={this.state.mapIsNotFullScreen ? false : true}>
                        <MapView style={styles.MyMapView}
                            minZoomLevel={this.state.minZoomLevel}
                            showsUserLocation={true}
                            zoomEnabled={true}
                            zoomTapEnabled={true}
                            region={{ latitude: this.state.latitude, longitude: this.state.longitude, latitudeDelta: this.state.mLatitudeDelta, longitudeDelta: this.state.mLongitudeDelta }} >
                            {this.renderCircle(this.state.mapData)}
                        </MapView>
                    </TouchableOpacity>)}

                <TouchableOpacity
                    style={styles.CoutryDropDown}
                    onPress={() => {
                        this.onPressDropDownMap();
                    }}>
                    <Image style={styles.LocationImage}
                        source={DESTINATION_SMALL} />
                    <ModalDropdown
                        ref={dropDownRefMap => {
                            this.dropDownRefMap = dropDownRefMap;
                        }}
                        textStyle={styles.textStyle}
                        defaultValue={this.state.area}
                        options={this.state.states}
                        onSelect={index => this.onSelectPicker(index)
                        }
                        showsVerticalScrollIndicator={false} />
                    <Image style={styles.DropDownImage}
                        source={ARROW_DOWN} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.CategoryDropDown, { left: this.state.mapIsNotFullScreen ? 10 : 10, bottom: this.state.mapIsNotFullScreen ? 5 : 30 }]}
                    onPress={() => {
                        this.onPressOutbreak();
                    }}>
                    <ModalDropdown
                        ref={dropDownRefOutbreak => {
                            this.dropDownRefOutbreak = dropDownRefOutbreak;
                        }}
                        textStyle={[styles.textStyle, { color: "red" }]}
                        defaultValue={this.state.selectedValue}
                        dropdownStyle={{ height: 60 }}
                        dropdownTextStyle={{ color: "red" }}
                        style={{ paddingLeft: 10 }}
                        options={this.state.dropDownData}
                        onSelect={index => {
                            this.props.dispatchEvent(events.OutbreakCasesSelectAimeDengueAlert)
                            let data = []
                            let mapData = []
                            if (this.state.dropDownData[index] == casesTxt) {
                                data = this.state.totalCaseProgressView
                                mapData = this.state.markerListCases
                            }
                            else {
                                data = this.state.totalOutbreaksProgressView
                                mapData = this.state.markersListOutbreaks
                            }
                            this.setState({
                                selectedValue: this.state.dropDownData[index],
                                progressViewData: data,
                                mapData: mapData,
                                newCasesSelected: false,
                                totalCasesSelected: false,
                                newOutbreakSelected: false,
                                totalOutbreakSelected: false,
                            });
                        }
                        }
                        showsVerticalScrollIndicator={false}
                    />
                    <Image style={[styles.DropDownImage, { marginRight: 10 }]}
                        source={ARROW_DOWN} />
                </TouchableOpacity>
                {!this.state.mapIsNotFullScreen && <TouchableOpacity onPress={() => {
                    this.setState({
                        mapHeight: 200,
                        mapIsNotFullScreen: true
                    })
                }} style={styles.BackStyle}>
                    <Image style={styles.BackImage}
                        source={BACK}
                    />
                </TouchableOpacity>}
                <View style={[styles.ZoomImageMainContainer, { right: this.state.mapIsNotFullScreen ? 0 : 10, bottom: this.state.mapIsNotFullScreen ? 0 : 10 }]}>
                    <TouchableOpacity style={styles.ZoomImageContainer}
                        onPress={this.ZoomIn}>
                        <Image style={styles.ZoomImage}
                            source={PLUS_ICON}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ZoomImageContainer}
                        onPress={this.ZoomOut}>
                        <Image style={styles.ZoomImage}
                            source={MINUS_ICON} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    headerView() {
        return (
            <View style={styles.Header}>
                <TouchableOpacity
                    onPress={this.OnBack}>
                    <Image style={styles.BackImage}
                        source={BACK}
                    />
                </TouchableOpacity>
                <Image
                    style={styles.logo}
                    source={{ uri: "https://apiuat.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/59cbf04d-3b75-430c-89d1-4d7ef1f76e78?namespace=MY" }} />
            </View>
        )
    }
    render() {
        const outbreaksTxt = metaHelpers.findElement(AIME_DENGUE_ALERT, OUTBREAKS).value;
        return (
            <ScrollView style={{ backgroundColor: "#ededed" }}>
                <View style={styles.MainContainer}>
                    {this.state.mapIsNotFullScreen ? this.headerView() : null}
                    {this.mapViewContainer()}
                    {this.state.selectedValue == outbreaksTxt ?
                        this.outrbreakView() :
                        this.casesView()
                    }
                </View>
                {this.hologramContainer()}
                {this.progressBarView()}
                {/* {ISDENGUEPRODUCTENABLED ? this.renderDengueProductModal() : null} */}
                {this.state.istmcAccepted ? null : this.navigateAIME()}
            </ScrollView>
        );
    }
}

const mapsStateToProps = state => ({
    aimeResponse: state.aimeDengueAlert.aimeResponse,
    locationData: state.aimeDengueAlert.locationData,
    token: state.auth.token,
    userProfile: state.profile,
});

export default connect(mapsStateToProps, {
    getAimeTrends,
    dispatchEvent,
})(AIMEDengueAlert);

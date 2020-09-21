import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Platform,
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import styles from "./styles";

import {
  CoreConfig,
  metaHelpers,
  CoreActions,
  CoreComponents,
  CoreActionTypes,
} from "@pru-rt-internal/pulse-common";

const { AIMEGraph } = CoreComponents;

const { getAIMEData } = CoreActions;
const { pageKeys } = CoreConfig;

const { TRENDS_SCREEN } = CoreConfig;
const helpers = metaHelpers;
import MapNavigator from "../../MapNavigator/MapNavigator";
import StateLocationMeta from "../CountryLocationMeta";

const AREA_LABEL = "area";
const WEEK_LABEL = "thisweek";
const CASES_LABEL = "cases";
const OUTBREAK_LABEL = "outbreak";

const regularFont = Platform.OS === "ios" ? "PruSansNormal" : "pru-regular";
const boldFont = Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold";

class TrendSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      states: [],
      aimeResponse: {},
      area: "",
      outbreak: "",
      cases: "",
      graphData: [],
      casesData: [],
      aimeIndex: 0,
      outbreakBackround: "#E3E3E3",
      casesBackground: "",
      stateCoordinates: {
        latitude: null,
        longitude: null,
        graphInputLabel: "",
        graphInputCasesOutbreaks: "",
        graphInputWeekLabel: "",
      },
      minZoomLevel: 0,
      stateLocationData: [],
      stateMarkersOutbreaks: [],
      stateMarkersCases: [],
      markerListData: [],
    };

    this.areaLabel = "";
    this.weekLabel = "";
    this.casesLabel = "";
    this.outbreakLabel = "";
  }

  componentWillUnmount() {
    const { navigateCallback } = this.props;

    // BackHandler.removeEventListener("hardwareBackPress", navigateCallback);
  }

  componentDidMount() {
    const { navigateCallback, token } = this.props;

    // BackHandler.addEventListener("hardwareBackPress", navigateCallback);

    //this.props.getAIMEData(token);
    this.props.getAIMEDataAction(token);
    this.setState({
      graphInputLabel: this.outbreakLabel,
      graphInputWeekLabel: this.weekLabel,
    });
    this.updateTrendsData();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      aimeResponse: nextProps.userProfile.aimeResponse,
    });
    if (nextProps !== this.props) {
      this.setState(
        {
          aimeResponse: nextProps.userProfile.aimeResponse,
        },
        () => {
          this.updateTrendsData();
        }
      );
    }
  }

  getMapMinZoomlevel = stateCoordinates => {
    let minZoomLevel = 0;
    const { stateMarkersOutbreaks } = this.state;
    const location = stateMarkersOutbreaks.find(
      x =>
        x.latitude === stateCoordinates.latitude &&
        x.longitude === stateCoordinates.longitude
    );
    // if (location) {
    //   minZoomLevel = location.radius < 10000 ? 11 : 0;
    // }
    return minZoomLevel;
  };

  onSelectPicker(index) {
    const { aimeResponse, stateMarkersOutbreaks } = this.state;
    const outbreakArraySize = aimeResponse[index].outbreaks.length;
    const currentWeekOutbreak =
      aimeResponse[index].outbreaks[outbreakArraySize - 1];

    const casesArraySize = aimeResponse[index].cases.length;
    const currentWeekCases = aimeResponse[index].cases[casesArraySize - 1];
    //  const stateCoordinates = {
    //    latitude : aimeResponse[index].latitude,
    //    longitude :aimeResponse[index].longitude
    //  }

    const stateCoordinates = this.state.stateLocationData[index].location;
    const minZoomLevel = this.getMapMinZoomlevel(stateCoordinates);
    
    this.setState({
      minZoomLevel,
      outbreak: currentWeekOutbreak,
      cases: currentWeekCases,
      casesData: aimeResponse[index].cases,
      graphData: aimeResponse[index].outbreaks,
      aimeIndex: index,
      outbreakBackround: "#E3E3E3",
      casesBackground: "white",
      stateCoordinates,
      graphInputLabel: this.outbreakLabel,
      graphInputCasesOutbreaks: aimeResponse[index].outbreaks[outbreakArraySize - 1],
      markerListData: stateMarkersOutbreaks,
    });
    return index;
  }

  updateTrendsData(){
    const state = [];
    let stateLocation = [];
    const markersListOutbreaks = [];
    const markerListCases = [];
    const radiusBase = StateLocationMeta.RADIUS_BASE;
    const responseData = this.props.userProfile.aimeResponse;
    if (Object.keys(responseData).length > 0) {
      for (let i = 0; i < responseData.length; i += 1) {
        const stateData = responseData[i];
        const config = StateLocationMeta.states[stateData.name];

        const stateObj = {
          name: responseData[i].name,
          location: {
            latitude: responseData[i].latitude,
            longitude: responseData[i].longitude,
            latitudeDelta: config && config.latitudeDelta? config.latitudeDelta : 1,
            longitudeDelta: config && config.longitudeDelta ?config.longitudeDelta: 1,
          },
        };
        const markerObj = {
          latitude: responseData[i].latitude,
          longitude: responseData[i].longitude,
          shape: "CIRCLE",
          radius:
            radiusBase * responseData[i].outbreaks[0],
          fillColor: "rgba(255, 0, 0, 0.3)",
        };

        const markerObjCase = {
          ...markerObj,
          radius: radiusBase * responseData[i].cases[0],
        };
        markerListCases.push(markerObjCase);
        stateLocation.push(stateObj);
        state.push(responseData[i].name);
        markersListOutbreaks.push(markerObj);
      }
      markersListOutbreaks.shift();
      markerListCases.shift();
      const aimeCurrStateObject = responseData[0];

      const outbreakArraySize = aimeCurrStateObject.outbreaks.length;
      const currentWeekOutbreak =
        aimeCurrStateObject.outbreaks[outbreakArraySize - 1];

      const casesArraySize = aimeCurrStateObject.cases.length;
      const currentWeekCases = aimeCurrStateObject.cases[casesArraySize - 1];

      const stateCoordinates = stateLocation[0].location;
      this.setState({
        aimeResponse: responseData,
        states: state,
        area: state[0],
        outbreak: currentWeekOutbreak,
        cases: currentWeekCases,
        graphData: aimeCurrStateObject.outbreaks,
        stateCoordinates,
        stateLocationData: stateLocation,
        graphInputCasesOutbreaks: aimeCurrStateObject.outbreaks[outbreakArraySize - 1],
        stateMarkersOutbreaks: markersListOutbreaks,
        stateMarkersCases: markerListCases,
        markerListData: markersListOutbreaks,
      });
    }
  }

  setGraphData(ref) {
    const {
      aimeResponse,
      aimeIndex,
      outbreak,
      cases,
      stateMarkersOutbreaks,
      stateMarkersCases,
    } = this.state;
    if (aimeResponse[aimeIndex] === undefined) {
      return;
    }
    if (ref === "outBreak") {
      this.setState({
        graphData: aimeResponse[aimeIndex].outbreaks,
        outbreakBackround: "#E3E3E3",
        casesBackground: "white",
        graphInputLabel: this.outbreakLabel,
        graphInputCasesOutbreaks: outbreak,
        markerListData: stateMarkersOutbreaks,
      });
    }
    if (ref === "cases") {
      this.setState({
        graphData: aimeResponse[aimeIndex].cases,
        outbreakBackround: "white",
        casesBackground: "#E3E3E3",
        graphInputLabel: this.casesLabel,
        graphInputCasesOutbreaks: cases,
        markerListData: stateMarkersCases,
      });
    }
  }

  onPressDropDown = () => {
    if (this.dropDownRef) {
      this.dropDownRef.show();
    }
  };

  render() {
    this.areaLabel = helpers.findElement(TRENDS_SCREEN, AREA_LABEL).label;
    this.weekLabel = helpers.findElement(TRENDS_SCREEN, WEEK_LABEL).label;
    this.casesLabel = helpers.findElement(TRENDS_SCREEN, CASES_LABEL).label;
    this.outbreakLabel = helpers.findElement(
      TRENDS_SCREEN,
      OUTBREAK_LABEL
    ).label;
    const {
      graphData,
      casesBackground,
      area,
      states,
      outbreakBackround,
      outbreak,
      cases,
      graphInputLabel,
      graphInputCasesOutbreaks,
      graphInputWeekLabel,
    } = this.state;

    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 2,
          }}
        >
          {/* Area Selection */}
          <TouchableOpacity
            style={{
              width: '33%',
              flexDirection: "column",
              paddingTop: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.onPressDropDown();
            }}
          >
            <Text
              style={{
                color: '#899AA4',
                fontSize: 16,
                fontFamily: 'Avenir',
                fontWeight: '700',
                marginTop: 10,
                marginBottom: 8,
                alignSelf: 'center',
              }}
            >
              {` ${this.areaLabel} `}
            </Text>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                marginLeft: 8,
                justifyContent: 'center',
              }}>
              <ModalDropdown
                ref={dropDownRef => {
                  this.dropDownRef = dropDownRef;
                }}
                textStyle={styles.textStyle}
                defaultValue={area}
                dropdownStyle={styles.dropdownStyle}
                dropdownTextStyle={styles.dropdownTextStyle}
                style={styles.dropDownButton}
                options={states}
                onSelect={index => this.onSelectPicker(index)
                }
                showsVerticalScrollIndicator={false}
              />
              <MaterialIcons
                style={{ alignSelf: 'center', marginLeft: -16 }}
                pointerEvents="none"
                name="arrow-drop-down"
                size={25}
                color="#a8a8a8"
              />
            </View>
          </TouchableOpacity>
          {/* Outbreaks */}
          <TouchableOpacity
            style={{
              width: '33%',
              flexDirection: "column",
              paddingTop: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.setGraphData("outBreak")}
          >
            <Text style={{
              color: '#899AA4',
              fontSize: 16,
              fontFamily: 'Avenir',
              fontWeight: '700',
              marginTop: 10,
              marginBottom: 8,
              alignSelf: 'center',

            }}>
              {this.outbreakLabel}</Text>

            <View
              style={{
                backgroundColor: '#fff',
                // borderRadius: 8,
                // width: 70,
              }}
            >
              <Text
                style={{
                  color: '#4A4A4A',
                  fontSize: 20,
                  fontFamily: 'Avenir',
                  fontWeight: '700',
                  // marginTop: 10,
                  marginBottom: 0,
                  alignSelf: 'center',
                }}
              >
                {outbreak}
              </Text>
              <Text style={{
                fontFamily: 'Avenir',
                alignSelf: 'center',
                fontSize: 14,
                color: '#4A4A4A',
              }}>
                {this.weekLabel}
              </Text>
              {/* <View style={{ alignItems: "center" }}>
                <MaterialIcons
                  pointerEvents="none"
                  name="arrow-drop-down"
                  size={25}
                  color="#a8a8a8"
                />
              </View> */}
            </View>
          </TouchableOpacity>
          {/* Cases */}
          <TouchableOpacity
            style={{
              width: '33%',
              flexDirection: "column",
              paddingTop: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.setGraphData("cases")}
          >
            <Text style={{
              color: '#899AA4',
              fontSize: 16,
              fontFamily: 'Avenir',
              fontWeight: '700',
              marginTop: 10,
              marginBottom: 8,
              alignSelf: 'center',

            }}>
              {this.casesLabel}
            </Text>
            <View
              style={{
                backgroundColor: '#fff',
                // borderRadius: 8,
                // width: 70,
              }}
            >
              <Text
                style={{
                  color: '#ED1B2E',
                  fontSize: 20,
                  fontFamily: 'Avenir',
                  fontWeight: '700',
                  // marginTop: 10,
                  marginBottom: 0,
                  alignSelf: 'center',
                }}
              >
                {cases}
              </Text>
              <Text style={{
                fontFamily: 'Avenir',
                alignSelf: 'center',
                fontSize: 14,
                color: '#4A4A4A',
              }}>
                {this.weekLabel}
              </Text>
              {/* <View style={{ alignItems: "center" }}> */}
              {/* <MaterialIcons
                  pointerEvents="none"
                  name="arrow-drop-down"
                  size={25}
                  color="#a8a8a8"
                  style={{ alignItems: "center", justifyContent: "center" }}
                /> */}
              {/* </View> */}
            </View>
          </TouchableOpacity>
        </View>

        <AIMEGraph
          data={graphData}
          graphInputLabel={graphInputLabel}
          graphInputWeekLabel={graphInputWeekLabel}
          graphInputCasesOutbreaks={graphInputCasesOutbreaks}
        />

        {
          this.state.stateLocationData.length > 0 && (
            <MapNavigator
              minZoomLevel={this.state.minZoomLevel}
              location={this.state.stateCoordinates}
              markers={this.state.markerListData}
            />
          )
        }
      </View>
    );
  }
}

TrendSelection.propTypes = {
  token: PropTypes.string.isRequired,
  navigateCallback: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  meta: state.meta,
  userProfile: state.profile,
  token: state.auth.token,
});

export default connect(
  mapStateToProps,
  {
    getAIMEData,
    getAIMEDataAction: token => ({
      // eslint-disable-next-line no-undef
      context: pageKeys.AIME_TRENDS,
      type: CoreActionTypes.AIME_GET_TRENDS,
      payload: {
        token: token,
        category: "trends",
        subcategory: "outbreaks",
      },
    }),
  }
)(TrendSelection);

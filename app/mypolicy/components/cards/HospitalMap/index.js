/*
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 *  IMPORTS
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 */

// ----------------------------------------
// PACKAGE IMPORTS
// ----------------------------------------
import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { View, Platform } from "react-native";
import PropTypes from "prop-types";

// ----------------------------------------
// LOCAL & CONFIG IMPORTS
// ----------------------------------------
import { Colors, Sizes } from "../../../configs";
import Styles from "./style";
import Icon from "../../generics/Icon";

// ----------------------------------------
// COMPONENT IMPORTS
// ----------------------------------------

// ----------------------------------------
// INITIAL DATA
// ----------------------------------------
const DELTA = 0.03;

const initialRegion = {
  // latitude: 0,
  // longitude: 118.850,
  latitude: -6.117664,
  longitude: 106.906349,
  latitudeDelta: DELTA,
  longitudeDelta: DELTA
};

/*
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 *  MAIN CLASS
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 */
export default class HospitalMap extends Component {
  static propTypes = {
    getHospitalParam: PropTypes.any
  };
  // ----------------------------------------
  // ----------------------------------------
  // CONSTRUCTOR AND LIFE CYCLES
  // ----------------------------------------

  constructor(props) {
    super(props);
    this.state = {
      initialRegion: {
        latitude: props.getHospitalParam.latitude,
        longitude: props.getHospitalParam.longitude,
        latitudeDelta: DELTA,
        longitudeDelta: DELTA
      },
      latitude: props.getHospitalParam.latitude,
      longitude: props.getHospitalParam.longitude
    };
    this.renderMyPositionMarker = this.renderMyPositionMarker.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
    this.renderHospitalMarkers = this.renderHospitalMarkers.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { getHospitalParam } = this.props;
    const { initialRegion } = this.state;
    if (prevProps.getHospitalParam !== getHospitalParam) {
      this.setState({
        latitude: getHospitalParam.latitude,
        longitude: getHospitalParam.longitude,
        latitudeDelta: initialRegion.latitudeDelta,
        longitudeDelta: initialRegion.longitudeDelta
      });
    }
  }

  // ----------------------------------------

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    if (this.state != nextState) {
      return true;
    }

    return false;
  }

  // ----------------------------------------

  componentDidMount() {
    this.getCurrentPosition();
  }

  // ----------------------------------------
  // ----------------------------------------
  // METHODS
  // ----------------------------------------

  getCurrentPosition() {
    try {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log("position", position);
          this.setState({
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
            latitudeDelta: initialRegion.latitudeDelta,
            longitudeDelta: initialRegion.longitudeDelta
          });

          // this.props.onGPSCHecked(true);
        },
        error => {
          //TODO: better design
          switch (error.code) {
            case 1:
              if (Platform.OS === "ios") {
                alert(
                  "",
                  "Please enable location permission on your device through: Settings - Privacy - Localization"
                );
              } else {
                alert(
                  "",
                  "Please enable location permission on your device through: Settings - Apps - Prutopia - Localization"
                );
              }
              break;
            default:
              alert("", "Error: Cannot detect current location");
          }

          this.props.onGPSCHecked(false);
        }
      );
    } catch (e) {
      alert(e.message || "");
    }
  }

  // ----------------------------------------
  // ----------------------------------------
  // RENDERS
  // ----------------------------------------

  renderIcon(isMyLocation = false, isActive = false) {
    if (isMyLocation) {
      return <Icon name="my-location" size={43} color={Colors.main.baseRed} />;
    }

    let starMark = null;
    if (isActive) {
      starMark = (
        <View style={Styles.starMark.container}>
          <Icon name="star-white" size={16} color={Colors.main.baseWhite} />
          <Icon
            name="star-white"
            size={14}
            color={Colors.icon.stethoscope}
            style={Styles.starMark.innerStar}
          />
        </View>
      );
    }

    return (
      <View>
        <Icon
          name="hospital-location"
          size={isActive ? 29 : 26}
          color={Colors.icon.pin}
        />

        {starMark}
      </View>
    );
  }

  // ----------------------------------------

  renderMarker(position, isHospital = false, onPressDone, index) {
    return (
      <Marker
        key={index}
        coordinate={position}
        onPress={e => {
          e.stopPropagation();

          this.setState(position);

          onPressDone();
        }}
        style={Styles.marker.container}
      >
        {this.renderIcon(
          !isHospital,
          isHospital && this.props.activeMarkerIndex == index
        )}
      </Marker>
    );
  }

  // ----------------------------------------

  renderHospitalMarkers() {
    return this.props.hospitals
      ? this.props.hospitals.map((hospital, index) => {
          const position = {
            latitude: hospital.latitude,
            // latitude: hospital.latitude,
            longitude: hospital.longitude,
            // longitude: hospital.longitude,
            latitudeDelta: DELTA,
            longitudeDelta: DELTA
          };

          return this.renderMarker(
            position,
            true,
            () => hospital.onPress(),
            index
          );
        })
      : [];
  }

  // ----------------------------------------

  renderMyPositionMarker() {
    const myPosition = {
      latitude: this.props.lastLocation.lastLatitude,
      longitude: this.props.lastLocation.lastLongitude,
      latitudeDelta: DELTA,
      longitudeDelta: DELTA
    };

    const onPressDone = () =>
      this.props.onCurrentPositionPress({
        title: this.props.title,
        address: this.props.address,
        ...this.state
      });

    return this.renderMarker(myPosition, false, () => onPressDone(), -1);
  }

  calcCrow(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const callat1 = this.toRad(lat1);
    const callat2 = this.toRad(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(callat1) *
        Math.cos(callat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  onRegionChangeComplete = region => {
    const { latitude, longitude } = this.state;
    const distance = this.calcCrow(
      latitude,
      longitude,
      region.latitude,
      region.longitude
    );
    if (
      distance.toFixed(0) > 5 &&
      distance.toFixed(0) < 100 &&
      this.props.onRegionChangeComplete(region)
    ) {
      this.props.onRegionChangeComplete(region);
    }
  };

  // ----------------------------------------
  // ----------------------------------------
  // MAIN RENDER
  // ----------------------------------------

  render() {
    const { getHospitalParam } = this.props;
    const { initialRegion } = this.state;

    if (initialRegion.latitude === "" && initialRegion.longitude === "") {
      return null;
    }

    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        showsCompass={true}
        showsUserLocation={false}
        showsMyLocationButton={false}
        cacheEnabled={true}
        toolbarEnabled={false}
        loadingEnabled={true}
        moveOnMarkerPress
        region={{
          latitude: getHospitalParam.latitude,
          longitude: getHospitalParam.longitude,
          latitudeDelta: DELTA,
          longitudeDelta: DELTA
        }}
        initialRegion={initialRegion}
        onRegionChangeComplete={region => this.onRegionChangeComplete(region)}
        style={{ flex: 1 }}
      >
        {this.renderMyPositionMarker()}
        {this.renderHospitalMarkers()}
      </MapView>
    );
  }

  // ----------------------------------------
}

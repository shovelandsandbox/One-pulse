/* eslint-disable */
import { connect } from "react-redux";
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  LayoutAnimation,
  PermissionsAndroid,
  Platform,
  Keyboard,
  BackHandler,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import MapView, { AnimatedRegion, Marker, Circle } from "react-native-maps";
import SpecialityFilter, {
  SPECIALLY_FILTER_FOLDED_HEIGHT,
} from "../../components/SpecialityFilter";
import SearchWithHistory, {
  SEARCH_WITH_HISTORY_FOLDED_HEIGHT,
} from "../../components/SearchWithHistory";
import SearchMapsModal from "./searchMapsModal";
import {
  BACK_WHITE,
  AIME_LOGO_SIMPLE,
  MAP_ANNOTATION_CLINIC,
  MAP_ANNOTATION_CLINIC_SELECTED,
  MAP_ANNOTATION_HOSPITAL,
  MAP_ANNOTATION_HOSPITAL_SELECTED,
  MAP_ANNOTATION_FILTER,
  TO_USER_LOCATION,
  MAP_SAMPLE_CLINIC,
  MAP_SAMPLE_HOSPITAL,
  DENGUE_ALERT_MARKER,
  NAVIGATOR_FILTER,
} from "../../config/images";
import MapAnnotationDetail, {
  MAP_ANNOTATION_DESIGNED_HEIGHT_DENGUE,
  MAP_ANNOTATION_DESIGNED_HEIGHT_HOSPITAL,
} from "../../components/MapAnnotationDetail";
import {
  CoreUtils,
  CoreConfig,
  CoreActions,
  CoreActionTypes,
  metaHelpers,
  CoreServices,
} from "@pru-rt-internal/pulse-common";
const { NavigationService } = CoreServices;
const {
  SCREEN_KEY_NAVIGATION_MAIN_SCREEN,
  FINDHOSPITAL_TIP,
  FINDHOSPITAL,
} = CoreConfig;
const KEY_MAP_NAVIGATOR_YOUR_LOCATION = "navigationmainyourlocation";
import Geolocation from "Geolocation";
const {
  fetchMarkers,
  fetchSpecializationList,
  setHospitalDetails,
} = CoreActions;
const { calDelta, getMapBounds, getDeviceUUID } = CoreUtils;
const { pageKeys } = CoreConfig;
import MapSampleIndicator from "../../components/MapSampleIndicator";
import MapFloatingButton from "../../components/MapFloatingButton";
const mockResponse = require("../../mockResponse/specialization");
const sh = Dimensions.get("window").height;
const sw = Dimensions.get("window").width;
export const DISPLAY_MODE_HOSPITAL = "R_DM_HOSPITAL";
export const DISPLAY_MODE_DENGUE = "R_DM_DENGUE";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";
const { setDengueAlertTermsProcessed } = CoreActions;
const dungenMarkerLimits = 20;
const mapSampleConfigs = [
  {
    icon: MAP_SAMPLE_HOSPITAL,
    title: "Hospital",
    tintColor: "#ED1B2E",
  },
  {
    icon: MAP_SAMPLE_CLINIC,
    title: "Clinic",
    tintColor: "#F2C75C",
  },
];
const MARKER_TYPE_HOSPITAL = "HOSPITAL";
const MARKER_TYPE_CLINIC = "CLINIC";
import { Popup } from "react-native-map-link";
const {
  SCREEN_KEY_HOSPITAL_DETAIL_SCREEN_TABS,
  SCREEN_KEY_NAVIGATOR_FLEX,
  KEY_MODAL_HEADER,
  KEY_MODAL_SUB_HEADER,
  KEY_MODAL_CANCEL_BUTTON,
} = CoreConfig;
// const debugMarker = require('../../mockResponse/hospitalMarker.json')
import { HD_RENDER_HOSPITAL, HD_RENDER_CLINIC } from "../HospitalDetail";
class NavigatorMap extends Component {
  constructor(props) {
    super(props);
    const { displayMode, componentMode, navigation } = this.props;
    if (!componentMode) {
      if (navigation) {
        var contentType = navigation.getParam(
          "contentType",
          DISPLAY_MODE_HOSPITAL
        );
      }
    }
    this.state = {
      UUID: null,
      filers: [],
      mapRatio: 1,
      filterKeyword: "",
      currentBound: null,
      search: "",
      searchFolded: true,
      filteredClinic: [],
      filterFolded: false,
      filteredHospital: [],
      selectedDengue: null,
      selectedHospital: null,
      currentMapRegion: null,
      currentCoordnate: null,
      presentingFilter: false,
      shouldFocusOnMarker: false,
      nagivatePopUpVisible: false,
      shouldTrackingUserLocation: true,
      contentType: componentMode ? displayMode : contentType,
      SearchMapsModal: false,
      searchText: "",
    };
    // props.setHospitalDetails(debugMarker)
  }

  moveToSelectedRegion = (region, searchText) => {
    this.setState({ searchText });
    this.mapView && this.mapView.animateToRegion(region, 750);
  };
  componentDidMount() {
    const { contentType, currentCoordnate } = this.state;
    if (Platform.OS == "android") {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then(
        res => {
          if (res) {
            // if (!currentCoordnate) {
            const options = {
              enableHighAccuracy: Platform.OS == "ios",
              timeout: 5000,
              maximumAge: 0,
            };
            Geolocation.getCurrentPosition(
              response => {
                // debugger
                const coords = response.coords;
                const targetRegion = {
                  longitude: coords.longitude,
                  latitude: coords.latitude,
                  latitudeDelta: 0.0625 * 0.5 * 0.5,
                  longitudeDelta: 0.0625 * 0.5 * 0.5,
                };
                console.log("targetRegion", targetRegion);
                this.mapView && this.mapView.animateToRegion(targetRegion, 750);
                this.setState(
                  {
                    shouldTrackingUserLocation: true,
                    currentCoordnate: {
                      latitude: coords.latitude,
                      longitude: coords.longitude,
                    },
                  },
                  () => {
                    this._fetchHospitalData();
                    this._fetchClinicData();
                  }
                );
              },
              err => { }
            );
            // }
            this._beginWatchGeoLocation();
          } else {
            this.requestLocationPermission();
          }
        },
        err => { }
      );
    } else {
      if (!currentCoordnate) {
        const options = {
          enableHighAccuracy: Platform.OS == "ios",
          // timeout: 5000,
          // maximumAge: 0
        };
        Geolocation.getCurrentPosition(
          response => {
            const coords = response.coords;
            // debugger
            this.setState(
              {
                shouldTrackingUserLocation: true,
                currentCoordnate: {
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                },
              },
              () => {
                this._fetchHospitalData();
                this._fetchClinicData();
              }
            );
          },
          err => {
            // debugger
          }
        );
        this._beginWatchGeoLocation();
      }
    }

    this._fetchDeviceUUID();
    switch (contentType) {
      case DISPLAY_MODE_HOSPITAL:
        this._fetchClinicData();
        this._fetchHospitalData();
        break;
      case DISPLAY_MODE_DENGUE:
        break;
      default:
        break;
    }

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    if (this.state.SearchMapsModal) {
      this.setState(() => ({ SearchMapsModal: false }));
    } else {
      this.props.navigation.goBack();
    }
  };

  componentWillUnmount() {
    this._stopWatchGeoLocation();
    BackHandler.removeEventListener("hardwareBackPress");
  }

  _onMapReady() {
    const { currentCoordnate } = this.state;
    this.mapView && currentCoordnate && this._animateToUserLocationIfPossible();
  }

  _animateToUserLocationIfPossible() {
    const { currentCoordnate } = this.state;
    if (!currentCoordnate) {
      return;
    }
    const targetRegion = {
      longitude: currentCoordnate.longitude,
      latitude: currentCoordnate.latitude,
      latitudeDelta: 0.0625 * 0.5 * 0.5,
      longitudeDelta: 0.0625 * 0.5 * 0.5,
    };
    this.mapView && this.mapView.animateToRegion(targetRegion, 750);
  }

  async requestLocationPermission() {
    const { currentCoordnate } = this.state;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // if (!currentCoordnate) {
        const options = {
          enableHighAccuracy: Platform.OS == "ios",
          timeout: 5000,
          maximumAge: 0,
        };
        Geolocation.getCurrentPosition(
          response => {
            const coords = response.coords;
            // alert(coords.latitude+"："+coords.longitude)
            this.setState(
              {
                shouldTrackingUserLocation: true,
                currentCoordnate: {
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                },
              },
              () => {
                this.mapView &&
                  this.state.currentCoordnate &&
                  this.mapView.fitToCoordinates([this.state.currentCoordnate]);
                this._fetchClinicData();
                this._fetchHospitalData();
              }
            );
          },
          err => { }
        );
        // }
        this._beginWatchGeoLocation();
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  }

  _beginWatchGeoLocation() {
    // if (Platform.OS === "ios") {
    this.watcher = Geolocation.watchPosition(
      response => {
        const coords = response.coords;
        this.setState(
          {
            currentCoordnate: {
              latitude: coords.latitude,
              longitude: coords.longitude,
            },
          },
          () => { }
        );
      },
      error => { },
      {
        enableHighAccuracy: Platform.OS == "ios",
      }
    );
    // } else {
    //     this.requestLocationPermission()
    // }
  }

  getInitialState() {
    if (this.state.currentCoordnate) {
      return {
        coordinate: new AnimatedRegion({
          latitude: this.state.currentCoordnate.latitude,
          longitude: this.state.currentCoordnate.longitude,
        }),
      };
    }
  }

  _stopWatchGeoLocation() {
    this.watcher && Geolocation.clearWatch(this.watcher);
  }

  _onMapRegionChanged(r) {
    const scale = (180 / r.latitudeDelta + 360 / r.longitudeDelta) * 0.5;

    this.setState(
      {
        currentMapRegion: r,
        currentBound: getMapBounds(r),
        mapRatio: scale,
      },
      () => {
        debounce(() => this._fetchDengueAlertMarkers(), 2000, {
          leading: false,
          trailing: true,
        })();
      }
    );
  }

  _fetchHospitalData() {
    const { selectedSpecializations } = this.props;
    const { currentCoordnate } = this.state;

    // POSSIBLE_ENHANCEMENTS
    currentCoordnate &&
      this.props.fetchMarkers(
        {
          longitude: currentCoordnate.longitude,
          latitude: currentCoordnate.latitude,
          // 3.125  -  101.655
        },
        50,
        selectedSpecializations,
        this.props.token,
        "hospital"
      );
  }

  _fetchClinicData() {
    const { selectedSpecializations } = this.props;
    const { currentCoordnate } = this.state;
    // POSSIBLE_ENHANCEMENTS
    currentCoordnate &&
      this.props.fetchMarkers(
        {
          longitude: currentCoordnate.longitude,
          latitude: currentCoordnate.latitude,
          // 102.391808,3.523819
        },
        50,
        selectedSpecializations,
        this.props.token,
        "clinic"
      );
  }

  _fetchDengueAlertMarkers() {
    const { contentType } = this.state;
    const { token } = this.props;
    if (contentType != DISPLAY_MODE_DENGUE) {
      return;
    }
    const { UUID, currentMapRegion, currentBound } = this.state;

    this.props.fetchRiskZoneMarkersAction(
      currentMapRegion,
      currentBound,
      token,
      dungenMarkerLimits,
      UUID
    );
  }

  _fetchDeviceUUID() {
    getDeviceUUID(deviceInfo => {
      this.setState({
        UUID: deviceInfo.deviceId,
      });
    });
  }

  _filterHospitalMarkers(list) {
    // console.log('[HDM] source ~>', list[0]);
    // const marker = list[0]
    // if (marker) {
    //   console.log('[HDM] markerSample ~>', JSON.stringify(marker));
    //   // this.setState({
    //   //   selectedHospital: marker
    //   // })
    // }

    const key = this.state.filterKeyword ? this.state.filterKeyword : undefined;

    if (key == undefined) {
      return list;
    }

    try {
      const exp = RegExp(`(${key})+`, "gi");

      var source = list ? list : [];

      const res = source.filter((item, idx, arr) => {
        const address = item.address;
        const addLine1 = address.line1 ? address.line1 : "";
        const addLine2 = address.line2 ? address.line2 : "";
        const addLine3 = address.line3 ? address.line3 : "";
        const addString = [addLine1, addLine2, addLine3].join(" ");
        const addressLine = addString;
        return exp.test(addressLine);
      });
      return res;
    } catch (error) {
      return list;
    }
  }

  _filterClinicMarkers(list) {
    const key = this.state.filterKeyword ? this.state.filterKeyword : undefined;

    if (key == undefined) {
      return list;
    }

    try {
      const exp = RegExp(`(${key})+`, "gi");

      var source = list ? list : [];
      const res = source.filter((item, idx, arr) => {
        const address = item.address;
        const addLine1 = address.line1 ? address.line1 : "";
        const addLine2 = address.line2 ? address.line2 : "";
        const addLine3 = address.line3 ? address.line3 : "";
        const addString = [addLine1, addLine2, addLine3].join(" ");
        const addressLine = addString;
        return exp.test(addressLine);
      });
      return res;
    } catch (error) {
      return list;
    }
  }

  _filterDengueMarkers(list) {
    list.map(item => { });

    return list;
  }

  _shouldPresentBackButton() {
    const {
      presentingFilter,
      contentType,
      selectedHospital,
      selectedDengue,
      filterFolded,
      searchFolded,
    } = this.state;

    if (presentingFilter && !filterFolded) {
      return null;
    }

    if (!searchFolded) {
      return null;
    }

    const {
      navigation,
      hospitalMarkers,
      clinicMarkers,
      dengueMarkers,
      componentMode,
    } = this.props;

    return (
      <View
        style={{
          position: "absolute",
          top: 72,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            paddingLeft: 16,
            paddingRight: 8,
          }}
          onPress={() => {
            NavigationService.navigate("PulseHealth");
          }}
        >
          {!componentMode && (
            <Image
              style={{
                alignSelf: "center",
                height: 16,
                width: 20,
                tintColor: "#515B61",
              }}
              source={BACK_WHITE}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: "#fff",
            borderWidth: 1,
            paddingHorizontal: 10,
            flex: 1,
            marginRight: 16,
            borderColor: "#BDBDBD",
            borderRadius: 10,
            minHeight: 44,
            justifyContent: "center",
            alignItem: "center",
          }}
          onPress={() => {
            this.setState(() => ({ SearchMapsModal: true }));
            // Keyboard.dismiss();
          }}
        >
          <Text>
            {this.state.searchText ? this.state.searchText : "Search here"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  handleFilter(item) {
    NavigationService.navigate("SearchMapCategoryList", { currentLocation: this.state.currentCoordnate, category: item });
  }

  handleNewFilters() {
    return (
      <View
        style={{
          position: "absolute",
          top: 55,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <TouchableOpacity
          style={{ backgroundColor: "#fff", padding: 20 }}
          onPress={this.handleFilter("Restaurants")}
        >
          <Text>Restaurants</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "#fff", padding: 20 }}
          onPress={this.handleFilter("Groceries")}
        >
          <Text>Groceries</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "#fff", padding: 20 }}
          onPress={this.handleFilter("GasStations")}
        >
          <Text>Gas Stations</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "#fff", padding: 20 }}
          onPress={this.handleFilter("")}
        >
          <Text>...</Text>
        </TouchableOpacity>
      </View>
    );
  }

  setRecentSearch = recentSearch => {
    this.props.setRecentSearch(recentSearch);
  };

  render() {
    const ds = mockResponse.specialization ? mockResponse.specialization : [];
    const {
      presentingFilter,
      contentType,
      selectedHospital,
      selectedDengue,
      filterFolded,
      searchFolded,
      currentCoordnate,
      renderType,
      filers,
    } = this.state;

    const {
      navigation,
      hospitalMarkers,
      clinicMarkers,
      dengueMarkers,
      meta,
      selectedSpecializations,
    } = this.props;

    if (contentType == DISPLAY_MODE_HOSPITAL) {
      var filteredHospital = this._filterHospitalMarkers(hospitalMarkers);
      var filteredClinic = this._filterClinicMarkers(clinicMarkers);

      var focus = filteredHospital.length + filteredClinic.length == 1;

      if (focus) {
        if (this.state.shouldFocusOnMarker) {
          const marker =
            filteredClinic.length == 0
              ? filteredHospital[0]
              : filteredClinic[0];
          const coord = {
            longitude: marker.address.longitude,
            latitude: marker.address.latitude,
          };

          this.setState(
            {
              shouldFocusOnMarker: false,
              shouldTrackingUserLocation: false,
            },
            () => {
              this.mapView && this.mapView.fitToCoordinates([coord]);
            }
          );
        }
      }
    }

    const fullName = selectedHospital && selectedHospital.name;
    const address = selectedHospital && selectedHospital.address;

    const compassOffset = {x:8 , y:8}

    // if (address && currentLocation) {
    //   const selectedLongitude = address.longitude
    //   const selectedLatitude = address.latitude
    //   const userLongitude = currentLocation.longitude
    //   const userLatitude = currentLocation.latitude
    // }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#8ac3",
        }}
      >
        {/* Search Modal */}
        {this.state.SearchMapsModal && (
          <SearchMapsModal
            currentCoordnate={this.state.currentCoordnate}
            searchInput={this.state.searchText}
            setRecentSearch={this.setRecentSearch}
            recentSearch={this.props.recentSearch}
            moveToSelectedRegion={this.moveToSelectedRegion}
            onClose={() => {
              this.setState(() => ({ SearchMapsModal: false }));
            }}
          />
        )}

        {/* Map Container */}
        <View
          style={{
            flex: 1,
          }}
          onMoveShouldSetResponder={() => {
            if (this.state.shouldTrackingUserLocation == true) {
              this.setState({
                shouldTrackingUserLocation: false,
              });
            }
            return true;
          }}
        >
          <MapView
            style={{
              flex: 1,
            }}
            // region={this.getInitialState()}
            onRegionChangeComplete={r => {
              this._onMapRegionChanged(r);
              // this.setState({
              //     shouldTrackingUserLocation: false
              // })
            }}
            onPress={() => {
              this.setState({
                shouldTrackingUserLocation: false,
                selectedHospital: null,
              });
            }}
            onMapReady={() => {
              this._onMapReady();
            }}
            showsUserLocation={true}
            followsUserLocation={this.state.shouldTrackingUserLocation}
            userLocationAnnotationTitle={
              metaHelpers.findElement(
                SCREEN_KEY_NAVIGATION_MAIN_SCREEN,
                KEY_MAP_NAVIGATOR_YOUR_LOCATION
              ).label
            }
            zoomEnabled={true}
            zoomControlEnabled={true}
            showsCompass={true}
            compassOffset={compassOffset}
            ref={isa => (this.mapView = isa)}
          >
            {/* Hospital Markers */}
            {contentType == DISPLAY_MODE_HOSPITAL &&
              hospitalMarkers &&
              filteredHospital.map(item => {
                const coordinate = {
                  latitude: item.address.latitude,
                  longitude: item.address.longitude,
                };

                return coordinate.latitude && coordinate.longitude ? (
                  <Marker
                    coordinate={coordinate}
                    image={
                      selectedHospital == item
                        ? MAP_ANNOTATION_HOSPITAL_SELECTED
                        : MAP_ANNOTATION_HOSPITAL
                    }
                    onPress={() => {
                      this.setState(
                        {
                          selectedHospital: null,
                        },
                        () => {
                          this.setState(
                            {
                              selectedHospital: item,
                            },
                            () => {
                              // this.props.setHospitalDetails(marker)
                            }
                          );
                        }
                      );
                    }}
                  />
                ) : null;
              })}
            {/* Clinic Markers */}
            {contentType == DISPLAY_MODE_HOSPITAL &&
              clinicMarkers &&
              filteredClinic.map(item => {
                const coordinate = {
                  latitude: item.address.latitude,
                  longitude: item.address.longitude,
                };

                return coordinate.latitude && coordinate.longitude ? (
                  <Marker
                    coordinate={coordinate}
                    image={
                      selectedHospital == item
                        ? MAP_ANNOTATION_CLINIC_SELECTED
                        : MAP_ANNOTATION_CLINIC
                    }
                    onPress={() => {
                      this.setState(
                        {
                          selectedHospital: null,
                        },
                        () => {
                          this.setState({
                            selectedHospital: item,
                          });
                        }
                      );
                    }}
                  />
                ) : null;
              })}
            {/* Dengue Markers */}
            {contentType == DISPLAY_MODE_DENGUE &&
              dengueMarkers &&
              this._filterDengueMarkers(dengueMarkers).map(item => {
                const location = {
                  longitude: item.longitude,
                  latitude: item.latitude,
                };
                const radius = item.radius || 400;

                return (
                  <View>
                    <Circle
                      center={location}
                      radius={radius}
                      strokeWidth={0}
                      strokeColor={"#0000"}
                      // fillColor={"#F0949144"}
                      fillColor={"rgba(110, 11, 232, 0.1)"}
                    />
                    <Marker coordinate={location} image={DENGUE_ALERT_MARKER} />
                  </View>
                );
              })}
          </MapView>
        </View>

        {/* Back button */}
        {this._shouldPresentBackButton()}
        {/* {this.handleNewFilters()} */}

        {/* AIME logo */}
        {false && this.state.contentType == DISPLAY_MODE_DENGUE && (
          <Image
            style={{
              position: "absolute",
              top: 26,
              right: 20,
              height: 12,
              width: 50,
              resizeMode: "contain",
              // backgroundColor: '#8ac'
            }}
            source={AIME_LOGO_SIMPLE}
          />
        )}
        {/* Filter Button */}
        {/* {
          contentType == DISPLAY_MODE_HOSPITAL &&
          <MapFloatingButton
            style={{
              position: "absolute",
              bottom: (contentType == DISPLAY_MODE_DENGUE) ? 25 : presentingFilter ? SPECIALLY_FILTER_FOLDED_HEIGHT : SEARCH_WITH_HISTORY_FOLDED_HEIGHT + 50,
              right: 20,
              width: 36,
              height: 36,
              aspectRatio: 1 / 1,
              backgroundColor: "#fff"
            }}
            icon={NAVIGATOR_FILTER}
            iconTintColor={
              selectedSpecializations.length > 0
                ? '#ED1B2E'
                : '#515B61'
            }
            onPress={() => {
              // Present Filter Controller
              navigation.navigate('HospitalSpecialityFilterList', {
                lon: currentCoordnate ? currentCoordnate.longitude : null,
                lat: currentCoordnate ? currentCoordnate.latitude : null,
              })
            }}
          />
        } */}

        {/* Location Button */}
        {true && (
          <MapFloatingButton
            style={{
              position: "absolute",
              bottom:
                contentType == DISPLAY_MODE_DENGUE
                  ? 25
                  : presentingFilter
                    ? SPECIALLY_FILTER_FOLDED_HEIGHT
                    : SEARCH_WITH_HISTORY_FOLDED_HEIGHT,
              right: 20,
              width: 36,
              height: 36,
              aspectRatio: 1 / 1,
              backgroundColor: "#fff",
            }}
            icon={TO_USER_LOCATION}
            onPress={() => {
              this.setState({
                shouldTrackingUserLocation: true,
              });
              this.mapView &&
                currentCoordnate &&
                this._animateToUserLocationIfPossible();
            }}
          />
        )}

        {/* Map example displayer */}
        {false &&
          searchFolded &&
          !presentingFilter &&
          contentType == DISPLAY_MODE_HOSPITAL &&
          !selectedHospital && (
            <View
              style={{
                position: "absolute",
                left: 0,
                bottom: SEARCH_WITH_HISTORY_FOLDED_HEIGHT - 15,
                width: sw,
                height: 30,
                flexDirection: "row",
              }}
            >
              {contentType == DISPLAY_MODE_HOSPITAL &&
                mapSampleConfigs.map(item => {
                  return (
                    <MapSampleIndicator
                      style={{
                        height: "75%",
                        alignSelf: "center",
                        marginLeft: 8,
                        backgroundColor: "#fff",
                      }}
                      icon={item.icon}
                      title={item.title}
                      tintColor={item.tintColor}
                    />
                  );
                })}
            </View>
          )}

        {/* Map Tips */}
        {contentType == DISPLAY_MODE_HOSPITAL && this.props.country !== "ID" && (
          <Text
            style={{
              position: "absolute",
              left: 10,
              bottom: SEARCH_WITH_HISTORY_FOLDED_HEIGHT - 15,
              fontSize: 11,
              fontFamily: "Avenir",
              color: "#515B619f",
            }}
          >
            {`* ${
              metaHelpers.findElement(FINDHOSPITAL, FINDHOSPITAL_TIP).label
              }`}
          </Text>
        )}

        {/* Filter Container */}
        {presentingFilter && contentType == DISPLAY_MODE_HOSPITAL && (
          <SpecialityFilter
            ref={isa => (this.filter = isa)}
            isFolded={false}
            onFoldStateChanged={s => {
              this.setState({
                filterFolded: s,
              });
            }}
            displaySource={ds}
            onFilterListChanged={list => { }}
            onClearAction={() => {
              this.setState(
                {
                  filers: [],
                },
                () => {
                  this.setState({
                    presentingFilter: false,
                  });
                }
              );
            }}
            filters={this.state.filers}
            onFilterListChanged={filters => {
              this.setState(
                {
                  filters: filters,
                },
                () => {
                  this._fetchClinicData();
                  this._fetchHospitalData();
                }
              );
            }}
          />
        )}

        {/* Search Container */}
        {/* {
          !presentingFilter && (contentType == DISPLAY_MODE_HOSPITAL) &&
          <SearchWithHistory
            onFoldStateChanged={(s) => {
              this.setState({
                searchFolded: s
              });
            }}
            ref={isa => this.search = isa}
            // accessoryAction={() => {
            //   this.setState({
            //     presentingFilter: true,
            //     filterFolded: false
            //   });
            // }}
            onSubmit={(keyword) => {
              this.setState({
                filterKeyword: keyword
              }, () => {
                const ca = this._filterClinicMarkers(clinicMarkers);
                const ha = this._filterHospitalMarkers(hospitalMarkers);
                const length = ca.length + ha.length;
                ;

                this.setState({
                  shouldFocusOnMarker: length == 1
                });
              });
            }}
          />
        } */}
        {/* Annotation Detail */}
        {(selectedHospital || selectedDengue) && (
          <MapAnnotationDetail
            contentType={this.state.contentType}
            selectedItem={selectedDengue ? selectedDengue : selectedHospital}
            onCloseAction={() => {
              switch (this.state.contentType) {
                case DISPLAY_MODE_HOSPITAL:
                  this.setState({
                    selectedHospital: null,
                  });
                  break;
                case DISPLAY_MODE_DENGUE:
                  this.setState({
                    selectedDengue: null,
                  });
                  break;
                default:
                  break;
              }
            }}
            currentLocation={this.state.currentCoordnate}
            onDetailAction={() => {
              const marker = this.state.selectedHospital;
              switch (marker.type) {
                case MARKER_TYPE_HOSPITAL:
                  {
                    this.state.currentCoordnate &&
                      navigation.navigate("HospitalDetail", {
                        item: this.state.selectedHospital,
                        currentLocation: this.state.currentCoordnate,
                        renderType: HD_RENDER_HOSPITAL,
                      });
                  }
                  return;
                case MARKER_TYPE_CLINIC:
                  {
                    this.state.currentCoordnate &&
                      navigation.navigate("HospitalDetail", {
                        item: this.state.selectedHospital,
                        currentLocation: this.state.currentCoordnate,
                        renderType: HD_RENDER_CLINIC,
                      });
                  }
                  return;
                default:
                  return;
              }
            }}
            onNavigateAction={() => {
              // debugger
              this.setState({
                nagivatePopUpVisible: true,
              });
            }}
          />
        )}
        {/* Navigating Popup */}
        {address && fullName && currentCoordnate && (
          <Popup
            isVisible={this.state.nagivatePopUpVisible}
            onCancelPressed={() =>
              this.setState({ nagivatePopUpVisible: false })
            }
            onAppPressed={() => this.setState({ nagivatePopUpVisible: false })}
            onBackButtonPressed={() =>
              this.setState({ nagivatePopUpVisible: false })
            }
            modalProps={{
              // you can put all react-native-modal props inside.
              animationIn: "slideInUp",
            }}
            options={{
              longitude: address.longitude,
              latitude: address.latitude,
              sourceLongitude: currentCoordnate.longitude,
              sourceLatitude: currentCoordnate.latitude,
              title: fullName,
              googleForceLatLon: false,
              dialogTitle: metaHelpers.findElement(
                SCREEN_KEY_NAVIGATOR_FLEX,
                KEY_MODAL_HEADER
              ).label,
              dialogMessage: metaHelpers.findElement(
                SCREEN_KEY_NAVIGATOR_FLEX,
                KEY_MODAL_SUB_HEADER
              ).label,
              cancelText: metaHelpers.findElement(
                SCREEN_KEY_NAVIGATOR_FLEX,
                KEY_MODAL_CANCEL_BUTTON
              ).label,
            }}
          />
        )}
      </View>
    );
  }
}

NavigatorMap.PropTypes = {
  displayMode: PropTypes.string,
  componentMode: PropTypes.bool,
};

NavigatorMap.defaultProps = {
  componentMode: false,
};

const mapStateToProps = state => {
  return {
    meta: state.meta,
    token: state.auth.token,
    hospitalMarkers: state.navigator.hospital.hospitalMarkers,
    clinicMarkers: state.navigator.clinic.clinicMarkers,
    dengueMarkers: state.riskzone.riskzone.riskZoneMarkers,
    selectedSpecializations: state.navigator.filter.selectedSpecialization,
    country: state.auth.countryInfo.simCountry,
    recentSearch: state.navigator.recentSearch.recentSearch,
  };
};

export default connect(mapStateToProps, {
  setDengueAlertTermsProcessed,
  setHospitalDetails,
  fetchMarkers,
  fetchRiskZoneMarkersAction: (
    region,
    boundObject,
    token,
    riskZoneMarkerLimit,
    deviceId
  ) => ({
    context: pageKeys.DENGUE_ZONE,
    type: CoreActionTypes.RISK_ZONE_MARKERS,
    payload: {
      region,
      boundObject,
      token,
      riskZoneMarkerLimit,
      deviceId,
    },
  }),
  setRecentSearch: payload => ({
    type: CoreActionTypes.SET_NAVIGATOR_RECENT_SEARCH,
    payload,
  }),
})(NavigatorMap);

import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
  PermissionsAndroid,
} from "react-native";
import _ from "lodash";
import { PruBackHeader } from "../../components";
import { connect } from "react-redux";
import { path, pathOr } from "ramda";
import { CoreConfig, metaHelpers } from "@pru-rt-internal/pulse-common";
import { Popup } from "react-native-map-link";
import {
  HEART_FILLED,
  CALL,
  NAVIGATE,
  HOSPITAL,
} from "../../../assets/images/affinityGroup";
import AppConfig from "../../config/AppConfig";
import { HD_RENDER_HOSPITAL, HD_RENDER_CLINIC } from "../HospitalDetail";
import * as geolib from "geolib";
const {
  SCREEN_KEY_HOSPITAL_DETAIL_SCREEN_TABS,
  SCREEN_KEY_NAVIGATOR_FLEX,
  KEY_MODAL_HEADER,
  KEY_MODAL_SUB_HEADER,
  KEY_MODAL_CANCEL_BUTTON,
} = CoreConfig;
import MetaConstants from "./meta";

let config = require("./config.json");

class SearchMapCategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nagivatePopUpVisible: false,
      dataList: [],
      filters: [],
      selectedFilter: {},
      currentCoordnate: pathOr(
        "",
        ["state", "params", "currentCoordnate"],
        this.props.navigation
      ),
      category: pathOr(
        "",
        ["state", "params", "category"],
        this.props.navigation
      ),
    };
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    this.viewConfig = [];
  }

  getCategoryMarkerList(category) {
    const { hospitalMarkers, clinicMarkers } = this.props;
    switch (category) {
      case "Hospitals":
        return hospitalMarkers || [];
      case "Clinics":
        return clinicMarkers || [];
    }
  }

  componentDidMount() {
    const { currentCoordnate, category } = this.state;
    if (category) {
      //update distance
      let res = [];
      let markers = this.getCategoryMarkerList(category);
      for (let i in markers) {
        let distance = 0;
        if (markers[i].address) {
          //console.log("currentCoordnate",currentCoordnate)
          (distance = geolib.getPreciseDistance(currentCoordnate, {
            latitude: markers[i].address.latitude,
            longitude: markers[i].address.longitude,
          })),
            0.01;
        }
        var temp = new Object(markers[i]);
        var cal_distance = "";
        //If distance is greater than 500 meters than convert into kms
        distance > 500
          ? (cal_distance =
            parseFloat(geolib.convertDistance(distance, "km")).toFixed(2) +
            " km")
          : (cal_distance = distance + " meters");

        temp["cal_distance"] = cal_distance;
        temp["distance"] = distance;
        res.push(temp);
      }
      res = res.sort(function (a, b) {
        return a["distance"] - b["distance"];
      });

      // get filters
      let allFilters = [];

      this.metaConstants.config.map(category => {
        if (category.key === this.state.category) {
          this.viewConfig = category.viewConfig || [];
          allFilters = category.filters || [];
        }
      });

      // remove filters which has no data
      const filters = allFilters.filter(filter => {
        // check for visibility
        if (filter.visible) {
          const { filter_by_key, filter_by_value, key } = filter;
          // if filters are empty show full data
          if (!filter_by_key && !filter_by_value) {
            if (key === "NearYou") {
              //  select first 5 items
              filter.data = res.slice(0, 5);
            } else {
              filter.data = res;
            }
            return filter;
          } else {
            const filteredMarkers = res.filter(marker => {
              if (marker[filter_by_key] === filter_by_value) {
                return marker;
              }
            });
            if (filteredMarkers.length > 0) {
              filter.data = filteredMarkers;
              return filter;
            }
          }
        }
      });

      // select first filter by default
      const selectedFilter = filters[0] || {};

      // set State
      this.setState({ dataList: res, filters, selectedFilter });
    }
  }

  handleHeader() {
    return (
      <PruBackHeader
        onPress={() => {
          this.props.navigation.goBack();
        }}
        title={this.state.category}
      />
    );
  }

  async requestLocationPermission(link_android) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Linking.openURL(link_android);
      } else {
      }
    } catch (err) { }
  }

  handleOnCallClick(item) {
    const number = pathOr("", ["contactDetails", "phone", "value"], item);
    switch (Platform.OS) {
      case "ios":
        const link_ios = `tel:${number}`;
        Linking.openURL(link_ios);
        break;

      default:
        const link_android = `tel:${number}`;
        this.requestLocationPermission(link_android);
        break;
    }
  }

  handleOnNavigateClick(item) {
    this.setState({
      nagivatePopUpVisible: true,
      navigateItem: item,
    });
  }

  fetchStyle = str => {
    let style = {};
    try {
      style = JSON.parse(str);
    } catch (e) {
      style = {};
    }
    return style;
  };

  handleOnContainerClick = (container, item) => {
    if (container.invoke_func) {
      const funcName = container.invoke_func;
      this[funcName] ? this[funcName](item) : null
    }
    if (container.action && container.action.type) {
      this.props.dispatch({
        context: container.action.context,
        type: container.action.type,
        navigateTo: container.action.navigateTo,
        payload: {
          params: {
            ...container.action.params,
            item: item,
            currentLocation: this.state.currentCoordnate,
          }

        }
      });
    }

  }

  renderHospitalItems = ({ item }) => {
    return (
      <>
        <View style={{ flexDirection: "row", flex: 1, padding: 16 }}>
          {this.viewConfig.map((config, i) => {
            const content = pathOr([], ["content"], config);
            return (
              <View
                style={{
                  ...this.fetchStyle(config.config_style)
                }}
              >
                {content.map(displayItem => {
                  console.log("displayItem", displayItem)
                  if (displayItem.visible) {
                    const containers = pathOr([], ["containers"], displayItem);
                    return (
                      <View
                        style={{
                          ...this.fetchStyle(displayItem.content_style)
                        }
                        }
                      >
                        {containers.map(container => {
                          let val = "";
                          if (Array.isArray(container.key)) {
                            container.key.map((objKey,i) => {
                              val = val + (_.get(item, objKey) || "");
                              if(i !== container.key.length -1){
                                val = val+ `, `
                              }
                            });
                          } else {
                            val = _.get(item, container.key);
                          }

                          return (
                            <>
                              {container.type === "image" ? (
                                <TouchableOpacity onPress={() => {
                                  this.handleOnContainerClick(container, item)
                                }}>
                                  <Image
                                    source={{
                                      uri: AppConfig.getCMSUrl() +
                                        "pulse/resources" +
                                        container.img_uri +
                                        "?namespace=" +
                                        this.props.namespace
                                    }
                                    }
                                    style={
                                      this.fetchStyle(container.image_style)
                                    }
                                  ></Image>
                                </TouchableOpacity>
                              ) : (
                                  <TouchableOpacity activeOpacity={1} onPress={() => {
                                    this.handleOnContainerClick(container, item)
                                  }}>
                                    {container.display_name ? (
                                      <Text
                                        style={
                                          this.fetchStyle(container.label_style)
                                        }
                                      >
                                        {container.display_name}
                                      </Text>
                                    ) : null}
                                    <Text
                                      style={
                                        this.fetchStyle(container.key_style)
                                      }
                                    >
                                      {val}
                                    </Text>
                                  </TouchableOpacity>
                                )}
                            </>
                          );
                        })}
                      </View>
                    );
                  }

                })}
              </View>
            );
          })}
        </View>

        {/* Divider */}
        <View style={{ borderWidth: 0.2, color: "#f5f5f5", marginHorizontal: 16, marginVertical: 4 }}></View>
      </>
    );
  };

  getRenderType() {
    const { category } = this.state;
    switch (category) {
      case "Hospitals":
        return HD_RENDER_HOSPITAL;
      case "Cilinics":
        return HD_RENDER_CLINIC;
    }
  }

  handleOnSeeDetailsClick = item => {
    const { currentCoordnate } = this.state;
    if (item && currentCoordnate) {
      this.props.navigation.navigate("HospitalDetail", {
        item: item,
        currentLocation: currentCoordnate,
        renderType: this.getRenderType(),
      });
    }
  };

  handleSelectedFilter = filter => {
    this.setState(() => ({ selectedFilter: filter }));

    // const GOOGLE_API_KEY = AppConfig.getGoogleApiKey(Platform.OS);
    // const GOOGLE_PLACES_URL = AppConfig.getGooglePlacesUrl();
    // const encodedKey = encodeURIComponent(GOOGLE_API_KEY);

    // select first N number of hospitals and calculate exact distace and ETA
    // dataList.map((marker, i) => {
    //   if (i < 5) {
    //     if (currentCoordnate && marker.address) {
    //       const url = `https://maps.googleapis.com/maps/api/distancematrix/json?key=${encodedKey}&origins=${currentCoordnate.latitude},${currentCoordnate.longitude}&destinations=${marker.address.latitude},${marker.address.longitude}`;
    //       console.log("mapsURl", url);
    //       fetch(url)
    //         .then(response => response.json())
    //         .then(responseJson => {
    //           if (responseJson.status === "OK") {
    //             // const searchResults = responseJson.predictions || [];
    //             console.log("responseJson", responseJson);
    //           }
    //         });
    //     }
    //   }
    // })
  };

  render() {
    const { currentCoordnate, selectedFilter, dataList, filters } = this.state;



    const filteredDataList = pathOr(dataList, ["data"], selectedFilter);

    console.log("ViewConfog", this.viewConfig)

    // console.log("currentCoordnateprops", currentCoordnate);
    // console.log("currentCoordnateprops", this.state.navigateItem);
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View>{this.handleHeader()}</View>

        {/* Fliters */}
        <View
          style={{
            margin: 16,
            flexDirection: "row",
            // justifyContent: "space-between",
          }}
        >
          {filters.map(filter => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.handleSelectedFilter(filter);
                }}
                style={{
                  paddingHorizontal: 24,
                  paddingVertical: 4,
                  borderRadius: 12,
                  borderColor:
                    selectedFilter.key === filter.key ? "#ea1b2d" : "#cccccc",
                  borderWidth: 0.3,
                  backgroundColor: "#fff",
                  elevation: 2,
                  marginRight: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color:
                      selectedFilter.key === filter.key ? "#ea1b2d" : "#cccccc",
                    textAlign: "center",
                  }}
                >
                  {filter.display_name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <ScrollView style={{ flex: 1 }}>
          <FlatList
            style={{
              flex: 1,
              marginBottom: 30,
              marginTop: 5,
            }}
            data={filteredDataList}
            showsVerticalScrollIndicator={false}
            renderItem={this.renderHospitalItems}
          />
        </ScrollView>
        {this.state.navigateItem &&
          this.state.navigateItem.address &&
          currentCoordnate && (
            <Popup
              isVisible={this.state.nagivatePopUpVisible}
              onCancelPressed={() =>
                this.setState({ nagivatePopUpVisible: false })
              }
              onAppPressed={() =>
                this.setState({ nagivatePopUpVisible: false })
              }
              onBackButtonPressed={() =>
                this.setState({ nagivatePopUpVisible: false })
              }
              modalProps={{
                // you can put all react-native-modal props inside.
                animationIn: "slideInUp",
              }}
              options={{
                longitude: this.state.navigateItem.address.longitude,
                latitude: this.state.navigateItem.address.latitude,
                sourceLongitude: currentCoordnate.longitude,
                sourceLatitude: currentCoordnate.latitude,
                title: this.state.navigateItem.name,
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

const mapStateToProps = state => {
  return {
    hospitalMarkers: state.navigator.hospital.hospitalMarkers,
    clinicMarkers: state.navigator.clinic.clinicMarkers,
    namespace: pathOr("", ["auth", "userAgent", "region"], state),
  };
};

export default connect(mapStateToProps)(SearchMapCategoryList);

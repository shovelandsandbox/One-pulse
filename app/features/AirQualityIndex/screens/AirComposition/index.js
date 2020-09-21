import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { View, Text, Image, TouchableOpacity, Platform, ScrollView, PermissionsAndroid } from "react-native";
import CardView from "react-native-cardview";
import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers,
  events,
  CoreComponents,
} from "@pru-rt-internal/pulse-common";
import {
  AQHI_Temperature,
  AQHI_Info,
  AQHI_Humidity,
  AQHI_Back,
  BACKGROUND_PRODUCT,
  BACK,
  AirQuality,
  HealthTips,
  Dew,
  Humidity,
  Pressure,
  Temperature,
  Wind,
} from "../../../../config/images";
import AQDial from '../../components/AQDial';
import Geolocation from "Geolocation";
import Permissions from "react-native-permissions";
import LocationAccessModal from "../../components/LocationAccessModal";
import SearchComponent from "../../components/SearchComponent";
import FailureModal from "../../components/FailureModal";
import Geocoder from 'react-native-geocoding';
const {
  pageKeys,
} = CoreConfig;
import { styles } from './styles'
import metaConstants from "../../meta";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
import {
  checkAvailability,
  resetAqhi,
  getStationName,
  getStationNameByCity,
} from '../../actions'
import CustomBottom from "../../components/CustomBottom";
import { dispatchEvent } from "../../../../actions";



class AirComposition extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stationName: "",
      locationPermission: "",
      permissionModal: true,
      query: "",
      selectedItemIndex: 0
    };
    this.metaConstants = { ...metaConstants.airQualityScreenMeta() }
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.state.locationPermission !== prevState.locationPermission) {
      console.log(":::inside componentDidUpdate")
      this.getStationName();
    }
  }


  componentDidMount() {
    this.props.dispatchEvent(events.AirQualityScreen);
    this.props.resetAqhi();
    this.locationPermission();

    if (this.state.locationPermission === "authorized") {
      this.getStationName();
    }
  }

  getStationName() {
    Geolocation.getCurrentPosition(location => {
      this.props.getStationName(
        location.coords.latitude,
        location.coords.longitude
      );
      Geocoder.from(location.coords.latitude, location.coords.longitude)
        .then(json => {
          var addressComponent = json.results[6].formatted_address;
          this.setState({ query: addressComponent })
        })
        .catch(error => console.log(error));
    },
      (err) => { }
    );
  };

  getStationNameByCity = (lat, long) => {
    this.props.getStationName(lat, long);
  };

  locationPermission = () => {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      .then((response) => {
        if (!response) {
          this.askLocationPermission("undetermined");
        } else {
          this.setState({
            locationPermission: "authorized",
            permissionModal: false,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  _requestPermission = () => {
    if (Platform.OS == "ios") {
      this.setState({ permissionModal: false });
      this.setState({ locationPermission: "authorized" });
    }
    else {
      Permissions.request("location")
        .then((response) => {
          this.setState({ permissionModal: false });
          this.setState({ locationPermission: response });
        })
        .catch((error) => console.log(error));
    }

  };

  askLocationPermission(status) {
    if (status == "undetermined") {
      this.setState({ permissionModal: true });
    } else {
      this.setState({ permissionModal: false });
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.getLongLat);
  }

  renderContent = () => {
    const { airQualityReport } = this.props;
    let airQualityData = airQualityReport;
    let airQualityDataArr = airQualityData?.genericIndex?.data;

    if (!airQualityDataArr) {
      return null;
    }
    else {
      let airQualityIndex = airQualityData.airQualityIndex.currentValue;
      let airQualityDescription = airQualityData.airQualityIndex.description;
      let ar = airQualityDescription.split(' ')
      let Quality = ar[0]
      return (
        <>
          <View
            style={styles.contentViewStyle}>
            <View style={styles.dialView} >
              <View style={styles.QualityIndexView}>
                <Text style={styles.QualityIndexText}>
                  {airQualityIndex}
                </Text>
              </View>
              <View style={styles.QualityView}>
                <Text style={styles.QualityText}>
                  {Quality}
                </Text>
                <Text style={styles.airQualityText}>
                  {this.metaConstants.airQuality}
                </Text>
              </View>
            </View>
            <View style={styles.dialMainView}>
              <AQDial value={airQualityData.airQualityIndex.currentValue} />
            </View>
          </View>
        </>
      );
    }
  }

  onChange = val => {
    this.setState({ query: val });
    //this.props.onChange(val);
  };

  onAddressSelected = (completeAddress, lat, long) => {
    //this will trigger WithLocation get location which in turn will update mapview
    this.setState(
      {
        completeAddress,
      },
      () => {

        this.getStationNameByCity(lat, long);
        //this.props.onChange(completeAddress);
        this.setState({ query: completeAddress });
      }
    );
  };

  checkDecimal(num) {
    if (Number.isInteger(num)) {
      return num
    } else {
      let fixedDecimalNo = num.toFixed(2);
      return fixedDecimalNo;
    }

  }

  getImageFromKey = key => {

    switch (key) {
      case "airQuality":
        return AirQuality;
      case "healthTips":
        return HealthTips
      case "TEMPARATURE":
        return Temperature
      case "PRESSURE":
        return Pressure
      case "HUMIDITY":
        return Humidity
      case "DEW":
        return Dew
      case "WIND":
        return Wind


      default:
        return AirQuality;
    }
  };

  renderLowerHeader() {
    const { airQualityReport } = this.props;
    let airQualityData = airQualityReport;
    let airQualityDataArr = airQualityData?.genericIndex?.data;

    if (!airQualityDataArr) {
      return null;
    } else {
      return (
        <>
          <View style={styles.HeaderDetailedView} >
            {airQualityDataArr.map((item, index) => {
              return (
                <View style={styles.HeaderImageView}>
                  <Image
                    source={this.getImageFromKey(item.measurement)}
                    resizeMode={"contain"}
                    style={styles.HeaderImage}
                  />
                  <Text style={styles.HeaderImageText}>
                    {parseFloat(item.value).toFixed(0)}
                    {" "}{item.unit}
                  </Text>
                </View>
              )
            })}
          </View>
        </>

      )
    }
  }

  renderAddressDetails() {
    const { airQualityReport } = this.props;
    let airQualityData = airQualityReport;


    if (!airQualityData) {
      return null;
    } else {
      let longitudeValue = airQualityData.longitude
      let latitudeValue = airQualityData.latitude
      let prepare = `Lat: ${latitudeValue} ${"   "} Long: ${longitudeValue}`

      return (
        <ScrollView>
          <View style={styles.addressView} >
            <Text numberOfLines={1} style={styles.airReportStyle}>
              {this.state.query}
            </Text >
            <Text style={styles.airReportStyle}>
              {prepare}
            </Text>
          </View>
        </ScrollView>

      )
    }
  }

  renderOtherAirCompositions() {
    const { airQualityReport } = this.props;
    let airQualityData = airQualityReport;
    let airQualityDataArr = airQualityData?.airQualityIndex?.data;
    if (!airQualityDataArr) {
      return null;
    } else {
      return (
        <CustomBottom airQualityData={airQualityDataArr} />
      )
    }

  }


  ImageButton = object => {
    let nameArr = object.name.split(" ")
    let firstKey = nameArr[0]
    let secondKey = nameArr[1]
    return (
      <TouchableOpacity onPress={object.onPress} style={object.style}>
        <View style={[styles.mainViewStyle]}>
          <Image
            source={this.getImageFromKey(object.imageKey)}
            resizeMode={"contain"}
            style={[object.imageStyle, { tintColor: `${object.selectedColor}` }]}
          />
          <Text style={[styles.imageButtonStyle, { color: `${object.selectedColor}` }]}>
            {firstKey}{"\n"}{secondKey}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderSideView() {

    let leftControlConfig = [
      {
        name: this.metaConstants.airQuality, imageKey: "airQuality", onPress: () => { this.setState({ selectedItemIndex: 0 }); }, imageStyle: {
          width: 30, height: 25
        }
      },
      {
        name: this.metaConstants.healthTips, imageKey: "healthTips", onPress: () => { this.props.navigation.navigate("HealthTipsScreen"); }, imageStyle: {
          width: 30, height: 25
        }
      },
    ];

    return (
      <View
        style={styles.thirdView}
      >
        <View style={styles.HeaderView}>
          <TouchableOpacity style={styles.backButton} onPress={() => {
            this.props.navigation.navigate("BrezometerWelcomeScreen");
          }}>
            <Image style={styles.backButtonImg} source={BACK} width={25} height={16} />
          </TouchableOpacity>
        </View>
        <View style={styles.backGroundProductImgView}>
          {leftControlConfig.map((eC, index) => {
            eC.style = this.state.selectedItemIndex === index ?
              styles.leftIndexStyle
              : styles.rightIndexStyle
            eC.selectedColor = this.state.selectedItemIndex === index ? Colors.red : Colors.white
            return this.ImageButton(eC);
          })}
          <Image source={BACKGROUND_PRODUCT} style={styles.backgroundImgStyle} />
        </View>

      </View>
    )
  }
  // triggerEvent() {
  //   this.props.dispatchEvent(events.searchBarClickFromAirComposition)
  // }
  render() {
    const element = (data, index) => {
      return <View style={[{ backgroundColor: data }, styles.circle]} />;
    };
    const { airQualityReport } = this.props;
    let airQualityData = airQualityReport;

    return (

      <View style={styles.FirstView}>
        {this.renderSideView()}

        <View style={styles.modalView}>
          <View>
          </View>
          <LocationAccessModal
            visible={this.state.permissionModal}
            close={() => {
              this.setState({ permissionModal: false });
              this.props.navigation.navigate("PulseHealth");
            }}
            requestPermission={this._requestPermission}
            title={this.metaConstants.requiredLocation}
            body={this.metaConstants.requiredDesc}
          />
          <SearchComponent
            onChange={this.onChange}
            value={this.state.query}
            onAddressSelected={this.onAddressSelected}
          // dispatchEvent={this.triggerEvent}
          />

          <View style={styles.rightView}>
            <View style={styles.rightHalfVieW}>
              {this.renderLowerHeader()}
              <View style={styles.airReportView2} >
                {this.renderContent()}
              </View>
              <View style={styles.airReportView} >
                {this.renderAddressDetails()}
              </View>
            </View>

            <View style={styles.lefttHalfVieW}>
              {this.renderOtherAirCompositions()}
            </View>
          </View>

          <FailureModal
            visible={this.props.unknownLocationFailure}
            closeModal={() => {
              this.props.resetAqhi();
            }}
          />
        </View >
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  airQualityReport: state.airQualityData.airQualityReport,
  unknownLocationFailure: state.airQualityData.unknownLocationFailure,
});

export default connect(mapStateToProps, {
  checkAvailability,
  resetAqhi,
  getStationName,
  getStationNameByCity,
  dispatchEvent,
})(AirComposition);
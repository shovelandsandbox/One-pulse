import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  BackHandler,
} from "react-native";
import { TabNavigator, createBottomTabNavigator, createStackNavigator } from "react-navigation";
const { NavigatorDetailFlex } = CoreComponents;
import HospitalInfo from "./Info";
import ClinicInfo from "../ClinicDetail/Info";
import {
  CoreConfig,
  metaHelpers,
  CoreActions,
  CoreComponents,
} from "@pru-rt-internal/pulse-common";
import { Popup } from "react-native-map-link";
const {
  colors,
  SCREEN_KEY_HOSPITAL_DETAIL_SCREEN_TABS,
  SCREEN_KEY_NAVIGATOR_FLEX,
  KEY_MODAL_HEADER,
  KEY_MODAL_SUB_HEADER,
  KEY_MODAL_CANCEL_BUTTON,
  FINDHOSPITAL,
  FINDHOSPITAL_NAVIGATE,
} = CoreConfig;
const helpers = metaHelpers;
import Doctors from "./Doctors";
import Rooms from "./Rooms";
import Specialization from "./Specialization";
import { BACK_WHITE, INFO_ADDRESS_NAVIGATOR } from "../../config/images";
import styles from "./styles";
import SettingsTabs from "./PageNavigate";
const {
  fetchHospitalDetails,
  setHospitalDetails,
  getClinicDetails,
} = CoreActions;
// HD ~> Hospital Detail
export const HD_RENDER_HOSPITAL = "HD_RENDER_HOSPITAL";
export const HD_RENDER_CLINIC = "HD_RENDER_CLINIC";

// Padding for detail header + Height of bottom bar navigator
const paddingOnNavigatorHeaderFlex =
  Platform.OS === "ios" ? 25 + 40 + 53 : 40 + 53;

const KEY_INFO_TAB = "hospitaldetailscreendetailsinfotab";
const KEY_SPECIALITY_TAB = "hospitaldetailscreendetailsspecidalitytab";
const KEY_DOCTORS_TAB = "hospitaldetailscreendetailsdoctorstab";
const KEY_ROOMS_TAB = "hospitaldetailscreendetailsroomstab";
const geolib = require("geolib");
const HEADER_DESIGNED_HEIGHT = 150;
const MAP_ANNOTATION_DESIGNED_HEIGHT_DENGUE = 150;
const sh = Dimensions.get("window").height;
const sw = Dimensions.get("window").width;
const default_fontFamily = "Avenir";

const hospitalTab = createBottomTabNavigator(
  {
    InfoTab: {
      screen: HospitalInfo,
      navigationOptions: () => ({
        tabBarLabel: helpers.findElement(
          SCREEN_KEY_HOSPITAL_DETAIL_SCREEN_TABS,
          KEY_INFO_TAB
        ).label,
      }),
    },
    SpecialityTab: {
      screen: () => <Specialization />,
      navigationOptions: () => ({
        tabBarLabel: helpers.findElement(
          SCREEN_KEY_HOSPITAL_DETAIL_SCREEN_TABS,
          KEY_SPECIALITY_TAB
        ).label,
      }),
    },
    DoctorsTab: {
      screen: () => <Doctors />,
      navigationOptions: () => ({
        tabBarLabel: helpers.findElement(
          SCREEN_KEY_HOSPITAL_DETAIL_SCREEN_TABS,
          KEY_DOCTORS_TAB
        ).label,
      }),
    },
    RoomsTab: {
      screen: () => <Rooms />,
      navigationOptions: () => ({
        tabBarLabel: helpers.findElement(
          SCREEN_KEY_HOSPITAL_DETAIL_SCREEN_TABS,
          KEY_ROOMS_TAB
        ).label,
      }),
    },
  },
  {
    ...TabNavigator.Presets.AndroidTopTabs,
    tabBarOptions: {
      indicatorStyle: {
        opacity: 1,
        backgroundColor: "#ED1A2D",
        height: 2,
        padding: 0,
      },
      activeTintColor: "#ED1A2D",
      showIcon: false,
      showLabel: true,
      upperCaseLabel: false,
      inactiveTintColor: "#4A555B", // Color of tab when not pressed
      labelStyle: {
        fontSize: 16,
        // lineHeight: 16.3,
        marginTop: 0,
        marginBottom: 2,
        marginLeft: 0,
        marginRight: 0,
        fontFamily: "Avenir",
      },
      style: {
        marginTop: 0,
        paddingTop: 0,
        backgroundColor: colors.white, // Makes Android tab bar white instead of standard blue
      },
    },
    tabBarPosition: "top",
    lazy: true,
    swipeEnabled: false,
  }
);

const clinicTab = () =>
  createBottomTabNavigator(
    {
      InfoTab: {
        screen: ClinicInfo,
        navigationOptions: () => ({
          tabBarLabel: helpers.findElement(
            SCREEN_KEY_HOSPITAL_DETAIL_SCREEN_TABS,
            KEY_INFO_TAB
          ).label,
        }),
      },
    },
    {
      ...TabNavigator.Presets.AndroidTopTabs,
      tabBarOptions: {
        indicatorStyle: {
          opacity: 1,
          backgroundColor: "#ED1A2D",
          height: 2,
          padding: 0,
        },
        activeTintColor: "#ED1A2D",
        showIcon: false,
        showLabel: true,
        upperCaseLabel: false,
        inactiveTintColor: "#4A555B", // Color of tab when not pressed
        labelStyle: {
          fontSize: 16,
          // lineHeight: 16.3,
          marginTop: 0,
          marginBottom: 2,
          marginLeft: 0,
          marginRight: 0,
          fontFamily: "Avenir",
        },
        style: {
          marginTop: 0,
          paddingTop: 0,
          backgroundColor: colors.white, // Makes Android tab bar white instead of standard blue
        },
      },
      tabBarPosition: "top",
      lazy: true,
      swipeEnabled: false,
    }
  );

class HospitalDetail extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { detailId } = nextProps;
    if (nextProps.detailId !== prevState.detailId) {
      if (nextProps.detailId) {
        // TODO : Fetch new details from props
        const { fetchHospitalDetails, sessionId } = nextProps;
        fetchHospitalDetails(detailId, sessionId, nextProps.mountIntoView);
      } else {
        const { setHospitalDetailsAction } = nextProps;
        setHospitalDetailsAction({
          id: "",
          name: "",
          timing: "",
          specialities: [],
          contactDetails: {},
          address: {},
        });
        // nextProps.unmountFromView();
      }
      return {
        detailId: nextProps.detailId,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const { navigation } = props;
    const selectedItem = navigation.getParam("item", null);
    const currentLocation = navigation.getParam("currentLocation", null);
    const renderType = navigation.getParam("renderType", HD_RENDER_HOSPITAL);

    this.state = {
      detailId: selectedItem.id,
      selectedItem: selectedItem,
      currentLocation: currentLocation,
      renderType: renderType,
      nagivatePopUpVisible: false,
    };

    // this.HospitalTab = createStackNavigator({hospitalTab});
    this.clinicTab = clinicTab();
  }

  componentDidMount() {
    const {
      navigation,
      fetchHospitalDetails,
      sessionId,
      fetchClinicDetails,
    } = this.props;
    const { renderType } = this.state;
    // const { detailId } = this.state
    const selectedItem = navigation.getParam("item", null);
    // this.setState({
    //   selectedItem: selectedItem
    // })
    if (selectedItem.id) {
      if (renderType == HD_RENDER_HOSPITAL) {
        fetchHospitalDetails(selectedItem.id, sessionId, () => { });
      }
      if (renderType == HD_RENDER_CLINIC) {
        fetchClinicDetails(selectedItem.id, sessionId, () => { });
      }
    }
    BackHandler.addEventListener("hardwareBackPress", this.goBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.goBack);
  }
  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  // eslint-disable-next-line complexity
  render() {
    const { selectedItem, currentLocation, renderType } = this.state;
    const { navigation, meta } = this.props;

    const fullName = selectedItem.name;
    const address = selectedItem.address;
    const addLine1 = address.line1 ? address.line1 : "";
    const addLine2 = address.line2 ? address.line2 : "";
    const addLine3 = address.line3 ? address.line3 : "";
    const addString = [addLine1, addLine2, addLine3].join(" ");
    const fullAddress = addString;

    let possibleDistance = 0;

    if (address && currentLocation) {
      const selectedLongitude = address.longitude;
      const selectedLatitude = address.latitude;

      const userLongitude = currentLocation.longitude;
      const userLatitude = currentLocation.latitude;

      possibleDistance = geolib.getDistance(
        { longitude: userLongitude, latitude: userLatitude },
        { longitude: selectedLongitude, latitude: selectedLatitude },
        0
      );

      if (isNaN(possibleDistance)) {
        possibleDistance = geolib.getPreciseDistance(
          { longitude: userLongitude, latitude: userLatitude },
          { longitude: selectedLongitude, latitude: selectedLatitude },
          1
        );
      }
    }
    possibleDistance = isNaN(possibleDistance) ? 0 : possibleDistance;
    const distance = geolib.convertDistance(possibleDistance, "km");
    // const distanceStr = `${distance.toFixed(2)} km\n(Approx)`
    // const distanceStr = `Navigate`
    const distanceStr = metaHelpers.findElement(
      FINDHOSPITAL,
      FINDHOSPITAL_NAVIGATE
    ).label;

    return (
      <View style={styles.container}>
        {/* Header */}
        <View
          style={{
            height: 44,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              marginTop: 12,
              width: 64,
              justifyContent: "center",
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              style={{
                width: 16,
                height: 14,
                tintColor: "#515b61",
                marginLeft: 20,
                resizeMode: "stretch",
              }}
              source={BACK_WHITE}
            />
          </TouchableOpacity>
        </View>
        {/* Top Elements */}
        <View
          style={{
            // backgroundColor: '#8aca',
            height: HEADER_DESIGNED_HEIGHT,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            {/* Title & Descriptions */}
            <View
              style={{
                flex: 1,
                paddingTop: 20,
                paddingLeft: 20,
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  color: "#515B61",
                  fontFamily: default_fontFamily,
                  fontSize: 17,
                  fontWeight: "900",
                  // backgroundColor: '#4ac3',
                }}
                numberOfLines={2}
                ellipsizeMode={"tail"}
              >
                {fullName}
              </Text>
              <Text
                style={{
                  color: "#68737A",
                  marginTop: 4,
                  fontFamily: default_fontFamily,
                  fontSize: 14,
                  // height: 45,
                  flexShrink: 0,
                  // backgroundColor: '#a433',
                }}
                numberOfLines={3}
                ellipsizeMode={"tail"}
              >
                {fullAddress}
              </Text>
            </View>
            {/* Navigate Button */}
            <View
              style={{
                width: 100,
                justifyContent: "center",
                alignSelf: "center",
                // backgroundColor: '#a43a'
              }}
            >
              <View
                style={{
                  // flex: 2,
                  // backgroundColor: '#ac3',
                  justifyContent: "center",
                  // alignSelf: 'center'
                  marginBottom: 12,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 42,
                    height: 42,
                    backgroundColor: "#fAf0f2",
                    // marginLeft: 25,
                    borderRadius: 24,
                    // marginRight: 10,
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    this.setState({
                      nagivatePopUpVisible: true,
                    });
                  }}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: "contain",
                      alignSelf: "center",
                      tintColor: "#ED1A2D",
                    }}
                    source={INFO_ADDRESS_NAVIGATOR}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  // flex: 1,
                  color: "#ED1A2D",
                  fontFamily: default_fontFamily,
                  fontSize: 14,
                  textAlign: "center",
                  fontWeight: "400",
                }}
              >
                {distanceStr}
              </Text>
            </View>
          </View>
        </View>
        {/* Contents Tab */}
        {renderType == HD_RENDER_HOSPITAL && <SettingsTabs />}
        {/* {renderType == HD_RENDER_CLINIC && <this.clinicTab />} */}
        {renderType == HD_RENDER_CLINIC && <ClinicInfo showDivider={true} />}
        {/* Navigating Popups */}
        <Popup
          isVisible={this.state.nagivatePopUpVisible}
          onCancelPressed={() => this.setState({ nagivatePopUpVisible: false })}
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
            sourceLongitude: currentLocation.longitude,
            sourceLatitude: currentLocation.latitude,
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
      </View>
    );
  }
}

HospitalDetail.propTypes = {
  meta: PropTypes.objectOf(PropTypes.any).isRequired,
  detailId: PropTypes.string,
  expanded: PropTypes.bool.isRequired,
  sessionId: PropTypes.string.isRequired,
  hospitalName: PropTypes.string.isRequired,
  address: PropTypes.objectOf(PropTypes.any).isRequired,
  currentLocation: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
  fetchHospitalDetails: PropTypes.func.isRequired,
  fetchClinicDetails: PropTypes.func.isRequired,
  setHospitalDetailsAction: PropTypes.func.isRequired,
  setParentHeight: PropTypes.func.isRequired,
  slideDown: PropTypes.func.isRequired,
  mountIntoView: PropTypes.func.isRequired,
  unmountFromView: PropTypes.func.isRequired,
};

HospitalDetail.defaultProps = {
  detailId: undefined,
};

const mapStateToProps = state => {
  return {
    meta: state.meta,
    sessionId: state.auth.token,
    loading: state.hospitalDetail.details.loading,
    hospitalName: state.hospitalDetail.details.name,
    address: state.hospitalDetail.details.address,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchHospitalDetails: fetchHospitalDetails,
    fetchClinicDetails: getClinicDetails,
    setHospitalDetailsAction: setHospitalDetails,
  }
)(HospitalDetail);

/* eslint-disable complexity */
import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  Alert,
  Platform,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import actions from "../../configs/actionNames";
import screens from "../../configs/screenNames";
import { styles } from "./styles";
import { CustomAlert } from "../../../../components";
import { GoogleFitService } from "../../components/googleFitService";
import { ConnectSwitch } from "../../components/connectSwitch";
import ConnectionWebView from "./ConnectionWebView";
import Modal from "react-native-modal";
import { pathOr } from "ramda";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import metaKeys from "../../screenMetaKeys";
import { AppleHealthCareService } from "../../components/appleHealthService/AppleHealthCareService";
import { CoreServices } from "@pru-rt-internal/pulse-common";
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";
const { NavigationService } = CoreServices;

const fitnessService = AppleHealthCareService;
import {
  FITNESS_BACKGROUND_IMAGE,
  fitbitActive,
  fitbitInactive,
  applehealthActive,
  applehealthInactive,
  garminActive,
  garminInactive,
  googleFitActive,
  googleFitInactive,
  disconnectAlert,
} from "../../../../config/images";
import Header from "../../../../components/Header";

class WearablesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      disconnectId: "",
      showDisconnectModal: false,
      itemId: "",
    };
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
    this.props.getAllWearables();
  }

  connectGoogleFit = async id => {
    const granted = await GoogleFitService.permissionAccess();
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      GoogleFitService.authorizeFitnessTracking(err => {
        if (!err) {
          GoogleFitService.fetchLatestFitnessData().then(res => {
            this.props.updateAppSideWearableStatus({ id });
          });
        }
      });
    }
  };

  initialiseAppleHealth = id => {
    const fromChallenges = pathOr(
      false,
      ["navigation", "state", "params", "fromChallenges"],
      this.props
    );
    fitnessService.authorizeFitnessTracking(err => {
      if (!err) {
        fitnessService.fetchLatestFitnessData().then(res => {
          this.props.updateAppSideWearableStatus({ id, fromChallenges });
        });
      }
    });
  };

  loadModal = (id, status) => {
    if (status === "ACTIVE") {
      //if user has any challenges then ask for confirmation
      if (this.props.myChallenges.length) {
        this.setState({ showDisconnectModal: true, disconnectId: id });
      } else {
        this.props.disConnectWearables(id);
      }
    } else if (id == "applehealth") {
      this.initialiseAppleHealth(id);
    } else if (id == "googlefit") {
      this.connectGoogleFit(id);
    } else {
      this.setState({ isVisible: true, itemId: id });
    }
  };

  closeModal = closeWithoutAlert => {
    if (closeWithoutAlert) {
      this.setState({ isVisible: false });
    } else {
      Alert.alert(
        "Authentication in progress",
        "Do you still want to exit?",
        [
          {
            text: "No",
            onPress: () => { },
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              this.setState({ isVisible: false });
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  renderItem = ({ item }) => {
    let iconName = "";
    switch (item.type) {
      case "applehealth":
        iconName =
          item.status === "INACTIVE" ? applehealthInactive : applehealthActive;
        break;
      case "fitbit":
        iconName = item.status === "INACTIVE" ? fitbitInactive : fitbitActive;
        break;
      case "garmin":
        iconName = item.status === "INACTIVE" ? garminInactive : garminActive;
        break;
      case "googlefit":
        iconName =
          item.status === "INACTIVE" ? googleFitInactive : googleFitActive;
        break;
      default:
        break;
    }

    return (
      <View
        style={[
          styles.newListItem,
          item.status !== "INACTIVE" ? styles.newListItemConnected : null,
        ]}
      >
        <Image
          source={iconName}
          style={styles.imageStyle}
          resizeMode="contain"
        />
        <Text
          style={{
            fontFamily: "Avenir-Roman",
            color: "#444444",
            marginBottom: 10,
          }}
        >
          {item.name}
        </Text>
        <ConnectSwitch
          switchOn={item.status === "INACTIVE"}
          onPress={() => this.loadModal(item.type, item.status)}
          status={item.status === "INACTIVE" ? "Connect" : "Disconnect"}
        />
        {item.type === "applehealth" && (
          <Text style={styles.disclaimerStyle}>
            {safeMetaLabelFinder(
              metaKeys.screenName,
              metaKeys.wearables.supportAppleHealth
            )}
          </Text>
        )}
      </View>
    );
  };

  renderModal() {
    const fromChallenges = pathOr(
      false,
      ["navigation", "state", "params", "fromChallenges"],
      this.props
    );
    return (
      <Modal
        isVisible={this.state.isVisible}
        style={{ margin: 0 }}
        onBackButtonPress={() => this.closeModal()}
      >
        <ConnectionWebView
          itemId={this.state.itemId}
          closeModal={this.closeModal}
          navigation={this.props.navigation}
          fromChallenges={fromChallenges}
        />
      </Modal>
    );
  }

  renderDisconnectModal = () => {
    return (
      <Modal
        isVisible={this.state.showDisconnectModal}
        style={styles.disconnectModal}
        onBackButtonPress={() => this.setState({ showDisconnectModal: false })}
      >
        <View style={styles.disconnectContainer}>
          <Image
            source={disconnectAlert}
            style={styles.disconnectAlert}
            resizeMode="contain"
          />
          <Text style={styles.disconnectMsg}>
            {safeMetaLabelFinder(
              metaKeys.screenName,
              metaKeys.wearables.disconnectConfirmation
            )}
          </Text>
          <Text style={styles.disconnectDesc}>
            {safeMetaLabelFinder(metaKeys.screenName, "disconnectDesc")}
          </Text>
          <View style={styles.disconnectSeparator} />
          <View style={styles.disconnectBtnContainer}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => {
                this.setState({ showDisconnectModal: false });
              }}
            >
              <Text style={styles.cancelText}>
                {safeMetaLabelFinder(metaKeys.screenName, "cancel")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.disconnectBtn}
              onPress={() => {
                this.setState({ showDisconnectModal: false });
                this.props.disConnectWearables(this.state.disconnectId);
              }}
            >
              <LinearGradient
                colors={["#ec1c2e", "#a21421"]}
                style={styles.disconnectBtnGradient}
              >
                <Text style={styles.disconnectText}>
                  {safeMetaLabelFinder(metaKeys.screenName, "disConnect")}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  handleBackPress = () => {
    const fromChallenges = pathOr(
      false,
      ["navigation", "state", "params", "fromChallenges"],
      this.props
    );
    if (fromChallenges) {
      NavigationService.goBack();
    } else {
      NavigationService.navigate("MainTab");
    }
  };

  render() {
    const { wearableList } = this.props;
    const finalWearableList =
      Platform.OS === "android"
        ? wearableList.filter(item => item.type !== "applehealth")
        : wearableList;

    return (
      <ScrollView style={styles.pageContainer}>
        <Header
          style={{ paddingLeft: 0 }}
          leftIconType={"back"}
          onClick={() => this.handleBackPress()}
          title={safeMetaLabelFinder(
            metaKeys.screenName,
            metaKeys.wearables.fitnessheader
          )}
        />
        <ImageBackground
          source={FITNESS_BACKGROUND_IMAGE}
          style={styles.imageBackgroundStyle}
        >
          <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}>
            <Text style={{
              ...styles.newImageBackgroundText,
              ...configureLineHeight("22")
            }}>
              {safeMetaLabelFinder(
                metaKeys.screenName,
                metaKeys.wearables.connectYourFitness
              )}
            </Text>
            <Text style={{
              ...styles.newImagebackgroundTextSmall,
              ...configureLineHeight("14")
            }}>
              {safeMetaLabelFinder(
                metaKeys.screenName,
                metaKeys.wearables.trackSteps
              )}
            </Text>
          </View>
        </ImageBackground>
        <FlatList
          contentContainerStyle={styles.listContainerStyle}
          data={finalWearableList}
          renderItem={this.renderItem}
          numColumns={2}
          extraData={this.props}
        />
        {this.state.isVisible && this.renderModal()}
        {this.state.showDisconnectModal && this.renderDisconnectModal()}
      </ScrollView>
    );
  }
}

WearablesList.propTypes = {
  getAllWearables: PropTypes.func,
  wearableList: PropTypes.object,
  disConnectWearables: PropTypes.func,
  updateAppSideWearableStatus: PropTypes.func,
  myChallenges: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    wearableList: pathOr([], ["FitnessTrackersReducer", "wearableList"], state),
    country: pathOr("", ["auth", "countryInfo", "country"], state),
    myChallenges: pathOr([], ["challenges", "myChallenges"], state),
  };
};

export default connect(mapStateToProps, {
  getAllWearables: () => ({
    context: screens.WEARABLE_LIST,
    type: actions.getAllSupportedWearables,
    disableTimeout: true,
  }),
  disConnectWearables: payload => ({
    context: screens.WEARABLE_LIST,
    type: actions.disconnectWearables,
    payload,
  }),
  updateAppSideWearableStatus: payload => ({
    context: screens.WEARABLE_LIST,
    type: actions.initiateWearableConnection,
    payload,
  }),
})(WearablesList);

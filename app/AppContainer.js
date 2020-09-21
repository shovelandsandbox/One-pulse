import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  AppState,
  View,
  StatusBar,
  StyleSheet,
  Platform,
  Dimensions,
  NativeModules,
  NetInfo,
  Alert,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";

import { PersistGate } from "redux-persist/integration/react";
import { Provider, connect } from "react-redux";
import moment from "moment";
import customerConnectActions from "./features/customerConnect/redux/actionNames";
import { isNil, isEmpty, path, toUpper, pathOr } from "ramda";
import * as fitnessUtils from "./features/fitnessTrackers/utils";
import screens from "./features/fitnessTrackers/configs/screenNames";
import actions from "./features/fitnessTrackers/configs/actionNames";
import AppRatingScreen from "./features/appRating/screens/AppRatingScreen";
import Orientation from "react-native-orientation";
import AppConfig from "./config/AppConfig";
import Modal from "react-native-modal";
import { GoogleFitService } from "./features/fitnessTrackers/components/googleFitService";

import { safeMetaLabelFinder } from "./utils/meta-utils";

const metaFinderConnectedApp = key => {
  return safeMetaLabelFinder("ConnectedAppScreen", key);
};

import {
  CoreServices,
  CoreUtils,
  CoreActions,
  CoreComponents,
  CoreConfig,
  CoreActionTypes,
} from "@pru-rt-internal/pulse-common";

const { WithDrawer, SplashScreen, Loader } = CoreComponents;
import DeviceInfo from "react-native-device-info";
import { GROUP_IMAGE, VIDEO_LOGO, CALL_LOGO } from "./config/images";
import { CustomAlert } from "./components";
import { WPDarkModal } from "./features/wellnessPlans/components";
import { makeMessageReceivedHandler } from "./utils/notification-utils";
import { AppNotification } from "./features/appNotification";
import videoSalesActions from "./features/videoSales/configs/actionNames";
import communityActions from "./features/communityEvents/config/actions";
import NotificationModal from "./features/appNotification/components/notificationModal";
// import { links } from "react-native-firebase";

const {
  updateApplicationHeight,
  updateFCMToken,
  setDeviceInfo,
  fetchCommonMeta,
} = CoreActions;
const { colors } = CoreConfig;
const {
  NavigationService,
  initializeFirebaseMessaging,
  removeAllListeners,
} = CoreServices;
const { metaHelpers } = CoreUtils;

const { RNPruCommonBridge, RNDeviceInfoBridge, RingToneModule } = NativeModules;

const AppStatusBar = () => (
  <View style={styles.statusBar}>
    <StatusBar
      translucent
      backgroundColor={colors.statusBarColor}
      barStyle="light-content"
    />
  </View>
);

const getDeviceId = (isEmulator, advId) => {
  if (
    isEmulator &&
    (AppConfig.getBuildEnv() === "uat" || AppConfig.getBuildEnv() === "dev")
  ) {
    return "device3";
  }
  return Platform.OS === "ios" ? advId : DeviceInfo.getUniqueId();
};

const loadDeviceInfo = advId => {
  const userAgent = {
    os: DeviceInfo.getSystemName(),
    osVer: DeviceInfo.getSystemVersion(),
    advId: advId,
    model: DeviceInfo.getModel(),
    appName: DeviceInfo.getApplicationName(),
    appVersion: DeviceInfo.getVersion(),
    brand: DeviceInfo.getBrand(),
    // region: countryInfo.simCountry,
    apiVersion: "",
    appBundle: DeviceInfo.getBundleId(),
  };

  const promises = [
    DeviceInfo.getDevice(),
    DeviceInfo.isEmulator(),
    DeviceInfo.supportedAbis(),
  ];

  return Promise.all(promises)
    .then(values => {
      return {
        ...userAgent,
        deviceModel: values[0],
        isEmulator: values[1],
        abis: values[2],
        // deviceId: getDeviceId(values[1], advId),
        deviceId: "device3",
      };
    })
    .catch(e => {
      console.log("ERROR!!!", e);
    });
};

const simCountryLoaded = (store, countryInfo) => {
  store.dispatch({
    type: CoreActionTypes.SET_COUNTRY_INFO,
    payload: {
      countryInfo: {
        ...countryInfo,
        simCountry: toUpper(countryInfo.simCountry),
        isPulseAvailable: true,
      },
    },
  });
  fetchCommonMeta()(store.dispatch); //fetch common meta
};

const loadCountryFromPlatform = props => {
  const { appConfig } = props;
  return fetch(appConfig.PRU_API_HTTP_URL + "/country", {
    method: "GET",
    headers: {
      apiKey: appConfig.PRU_API_KEY,
    },
  })
    .then(r => r.json())
    .catch(error => {
      console.log(error);
    });
};

const onBeforeLift = (store, props) => () => {
  // return RNDeviceInfoBridge.execute("getAdvertiserID", null).then(result => {
  //   const { advId } = result;
  //   return loadDeviceInfo(advId).then(userAgent => {
  //     store.dispatch(setDeviceInfo(userAgent));
  //     return RNPruCommonBridge.execute("getCountryInformation").then(
  //       countryInfo => {
  //         if (
  //           isNil(countryInfo.simCountry) ||
  //           isEmpty(countryInfo.simCountry)
  //         ) {
  //           // eslint-disable-next-line max-nested-callbacks
  //           return loadCountryFromPlatform(props).then(r => {
  //             console.log("Received country from api", r);
  //             if (r && r.countryCode) {
  //               countryInfo.simCountry = r.countryCode;
  //               simCountryLoaded(store, countryInfo);
  //             } else {
  //               store.dispatch({
  //                 type: CoreActionTypes.SET_COUNTRY_INFO,
  //                 payload: {
  //                   countryInfo: {
  //                     isPulseAvailable: false,
  //                   },
  //                 },
  //               });
  //             }
  //           });
  //         }
  //         simCountryLoaded(store, countryInfo);
  //       }
  //     );
  //   });
  // });
  countryInfo = {}
  countryInfo["simCountry"] = "TH"
  simCountryLoaded(store, countryInfo);
};

class AppContainer extends PureComponent {
  constructor(props) {
    super(props);
    const { reduxStore } = props;
    metaHelpers.setStore(reduxStore);
  }

  componentDidMount() {
    Orientation.lockToPortrait();
    metaHelpers.restoreOfflineImageCache();
    if (Platform.OS != "ios") {
      GoogleFitService.permissionAccess();
    }
  }

  componentWillUnmount() {
    //AppState.removeEventListener("change", this._handleAppStateChange);
  }

  render() {
    const { reduxStore, reduxPersistor, splashImage } = this.props;

    return (
      <Provider store={reduxStore}>
        <PersistGate
          loading={<SplashScreen splashImage={splashImage} />}
          persistor={reduxPersistor}
          onBeforeLift={onBeforeLift(reduxStore, this.props)}
        >
          <CustomAlert />
          {/*This line of code is added to load the modal component */}
          <ConnectedApp
            drawerView={this.props.drawerView}
            store={reduxStore}
            splashImage={splashImage}
          >
            {this.props.children}
          </ConnectedApp>
        </PersistGate>
      </Provider>
    );
  }
}

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    };
  }

  // eslint-disable-next-line complexity
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.appNavigation === this.props.appNavigation) {
      return;
    }
    const { currentPage, params } = nextProps.appNavigation;

    if (!currentPage) {
      if (params && params.gotoPreviousStack) {
        NavigationService.goBackToPreviousStack();
      } else {
        NavigationService.goBack();
      }
    } else {
      if (params) {
        if (params.navAndResetStack) {
          NavigationService.navAndResetStack(currentPage, params);
          return;
        } else if (params.resetStack) {
          NavigationService.resetStack(currentPage, params);
          return;
        }
      }
      NavigationService.navigate(currentPage, params);
    }
  }

  componentDidMount() {
    this.isInternetConnected();
    Orientation.lockToPortrait();
    AppState.addEventListener("change", this._handleAppStateChange);
    //firebase
    const { store } = this.props;

    initializeFirebaseMessaging({
      updateFCMToken(token) {
        store.dispatch(updateFCMToken(token));
      },
      messageReceived: makeMessageReceivedHandler(store),
    });
    this.recieveAndHandleDynamicLink();
    this.handleLinkClickInAliveState();
  }

  loadRatingModal = () => {
    return (
      <Modal
        transparent={true}
        isVisible={this.props.showAppRatingModal}
        animationType="slide"
      >
        <AppRatingScreen />
      </Modal>
    );
  };

  recieveAndHandleDynamicLink() {
    // links()
    //   .getInitialLink()
    //   .then(url => {
    //     if (url) {
    //       this.handleUrl(url);
    //     }
    //   });
  }

  handleLinkClickInAliveState() {
    // links().onLink(url => {
    //   this.handleUrl(url);
    // });
  }

  isInternetConnected() {
    NetInfo.isConnected.fetch().done(isConnected => {
      console.log("First, is " + (isConnected ? "online" : "offline"));
      if (!isConnected) {
        CustomAlert.show(
          "No Internet",
          "Oops!!! Seems you are not connected to internet.",
          {
            positiveText: "OK",
            onPositivePress: () => { },
          }
        );
      }
    });
    function handleFirstConnectivityChange(isConnected) {
      console.log("Then, is " + (isConnected ? "online" : "offline"));
      NetInfo.isConnected.removeEventListener(
        "change",
        handleFirstConnectivityChange
      );
    }
    NetInfo.isConnected.addEventListener(
      "change",
      handleFirstConnectivityChange
    );
  }

  handleDeepLinkUrl = event => {
    this.handleUrl(event.url);
  };

  handleUrl = url => {
    const { token, updateDeeplinkUrl } = this.props;
    const payload = { deepLinkUrl: url };
    updateDeeplinkUrl(payload);
  };

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
    Linking.removeEventListener("url", this.handleDeepLinkUrl);
    removeAllListeners();
  }

  checkAndStartHealthTracking = () => {
    const {
      connectedWearables,
      countryCommonMeta,
      addCustomerActivities,
    } = this.props;
    fitnessUtils.checkAndStartHealthTracking(
      connectedWearables,
      countryCommonMeta,
      metricsByDate => {
        addCustomerActivities(metricsByDate);
      }
    );
  };

  _handleAppStateChange = nextAppState => {
    const {
      token,
      recordAppBackgroundEvent,
      recordAppForegroundEvent,
      recordAppOpenEvent,
    } = this.props;
    const { appState } = this.state;
    fitnessUtils.stopHealthTracking();
    if (appState.match(/inactive|background/) && nextAppState === "active") {
      if (token) {
        recordAppBackgroundEvent(moment().format("YYYY-MM-DDThh:mm:ss"));
        this.checkAndStartHealthTracking();
      }
    } else if (nextAppState === "background") {
      if (token) {
        recordAppForegroundEvent(moment().format("YYYY-MM-DDThh:mm:ss"));
        recordAppOpenEvent(moment().format("YYYY-MM-DDThh:mm:ss"));
      }
    }
    this.setState({ appState: nextAppState });
  };

  pulseNotAvailableModal = () => {
    return (
      <Modal
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={this.closeModal}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: "ffffff",
            }}
          >
            <Image
              style={{
                width: "35%",
                height: 100,
                resizeMode: "stretch",
                alignSelf: "center",
              }}
              source={GROUP_IMAGE}
            />
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              We are sorry
            </Text>
            <Text>
              Currently the Pulse application is not available in your region.
            </Text>
            <Text selectable={true}>
              Your Device Id: {path(["props", "userAgent", "deviceId"], this)}
            </Text>
          </View>
        </View>
      </Modal>
    );
  };

  chatNotificationModal = () => {
    const {
      chatDetails: { caller = "" },
    } = this.props;
    const callerType = metaFinderConnectedApp("agentKeyword");
    const swipeToDismiss = metaFinderConnectedApp("clickToDismiss");

    return (
      <Modal
        visible={this.props.isCustomerNotificationArrived}
        animationType="slide"
        hideModalContentWhileAnimating
        onRequestClose={false}
        backdropOpacity={0.5}
        style={{ margin: 0 }}
      >
        <View style={styles.modalContainer}>
          <View style={{ ...styles.subContainer, height: 140 }}>
            <View style={styles.spacer} />
            <View style={styles.detailContainer}>
              <View style={styles.callerContainer}>
                <Text style={styles.callerName}>{caller}</Text>
                <Text style={styles.pruLife}>
                  {metaFinderConnectedApp("lbuBrandingName")}
                </Text>
                <Text style={styles.callerType}>{callerType}</Text>
              </View>
              <TouchableOpacity
                style={{ flex: 1.5 }}
                onPress={() => {
                  this.props.store.dispatch({
                    type: customerConnectActions.closeNotification,
                  });
                }}
              >
                <Text style={styles.swiping}>{swipeToDismiss}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.receiverContainer}>
              <TouchableOpacity
                style={styles.navigateChat}
                onPress={e => {
                  this.props.store.dispatch({
                    type: customerConnectActions.closeNotification,
                  });
                  NavigationService.navigate("CUSTOMER_CONNECT_CHAT");
                }}
              >
                <Text style={{ color: "#ffffff" }}>
                  {metaFinderConnectedApp("goToChatButton")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  callNotificationModal = () => {
    const {
      incomingCallPayload: { caller },
    } = this.props;
    const callerType = metaFinderConnectedApp("agentKeyword");
    const swipeToDismiss = metaFinderConnectedApp("swipeToDismiss");
    const videoCallMessage = metaFinderConnectedApp("incommingCallText");

    return (
      <Modal
        visible={this.props.videoSalesIncomingCall}
        animationType="slide"
        hideModalContentWhileAnimating
        onRequestClose={false}
        backdropOpacity={0.5}
        style={{ margin: 0 }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.subContainer}>
            <View style={styles.spacer} />
            <View style={styles.detailContainer}>
              <Image
                style={styles.imageHeight}
                source={VIDEO_LOGO}
                resizeMode={"contain"}
              />
              <View style={styles.callerContainer}>
                <Text style={styles.callerName}>{caller || ""}</Text>
                <Text style={styles.pruLife}>
                  {metaFinderConnectedApp("lbuBrandingName")}
                </Text>
                <Text style={styles.callerType}>{callerType}</Text>
              </View>
              <View style={{ flex: 1.5 }}></View>
            </View>
            <Text style={styles.videoCallMessage}>{videoCallMessage}</Text>
            <View style={styles.receiverContainer}>
              <TouchableOpacity
                style={styles.decliner}
                onPress={e => {
                  this.props.disableVideoSaleCall();
                  RingToneModule.stopRingTone();
                }}
              >
                <Image
                  style={styles.declinerImage}
                  source={CALL_LOGO}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptor}
                onPress={e => {
                  this.props.acceptVideoSaleCall(
                    this.props.incomingCallPayload
                  );
                  this.props.disableVideoSaleCall();
                  RingToneModule.stopRingTone();
                }}
              >
                <Image
                  style={styles.acceptorImage}
                  source={CALL_LOGO}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  pulseTvNotificationModal = () => {
    const {
      webinarCall: { callerEmail },
      pulseTvIncomingCall,
    } = this.props;
    const callerType = "";
    const swipeToDismiss = "Swipe to dismiss";
    const videoCallMessage = "Incoming video call…";

    return (
      <Modal
        transparent={true}
        visible={pulseTvIncomingCall}
        animationType="slide"
        hideModalContentWhileAnimating
        onRequestClose={false}
      >
        <View style={styles.modalContainer}>
          <View style={styles.subContainer}>
            <View style={styles.spacer} />
            <View style={styles.detailContainer}>
              <Image
                style={styles.imageHeight}
                source={VIDEO_LOGO}
                resizeMode={"contain"}
              />
              <View style={styles.callerContainer}>
                <Text style={styles.callerName}>{callerEmail || ""}</Text>
                <Text style={styles.pruLife}>{""}</Text>
                <Text style={styles.callerType}>{callerType}</Text>
              </View>
              <View style={{ flex: 1.5 }}></View>
            </View>
            <Text style={styles.videoCallMessage}>{videoCallMessage}</Text>
            <View style={styles.receiverContainer}>
              <TouchableOpacity
                style={styles.decliner}
                onPress={e => {
                  this.props.disablePulseTvCall();
                  RingToneModule.stopRingTone();
                }}
              >
                <Image
                  style={styles.declinerImage}
                  source={CALL_LOGO}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptor}
                onPress={e => {
                  this.props.acceptPulseTvCall();
                  this.props.disablePulseTvCall();
                  RingToneModule.stopRingTone();
                }}
              >
                <Image
                  style={styles.acceptorImage}
                  source={CALL_LOGO}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  // eslint-disable-next-line complexity
  render() {
    if (this.props.isPulseAvailable === false) {
      return this.pulseNotAvailableModal();
    } else if (
      this.props.commonMeta &&
      this.props.meta &&
      this.props.countryCommonMeta
    ) {
      return (
        <View
          style={styles.container}
          onLayout={event => {
            const { updateApplicationHeightAction } = this.props;
            updateApplicationHeightAction(event.nativeEvent.layout.height);
          }}
        >
          {this.loadRatingModal()}
          <AppStatusBar />
          <WithDrawer drawerView={this.props.drawerView}>
            {this.props.children}
            <CustomAlert />
            <WPDarkModal />
            <NotificationModal />
            <AppNotification />
            {this.props.videoSalesIncomingCall && this.callNotificationModal()}
            {this.props.pulseTvIncomingCall && this.pulseTvNotificationModal()}
            {this.props.isCustomerNotificationArrived &&
              this.chatNotificationModal()}
          </WithDrawer>
          {this.props.isLoading && <Loader />}
          {/* This line of code is added to load the modal component */}
        </View>
      );
    }
    return <SplashScreen splashImage={this.props.splashImage} />;
  }
}

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  appNavigation: PropTypes.instanceOf(Object),
  updateApplicationHeightAction: PropTypes.func.isRequired,
  token: PropTypes.string,
  recordAppBackgroundEvent: PropTypes.func,
  recordAppForegroundEvent: PropTypes.func,
  recordAppOpenEvent: PropTypes.func,
  countryCommonMeta: PropTypes.object,
  addCustomerActivities: PropTypes.func,
  connectedWearables: PropTypes.object,
};

const ConnectedApp = connect(
  state => ({
    isLoading: state.trigger.isLoading,
    showAppRatingModal: state.ratingReducer.showModal,
    fcmToken: state.auth.fcmToken,
    appNavigation: state.appNavigation,
    fitnessTracker: state.fitnessTracker,
    token: state.auth.token,
    meta: state.meta.metaDetail,
    commonMeta: state.meta.commonMeta,
    countryCommonMeta: state.meta.countryCommonMeta,
    isPulseAvailable: state.auth.countryInfo.isPulseAvailable,
    userAgent: state.auth.userAgent,
    showNotification: state.notifications.showNotification,
    notificationContent: state.notifications.notificationContentLinkWithId,
    notificationids: state.notifications.notificationIds,
    activeNotificationId: state.notifications.activeNotificationId,
    videoSalesIncomingCall: state.customerConnect.videoSalesIncomingCall,
    incomingCallPayload: state.customerConnect.incomingCallPayload,
    isCustomerNotificationArrived:
      state.customerConnect.isCustomerNotificationArrived,
    chatDetails: state.customerConnect.chatDetails,
    connectedWearables: pathOr(
      [],
      ["FitnessTrackersReducer", "customerConnectedWearables"],
      state
    ),
    pulseTvIncomingCall: state.communityEvents.pulseTvIncomingCall,
    webinarCall: state.communityEvents.webinarCall,
  }),
  {
    updateApplicationHeightAction: updateApplicationHeight,

    recordAppBackgroundEvent: endTime => ({
      context: "AppContainer",
      type: "RECORD_APP_BACKGROUND_EVENT",
      payload: {
        endTime,
      },
    }),
    recordAppForegroundEvent: endTime => ({
      context: "AppContainer",
      type: "RECORD_APP_FOREGROUND_EVENT",
      payload: {
        endTime,
      },
    }),
    recordAppOpenEvent: endTime => ({
      context: "AppContainer",
      type: "RECORD_APP_OPEN_EVENT",
      payload: {
        endTime,
      },
    }),
    disableVideoSaleCall: () => ({
      type: customerConnectActions.disableIncomingCall,
    }),
    disablePulseTvCall: () => ({
      type: communityActions.disableIncomingCall,
    }),
    acceptVideoSaleCall: payload => ({
      context: "ACCEPT_VC_NAVIGATION_TOCHAT",
      type: customerConnectActions.inviteAccepted,
      payload,
    }),
    acceptPulseTvCall: () => ({
      context: "ACCEPT_PULSE_TV_VIDEO_CALL",
      type: communityActions.navigateToVideoCall,
    }),
    updateDeeplinkUrl: payload => ({
      type: "deeplink/updateUrl",
      payload,
    }),
    getAllConnectedCustomerWerables: () => ({
      context: screens.WEARABLES_STATISTICS,
      type: actions.getAllCustomerWearables,
      disableTimeout: true,
    }),
    addCustomerActivities: metricsByDate => ({
      context: screens.WEARABLES_STATISTICS,
      type: actions.addCustomerActivities,
      payload: metricsByDate,
      disableTimeout: true,
    }),
  }
)(App);

const isIphoneX = () => {
  const { height, width } = Dimensions.get("window");
  return Platform.OS === "ios" && (height >= 812 || width >= 812);
};

const STATUSBAR_HEIGHT =
  Platform.OS === "ios" ? (isIphoneX() ? 30 : 20) : StatusBar.currentHeight;

const styles = StyleSheet.create({
  acceptor: {
    alignItems: "center",
    aspectRatio: 1,
    backgroundColor: "#458d38",
    borderRadius: 63 / 2,
    justifyContent: "center",
    marginHorizontal: 35,
    width: 63,
  },
  acceptorImage: {
    height: 13,
    transform: [{ rotate: "230deg" }],
    width: 29,
  },
  callerContainer: {
    flex: 8.5,
    paddingHorizontal: 8,
  },
  callerName: {
    color: "#707070",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },
  callerType: {
    color: "#707070",
    fontSize: 10,
    lineHeight: 14,
  },
  container: {
    flex: 1,
  },
  decliner: {
    alignItems: "center",
    aspectRatio: 1,
    backgroundColor: "#ec1c2e",
    borderRadius: 63 / 2,
    justifyContent: "center",
    marginHorizontal: 35,
    width: 63,
  },
  declinerImage: {
    height: 13,
    width: 29,
  },
  detailContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  imageHeight: {
    height: 14,
    width: 23,
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.3)",
    flex: 1,
    justifyContent: "flex-end",
  },
  navigateChat: {
    alignItems: "center",
    backgroundColor: "#ec1c2e",
    borderRadius: 10,
    justifyContent: "center",
    marginHorizontal: 35,
    paddingVertical: 10,
    width: 200,
  },
  pruLife: {
    color: "#ed1b2c",
    fontSize: 12,
    fontWeight: "bold",
  },
  receiverContainer: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 13,
  },
  spacer: {
    alignSelf: "center",
    backgroundColor: "#dfdfdf",
    borderRadius: 43,
    height: 5,
    marginTop: 6,
    width: 50,
  },
  statusBar: {
    backgroundColor: colors.statusBarColor,
    height: STATUSBAR_HEIGHT,
  },
  subContainer: {
    backgroundColor: "#fff",
    height: "auto",
    marginHorizontal: 10,
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  swiping: {
    color: "#919191",
    fontSize: 7,
    lineHeight: 10,
  },
  videoCallMessage: {
    color: "#414141",
    fontSize: 14,
    lineHeight: 19,
    marginTop: 10,
    textAlign: "center",
  },
});

export default AppContainer;

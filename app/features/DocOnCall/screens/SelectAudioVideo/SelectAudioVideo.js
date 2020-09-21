/* eslint-disable */
import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  PushNotificationIOS,
  Platform,
  findNodeHandle,
  UIManager,
  Dimensions,
  Alert,
  PermissionsAndroid,
  BackHandler,
  Keyboard
} from "react-native";

import { connect } from "react-redux";
import { OfflineImage } from "react-native-image-offline";
import Modal from "react-native-modal";
import OpenSettings from "react-native-open-settings";

import {
  REFRESH,
  ICON_AVATAR_HEAD,
  LARGEYELLOWROBOT,
  CAMERA,
  MICROPHONE,
  MICROPHONE_ACTIVE,
  ACCESS_GRANTED,
  CAMERA_ACTIVE,
  DOC_INLINE_LOGO,
  BACK,
  BOOST_IMAGE
} from "../../../../config/images";
import {
  CoreComponents,
  CoreServices,
  CoreConstants,
  metaHelpers,
  CoreConfig,
  CoreActionTypes,
  CoreActions
} from "@pru-rt-internal/pulse-common";

const helpers = metaHelpers;
const { gotoConsulationHistory } = CoreActions;

import styles from "./styles";

import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
const { checkDevicePermission, grantDevicePermissions, NavigationService } = CoreServices;
import { values, pickBy, any } from "ramda";
import Toast from "react-native-root-toast";

const {
  ConsultationStatus,
  ConsultationType,
  SCREEN_KEY_DOC_ON_CALL_LANDING,
  CONSULTATION_SERVICE_ID
} = CoreConstants;

import moment from "moment";
import ScreenNames from "../../configs/ScreenNames";
import actionNames from "../../configs/actionNames";
const {
  pageKeys,
  TALKTOADOCTOR,
  TALKTOADOCTOR_SELECTANSWER,
  TALKTOADOCTOR_HOWWOULDYOULIKE,
  TALKTOADOCTOR_PC,
  TALKTOADOCTOR_NPC
} = CoreConfig;
//const TYPE_MAIN_LIST_ITEM = "listitem";
//const TYPE_PERMISSION_LIST_ITEM = "permission";
const NOTES = "notes";
const INFO = "info";
const PROCEED = "permissionDescriptionPart2";
const AND = "and";
const KEY_MICROPHONE = "permissionMicrophone";
const KEY_CAMERA = "permissionCamera";
const ACCESS_DEVICE = "permissionDescriptionPart1";
const HOLIDAY = "pubholiday";
const TIMMING = "doctiming";
const CONSULT_DOCTOR = "consultwithdoctor";
const KEY_CANCEL = "cancel";
const KEY_GRANT_ACCESS = "grantaccess";
const KEY_PROCEED = "proceed";
const KEY_SYMPTOMS = "symptoms";
const CONSULT_DOCTOR_VIDEO = "consultwithdoctorvideo";
const CONSULT_DOCTOR_AUDIO = "consultwithdoctoraudio";
const KEY_PERMISION_REQUIRED = "permissionRequired";
const KEY_PERMISION_DESCRIPTION = "permissionRequiredDescription";
const KEY_OK = "permok";
const PERMISSION_CANCEL = "permcancel";
const CONSULT_REQUEST = "consultrequest";
const PERMISSION_GRANTED = "permissionGranted";
const PERMISSION_NOT_GRANTED = "permissionNotGranted";
const NOT_AVAILABLE = "docnotavailable";
const KEY_MAX = "max";
const KEY_CHARS = "chars";
const PRICING = "pricing";
const APPOINTMENT_TYPE = "appointment_type";
const PAY = "pay";
const PAYMENT_BY = "payment_by";
const VIDEO = "video";
const VIDEO_DESC = "for_video_call";
const AUDIO = "audio";
const AUDIO_DESC = "for_audio_call";

const KEY_PAGE_1 = "0";
const KEY_PAGE_2 = "1";
const KEY_PAGE_SELECTED = "selected";

const STYLE_FIRST_PAGE = "page0";
const STYLE_SECOND_PAGE = "page1";
const STYLE_SELECTED_PAGE = "selctedRowStyle";

const boldFont = Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold";

// let text = metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_PC).label

// let text1 = metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_NPC).label

class SelectAudioVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ConsultationAndMedic: false,
      payModal: false,
      modalVisible: false,
      isSymptomsModalVisible: false,
      data: [],
      selectedIndex: 0,
      selectedRow: null,
      symptoms: "",
      consultationMode: "VIDEO",
      permissions: {
        camera: false,
        microPhone: false
      },
      isCustomerText: "",
      isCustomerUser: false
    };
    this.text = metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_PC).label;

    this.text1 = metaHelpers.findElement(
      TALKTOADOCTOR,
      TALKTOADOCTOR_NPC
    ).label;
    this.permsRequired = [
      {
        key: "camera",
        permissionKey: "camera",
        display: "Camera",
        activeImg: CAMERA_ACTIVE,
        inactiveImg: CAMERA
      },
      {
        key: "microPhone",
        permissionKey: "micro_phone",
        display: "Microphone",
        activeImg: MICROPHONE_ACTIVE,
        inactiveImg: MICROPHONE
      }
    ];
    this.onConsultationPress = this.onConsultationPress.bind(this);
    this.checkRequiredPermissions = this.checkRequiredPermissions.bind(this);
    this.onGrantAccess = this.onGrantAccess.bind(this);
    this.hidePermissionsPopup = this.hidePermissionsPopup.bind(this);
    this.checkAvailableTime = this.checkAvailableTime.bind(this);
    this.onSelect = this.onSelect.bind(this);
    // this._renderList = this._renderList.bind(this);
    this._selectedItem = this._selectedItem.bind(this);
    this.submit = this.submit.bind(this);
    this.skip = this.skip.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.proceed = "";
    this.symptoms = "";
    this.permissionRequired = "";
    this.permissionDescription = "";
    this.ok = "";
    this.permCancel = "";
    this.consultRequest = "";
    this.permissionGranted = "";
    this.permissionNotGranted = "";
    this.max = "";
    this.callType = null;
    this.serviceId = null;
    this.chars = "";
    this.type = "";
  }

  componentDidMount() {
    this.props.dispatch({
      context: ScreenNames.DOC_SERVICE_LANDING_SCREEN,
      type: actionNames.DOC_SERVICE_PRICING
    });
    const { userProfile } = this.props;
    this.props.dispatch({
      context: ScreenNames.DOC_SERVICE_LANDING_SCREEN,
      type: actionNames.UPDATE_TOKEN
    });
    BackHandler.addEventListener("hardwareBackPress", this.onGoBack);
  }
  onSelect(index) {
    this.setState({
      selectedIndex: index
    });
  }

  checkRequiredPermissions() {
    const permsRequired = this.permsRequired;
    const promises = permsRequired.map(item =>
      checkDevicePermission(item.permissionKey)
    );
    return Promise.all(promises).then(results => {
      const newPermissions = {};
      permsRequired.map((item, idx) => {
        newPermissions[item.key] = results[idx];
      });
      const allPermissionsAvailable =
        values(pickBy(val => !val, newPermissions)).length === 0;
      this.setState({
        ...this.state,
        modalVisible: !allPermissionsAvailable,
        permissions: newPermissions
      });
      return allPermissionsAvailable;
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onGoBack);
  }

  onConsultationPress(index, item, serviceId) {
    this.setState({
      selectedRow: index
    });
    this.type = item.type;
    this.serviceId = serviceId;
    this.checkRequiredPermissions().then(allPermissionsAvailable => {
      if (allPermissionsAvailable) {
        this.callType =
          item.type === "video"
            ? ConsultationType.VIDEO_CHAT
            : ConsultationType.AUDIO_CHAT;
        this.checkAvailableTime(index);
      }
    });
  }

  hidePermissionsPopup() {
    this.setState({
      ...this.state,
      modalVisible: false
    });
  }

  submit() {
    let { isPrudentialCustomer } = this.props.userPreferences;
    let { IC } = this.props;
    if (this.callType !== null && this.callType !== undefined) {
      if (this.props.consultationStatus === ConsultationStatus.REQUESTED)
        Alert.alert(this.consultRequest);
      else {
        this.requestConsultation();
      }
    } else {
      Alert.alert("Select consultation mode");
    }
  }
  skip() {
    this.props.dispatch({
      context: ScreenNames.DOC_SERVICE_LANDING_SCREEN,
      type: CoreActionTypes.GO_BACK_TO_PREVIOUS_STACK
    });
  }
  onGrantAccess() {
    const { permissions } = this.state;

    const allPermissions = this.permsRequired.reduce(
      (promiseChain, permission) => {
        return promiseChain.then(results => {
          let currentPromise = Promise.resolve(true);
          if (!permissions[permission.key]) {
            currentPromise = grantDevicePermissions(permission.permissionKey);
          }
          return currentPromise.then(result => [...results, result]);
        });
      },
      Promise.resolve([])
    );

    allPermissions.then(results => {
      //0 is permission granted
      const permissionDenied = any(x => !x)(results);
      if (permissionDenied) {
        this.setState({
          selectedRow: null
        });
        Alert.alert(this.permissionRequired, this.permissionDescription, [
          {
            text: this.ok,
            onPress: () => {
              OpenSettings.openSettings();
              this.hidePermissionsPopup();
            }
          },
          {
            text: this.permCancel,
            style: "cancel",
            onPress: () => this.hidePermissionsPopup()
          }
        ]);
      } else {
        this.callType =
          this.type === "video"
            ? ConsultationType.VIDEO_CHAT
            : ConsultationType.AUDIO_CHAT;
        this.allPermissionsAvailable = true;
        this.hidePermissionsPopup();
      }
    });
  }

  getVoucherSuccessDispatchActions() {
    const dispatchActions = [
      {
        type: actionNames.DOC_ON_CALL_PAYMENT_SUCCESS
      },
      {
        type: CoreActionTypes.GO_TO_SCREEN,
        navigateTo: ScreenNames.DOC_SYMPTOM_INPUT
      }
    ];
    return dispatchActions;
  }

  requestConsultation = () => {
    Keyboard.dismiss();
    const { refreshToken } = this.props;
    this.setState({
      isSymptomsModalVisible: false
    });
    this.props.dispatch({
      type: CoreActionTypes.SET_PAYMENT_BY_FEATURE,
      payload: {
        name: "DOC_ON_CALL",
        params: {
          serviceCode:
            this.callType === ConsultationType.VIDEO_CHAT
              ? "DOC_ON_CALL_VIDEO"
              : "DOC_ON_CALL_AUDIO",
          serviceId: this.serviceId
        }
      }
    });

    this.props.dispatch({
      type: actionNames.SET_SERVICE_ID,
      payload: {
        serviceId: this.serviceId
      }
    });
    const dispatchActions = this.getVoucherSuccessDispatchActions();
    this.props.dispatch({
      type: CoreActionTypes.GO_TO_SCREEN,
      navigateTo: pageKeys.GO_PAYMENT_METHOD_PAGE,
      payload: {
        params: {
          dispatchActions
        }
      }
    });
  };

  onGoBack = () => {
    this.props.dispatch({
      context: ScreenNames.DOC_SERVICE_LANDING_SCREEN,
      type: CoreActionTypes.GO_BACK_TO_PREVIOUS_STACK
    });
    return true;
  };
  showPaymentOptions = () => {
    const { meta } = this.props;
    const { screens } = meta.metaDetail;
    const docConsultScreen = helpers.findScreen(SCREEN_KEY_DOC_ON_CALL_LANDING);
    const payment_by = helpers.findElementWithScreen(
      docConsultScreen,
      PAYMENT_BY
    ).label;

    return (
      <View style={styles.topView}>
        <RadioGroup
          color="#ed1b2e"
          selectedIndex={0}
          style={{ paddingBottom: 15 }}
          onSelect={(index, value) => this.onSelect(index, value)}
        >
          <RadioButton
            value=""
            backgroundColor="#ed1b2e"
            style={{ marginTop: 20 }}
          >
            <Text style={styles.radioButtonTextStyle}>
              {payment_by}{" "}
              <Image
                source={BOOST_IMAGE}
                resizeMode="contain"
                style={styles.boostImageStyle}
              ></Image>
            </Text>
          </RadioButton>
        </RadioGroup>
      </View>
    );
  };

  renderPermissionsList() {
    return this.permsRequired.map(item => {
      const { permissions } = this.state;
      const hasPermission = permissions[item.key];
      return (
        <View style={styles.modalButton} key={item.key}>
          {/* <View style={styles.contentCenter}>
                {hasPermission && (
                  <OfflineImage
                    key="access_granted"
                    resizeMode="contain"
                    style={styles.access_icons}
                    fallbackSource={ACCESS_GRANTED}
                    source={ACCESS_GRANTED}
                  />
                )}
              </View> */}
          <View>
            <OfflineImage
              key="camera"
              resizeMode="contain"
              style={styles.icons}
              fallbackSource={hasPermission ? item.activeImg : item.inactiveImg}
              source={hasPermission ? item.activeImg : item.inactiveImg}
            />
          </View>
          <View style={styles.contentCenter}>
            <Text style={styles.modalButtonLabel}>
              {hasPermission
                ? item.display + ` - ${this.permissionGranted}`
                : item.display + ` - ${this.permissionNotGranted}`}
            </Text>
          </View>
        </View>
      );
    });
  }
  checkAvailableTime(index) {
    const format = "hh:mm:ss";
    const currentTime = moment();
    const beforeTime = moment("00:00:01", format);
    const afterTime = moment("07:59:59", format);
    const { meta } = this.props;
    const { screens } = meta.metaDetail;
    const docConsultScreen = helpers.findScreen(SCREEN_KEY_DOC_ON_CALL_LANDING);
    const notAvailable = helpers.findElementWithScreen(
      docConsultScreen,
      NOT_AVAILABLE
    ).label;

    if (currentTime.isBetween(beforeTime, afterTime)) {
      displayText = notAvailable;
      Toast.show(displayText, {
        duration: 2000,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onHide: this.onGoBack
      });
    } else {
      this.setState({
        selectedRow: index
      });
    }
    // this.submit()
  }
  _selectedItem(index, item, serviceId) {
    let { isPrudentialCustomer } = this.props.userPreferences;
    let { IC } = this.props;
    // if (isPrudentialCustomer) {
    //     this.setState({
    //         isCustomerText: text
    //     })
    // } else {
    //     this.setState({
    //         isCustomerText: text1
    //     })
    // }
    this.setState({
      isCustomerText: IC ? this.text : this.text1
    });

    this.onConsultationPress(index, item, serviceId);
  }
  onCancel = () => {
    this.setState(
      {
        selectedRow: null
      },
      () => {
        this.hidePermissionsPopup();
      }
    );
  };

  getPageStyle(pageKey) {
    switch (pageKey) {
      case KEY_PAGE_1:
        return STYLE_FIRST_PAGE;
      case KEY_PAGE_2:
        return STYLE_SECOND_PAGE;
      case KEY_PAGE_SELECTED:
        return STYLE_SELECTED_PAGE;
      default:
        return STYLE_FIRST_PAGE;
    }
  }

  getButtonsData = type => {
    const { meta } = this.props;
    const { screens } = meta.metaDetail;
    const docConsultScreen = helpers.findScreen(SCREEN_KEY_DOC_ON_CALL_LANDING);
    if (type.toLowerCase() === "audio") {
      return {
        title: helpers.findElementWithScreen(docConsultScreen, AUDIO).label,
        description: "Audio Call"
        // helpers.findElementWithScreen(docConsultScreen, AUDIO_DESC).label
      };
    } else if (type.toLowerCase() === "video") {
      return {
        title: helpers.findElementWithScreen(docConsultScreen, VIDEO).label,
        description: "Video Call"
        // helpers.findElementWithScreen(docConsultScreen, VIDEO_DESC).label
      };
    }
    return {
      title: type.toUpperCase(),
      description: type.toUpperCase()
    };
  };
  _renderNewList = () => {
    const { meta } = this.props;
    const { screens } = meta.metaDetail;
    const docConsultScreen = helpers.findScreen(SCREEN_KEY_DOC_ON_CALL_LANDING);
    const pricing = helpers.findElementWithScreen(docConsultScreen, PRICING)
      .label;

    const obj = this.props.pricing;
    const node = new Array();
    const validServiceId = ["MY_DOC_VC_15", "MY_DOC_AC_15"];
    for (let key in obj) {
      if (validServiceId.indexOf(key) !== -1) {
        let item = obj[key];
        let index = validServiceId.indexOf(key);
        const buttonData = this.getButtonsData(item.type);
        node.push(
          <TouchableOpacity
            style={{
              marginTop: 20
            }}
            onPress={() => {
              // this.setState({
              //     payModal: true
              // }, () => {
              this._selectedItem(index, item, key);
              // })
            }}
          >
            <Text
              style={{
                backgroundColor: "#F1F3F5",
                height: 44,
                fontSize: 16,
                color: this.state.selectedRow == index ? "red" : "#222529",
                lineHeight: 44,
                paddingHorizontal: 12
              }}
            >
              {/* Video Call */}
              {buttonData.description}
            </Text>
          </TouchableOpacity>
        );
      }
    }
    return node;
  };

  render() {
    const { meta } = this.props;
    const { screens } = meta.metaDetail;

    let { isCustomerText, isCustomerUser } = this.state;
    const docConsultScreen = helpers.findScreen(SCREEN_KEY_DOC_ON_CALL_LANDING);
    const consultDoctorLabel = helpers.findElementWithScreen(
      docConsultScreen,
      CONSULT_DOCTOR
    ).label;

    const docTiming = helpers.findElementWithScreen(docConsultScreen, TIMMING)
      .label;

    const pubholiday = helpers.findElementWithScreen(docConsultScreen, HOLIDAY)
      .label;

    const deviceAccess = helpers.findElementWithScreen(
      docConsultScreen,
      ACCESS_DEVICE
    ).label;

    const cameraPermission = helpers.findElementWithScreen(
      docConsultScreen,
      KEY_CAMERA
    ).label;

    const and = helpers.findElementWithScreen(docConsultScreen, AND).label;

    const microphonePermission = helpers.findElementWithScreen(
      docConsultScreen,
      KEY_MICROPHONE
    ).label;

    const proceed = helpers.findElementWithScreen(docConsultScreen, PROCEED)
      .label;

    const info = helpers.findElementWithScreen(docConsultScreen, INFO).label;

    const notes = helpers.findElementWithScreen(docConsultScreen, NOTES).label;

    const cancel = helpers.findElementWithScreen(docConsultScreen, KEY_CANCEL)
      .label;
    this.permCancel = helpers.findElementWithScreen(
      docConsultScreen,
      PERMISSION_CANCEL
    ).label;

    this.ok = helpers.findElementWithScreen(docConsultScreen, KEY_OK).label;

    const grantAccess = helpers.findElementWithScreen(
      docConsultScreen,
      KEY_GRANT_ACCESS
    ).label;

    this.symptoms = helpers.findElementWithScreen(
      docConsultScreen,
      KEY_SYMPTOMS
    ).label;

    this.proceed = helpers.findElementWithScreen(
      docConsultScreen,
      KEY_PROCEED
    ).label;

    this.permissionRequired = helpers.findElementWithScreen(
      docConsultScreen,
      KEY_PERMISION_REQUIRED
    ).label;

    this.permissionDescription = helpers.findElementWithScreen(
      docConsultScreen,
      KEY_PERMISION_DESCRIPTION
    ).label;

    this.consultRequest = helpers.findElementWithScreen(
      docConsultScreen,
      CONSULT_REQUEST
    ).label;

    this.permissionGranted = helpers.findElementWithScreen(
      docConsultScreen,
      PERMISSION_GRANTED
    ).label;

    this.permissionNotGranted = helpers.findElementWithScreen(
      docConsultScreen,
      PERMISSION_NOT_GRANTED
    ).label;

    this.max = helpers.findElementWithScreen(docConsultScreen, KEY_MAX).label;

    this.chars = helpers.findElementWithScreen(
      docConsultScreen,
      KEY_CHARS
    ).label;

    const consultDoctorVideo = helpers.findElementWithScreen(
      docConsultScreen,
      CONSULT_DOCTOR_VIDEO
    ).label;

    const consultDoctorDescription = helpers.findElementWithScreen(
      docConsultScreen,
      CONSULT_DOCTOR_VIDEO
    ).description;

    const consultDoctorAudio = helpers.findElementWithScreen(
      docConsultScreen,
      CONSULT_DOCTOR_AUDIO
    ).label;
    const appointmentType = helpers.findElementWithScreen(
      docConsultScreen,
      APPOINTMENT_TYPE
    ).label;
    const pay = helpers.findElementWithScreen(docConsultScreen, PAY).label;

    const { navigation } = this.props;
    const { modalVisible } = this.state;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          position: "relative"
        }}
      >
        <View
          style={[
            {
              width: "100%",
              height: 52,
              backgroundColor: "#ffffff",
              alignItems: "center",
              paddingLeft: 11,
              paddingRight: 11,
              flexDirection: "row",
              justifyContent: "space-between"
            }
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              // this.props.navigation.navigate("PulseHealth")
              NavigationService.navigate("MainTab")
            }}
            style={{
              width: 55,
              height: 55,
              alignItems: "flex-start",
              justifyContent: "center"
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                left: 0
              }}
              source={BACK}
            />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => showHistory()}
            accessibilityLabel="home"
            accesible
            style={{
              width: 76,
              height: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              style={{
                width: 60,
                height: 30
              }}
              resizeMode="contain"
              source={DOC_INLINE_LOGO}
            />
          </TouchableOpacity>
        </View>
        {this.state.ConsultationAndMedic && (
          <View
            style={{
              alignItems: "flex-end",
              position: "absolute",
              top: 32,
              right: 10,
              zIndex: 1000
            }}
          >
            <View
              style={{
                marginLeft: 5,
                marginTop: 1,
                width: 0,
                height: 0,
                borderStyle: "solid",
                borderWidth: 10,
                borderTopColor: "#fff", //下箭头颜色
                borderLeftColor: "#fff", //右箭头颜色
                borderBottomColor: "#A6E7EE", //上箭头颜色
                borderRightColor: "#fff", //左箭头颜色
                marginRight: 10
              }}
            ></View>
            <View
              style={{
                width: 152,
                height: 67,
                backgroundColor: "#A6E7EE",
                paddingHorizontal: 10,
                borderRadius: 5
              }}
            >
              <View
                style={{
                  borderBottomColor: "#FFF",
                  borderBottomWidth: 1,
                  flex: 1
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    lineHeight: 33
                  }}
                  onPress={() => {
                    this.props.gotoConsulationHistory();
                  }}
                >
                  Consultation History
                </Text>
              </View>

              <View
                style={{
                  flex: 1
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    lineHeight: 33
                  }}
                >
                  Medication Order
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* <View style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: 24,
                marginRight: 200,
                width: "100%",
                paddingHorizontal: 20,
                backgroundColor:"red"
            }}>

                <Image
                    style={{
                        width: 22,
                        height: 22,

                    }}
                    source={REFRESH}
                />
                <View style={{
                    width: 150,
                    height: 40,
                    backgroundColor: "#ED1B2E",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                    borderBottomRightRadius: 0,
                    marginHorizontal: 12

                }}>
                    <Text style={{
                        color: "#fff",
                        fontSize: 16,
                    }}>
                        I have a headache
                    </Text>
                </View>
                <View style={{
                    // justifyContent:"flex-end"
                    flexDirection: "column",
                    alignItems: "flex-start",
                    height: "100%"

                }}> 
                <Image
                        source={ICON_AVATAR_HEAD}
                        style={{
                            width: 20,
                            height: 20
                        }}
                    />
                </View>

            </View> */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 30,
            marginLeft: 15
          }}
        >
          <Image
            source={LARGEYELLOWROBOT}
            style={{
              width: 38,
              height: 38,
              marginRight: 30
            }}
          />
          <View
            style={{
              width: "70%",
              // height: 40,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFF",
              borderColor: "rgb(244,244,244)",
              borderWidth: 3,
              paddingVertical: 12,
              paddingHorizontal: 12,
              borderRadius: 20,
              borderBottomLeftRadius: 0
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#515B61"
              }}
            >
              {
                metaHelpers.findElement(
                  TALKTOADOCTOR,
                  TALKTOADOCTOR_HOWWOULDYOULIKE
                ).label
              }

              {/* How would you like us to start the call?  */}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 23,
            marginLeft: 20
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#68737A"
            }}
          >
            {/* Select an answer */}
            {
              metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_SELECTANSWER)
                .label
            }
          </Text>
        </View>
        {
          // this._renderList()
        }

        <View
          style={{
            paddingHorizontal: 20
          }}
        >
          {this._renderNewList()}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          isVisible={this.state.payModal}
        >
          <View
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              backgroundColor: "#000c",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: "80%",
                height: "30%",
                backgroundColor: "#fff",
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingVertical: 30
              }}
            >
              <Text
                style={{
                  fontSize: 16
                }}
              >
                You are not a Prudential customer, so you need to pay the
                consulation on fees to continue ,are you sure to go for pay ment
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                  marginTop: 20
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      payModal: false
                    });
                  }}
                  style={{
                    width: "40%",
                    borderColor: "red",
                    borderWidth: 2,
                    height: 40,
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "red"
                    }}
                  >
                    NO
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // this.setState({
                    //     payModal: false
                    // },()=>{

                    // })
                    this.submit();
                  }}
                  style={{
                    width: "40%",
                    backgroundColor: "red",
                    height: 40,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF"
                    }}
                  >
                    YES
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => this.setState({ modalVisible: true })}
          onModalHide={() => {
            if (this.allPermissionsAvailable) {
              this.checkAvailableTime(this.state.selectedRow);
            }
          }}
        >
          <View style={styles.profileModalContent}>
            <View style={styles.modalStyle}>
              <Text style={styles.modalLabel}>
                {deviceAccess}
                <Text style={styles.labelBold}>{cameraPermission}</Text>
                {and}
                <Text style={styles.labelBold}>{microphonePermission}</Text>
                {proceed}
              </Text>
              <View>{this.renderPermissionsList()}</View>
              <View style={styles.modalFooterBtnContainer}>
                <TouchableOpacity
                  style={styles.modalFooterBtn}
                  onPress={this.onCancel}
                >
                  <Text
                    style={[
                      styles.modalFooterLabel,
                      styles.labelBold,
                      styles.textLeft
                    ]}
                  >
                    {cancel}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalFooterBtn}
                  onPress={e => {
                    e.preventDefault();
                    this.onGrantAccess();
                  }}
                >
                  <Text
                    style={[
                      styles.modalFooterLabel,
                      styles.labelBold,
                      styles.textRight
                    ]}
                  >
                    {grantAccess}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {isCustomerText ? (
          <View
            style={{
              position: "absolute",
              bottom: 20,
              shadowColor: "red"
            }}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                paddingHorizontal: 30
              }}
            >
              {isCustomerText}
            </Text>
            <TouchableOpacity
              style={{
                alignSelf: "center",
                height: 44,
                width: "80%",
                borderRadius: 255,
                backgroundColor: "#ED1B2E",
                justifyContent: "center",
                marginTop: 30
              }}
              onPress={() => {
                //  this._agreeTermsOfDengueAlert()
                // this.props.navigation.navigate("SelectAudioVideo")
                this.submit();
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Avenir",
                  fontSize: 16,
                  fontWeight: "500",
                  textAlign: "center"
                }}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    meta: state.meta,
    consultationStatus: state.doctorOnCallService.consultationStatus,
    pricing: state.doctorOnCallService.pricing,
    refreshToken: state.auth.refreshToken,
    userProfile: state.profile,
    userPreferences: state.userPreferences,
    IC: state.auth.IC
  };
};

const mapDispatchToProps = dispatch => ({
  gotoConsulationHistory,
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectAudioVideo);

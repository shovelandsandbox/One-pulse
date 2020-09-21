import React, { Component } from "react";
import {
  Image,
  View,
  Text,
  ScrollView,
  Alert,
  BackHandler,
  ImageBackground,
} from "react-native";
import {
  LIKE_ICON,
  BRIEFCASE_ICON,
  HaloDoc_Education,
  HaloDoc_Payment,
  HaloDoc_PlacePractice,
  AVATAR,
} from "../../../../config/images";
import styles from "./styles";
import {
  CoreComponents,
  CoreUtils,
  events
} from "@pru-rt-internal/pulse-common";
import moment from "moment";
import { connect } from "react-redux";

import { path, sum, forEach, map, indexOf, filter, join } from "ramda";
import HaloDocActionBar from "../../components/actionBar";
import { dispatchEvent } from "../../../../actions";
import {
  resetBookingStatus,
  resetRoomDetails,
  goToDoctorListScreen,
  resetAppointmentStatus,
  gotoPaymentSummaryScreen,
  takeDocAppointment,
  confirmDocAppointment,
  updateDoctorAppointment,
} from '../../actions'
import { screenNames } from '../../configs/screenNames'
const { AppButton } = CoreComponents;
const { setScreen } = CoreUtils;
import metaConstants from "../../meta";



class HalodocDoctorInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequested: false,
      appointmentData: null,
    };
    this.metaConstants = { ...metaConstants.talkToDoctorMeta() }
  }

  calcExperience = () => {
    const { docObject } = this.props;
    const exp_check = docObject.doctor_profile_sections;
    let expInYears = 0;
    if (exp_check.experience && exp_check.experience.length) {
      const DocYear = path(['experience', 0, 'start_year'], exp_check)
      const DocMonth = parseInt(path(['experience', 0, 'start_month'], exp_check)) - 1; //Months in JS range 0-11
      const now = moment(new Date());
      const currentMonth = now.month();
      const currentYear = now.year();
      const currentTime = moment([currentYear, currentMonth]);
      const prevTime = moment([DocYear, DocMonth]);
      expInYears = currentTime.diff(prevTime, "years", true);
      expInYears = expInYears.toFixed(1);
    }
    return expInYears;
  };

  showAlert = nextProps => {
    const Request = this.metaConstants.Request
    const Make_Request = this.metaConstants.Make_Request;
    const Cancel = this.metaConstants.Cancel;
    const Proceed = this.metaConstants.Proceed;

    Alert.alert(
      Request,
      `${
      Make_Request
      }?`,
      [
        {
          text: Cancel,
          onPress: () => {
            this.cancelRequest();
            this.props.dispatchEvent(events.TalkToDocCancelAppointmentClick);
          },
          style: "cancel",
        },
        {
          text: Proceed,
          onPress: () => {
            const { docObject } = this.props;
            this.props.resetAppointmentStatus();
            this.props.gotoPaymentSummaryScreen(
              nextProps.appointmentData,
              docObject
            );
            this.props.dispatchEvent(events.TalkToDocProceedBtnClick);
          },
        },
      ],
      { cancelable: false }
    );
  };



  cancelRequest = () => {
    var appointmentData = this.props.appointmentData;
    const consultationId = path(['customer_consultation_id'], appointmentData);
    const body = {
      type: "customer_cancelled",
      reason: "stupid",
      comments: "comments",
    };
    this.props.resetAppointmentStatus();
    this.props.updateDoctorAppointment(body, consultationId);
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.isRequested) {
      if (nextProps.appointmentRequestSuccess === "requested") {
        this.showAlert(nextProps);
      } else if (nextProps.appointmentRequestError) {
        alert(nextProps.appointmentRequestError);
      }
    }
  }

  moveToWaitingScreen = () => {
    this.setState({ isRequested: false });
    const { docObject } = this.props;
    this.props.navigation.replace(screenNames.HALODOC_PATIENT_WAITING, {
      docObject,
    });
  };

  showWaitingScreen = () => {
    this.props.resetBookingStatus();
    this.props.dispatchEvent(events.TalkToDocBookAppointmentClick);
    const { docObject } = this.props;
    this.setState({ isRequested: true });
    const coronaRiskFactor = this.props.navigation.getParam('coronaRiskFactor')
    const category = this.props.navigation.getParam('category')
    if (coronaRiskFactor && category) {
      const attributes = {
        is_corona_consultation: category === 'COVID-19',
        corona_bot_risk_factor: coronaRiskFactor
      };
      this.requestDoctor(docObject, attributes);
    } else {
      this.requestDoctor(docObject);
    }

  };

  requestDoctor = (docObject, attributes = null) => {
    const body = {
      type: "online",
      toggleLoader: true,
      packages: [
        {
          package_id: path(["doctor_packages", 0, "id"], docObject),
        },
      ],
      participants: [
        {
          participant_type: "doctor",
          entity_id: docObject.id,
        },
      ],
      attribute_list: [],
      attributes: attributes
    };

    this.props.takeDocAppointment(body);
  };

  componentWillMount() {
    this.props.resetBookingStatus();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPress);
  }

  componentDidMount() {
    setScreen("HalodocDoctorInfoScreen", "UserActivity");
    BackHandler.addEventListener("hardwareBackPress", this.backPress);
    this.props.resetRoomDetails();
    this.props.dispatchEvent(events.DocDetailScreen);
  }

  backPress = () => {
    this.props.goToDoctorListScreen();
    return true;
  };

  getDoctorPrice = (doctorPackages) => {
    let leastPackage = this.retrieveLeastPackage(doctorPackages);
    let price = 0;
    let price2 = 0;
    if (leastPackage && leastPackage.price) {
      price = leastPackage.price;
      const coupons = leastPackage.coupons;
      if (coupons && coupons.length > 0) {
        price = price - sum(map((item => item.type === "discount" ? item.amount : 0), coupons));
      }

    }
    return price;

  }

  retrieveLeastPackage = packagesList => {
    let minPricePackage = null;
    if (packagesList && packagesList.length > 0) {
      minPricePackage = packagesList[0];
      forEach((value => {
        if (value.price < minPricePackage.price) {
          minPricePackage = value;
        }
      }), packagesList);
    }
    return minPricePackage;
  };

  renderDoctorInfo = () => {

    const Rp = this.metaConstants.Rp;
    const Graduated_From = this.metaConstants.Graduated_From;
    const Practice_Place = this.metaConstants.Practice_Place;
    const Payment = this.metaConstants.Payment;
    const Consultation_Fees = this.metaConstants.Consultation_Fees;
    const { docObject } = this.props;
    const education = path(["doctor_profile_sections", "education"], docObject);
    const placeOfPractice = path(["doctor_profile_sections", "place_of_practice"], docObject);
    const DataUnavailable = "Data unavailable";
    let price = this.getDoctorPrice(docObject.doctor_packages);
    const Bullet = "\u2022 ";

    return (
      <View>
        <View style={styles.containerDetails}>
          <Image style={styles.HaloDocEducationIcon} source={HaloDoc_Education} />
          <Text style={styles.graducatedFromText}>
            {
              Graduated_From
            }
          </Text>
        </View>

        <View style={{ paddingVertical: 5 }}>
          <Text style={styles.educationText}>
            {education
              ? map((item => {
                return `${Bullet} ${item.university_name}, ${item.completed_year}\n`;
              }), education)
              : DataUnavailable}
          </Text>
        </View>

        <View style={styles.practicePlace}>
          {/* <Icon name={"store"} size={30} /> */}
          <Image style={styles.HaloDocImageStyle} source={HaloDoc_PlacePractice} />
          <Text style={styles.practicePlaceText}>
            {
              Practice_Place
            }
          </Text>
        </View>

        <View style={{ paddingVertical: 5 }}>
          <Text style={styles.localityText}>
            {placeOfPractice
              ? map((item => {
                return `${Bullet} ${item.city}, ${item.locality}, ${item.place}\n`;
              }), placeOfPractice)
              : DataUnavailable}
          </Text>
        </View>

        <View style={styles.paymentView}>
          {/* <Icon name={"monetization-on"} size={30} /> */}
          <Image style={styles.HaloDocImageStyle} source={HaloDoc_Payment} />
          <Text style={styles.paymentText}>
            {
              Payment
            }
          </Text>
        </View>

        <View style={styles.consultationView}>
          <Text style={styles.consultationText}>
            {
              Consultation_Fees
            }
          </Text>
          <Text style={styles.priceText}
          >{`${Rp} ${price.toFixed(1)}`}</Text>
        </View>

      </View>
    )
  }

  shortDoctorInfo = () => {

    const Years = this.metaConstants.Years;
    const Year = this.metaConstants.Year;
    const Doc_Likes = this.metaConstants.Doc_Likes
    const Doc_Experience = this.metaConstants.Doc_Experience
    const { docObject } = this.props
    const showExperience = this.calcExperience() > 1 ? Years : Year;
    return (
      <View>
        <Image style={styles.likeImageStyle} source={LIKE_ICON} />
        <Text style={styles.likeTextStyle}>
          {docObject.rating}%{" "}
          <Text style={styles.lightExperienceTextStyle}>
            {
              Doc_Likes
            }
          </Text>{" "}
        </Text>

        <Image style={styles.briefcaseImageStyle} source={BRIEFCASE_ICON} />
        <Text style={styles.likeTextStyle}>
          {this.calcExperience()} {showExperience}{" "}
          <Text style={styles.lightExperienceTextStyle}>
            {
              Doc_Experience
            }
          </Text>
        </Text>
      </View>
    )
  }

  doctorInfo = () => {

    const Dr = this.metaConstants.Dr;
    const Book_Appointment = this.metaConstants.Book_Appointment;
    const { docObject } = this.props
    let specialities = docObject.categories ? map(item => item.name, docObject.categories) : [];

    specialities = specialities.filter(function (elem, pos) {
      return indexOf(elem, specialities) == pos;
    });
    specialities = join(", ", specialities);


    return (
      <View>
        <ImageBackground source={AVATAR} style={styles.docImageStyle}>
          <Image style={styles.docImageStyle} source={{ uri: docObject.image_url }} />
        </ImageBackground>

        <Text style={styles.docNameStyle}>
          {`${Dr} ${docObject.first_name} ${docObject.last_name}`}
        </Text>

        <Text numberOfLines={2} style={styles.docSpeStyle}>
          {specialities}
        </Text>

        <View style={styles.experienceContainerStyle}>
          {this.shortDoctorInfo()}
        </View>

        <View style={styles.mainContainer}>
          {this.renderDoctorInfo()}
        </View>

        <View styles={styles.appContainerStyles}>
          <AppButton
            disable={false}
            type={[
              styles.btn,
              styles.primary,
              styles.appBtn,
            ]}
            title={
              Book_Appointment
            }
            press={this.showWaitingScreen}
            textStyle={styles.reqButtonTextStyle}
          />
        </View>
      </View>
    )
  }


  render() {
    if (this.state.isRequested && this.props.isDoctorConfirmedAppointment) {
      this.moveToWaitingScreen();
    }
    return (
      <View style={styles.container}>
        <HaloDocActionBar
          onGoBack={() =>
            this.props.goToDoctorListScreen()
          }
        ></HaloDocActionBar>
        <ScrollView>
          <View style={styles.docInfoContainerStyle}>
            {this.doctorInfo()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    meta: state.meta,
    appointmentRequestSuccess: state.haloDocServices.appointmentRequestSuccess,
    appointmentRequestError: state.haloDocServices.appointmentRequestError,
    appointmentData: state.haloDocServices.appointmentData,
    isDoctorConfirmedAppointment:
      state.haloDocServices.isDoctorConfirmedAppointment,
    docObject: state.haloDocServices.docObject,
  };
};

export default connect(mapStateToProps, {

  dispatchEvent,
  resetBookingStatus,
  resetRoomDetails,
  goToDoctorListScreen,
  resetAppointmentStatus,
  gotoPaymentSummaryScreen,
  takeDocAppointment,
  confirmDocAppointment,
  updateDoctorAppointment,

})(HalodocDoctorInfoScreen);

// ConsulationDetail
import React, { PureComponent } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import { CoreConfig, CoreUtils } from "@pru-rt-internal/pulse-common";
const {
  pageKeys,
  CHATBOTPROFILE,
  CHATBOT_DOCTOR,
  CONSULTATION_DETAIL_TITLE,
  SCREEN_CONSULTATION_HISTORY
} = CoreConfig;

const { metaHelpers } = CoreUtils;
import ConsulationDetailItem, {
  CONSULATION_DETAIL_TYPE_DOCTOR_FEEDBACK,
  CONSULATION_DETAIL_TYPE_MY_SYMPTOMS
} from "../../components/ConsulationDetailItem";
import { BACK, DOC_INLINE_LOGO, AVATAR } from "../../../../config/images";
const mockDetail = require("../../../../mockResponse/consulationDetail.json");

import screenNames from "../../configs/ScreenNames";
import actionNames from "../../configs/actionNames";

class ConsulationDetail extends PureComponent {
  constructor(props) {
    const { navigation } = props;
    const item = navigation.getParam("consulationItem", null);
    const name = item ? item.doctor : "-";
    const date = item ? item.date : "-";
    const symptoms = item ? item.symptoms : "-";
    const feedback = item ? item.feedback : "-";
    super(props);
    this.state = {
      doctorName: name,
      consulationDate: date,
      symptoms: symptoms,
      feedback: feedback
    };
    this.Prescription = this.Prescription.bind(this);
  }

  componentWillMount() {
    this._prepareMockData();

    let { id } = this.props.navigation.state.params.consulationItem;
    this.props.getConsultationById({
      id
    });
  }

  _prepareMockData() {
    const item = mockDetail;
    this.setState({
      doctorName: item.doctor.name,
      consulationDate: item.consultationTime.date,
      symptoms: item.attributes.symptoms,
      feedback: ""
    });
  }

  handleGoBack = () => {
    this.props.navigation.goBack();
  };
  showFilter = () => {
    this.props.navigation.navigate(screenNames.DOC_CONSULTATION_DETAIL);
  };
  Prescription(res) {
    let { token } = this.props;
    let referralId = this.props.consulationDetail.prescription.id;
    this.props.getPrescription({
      id: referralId,
      token,
      type: res
    });
    this.props.navigation.navigate(screenNames.DOC_CONSULTATION_HISTORY_PDF);
  }

  render() {
    let { consulationDetail, userPreferences } = this.props;
    let doctorName = consulationDetail.doctor
      ? consulationDetail.doctor.name
      : "";
    let consulationDate = consulationDetail.consultationTime
      ? consulationDetail.consultationTime.date
      : "";
    let symptoms = consulationDetail.attributes
      ? consulationDetail.attributes.symptoms
      : "";
    let Doctor = metaHelpers.findElement(CHATBOTPROFILE, CHATBOT_DOCTOR).label;
    let ConsulationDetailTitle = metaHelpers.findElement(
      SCREEN_CONSULTATION_HISTORY,
      CONSULTATION_DETAIL_TITLE
    ).label;
    let { consulationImage } = this.props;
    const source = {
      uri: "data:application/pdf;base64," + consulationImage.content
    };
    let { language } = userPreferences;

    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "#F7F7F7",
          textAlign: "center"
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            height: 54,
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
            backgroundColor: "#fff"
          }}
        >
          <TouchableOpacity onPress={() => this.handleGoBack()} accesible>
            <Image style={{ width: 20, height: 15 }} source={BACK} />
          </TouchableOpacity>
          <View>
            <Image
              style={{
                width: 60,
                height: 35,
                resizeMode: "contain"
              }}
              source={DOC_INLINE_LOGO}
            />
          </View>
        </View>
        {/* Content */}
        <ScrollView>
          <View
            style={{
              width: "100%",
              height: 220,
              backgroundColor: "#fff"
            }}
          >
            <Text
              style={{
                width: "100%",
                height: 30,
                fontSize: 22,
                color: "#515B61",
                textAlign: "center",
                marginTop: 16,
                marginBottom: 20
              }}
            >
              {ConsulationDetailTitle}
              {/* {`Consultation Details`} */}
            </Text>
            <View
              style={{
                width: "100%",
                flex: 2,
                alignItems: "center"
              }}
            >
              <Image
                resizeMode={"contain"}
                source={AVATAR}
                style={{
                  width: 74,
                  height: 74,
                  textAlign: "center"
                }}
              ></Image>
            </View>
            <View
              style={{
                width: "100%",
                flex: 1,
                textAlign: "center",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#515B61"
                }}
              >
                {doctorName}
              </Text>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  flexDirection: "row",
                  fontSize: 12,
                  color: "#515B61",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#515B61"
                  }}
                >
                  {`${consulationDate}`}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 20,
              paddingBottom: 20,
              backgroundColor: "#fff"
            }}
          >
            <TouchableOpacity
              style={{
                background: "#FFFFFF",
                borderColor: "#ED1B2E",
                borderRadius: 22,
                borderWidth: 1
              }}
              onPress={() => {
                this.Prescription("prescription");
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "#ED1B2E",
                  letterSpacing: 0,
                  textAlign: "center",
                  marginHorizontal: 10,
                  marginVertical: 2
                }}
              >
                {language == "BM" ? "Lihat Preskripsi" : `View Prescription`}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                background: "#FFFFFF",
                borderColor: "#ED1B2E",
                borderRadius: 22,
                borderWidth: 1,
                marginLeft: 34
              }}
              onPress={() => this.Prescription("referral")}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "#ED1B2E",
                  letterSpacing: 0,
                  textAlign: "center",
                  marginHorizontal: 10,
                  marginVertical: 2
                }}
              >
                {language == "BM"
                  ? "Lihat Surat  Rujukan"
                  : `View Referral Letter`}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <ConsulationDetailItem
              contentType={CONSULATION_DETAIL_TYPE_MY_SYMPTOMS}
              symptoms={symptoms}
            />
            <ConsulationDetailItem
              contentType={CONSULATION_DETAIL_TYPE_DOCTOR_FEEDBACK}
              feedback={this.props.consulationDetail}
            />
            <ConsulationDetailItem />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    consulationDetail: state.doctorOnCallService.consulationDetail,
    token: state.auth.token,
    consulationImage: state.doctorOnCallService.consulationImage,
    userPreferences: state.userPreferences
  };
};
export default connect(mapStateToProps, {
  getConsultationById: payload => ({
    context: screenNames.DOC_CONSULTATION_HISTORY,
    type: actionNames.FETCH_CONSULATION_DETAIL_BY_ID,
    payload: payload
  }),
  getPrescription: payload => ({
    context: screenNames.DOC_CONSULTATION_HISTORY,
    type: actionNames.FETCH_CONSULATION_LETTER_PRESCRIPTION,
    payload: payload
  })
})(ConsulationDetail);

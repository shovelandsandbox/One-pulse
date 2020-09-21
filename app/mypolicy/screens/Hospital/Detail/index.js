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
import { View, TouchableOpacity, Linking, Image, Platform } from "react-native";
import { connect } from "react-redux";

// ----------------------------------------
// LOCAL & CONFIG IMPORTS
// ----------------------------------------
import { Colors, Sizes } from "../../../configs";
import Styles from "./style";
import PropTypes from "prop-types";

// ----------------------------------------
// COMPONENT IMPORTS
// ----------------------------------------
import { TextMX, TextM } from "../../../components/derivatives/Text";
import Icon from "../../../components/generics/Icon";
import { ImageBase64 } from "../../../components/derivatives/Image";
import {
  Padder as PadderContainer,
  Auth as AuthContainer,
  HorizontalAnimator as HorizontalAnimatorContainer,
  VerticalAnimator as VerticalAnimatorContainer
} from "../../../components/containers";
import NoScheduleErrorModal from "../../../modals/NoScheduleError";

/*
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 *  MAIN CLASS
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 */
const MAIN_HOSPITAL_TYPES = "mainhospital";
const mainHospitalMeta = (meta, types, keys) =>
  meta.find(item => item.type === types && item.key === keys).label;

class Detail extends Component {
  static propTypes = {
    getDetailHospitalResponse: PropTypes.any,
    meta: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      noScheduleErrorModalVisible: false
    };
  }

  getSubTitle(eta, distance, type) {
    const { meta } = this.props;
    if (eta > 59) {
      const minutes = eta % 60;
      const hours = Math.floor(eta / 60);
      return (
        hours +
        mainHospitalMeta(
          meta.metaDetail.commons,
          MAIN_HOSPITAL_TYPES,
          "detailhospitalhour"
        ) +
        minutes.toFixed(0) +
        mainHospitalMeta(
          meta.metaDetail.commons,
          MAIN_HOSPITAL_TYPES,
          "detailhospitalminute"
        ) +
        distance +
        "  •  " +
        type
      );
    }
    return (
      eta.toFixed(0) +
      mainHospitalMeta(
        meta.metaDetail.commons,
        MAIN_HOSPITAL_TYPES,
        "detailhospitalminute"
      ) +
      distance +
      "  •  " +
      type
    );
  }

  renderActionItem(label, icon, onPress, index) {
    return (
      <HorizontalAnimatorContainer order={(index + 3) * 2}>
        <TouchableOpacity
          style={Styles.main.action.container}
          onPress={() => onPress()}
        >
          <View style={Styles.main.action.icon.container}>
            <Icon name={icon} color={Colors.main.baseRed} />
          </View>

          <TextM color={Colors.main.baseRed}>{label}</TextM>
        </TouchableOpacity>
      </HorizontalAnimatorContainer>
    );
  }

  renderAction() {
    const { getDetailHospitalResponse, meta } = this.props;
    return (
      <View style={Styles.main.action.grouper}>
        {this.renderActionItem(
          getDetailHospitalResponse.body.hotline,
          "contact",
          () =>
            getDetailHospitalResponse.body.hotline
              ? Linking.openURL("tel:" + getDetailHospitalResponse.body.hotline)
              : {},
          0
        )}
        {this.renderActionItem(
          mainHospitalMeta(
            meta.metaDetail.commons,
            MAIN_HOSPITAL_TYPES,
            "detaildoctorschedule"
          ),
          "opening-hour",
          () =>
            getDetailHospitalResponse.body.doctorScheduleUrl
              ? Linking.openURL(
                  getDetailHospitalResponse.body.doctorScheduleUrl
                )
              : this.setState({ noScheduleErrorModalVisible: true }),
          1
        )}
        {this.renderActionItem(
          mainHospitalMeta(
            meta.metaDetail.commons,
            MAIN_HOSPITAL_TYPES,
            "detailhospitalweb"
          ),
          "website",
          () =>
            getDetailHospitalResponse.body.website
              ? Linking.openURL(getDetailHospitalResponse.body.website)
              : {},
          2
        )}
      </View>
    );
  }

  renderMain() {
    const { getDetailHospitalResponse } = this.props;
    return (
      <View style={Styles.main.container}>
        <HorizontalAnimatorContainer order={4}>
          <TextM>{getDetailHospitalResponse.body.address.line1}</TextM>
        </HorizontalAnimatorContainer>

        {this.renderAction()}
      </View>
    );
  }

  renderPartnersItem(logo, hotline) {
    if (hotline !== "")
      return (
        <TouchableOpacity onPress={() => Linking.openURL("tel:" + hotline)}>
          <Image
            resizeMode="center"
            style={Styles.partner.container}
            source={{ uri: logo }}
          />
        </TouchableOpacity>
      );
    return (
      <Image
        resizeMode="center"
        style={Styles.partner.container}
        source={{ uri: logo }}
      />
    );
  }

  openMap = () => {
    const { getDetailHospitalResponse } = this.props;
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q="
    });
    const latLng = `${getDetailHospitalResponse.body.address.latitude},${getDetailHospitalResponse.body.address.longitude}`;
    const url = Platform.select({
      ios: `${scheme}${getDetailHospitalResponse.body.title}@${latLng}`,
      android: `${scheme}${latLng}(${getDetailHospitalResponse.body.title})`
    });
    Linking.openURL(url);
  };

  renderPartners() {
    const { getDetailHospitalResponse, meta } = this.props;
    return (
      <VerticalAnimatorContainer order={6}>
        <TextMX>
          {mainHospitalMeta(
            meta.metaDetail.commons,
            MAIN_HOSPITAL_TYPES,
            "detailhospitalpartner"
          )}
        </TextMX>

        <View style={Styles.partner.grouper}>
          {getDetailHospitalResponse.body.tpas.map(item =>
            this.renderPartnersItem(item.logo, item.hotline)
          )}
        </View>
      </VerticalAnimatorContainer>
    );
  }

  contactHospital() {
    this.setState({ noScheduleErrorModalVisible: false });
  }

  render() {
    const { getDetailHospitalResponse, meta } = this.props;
    return (
      <AuthContainer
        title={getDetailHospitalResponse.body.title}
        subTitle={this.getSubTitle(
          getDetailHospitalResponse.body.estimation,
          getDetailHospitalResponse.body.distance.toFixed(2) + " km",
          getDetailHospitalResponse.body.tpas
            .map(item => item.tpaName)
            .join(", ")
        )}
        noSubtitleMargin
        bottomOrder={5}
        buttonLabel={mainHospitalMeta(
          meta.metaDetail.commons,
          MAIN_HOSPITAL_TYPES,
          "detailhospitalfind"
        )}
        onSubmit={() => this.openMap()}
      >
        <PadderContainer>
          {this.renderMain()}

          {this.renderPartners()}
        </PadderContainer>
        <NoScheduleErrorModal
          isActive={this.state.noScheduleErrorModalVisible}
          meta={meta}
          onClosePress={() =>
            this.setState({ noScheduleErrorModalVisible: false })
          }
          onConfirm={() =>
            getDetailHospitalResponse.body.website
              ? Linking.openURL(getDetailHospitalResponse.body.website)
              : this.contactHospital()
          }
        />
      </AuthContainer>
    );
  }
}

const mapStateToProps = state => ({
  action: state.mpolicyMain.action,
  getDetailHospitalResponse: state.mpolicyMain.getDetailHospitalResponse,
  meta: state.meta
});

export default connect(mapStateToProps, null)(Detail);

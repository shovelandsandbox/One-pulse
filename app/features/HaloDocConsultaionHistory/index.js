import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import {
  events
} from "@pru-rt-internal/pulse-common";
import { dispatchEvent } from '../../actions'
import MetaConstants from "./meta";

import { connect } from "react-redux";
import Styles from "./style";
import DetailArrowCell from "../../components/DetailArrowCell";
import { CompleteYourMedicalProfile, BACK, HALODOC_INLINE_LOGO } from "../../config/images";

const window = Dimensions.get("window");

class HaloDocConsultaionHistory extends Component {
  constructor(props) {
    super(props);
    this.MetaConstants = { ...MetaConstants.consultationHistoryMeta() };
  }
  componentDidMount() {
    this.props.dispatchEvent(events.haloDocConsultationHistoryLanding)
  }
  goBack() {
    this.props.navigation.goBack();
    this.props.dispatchEvent(events.backFromConsultationHistoryLandingClick)
  }
  gotoConsultationList() {
    this.props.navigation.navigate("ConsultationHistoryList");
    this.props.dispatchEvent(events.consultationHistoryTabClick)
  }
  headerComponent() {
    return (
      <View style={Styles.container}>
        <View style={Styles.header}>
          <TouchableOpacity
            onPress={() => this.goBack()}
            style={Styles.backButton}
          >
            <Image
              style={Styles.backImage}
              source={BACK}
            />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel="home"
            accesible
            style={Styles.haloDocImage}
          >
            <Image
              style={Styles.haloDocIcon}
              resizeMode="contain"
              source={HALODOC_INLINE_LOGO}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  medicalReportsTile() {
    return (
      <TouchableOpacity
        style={Styles.medical}
      >
        <ImageBackground
          style={Styles.medicalImage}
          source={CompleteYourMedicalProfile}
        >
          <Text style={Styles.medicalProfileText}>
            {this.MetaConstants.medicalTileText}
          </Text>
          <Text style={Styles.description}>
            {this.MetaConstants.medicalDescText}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    )
  }

  arrowCellComponent() {
    return (
      <View style={Styles.listDetail}>
        <DetailArrowCell
          labelText={this.MetaConstants.title}
          hideArrow={false}
          onPress={() => this.gotoConsultationList()}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={Styles.All}>
        <View style={Styles.imageBackground}>
          {this.headerComponent()}
          {this.medicalReportsTile()}
        </View>
        <View style={Styles.functionList}>
          {this.arrowCellComponent()}
        </View>
      </View>
    );
  }
}
export default connect(null, {
  dispatchEvent
}
)(HaloDocConsultaionHistory);

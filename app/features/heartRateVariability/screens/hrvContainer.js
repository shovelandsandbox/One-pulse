/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, ScrollView } from "react-native";
import {
  O2Level,
  HeartBeatCount,
  RespiratoryRate,
  VitalsHeader,
  Sdnn,
} from "../components";
import { metaHelpers, CoreServices } from "@pru-rt-internal/pulse-common";
import { getMetaForMetrics } from "../utils";
import { pathOr } from "ramda";
import ShadowWrapper from "../../../components/ShadowWrapper";
import { PruBackHeader, ConnectedProfileImage } from "../../../components";
import { safeMetaLabelFinder } from "../../../utils/meta-utils";
import { registerEvent } from "../../../utils/registerEvents/actions";
import { eventNames } from "../events";

const { NavigationService } = CoreServices;

class HRVContainerScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.hrvData = {};
    const hrvPage = metaHelpers.findScreen("heartRateVariability");
    if (hrvPage) {
      this.hrvData = metaHelpers.findElementWithScreen(hrvPage, "hrvMeta");
    }
    this.state = {};
  }

  componentDidMount() {
    this.props.registerEvent(eventNames.resultPageOnLoad);
  }

  renderProfile = () => {
    return <ConnectedProfileImage variant="outline" size="medium" />;
  };

  getHeader = () => {
    return (
      <ShadowWrapper>
        <PruBackHeader
          title={safeMetaLabelFinder("heartRateVariability", "resultsHeader")}
          customStyles={{}}
          onPress={() => {
            this.props.registerEvent(eventNames.resultGoBack);
            NavigationService.goBack();
            NavigationService.goBack();
          }}
          rightImage
          rightImageRenderMethod={this.renderProfile}
        />
      </ShadowWrapper>
    );
  };

  render() {
    const {
      age,
      oxygenLevel,
      respiratoryRate,
      heartRate,
      hrvResults,
    } = this.props;

    const { spo2 } = hrvResults;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        {this.getHeader()}
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          <ScrollView>
            <VitalsHeader {...age}></VitalsHeader>
            {spo2 && (
              <O2Level
                {...oxygenLevel}
                {...hrvResults}
                o2Level={getMetaForMetrics("o2Level", this.hrvData)}
              ></O2Level>
            )}
            <RespiratoryRate
              {...respiratoryRate}
              {...age}
              {...hrvResults}
              respiratoryRate={getMetaForMetrics(
                "respiratoryRate",
                this.hrvData
              )}
            ></RespiratoryRate>
            <HeartBeatCount
              {...heartRate}
              {...hrvResults}
              heartBeat={getMetaForMetrics("heartBeat", this.hrvData)}
            ></HeartBeatCount>
            <Sdnn
              {...hrvResults}
              sdnnRange={getMetaForMetrics("sdnnRange", this.hrvData)}
            ></Sdnn>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...userData,
    hrvResults: pathOr({}, ["heartRateVariability", "hrvResults"], state),
  };
};

const userData = {
  age: {
    range: {
      upperBound: 45,
      lowerBound: 18,
    },
  },
  oxygenLevel: {
    user: 97,
    range: {
      low: 94,
      normal: 98,
    },
  },
  respiratoryRate: {
    user: 15,
    normalRange: {
      upperBound: 20,
      lowerBound: 12,
    },
  },
  heartRate: {
    user: {
      avg: 72,
      max: 85,
      min: 66,
    },
    range: {
      upperBound: 80,
      lowerBound: 65,
    },
  },
};

const HRVContainer = connect(mapStateToProps, { registerEvent })(
  HRVContainerScreen
);

HRVContainerScreen.propTypes = {
  navigation: PropTypes.object,
  age: PropTypes.object,
  oxygenLevel: PropTypes.object,
  respiratoryRate: PropTypes.object,
  heartRate: PropTypes.object,
  hrvResults: PropTypes.object,
  registerEvent: PropTypes.func,
};

export default HRVContainer;

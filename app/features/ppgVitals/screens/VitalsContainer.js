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

class VitalsContainerScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.vitalsMetaData = {};
    const ppgVitalsPage = metaHelpers.findScreen("ppgVitals");
    if (ppgVitalsPage) {
      this.vitalsMetaData = metaHelpers.findElementWithScreen(
        ppgVitalsPage,
        "vitalsMeta"
      );
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
          title={safeMetaLabelFinder("ppgVitals", "resultsHeader")}
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
      ppgVitalsResults,
    } = this.props;

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
            <O2Level
              {...oxygenLevel}
              {...ppgVitalsResults}
              o2Level={getMetaForMetrics("o2Level", this.vitalsMetaData)}
            ></O2Level>
            <RespiratoryRate
              {...respiratoryRate}
              {...age}
              {...ppgVitalsResults}
              respiratoryRate={getMetaForMetrics(
                "respiratoryRate",
                this.vitalsMetaData
              )}
            ></RespiratoryRate>
            <HeartBeatCount
              {...heartRate}
              {...ppgVitalsResults}
              heartBeat={getMetaForMetrics("heartBeat", this.vitalsMetaData)}
            ></HeartBeatCount>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...userData,
    ppgVitalsResults: pathOr({}, ["ppgVitals", "ppgVitalsResults"], state),
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

const VitalsContainer = connect(mapStateToProps, { registerEvent })(
  VitalsContainerScreen
);

VitalsContainerScreen.propTypes = {
  navigation: PropTypes.object,
  age: PropTypes.object,
  oxygenLevel: PropTypes.object,
  respiratoryRate: PropTypes.object,
  heartRate: PropTypes.object,
  ppgVitalsResults: PropTypes.object,
  registerEvent: PropTypes.func,
};

export default VitalsContainer;

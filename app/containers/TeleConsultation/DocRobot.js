import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { StaticChatMessageCard } from "./DoctorChatBotMessage";
import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers,
  events
} from "@pru-rt-internal/pulse-common";
import { dispatchEvent } from "../../actions";
const {
  TALKTOADOCTOR,
  TALKTOADOCTOR_IJUSTNEEDSTARTED,
  TALKTOADOCTOR_GETSTARTED,
  pageKeys,
} = CoreConfig;

class DocRobot extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatchEvent(events.MyDocIntroScreen)
  }

  render() {
    const iJustNeedLabel = metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_IJUSTNEEDSTARTED).label;
    const getStartedLabel = metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_GETSTARTED).label;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <StaticChatMessageCard
          value={iJustNeedLabel}
          title={getStartedLabel}
          _onPress={() => {
            this.props.dispatchEvent(events.MyDocIntroGetStarted)
            this.props.getStarted();
          }}
        />
      </View>
    );
  }
}

export default connect(
  null,
  {
    dispatchEvent,
    getBack: () => ({
      context: pageKeys.ALL,
      type: CoreActionTypes.GO_BACK_TO_PREVIOUS_SCREEN,
    }),
    getStarted: () => ({
      context: pageKeys.DOC_SERVICE,
      type: CoreActionTypes.GETSTARTED,
    }),
  }
)(DocRobot);

/* eslint-disable import/named */
import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Colors } from "../../../configs";
import Styles from "./style";

import { ButtonFull,ButtonSmall } from "../../derivatives/Button";
import { Padder as PadderContainer } from "../../containers";
import { dispatchEvent } from "../../../../actions";
import {
  CoreUtils,
  firebaseEvents,
  events
} from "@pru-rt-internal/pulse-common";
const {logFirebaseEvent} = CoreUtils;


class BottomButtonGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isKeyboarUp: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  renderSmallCancelButton() {
    if (!this.props.cancelLabel || !this.props.onCancel) {
      return null;
    }

    return (
     
        <ButtonSmall
          onPress={this.props.onCancel ? () => this.props.onCancel() : {}}
          color={'rgb(236,28,46)'}
          inverse = {true}
          hideBorder={true}
        >
          {this.props.cancelLabel}
        </ButtonSmall>
    );
  }

  renderCancelButton() {
    if (!this.props.cancelLabel || !this.props.onCancel) {
      return null;
    }

    return (
      <View style={Styles.cancelButton.container}>
        <ButtonFull
          onPress={this.props.onCancel ? () => this.props.onCancel() : {}}
          style={Styles.submitButton}
          color={Colors.main.baseWhite}
          backgroundColor={this.props.inverse ? Colors.main.baseRed : null}
          borderColor={this.props.inverse ? null : Colors.main.baseRed}
        >
          {this.props.cancelLabel}
        </ButtonFull>
      </View>
    );
  }

  handleNext(){
    // logFirebaseEvent(firebaseEvents.Pru_Services_Enabled.name,firebaseEvents.Pru_Services_Enabled.params);
    // this.props.dispatchEvent(events.PRUServicesEnabledClick);
    this.props.onSubmit();
  }

  render() {
    const {isRow = false} = this.props
    const main = isRow ? 
    <View style = {{flexDirection:'row',justifyContent:'flex-end',alignItems:'center',right:20}}>
       {this.renderSmallCancelButton()}
                <ButtonSmall
                  onPress={this.props.onSubmit ? () => this.handleNext() : {}}
                  padding={54}
                  color={Colors.main.baseRed}
                  backgroundColor={this.props.inverse ? Colors.main.baseWhite : null}
                  borderColor={
                    this.props.inverse
                      ? this.props.submitBordered
                        ? Colors.main.baseRed
                        : null
                      : Colors.main.baseWhite
                  }
                  inverse={this.props.inverse}
                  paddingVertical={40}
                >
                  {this.props.submitLabel}
                </ButtonSmall>

       
    </View> : (
      <PadderContainer>
        {this.props.text}
       <ButtonFull
          onPress={this.props.onSubmit ? () => this.handleNext() : {}}
          style={Styles.submitButton}
          color={Colors.main.baseRed}
          backgroundColor={this.props.inverse ? Colors.main.baseWhite : null}
          borderColor={
            this.props.inverse
              ? this.props.submitBordered
                ? Colors.main.baseRed
                : null
              : Colors.main.baseWhite
          }
          inverse={this.props.inverse}
        >
          {this.props.submitLabel}
        </ButtonFull>

        {this.renderCancelButton()}
      </PadderContainer>
    );

    if (this.props.transparentBackground === true) {
      const baseBackground = this.props.backgroundColor
        ? this.props.backgroundColor
        : Colors.main.baseWhite;

      return (
        <View
          style={[Styles.container, { backgroundColor: "#ffffff" }]}
          pointerEvents={"box-none"}
        >
          {main}
        </View>
      );
    }

    return (
      <View style={Styles.container} pointerEvents={"box-none"}>
        {main}
      </View>
    );
  }
}
export default connect(null,{
  dispatchEvent
})(BottomButtonGroup);
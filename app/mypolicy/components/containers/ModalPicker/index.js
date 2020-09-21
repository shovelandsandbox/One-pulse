import React, { Component } from "react";
import { View } from "react-native";
import { TextLX } from "../../derivatives/Text";
import Styles from "./style";
import { BottomButtonGroup as BottomButtonGroupCard } from "../../cards";
import { Padder as PadderContainer, Modal as ModalContainer } from "../index";

export default class ModalPicker extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  renderBottom() {
    return (
      <BottomButtonGroupCard
        submitLabel={this.props.submitLabel}
        onSubmit={() => this.props.onSubmit()}
        submitBordered
        inverse
      />
    );
  }

  render() {
    return (
      <ModalContainer
        isActive={this.props.isActive}
        onShow={this.props.onShow ? () => this.props.onShow() : () => {}}
        onClosePress={
          this.props.onClosePress ? () => this.props.onClosePress() : () => {}
        }
        bottomContent={this.props.submitLabel ? this.renderBottom() : null}
        persistScrollTitle={this.props.title}
        scrollable
      >
        <PadderContainer style={Styles.title.container}>
          <TextLX>{this.props.title}</TextLX>
        </PadderContainer>

        {this.props.children}

        <View style={Styles.bottomPadder} />
      </ModalContainer>
    );
  }
}

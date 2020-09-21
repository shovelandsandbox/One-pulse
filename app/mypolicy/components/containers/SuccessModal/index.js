import React, { Component } from "react";
import { View } from "react-native";
import { Colors } from "../../../configs";
import Styles from "./style";
import { TextLX, TextM } from "../../derivatives/Text";
import { ImageIllustration } from "../../derivatives/Image";
import { BottomButtonGroup as BottomButtonGroupCard } from "../../cards";
import { Padder as PadderContainer, Modal as ModalContainer } from "../index";

export default class SuccessModal extends Component {
  renderBottom() {
    return (
      <BottomButtonGroupCard
        transparentBackground
        inverse={this.props.inverse}
        submitLabel={this.props.buttonLabel}
        cancelLabel={this.props.cancelLabel}
        onSubmit={this.props.onConfirm ? () => this.props.onConfirm() : {}}
        onCancel={this.props.onCancel}
      />
    );
  }

  renderBottomPadding() {
    if (!this.props.cancelLabel || !this.props.onCancel) {
      return false;
    }

    return <View style={Styles.bottomPadder} />;
  }

  render() {
    return (
      <ModalContainer
        isActive={this.props.isActive}
        bottomContent={this.renderBottom()}
        backgroundColor={
          this.props.inverse ? Colors.main.baseOrange : Colors.main.baseWhite
        }
        inverse={this.props.inverse}
        onClosePress={this.props.onClosePress}
        floatingHeader={this.props.floatingHeader}
        scrollable={this.props.scrollable}
      >
        <PadderContainer style={Styles.container}>
          <View style={Styles.top.container}>
            <View style={Styles.top.image.container}>
              <ImageIllustration
                name={this.props.image ? "modal." + this.props.image : null}
              />
            </View>
          </View>

          <View style={Styles.bottom}>
            <TextLX
              align={"center"}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ marginBottom: 24 }}
              color={
                this.props.inverse
                  ? Colors.main.baseWhite
                  : Colors.main.fontGray
              }
            >
              {this.props.title}
            </TextLX>

            <TextM
              align={"center"}
              color={
                this.props.inverse
                  ? Colors.main.baseWhite
                  : Colors.main.baseGray
              }
            >
              {this.props.message}
            </TextM>

            {this.renderBottomPadding()}
          </View>
        </PadderContainer>
      </ModalContainer>
    );
  }
}

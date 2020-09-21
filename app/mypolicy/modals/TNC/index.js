import React, { Component } from "react";
import { View, ScrollView, Keyboard } from "react-native";
import Styles from "./style";
import PropTypes from "prop-types";
import { TextLX } from "../../components/derivatives/Text";
import {
  Padder as PadderContainer,
  Modal as ModalContainer,
  VerticalAnimator as VerticalAnimatorContainer,
  HTML as HTMLContainer,
} from "../../components/containers";
import TnCDummy from "../../dummies/Tnc";
import { BottomButtonGroup as BottomButtonGroupCard } from "../../components/cards";

export default class TNC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transparentBackground: props.backgroundImage ? true : false,
    };
    if (props.backgroundImage) {
      Keyboard.addListener("keyboardDidShow", () =>
        this.setState({ transparentBackground: false })
      );
      Keyboard.addListener("keyboardDidHide", () =>
        this.setState({ transparentBackground: true })
      );
    }
  }

  renderTitle() {
    const data =
      this.props.type && TnCDummy[this.props.type]
        ? TnCDummy[this.props.type]
        : TnCDummy.main;
    if (this.props.type) {
      return (
        <View style={Styles.title.container}>
          <TextLX>{data.title}</TextLX>
        </View>
      );
    }
    return (
      <View style={Styles.title.container}>
        <TextLX>
          {this.props.language
            ? this.props.language === "ID"
              ? data.titleIn
              : data.titleEn
            : data.title}
        </TextLX>
      </View>
    );
  }

  renderContent() {
    const data =
      this.props.type && TnCDummy[this.props.type]
        ? TnCDummy[this.props.type]
        : TnCDummy.main;
    if (this.props.type) {
      return (
        <VerticalAnimatorContainer order={4}>
          <HTMLContainer html={data.content} />
        </VerticalAnimatorContainer>
      );
    }
    return (
      <VerticalAnimatorContainer order={4}>
        <HTMLContainer
          html={
            this.props.language
              ? this.props.language === "ID"
                ? data.contentIn
                : data.contentEn
              : data.content
          }
        />
      </VerticalAnimatorContainer>
    );
  }

  renderBottom() {
    return (
      <VerticalAnimatorContainer
        order={this.props.bottomOrder ? this.props.bottomOrder : 5}
      >
        <BottomButtonGroupCard
          submitLabel={this.props.buttonLabel}
          onSubmit={
            this.props.onSubmitButton ? () => this.props.onSubmitButton() : {}
          }
          
          text={this.props.bottomText}
          backgroundColor={this.props.backgroundColor}
          transparentBackground={this.state.transparentBackground}
        />
      </VerticalAnimatorContainer>
    );
  }

  render() {
    const data =
      this.props.type && TnCDummy[this.props.type]
        ? TnCDummy[this.props.type]
        : TnCDummy.main;
    console.log(TnCDummy[this.props.type]);
    return (
      <ModalContainer
        isActive={this.props.isActive}
        onClosePress={() => this.props.onClose()}
        scrollable
        persistScrollTitle={data.title}
      >
        <PadderContainer>
          <ScrollView style={{ paddingBottom: this.props.button ? 100 : 10 }}>
            {this.renderTitle()}

            {this.renderContent()}
          </ScrollView>
        </PadderContainer>
        {this.props.button ? this.renderBottom() : null}
      </ModalContainer>
    );
  }

  static propTypes = {
    language: PropTypes.string,
    button: PropTypes.bool,
    onClose: PropTypes.func,
    type: PropTypes.string,
    isActive: PropTypes.bool,
    bottomOrder: PropTypes.number,
    buttonLabel: PropTypes.string,
    onSubmitButton: PropTypes.func,
    bottomText: PropTypes.string,
    backgroundColor: PropTypes.number,
  };
}

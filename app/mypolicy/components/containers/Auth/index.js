/* eslint-disable react-native/no-raw-text */
import React, { Component } from "react";
import { View, Keyboard } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors } from "../../../configs";
import Styles from "./style";
import { TextLX, TextM } from "../../derivatives/Text";
import { BottomButtonGroup as BottomButtonGroupCard } from "../../cards";
import {
  Padder as PadderContainer,
  Base as BaseContainer,
  HorizontalAnimator as HorizontalAnimatorContainer,
  VerticalAnimator as VerticalAnimatorContainer
} from "../index";
import { metaHelpers } from "@pru-rt-internal/pulse-common";
import { PruHeaderText } from "../../../../components";

const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_STEP = "step";

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transparentBackground: !!props.backgroundImage ? true : false
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

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state != nextState) {
      return true;
    }

    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  renderTitle() {
    let subTitle = null;
    let stepTitle = null;

    if (this.props.subTitle) {
      subTitle = (
        <TextM
          style={[
            Styles.subTitle,
            this.props.noSubtitleMargin ? { marginTop: 0 } : {}
          ]}
          color={Colors.main.baseGray}
        >
          {this.props.subTitle}
        </TextM>
      );
    }

    if (this.props.steps) {
      const steps = this.props.steps.split("|");
      stepTitle = (
        <TextM color={Colors.main.baseRed}>
          {claimMeta(KEY_CLAIM_STEP).label + " "}
          <TextM bold color={Colors.main.baseRed}>
            {steps[0]} / {steps[1]}
          </TextM>
        </TextM>
      );
    }

    return (
      <PadderContainer
        style={[
          Styles.title.container,
          this.props.titleMargin ? { marginBottom: this.props.titleMargin } : {}
        ]}
      >
        {stepTitle}

        <PruHeaderText text={this.props.title} />

        {subTitle}
      </PadderContainer>
    );
  }

  renderBottom() {
    return (
      <VerticalAnimatorContainer
        order={this.props.bottomOrder ? this.props.bottomOrder : 5}
      >
        <BottomButtonGroupCard
          submitLabel={this.props.buttonLabel}
          onSubmit={this.props.onSubmit ? () => this.props.onSubmit() : {}}
          text={this.props.bottomText}
          backgroundColor={this.props.backgroundColor}
          transparentBackground={this.state.transparentBackground}
        />
      </VerticalAnimatorContainer>
    );
  }

  renderBackgroundContent() {
    // if (!this.props.backgroundImage) {
    return null;
    // }

    // return (
    //   <View style={Styles.background.container}>
    //     <ImageIllustration
    //       name={"background." + this.props.backgroundImage}
    //       style={Styles.background.content}
    //     />
    //   </View>
    // );
  }

  render() {
    return (
      <BaseContainer
        bottomContent={this.props.buttonLabel ? this.renderBottom() : null}
        onBackPress={
          this.props.onBackPress
            ? () => this.props.onBackPress()
            : () => this.props.navigation.pop()
        }
        persistScrollTitle={this.props.title}
        backgroundColor={this.props.backgroundColor}
        backgroundContent={this.renderBackgroundContent()}
        rightHeaderRender={this.props.rightHeaderRender}
      >
        <HorizontalAnimatorContainer order={1}>
          {this.renderTitle()}
        </HorizontalAnimatorContainer>

        {this.props.children}

        <View style={Styles.bottomPadding} />
      </BaseContainer>
    );
  }
}

const claimMeta = key => {
  return metaHelpers.findElement(TYPE_CLAIM, key);
};

export default withNavigation(Auth);

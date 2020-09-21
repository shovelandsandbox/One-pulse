/* eslint-disable react-native/no-raw-text */
import React, { Component } from "react";
import {
  View,
  Keyboard,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes } from "../../../configs";
import Styles from "./style";
import { TextLX, TextM } from "../../derivatives/Text";
import { BottomButtonGroup as BottomButtonGroupCard } from "../../cards";
import {
  Padder as PadderContainer,
  Base as BaseContainer,
  HorizontalAnimator as HorizontalAnimatorContainer,
  VerticalAnimator as VerticalAnimatorContainer,
} from "../index";
import { metaHelpers } from "@pru-rt-internal/pulse-common";
import { PruHeaderText } from "../../../../components";
import { LEFT_ARROW } from "../../../../config/images";
const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_STEP = "step";

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transparentBackground: !!props.backgroundImage ? true : false,
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
            this.props.noSubtitleMargin ? { marginTop: 0 } : {},
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
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.2)",
          bottom: 0,
          paddingLeft: 30,
          height: 43,
          justifyContent: "center",
        }}
      >
        {stepTitle}

        <PruHeaderText
          text={this.props.title}
          style={{
            color: Colors.main.baseWhite,
            textAlign: "left",
            fontFamily: "Avenir-Heavy",
            fontWeight: "500",
            fontSize: 16,
          }}
        />

        {subTitle}
      </View>
    );
  }

  renderBottom() {
    return (
      <BottomButtonGroupCard
        isRow={true}
        submitLabel={this.props.buttonLabel}
        onSubmit={this.props.onSubmit ? () => this.props.onSubmit() : {}}
        text={this.props.bottomText}
        backgroundColor={this.props.backgroundColor}
        transparentBackground={this.state.transparentBackground}
        cancelLabel={"Cancel"}
        onCancel={
          this.props.onBackPress
            ? () => this.props.onBackPress()
            : () => this.props.navigation.pop()
        }
      />
    );
  }

  renderBackgroundContent() {
    if (!this.props.backgroundImage) {
      return null;
    }

    return (
      <ImageBackground
        style={{ width: Sizes.screen.width, height: 145 }}
        source={this.props.backgroundImage}
        height={145}
        resizeMode={"stretch"}
      />
    );
  }

  render() {
    return (
      <View style={Styles.container}>
        <ImageBackground
          style={Styles.imageStyle}
          source={this.props.backgroundImage}
          height={145}
          resizeMode={"cover"}
        >
          <View style={Styles.backContainer}>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={
                this.props.onBackPress
                  ? () => this.props.onBackPress()
                  : () => this.props.navigation.pop()
              }
            >
              <Image source={LEFT_ARROW} width={15} height={12.5} />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            {this.renderTitle()}
          </View>
        </ImageBackground>
        <ScrollView>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : null}
          >
            {this.props.children}
            <View style={{ marginTop: 48 }}>
              {this.props.buttonLabel && this.renderBottom()}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const claimMeta = key => {
  return metaHelpers.findElement(TYPE_CLAIM, key);
};

export default withNavigation(Auth);

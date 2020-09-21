import React, { Component } from "react";
import { View, Animated } from "react-native";
import Styles from "./style";
import { Colors } from "../../configs";
import { TextM } from "../../components/derivatives/Text";
import { ImageIllustration } from "../../components/derivatives/Image";
import {
  Padder as PadderContainer,
  Modal as ModalContainer,
} from "../../components/containers";

const BASE = 32;
const POS_1 = BASE + 1;
const POS_2 = BASE * 2 + 1;

const SIZE = 20;
const DURATION = 250;

export default class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icon1: {
        opacity: new Animated.Value(1),
        top: new Animated.Value(0),
        size: new Animated.Value(SIZE),
        left: new Animated.Value(0),
      },
      icon2: {
        opacity: new Animated.Value(1),
        top: new Animated.Value(0),
        size: new Animated.Value(SIZE),
        left: new Animated.Value(POS_1),
      },
      icon3: {
        opacity: new Animated.Value(1),
        top: new Animated.Value(0),
        size: new Animated.Value(SIZE),
        left: new Animated.Value(POS_2),
      },
      icon4: {
        opacity: new Animated.Value(0),
        top: new Animated.Value(SIZE / 2),
        size: new Animated.Value(0),
        left: new Animated.Value(SIZE / 2),
      },
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    const { icon1, icon2, icon3, icon4 } = this.state;

    Animated.loop(
      Animated.sequence([
        // STEP 1
        Animated.parallel([
          ...this.start(icon4),
          ...this.shift1(icon1),
          ...this.shift2(icon2),
          ...this.end(icon3),
        ]),
        Animated.delay(DURATION),

        //STEP 2
        Animated.parallel([
          ...this.start(icon3),
          ...this.shift1(icon4),
          ...this.shift2(icon1),
          ...this.end(icon2),
        ]),
        Animated.delay(DURATION),

        // STEP 3
        Animated.parallel([
          ...this.start(icon2),
          ...this.shift1(icon3),
          ...this.shift2(icon4),
          ...this.end(icon1),
        ]),
        Animated.delay(DURATION),

        //STEP 4
        Animated.parallel([
          ...this.start(icon1),
          ...this.shift1(icon2),
          ...this.shift2(icon3),
          ...this.end(icon4),
        ]),
        Animated.delay(DURATION),
      ])
    ).start();
  }

  animate(target, value, isInstant = false) {
    let duration = DURATION;
    if (isInstant) {
      duration = 0;
    }

    return Animated.timing(target, {
      toValue: value,
      duration: duration,
      delay: 0,
    });
  }

  shift1(obj) {
    return [this.animate(obj.left, POS_1)];
  }

  shift2(obj) {
    return [this.animate(obj.left, POS_2)];
  }

  start(obj) {
    return [
      this.animate(obj.opacity, 1),
      this.animate(obj.size, SIZE),
      this.animate(obj.top, 0),
      this.animate(obj.left, 0, true),
    ];
  }

  end(obj) {
    return [
      this.animate(obj.opacity, 0),
      this.animate(obj.size, 0),
      this.animate(obj.top, SIZE / 2),
      this.animate(obj.left, BASE * 2 + SIZE / 2),
    ];
  }

  renderIconItem(icon, color, item) {
    const { opacity, left, size, top } = this.state[item];

    return (
      <Animated.View
        style={[
          Styles.icon.container,
          {
            top: top,
            left: left,
            opacity: opacity,
            width: size,
            height: size,
          },
        ]}
      >
        <ImageIllustration name={"menu." + icon} resizeMode="cover" />
      </Animated.View>
    );
  }

  renderIcons() {
    return (
      <View
        style={[
          Styles.icon.grouper,
          {
            width: BASE * 3 - SIZE / 2 + 1,
            height: SIZE,
          },
        ]}
      >
        {this.renderIconItem("my_policy", "qr", "icon1")}
        {this.renderIconItem("hospital_finder", "heart", "icon2")}
        {this.renderIconItem("symptoms_check", "pin", "icon3")}
        {this.renderIconItem("health_check", "stethoscope", "icon4")}
      </View>
    );
  }

  renderTitle() {
    return (
      <TextM color={Colors.main.inactiveGray} align="center">
        {this.props.title}
      </TextM>
    );
  }

  render() {
    console.log(this.props);
    if (this.props.onClose) {
      return (
        <ModalContainer
          isActive={this.props.isActive}
          animationType={"fade"}
          onClosePress={() => this.props.onClose()}
        >
          <PadderContainer style={Styles.container}>
            {this.renderIcons()}
            {this.renderTitle()}
          </PadderContainer>
        </ModalContainer>
      );
    }
    return (
      <ModalContainer isActive={this.props.isActive} animationType={"fade"}>
        <PadderContainer style={Styles.container}>
          {this.renderIcons()}
          {this.renderTitle()}
        </PadderContainer>
      </ModalContainer>
    );
  }
}

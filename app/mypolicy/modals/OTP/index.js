import React, { Component } from "react";
import { View, TextInput, Animated, Linking, Text } from "react-native";
import PropTypes from "prop-types";
import { Colors, Sizes } from "../../configs";
import Styles from "./style";
import { isNil } from "ramda";
import { TextM, TextS, TextLX } from "../../components/derivatives/Text";
import { ImageIllustration } from "../../components/derivatives/Image";
import {
  Padder as PadderContainer,
  Modal as ModalContainer,
} from "../../components/containers";

const BASE = 45;
const POS_1 = BASE + 1;
const POS_2 = BASE * 2 + 1;

const SIZE = 32;
const DURATION = 250;

import { metaHelpers } from "@pru-rt-internal/pulse-common";

const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_OTP_DESC = "otp_description";
const KEY_CLAIM_OTP_COUNTDOWN = "otp_countdown";
const KEY_CLAIM_OTP_RESEND = "otp_resend_button";
const KEY_CLAIM_OTP_QUESTION = "otp_resend_question";
const KEY_CLAIM_OTP_PHONE_INVALID = "otpnumberfalse";
const KEY_CLAIM_OTP_CALL_US = "otpcallus";

export default class OTPModal extends Component {
  // region PROPTYPES AND LIFECYCLE HOOKS

  static propTypes = {
    error: PropTypes.any,
    isActive: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    phoneNumber: PropTypes.string,
    onResend: PropTypes.func,
    loadingPin: PropTypes.bool,
    countResend: PropTypes.number,
    otpTitle: PropTypes.string,
    otpMessage: PropTypes.string,
    requestResend: PropTypes.bool,
    isdCode: PropTypes.string,
  };

  static defaultProps = {
    loadingPin: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      pins: "",
      timeLimit: 60 * 1,
      lapsedTime: 0,
      appState: null,
      isFocused: false,
      marginTopContainer: 15,

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

    this.counter = null;
    this.onConfirm = this.onConfirm.bind(this);
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

  componentDidUpdate(prevProps) {
    if (prevProps.isActive !== this.props.isActive) {
      if (this.props.isActive) {
        const _this = this;
        this.counter = setInterval(() => {
          _this.setState({
            lapsedTime: _this.state.lapsedTime + 1,
          });
        }, 1000);
      } else {
        clearInterval(this.counter);
      }
    }
    if (prevProps.countResend !== this.props.countResend) {
      if (this.props.requestResend) {
        this.setState({ timeLimit: 60 * 1, lapsedTime: 0 }, () => {
          const _this = this;
          this.counter = setInterval(() => {
            _this.setState({
              lapsedTime: _this.state.lapsedTime + 1,
            });
          }, 1000);
        });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      if (nextState.lapsedTime >= nextState.timeLimit) {
        clearInterval(this.counter);
      }

      return true;
    }

    return this.props !== nextProps;
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

  onConfirm(pins) {
    if (this.props.onConfirm) {
      setTimeout(() => this.props.onConfirm(pins), 100);
    }
  }

  onPinTyped(pins) {
    this.setState({
      pins,
    });

    if (pins.length === 6) {
      if (this.props.onConfirm) {
        this.props.onConfirm(pins);
      }
    }
  }

  getRemainingTime() {
    const remainings = this.state.timeLimit * 1 - this.state.lapsedTime;
    let minutes = Math.floor(remainings / 60);
    let seconds = remainings - minutes * 60 + "";
    if (minutes.length === 1) {
      minutes = "0" + minutes;
    }

    if (seconds.length === 1) {
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
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
        {this.renderIconItem("circle", "color", "icon1")}
        {this.renderIconItem("circle", "color", "icon2")}
        {this.renderIconItem("circle", "color", "icon3")}
        {this.renderIconItem("circle", "color", "icon4")}
      </View>
    );
  }

  renderTitle() {
    return (
      <TextLX color={Colors.main.fontGray} align="center">
        {this.props.otpTitle}
      </TextLX>
    );
  }

  renderMessage() {
    return (
      <TextM
        color={Colors.main.baseGray}
        style={Styles.message.container}
        align="center"
      >
        {this.props.otpMessage}
      </TextM>
    );
  }

  renderLoadingImage() {
    return (
      <View style={Styles.loadingImage.wrapper}>
        <View style={Styles.loadingImage.container}>
          <ImageIllustration name={"modal.otp"} />
        </View>
      </View>
    );
  }

  renderImage() {
    return (
      <View style={Styles.image.container}>
        <ImageIllustration name="modal.otp" />
      </View>
    );
  }

  renderTextCounter() {
    if (this.state.timeLimit <= this.state.lapsedTime) {
      return (
        <TextM align={"center"}>
          {claimMeta(KEY_CLAIM_OTP_QUESTION).label}
          <Text> </Text>
          <TextM color={Colors.main.baseRed} onPress={this.props.onResend}>
            {claimMeta(KEY_CLAIM_OTP_RESEND).label}
          </TextM>
        </TextM>
      );
    }

    return (
      <TextM style={Styles.otpDescription} align={"center"}>
        {claimMeta(KEY_CLAIM_OTP_COUNTDOWN).label}
        <Text> </Text>
        {this.getRemainingTime()}
      </TextM>
    );
  }

  renderPinCircle(index) {
    return (
      <View
        style={[
          Styles.pinCircle.circle,
          this.state.pins.length > index
            ? { backgroundColor: Colors.main.baseRed }
            : {},
        ]}
      />
    );
  }

  renderContainerPin() {
    if (this.props.loadingPin) {
      return (
        <View style={Styles.pinCircle.innerGrouper}>{this.renderIcons()}</View>
      );
    }
  }

  renderError() {
    if (!this.props.error) {
      return null;
    }

    return (
      <TextS color={Colors.main.errorRed} style={Styles.error.text}>
        {this.props.error}
      </TextS>
    );
  }

  renderMaskingPhoneNumber = () => {
    const { isdCode, phoneNumber } = this.props;
    const mask = "X";
    const isdCodePrefix = "+";
    let isdCodeOffset = 0;

    if (isNil(phoneNumber) || phoneNumber < 4) return phoneNumber;

    const phoneNumberLength = phoneNumber.length;

    if (phoneNumber.startsWith(isdCode)) {
      isdCodeOffset = isdCode.length;
    } else if (phoneNumber.startsWith(isdCodePrefix.concat(isdCode))) {
      isdCodeOffset = isdCode.length + 1;
    }

    let phone = phoneNumber.substring(isdCodeOffset, phoneNumberLength);

    phone =
      isdCodePrefix.concat(isdCode) +
      mask.repeat(phone.length - 4) +
      phoneNumber.substring(phoneNumberLength - 4, phoneNumberLength);

    return phone;
  };

  render() {
    const { loadingPin, phoneNumber } = this.props;
    if (loadingPin)
      return (
        <ModalContainer
          isActive={this.props.isActive}
          onClosePress={() => this.props.onClose()}
          floatingHeader
        >
          <PadderContainer
            style={[
              Styles.container,
              {
                paddingTop: Sizes.screen.height / this.state.marginTopContainer,
              },
            ]}
          >
            {this.renderImage()}

            <TextM align={"center"}>
              {claimMeta(KEY_CLAIM_OTP_DESC).label + " "}
              {phoneNumber}
            </TextM>

            {this.renderContainerPin()}
            {this.renderTitle()}
            {this.renderMessage()}
          </PadderContainer>
        </ModalContainer>
      );
    return (
      <ModalContainer
        isActive={this.props.isActive}
        onClosePress={() => this.props.onClose()}
        floatingHeader
      >
        <PadderContainer style={Styles.container}>
          {this.renderImage()}

          <TextM align={"center"}>
            {claimMeta(KEY_CLAIM_OTP_DESC).label + " "}
            {this.renderMaskingPhoneNumber()}
          </TextM>
          <View style={Styles.otpContainer}>
            <TextInput
              style={Styles.otpText}
              keyboardType={"phone-pad"}
              maxLength={6}
              autoFocus={true}
              autoCorrect={false}
              autoComplete={"off"}
              autoCapitalize={"none"}
              returnKeyType={"done"}
              onChangeText={text => this.onPinTyped(text.toString())}
              onFocus={() => {
                this.setState({
                  isFocused: true,
                  marginTopContainer: 10,
                });
              }}
              onBlur={() => {
                this.setState({
                  isFocused: false,
                  marginTopContainer: 15,
                });
              }}
            />
          </View>
          {this.renderError()}
          {this.renderTextCounter()}
          <TextM style={Styles.otpDescription} align={"center"}>
            {claimMeta(KEY_CLAIM_OTP_PHONE_INVALID).label + " "}
            <TextM
              onPress={() => Linking.openURL("tel:" + "1500085")}
              color={Colors.main.baseRed}
            >
              {claimMeta(KEY_CLAIM_OTP_CALL_US).label}
            </TextM>
            <Text> </Text>
          </TextM>
        </PadderContainer>
      </ModalContainer>
    );
  }
}

const claimMeta = key => {
  const entry = metaHelpers.findElement(TYPE_CLAIM, key);
  return entry && entry.label ? entry : { label: key };
};

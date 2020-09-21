/* eslint-disable complexity */
import React from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import {
  SHOW_PASSWORD,
  HIDE_PASSWORD,
  ACCOUNT_ARROW,
  CAMERA_ICON,
} from "../../config/images";
import { configureLineHeight } from "../../utils/lineHeightsUtils";
import Style from "./styles";

export default class NewTextInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.presetValue,
      focused: false,
      showPassword: false,
      displayTitle: props.shouldDisplayTitle ? props.placeholder : " ",
      presentingTitle: false,
    };
  }

  componentWillReceiveProps(props) {
    const { focused } = this.state;
    if (focused) {
      return;
    }
    const pv = props.presetValue;
    if (pv) {
      this.setState({
        value: pv,
      });
      if (pv != "" && pv != undefined) {
        this._displayTitle(true);
      } else {
        this._displayTitle(false);
      }
    }
  }

  loadSideImage = () => {
    const { onClickSideImage } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          onClickSideImage ? onClickSideImage() : {};
        }}
        style={{ height: 20 }}
      >
        <Image
          style={{ height: 30, width: 30 }}
          resizeMode={"contain"}
          source={CAMERA_ICON}
        />
      </TouchableOpacity>
    );
  };

  _displayTitle(s) {
    if (!this.props.shouldDisplayTitle) {
      this.setState({
        displayTitle: " ",
      });
      return;
    }
    if (s) {
      this.setState({
        displayTitle: this.props.placeholder,
      });
    } else {
      this.setState({
        displayTitle: " ",
      });
    }
  }

  componentDidMount() {
    if (this.state.value != "" && this.state.value != undefined) {
      this._displayTitle(true);
    } else {
      this._displayTitle(false);
    }
  }

  _togglePasswordShowHidden() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  customInput = () => {
    const {
      onBlur,
      onFocus,
      onChange,
      onSubmit,
      DownArrow,
      isEnabled,
      autoFocus,
      maxLength,
      isEditable,
      autoCorrect,
      placeholder,
      presetValue,
      passwordMode,
      keyboardType,
      returnKeyType,
      inputRectStyle,
      hidePlaceHolderWhenFocused,
      restrictSpace,
      subTitle,
      values,
      buttonText,
      buttonAction,
      buttonType,
      profile,
      showSideImage,
      multiline,
      numberOfLines
    } = this.props;
    const { focused, showPassword, value } = this.state;
    const styles = profile ? Style.profileInputRect : Style.inputRect;
    return (
      <View style={{ flexDirection: "row", flex: 1 }}>
        {subTitle ? <Text style={{
          ...Style.subtitleText,
          ...configureLineHeight("13")
        }}>
          {subTitle}
        </Text> : null}
        {presetValue && values ? (
          <Text style={{
            ...Style.presetValueText,
            ...configureLineHeight("13")
          }}>
            {values}
          </Text>
        ) : null}

        <TextInput
          maxLength={maxLength ? maxLength : 100}
          autoCorrect={autoCorrect}
          value={value}
          multiline={multiline || false}
          numberOfLines={numberOfLines || 1}
          placeholderTextColor={"grey"}
          returnKeyType={returnKeyType || "default"}
          defaultValue={presetValue}
          keyboardType={keyboardType}
          secureTextEntry={passwordMode && !showPassword}
          style={[styles, inputRectStyle]}
          placeholder={
            hidePlaceHolderWhenFocused
              ? focused
                ? " "
                : placeholder
              : placeholder
          }
          onChangeText={content => {
            content = restrictSpace ? content.replace(/\s/g, "") : content;
            this.setState({ value: content }, () => {
              this._displayTitle(value != "" || value != undefined);
            });

            onChange && onChange(content);
          }}
          onSubmitEditing={e => {
            onSubmit && onSubmit(e.nativeEvent.text);
            this._displayTitle(focused || value.length > 0);
          }}
          editable={isEditable === undefined ? isEnabled : isEditable}
          onFocus={e => {
            this.setState(
              {
                focused: true,
              },
              () => {
                this._displayTitle(true);
                onFocus && onFocus(e);
              }
            );
          }}
          autoFocus={autoFocus}
          onBlur={e => {
            this.setState(
              {
                focused: false,
              },
              () => {
                onBlur && onBlur(e);
                this._displayTitle(value && value.length > 0);
              }
            );
          }}
        />

        {passwordMode ? (
          <TouchableOpacity
            style={Style.passwordToggle}
            onPress={this._togglePasswordShowHidden.bind(this)}
          >
            <Image
              style={Style.passwordToggleImg}
              source={showPassword ? SHOW_PASSWORD : HIDE_PASSWORD}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        ) : null}
        {DownArrow ? (
          <View style={Style.passwordToggle}>
            <Image
              style={
                profile
                  ? Style.profilePasswordToggleImg
                  : Style.passwordToggleImg
              }
              source={ACCOUNT_ARROW}
              resizeMode={"contain"}
            />
          </View>
        ) : null}
        {buttonText ? (
          buttonType ? (
            <TouchableOpacity
              style={Style.buttonToggle}
              onPress={() => buttonAction && buttonAction()}
            >
              <Text style={{
                ...Style.buttonText,
                ...configureLineHeight("13")
              }}>
                {buttonText}
              </Text>
            </TouchableOpacity>
          ) : (
              <View style={Style.buttonToggle}>
                <Text style={{
                  ...Style.buttonText,
                  ...configureLineHeight("13")
                }}>
                  {buttonText}
                </Text>
              </View>
            )
        ) : null}
        {showSideImage && this.loadSideImage()}
      </View>
    );
  };

  render() {
    const {
      exception,
      DownArrow,
      isEnabled,
      isEditable,
      tipMessage,
      errorMessage,
      showTipsOnFocus,
      buttonModeAction,
      profile,
      showUnderLine = true,
    } = this.props;
    const { focused } = this.state;
    const HeaderStyle = profile
      ? Style.profileHeaderTextColor
      : isEnabled
        ? Style.title
        : Style.disabledTitle;

    const title = this.props.title || this.props.placeholder;
    return (
      <View style={Style.base}>
        <Text style={{...HeaderStyle, ...configureLineHeight("13")}}>
          {title}
        </Text>
        {DownArrow ? (
          <TouchableOpacity
            onPress={() => {
              buttonModeAction && buttonModeAction();
            }}
          >
            {this.customInput()}
          </TouchableOpacity>
        ) : (
            this.customInput()
          )}
        {showUnderLine ? (
          <View
            style={{
              height: this.state.focused ? 1 : 1,
              backgroundColor: exception
                ? "#E87722"
                : isEditable
                  ? isEnabled
                    ? "#515b61"
                    : "#A7A8AA"
                  : "#A7A8AA",
              marginTop: 5,
            }}
          />
        ) : null}
        <Text
          style={{
            ...Style.errorMessageStyle,
            color: exception ? "#E87722" : "#515b61",
            ...configureLineHeight("13")
          }}
        >
          {exception
            ? errorMessage
            : showTipsOnFocus && focused
              ? tipMessage
              : " "}
        </Text>
      </View>
    );
  }
}

NewTextInput.propTypes = {
  placeholder: PropTypes.string,
  exception: PropTypes.bool,
  errorMessage: PropTypes.string,
  tipMessage: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  showTipsOnFocus: PropTypes.bool,
  passwordMode: PropTypes.bool,
  presetValue: PropTypes.string,
  autoCorrect: PropTypes.bool,
  inputRectStyle: PropTypes.object,
  shouldDisplayTitle: PropTypes.bool,
  maxLength: PropTypes.number,
  DownArrow: PropTypes.bool,
  isEnabled: PropTypes.bool,
  isEditable: PropTypes.bool,
  hidePlaceHolderWhenFocused: PropTypes.bool,
  keyboardType: PropTypes.string,
  buttonModeAction: PropTypes.func,
  returnKeyType: PropTypes.string,
  subTitle: PropTypes.string,
  showSideImage: PropTypes.bool,
  profile: PropTypes.bool,
  onClickSideImage: PropTypes.func,
  autoFocus: PropTypes.bool,
  title: PropTypes.string,
};

NewTextInput.defaultProps = {
  shouldDisplayTitle: true,
  isEnabled: true,
  isEditable: true,
  hidePlaceHolderWhenFocused: true,
  keyboardType: "default",
  buttonMode: false,
  subTitle: null,
  hideTitle: true,
};

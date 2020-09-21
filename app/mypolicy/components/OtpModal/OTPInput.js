import React, { PureComponent } from "react";
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Clipboard,
  Keyboard,
  Platform,
} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

export default class OTPInput extends PureComponent {
  static propTypes = {
    pinCount: PropTypes.number,
    codeInputFieldStyle: PropTypes.object,
    onCodeFilled: PropTypes.func,
    onCodeChanged: PropTypes.func,
    autoFocusOnLoad: PropTypes.bool,
    code: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    clearInputs: PropTypes.bool,
    placeholderCharacter: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    pinCount: 6,
    codeInputFieldStyle: null,
    codeInputHighlightStyle: null,
    onCodeFilled: null,
    autoFocusOnLoad: true,
    secureTextEntry: false,
    clearInputs: false,
    placeholderCharacter: "",
    placeholderTextColor: null,
    style: null,
  };

  fields = [];

  constructor(props) {
    super(props);
    const { code } = props;
    this.state = {
      digits: code === undefined ? [] : code.split(""),
      selectedIndex: 0,
    };
    this.keyboardType = "number-pad";
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { code } = this.props;
    if (nextProps.code !== code) {
      this.setState({
        digits: nextProps.code === undefined ? [] : nextProps.code.split(""),
      });
    }
  }

  componentDidMount() {
    this.copyCodeFromClipBoardOnAndroid();
    this.bringUpKeyBoardIfNeeded();
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.handleKeyboardDidHide
    );
  }

  componentWillUnmount() {
    if (this._timer) {
      clearInterval(this._timer);
    }
    this.keyboardDidHideListener.remove();
  }

  copyCodeFromClipBoardOnAndroid = () => {
    if (Platform.OS === "android") {
      this.checkPinCodeFromClipBoard();
      this._timer = setInterval(() => {
        this.checkPinCodeFromClipBoard();
      }, 400);
    }
  };

  bringUpKeyBoardIfNeeded = () => {
    const { autoFocusOnLoad, pinCount } = this.props;
    const digits = this.getDigits();
    const focusIndex = digits.length ? digits.length - 1 : 0;
    if (focusIndex < pinCount && autoFocusOnLoad) {
      this.focusField(focusIndex);
    }
  };

  getDigits = () => {
    const { digits: innerDigits } = this.state;
    const { code } = this.props;
    return code === undefined ? innerDigits : code.split("");
  };

  handleKeyboardDidHide = () => {
    //this.blurAllFields()
  };

  notifyCodeChanged = () => {
    const { digits } = this.state;
    const code = digits.join("");
    const { onCodeChanged } = this.props;
    if (onCodeChanged) {
      onCodeChanged(code);
    }
  };

  checkPinCodeFromClipBoard = () => {
    const { pinCount } = this.props;
    Clipboard.getString()
      .then(code => {
        if (
          this.hasCheckedClipBoard &&
          code.length === pinCount &&
          this.clipBoardCode !== code
        ) {
          this.setState(
            {
              digits: code.split(""),
            },
            () => {
              this.blurAllFields();
              this.notifyCodeChanged();
            }
          );
        }
        this.clipBoardCode = code;
        this.hasCheckedClipBoard = true;
      })
      .catch();
  };

  // eslint-disable-next-line complexity
  handleChangeText = (index, text) => {
    const { onCodeFilled, pinCount } = this.props;
    const digits = this.getDigits();
    let newDigits = digits.slice();
    const oldTextLength = newDigits[index] ? newDigits[index].length : 0;
    const newTextLength = text.length;
    if (newTextLength - oldTextLength === pinCount) {
      // user pasted text in.
      newDigits = text.split("").slice(oldTextLength, newTextLength);
      this.setState({ digits: newDigits }, this.notifyCodeChanged);
    } else {
      if (text.length === 0) {
        if (newDigits.length > 0) {
          newDigits = newDigits.slice(0, newDigits.length - 1);
        }
      } else {
        text.split("").forEach(value => {
          newDigits[index] = value;
          index += 1;
        });
        index -= 1;
      }
      this.setState({ digits: newDigits }, this.notifyCodeChanged);
    }

    const result = newDigits.join("");
    if (result.length >= pinCount) {
      onCodeFilled && onCodeFilled(result);
      this.focusField(pinCount - 1);
      // this.blurAllFields()
    } else {
      if (text.length > 0 && index < pinCount - 1) {
        this.focusField(index + 1);
      }
    }
  };

  handleKeyPressTextInput = (index, key) => {
    const digits = this.getDigits();
    if (key === "Backspace") {
      if (!digits[index] && index > 0) {
        this.handleChangeText(index - 1, "");
        this.focusField(index - 1);
      }
    }
  };

  focusField = index => {
    if (index < this.fields.length) {
      this.fields[index].focus();
      this.setState({
        selectedIndex: index,
      });
    }
  };

  blurAllFields = () => {
    this.fields.forEach(field => field.blur());
    this.setState({
      selectedIndex: -1,
    });
  };

  clearAllFields = () => {
    const { clearInputs, code } = this.props;
    if (clearInputs && code === "") {
      this.setState({ digits: [], selectedIndex: 0 });
    }
  };

  renderOneInputField = (_, index) => {
    const { codeInputFieldStyle, secureTextEntry } = this.props;
    const { defaultTextFieldStyle } = styles;
    const { digits } = this.state;
    const {
      clearInputs,
      placeholderCharacter,
      placeholderTextColor,
    } = this.props;
    const { color: defaultPlaceholderTextColor } = {
      ...defaultTextFieldStyle,
      ...codeInputFieldStyle,
    };
    return (
      <View pointerEvents="none" key={index + "view"} testID="inputSlotView">
        <TextInput
          testID="textInput"
          underlineColorAndroid="rgba(0,0,0,0)"
          style={defaultTextFieldStyle}
          ref={ref => {
            this.fields[index] = ref;
          }}
          onChangeText={text => {
            this.handleChangeText(index, text);
          }}
          onKeyPress={({ nativeEvent: { key } }) => {
            this.handleKeyPressTextInput(index, key);
          }}
          value={!clearInputs ? digits[index] : ""}
          keyboardType={this.keyboardType}
          textContentType={"none"}
          key={index}
          maxLength={1}
          selectionColor="#00000000"
          secureTextEntry={secureTextEntry}
          placeholder={placeholderCharacter}
          placeholderTextColor={
            placeholderTextColor || defaultPlaceholderTextColor
          }
        />
      </View>
    );
  };

  renderTextFields = () => {
    const { pinCount } = this.props;
    const array = new Array(pinCount).fill(0);
    return array.map(this.renderOneInputField);
  };

  render() {
    const { pinCount, style, clearInputs } = this.props;
    const digits = this.getDigits();
    return (
      <View testID="OTPInputView" style={style}>
        <TouchableWithoutFeedback
          style={styles.otpContainer}
          onPress={() => {
            if (!clearInputs) {
              const filledPinCount = digits.filter(digit => {
                return digit !== null && digit !== undefined;
              }).length;
              this.focusField(Math.min(filledPinCount, pinCount - 1));
            } else {
              this.clearAllFields();
              this.focusField(0);
            }
          }}
        >
          <View style={styles.otpFieldsModal}>{this.renderTextFields()}</View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

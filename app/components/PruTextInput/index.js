/* eslint-disable complexity */
import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { isNil } from "ramda";
import styles from "./styles";
import theme from "../../themes/default";

const msgTypeToColor = {
  error: theme.Colors.redEE172A,
};

const msgTypeToBorderColor = {
  error: theme.Colors.redEE172A,
};

const borderColor = messageType => {
  return msgTypeToBorderColor[messageType] || theme.Colors.greyd9dcde;
};

const getStyle = (inStyle, messageType) => {
  return {
    ...inStyle,
    borderColor: borderColor(messageType),
  };
};

export default class PruTextInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  onFocus = e => {
    const { onFocus } = this.props;
    this.setState(
      {
        focused: true,
      },
      () => {
        onFocus && onFocus(e);
      }
    );
  };

  onBlur = e => {
    const { onBlur } = this.props;
    this.setState(
      {
        focused: false,
      },
      () => {
        onBlur && onBlur(e);
      }
    );
  };

  onChangeText = content => {
    const { onChange, restrictPattern, restrictSpace } = this.props;
    let value = content;
    if (restrictPattern) {
      value = content.replace(restrictPattern, "");
    } else if (restrictSpace) {
      value = content.replace(/\s/g, "");
    }
    onChange && onChange(content, value);
  };

  onContainerPress = () => {
    const { onContainerPress } = this.props;
    onContainerPress && onContainerPress();
  };

  render() {
    const {
      title,
      message,
      messageType,
      placeholder,
      txtInputStyle,
      onSubmit,
      underlineColorAndroid,
      value,
      leftComponent,
      containerStyle,
      leftStyle,
      rightComponent,
      rightStyle,
      length,
    } = this.props;
    const selectionColor = this.props.selectionColor;
    const { focused } = this.state;
    const msgColor = msgTypeToColor[messageType];
    const { onChange, ...rest } = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={this.onContainerPress}
      >
        <Text style={styles.title}>{title}</Text>
        <View style={styles.row}>
          {leftComponent && (
            <View style={[styles.left, getStyle(leftStyle, messageType)]}>
              {leftComponent}
            </View>
          )}
          <TextInput
            {...rest}
            value={value}
            maxLength={length == undefined ? 100 : length}
            style={[styles.txtInputStyle, getStyle(txtInputStyle, messageType)]}
            placeholder={focused ? " " : placeholder}
            placeholderTextColor={"#d7d7d7"}
            onChangeText={this.onChangeText}
            onSubmitEditing={e => {
              onSubmit && onSubmit(e.nativeEvent.text);
            }}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            selectionColor={selectionColor}
            underlineColorAndroid={underlineColorAndroid}
          />
          {rightComponent && (
            <View style={[styles.right, getStyle(rightStyle, messageType)]}>
              {rightComponent}
            </View>
          )}
        </View>

        {!isNil(message) && (
          <Text style={{ ...styles.messageText, color: msgColor }}>
            {message}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}

PruTextInput.propTypes = {
  initialValue: PropTypes.string,
  message: PropTypes.string,
  messageType: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  restrictPattern: PropTypes.string,
  restrictSpace: PropTypes.boolean,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  txtInputStyle: PropTypes.object,
  txtInputContainerStyle: PropTypes.object,
  underlineColorAndroid: PropTypes.string,
  selectionColor: PropTypes.string,
  value: PropTypes.string,
  leftComponent: PropTypes.any, //TODO:
  containerStyle: PropTypes.object,
  leftStyle: PropTypes.object,
  rightComponent: PropTypes.any, //TODO:,
  rightStyle: PropTypes.object,
  onContainerPress: PropTypes.func,
  length: PropTypes.int,
};

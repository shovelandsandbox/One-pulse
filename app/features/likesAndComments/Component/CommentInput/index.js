/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import React from "react";
import { TouchableOpacity, Image, TextInput, View } from "react-native";
import { pathOr } from "ramda";
import defaultStyles from "./styles";
import customeStyles from "./customeStyles";

import { HC_COMMENT_SEND } from "../../../../config/images";
class CommentInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
    };
  }

  onChangeText = text => {
    const { error, resetError } = this.props;
    this.setState({ inputText: text });
    if (error) {
      resetError();
    }
  };

  extendedTextStyle = error => {
    return {
      color: error ? "red" : "#393e46",
    };
  };

  render() {
    const { label, onSendText, type = false, error = null } = this.props;
    let { inputText } = this.state;
    const styles = type ? customeStyles : defaultStyles;
    const message = pathOr("", ["message"], error);
    inputText = error ? message : inputText;
    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.textInput, this.extendedTextStyle(error)]}
          onChangeText={text => this.onChangeText(text)}
          placeholder={label}
          placeholderTextColor={"#393e46"}
          value={inputText}
        />
        <TouchableOpacity
          style={styles.sendButtonContainer}
          onPress={() => {
            onSendText(inputText);
            this.onChangeText("");
          }}
        >
          <Image
            source={HC_COMMENT_SEND}
            style={styles.sendButton}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default CommentInput;

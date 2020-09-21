import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { metaFinderAG } from "../utils/meta-utils";

const EditableInput = props => {
  const inputRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [text, setText] = useState(props.text);
  const [collapsed, setCollapsed] = useState(true);

  const onClickOutSide = useCallback(
    e => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setInputVisible(false);
      }
    },
    [setCollapsed]
  );

  const handleChangeText = e => {
    const { text = "" } = e.nativeEvent;
    setText(text);
    props.handleChangeText(text);
  };

  useEffect(() => {
    if (inputVisible) {
      window.addEventListener("mousedown", onClickOutSide);
    }
    return () => {
      window.removeEventListener("mousedown", onClickOutSide);
    };
  }, [collapsed]);

  return (
    <React.Fragment>
      {inputVisible ? (
        <View style={styles.textInputView}>
          <TextInput
            multiline
            numberOfLines={0}
            ref={inputRef}
            value={text}
            style={styles.textInput}
            placeholder={metaFinderAG("EnterComment")}
            clearTextOnFocus
            onChange={e => handleChangeText(e)}
          />
        </View>
      ) : (
        <TouchableOpacity onPress={() => setInputVisible(true)}>
          <Text style={styles.text}>{metaFinderAG("EnterComment")}</Text>
        </TouchableOpacity>
      )}
    </React.Fragment>
  );
};

EditableInput.defaultProps = {
  text: "",
};

EditableInput.propTypes = {
  text: PropTypes.string,
  handleChangeText: PropTypes.func,
};

export default EditableInput;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Avenir-Regular",
    paddingLeft: 10,
    paddingVertical: 5,
  },
  textInput: {
    fontFamily: "Avenir-Regular",
    paddingLeft: 10,
    paddingVertical: 5,
  },
  textInputView: {
    marginLeft: 5,
    paddingLeft: 5,
  },
});

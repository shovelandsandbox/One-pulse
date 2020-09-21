import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import { dispatchEvent } from "../actions";
import { Theme } from "../themes";
const { Colors } = Theme;

const applyShadow = Comp => ({ children, ...props }) => (
  <View
    style={{
      backgroundColor: "white",
      elevation: 3,
      margin: 10,
      borderRadius: props.style.borderRadius ? props.style.borderRadius : 0,
      shadowColor: Colors.black,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    }}
  >
    <Comp {...props}>{children}</Comp>
  </View>
);

const ConnectedTouchable = Comp => ({ children, dispatchEvent, ...props }) => (
  <TouchableOpacity
    onPress={() => {
      if (props.event && dispatchEvent) {
        dispatchEvent(props.event);
      }

      if (props.onPress) {
        props.onPress();
      }
    }}
  >
    <Comp {...props}>{children}</Comp>
  </TouchableOpacity>
);

const makeTouchable = compose(
  connect(null, { dispatchEvent }),
  ConnectedTouchable
);

const makeTouchableHighlight = Comp => ({ children, ...props }) => (
  <TouchableOpacity onPress={() => props.onPress()}>
    <Comp {...props}>{children}</Comp>
  </TouchableOpacity>
);

export { applyShadow, makeTouchable, makeTouchableHighlight };

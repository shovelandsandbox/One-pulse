/* eslint-disable complexity */
import React, { Component } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { Colors } from "../../../../configs";
import Styles from "./style";

import { TextS, TextXS } from "../../Text";
import Input from "../../../generics/Input";
import Text from "../../../generics/Text";
import Icon from "../../../generics/Icon";
import { configureLineHeight } from "../../../../../utils//lineHeightsUtils";

export default class InputString extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: new Animated.Value(this.props.value ? 0 : 30),
      size: new Animated.Value(this.props.value ? 12 : 16),
      line: new Animated.Value(this.props.value ? 16 : 16),
      opacity: new Animated.Value(this.props.placeholder ? 0 : 1),

      isFocused: false,

      value: this.props.value,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state != nextState) {
      return true;
    }

    if (this.props != nextProps) {
      if (!this.props.value && nextProps.value) {
        this.setState({
          position: new Animated.Value(0),
          size: new Animated.Value(12),
          line: new Animated.Value(16),
          opacity: new Animated.Value(1),

          value: nextProps.value,
        });

        if (nextProps.editable === false) {
          this.focus(true);
        }
      } else if (
        !!this.props.value &&
        !nextProps.value &&
        nextProps.editable === false
      ) {
        this.setState({
          value: nextProps.value,
        });

        this.focus(false, true);
      }

      return true;
    }

    return false;
  }

  focus(isUp = false, useForce = false) {
    if (isUp) {
      if (this.props.onFocus) {
        this.props.onFocus();
      }

      Animated.timing(this.state.position, {
        toValue: 0,
        duration: 100,
        delay: 0,
      }).start();
      Animated.timing(this.state.size, {
        toValue: 12,
        duration: 100,
        delay: 0,
      }).start();
      Animated.timing(this.state.line, {
        toValue: 16,
        duration: 100,
        delay: 0,
      }).start();
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 100,
        delay: 0,
      }).start();

      this.setState({
        isFocused: true,
      });
    } else {
      if (this.props.onBlur) {
        this.props.onBlur();
      }

      if (
        this.state.value === null ||
        this.state.value === undefined ||
        this.state.value.trim().length < 1 ||
        useForce
      ) {
        Animated.timing(this.state.position, {
          toValue: 30,
          duration: 100,
          delay: 0,
        }).start();
        Animated.timing(this.state.size, {
          toValue: 16,
          duration: 100,
          delay: 0,
        }).start();
        Animated.timing(this.state.line, {
          toValue: 16,
          duration: 100,
          delay: 0,
        }).start();
        Animated.timing(this.state.opacity, {
          toValue: 0.7,
          duration: 100,
          delay: 0,
        }).start();
      }

      this.setState({
        isFocused: false,
      });
    }
  }

  updateValue(value) {
    this.setState({ value });

    if (this.props.onChangeText) {
      this.props.onChangeText(value);
    }
  }

  renderError() {
    if (!this.props.error) {
      return null;
    }

    return <TextXS color={Colors.main.errorRed}>{this.props.error}</TextXS>;
  }

  renderHint() {
    if (!this.props.hint) {
      return null;
    }

    return (
      <TextS color={Colors.main.baseGray} light style={Styles.hint}>
        {this.props.hint}
      </TextS>
    );
  }

  renderLeftIcon() {
    if (!this.props.leftIcon) {
      return null;
    }

    return (
      <View style={Styles.left.container}>
        <View style={Styles.left.icon.container}>
          <Icon
            name={this.props.leftIcon}
            color={
              this.state.isFocused
                ? Colors.main.iconGray
                : Colors.main.inactiveGray
            }
          />
        </View>
      </View>
    );
  }

  renderRightButton() {
    if (!this.props.rightIcon) {
      return null;
    }

    const main = (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={[Styles.left.icon.container, { alignItems: "flex-end" }]}>
        <Icon
          name={this.props.rightIcon}
          color={
            this.props.rightIconColor
              ? this.props.rightIconColor
              : Colors.main.baseRed
          }
        />
      </View>
    );

    if (this.props.onRightIconPress) {
      return (
        <TouchableOpacity
          style={Styles.left.container}
          onPress={() => this.props.onRightIconPress()}
        >
          {main}
        </TouchableOpacity>
      );
    }

    return <View style={Styles.left.container}>{main}</View>;
  }

  render() {
    const {hideBorder = false} = this.props;
    if(hideBorder){
     return(
      <View>
      <Text style = {{
        ...{fontFamily:'Avenir-Heavy',fontSize:13,lineHeight:24,fontWeight:'500'},
        ...configureLineHeight("13")
      }}>
      {this.props.label
              ? 
                 this.props.label
              : this.props.placeholder}
      </Text>

      <Input
              {...this.props}
              placeholder={
                this.props.placeholder
              }
              onFocus={() => this.focus(true)}
              onBlur={() => this.focus(false)}
              onChangeText={value => this.updateValue(value)}
              style = {{borderColor:'rgb(178,178,178)',marginTop:9,borderWidth:1,boderRadius:3,
            paddingHorizontal:15,paddingTop:13,paddingBottom:11,marginBottom:11}}
            />
      {this.renderError()}

      {this.renderHint()}
    </View>
     )
    }
    return (
      <View style={[this.props.style]}>
        <View
          style={[
            Styles.topContainer,
            {
              borderColor: this.props.error
                ? Colors.main.errorRed
                : this.state.isFocused
                ? Colors.main.iconGray
                : this.props.borderColor
                ? this.props.borderColor
                : Colors.main.inactiveGray,
            },
          ]}
        >
          {this.renderLeftIcon()}

          <View style={Styles.right.container}>
            <Text
              animated
              color={Colors.main.baseGray}
              size={this.state.size}
              line={this.state.line}
              style={{
                top: this.state.position,
                opacity: this.state.opacity,
                paddingTop: this.props.paddingTop ? this.props.paddingTop : 0,
                // paddingBottom: this.props.paddingBottom ? this.props.paddingBottom : 0,
              }}
            >
              {this.props.placeholder
                ? this.state.isFocused
                  ? this.props.placeholder
                  : null
                : this.props.label}
            </Text>

            <Input
              {...this.props}
              placeholder={
                !this.state.isFocused ? this.props.placeholder : null
              }
              onFocus={() => this.focus(true)}
              onBlur={() => this.focus(false)}
              onChangeText={value => this.updateValue(value)}
              style={Styles.right.input}
            />
          </View>

          {this.renderRightButton()}
        </View>

        {this.renderError()}

        {this.renderHint()}
      </View>
    );
  }
}

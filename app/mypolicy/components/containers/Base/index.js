/* eslint-disable react-native/no-raw-text */
/* eslint-disable complexity */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable import/named */
import React, { Component } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StatusBar,
} from "react-native";
import SaveAreaView from "react-native-safe-area-view";
import { Sizes } from "../../../configs";
import Styles from "./style";
import { Header as HeaderCard } from "../../cards";

export default class Base extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isKeyboarUp: false,
      showFixedTitle: false
    };

    if (Platform.OS == "ios") {
      this.keyboardWillShow = Keyboard.addListener("keyboardWillShow", () => {
        this.setState({ isKeyboarUp: true });
      });

      this.keyboardWillHide = Keyboard.addListener("keyboardWillHide", () => {
        this.setState({ isKeyboarUp: false });
      });
    } else {
      this.keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => {
        this.setState({ isKeyboarUp: true });
      });

      this.keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
        this.setState({ isKeyboarUp: false });
      });
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "ios") {
      this.keyboardWillShow.remove();
      this.keyboardWillHide.remove();
    } else {
      this.keyboardDidShow.remove();
      this.keyboardDidHide.remove();
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

  onContentScrolled(event) {
    const yOffset = event.nativeEvent.contentOffset.y;

    if (this.props.persistScrollTitle) {
      persistScrollOffset = this.props.persistScrollOffset
        ? this.props.persistScrollOffset
        : 45;

      if (yOffset >= persistScrollOffset && !this.state.showFixedTitle) {
        this.setState({ showFixedTitle: true });
      }

      if (yOffset < persistScrollOffset && this.state.showFixedTitle) {
        this.setState({ showFixedTitle: false });
      }
    }

    if (!this.props.onScroll) {
      return null;
    }

    this.props.onScroll(yOffset);
  }

  renderBottomContent() {
    if (!this.props.bottomContent) {
      return null;
    }

    return (
      <View
        style={{
          marginBottom: this.state.isKeyboarUp && !Sizes.isAndroid ? 16 : 0
        }}
      >
        {this.props.bottomContent}
      </View>
    );
  }

  renderTopColor() {
    if (!this.props.topColor) {
      return null;
    }

    return (
      <View style={Styles.backgroundContent.container}>
        <View
          style={[
            Styles.backgroundContent.content,
            { backgroundColor: this.props.topColor }
          ]}
        />
      </View>
    );
  }

  renderBackgroundContent() {
    if (!this.props.backgroundContent) {
      return null;
    }

    return (
      <View style={Styles.backgroundContent.container}>
        {this.props.backgroundContent}
      </View>
    );
  }

  renderHeader(isFloatingHeader = false) {
    if (
      (!this.props.onBackPress &&
        !this.props.onClosePress &&
        !this.props.title &&
        !this.props.persistScrollTitle) ||
      (!isFloatingHeader && this.props.floatingHeader) ||
      (isFloatingHeader && !this.props.floatingHeader) ||
      (isFloatingHeader &&
        !this.props.onBackPress &&
          !this.props.onClosePress &&
          !this.props.persistScrollTitle)
    ) {
      return null;
    }

    return (
      <HeaderCard
        onLeftPress={this.props.onBackPress}
        onRightPress={this.props.onClosePress}
        inverse={this.props.inverse}
        showTitle = {this.props.showTitle}
        disablePruIcon = {this.props.disablePruIcon}
        title={
          this.props.persistScrollTitle && this.state.showFixedTitle
            ? this.props.persistScrollTitle
            : this.props.title
        }
        floating={isFloatingHeader}
        rightContentRender={this.props.rightHeaderRender}
        backgroundColor={
          this.props.persistScrollTitle &&
          this.state.showFixedTitle &&
          this.props.headerBackgroundColor
            ? this.props.headerBackgroundColor
            : null
        }
        backgroundColorCustom={
          this.props.backgroundColorCustom
            ? this.props.backgroundColorCustom
            : null
        }
        isModal={this.props.isModal}
      />
    );
  }

  renderKeyboardMargin() {
    if (
      !this.props.isModal &&
      this.state.isKeyboarUp &&
      !this.props.floatingKeyboard
    ) {
      return <View style={{ flex: -1, height: 0 }} />;
    }
    return <View style={{ flex: -1, height: 0 }} />;
  }

  renderMain() {
    if (this.props.static) {
      return (
        <View style={Styles.innerContainerStatic}>{this.props.children}</View>
      );
    }
    const {linearView = false} = this.props
    return (
      <ScrollView
        contentContainerStyle={Styles.innerContainer}
        onScroll={event => this.onContentScrolled(event)}
        scrollEventThrottle={16}
        bounces={!this.props.noBounce}
        overScrollMode={this.props.noBounce ? "never" : "auto"}
      >
        {this.props.children}
        {linearView && <View style = {{marginTop:42}}>
          {this.renderBottomContent()}
        </View>}
      </ScrollView>
    );
  }

  render() {
    const {linearView = false} = this.props
    return (
      <SaveAreaView
        style={[
          Styles.container,
          this.props.backgroundColor
            ? { backgroundColor: this.props.backgroundColor }
            : {}
        ]}
        forceInset={{
          bottom:
            this.props.hasFooter || !!this.props.bottomContent
              ? "always"
              : "never"
        }}
      >
        <StatusBar
          translucent
          barStyle={!this.props.inverse ? "dark-content" : "light-content"}
          backgroundColor={"transparent"}
        />
        
          {this.renderTopColor()}

          {this.renderBackgroundContent()}

          {this.renderHeader()}
     
        <KeyboardAvoidingView
          style={[
            { flex: 1 },
            this.props.fullScreen
              ? {
                  flex: -1,
                  position: "absolute",
                  height: Sizes.fullScreen.height,
                  width: Sizes.screen.width,
                  bottom: 0
                }
              : {}
          ]}
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          {this.renderMain()}

          {!linearView && this.renderKeyboardMargin()}

          {!linearView && this.renderBottomContent()}
        </KeyboardAvoidingView>

        {this.renderHeader(true)}
      </SaveAreaView>
    );
  }
}

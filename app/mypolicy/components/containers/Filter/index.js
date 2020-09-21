//#region IMPORTS

// PACKAGE IMPORTS
import React, { Component } from "react";
import { Modal as RModal } from "react-native";
import PropTypes from "prop-types";

// COMPONENT IMPORTS
import { Base as BaseContainer } from "../../containers";

//#endregion

export default class Modal extends Component {
  //#region PROP TYPES AND LIFECYCLE HOOKS
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    scrollable: PropTypes.bool,
    onClosePress: PropTypes.func,
    bottomContent: PropTypes.any,
    children: PropTypes.any,
    backgroundColor: PropTypes.string,
    inverse: PropTypes.bool,
    floatingHeader: PropTypes.any,
    title: PropTypes.string,
    persistScrollTitle: PropTypes.string,
    animationType: PropTypes.string,
  };

  shouldComponentUpdate(nextProps) {
    return this.props != nextProps;
  }

  //#endregion

  //#region RENDERS

  renderChildren() {
    return this.props.children;
  }

  //#endregion

  render() {
    return (
        <RModal
            visible={this.props.isActive}
            animationType={
              this.props.animationType ? this.props.animationType : "slide"
            }
        >
          <BaseContainer
              static={!this.props.scrollable || this.props.floatingHeader}
              onClosePress={this.props.onClosePress}
              bottomContent={this.props.bottomContent}
              backgroundColor={this.props.backgroundColor}
              inverse={this.props.inverse}
              title={this.props.title}
              persistScrollTitle={this.props.persistScrollTitle}
              floatingHeader={this.props.floatingHeader}
              isModal
          >
            {this.renderChildren()}
          </BaseContainer>
        </RModal>
    );
  }
}

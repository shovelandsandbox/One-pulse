import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { Auth as AuthContainer } from "../index";

class ClaimSteps extends Component {
  render() {
    return (
      <AuthContainer
        title={this.props.title}
        buttonLabel={this.props.buttonLabel}
        onSubmit={this.props.onSubmit}
        onBackPress={() => this.props.navigation.pop()}
        steps={this.props.step ? this.props.step + "|4" : ""}
        rightHeaderRender={this.props.rightHeaderRender}
        backgroundImage={this.props.backgroundImage}
        transparentBackground={true}
      >
        {this.props.children}
      </AuthContainer>
    );
  }
}

export default withNavigation(ClaimSteps);

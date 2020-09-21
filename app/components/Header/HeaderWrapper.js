import React from "react";
import Header from "./Header";

class HeaderWrapper extends React.PureComponent {
  render() {
    return (
      <Header
        hasBackIcon={this.props.showLeftIcon}
        hasCloseIcon={false}
        hasMore={false}
        onClick={this.props.onLeftPress}
      />
    );
  }
}

export default HeaderWrapper;

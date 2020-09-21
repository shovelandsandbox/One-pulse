import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { connect } from "react-redux";

class TabBarButtonComponent extends React.PureComponent {
  render() {
    const {
      onPress,
      onLongPress,
      testID,
      accessibilityLabel,
      identifier,
      isNewUser,
      currentTour,
      style,
      index,
      ...props
    } = this.props;

    const highlighted = {
      padding: 10,
      borderWidth: 1,
      borderColor: "transparent",
      borderRadius: 45,
      backgroundColor: "#fff",
      opacity: 1,
      zIndex: 99,
    };

    const tabStyle =
      isNewUser && currentTour !== undefined && currentTour === identifier
        ? [...style, highlighted]
        : style;

    return (
      <React.Fragment>
        <TouchableWithoutFeedback
          onPress={onPress}
          onLongPress={onLongPress}
          testID={testID}
          hitSlop={{
            left: 15,
            right: 15,
            top: 5,
            bottom: 5,
          }}
          accessibilityLabel={accessibilityLabel}
          // disabled={isNewUser}
        >
          <View style={tabStyle} {...props} />
        </TouchableWithoutFeedback>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    currentTour: state.tour.currentTour,
    isNewUser: state.auth.isNewUser,
  }),
  null
)(TabBarButtonComponent);

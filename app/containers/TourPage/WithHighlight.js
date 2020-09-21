/**
 * HOC component for wrapping any view with a highlight style and Overlay text
 * Usage : For tour guide highlighting
 */
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { connect } from "react-redux";
import { OfflineImage } from "react-native-image-offline";
import { PointerIcon } from "../../config";
import styles from "./styles";

class WithHighlight extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.currentTour === nextProps.tourStep) {
      return {
        highlighted: true,
      };
    }
    return {
      highlighted: false,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      highlighted: false,
      x: 0,
    };
  }

  render() {
    const { children, style, iconType } = this.props;
    const { highlighted } = this.state;
    return (
      <View
        style={highlighted ? [styles.highlighted, style] : style}
        onLayout={event => {
          this.setState({
            x: event.nativeEvent.layout.x,
          });
        }}
      >
        {highlighted && iconType === undefined && (
          <OfflineImage
            style={{
              position: "absolute",
              top: 25,
              left: this.state.x + 10,
              right: 0,
              bottom: 0,
              width: 25,
              height: 25,
              zIndex: 105,
            }}
            source={{ uri: "" }}
            key="pointerIcon"
            fallbackSource={PointerIcon}
          />
        )}
        {children}
      </View>
    );
  }
}

WithHighlight.propTypes = {
  currentTour: PropTypes.string,
  tourStep: PropTypes.string.isRequired,
  iconType: PropTypes.string,
  children: PropTypes.element.isRequired,
  style: PropTypes.object,
};

WithHighlight.defaultProps = {
  currentTour: undefined,
  iconType: undefined,
  style: {},
};

export default connect(
  state => ({
    currentTour: state.tour.currentTour,
    iconType: state.tour.iconType,
  }),
  null
)(WithHighlight);

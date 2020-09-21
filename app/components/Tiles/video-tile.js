import React, { PureComponent } from "react";
import VideoPlayer from "../VideoTile/VideoPlayer";
import { Viewport } from "@skele/components";
import PropTypes from "prop-types";

const ViewportAwareTile = Viewport.Aware(VideoPlayer);

export default class VideoTile extends PureComponent {
  onViewportEnter() {
    const { handler } = this.props;
    handler("visible-in-viewport");
  }

  onViewportLeave() {
    const { handler } = this.props;
    handler("out-of-viewport");
  }

  render() {
    const { style } = this.props;
    const { width, aspectRatio = 1, ...rest } = style;
    const height = width / aspectRatio;
    return (
      <ViewportAwareTile
        style={{ ...rest, height }}
        onViewportEnter={this.onViewportEnter}
        onViewportLeave={this.onViewportLeave}
        config={{ ...this.props, autoPlay: false }}
      ></ViewportAwareTile>
    );
  }
}

VideoTile.defaultProps = {};

VideoTile.propTypes = {
  style: PropTypes.object,
  handler: PropTypes.func,
};

import PropTypes from "prop-types";
const { any, arrayOf, bool, number, shape, string } = PropTypes;

export const videoType = shape({
  paused: bool,
  thumb: string,
});

export const videoPlayerType = shape({
  properties: shape({
    uri: string,
  }),
});

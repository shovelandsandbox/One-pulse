import React from "react";
import ImageTile from "../Tiles/image-tile";
import VideoTile from "../Tiles/video-tile";
import PdfTile from "../Tiles/pdf-tile";
import GenericComponentTile from "../Tiles/generic-component-tile";
import { TouchableOpacity } from "react-native";
import WithPruComponent from "./PruComponent";
import PruList from "../PruList";
import HTML from "react-native-render-html";
import ProfileTile from "../Tiles/profile-tile";
import PropTypes from "prop-types";
import { mapObjIndexed } from "ramda";
import DescriptionTile from "../Tiles/description-tile";

//TODO: styles to be handled in a generic way
const RichView = props => {
  return (
    <TouchableOpacity onPress={() => props.handler("click")}>
      <HTML html={props.html} />
    </TouchableOpacity>
  );
};

RichView.propTypes = {
  handler: PropTypes.func,
  html: PropTypes.string,
};

const componentMap = {
  image: ImageTile,
  video: VideoTile,
  list: PruList,
  "rich-view": RichView,
  pdf: PdfTile,
  profile: ProfileTile,
  DescriptionTile: DescriptionTile,
  dynamic: GenericComponentTile,
};

const getPruComponent = componentMap => {
  const convertToStatic = component => WithPruComponent(component);
  const staticComponentMap = mapObjIndexed(convertToStatic, componentMap);

  return function getComponent(type) {
    return staticComponentMap[type];
  };
};

export default getPruComponent(componentMap);

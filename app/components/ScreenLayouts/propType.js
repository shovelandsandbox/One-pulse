import { oneOf, oneOfType, arrayOf, number, string, object } from "prop-types";

const BaseComponentType = {
  id: oneOfType(number, string).isRequired,
  type: oneOf(["list", "image", "video", "rich-view"]).isRequired,
  options: object,
};

export const ListComponentType = {
  ...BaseComponentType,
  title: string,
};

export const ImageComponentType = {};

export const VideoComponentType = {
  properties: {
    uri: string,
    thumb: string,
  },
};
export const RichviewComponentType = {};

export const LayoutConfigType = {
  layout: oneOf(["grid"]),
  name: string,
  numCols: number,
  components: arrayOf(
    oneOf([
      ListComponentType,
      ImageComponentType,
      VideoComponentType,
      RichviewComponentType,
    ])
  ),
};

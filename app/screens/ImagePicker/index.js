import React from "react";
import PruCamera from "../../components/PruCamera";
class ImagePicker extends React.PureComponent {
  render() {
    return <PruCamera setPicture={this.props.setPicture} />;
  }
}

export default ImagePicker;

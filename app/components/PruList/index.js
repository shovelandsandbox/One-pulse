import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { last } from "ramda";

import List from "./List";
import PruScrollIndicator from "../PruScrollIndicator";

export default class PruList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
    this.onScroll = this.onScroll.bind(this);
  }
  //TODO: onScroll to be called only when scrollindicator is shown
  onScroll({ viewableItems }) {
    let currentIndex = 0;
    if (viewableItems.length > 0) {
      currentIndex = last(viewableItems).index;
    }
    this.setState({
      currentIndex,
    });
  }

  shouldShowScrollIndicator({ properties = {}, components = [] }) {
    return (
      properties.showIndicator && properties.horizontal && components.length > 1
    );
  }
  getIndicatorList = ({ components, properties }) => {
    const { itemsPerRow = 2 } = properties;
    const indicatorList = [];
    components.forEach((component, index) => {
      if (index % itemsPerRow === 0) indicatorList.push(component);
    });
    return indicatorList;
  };

  getIndex = ({ properties }) => {
    const { itemsPerRow = 2 } = properties;
    return Math.floor(this.state.currentIndex / itemsPerRow);
  };

  render() {
    const { baseContainerStyle } = this.props;
    return (
      <React.Fragment>
        <List
          components={this.props.components}
          properties={this.props.properties}
          onScroll={this.onScroll}
          display={this.props.display}
          baseContainerStyle={baseContainerStyle}
        />
        {this.shouldShowScrollIndicator(this.props) && (
          <PruScrollIndicator
            pages={this.getIndicatorList(this.props)}
            index={this.getIndex(this.props)}
          />
        )}
      </React.Fragment>
    );
  }
}

PruList.propTypes = {
  components: PropTypes.array,
  properties: PropTypes.object,
  display: PropTypes.object,
  baseContainerStyle: PropTypes.object,
};

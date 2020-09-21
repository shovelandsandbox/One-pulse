/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { FlatList, Dimensions, StyleSheet, View } from "react-native";
import getPruComponent from "../Factory/ComponentFactory";
import { Viewport } from "@skele/components";
import BaseTile from "../Tiles/base-tile";
import { isEmpty, isNil } from "ramda";
import { Theme } from "../../themes";
const { Colors } = Theme;

const extractKey = (item, index) => {
  const key = `PruListItem: ${item.properties.uri}+${index}`;
  return key;
};
class List extends PureComponent {
  constructor(props) {
    super(props);
    this.currentTile = 0;
  }

  componentDidMount() {
    const { components = [] } = this.props;
    this._stopAutoPlay();
    if (components.length > 1) {
      // this._startAutoPlay();
    }
  }

  componentWillUnmount() {
    this._stopAutoPlay();
  }

  _goToNextPage = () => {
    let { currentTile } = this;

    const { components = [] } = this.props;
    if (currentTile >= components.length - 1) {
      currentTile = -1;
    }

    this.flatList.scrollToIndex({
      index: ++currentTile,
      animated: true,
    });

    this.currentTile = currentTile;
    this._startAutoPlay();
  };

  _startAutoPlay = () => {
    const { autoScrollInterval = 4000 } = this.props;
    this._timerId = setTimeout(this._goToNextPage, autoScrollInterval);
  };

  _stopAutoPlay = () => {
    if (this._timerId) {
      clearInterval(this._timerId);
      this._timerId = null;
    }
  };

  renderItem({ item }, displayStyle) {
    const Component = getPruComponent(item.type);
    const DescComponent = getPruComponent("DescriptionTile");
    const {
      style = {},
      properties: { title = "", readMore = "", desc = "" },
    } = item;
    const descRequired =
      !isEmpty(title) || !isEmpty(readMore) || !isEmpty(desc);

    return (
      <View>
        <BaseTile style={displayStyle}>
          <Component {...item} style={{ ...displayStyle.common, ...style }} />
        </BaseTile>
        {descRequired && (
          <DescComponent
            {...item}
            style={{ ...displayStyle.common, ...style }}
          />
        )}
      </View>
    );
  }

  getDefaultConfig() {
    return {
      viewabilityConfig: { itemVisiblePercentThreshold: 50 },
      showsHorizontalScrollIndicator: false,
    };
  }

  getConfig({ properties }) {
    return {
      ...this.getDefaultConfig(),
      ...properties,
    };
  }

  calculateDisplayStyle({ display, properties, components }) {
    //TODO: why not wrap in base tile
    if (display.autoCalculate === false) {
      return {};
    }
    let { width } = Dimensions.get("window");
    const { itemsPerRow = 1 } = properties;
    const { aspectRatio } = display;
    const screenOffset = display.screenOffset || 20;
    //so that users know there are other components too
    if (
      properties.horizontal &&
      components.length > 1 &&
      components.length > itemsPerRow
    ) {
      width = width - width * display.widthOffset;
    }
    const { baseContainerStyle } = this.props;
    return {
      container: baseContainerStyle || styles.baseContainerStyle,
      common: {
        width: width / itemsPerRow - screenOffset,
        aspectRatio,
        // height: width / aspectRatio,
      },
    };
  }

  render() {
    const { components, onScroll, properties } = this.props;
    const config = this.getConfig(this.props);
    const display = this.calculateDisplayStyle(this.props);
    const { itemsPerRow = 1 } = properties;
    const { horizontal, showSeparator } = this.props.properties;
    return (
      <Viewport.Tracker>
        <FlatList
          ref={ref => {
            this.flatList = ref;
          }}
          {...config}
          onViewableItemsChanged={onScroll}
          data={components}
          renderItem={item => this.renderItem(item, display)}
          keyExtractor={extractKey}
          numColumns={horizontal ? undefined : itemsPerRow}
          ItemSeparatorComponent={() => {
            if (horizontal || !showSeparator) {
              return null;
            }
            return (
              <View
                style={{
                  height: 1,
                  width: "100%",
                  marginLeft: 3,
                  marginRight: 3,
                  backgroundColor: Colors.grey1a1a1a,
                }}
              />
            );
          }}
        />
      </Viewport.Tracker>
    );
  }
}

List.propTypes = {
  components: PropTypes.array,
  properties: PropTypes.object,
  onScroll: PropTypes.func,
  autoScrollInterval: PropTypes.number,
  baseContainerStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  baseContainerStyle: {
    alignContent: "center",
    marginLeft: 10,
    marginTop: 13,
  },
});

export default List;

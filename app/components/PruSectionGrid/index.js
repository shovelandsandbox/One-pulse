/* eslint-disable*/
/* eslint-disable react/require-optimization */
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";

import {
  events
} from "@pru-rt-internal/pulse-common";
import { dispatchEvent } from "../../actions";

import _ from "lodash";
import { goto, gotoWithParams } from "../../actions";
import { Theme } from "../../themes";
import { applyShadow } from "../../hocs";
import { SELECTED_ICON } from "../../config/images";
import { connect } from "react-redux";
import moment from "moment";
import {getLineHeight} from "../../utils/StyleUtils";
{
  applyShadow;
}
import GenericContainer from "../../framework/AppContext";

const { Sizes, Fonts } = Theme;
class PruSectionGrid extends Component {
  constructor(props) {
    super(props);
    this.launchWebView = this.launchWebView.bind(this);
    this.launchScreen = this.launchScreen.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }
  state = {
    currentIndex: 0,
    hightlightIndecies: []
  };
  renderSectionHeader = () => {
    const header = this.props.header ? this.props.header.trim() : null;
    if (!_.isEmpty(header)) {
      return (
        <View style={{ margin: 5 }}>
          <Text style={styles.headerStyle}>{this.props.header}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      this.setState({ currentIndex: _.last(viewableItems).index });
    } else {
      this.setState({ currentIndex: 0 });
    }
  };

  renderRow = (items, totalLength) => {
    const aspectRatio = this.props.aspectRatio
      ? this.props.aspectRatio
      : 16 / 9;
    let screenXOffset = this.props.width ? this.props.width : 20;

    const numberOfLines = this.props.numberOfLines
      ? this.props.numberOfLines
      : 1;
    let itemSize =
      this.props.itemsPerRow > 1
        ? Sizes.fullScreen / this.props.itemsPerRow - (screenXOffset + 5)
        : Sizes.fullScreen - screenXOffset;
    let itemContainerStyle = styles.itemContainer;
    let outerTextStyle = styles.titleStyle;
    return items.map(value => {
      if (this.props.horizontal && totalLength > 1 && this.props.itemsPerRow <= 1) {
        itemSize = itemSize - (itemSize*0.15);
      }
      if (_.includes(this.state.hightlightIndecies, value.id)) {
        itemContainerStyle = styles.itemContainerHighlight;
      } else {
        itemContainerStyle = styles.itemContainer;
        outerTextStyle = styles.titleStyle;
      }
      const tileOpacity = value.enabled ? 1 : 0.2;
      return (
        <TouchableOpacity
          disabled={!value.enabled}
          onPress={() => {
            this.sendCmsPlatformClickEvent(value);
            if (value.clickAction === "open_webview") {
              this.launchWebView(value);
            }
            if (value.clickAction === "open_screen") {
              this.launchScreen(value);
            }
            if (value.clickAction === "dispatch_action") {
              let action = {
                context: value.context,
                type: value.actionType
              };
              if(value.payload){
                action = { ...action, payload: value.payload };
              }
              this.props.dispatchAction(action);
            }

            if (this.props.onPress) {
              this.props.onPress(value);
            }
            if (this.props.itemHighLight) {
              if (_.includes(this.state.hightlightIndecies, value.id)) {
                this.setState({
                  hightlightIndecies: _.pull(
                    this.state.hightlightIndecies,
                    value.id
                  )
                });
              } else {
                const hightlightIndecies = this.state.hightlightIndecies;
                hightlightIndecies.push(value.id);
                this.setState({
                  hightlightIndecies
                });
              }
            }
          }}
          activeOpacity={0.8}
        >
          {/* <ShadowView style={{ ...itemContainerStyle, opacity: tileOpacity }}> */}
          {
            value.layout ? this.renderDynamicScreen(value,itemSize, tileOpacity) :
          <Image
            style={{
              aspectRatio: aspectRatio,
              width: itemSize, // Sizes.fullScreen - screenXOffset,
              borderRadius: value.borderRadius ? value.borderRadius : 0,
              opacity: tileOpacity,
              margin: 5
            }}
            source={{
              uri: value.url,
              headers: {
                "if-modified-since": moment(this.props.timeStamp).format("ddd, DD MMM YYYY HH:mm:ss Z"),
              }
            }}
            resizeMode={_.includes(this.state.hightlightIndecies, value.id) ? "cover" : "stretch"}
          />
          }
          { 
            _.includes(this.state.hightlightIndecies, value.id) ? 
              <Image source={ SELECTED_ICON } style={ styles.selectedIcon } /> : null
          }

          {!_.isEmpty(value.name) && (
            <View
              style={{
                position: "absolute",
                top: 10,
                left: 20
              }}
            >
              <Text style={styles.nameStyle}>{value.name}</Text>
            </View>
          )}
          {/* </ShadowView> */}
          {!_.isEmpty(value.title) && (
            <View style={{ width: itemSize, marginLeft: 10 }}>
              <Text style={outerTextStyle}>{value.title}</Text>
            </View>
          )}
          {!_.isEmpty(value.desc) && (
            <View style={{ width: itemSize }}>
              <Text style={styles.descStyle} numberOfLines={2}>
                {value.desc}
              </Text>
            </View>
          )}
          {!_.isEmpty(value.readMore) && (
            <View
              style={{
                width: itemSize //Sizes.fullScreen - screenXOffset
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (value.clickAction === "open_webview") {
                    this.launchWebView(value);
                  }
                  if (value.clickAction === "open_screen") {
                    this.launchScreen(value);
                  }
                }}
              >
                <Text style={styles.readMoreText}>{value.readMore}</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      );
    });
  };

  renderDynamicScreen(value, width,tileOpacity){
      let screenName = value.layout.screenName != null ? value.screenName : "DynamicScreen";
      let screenDef = value.layout.screenDef;
      return (
          <View style={{width: width,
                      borderRadius: value.borderRadius ? value.borderRadius : 0, opacity: tileOpacity, margin: 5}}>  
               <GenericContainer screen={screenName} screenDef={screenDef}/>
          </View>
      );
  }
  isTitleOutSide = () => {
    if (this.props.outsideTitle) return true;
  };

  launchWebView = item => {
    this.props.gotoWithParams("WebView", { uri: item.clickUrl });
  };

  launchScreen = item => {
    this.props.gotoWithParams(item.screenId, item.screenParams);
  };
  
  sendCmsPlatformClickEvent = (value) => {
    let cmsEvent = events.CmsClickAction;
    cmsEvent.cmsId = value.cmsId;
    const cmsAttrs = {
      title: value.title,
      category: value.category,
      id: value.cmsId,
      desc: value.desc
    };
    if (value.category) {
      cmsEvent.tags = [value.category]
    }
    cmsEvent.attributes = cmsAttrs;
    this.props.dispatchEvent(cmsEvent);
  }

  render() {
    const { horizontal, data, itemsPerRow } = this.props;
    const rows = _.chunk(data, itemsPerRow);
    const rowsLength = rows.length;
    const rowStyle = horizontal
      ? styles.coloumnLayout
      : styles.rowLayout;
      
    return (
      <View>
        {this.renderSectionHeader()}
        <View>
          <FlatList
            horizontal={horizontal}
            onViewableItemsChanged={this.onViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50
            }}
            keyExtractor={(item, index) => `index${index}`}
            data={rows}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={rowStyle}>{this.renderRow(item, rowsLength)}</View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1
  },
  itemContainer: {
    borderRadius: 10,
    color: "white"
  },
  itemContainerHighlight: {
    borderRadius: 10,
    borderColor: "red",
    borderWidth: 0.2
  },
  rowLayout: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'space-evenly'
  },
  coloumnLayout: {
    flexDirection: "column",
    flex: 1,
    justifyContent: 'space-evenly',
    marginLeft: 5
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    lineHeight: getLineHeight(16),
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
    lineHeight: getLineHeight(12),
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    alignItems: "center",
    backgroundColor: "#636e72",
    color: "white",
    padding: 10,
    lineHeight: getLineHeight(15),
  },
  headerStyle: {
    fontFamily: "Avenir-Heavy",
    fontWeight: "bold",
    color: "#515B61",
    paddingLeft: 10,
    fontSize: 22,
    lineHeight: getLineHeight(22),
  },
  titleStyle: {
    color: "#525a60",
    fontSize: 15,
    fontFamily: Fonts.AvenirRoman,
    flex: 1,
    textAlign: "left",
    flexDirection: 'row',
    fontWeight: "bold",
    lineHeight: getLineHeight(15),
  },
  selectedIcon: { 
    position: 'absolute', 
    bottom: 44, 
    right: 14, 
    width: 33, 
    height: 33 
  },
  nameStyle: {
    color: "#525a60",
    fontSize: 20,
    fontFamily: Fonts.AvenirRoman,
    color: "white",
    lineHeight: getLineHeight(20),
  },
  descStyle: {
    color: "#525a60",
    fontSize: 14,
    fontFamily: Fonts.AvenirRoman,
    flex: 1,
    flexWrap: "wrap",
    padding: 10,
    paddingLeft: 15,
    paddingTop: 0,
    lineHeight: getLineHeight(14),
  },
  readMoreText: {
    color: "red",
    fontSize: 14,
    fontFamily: Fonts.AvenirRoman,
    padding: 10,
    paddingLeft: 15,
    paddingTop: 0,
    lineHeight: getLineHeight(14),
  }
});

export default connect(null, {
  goto,
  gotoWithParams,
  dispatchAction: action => action,
  dispatchEvent
})(PruSectionGrid);

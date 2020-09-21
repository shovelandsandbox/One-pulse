import React, { Component } from "react";
import {
  ScrollView, View, Text
} from "react-native";
import {
  WARNING,
  CLOSE_PAGE,
  DOCTORONCALL
} from "../../config/images";

import {
  CoreActionTypes,
  CoreComponents,
  CoreConfig,
  CoreConstants,
  colors,
  metaHelpers,
  CoreUtils,
  CoreStyles,
} from "@pru-rt-internal/pulse-common";
import HTML from "react-native-render-html";
import { without } from "ramda";
import { IGNORED_TAGS } from "react-native-render-html/src/HTMLUtils";
import {configureLineHeight} from "../../utils/lineHeightsUtils";

const styles = {}

const { pageKeys, COMMON_KEY_TERMS_BABYLON, SCREEN_KEY_TERMS_AND_CONDITIONS } = CoreConfig;

const tags = without(
  [
    "table",
    "caption",
    "col",
    "colgroup",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "tr",
    'h4',
  ],
  IGNORED_TAGS
);
// const privacyBabylon = metaHelpers.findCommon(COMMON_KEY_TERMS_BABYLON).label;
const tncTitle = metaHelpers.findScreen(SCREEN_KEY_TERMS_AND_CONDITIONS).label;

const tableDefaultStyle = {
  flex: 1,
  justifyContent: "flex-start",
  borderWidth: 0.3,
};

const tableColumnStyle = {
  ...tableDefaultStyle,
  flexDirection: "column",
  alignItems: "stretch",
};

const tableRowStyle = {
  ...tableDefaultStyle,
  flexDirection: "row",
  alignItems: "stretch",
};

const tdStyle = {
  ...tableDefaultStyle,
  padding: 2,
};

const thStyle = {
  ...tdStyle,
  backgroundColor: "#CCCCCC",
  alignItems: "center",
};

const baseFontStyle = {
  fontFamily: CoreStyles.fontFamily.normal,
};

/* eslint-disable */
const renderers = {
  table: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  col: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  colgroup: (x, c) => <View style={tableRowStyle}>{c}</View>,
  tbody: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  tfoot: (x, c) => <View style={tableRowStyle}>{c}</View>,
  th: (x, c) => <View style={thStyle}>{c}</View>,
  thead: (x, c) => <View style={tableRowStyle}>{c}</View>,
  caption: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  tr: (x, c) => <View style={tableRowStyle}>{c}</View>,
  td: (x, c) => <View style={tdStyle}>{c}</View>,
};

class TCDetail extends Component {
  constructor(props) {
    super(props);
}
  _onClose = () => {
    this.props.naigation.goBack()
  }

  render() {
    const tagsStyles = {
      p: {
        fontFamily: CoreStyles.fontFamily.bold,
        marginVertical: 10,
        fontSize: 14,
      },
      span: {
        fontFamily: CoreStyles.fontFamily.bold,
        marginVertical: 10,
        fontSize: 14,
      },
      div: {
        fontFamily: CoreStyles.fontFamily.bold,
        marginVertical: 10,
        fontSize: 14,
      },
      strong: {
        fontFamily: CoreStyles.fontFamily.bold,
        fontSize: 16,
      },
      li: {
        fontFamily: CoreStyles.fontFamily.bold,
        fontSize: 14,
      },
    };
    return (
      <View style={styles.container}>
        <Text style={{
          ...styles.TCheading,
          ...configureLineHeight("14")
          }}>{'title'}</Text>
        <ScrollView showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
        <HTML
            html={privacyBabylon}
            tagsStyles={tagsStyles}
            ignoredTags={tags}
            renderers={renderers}
            baseFontStyle={baseFontStyle}
          />
        </ScrollView>
      </View>
    );
  }
}
export default TCDetail;
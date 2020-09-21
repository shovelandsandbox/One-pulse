import React from "react";
import PropTypes from "prop-types";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { without } from "ramda";
import HTML from "react-native-render-html";
import { Header } from "./Header";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  colors,
  CoreStyles,
} from "@pru-rt-internal/pulse-common";

import styles from "./styles";
import { IGNORED_TAGS } from "react-native-render-html/src/HTMLUtils";

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
  ],
  IGNORED_TAGS
);

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

export class Common extends React.Component {
  constructor() {
    super();
    this.pulseCondition = false;
    this.babylonCondition = false;
    this.doconcallCondition = false;
    this.aimeCondition = false;
  }

  render() {
    const { navigation } = this.props;
    const tagsStyles = {
      p: {
        fontFamily: CoreStyles.fontFamily.normal,
        marginVertical: 10,
        fontSize: 13.3,
      },
      span: {
        fontFamily: CoreStyles.fontFamily.normal,
        marginVertical: 10,
        fontSize: 13.3,
      },
      div: {
        fontFamily: CoreStyles.fontFamily.normal,
        marginVertical: 10,
        fontSize: 13.3,
      },
      strong: {
        fontFamily: CoreStyles.fontFamily.bold,
      },
      li: {
        fontFamily: CoreStyles.fontFamily.normal,
        fontSize: 13.3,
      },
    };
    if (navigation.state.params.page === "Pulse") {
      this.pulseCondition = true;
    } else if (navigation.state.params.page === "Babylon") {
      this.babylonCondition = true;
    } else if (navigation.state.params.page === "DocCall") {
      this.doconcallCondition = true;
    } else if (navigation.state.params.page === "Aime") {
      this.aimeCondition = true;
    }
    return (
      <View style={styles.container}>
        <Header
          style={{ paddingLeft: 0 }}
          leftIconType="back"
          onLeftPress={e => {
            e.preventDefault();
            navigation.goBack();
          }}
          onRightPress={() =>{
            
          } }
          showRightIcon={false}
          showRightPulseLogo={this.pulseCondition}
          showRightDocOnCallLogo={this.doconcallCondition}
          showRightAimeLogo={this.aimeCondition}
          showRightLogo={this.babylonCondition}
        />
        <ScrollView
          style={styles.container}
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
        >
          <Text style={styles.screenTitle}>
            {navigation.state.params.screenTitle}
          </Text>
          <HTML
            html={navigation.state.params.content}
            tagsStyles={tagsStyles}
            ignoredTags={tags}
            renderers={renderers}
            baseFontStyle={baseFontStyle}
          />
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            this.scrollView.scrollToEnd();
          }}
          style={styles.fixedIcon}
        >
          <Icon name="arrow-circle-down" size={30} color={colors.nevada} />
        </TouchableOpacity>
      </View>
    );
  }
}

Common.propTypes = {
  navigation: PropTypes.object,
};

export default Common;

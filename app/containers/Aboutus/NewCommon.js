import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import HTML from "react-native-render-html";
import { without } from "ramda";
import { IGNORED_TAGS } from "react-native-render-html/src/HTMLUtils";

import {
  CoreActionTypes,
  CoreConfig,
  CoreStyles,
  metaHelpers
} from "@pru-rt-internal/pulse-common";
import styles from "./styles";
import {
  CLOSE_PAGE,
} from "../../config/images";

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

const { GO_TO_COMMON } = CoreActionTypes;
const helpers = metaHelpers;

const {
  pageKeys,
  SCREEN_KEY_TERMS_AND_CONDITIONS
} = CoreConfig;

const KEY_PRUTOPIA = "prutopia";
const KEY_BABYLON = "babylon";
const KEY_DOC_ON_CALL = "docservice";

class NewCommon extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { userPreferences } = this.props;
    let { language } = userPreferences;
    let privacyPrutopia = this.props.navigation.state.params.privacyPrutopia;
    let privacyBabylon = this.props.navigation.state.params.privacyBabylon;
    let privacyPolicyMyDoc = this.props.navigation.state.params.privacyPolicyMyDoc;
    let termsPrutopia = this.props.navigation.state.params.termsPrutopia;
    let termsBabylon = this.props.navigation.state.params.termsBabylon;
    let termsMyDoc = this.props.navigation.state.params.termsMyDoc;
    let termsAime = this.props.navigation.state.params.termsAime;
    let termsHaloDoc = this.props.navigation.state.params.termsHaloDoc;
    let privacyHaloDoc = this.props.navigation.state.params.privacyHaloDoc;
    let privacyPulse = this.props.navigation.state.params.Pulse_Privacy;

    let param = privacyPrutopia || privacyBabylon || privacyPolicyMyDoc || termsPrutopia || termsBabylon || termsMyDoc || termsAime || termsHaloDoc || privacyHaloDoc || privacyPulse;
    let title = this.props.navigation.state.params.title;
    let message = this.props.navigation.state.params.message;


    const tagsStyles = {
      p: {
        fontFamily: CoreStyles.fontFamily.normal,
        marginVertical: language === "VN" ? 0 : 10,
        fontSize: 14,
        lineHeight: 16,
      },
      span: {
        fontFamily: CoreStyles.fontFamily.bold,
        marginVertical: language === "VN" ? 0 : 10,
        fontSize: 14,
        lineHeight: 16,
      },
      div: {
        fontFamily: CoreStyles.fontFamily.bold,
        marginVertical: language === "VN" ? 0 : 10,
        fontSize: 14,
        lineHeight: 16,
      },
      strong: {
        fontFamily: CoreStyles.fontFamily.bold,
        fontSize: 16,
        lineHeight: 16,
      },
      li: {
        fontFamily: CoreStyles.fontFamily.normal,
        fontSize: 14,
        lineHeight: 16,
      },
      ol: {
        fontFamily: CoreStyles.fontFamily.normal,
        fontSize: 14,
        lineHeight: 16,
      }
    };
    const { navigation } = this.props;
    return (
      <View style={styles.containers}>
        <View style={{ width: "100%", height: 44, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity style={{ width: 60, padding: 15 }} onPress={() => {
            navigation.goBack()
          }}>
            <Image style={{ flex: 1, alignSelf: 'center' }}
              source={CLOSE_PAGE} resizeMode={"contain"} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.headingBox}>
              <Text style={styles.TCheading}>{message}</Text>
              <Text style={styles.heading}>{title}</Text>
            </View>

            <HTML
              html={param}
              tagsStyles={tagsStyles}
              ignoredTags={tags}
              renderers={renderers}
              baseFontStyle={baseFontStyle}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userPreferences: state.userPreferences,
  }
};

export default connect(
  mapStateToProps,
  {
    goToCommon: (params) => ({
      context: pageKeys.ABOUT_TERMS,
      type: GO_TO_COMMON,
      payload: {
        params
      }
    })
  }
)(NewCommon);
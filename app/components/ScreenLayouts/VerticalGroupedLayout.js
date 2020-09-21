import React, { PureComponent } from "react";
import { SafeAreaView, SectionList, Text, View } from "react-native";

import styles from "./styles";
import getPruComponent from "../Factory/ComponentFactory";
import { isEmpty, path } from "ramda";
import { LayoutConfigType } from "./propType";
import { Theme } from "../../themes";
import PropTypes from "prop-types";

const { Colors } = Theme;

const extractKey = (data, index) => {
  const { title } = data;
  const key = `${index}:${title}`;
  // console.log(key);
  return key;
};

class VerticalGroupedLayout extends PureComponent {
  renderSectionHeader = ({ section }) => {
    if (!section.title || !section.title.trim()) {
      return <View></View>;
    }
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  renderSectionFooter = ({ section = {} }) => {
    if (!section.data) {
      return null;
    }
    const sectionObj = section.data.find(
      data => path(["properties", "showSeparator"], data) === true
    );
    if (!sectionObj) {
      return null;
    }
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: 1,
          width: "100%",
          margin: 5,
          backgroundColor: Colors.grey1a1a1a,
        }}
      />
    );
  };

  //called for each data in a section.
  //section has only one data entry data: [component]
  renderItem = ({ item }) => {
    const { baseContainerStyle } = this.props;
    const Component = getPruComponent(item.type);
    return <Component {...item} baseContainerStyle={baseContainerStyle} />;
  };

  render() {
    if (!this.props.config || isEmpty(this.props.config)) {
      // console.log("rendering sectionlist: null");
      return null;
    }

    // console.log("rendering sectionlist ", this.props.config);

    return (
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={this.props.config.components}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          keyExtractor={extractKey}
          renderSectionFooter={this.renderSectionFooter}
        />
      </SafeAreaView>
    );
  }
}

VerticalGroupedLayout.defaultProps = {
  transform: false,
};

VerticalGroupedLayout.propTypes = {
  config: LayoutConfigType,
  baseContainerStyle: PropTypes.object,
};

export default VerticalGroupedLayout;

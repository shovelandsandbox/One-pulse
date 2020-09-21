import React, { PureComponent } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Colors } from "../../../configs";
import Styles from "./style";
import { TextS } from "../../derivatives/Text";
import { Padder as PadderContainer } from "../../containers";

export default class SimpleList extends PureComponent {
  render() {
    const verticalPadding = { paddingVertical: 4 };
    return (
      <View style={Styles.container}>
        {this.props.title && (
          <View
            style={[
              Styles.title.container,
              !this.props.title && verticalPadding,
            ]}
          >
            <PadderContainer>
              <TextS color={Colors.main.baseGray}>{this.props.title}</TextS>
            </PadderContainer>
          </View>
        )}

        {this.props.children}
      </View>
    );
  }
}

SimpleList.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};

import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity, LinearGradient } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./styles";
import { PruRoundedButton } from "../../../../components";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";

class BottomBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showSkip: true,
    };
  }

  render() {
    const { label } = this.props;
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              this.props.progressCount > 0 ? "white" : "transparent",
            borderTopColor: this.props.progressCount > 0 ? "#bbbebe" : "",
            borderTopWidth: this.props.progressCount > 0 ? 2 : null,
          },
        ]}
      >
        <View style={styles.buttonView}>
          <PruRoundedButton
            buttonTitle={label}
            style={{ width: 99 }}
            onPress={() => {
              this.props.handleClick();
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

BottomBar.propTypes = {};

export default connect(mapStateToProps, {})(BottomBar);

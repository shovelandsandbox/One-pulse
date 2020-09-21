import React, { PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Animated,
  UIManager,
  Platform,
} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class FAQRowItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isActive: this.props.isActive,
    };
  }

  componentDidMount() {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps && nextProps.isActive !== prevState.isActive) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      return {
        isActive: nextProps.isActive,
      };
    }
  }

  handleFAQRowItem = item => (
    <TouchableOpacity style={styles.container} onPress={this.props.onFAQPress}>
      <View style={styles.faqQuestion}>
        <View style={{ flex: 0.9 }}>
          <Text style={styles.questionText}>{item.question}</Text>
        </View>
        <View style={{ paddingVertical: 5 }}>
          <MaterialIcons
            style={{ alignSelf: "center", marginLeft: -16 }}
            name={
              this.state.isActive ? "keyboard-arrow-up" : "keyboard-arrow-down"
            }
            size={25}
            color="#a8a8a8"
          />
        </View>
      </View>
      {this.state.isActive ? (
        <Text style={styles.answerText}>{item.answer}</Text>
      ) : null}
    </TouchableOpacity>
  );

  render() {
    return <View>{this.handleFAQRowItem(this.props.item)}</View>;
  }
}

FAQRowItem.propTypes = {
  item: PropTypes.object,
};

export default FAQRowItem;

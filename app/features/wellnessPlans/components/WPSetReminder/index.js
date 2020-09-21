import React, { PureComponent } from "react";
import { Text, View, LayoutAnimation, Platform, UIManager } from "react-native";
import CheckBox from "react-native-check-box";

import styles from "./styles";

class WPSetReminder extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checked: props.checked
    };
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }

  toggleCheck = () => {
    const { checked } = this.state;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

    this.setState(
      {
        checked: !checked
      },
      () => {
        this.props.remindParent && this.props.remindParent(this.state.checked);
      }
    );
  };

  render() {
    const { time, timeZone } = this.props;
    const { checked } = this.state;
    
    return (
      <View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            isChecked={checked}
            checkBoxColor={"#ec1c2e"}
            onClick={this.toggleCheck}
          />
        </View>

        <View
          style={[
            styles.timeContainer,
            checked
              ? styles.checkedContainer
              : styles.uncheckedContainer
          ]}
        >
          <Text
            style={[
              styles.timeTitle,
              checked 
                ? styles.checkedTitle 
                : styles.uncheckedTitle
            ]}
          >
            {time}
          </Text>
        </View>
        <View>
          <Text style={styles.dayTitle}>{timeZone}</Text>
        </View>
      </View>
    );
  }
}

export default WPSetReminder;

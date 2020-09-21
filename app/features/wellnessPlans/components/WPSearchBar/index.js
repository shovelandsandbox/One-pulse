import React from "react";
import PropTypes from "prop-types";
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class WPSearchBar extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      typing: false
    };
  }

  render() {
    const { value, placeholder, onChange, containerStyle, iconStyle, textStyle, iconSize } = this.props;
    return (
      <View style={containerStyle ? containerStyle : styles.searchInput}>        
        <MaterialIcons
          name={"search"}
          size={iconSize ? iconSize : 10}
          style={iconStyle ? iconStyle : styles.searchIcon}
          color="#707070"
        />
        <TextInput
          style={textStyle ? textStyle : styles.inputText}
          value={value}
          onChangeText={onChange}
          maxLength={200}
          placeholder={placeholder}
          placeholderTextColor={"#888888"}
          underlineColorAndroid={"#fff"}
          autoCorrect={false}
        />        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchInput: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d9d3d3",
    paddingHorizontal: 7,    
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginTop: 30,
    paddingVertical: 5
  },
  searchIcon: {
    width: 22,
    height: 22,
    marginRight: 10
  },
  inputText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 25,
    color: "#888888",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular"
  }
});

export default WPSearchBar;

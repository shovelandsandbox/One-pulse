import React, { PureComponent } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SEARCH, CLOSE } from "../../../../config/images";
import { Colors } from "../../styles";
import PropTypes from "prop-types";

export default class search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: props.searchValue,
    };
  }

  onChangeText = text => {
    this.setState({ searchValue: text });
    if (text && text.length >= 3) {
      this.props.onSearch(text);
    }
  };
  render() {
    const { searchValue } = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Image source={SEARCH} style={styles.searchIcon} />
          </View>
          <TextInput
            style={styles.inputContainer}
            onChangeText={text => this.onChangeText(text)}
            value={searchValue}
            placeholder={"Search by food name"}
          ></TextInput>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              this.setState({ searchValue: "" });
              this.props.cancelSearch();
            }}
          >
            <Image source={CLOSE} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

search.propTypes = {
  onSearch: PropTypes.func,
  searchValue: PropTypes.string,
  cancelSearch: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 42,
    justifyContent: "space-between",
    borderRadius: 3,
    shadowColor: Colors.black,
    backgroundColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: { justifyContent: "center", marginLeft: 10, marginRight: 10 },
  inputContainer: { flex: 0.95, fontSize: 14, height: 42, paddingLeft: 6 },
  mainContainer: { flexDirection: "row", marginTop: 10 },
  searchIcon: {
    height: 16,
    width: 16,
  },
});

import React from "react";
import { View, TextInput, KeyboardAvoidingView } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

const Search = ({ searchText, onTextChange }) => (
  <KeyboardAvoidingView>
    <View style={styles.searchView}>
      <Icon name="search" size={17} color={"#afafaf"} />
      <TextInput
        style={styles.searchText}
        placeholder={searchText}
        onChangeText={text => onTextChange(text)}
      />
    </View>
  </KeyboardAvoidingView>
);

Search.propTypes = {
  searchText: PropTypes.string,
  onTextChange: PropTypes.func,
};

export default Search;

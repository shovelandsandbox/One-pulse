import React, { PureComponent } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { metaFinderCustomerConnect } from "../../meta";

class SearchBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
    };
  }

  onChangeText = text => {
    const { onSearch } = this.props;
    this.setState({
      searchText: text,
    });
  };

  onSearch = () => {
    const { searchText } = this.state;
    const { onSearch } = this.props;
    onSearch && onSearch(searchText);
    this.setState({
      searchText: "",
    });
  };

  render() {
    const { searchText } = this.state;

    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          autoFocus={false}
          multiline={false}
          maxLength={255}
          placeholderTextColor="#BBB"
          placeholder={metaFinderCustomerConnect("searchPlaceholder")}
          selectionColor="#ff4f39"
          value={searchText}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSearch}
        />
        <TouchableOpacity
          onPress={() => {
            searchText && this.onSearch();
            Keyboard.dismiss();
          }}
          style={[styles.searchAction]}
        >
          <Icon name={"search"} size={24} color={"#BBB"} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default SearchBar;

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    textAlign: "left",
  },
  searchAction: {
    height: 40,
    width: "12%",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "white",
    borderColor: "#CCC",
    borderWidth: 1,
    overflow: "hidden",
  },
});

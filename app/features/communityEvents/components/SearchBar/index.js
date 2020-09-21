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
import { CONTACT_SEARCH } from "../../../../config/images";

class SearchBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
    };
  }

  onChangeText = text => {
    this.setState({
      email: text,
    });
  };

  onSearch = () => {
    const { email } = this.state;
    const { onSearch } = this.props;
    onSearch && onSearch(email);
    this.setState({
      email: "",
    });
  };

  render() {
    const { email } = this.state;

    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          autoFocus={false}
          multiline={false}
          maxLength={255}
          placeholderTextColor="#707070"
          placeholder={"Enter email"}
          selectionColor="#ff4f39"
          value={email}
          onChangeText={this.onChangeText}
        />
        <TouchableOpacity
          onPress={() => {
            email && this.onSearch();
            Keyboard.dismiss();
          }}
          style={[
            styles.searchAction,
            email.length === 0 ? { backgroundColor: "#aaa" } : null,
          ]}
        >
          <Image source={CONTACT_SEARCH} style={{ width: 19, height: 14 }} />
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
    backgroundColor: "#ec1c2e",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    shadowRadius: 1,
    shadowOpacity: 0.26,
    borderRadius: 4,
    elevation: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
  },
});

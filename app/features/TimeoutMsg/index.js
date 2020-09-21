import React, { PureComponent } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Clipboard,
  StyleSheet,
} from "react-native";
import { pathOr } from "ramda";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class TimeoutMsg extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: "",
    };
  }

  copyToClipboard = item => {
    Clipboard.setString(item);
  };
  renderItem = ({ item = {}, index }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.setState({ selectedIndex: index })}
          style={styles.margin}
        >
          <Text>{`Operation : ${item.operation}`}</Text>
          <Text>{`Time : ${item.time}`}</Text>
        </TouchableOpacity>
        {index === this.state.selectedIndex && (
          <View style={{ margin: 10 }}>
            <Text>{JSON.stringify(item)}</Text>
            <TouchableOpacity
              onPress={() => this.copyToClipboard(JSON.stringify(item))}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{"Copy"}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.props.data}
          extraData={this.state.selectedIndex}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

TimeoutMsg.propTypes = {
  data: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    data: pathOr([], ["appNotifications", "timeoutMsgArr"], state),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TimeoutMsg);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "red",
    borderRadius: 3.3,
    height: 35,
    justifyContent: "center",
    marginVertical: 5,
    width: 100,
  },
  buttonText: {
    color: "#ffffff",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 3.3,
    elevation: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  margin: {
    margin: 5,
  },
});

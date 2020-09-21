import React, { PureComponent } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { metaFinderCustomerConnect } from "../../meta";

class CallOrChatActionButton extends PureComponent {
  render() {
    const {
      handleOnStartCall,
      handleOnStartChat,
      isCallVisible,
      isChatVisible,
    } = this.props;
    return (
      <View style={styles.actionContainer}>
        {isCallVisible ? (
          <TouchableOpacity
            onPress={handleOnStartCall ? handleOnStartCall : null}
            style={styles.actionButton}
          >
            <Icon name="phone" color="#ec1c2e" size={26} />
            <Text style={{ color: "#ec1c2e", fontSize: 13, paddingLeft: 4 }}>
              {metaFinderCustomerConnect("startCall")}
            </Text>
          </TouchableOpacity>
        ) : null}
        {isChatVisible ? (
          <TouchableOpacity
            onPress={handleOnStartChat ? handleOnStartChat : null}
            style={[styles.actionButton, { backgroundColor: "#ec1c2e" }]}
          >
            <Icon name="chat-bubble" color="#FFF" size={26} />
            <Text style={{ color: "#FFF", fontSize: 13, paddingLeft: 4 }}>
              {metaFinderCustomerConnect("startChat")}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

export default CallOrChatActionButton;

const styles = StyleSheet.create({
  actionButton: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderColor: "#ec1c2e",
    borderRadius: 40,
    borderWidth: 1,
    elevation: 4,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 15,
    paddingVertical: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.26,
    shadowRadius: 4,
  },
  actionContainer: {
    alignItems: "center",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    left: 16,
    position: "absolute",
    right: 16,
  },
});

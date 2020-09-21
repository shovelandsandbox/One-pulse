import React from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import PruIcon from "../PruIcon";

class PruAuthModal extends React.PureComponent {
  state = {
    modalVisible: true
  };

  showModal = isVisible => {
    this.setState({ modalVisible: isVisible });
  };
  render() {
    return (
      <View>
        <Modal
          visible={this.state.modalVisible}
          animationType="fade"
          transparent={true}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({ modalVisible: false });
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.faceId();
                    this.showModal(false);
                  }}
                >
                  <PruIcon name="face" color="red" size={60} />
                </TouchableOpacity>
                <View style={styles.devider} />
                <TouchableOpacity
                  onPress={() => {
                    this.props.touchId();
                    this.showModal(false);
                  }}
                >
                  <PruIcon name="fingerprint" color="red" size={60} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

export default PruAuthModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center"
  },
  modalContent: {
    backgroundColor: "white",
    flexDirection: "row",
    width: 200,
    height: 100,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10
  },
  devider: {
    borderColor: "grey",
    borderWidth: 0.5,
    height: 80
  }
});

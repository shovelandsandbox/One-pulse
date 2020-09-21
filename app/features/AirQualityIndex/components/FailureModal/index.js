import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { AQHI_pin } from "../../../../config/images";
import { styles } from './styles'
import metaConstants from "../../meta";
import { Theme } from "../../../../themes";
import SafeAreaView from "react-native-safe-area-view";
const { Colors } = Theme;
export default class FailureModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.metaConstants = { ...metaConstants.airQualityScreenMeta() }
  }

  render() {
    return (
      <Modal
        isVisible={this.props.visible}
        hasBackdrop={true}
        backdropOpacity={0.8}
        backdropColor={Colors.text333333}
        style={styles.modalContainer}
      >
        <SafeAreaView style={{ flex: 1 }}>

          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image style={styles.imgStyle} source={AQHI_pin} resizeMode={"contain"} />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>{this.metaConstants.weAreSorry}</Text>
              <Text style={styles.description}>
                {this.metaConstants.notAvailabel}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.closeModal();
              }}
              style={styles.okayButtonContainer}
            >
              <Text style={styles.okay}>
                {this.metaConstants.modalClose}
              </Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </Modal>
    );
  }
}


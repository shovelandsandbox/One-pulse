import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Image, View, TouchableOpacity, Text } from "react-native";
import Modal from "react-native-modal";

import styles from "./styles";

import { WELLNESS_CLOSE } from "../../../../config/images";
import { PruRoundedButton } from "../../../../components";
import Icon from "react-native-vector-icons/Ionicons";
export class WPDarkModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      Component: null,
      positiveText: null,
      negativeText: null,
      positivePress: null,
      negativePress: null,
      isBottomCloseRequired: true,
      largePositiveButton: false,
      disableDropBackPress: false,
    };
    WPDarkModal.singletonRef = this;
  }

  static show(componentDetails) {
    WPDarkModal.singletonRef._show(componentDetails);
  }

  static hide() {
    WPDarkModal.singletonRef._hide();
  }

  _show = componentDetails => {
    this.setState({
      isVisible: true,
      Component: componentDetails.Component,
      positivePress: componentDetails.positivePress,
      negativePress: componentDetails.negativePress,
      positiveText: componentDetails.positiveText,
      negativeText: componentDetails.negativeText,
      isBottomCloseRequired: componentDetails.isBottomCloseRequired,
      largePositiveButton: componentDetails.largePositiveButton,
      disableDropBackPress: componentDetails.disableDropBackPress
    });
  };

  _hide = () => {
    this.setState({
      isVisible: false,
    });
  };

  negativePress = () => {
    this._hide();
    this.state.negativePress && this.state.negativePress();
  };

  positivePress = () => {
    this._hide();
    this.state.positivePress && this.state.positivePress();
  };

  render() {
    const {
      isVisible,
      Component,
      positiveText,
      negativeText,
      isBottomCloseRequired,
      largePositiveButton,
      disableDropBackPress,
    } = this.state;
    const Wrapper = View;

    return (
      <Modal
        isVisible={isVisible}
        useNativeDriver={true}
        animationIn={"zoomIn"}
        animationOut={"zoomOut"}
        animationInTiming={500}
        hideModalContentWhileAnimating={true}
        style={styles.modal}
        onBackdropPress={disableDropBackPress ? null : this._hide}
        backdropColor={"#000000"}
        backdropOpacity={0.6}
        onRequestClose={() => this._hide()}
      >
        <View style={styles.modalContainer} resizeMode={"contain"}>
          <View style={styles.WrapperContainer}>
            <View style={[styles.container, { backgroundColor: "#FFFFFF" }]}>
              <Wrapper
                style={styles.imageBackground}
                source={{
                  uri: ``,
                }}
                resizeMode={"cover"}
              >
                {Component && Component()}
                {positiveText || negativeText ? (
                  <View style={
                    largePositiveButton ? 
                      [styles.startButtonContainer, { marginBottom: 20 }] :
                      styles.letsgoButtonContainer
                    }
                  >
                    {negativeText && (
                      <TouchableOpacity
                        style={styles.noButton}
                        onPress={this.negativePress}
                      >
                        <Text style={styles.noText}>{negativeText}</Text>
                      </TouchableOpacity>
                    )}
                    {positiveText && (
                      <PruRoundedButton
                        buttonTitle={positiveText}
                        style={
                          largePositiveButton ? 
                            styles.startRoundedButton : 
                            styles.letsgoButton
                        }
                        onPress={this.positivePress}
                      />
                    )}
                  </View>
                ) : null}
              </Wrapper>
            </View>
            {isBottomCloseRequired && (
              <TouchableOpacity
                style={styles.closeButtonContainer}
                onPress={() => this._hide()}
              >
                <Icon name="ios-close" size={32} color={"#fd555b"} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  appConfig: state.appConfig,
});

WPDarkModal.propTypes = {};

export default connect(mapStateToProps, {})(WPDarkModal);

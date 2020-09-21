/** Usage:
 * CustomAlert.show();
 */

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";
import {configureLineHeight} from "../../utils/lineHeightsUtils";

const bgImageId = "7598d482-b446-4507-8e0d-c1229065494a";

const BuildButton = props => (
  <TouchableOpacity onPress={props.action} style={props.styles}>
    <Text style={{...props.buttonStyles, ...configureLineHeight("14")}}>{props.text}</Text>
  </TouchableOpacity>
);

export class PruCustomAlert extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      title: "",
      description: "",
      positiveText: "OK",
      negativeText: "",
      isButtonDisabled: false,
      invert: false,
    };
    PruCustomAlert.singletonRef = this;
  }

  static show(title, description, options) {
    PruCustomAlert.singletonRef._show(title, description, options);
  }

  static hide() {
    PruCustomAlert.singletonRef._hide();
  }

  _show = (title, description, options = {}) => {
    this.options = options;
    this.setState({
      isVisible: true,
      isButtonDisabled: false,
      title: title,
      description: description,
      positiveText: options.positiveText
        ? options.positiveText
        : this.state.positiveText,
      negativeText: options.negativeText ? options.negativeText : null,
      animateBackground: options.animateBackground,
      invert: options.invert,
    });
  };

  _hide = () => {
    this.setState({
      isVisible: false,
      isButtonDisabled: true,
    });
  };

  onNegativePress = () => {
    if (this.state.isButtonDisabled) {
      return;
    }
    this._hide();
    this.options.onNegativePress && this.options.onNegativePress();
  };

  onPositivePress = () => {
    if (this.state.isButtonDisabled) {
      return;
    }
    this._hide();
    this.options.onPositivePress && this.options.onPositivePress();
  };

  render() {
    const { isVisible, animateBackground } = this.state;
    const {
      title,
      description,
      positiveText,
      negativeText,
      invert,
    } = this.state;

    let darkStyles = [styles.container, styles.title, styles.description];

    const modalConfigFromProps = this.options?.modalConfig
      ? this.options.modalConfig
      : {};

    let ModalConfig = {
      isVisible: isVisible,
      useNativeDriver: true,
      animationIn: "zoomIn",
      animationOut: "zoomOut",
      animationInTiming: 500,
      hideModalContentWhileAnimating: true,
      style: styles.modal,
      onBackdropPress: this._hide,
      ...modalConfigFromProps,
    };

    if (invert) {
      darkStyles = [
        styles.darkModalContainer,
        styles.darkTitle,
        styles.darkDescription,
      ];
      ModalConfig = {
        ...ModalConfig,
        backdropColor: "#ffffff",
        backdropOpacity: 0.6,
      };
    }

    const PositiveButton = customStyle => (
      <BuildButton
        action={this.onPositivePress}
        styles={customStyle ? customStyle : styles.positiveButton}
        buttonStyles={styles.positiveButtonText}
        text={positiveText}
      />
    );

    const NegativeButton = () => (
      <BuildButton
        action={this.onNegativePress}
        styles={styles.negativeButton}
        buttonStyles={styles.negativeButtonText}
        text={negativeText}
      />
    );

    // const Wrapper = animateBackground ? ImageBackground : View;
    const Wrapper = View;
    return (
      <Modal {...ModalConfig}>
        <View style={styles.modalContainer} resizeMode={"contain"}>
          {animateBackground ? (
            <Image
              source={{ uri: this.props.appConfig.CMS_URL + bgImageId }}
              style={styles.imageContainer}
              resizeMode={"cover"}
            />
          ) : null}
          <View style={styles.WrapperContainer}>
            <View style={darkStyles[0]}>
              <Wrapper
                style={styles.imageBackground}
                source={{
                  uri: ``,
                }}
                resizeMode={"cover"}
              >
                {title ? <Text style={darkStyles[1]}>{title}</Text> : null}
                {description ? (
                  <Text style={{
                    ...darkStyles[2],
                    ...configureLineHeight("14")
                  }}>{description}</Text>
                ) : null}
                {negativeText && positiveText ? (
                  <View style={styles.buttonWrapper}>
                    {PositiveButton()}
                    {NegativeButton()}
                  </View>
                ) : (
                    <View style={styles.singleButtonWrapper}>
                      {PositiveButton(styles.singlePositiveButton)}
                    </View>
                  )}
              </Wrapper>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  appConfig: state.appConfig,
});

PruCustomAlert.propTypes = {};

export default connect(mapStateToProps, {})(PruCustomAlert);

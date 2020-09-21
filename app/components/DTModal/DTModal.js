import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import PropTypes from "prop-types";
import { SKELETON, MUSCULAR, ORGANS } from "../../config/images";
import { colors, CoreConfig, metaHelpers } from "@pru-rt-internal/pulse-common";
import styles from "./styles";
import { configureLineHeight } from "../../utils/lineHeightsUtils";

const { SCREEN_KEY_DIGITAL_TWIN } = CoreConfig;

const KEY_SUPERFICIAL = "superficial";
const KEY_MEDIUM = "medium";
const KEY_DEEP = "deep";
const KEY_ORGANS = "organs";
const KEY_SKELETAL = "skeletal";
const KEY_MUSCULAR = "muscular";
const KEY_OKAY = "okay";
const KEY_CANCEL = "cancel";

// eslint-disable-next-line react/require-optimization
export default class DTModal extends React.Component {
  findElement = elementName =>
    metaHelpers.findElement(SCREEN_KEY_DIGITAL_TWIN, elementName);

  stylesForLayer = layer => {
    const { userSelectedLayer } = this.props;
    const activeStyles = [styles.activeSegment, styles.activeSegmentText];
    const inactiveStyles = [styles.inactiveSegment, styles.inactiveSegmentText];
    if (layer === "" || layer === userSelectedLayer) {
      return activeStyles;
    }
    return inactiveStyles;
  };

  isMuscularLayer = userSelectedLayer =>
    userSelectedLayer === "deep" ||
    userSelectedLayer === "intermediate" ||
    userSelectedLayer === "superficial" ||
    userSelectedLayer === "";

  renderDepthItem = (item, itemText) => {
    const { onSelect } = this.props;
    return (
      <Text
        onPress={onSelect.bind(this, item)}
        style={{
          ...this.stylesForLayer(item),
          ...configureLineHeight("14")
        }}
      >
        {itemText}
      </Text>
    );
  };
  renderDepthRow() {
    const superficial = this.findElement(KEY_SUPERFICIAL).label;
    const deep = this.findElement(KEY_DEEP).label;
    const intermediate = this.findElement(KEY_MEDIUM).label;

    return (
      <View style={{ flexDirection: "row", marginVertical: 30 }}>
        {this.renderDepthItem("superficial", superficial)}
        {this.renderDepthItem("intermediate", intermediate)}
        {this.renderDepthItem("deep", deep)}
      </View>
    );
  }

  renderDTLayerType = (layer, imageSrc, text, isSelected) => {
    const { onSelect, userSelectedLayer } = this.props;
    return (
      <TouchableOpacity
        style={
          isSelected || userSelectedLayer === layer
            ? styles.selectedType
            : styles.unselectedType
        }
        onPress={onSelect.bind(this, layer)}
      >
        <Image style={styles.DTImage} source={imageSrc} resizeMode="contain" />
        <Text style={{...styles.DTText, ...configureLineHeight("15")}}>{text}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { visible, onClose, onOkay, userSelectedLayer } = this.props;
    const organs = this.findElement(KEY_ORGANS).label;
    const skeletal = this.findElement(KEY_SKELETAL).label;
    const muscular = this.findElement(KEY_MUSCULAR).label;
    const okay = this.findElement(KEY_OKAY).label;
    const cancel = this.findElement(KEY_CANCEL).label;

    return (
      <View>
        <Modal onRequestClose={() => {}} visible={visible} transparent={true}>
          <TouchableOpacity
            style={dtmStyles.modalBtnContainer}
            onPress={onClose}
          >
            <View style={styles.container}>
              {this.isMuscularLayer(userSelectedLayer) && this.renderDepthRow()}
              <View
                style={[styles.flexRow, styles.segment, { marginBottom: 20 }]}
              >
                {this.renderDTLayerType("organ", ORGANS, organs)}
                {this.renderDTLayerType(
                  "deep",
                  MUSCULAR,
                  muscular,
                  this.isMuscularLayer(userSelectedLayer)
                )}
                {this.renderDTLayerType("skeletal", SKELETON, skeletal)}
              </View>
              <View style={[styles.flexRow, styles.footer]}>
                <TouchableOpacity style={styles.footerAction} onPress={onClose}>
                  <Text style={{...styles.DTText, ...configureLineHeight("15")}}>{cancel}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onOkay} style={styles.footerAction}>
                  <Text style={{...styles.DTText, ...configureLineHeight("15")}}> {okay}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

DTModal.defaultProps = {
  visible: true,
};

DTModal.propTypes = {
  visible: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onOkay: PropTypes.func.isRequired,
  userSelectedLayer: PropTypes.string,
};

const dtmStyles = StyleSheet.create({
  modalBtnContainer: {
    alignItems: "center",
    backgroundColor: colors.blackDot8,
    flex: 1,
    justifyContent: "center",
  },
});

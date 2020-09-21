/* eslint-disable react-native/no-raw-text */
import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { Colors } from "../../../configs";
import Styles from "./style";
import { TextMX, TextM, TextS } from "../../derivatives/Text";
import Icon from "../../generics/Icon";
import { metaHelpers } from "@pru-rt-internal/pulse-common";

const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_DOC_ADD = "step_4_add_document";
const KEY_CLAIM_DOC_OPTIONAL = "step_4_optional";
const KEY_CLAIM_DOC_REQUIRED = "step_4_required";

export default class DocumentUploader extends Component {
  static propTypes = {
    placeHolder: PropTypes.any,
    onAddPress: PropTypes.func,
    onRemovePress: PropTypes.func,
    documents: PropTypes.array,
    note: PropTypes.string,
    label: PropTypes.string,
    noMargin: PropTypes.bool,
    headless: PropTypes.bool,
    optional: PropTypes.bool
  };

  shouldComponentUpdate(nextProps) {
    return this.props != nextProps;
  }

  renderAddButton() {
    const flex = { flex: 1 };
    return (
      <TouchableOpacity
        style={Styles.addButton.container}
        onPress={
          this.props.onAddPress ? () => this.props.onAddPress() : () => {}
        }
      >
        <View style={Styles.addButton.icon.container}>
          <Icon name="camera" color={Colors.main.baseRed} />
        </View>

        <View style={flex}>
          <TextM color={Colors.main.baseRed}>
            {this.props.placeHolder
              ? this.props.placeHolder
              : claimMeta(KEY_CLAIM_DOC_ADD).label}
          </TextM>
        </View>
      </TouchableOpacity>
    );
  }

  static renderProgress(percentage) {
    if (percentage === 100) {
      return null;
    }

    return (
      <View style={Styles.document.info.progress.container}>
        <View
          style={[Styles.document.info.progress.current, { flex: percentage }]}
        />

        <View style={{ flex: 100 - percentage }} />
      </View>
    );
  }

  renderDocumentItem(name, image, percentage, index) {
    if (name === "" && image === "") return null;
    return (
      <View key={index} style={Styles.document.container}>
        <Image
          style={Styles.document.image.container}
          source={{ uri: `data:image/jpeg;base64,${image}` }}
        />

        <View style={Styles.document.info.contatiner}>
          <TextS>{name}</TextS>

          {DocumentUploader.renderProgress(100)}
        </View>

        <TouchableOpacity
          style={Styles.document.deleteButton.container}
          onPress={
            this.props.onRemovePress
              ? () => this.props.onRemovePress(index)
              : () => {}
          }
        >
          <Icon name="close" />
        </TouchableOpacity>
      </View>
    );
  }

  renderDocuments() {
    return (
      <View style={Styles.document.grouper}>
        <View style={Styles.document.innerGrouper}>
          {this.props.documents.map((item, index) => {
            return this.renderDocumentItem(
              item.name,
              item.image,
              item.upload_percentage,
              index
            );
          })}
          {this.renderAddButton()}
        </View>
      </View>
    );
  }

  render() {
    let noteRender = null;
    if (this.props.note) {
      noteRender = (
        <TextS color={Colors.main.baseGray} style={Styles.note}>
          {this.props.note}
        </TextS>
      );
    }

    //#endregion

    let optionalFlagRender = null;
    if (this.props.optional && !this.props.headless) {
      optionalFlagRender = (
        <TextMX color={Colors.main.baseGray} size={14}>
          {this.props.optional === "1"
            ? claimMeta(KEY_CLAIM_DOC_REQUIRED).label
            : claimMeta(KEY_CLAIM_DOC_OPTIONAL).label}
        </TextMX>
      );
    }

    let labelRender = null;
    if (!this.props.headless) {
      labelRender = (
        <TextMX>
          {this.props.label + " "}
          {optionalFlagRender}
        </TextMX>
      );
    }

    const noMargin = { marginBottom: 0 };

    return (
      <View style={[Styles.container, this.props.noMargin && noMargin]}>
        <View style={Styles.dot.container}>
          <TextMX>{!this.props.headless ? "•  " : ""}</TextMX>
        </View>

        <View style={Styles.innerContainer}>
          {labelRender}

          {noteRender}

          {this.renderDocuments(this.props.documents)}
        </View>
      </View>
    );
  }
}

const claimMeta = key => {
  return metaHelpers.findElement(TYPE_CLAIM, key);
};

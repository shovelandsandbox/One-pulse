import React, { Component } from "react";
import { View } from "react-native";
import { LifeAssuredSelectionRow as LifeAssuredSelectionRowCard } from "../../components/cards";
import {
  ModalPicker as ModalPickerContainer,
  Padder as PadderContainer,
} from "../../components/containers";
import { convertToCapitalCase } from "../../utils";
import { metaHelpers } from "@pru-rt-internal/pulse-common";
import Styles from "../../screens/MyClaim/HistoryList/style";
import { ImageIllustration } from "../../components/derivatives/Image";
import { TextLX, TextM } from "../../components/derivatives/Text";
import { Colors } from "../../configs";

const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_LIFE_ASSURED_TITLE = "step_1_insured_select_desc";
const KEY_CLAIM_LIFE_ASSURED_SELECT = "select";
const historyListMeta = (meta, types, keys) =>
  meta.find(item => item.type === types && item.key === keys).label;
const MAIN_CLAIM = "mainclaim";
const laPickerMeta = (meta, type) => {
  const items = meta.find(item => item.key === type);
  return items === undefined ? type : items.label;
};

export default class LifeAssuredPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: this.getValueIndex(props),
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state != nextState) {
      return true;
    }

    if (this.props != nextProps) {
      const value = this.getValueIndex(nextProps);
      this.setState({
        selectedIndex: value,
      });

      return true;
    }

    return false;
  }

  onSubmit() {
    const options = this.props.options;

    let value = "";
    if (options[this.state.selectedIndex]) {
      value = {
        name: options[this.state.selectedIndex].lsurname,
        clientNumber: options[this.state.selectedIndex].laId,
      };
    }

    this.props.onSubmit(value);
  }

  getValueIndex(data) {
    return data.value
      ? this.props.options.findIndex(
          option =>
            option.lsurname.trim().toLowerCase() ==
            data.value.trim().toLowerCase()
        )
      : -1;
  }

  onSelect(index, value = false) {
    if (value && this.state.selectedIndex != index) {
      this.setState({ selectedIndex: index });
    }
  }

  renderLifeAssuredsItem(name, data, index) {
    let suspensionNote = "";
    let isSuspend = false;

    if (data.messageStatus && data.messageStatus !== "") {
      suspensionNote = laPickerMeta(this.props.meta, data.messageStatus);
      isSuspend = true;
    }
    return (
      <LifeAssuredSelectionRowCard
        key={index}
        name={convertToCapitalCase(name, false)}
        image={data.image}
        note={suspensionNote}
        isSelected={this.state.selectedIndex == index}
        onToggle={value => this.onSelect(index, value)}
        isDisabled={isSuspend}
      />
    );
  }

  renderLifeAssureds() {
    const { option, options, meta } = this.props;
    const lifeAssureds = options;
    if (lifeAssureds.length === 0) {
      return (
        <PadderContainer style={Styles.container}>
          <View style={Styles.top.container}>
            <View style={Styles.top.image.container}>
              <ImageIllustration name={"modal.empty_history_claim"} />
            </View>
          </View>

          <View style={Styles.bottom}>
            <TextLX
              align={"center"}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ marginBottom: 24 }}
              color={
                // this.props.inverse ?
                Colors.main.baseBlack
                // : Colors.main.fontGray
              }
            >
              {historyListMeta(
                meta.metaDetail.commons,
                MAIN_CLAIM,
                "listclaimlifeassuredtitle"
              )}
            </TextLX>

            <TextM
              align={"center"}
              color={
                // this.props.inverse
                // ? Colors.main.baseWhite :
                Colors.main.baseGray
              }
            >
              {option === "in"
                ? historyListMeta(
                    meta.metaDetail.commons,
                    MAIN_CLAIM,
                    "listclaiminpatientdesc"
                  )
                : historyListMeta(
                    meta.metaDetail.commons,
                    MAIN_CLAIM,
                    "listclaimoutpatientdesc"
                  )}
            </TextM>
          </View>
        </PadderContainer>
      );
    }
    return (
      <View>
        {lifeAssureds.map((la, index) => {
          return this.renderLifeAssuredsItem(la.lsurname, la, index);
        })}
      </View>
    );
  }

  // MAIN RENDERX

  render() {
    const { options } = this.props;
    const lifeAssureds = options;
    if (lifeAssureds.length === 0) {
      return (
        <ModalPickerContainer
          isActive={this.props.isActive}
          onClosePress={() => this.props.onClose()}
          title={""}
        >
          {this.renderLifeAssureds()}
        </ModalPickerContainer>
      );
    }
    return (
      <ModalPickerContainer
        isActive={this.props.isActive}
        onClosePress={() => this.props.onClose()}
        title={claimMeta(KEY_CLAIM_LIFE_ASSURED_TITLE).label}
        submitLabel={claimMeta(KEY_CLAIM_LIFE_ASSURED_SELECT).label}
        onSubmit={() => this.onSubmit()}
      >
        {this.renderLifeAssureds()}
      </ModalPickerContainer>
    );
  }
}

const claimMeta = key => {
  return metaHelpers.findElement(TYPE_CLAIM, key);
};

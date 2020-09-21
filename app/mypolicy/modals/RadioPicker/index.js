import React, { Component } from "react";
import PropTypes from "prop-types";
import { Colors } from "../../configs";
import { LifeAssuredSelectionRow as LifeAssuredSelectionRowCard } from "../../components/cards";
import { InputString } from "../../components/derivatives/Input";
import {
  ModalPicker as ModalPickerContainer,
  Padder as PadderContainer,
} from "../../components/containers";

export default class RadioPicker extends Component {
  static propTypes = {
    buttonText: PropTypes.string,
  };

  static defaultProps = {
    buttonText: "Select",
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: this.getValueIndex(props),
      isActive: false,
      searchQuery: "",
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
      value = options[this.state.selectedIndex].name;
    }

    this.props.onSubmit(value);
  }

  search(value) {
    this.setState({
      searchQuery: value,
    });
  }

  getValueIndex(data) {
    return data.value
      ? this.props.options.findIndex(
          option =>
            option.name.trim().toLowerCase() == data.value.trim().toLowerCase()
        )
      : -1;
  }

  onSelect(index, value = false) {
    if (value && this.state.selectedIndex != index) {
      this.setState({ selectedIndex: index });
    }
  }

  renderOptionItem(name, image = null, index) {
    return (
      <PadderContainer key={index}>
        <LifeAssuredSelectionRowCard
          name={name}
          isSelected={this.state.selectedIndex == index}
          onToggle={value => this.onSelect(index, value)}
          noPadding
          noImage={!this.props.imageMapper}
          image={image}
        />
      </PadderContainer>
    );
  }

  renderOptions() {
    const options = this.props.options.map((option, index) => {
      if (
        this.state.searchQuery &&
        option.name
          .toLowerCase()
          .indexOf(this.state.searchQuery.toLowerCase()) === -1
      ) {
        return null;
      }

      return this.renderOptionItem(
        option.name,
        !this.props.imageMapper ? null : this.props.imageMapper(option),
        index
      );
    });

    return options;
  }

  renderSearch() {
    if (!this.props.searchablePlaceholder) {
      return null;
    }

    return (
      <PadderContainer>
        <InputString
          placeholder={this.props.searchablePlaceholder}
          rightIcon={"search"}
          rightIconColor={Colors.main.inactiveGray}
          onChangeText={value => this.search(value)}
          value={this.state.searchQuery}
        />
      </PadderContainer>
    );
  }

  render() {
    return (
      <ModalPickerContainer
        isActive={this.props.isActive}
        onClosePress={() => this.props.onClose()}
        title={this.props.title}
        submitLabel={this.props.buttonText}
        onSubmit={() => this.onSubmit()}
      >
        {this.renderSearch()}

        {this.renderOptions()}
      </ModalPickerContainer>
    );
  }
}

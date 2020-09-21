/* eslint-disable react-native/no-raw-text */
//#region IMPORTS

// PACKAGE IMPORTS
import React, { Component } from "react";
import { View, TouchableOpacity, Keyboard } from "react-native";
import PropTypes from "prop-types";

// LOCAL & CONFIG IMPORTS
import { Colors } from "../../configs";
import Styles from "./style";

// COMPONENT IMPORTS
import { TextLX, TextM, TextS } from "../../components/derivatives/Text";
import Input from "../../components/generics/Input";
import Icon from "../../components/generics/Icon";
import { ImageIllustration } from "../../components/derivatives/Image";
import { BottomButtonGroup as BottomButtonGroupCard } from "../../components/cards";
import {
  Padder as PadderContainer,
  Modal as ModalContainer,
} from "../../components/containers";

export default class Rating extends Component {
  //#region CONSTRUCTOR AND LIFECYCLE HOOKS

  static propTypes = {
    onConfirm: PropTypes.func,
    isActive: PropTypes.bool,
    onClosePress: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      review: "",

      isKeyboarUp: false,
      ratingIndex: -1,
    };

    this.keyboardWillShow = Keyboard.addListener("keyboardWillShow", () => {
      this.setState({ isKeyboarUp: true });
    });

    this.keyboardWillHide = Keyboard.addListener("keyboardWillHide", () => {
      this.setState({ isKeyboarUp: false });
    });
  }

  //#endregion

  //#region CLASS FUNCTIONS

  onStarPress(ratingIndex) {
    this.setState({ ratingIndex });
    this.props.onStarPress(ratingIndex);
  }

  onReviewChange(review) {
    this.setState({ review });
    this.props.onReviewChange(review);
  }

  //#endregion

  //#region RENDERS

  renderImageRating(ratingIndex) {
    let ratingImage = "notyet_review";
    if (ratingIndex > 3) {
      ratingImage = "good_review";
    } else if (ratingIndex > 2) {
      ratingImage = "enough_review";
    } else if (ratingIndex > 0) {
      ratingImage = "bad_review";
    }

    return (
      <ImageIllustration
        style={Styles.image.content}
        name={"modal." + ratingImage}
      />
    );
  }

  renderStarItem(index) {
    const isActive = index <= this.state.ratingIndex;

    return (
      <TouchableOpacity
        style={Styles.star.container}
        onPress={() => this.onStarPress(index)}
      >
        <Icon
          name={isActive ? "star-white" : "star-line"}
          color={isActive ? Colors.main.warningYellow : Colors.main.baseWhite}
        />
      </TouchableOpacity>
    );
  }

  renderStars() {
    return (
      <View style={Styles.star.grouper}>
        {this.renderStarItem(1)}
        {this.renderStarItem(2)}
        {this.renderStarItem(3)}
        {this.renderStarItem(4)}
        {this.renderStarItem(5)}
      </View>
    );
  }

  renderLabel() {
    if (this.state.isKeyboarUp) {
      return null;
    }
    return (
      <TextM align={"center"} color={Colors.main.baseWhite}>
        {this.props.ratingTitleDesc}
      </TextM>
    );
  }

  renderImage() {
    if (this.state.isKeyboarUp) {
      return null;
    }
    return (
      <View style={Styles.image.container}>
        {this.renderImageRating(this.state.ratingIndex)}
      </View>
    );
  }

  renderTop() {
    return (
      <PadderContainer style={Styles.container}>
        <TextLX
          align={"center"}
          style={Styles.title}
          color={Colors.main.baseWhite}
        >
          {this.props.ratingTitle}
        </TextLX>

        {this.renderLabel()}

        {this.renderImage()}

        {this.renderStars()}
      </PadderContainer>
    );
  }

  renderForm() {
    return (
      <PadderContainer style={Styles.input.container}>
        <Input
          multiline
          maxLength={140}
          style={Styles.input.main}
          placeholder={this.props.ratingPlaceHolder}
          placeholderTextColor={Colors.main.borderGray}
          onChangeText={value => this.onReviewChange(value)}
        />

        <TextS color={Colors.main.baseWhite}>
          {140 - this.state.review.length} / 140 {this.props.ratingChar}
        </TextS>
      </PadderContainer>
    );
  }

  renderBottom() {
    return (
      <View style={Styles.button.container}>
        <BottomButtonGroupCard
          transparentBackground
          inverse
          submitLabel={this.props.ratingSend}
          onSubmit={this.props.onConfirm}
        />
      </View>
    );
  }

  //#endregion

  render() {
    return (
      <ModalContainer
        isActive={this.props.isActive}
        bottomContent={this.renderBottom()}
        backgroundColor={Colors.main.baseRed}
        onClosePress={() => this.props.onClosePress()}
        inverse
        scrollable
      >
        {this.renderTop()}

        {this.renderForm()}
      </ModalContainer>
    );
  }
}

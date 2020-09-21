import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Colors, Sizes } from "../../configs";
import Styles from "./style";
import { TextLX, TextM } from "../../components/derivatives/Text";
import Icon from "../../components/generics/Icon";
import { ImageIllustration } from "../../components/derivatives/Image";
import {
  Padder as PadderContainer,
  Modal as ModalContainer,
  VerticalAnimator as VerticalAnimatorContainer,
} from "../../components/containers";
import { ButtonFull } from "../../components/derivatives/Button";

export default class FeatureDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };

    this._scroll = null;
  }

  scrollPage(newIndex) {
    this._scroll.scrollTo({ x: Sizes.screen.width * newIndex });

    this.setState({
      activeIndex: newIndex,
    });
  }

  onClosePress() {
    if (this.props.onClosePress) {
      this.props.onClosePress();
    }

    this.scrollPage(0);
  }

  onDonePress() {
    if (this.props.onDonePress) {
      this.props.onClosePress();
    }

    this.scrollPage(0);
  }

  renderIndicatorCircleItem(slidesLength, index) {
    const indicators = [];

    for (let i = 0; i < slidesLength; i++) {
      indicators.push(
        <View
          key={i}
          style={[
            Styles.indicator.circle,
            i == index
              ? { backgroundColor: Colors.main.baseRed, width: 20 }
              : {},
          ]}
        />
      );
    }

    return indicators;
  }

  renderIndicatorCircles(slidesLength, index) {
    return (
      <View style={Styles.indicator.grouper}>
        {this.renderIndicatorCircleItem(slidesLength, index)}
      </View>
    );
  }

  renderImage(image) {
    return (
      <View style={Styles.image.outerContainer}>
        <VerticalAnimatorContainer order={1}>
          <View style={Styles.image.container}>
            <ImageIllustration
              name={"modal.feature_description." + image}
              resizeMode="cover"
            />
          </View>
        </VerticalAnimatorContainer>
      </View>
    );
  }

  renderContent(title, description, slidesLength, index) {
    return (
      <VerticalAnimatorContainer order={3}>
        <View style={Styles.content.container}>
          {this.renderIndicatorCircles(slidesLength, index)}

          <TextLX style={Styles.content.title}>{title}</TextLX>

          <TextM color={Colors.main.baseGray}>{description}</TextM>
        </View>
      </VerticalAnimatorContainer>
    );
  }

  renderSlideItem(image, title, description, slidesLength, index) {
    return (
      <View style={Styles.slider.outerContainer} key={index}>
        <View style={Styles.slider.container}>
          <PadderContainer style={Styles.slider.innerContainer}>
            {this.renderImage(image)}

            {this.renderContent(title, description, slidesLength, index)}

            <VerticalAnimatorContainer order={5}>
              {this.renderBottom(slidesLength - 1 == index, index)}
            </VerticalAnimatorContainer>
          </PadderContainer>
        </View>
      </View>
    );
  }

  renderSlides() {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onMomentumScrollEnd={event =>
          this.scrollPage(
            Math.ceil(event.nativeEvent.contentOffset.x / Sizes.screen.width)
          )
        }
        ref={ref => (this._scroll = ref)}
      >
        {this.props.slides.map((slide, index) => {
          return this.renderSlideItem(
            slide.image,
            slide.title,
            slide.description,
            this.props.slides.length,
            index
          );
        })}
      </ScrollView>
    );
  }

  renderBottom(isLast, index) {
    if (isLast) {
      return (
        <ButtonFull onPress={() => this.onDonePress()}>Selesai</ButtonFull>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => this.scrollPage(index + 1)}
        style={Styles.button.container}
      >
        <Icon name="forward" color={Colors.main.baseWhite} />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ModalContainer
        isActive={this.props.isActive}
        onClosePress={() => this.onClosePress()}
        floatingHeader
      >
        {this.renderSlides()}
      </ModalContainer>
    );
  }
}

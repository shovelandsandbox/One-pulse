import React, { PureComponent } from "react";
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { Avatar } from "react-native-elements";
import { PRU_INFO_WITH_RAG_BACKGROUND, CLOSE_ICON } from "../../config/images";
import PruRagIndicator from "../PruRagIndicator";
import { configureLineHeight } from "../../utils/lineHeightsUtils";

export default class PruInfoWithRag extends PureComponent {
  renderCloseButton() {
    return (
      <View style={styles.closeParentContainer}>
        <TouchableOpacity
          onPress={e => {
            e.preventDefault();
            this.props.onClose();
          }}
          style={styles.closeContainer}
        >
          <Image style={styles.close} source={CLOSE_ICON} />
        </TouchableOpacity>
      </View>
    );
  }

  renderWrinkleGuideLine() {
    const valueTitle = this.props.valueTitle;
    const descriptionTitle = this.props.descriptionTitle;
    const indexArray = this.props.indexArray;
    return (
      <View style={styles.wrinkleGuidelineContainer}>
        <View style={styles.horizontalView}>
          <View style={styles.wrinkleContentView}>
            <Text style={{...styles.wrinkleValueTitle, ...configureLineHeight("11")}}>{valueTitle}</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={styles.wrinkleDescriptionView}>
            <Text style={{...styles.wrinkleDescriptionTitle, ...configureLineHeight("11")}}>
              {descriptionTitle}
            </Text>
          </View>
        </View>
        <View style={styles.descriptionView}>
          {indexArray.map(item => (
            <View style={styles.horizontalView}>
              <View style={styles.wrinkleContentView}>
                <View style={styles.wrinkleRangeView}>
                  <View
                    style={[styles.circle, { backgroundColor: item.color }]}
                  />
                  <Text style={{...styles.wrinkleRange, ...configureLineHeight("11")}}>{item.range}</Text>
                </View>
              </View>
              <View style={styles.verticalLine}></View>
              <View style={styles.wrinkleDescriptionView}>
                <Text style={{...styles.wrinkleDescription, ...configureLineHeight("11")}}>
                  {item.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }

  renderBMIGuideLine() {
    const valueTitle = this.props.valueTitle;
    const descriptionTitle = this.props.descriptionTitle;
    const indexArray = this.props.indexArray;
    return (
      <View style={styles.bmiGuidelineContainer}>
        <View style={styles.horizontalView}>
          <View style={styles.bmiContentView}>
            <Text style={{...styles.bmiValueTitle, ...configureLineHeight("11")}}>{valueTitle}</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={styles.bmiDescriptionView}>
            <Text style={{...styles.bmiDescriptionTitle, ...configureLineHeight("11")}}>{descriptionTitle}</Text>
          </View>
        </View>
        <View style={styles.descriptionView}>
          {indexArray.map(item => (
            <View style={styles.horizontalView}>
              <View style={styles.bmiContentView}>
                <View style={styles.bmiRangeView}>
                  <View
                    style={[styles.circle, { backgroundColor: item.color }]}
                  />
                  <Text style={{...styles.bmiRange, ...configureLineHeight("11")}}>{item.range}</Text>
                </View>
              </View>
              <View style={styles.verticalLine}></View>
              <View style={styles.bmiDescriptionView}>
                <Text style={{...styles.bmiDescription, ...configureLineHeight("11")}}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }

  getWrinkleColorRange() {
    const colorRanges = [
      { range: 9, color: "#239d60" },
      { range: 20, color: "#609d23" },
      { range: 20, color: "#ffb83e" },
      { range: 20, color: "#f9e63a" },
      { range: 20, color: "#ff6e6d" },
      { range: 11, color: "#ff0200" },
    ];
    return colorRanges;
  }

  getBMIColorRange() {
    const colorRanges = [
      { range: 18.5, color: "#f1f864" },
      { range: 7.5, color: "#239d60" },
      { range: 5, color: "#ff9f68" },
      { range: 69, color: "#ff0200" },
    ];
    return colorRanges;
  }

  renderResult() {
    const { resultArray, fromWrinkleIndex } = this.props;
    return (
      <View>
        {resultArray.map(item => (
          <View style={styles.resultViewFlex}>
            <View style={fromWrinkleIndex? styles.wrinkleKeyTextContainer : styles.bmiKeyTextContainer}>
              <Text style={{...styles.keyTextStyle, ...configureLineHeight("11")}}>{item.key}</Text>
            </View>
            <View style={fromWrinkleIndex ? styles.wrinkleValueTextContainer: styles.bmiValueTextContainer}>
              <Text style={{...styles.valueTextStyle, ...configureLineHeight("12")}} numberOfLines={2}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }

  render() {
    const range = [...Array(100).keys()];
    return (
      <ImageBackground
        source={PRU_INFO_WITH_RAG_BACKGROUND}
        style={styles.container}
        imageStyle={styles.containerImageStyle}
      >
        {this.renderCloseButton()}
        <ScrollView
          style={styles.resultContainer}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <Text style={{...styles.titleContainer, ...configureLineHeight("16")}}>{this.props.title}</Text>
          <Text style={styles.valueContainer}>{this.props.value}</Text>
          <View style={styles.avatarContainer}>
            <Avatar
              source={this.props.avatarUrl}
              width={55}
              height={61}
              avatarStyle={{ borderRadius: 10 }}
              overlayContainerStyle={{ borderRadius: 10 }}
            />
          </View>
          <View style={styles.resultView}>{this.renderResult()}</View>
          <View style={styles.indicatorView}>
            <PruRagIndicator
              value={this.props.value}
              range={range}
              colorRanges={this.props.fromWrinkleIndex ? this.getWrinkleColorRange() :this.getBMIColorRange()}
              ticksRequired={false}
            />
          </View>
          <Text style={{...styles.guidelineTitle, ...configureLineHeight("20")}}>{this.props.guideLineTitle}</Text>
          {!this.props.fromWrinkleIndex && (
            <View style={styles.bmiGuidelineView}>
              {this.renderBMIGuideLine()}
            </View>
          )}
          {this.props.fromWrinkleIndex && (
            <View style={styles.wrinkleGuideLineView}>
              {this.renderWrinkleGuideLine()}
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    );
  }
}

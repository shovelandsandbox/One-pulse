/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { path } from "ramda";
import { PropTypes } from "prop-types";
import { styles } from "./style";
import {
  GENDER_FEMALE_ICON,
  GENDER_MALE_ICON,
  GENDER_SELECTED_FEMALE_ICON,
  GENDER_SELECTED_MALE_ICON,
} from "../../../../config/images";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import metaKeys from "../../screenMetaKeys";
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";
import { colors } from "@pru-rt-internal/pulse-common";

const GENDER = "gender";
const male = "MALE";
const female = "FEMALE";

const genderOptions = [
  {
    icon: GENDER_MALE_ICON,
    value: male,
    labelKey: metaKeys.gender.male,
  },
  {
    icon: GENDER_FEMALE_ICON,
    value: female,
    labelKey: metaKeys.gender.female,
  },
];

const genderIcons = {
  MALE: GENDER_SELECTED_MALE_ICON,
  FEMALE: GENDER_SELECTED_FEMALE_ICON,
};
export default class CardGender extends PureComponent {
  onValueSelected = gender => {
    const { config } = this.props;
    const { fields } = config;
    const { model } = fields[GENDER];
    this.props.onChange(model, gender.value);
  };

  getGender = () => {
    const { config, fieldValues } = this.props;
    const { fields } = config;
    const { model } = fields[GENDER];
    const value = path(model.split("."), fieldValues);

    return value;
  };

  render() {
    const { config, fieldErrors } = this.props;
    const { fields } = config;
    const { model } = fields[GENDER];
    const error = path(model.split("."), fieldErrors);

    return (
      <View style={styles.cardContainer}>
        <View style={styles.subQuestionContainer}>
          <Text style={styles.yourNumberText}>
            {safeMetaLabelFinder(
              metaKeys.screenName,
              metaKeys.gender.whatIsYourGender
            )}
          </Text>
          <Text style={{...styles.yourNumberDesc, ...configureLineHeight("16")}}>
            {safeMetaLabelFinder(
              metaKeys.screenName,
              metaKeys.gender.needYourGender
            )}
          </Text>
          <View style={styles.imageContainer}>
            {genderOptions.map(gender => {
              const genderValue = this.getGender();
              const genderIcon =
                genderValue && genderValue == gender.value
                  ? genderIcons[genderValue]
                  : gender.icon;

              const borderColor =
                genderValue && genderValue == gender.value
                  ? colors.black
                  : colors.red;
              return (
                <TouchableOpacity
                  key={gender.value}
                  style={styles.genderIconContainer}
                  onPress={() => this.onValueSelected(gender)}
                >
                  <View
                    style={{
                      borderColor,
                      borderRadius: 5,
                      borderWidth: 1,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      style={{
                        alignItems: "center",
                        height: 120,
                        width: 120,
                      }}
                      resizeMode={"contain"}
                      source={genderIcon}
                    />
                  </View>
                  <Text>
                    {safeMetaLabelFinder(metaKeys.screenName, gender.labelKey)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      </View>
    );
  }
}

CardGender.propTypes = {
  config: PropTypes.object,
  fieldErrors: PropTypes.object,
  fieldValues: PropTypes.object,
  onChange: PropTypes.func,
};

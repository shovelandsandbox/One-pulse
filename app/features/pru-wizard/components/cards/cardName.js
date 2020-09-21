/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { PropTypes } from "prop-types";
import { isNil, isEmpty, path } from "ramda";
import { styles } from "./style";
import PruTextInput from "../../../../components/PruTextInput";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import metaKeys from "../../screenMetaKeys";
import theme from "../../../../themes/default";
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";
import { CoreActionTypes, CoreUtils } from "@pru-rt-internal/pulse-common";
const { EVENT_TYPE_USER_ACTIVITY } = CoreActionTypes;
const { setScreen } = CoreUtils;

const FIRST_NAME = "firstName";
const LAST_NAME = "lastName";

export default class CardName extends PureComponent {
  renderField = () => {
    const { config, fieldValues, fieldErrors } = this.props;

    const { fields } = config;
    const mapFirstNameModel = fields[FIRST_NAME].model;
    const mapFirstNameVal = path(mapFirstNameModel.split("."), fieldValues);
    const mapFirstNameErr = path(mapFirstNameModel.split("."), fieldErrors);

    const mapLastNameModel = fields[LAST_NAME].model;
    const mapLastNameVal = path(mapLastNameModel.split("."), fieldValues);
    const mapLastNameErr = path(mapLastNameModel.split("."), fieldErrors);

    // const { model } = fields[NAME];

    return (
      <View style={styles.cardContainer}>
        <View style={styles.subQuestionContainer}>
          <Text style={styles.yourNumberText}>
            {safeMetaLabelFinder(metaKeys.screenName, metaKeys.name.yourName)}
          </Text>
          <Text style={{...styles.addressText, ...configureLineHeight("16")}}>
            {safeMetaLabelFinder(
              metaKeys.screenName,
              metaKeys.name.needYourName
            )}
          </Text>
        </View>
        {
          <View style={styles.nameInputContainer}>
            <PruTextInput
              title={safeMetaLabelFinder(
                metaKeys.screenName,
                metaKeys.name.firstName
              )}
              txtInputStyle={{
                borderWidth: 1,
                borderColor: theme.Colors.greyd9dcde,
              }}
              underlineColorAndroid="transparent"
              placeholder={safeMetaLabelFinder(
                metaKeys.screenName,
                metaKeys.name.firstName
              )}
              messageType={
                !isNil(mapFirstNameErr) && !isEmpty(mapFirstNameErr) && "error"
              }
              message={mapFirstNameErr}
              restrictSpace={true}
              onChange={newVal => {
                this.props.onChange(mapFirstNameModel, newVal);
              }}
              value={mapFirstNameVal}
            />
            <PruTextInput
              containerStyle={{ marginTop: 10 }}
              txtInputStyle={{
                borderWidth: 1,
                borderColor: theme.Colors.greyd9dcde,
              }}
              underlineColorAndroid="transparent"
              placeholder={safeMetaLabelFinder(
                metaKeys.screenName,
                metaKeys.name.lastName
              )}
              title={safeMetaLabelFinder(
                metaKeys.screenName,
                metaKeys.name.lastName
              )}
              messageType={
                !isNil(mapLastNameErr) && !isEmpty(mapLastNameErr) && "error"
              }
              message={mapLastNameErr}
              restrictSpace={true}
              onChange={newVal => {
                this.props.onChange(mapLastNameModel, newVal);
              }}
              value={mapLastNameVal}
            />
          </View>
        }
      </View>
    );
  };

  render() {
    return this.renderField();
  }
}

CardName.propTypes = {
  config: PropTypes.object,
  fieldErrors: PropTypes.object,
  fieldValues: PropTypes.object,
  onChange: PropTypes.func,
};

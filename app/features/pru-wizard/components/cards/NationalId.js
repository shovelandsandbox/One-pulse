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

const NATIONAL_ID = "nationalId";

export default class NationalId extends PureComponent {
  render() {
    const { config, fieldValues, fieldErrors } = this.props;

    const { fields } = config;

    const { model } = fields[NATIONAL_ID];
    const value = path(model.split("."), fieldValues);
    const error = path(model.split("."), fieldErrors);

    return (
      <View style={styles.cardContainer}>
        <View style={styles.subQuestionContainer}>
          <Text style={styles.yourNumberText}>
            {safeMetaLabelFinder(
              metaKeys.screenName,
              metaKeys.nationalId.whatsYourNationalId
            )}
          </Text>
          <Text style={{...styles.yourNumberDesc, ...configureLineHeight("16")}}>
            {safeMetaLabelFinder(
              metaKeys.screenName,
              metaKeys.nationalId.needDetails
            )}
          </Text>
        </View>
        <View style={styles.numberInputContainer}>
          <View style={{ flex: 1 }}>
            <PruTextInput
              placeholder={safeMetaLabelFinder(
                metaKeys.screenName,
                metaKeys.nationalId.nationalId
              )}
              title={safeMetaLabelFinder(
                metaKeys.screenName,
                metaKeys.nationalId.nationalIdTitle
              )}
              txtInputStyle={{
                borderWidth: 1,
                borderColor: theme.Colors.greyd9dcde,
              }}
              value={value}
              onChange={newVal => {
                newVal = newVal.replace(/\s/g, "");
                this.props.onChange(model, newVal);
              }}
              onFocus={() => this.props.resetErrors(model)}
              messageType={!isNil(error) && !isEmpty(error) && "error"}
              message={error}
            />
          </View>
        </View>
      </View>
    );
  }
}

NationalId.propTypes = {
  fieldValues: PropTypes.string,
  fieldErrors: PropTypes.string,
  config: PropTypes.object,
  onChange: PropTypes.func,
  resetErrors: PropTypes.func,
};

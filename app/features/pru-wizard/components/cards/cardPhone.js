import React, { PureComponent } from "react";
import { View, Text, NativeModules, Platform } from "react-native";
import { PropTypes } from "prop-types";
import { isNil, isEmpty, path } from "ramda";
import { styles } from "./style";
import PruTextInput from "../../../../components/PruTextInput";
import metaKeys from "../../screenMetaKeys";
import theme from "../../../../themes/default";
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";
import { metaFinder } from "../../stringUtils";

const { RNPruCommonBridge } = NativeModules;
import {
  CoreActionTypes,
  CoreUtils
} from "@pru-rt-internal/pulse-common";
const { EVENT_TYPE_USER_ACTIVITY } = CoreActionTypes;
const { logFirebaseEvent, setScreen } = CoreUtils;

const PHONE = "phone";

const countryCode = props => {
  return (
    <View style={styles.countryCodeTextContainer}>
      <Text
        style={styles.countryCodeText}
      >{`+${props.countryCommonMeta.isdCode}`}</Text>
    </View>
  );
};
export default class CardPhone extends PureComponent {
  componentDidMount() {
    if (Platform.OS === "android") {
      this.openNumberModal();
    }
  }

  openNumberModal = () => {
    const { config, fieldValues } = this.props;

    const { fields } = config;

    const { model } = fields[PHONE];
    const value = path(model.split("."), fieldValues);

    if (!value)
      RNPruCommonBridge.execute("getSimNumber")
        .then(
          result => {
            const phno = result.substr(3);
            this.props.onChange(model, phno);
            this.props.onNextPressed();
          },
          () => {
            console.log("@@@@@@@@@@@@@@@getSimNumbers:getSimNumber:Noresult");
          }
        )
        .catch(Error => {
          console.log(
            `@@@@@@@@@@@@Could not get sim number from module ${Error}`
          );
        });
  };

  renderField = () => {
    const { config, fieldValues, fieldErrors } = this.props;
    const { fields } = config;
    const { model } = fields[PHONE];
    const value = path(model.split("."), fieldValues);
    const error = path(model.split("."), fieldErrors);

    return (
      <View style={styles.cardContainer}>
        <View style={styles.subQuestionContainer}>
          <Text style={styles.yourNumberText}>
            {metaFinder(metaKeys.phone.yourNumber)}
          </Text>
          <Text style={{...styles.addressText, ...configureLineHeight("16")}}>
            {metaFinder(metaKeys.phone.needYourPhone)}
          </Text>
        </View>
        <View style={styles.numberInputContainer}>
          <PruTextInput
            leftComponent={countryCode(this.props)}
            txtInputStyle={{
              borderWidth: 1,
              borderColor: theme.Colors.greyd9dcde,
            }}
            underlineColorAndroid="transparent"
            placeholder={
              metaFinder(metaKeys.phone.phoneNumber)
            }
            title={" "}
            messageType={!isNil(error) && !isEmpty(error) && "error"}
            message={error}
            keyboardType={"phone-pad"}
            restrictSpace={true}
            onChange={newVal => {
              this.props.onChange(model, newVal);
            }}
            value={value}
          />
        </View>
      </View>
    );
  };

  render() {
    return this.renderField();
  }
}

CardPhone.propTypes = {
  countryCommonMeta: PropTypes.object,
  config: PropTypes.object,
  fieldErrors: PropTypes.object,
  fieldValues: PropTypes.object,
  onChange: PropTypes.func,
  onNextPressed: PropTypes.func,
};

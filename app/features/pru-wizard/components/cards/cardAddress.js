/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from "react";
import { View, Text } from "react-native";

import { styles } from "./style";
import { PropTypes } from "prop-types";
import PruTextInput from "../../../../components/PruTextInput";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import metaKeys from "../../screenMetaKeys";
import AddressSelector from "../AddressSelector/index";
import { isNil, isEmpty, path } from "ramda";
import {
  CoreActionTypes,
  CoreUtils
} from "@pru-rt-internal/pulse-common";
const { EVENT_TYPE_USER_ACTIVITY } = CoreActionTypes;
const { logFirebaseEvent, setScreen } = CoreUtils;
import theme from "../../../../themes/default";
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";

const MAP_ADDRESS = "mapAddress";
const HOUSE_NO = "houseNo";

const aptNoLabel = props => {
  return (
    <View>
      <Text style={styles.aptNoLabel}>
        {safeMetaLabelFinder(metaKeys.screenName, metaKeys.address.aptSuite)}
      </Text>
    </View>
  );
};

export default class CardAddress extends PureComponent {
  render() {
    const { config, fieldValues, fieldErrors } = this.props;

    const { fields } = config;

    const mapAddressModel = fields[MAP_ADDRESS].model;
    const mapAddressVal = path(mapAddressModel.split("."), fieldValues);
    const mapAddressErr = path(mapAddressModel.split("."), fieldErrors);

    const houseNoModel = fields[HOUSE_NO].model;
    const houseNoVal = path(houseNoModel.split("."), fieldValues);
    const houseNoErr = path(houseNoModel.split("."), fieldErrors);

    return (
      <View style={styles.cardContainer}>
        <View style={styles.subPhoneContainer}>
          <Text style={styles.yourNumberText}>
            {safeMetaLabelFinder(
              metaKeys.screenName,
              metaKeys.address.whereDoYouLive
            )}
          </Text>
          <Text style={{...styles.addressText, ...configureLineHeight("16")}}>
            {safeMetaLabelFinder(
              metaKeys.screenName,
              metaKeys.address.needYourAddress
            )}
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <AddressSelector
            onChange={newVal => this.props.onChange(mapAddressModel, newVal)}
            fieldValue={mapAddressVal}
            exception={!isNil(mapAddressErr) && !isEmpty(mapAddressErr)}
            errorMessage={mapAddressErr}
            title={safeMetaLabelFinder(
              metaKeys.screenName,
              metaKeys.address.address
            )}
          />
          <PruTextInput
            leftComponent={aptNoLabel(this.props)}
            leftStyle={{ flex: 0.3 }}
            txtInputStyle={{
              borderWidth: 1,
              borderColor: theme.Colors.greyd9dcde,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderTopWidth: 0,
            }}
            underlineColorAndroid="transparent"
            placeholder={safeMetaLabelFinder(
              metaKeys.screenName,
              metaKeys.address.enterAptSuiteNo
            )}
            title={" "}
            messageType={!isNil(houseNoErr) && !isEmpty(houseNoErr) && "error"}
            message={houseNoErr}
            onChange={newVal => {
              this.props.onChange(houseNoModel, newVal);
            }}
            value={houseNoVal}
          />
        </View>
      </View>
    );
  }
}

CardAddress.propTypes = {
  fieldErrors: PropTypes.object,
  fieldValues: PropTypes.object,
  onChange: PropTypes.func,
  config: PropTypes.object,
};

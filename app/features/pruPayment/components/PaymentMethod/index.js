/* eslint-disable react/display-name */
import React from "react";
import { FlatList, View, Text } from "react-native";
import PropTypes from "prop-types";
import PaymentMethodCell from "../PaymentMethodCell";
import Discount from "../Discount";
import Voucher from "../Voucher";
import styles from "./styles";
import { isEmpty } from "ramda";
import VoucherView from "../../../rewards/components/VoucherView";

const separator = () => {
  return <View style={styles.separatorView} />;
};

const PaymentMethod = ({
  data,
  radioButtonPress,
  discountData,
  isVoucherRadioSelected,
  appliedVoucher,
  selectedPaymentMethod,
  onVoucherSelection,
  onDeleteSelectedVoucher,
  activeVouchers,
  language,
  onDetailPress,
  onTnCPress,
  country,
}) => {
  const title = "Select Voucher";
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <PaymentMethodCell
            item={item}
            radioButtonPress={radioButtonPress}
            isSelected={selectedPaymentMethod.id === item.id}
          />
        )}
        extraData={selectedPaymentMethod}
      />
      {isVoucherRadioSelected ? (
        <Text style={styles.titleStyle}>{title}</Text>
      ) : null}
      {isVoucherRadioSelected && isEmpty(appliedVoucher) && (
        <Discount
          language={language}
          data={activeVouchers}
          title={title}
          onVoucherSelection={onVoucherSelection}
          onDetailPress={onDetailPress}
          onTnCPress={onTnCPress}
          country={country}
        />
      )}
      {isVoucherRadioSelected && !isEmpty(appliedVoucher) && (
        <Voucher
          item={appliedVoucher}
          onRemovePress={onDeleteSelectedVoucher}
        />
      )}
    </View>
  );
};

PaymentMethod.propTypes = {
  data: PropTypes.object,
  radioButtonPress: PropTypes.func,
  discountData: PropTypes.object,
  isVoucherRadioSelected: PropTypes.bool,
  appliedVoucher: PropTypes.object,
  country: PropTypes.string,
  onTnCPress: PropTypes.func,
};

export default PaymentMethod;

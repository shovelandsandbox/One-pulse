/* eslint-disable react/display-name */
import React from "react";
import { FlatList, View } from "react-native";
import PropTypes from "prop-types";
import DiscountRowItem from "../DiscountRowItem";
import NoDiscount from "../NoDiscount";
import { VoucherRowItem } from "../../../rewards/components";

const listEmpty = () => {
  const noVoucherMsg = "No Offers Available";
  return <NoDiscount message={noVoucherMsg} />;
};

const Discount = ({
  data,
  onVoucherSelection,
  language,
  onDetailPress,
  onTnCPress,
  country,
}) => {
  return (
    <View>
      <FlatList
        horizontal={true}
        data={data}
        ItemSeparatorComponent={() => {
          return <View style={{ width: 25 }} />;
        }}
        renderItem={({ item }) => (
          <VoucherRowItem
            item={item}
            onDetailPress={onDetailPress}
            onPress={onVoucherSelection}
            disabled={false}
            language={language}
            fixedWidth={300}
            onTnCPress={onTnCPress}
            country={country}
          />
        )}
        ListEmptyComponent={listEmpty}
      />
    </View>
  );
};

Discount.propTypes = {
  data: PropTypes.object,
  onDetailPress: PropTypes.func,
  onVoucherSelection: PropTypes.func,
  language: PropTypes.string,
  onTnCPress: PropTypes.func,
  country: PropTypes.string,
};

export default Discount;

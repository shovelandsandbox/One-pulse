import React, { useState } from "react";
import { View, FlatList } from "react-native";
import PropTypes from "prop-types";
import { pathOr, pick } from "ramda";
import { CoreUtils } from "@pru-rt-internal/pulse-common";
import { RowMenu as RowMenuCard } from "../../../components/cards";
import Styles from "./style";
import Meta from "./meta";
const { isNilOrEmpty } = CoreUtils;

//const MetaConstants = { ...Meta.initializeScreenMeta() };

export const UserTransactionLinks = props => {
  const [MetaConstants] = useState({
    ...Meta.getElementsForTransaction(),
    getRequiredLink: Meta.getRequiredLink(),
    showLinkInDetailInfo: Meta.showLinkInDetailInfo(),
  });
  const { policyData, profile, requiredLinksMeta, transactionLink } = props;
  if (
    isNilOrEmpty(policyData) &&
    isNilOrEmpty(transactionLink) &&
    isNilOrEmpty(profile)
  ) {
    return null;
  }

  const getMetaObject = item => {
    return !!item && MetaConstants ? MetaConstants[item.transaction] : {};
  };
  const reqTransaction = pick(MetaConstants.getRequiredLink, requiredLinksMeta);
  const showLinkForDetail = pick(
    MetaConstants.showLinkInDetailInfo,
    requiredLinksMeta
  );

  const validLinks = getTransactionLink(policyData, transactionLink);
  const lifeAssured = pathOr([], ["lifeAssured"], policyData);
  let isLife = lifeAssured.find(
    item =>
      pathOr("", ["contactDetails", "EMAIL", "value"], item).toLowerCase() ==
      pathOr(" ", ["email"], profile).toLowerCase()
  );
  isLife = isLife ? "PH" : "BENEFICARY";
  return (
    <FlatList
      scrollEnabled={false}
      data={validLinks}
      renderItem={({ item }, index) =>
        item.transactionRole &&
        checkRoles(isLife, item) &&
        getMetaObject(item) &&
        reqTransaction[getMetaObject(item).overrideField] &&
        !showLinkForDetail[getMetaObject(item).overrideField] &&
        renderLinks(MetaConstants, policyData, { ...props, ...item, index })
      }
    />
  );
};

const checkRoles = (isLife, item) =>
  item.transactionRole.toLowerCase() == "any"
    ? true
    : isLife == item.transactionRole;

const renderLinks = (MetaConstants, policyData, item) => {
  const meta = MetaConstants[item.transaction];
  return (
    <View style={Styles.rowContainer}>
      <RowMenuCard
        label={(meta && meta.label) || item.transaction}
        onPress={() => {
          item.dispatchTransaction(meta && meta.action);
        }}
        policyData={policyData}
        icon={"info-policy"}
      />
    </View>
  );
};

const getTransactionLink = (policyData, transactionLink) => {
  const code = pathOr("", ["product", "code"], policyData);
  const validProduct = pathOr([], ["products"], transactionLink);
  // const productData = code && validProduct.find(d => d.code == code);
  const productData = code && Array.isArray(validProduct) && validProduct[0];
  const validLinks =
    productData && !isNilOrEmpty(productData.tables)
      ? productData.tables.find(d => d["transactions"])
      : [];
  return (validLinks && validLinks["transactions"]) || [];
};

//proptypes
UserTransactionLinks.propTypes = {
  policyData: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  transactionLink: PropTypes.object.isRequired,
  requiredLinksMeta: PropTypes.object,
};

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import { PULSE_VOUCHER, INFO_VOUCHER } from "../../../../config/images";
import { pathOr } from "ramda";
import styles from "./styles";
import { metaFinderRewards } from "../../configs/meta-utils";
import {
  ELEMENT_KEY_EARNED_DATE,
  ELEMENT_KEY_EXPIRED_DATE,
  ELEMENT_KEY_REMAINING,
  ELEMENT_KEY_TIMES,
  ELEMENT_KEY_REDEEM_FOR,
  ELEMENT_KEY_VIEW_DETAILS,
  EXPIRES_IN,
  DAYS,
  EXPIRED_ON,
  ELEMENT_KEY_ACTIVE,
  ELEMENT_KEY_REDEEMED,
  ELEMENT_KEY_PARTIAL_REDEEMED,
  ELEMENT_KEY_EXPIRED,
  VIEW_T_AND_C_LABEL,
  ELEMENT_KEY_LIFE_TIME,
  ELEMENT_KEY_MULTI,
} from "../../configs/metaConstant";
import AppConfig from "../../../../config/AppConfig";

const noOfRedeem = (maxRedeem, timesRedeemed) => {
  const redeem = metaFinderRewards(ELEMENT_KEY_REDEEM_FOR);
  const times = metaFinderRewards(ELEMENT_KEY_TIMES);
  const remainingStr = metaFinderRewards(ELEMENT_KEY_REMAINING);
  const remaining = `${timesRedeemed}/${maxRedeem}`;
  return (
    <View>
      <Text style={styles.redeemFor}>{`${redeem} ${maxRedeem} ${times}`}</Text>
      <Text style={styles.remaining}>{`${remaining} ${remainingStr}`}</Text>
    </View>
  );
};
const formatDate = date => moment(date).format("DD MMM YYYY");
const extendedStyle = fixedWidth => {
  if (fixedWidth) {
    return { width: fixedWidth };
  }
};
const dateDiff = date => {
  const diffDay = Math.floor(
    (Date.parse(date) - Date.parse(new Date())) / 86400000
  );
  if (diffDay > 0) {
    return `${metaFinderRewards(EXPIRES_IN)} ${diffDay} ${metaFinderRewards(
      DAYS
    )}`;
  }
  return `${metaFinderRewards(EXPIRED_ON)} ${formatDate(date)}`;
};

const getModifiedUrlForTnC = (name, isOneTime, language, country) => {
  const url = AppConfig.getCMSUrl();
  if (isOneTime) {
    return `${url}${name}_concent_${language}?namespace=${country}`;
  }
  return `${url}${name}_multi_concent_${language}?namespace=${country}`;
};

const topRow = (item, onDetailPress, fromVoucherDetails) => {
  return (
    <View style={styles.row}>
      <View style={styles.flex}>
        {item.expiry && item.status == "ACTIVE" && (
          <View style={styles.expiresInView}>
            <Text style={styles.expiresIn}>{dateDiff(item.expiry)}</Text>
          </View>
        )}
      </View>
      <View style={styles.flex}>
        {(item.maxRedeem === -1 || item.maxRedeem > 1) && !fromVoucherDetails && (
          <TouchableOpacity
            style={styles.viewDetailsView}
            onPress={() => onDetailPress(item)}
          >
            <Image source={INFO_VOUCHER} style={styles.infoImage} />
            <Text style={styles.viewdetailsText}>
              {metaFinderRewards(ELEMENT_KEY_VIEW_DETAILS)}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const getModifiedUrl = (url, language, maxRedeem) => {
  const key_value = url.split("?");
  const lifetime = metaFinderRewards(ELEMENT_KEY_LIFE_TIME);
  const multi = metaFinderRewards(ELEMENT_KEY_MULTI);
  let urlString =
    language === "EN" ? url : `${key_value[0]}_${language}?${key_value[1]}`;
  if (maxRedeem == -1 || maxRedeem > 1) {
    const redeemType = maxRedeem == -1 ? lifetime : multi;
    if (language === "EN") {
      urlString = `${key_value[0]}_${redeemType}?${key_value[1]}`;
    } else {
      urlString = `${key_value[0]}_${redeemType}_${language}?${key_value[1]}`;
    }
  }
  return urlString;
};

const VoucherRowItem = ({
  item,
  onDetailPress,
  fromVoucherDetails = false,
  fixedWidth,
  language,
  onPress,
  disabled = true,
  onTnCPress,
  country,
}) => {
  const imageUrl = pathOr(null, ["icon", "url"], item);
  const maxRedeem = pathOr(null, ["maxRedeem"], item);
  const backgroundImage = imageUrl && maxRedeem ? getModifiedUrl(imageUrl, language, maxRedeem): '';
  const voucherStatus = {
    ACTIVE: metaFinderRewards(ELEMENT_KEY_ACTIVE),
    PARTIALREDEEMED: metaFinderRewards(ELEMENT_KEY_PARTIAL_REDEEMED),
    REDEEMED: metaFinderRewards(ELEMENT_KEY_REDEEMED),
    EXPIRED: metaFinderRewards(ELEMENT_KEY_EXPIRED),
  };
  const voucherName = pathOr(null, ["name"], item);
  const isOneTime = pathOr(false, ["onetime"], item);
  const tncLink = getModifiedUrlForTnC(
    voucherName,
    isOneTime,
    language,
    country
  );
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(item);
      }}
      disabled={disabled}
      style={[
        fromVoucherDetails ? {} : styles.top20,
        extendedStyle(fixedWidth),
      ]}
    >
      {topRow(item, onDetailPress, fromVoucherDetails)}
      <ImageBackground
        source={{ uri: backgroundImage }}
        style={[styles.imgbackground, extendedStyle(fixedWidth)]}
        resizeMode={fixedWidth ? "contain" : "cover"}
      >
        <View style={styles.dateView}>
          <View style={styles.flex3}>
            <View style={styles.dateView}>
              <View>
                {!imageUrl && (
                  <Image source={PULSE_VOUCHER} style={styles.pulseImg} />
                )}
              </View>
              <View style={styles.flex}>
                {!imageUrl && (
                  <Text style={styles.msgTextStyle}>{item.description}</Text>
                )}
              </View>
            </View>
            <View style={styles.lifeContent}>
              {lifeTimeContent(item.description, item)}
            </View>
          </View>
          <View style={styles.imageContainer}>
            <View style={[styles.flex, styles.extendedVoucherType]}>
              {voucherType(item)}
            </View>
            <View style={styles.statusView}>
              <Text style={styles.activeTextStyle}>
                {voucherStatus[item.status]}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <TouchableOpacity
        onPress={() => {
          onTnCPress(tncLink);
        }}
        style={styles.tncView}
      >
        <Text style={styles.tncText}>
          {metaFinderRewards(VIEW_T_AND_C_LABEL)}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
const voucherType = item => {
  if (item.maxRedeem > 1 && item.timesRedeemed) {
    return noOfRedeem(item.maxRedeem, item.timesRedeemed);
  }
};
const lifeTimeContent = (text, item) => {
  const expiryDate = formatDate(item.expiry);
  const earnDate = formatDate(item.earnedDate);
  if (item.maxRedeem === -1) {
    return <View style={styles.descriptionView} />;
  }
  return (
    <View style={styles.dateView}>
      <View>
        <Text style={styles.dateLabelStyle}>
          {metaFinderRewards(ELEMENT_KEY_EARNED_DATE)}
        </Text>
        <Text style={styles.dateValueStyle}>{earnDate}</Text>
      </View>
      <View style={styles.marginLeft}>
        <Text style={styles.dateLabelStyle}>
          {metaFinderRewards(ELEMENT_KEY_EXPIRED_DATE)}
        </Text>
        <Text style={styles.dateValueStyle}>{expiryDate}</Text>
      </View>
    </View>
  );
};

VoucherRowItem.propTypes = {
  item: PropTypes.object,
  onDetailPress: PropTypes.func,
  fromVoucherDetails: PropTypes.bool,
  language: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  fixedWidth: PropTypes.number,
  country: PropTypes.string,
  onTnCPress: PropTypes.func,
};

export default VoucherRowItem;

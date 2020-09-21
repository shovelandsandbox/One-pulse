import React from "react";
import { Image, View, Text } from "react-native";

import styles from "./style";
import {
  SR_ICON,
  VOUCHER,
  CREDIT_BADGE,
  DEBIT_BADGE,
} from "../../../../config/images";
import BonusTag from "../BonusTag";
const typeOfTransaction = "credit";
const bannerType = "Reward";

const renderImage = (type, transtype, img, showVoucherIcon) => {
  const imgSource = img ? { uri: img } : showVoucherIcon ? VOUCHER : SR_ICON;
  const imgStyle = img
    ? styles.imageVoucher
    : showVoucherIcon
    ? styles.defaultVoucherIcon
    : styles.imageBadge;
  let imgSrc = "";
  if (type !== bannerType) {
    imgSrc = imgSource;
    return <Image source={imgSrc} style={imgStyle} />;
  }
  imgSrc = transtype === typeOfTransaction ? CREDIT_BADGE : DEBIT_BADGE;
  return <Image source={imgSrc} style={imgStyle} />;
};
const renderNoOfBadges = (type, transtype, noOfBadges) => {
  if (type !== bannerType) {
    return <Text style={styles.badgeContainerText}>{`${noOfBadges} `}</Text>;
  }
  const textStyle =
    transtype === typeOfTransaction
      ? styles.badgeCreditText
      : styles.badgeDebitText;
  const tranSymbol = transtype === typeOfTransaction ? "+" : "-";
  return (
    <Text style={textStyle}>
      {tranSymbol} <Text style={styles.noOfBadgeStyle}>{noOfBadges}</Text>
    </Text>
  );
};

const DetailCell = ({
  text,
  noOfBadges,
  subText,
  isBonusRewarded,
  bonusRewardedText,
  onBonusTagPress,
  img,
  transactionType,
  type,
  showVoucherIcon = false,
}) => (
  <View style={styles.detailCell}>
    <View style={styles.detailCellTextContainer}>
      {subText && (
        <View style={styles.subTextView}>
          <Text style={styles.detailCellSubText}>{subText}</Text>
          {isBonusRewarded && (
            <BonusTag
              bonusRewarded={bonusRewardedText}
              onPressHandle={onBonusTagPress}
            />
          )}
        </View>
      )}
      <Text style={styles.detailCellText}>{text}</Text>
    </View>
    <View style={styles.badgeContainer}>
      {renderImage(type, transactionType, img, showVoucherIcon)}
      {noOfBadges && renderNoOfBadges(type, transactionType, noOfBadges)}
    </View>
  </View>
);

export default DetailCell;

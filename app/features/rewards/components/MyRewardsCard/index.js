import React, { PureComponent } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import moment from "moment";
import { pathOr } from "ramda";

import { getLineHeight } from "../../../../utils/StyleUtils";
import CardFlip from "../FlipCard";
import {
  REWRADS_VOUCHER_CUT_BACKGROUND,
  INFO_VOUCHER,
  PULSE_VOUCHER,
} from "../../../../config/images";
import { metaFinderRewards } from "../../configs/meta-utils";
import {
  VIEW_T_AND_C_LABEL,
  ELEMENT_KEY_VALID_TILL,
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
  ELEMENT_KEY_LIFE_TIME,
  ELEMENT_KEY_MULTI,
} from "../../configs/metaConstant";

import AppConfig from "../../../../config/AppConfig";
import { scale } from "../../../../utils/Scale";

export class MyRewardsCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  getModifiedUrlForTnC = (name, isOneTime, language, country) => {
    const url = AppConfig.getCMSUrl();
    if (isOneTime) {
      return `${url}${name}_concent_${language}?namespace=${country}`;
    }
    return `${url}${name}_multi_concent_${language}?namespace=${country}`;
  };

  noOfRedeem = (maxRedeem, timesRedeemed) => {
    const redeem = metaFinderRewards(ELEMENT_KEY_REDEEM_FOR);
    const times = metaFinderRewards(ELEMENT_KEY_TIMES);
    const remainingStr = metaFinderRewards(ELEMENT_KEY_REMAINING);
    const remaining = `${timesRedeemed}/${maxRedeem}`;
    return (
      <View>
        <Text
          style={styles.redeemFor}
        >{`${redeem} ${maxRedeem} ${times}`}</Text>
        <Text style={styles.remaining}>{`${remaining} ${remainingStr}`}</Text>
      </View>
    );
  };

  formatDate = date => moment(date).format("DD MMM YYYY");

  voucherType = item => {
    if (item.maxRedeem > 1 && item.timesRedeemed) {
      return this.noOfRedeem(item.maxRedeem, item.timesRedeemed);
    }
  };
  lifeTimeContent = (text, item) => {
    const expiryDate = this.formatDate(item.expiry);
    const earnDate = this.formatDate(item.earnedDate);

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

  dateDiff = date => {
    const diffDay = Math.floor(
      (Date.parse(date) - Date.parse(new Date())) / 86400000
    );
    if (diffDay > 0) {
      return `${metaFinderRewards(EXPIRES_IN)} ${diffDay} ${metaFinderRewards(
        DAYS
      )}`;
    }
    return `${metaFinderRewards(EXPIRED_ON)} ${this.formatDate(date)}`;
  };

  getModifiedUrl = (url, language, maxRedeem) => {
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

  viewDetails = () => {
    const { item, onDetailPress } = this.props;
    return (
      <View style={styles.flex}>
        {(item.maxRedeem === -1 || item.maxRedeem > 1) && (
          <TouchableOpacity
            style={styles.viewDetailsView}
            onPress={() => onDetailPress(item)}
          >
            {/* <Image source={INFO_VOUCHER} style={styles.infoImage} /> */}
            <Text style={styles.viewdetailsText}>
              {metaFinderRewards(ELEMENT_KEY_VIEW_DETAILS)}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  renderFront() {
    const { item, onTnCPress, language, country, isVertical } = this.props;

    const imageUrl = pathOr(null, ["icon", "url"], item);
    const maxRedeem = pathOr(null, ["maxRedeem"], item);
    const backgroundImage =
      imageUrl && maxRedeem
        ? this.getModifiedUrl(imageUrl, language, maxRedeem)
        : "";
    const voucherName = pathOr(null, ["name"], item);
    const isOneTime = pathOr(false, ["onetime"], item);
    const tncLink = this.getModifiedUrlForTnC(
      voucherName,
      isOneTime,
      language,
      country
    );
    const expiryDate = this.formatDate(item.expiry);
    const earnDate = this.formatDate(item.earnedDate);
    const voucherStatus = {
      ACTIVE: metaFinderRewards(ELEMENT_KEY_ACTIVE),
      PARTIALREDEEMED: metaFinderRewards(ELEMENT_KEY_PARTIAL_REDEEMED),
      REDEEMED: metaFinderRewards(ELEMENT_KEY_REDEEMED),
      EXPIRED: metaFinderRewards(ELEMENT_KEY_EXPIRED),
    };

    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => this.card.flip()}
      >
        <ImageBackground
          source={
            backgroundImage
              ? { uri: backgroundImage }
              : REWRADS_VOUCHER_CUT_BACKGROUND
          }
          style={[
            styles.imgbackground,
            isVertical ? styles.verticalContainer : null,
          ]}
          resizeMode={"stretch"}
        >
          <View style={styles.dateView}>
            <View
              style={[
                styles.dateView,
                { flexDirection: "row", width: "65%", marginTop: 10 },
              ]}
            >
              <View>
                {!backgroundImage && (
                  <Image source={PULSE_VOUCHER} style={styles.pulseImg} />
                )}
              </View>
              <View style={styles.flex}>
                {!backgroundImage && (
                  <Text style={styles.msgTextStyle}>{item.description}</Text>
                )}
              </View>
            </View>
            <View style={styles.remainingView}>{this.voucherType(item)}</View>
            <View style={styles.contentAbsolute}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                {item.maxRedeem !== -1 ? (
                  <>
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
                    <Text style={styles.activeTextStyle}>
                      {voucherStatus[item.status]}
                    </Text>
                  </>
                ) : null}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
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
                {this.viewDetails()}
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  renderBack() {
    const { item, isVertical } = this.props;
    const qrCode = pathOr(null, ["code"], item);
    const qrImage = pathOr(null, ["image", "content"], item);
    const imageUrl = pathOr(null, ["icon", "url"], item);
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => this.card.flip()}
      >
        <ImageBackground
          style={[
            {
              width: scale(300),
              height: 110,
              flexDirection: "row",
              padding: 10,
            },
            isVertical ? [styles.verticalContainer] : null,
          ]}
          source={REWRADS_VOUCHER_CUT_BACKGROUND}
          resizeMode={"stretch"}
        >
          <View style={{ flex: 0.75 }}>
            <Text style={styles.backDescription} numberOfLines={5}>
              {item.description}
            </Text>
          </View>
          <View style={styles.backQRWrapper}>
            <Text style={styles.qrCodeText}>{qrCode}</Text>
            {qrImage ? (
              <Image
                style={styles.backVoucher}
                source={{
                  uri: `data:image/jpeg;base64,${qrImage}`,
                }}
              />
            ) : null}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  render() {
    const { item } = this.props;
    const expiry = moment(item.expiry).format("DD MMMM YYYY");
    const icon = item.icon.url;
    const { isVertical } = this.props;
    return (
      <CardFlip
        style={[
          styles.container,
          isVertical ? styles.verticalContainer : null,
          isVertical ? { marginVertical: 10 } : null,
        ]}
        ref={card => (this.card = card)}
      >
        {this.renderFront()}
        {this.renderBack()}
      </CardFlip>
    );
  }
}

export default MyRewardsCard;

const styles = StyleSheet.create({
  activeTextStyle: {
    color: "#17882c",
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 16,
    textAlign: "right",
    alignSelf: "flex-end",
  },
  backDescription: {
    color: "#292929",
    flex: 1,
    fontSize: 13,
    marginTop: 6,
  },
  backQRWrapper: { alignItems: "center", flex: 1, justifyContent: "center" },
  backVoucher: {
    alignSelf: "center",
    height: 60,
    width: 60,
    marginVertical: 6,
  },

  cardContainer: {
    marginHorizontal: 1,
    marginVertical: 16,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    height: 130,
    marginHorizontal: 10,
    width: scale(290),
  },
  contentAbsolute: {
    left: 0,
    paddingHorizontal: 8,
    position: "absolute",
    right: 0,
    top: 60,
  },
  dateLabelStyle: {
    color: "#000000",
    fontSize: 9,
    lineHeight: getLineHeight(9),
    opacity: 0.5,
  },
  dateValueStyle: {
    color: "#000000",
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    lineHeight: getLineHeight(10),
  },
  dateView: {
    flex: 1,
    paddingLeft: 5,
  },
  descriptionView: {
    flex: 2,
    flexDirection: "row",
  },
  expiresIn: {
    color: "#fff",
    fontSize: 7,
    lineHeight: getLineHeight(7),
    paddingBottom: 2,
    paddingLeft: 10,
    paddingTop: 2,
  },
  expiresInView: {
    backgroundColor: "#8b895e",
    borderTopRightRadius: 10,
    flex: 1,
  },
  flexDirec: { flexDirection: "row" },
  flex: { flex: 1 },
  imgbackground: {
    height: 110,
    width: scale(300),
  },
  infoImage: { height: 10, width: 10 },
  marginLeft: { marginLeft: 15 },
  msgTextStyle: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 5,
  },
  msgView: { flex: 1, flexWrap: "wrap" },
  pulseImg: { height: 40, width: 40 },
  qrCodeText: {
    alignSelf: "center",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#EEE",
    paddingHorizontal: 4,
  },
  redeemFor: {
    color: "#ec1c2e",
    fontFamily: "Avenir-Black",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: getLineHeight(10),
    textAlign: "right",
  },
  remaining: {
    color: "#000000",
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    fontWeight: "300",
    lineHeight: getLineHeight(10),
    right: 10,
    textAlign: "right",
  },
  remainingView: { position: "absolute", right: 20, top: 14 },
  row: { flexDirection: "row" },
  tncText: {
    color: "#ec1c2e",
    fontFamily: "Avenir-Roman",
    fontSize: 7,
  },
  tncView: {
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  verticalContainer: {
    height: 110,
    width: scale(320),
  },
  viewDetailsView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 10,
  },
  viewdetailsText: {
    color: "#ec1c2e",
    fontFamily: "Avenir-Roman",
    fontSize: 9,
    lineHeight: getLineHeight(9),
    paddingLeft: 5,
  },
});

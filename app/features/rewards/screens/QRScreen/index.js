/* eslint-disable react/require-optimization */
import React, { Component } from "react";
import { View, ScrollView, Image, Text } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pathOr } from "ramda";
import styles from "./styles";
import HTML from "react-native-render-html";
import { RewardSelector } from "../../Selector";
import {
  metaFinderRewards,
  metaLabelOrNilRewards,
} from "../../configs/meta-utils";
import {
  T_AND_C_LABEL,
  T_AND_C_AA,
  T_AND_C_BOOST,
  T_AND_C_GSC,
  HOW_TO_REDEEM_BOOST,
  HOW_TO_REDEEM_AA,
  HOW_TO_REDEEM_GSC,
  HOW_TO_REDEEM_LABEL,
  HOW_TO_REDEEM_STAR_BUCKS,
  PLEASE_READ_THROUGH,
  APPLICABLE_FOR_OFFER,
} from "../../configs/metaConstant";
import { goToScreens } from "../../actions";
import AppConfig from "../../../../config/AppConfig";

class QRScreen extends Component {
  constructor(props) {
    super(props);
    this.TandCObj = {
      PruBoost: metaFinderRewards(T_AND_C_BOOST),
      PruAABIG: metaFinderRewards(T_AND_C_AA),
      PruGSC: metaFinderRewards(T_AND_C_GSC),
    };
    this.redeemTextObj = {
      PruBoost: metaLabelOrNilRewards(HOW_TO_REDEEM_BOOST),
      PruAABIG: metaLabelOrNilRewards(HOW_TO_REDEEM_AA),
      PruGSC: metaLabelOrNilRewards(HOW_TO_REDEEM_GSC),
      StarBucks: metaLabelOrNilRewards(HOW_TO_REDEEM_STAR_BUCKS),
    };
  }

  handleOnPress = tncLink => {
    const { goToScreens } = this.props;
    const params = {
      source: {
        uri: tncLink,
      },
    };
    goToScreens(params, "PdfView");
  };

  getModifiedUrl = (name, isOneTime) => {
    const { language, country } = this.props;
    const url = AppConfig.getCMSUrl();
    if (isOneTime) {
      return `${url}${name}_concent_${language}?namespace=${country}`;
    }
    return `${url}${name}_multi_concent_${language}?namespace=${country}`;
  };

  render() {
    const { allVouchers, navigation } = this.props;
    const tncHeader = metaFinderRewards(T_AND_C_LABEL);
    const howToRedeem = metaFinderRewards(HOW_TO_REDEEM_LABEL);
    const pleaseReadThrough = metaFinderRewards(PLEASE_READ_THROUGH);
    const applicableForOffer = metaFinderRewards(APPLICABLE_FOR_OFFER);
    const id = pathOr("", ["state", "params", "id"], navigation);
    const selectedVoucher = RewardSelector.getVoucherById(allVouchers, id);
    const qrCode = pathOr(null, ["code"], selectedVoucher);
    const qrImage = pathOr(null, ["image", "content"], selectedVoucher);
    const imageUrl = pathOr(null, ["image", "url"], selectedVoucher);
    const voucherName = pathOr(null, ["name"], selectedVoucher);
    const isOneTime = pathOr(false, ["onetime"], selectedVoucher);
    const tncLink = this.getModifiedUrl(voucherName, isOneTime);
    const redeemMsg = metaLabelOrNilRewards(voucherName);
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {imageUrl && (
          <Image
            style={styles.voucherImage}
            source={{
              uri: imageUrl,
            }}
          />
        )}
        <Text style={styles.voucherCodeText}>{qrCode}</Text>
        <Image
          style={styles.qrCodeImage}
          source={{
            uri: `data:image/jpeg;base64,${qrImage}`,
          }}
        />
        {redeemMsg && (
          <View>
            <Text style={styles.redeemTitle}>{howToRedeem}</Text>
            <Text style={styles.redeemText}>{redeemMsg}</Text>
          </View>
        )}
        {/* {qrImage && (
          <View>
            <Text style={styles.redeemTitle}>{tncHeader}</Text>
            <View style={styles.tncView}>
              <Text style={styles.tncText}>
                {pleaseReadThrough}{" "}
                <Text
                  onPress={() => {
                    this.handleOnPress(tncLink);
                  }}
                  style={styles.tncUnderLineText}
                >
                  {tncHeader}
                </Text>{" "}
                {applicableForOffer}
              </Text>
            </View>
          </View>
        )} */}
      </ScrollView>
    );
  }
}

QRScreen.propTypes = {
  allVouchers: PropTypes.array,
  navigation: PropTypes.object,
  goToScreens: PropTypes.func,
  language: PropTypes.string,
  country: PropTypes.string,
};

const mapStateToProps = state => {
  const {
    rewardCenter: { walletDetails },
    userPreferences: { language },
    auth: { countryInfo },
  } = state;
  return {
    allVouchers: walletDetails.vouchers,
    language,
    country: countryInfo.simCountry,
  };
};

export default connect(mapStateToProps, {
  goToScreens,
})(QRScreen);

import React from "react";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Text,
  View,
  Alert
} from "react-native";
import PropTypes from "prop-types";
import {
  CoreActions,
  CoreConfig,
  metaHelpers,
  CoreActionTypes,
} from "@pru-rt-internal/pulse-common";
import {
  BACK_WHITE,
  DENGUE_PRODUCT_HOME_MOSQUITO,
  DENGUE_PRODUCT_DISCLOSURE
} from "../../../../config/images";
import { ProductBriefingStyle as styles } from "./styles";
import { gotoNewCommon } from "../../../../actions";
import { gotoDengueRegistration, resetDengueProductNavigation } from "../../actions";

import screens from "../../configs/screenNames";
import actions from "../../configs/actionNames";

const {
  pageKeys
} = CoreConfig;

import MetaConstants from "./meta";

class Briefing extends React.Component {
  constructor(props) {
    super(props);
    this.MetaConstants = { ...MetaConstants.initializeAIMEScreenMeta() };
  }

  handleNavigation = () => {
    this.props.resetDengueProductNavigation(true);
    this.props.gotoDengueRegistration(pageKeys.DENGUE_PRODUCT_HOME);
    this.props.navigation.navigate('ProductDengueIndex');
  };

  render() {
    const productDisclosureTitle = this.MetaConstants.productDisclosureTitle;
    const productDisclosureMessage = this.MetaConstants.productDisclosureMessage;
    const productDisclosureDengueProduct = this.MetaConstants.productDisclosureDengueProduct;
    const limitedOffer = this.MetaConstants.limitedOffer;
    const PrudentialEmpText = this.MetaConstants.PrudentialEmpText;
    const participateText = this.MetaConstants.participateText;
    const pleaseRefertext = this.MetaConstants.pleaseRefertext;
    const productDiscloserText = this.MetaConstants.productDiscloserText;
    const moreDetailText = this.MetaConstants.moreDetailText;
    const letsProceedText = this.MetaConstants.letsProceedText;
    const dengueCaseText = this.MetaConstants.dengueCaseText;

    return (
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          imageStyle={styles.imageBackground}
          source={DENGUE_PRODUCT_HOME_MOSQUITO}
          style={styles.imageBackground}
        >
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              accessibilityLabel="home"
              accesible
            >
              <Image style={styles.backIcon} source={BACK_WHITE} />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.imageTileWrapper}>
            <Image
              resizeMode="contain"
              style={styles.imageTile}
              source={DENGUE_PRODUCT_HOME_OVERLAY}
            />
          </View> */}
        </ImageBackground>
        <Text style={styles.mainHeading}>{limitedOffer}</Text>
        <Text style={styles.mainHeading}>{dengueCaseText}</Text>
        <Text style={styles.subHeading}>{participateText}</Text>
        <Text style={styles.content}>{PrudentialEmpText}</Text>
        <View style={styles.viewContent}>
          <Text>{pleaseRefertext}</Text>
          <TouchableOpacity
            onPress={() =>
              this.props.gotoNewCommon({
                productDisclosureDengueProduct,
                title: productDisclosureTitle,
                message: productDisclosureMessage,
                headerImage: DENGUE_PRODUCT_DISCLOSURE,
                dengueStyling: true
              })
            }
          >
            <Text style={{ textDecorationLine: "underline" }}>
              {productDiscloserText}
            </Text>
          </TouchableOpacity>
          <Text>{moreDetailText}</Text>
        </View>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.button} onPress={this.handleNavigation}>
          <Text style={styles.buttonText}>{letsProceedText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Briefing.propTypes = {
  navigation: PropTypes.object,
  resetDengueProductNavigation: PropTypes.func
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  resetDengueProductNavigation,
  gotoDengueRegistration,
  gotoNewCommon,
  goToAimeDengueAlert: () => ({
    context: screens.AIME_Dengue_Alert,
    type: actions.naviagteDengueAlert,
    payload: {}
  }),
})(Briefing);

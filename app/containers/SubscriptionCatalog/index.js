import React, { PureComponent } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { HeaderBackButton } from "react-navigation";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import moment from "moment";
import {
  CoreActionTypes,
  CoreUtils,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { getScreenRenderingConfig } from "../../actions";
import VerticalGroupedLayout from "../../components/ScreenLayouts/VerticalGroupedLayout";
import styles from "./style";
import ProductCatalogModal from "./withModal";
import PdfViewer from "../../components/PdfViewer";
import { formatCurrency } from "../../utils";
import { CoreServices } from "@pru-rt-internal/pulse-common";

const { NavigationService } = CoreServices;
const KEY_SUBSCRIPTION_CATALOG = "SUBSCRIPTION_CATALOG";
const KEY_SHOW_TNC_MODAL = "SUBSCRIPTION_CATALOG_SHOW_TNC_MODAL";

class SubscriptionCatalog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      updating: false,
      showTncModal: false,
      visible: false,
      config: null,
      tncModal: true,
    };
  }

  componentDidMount() {
    const { subscriptionData, createEvent } = this.props;
    const { productOptions } = subscriptionData;
    const subscriptionCode = productOptions && productOptions[0].product.code;
    if (!this.state.showTncModal) {
      this.onRefresh();
    }
    createEvent(
      "pulse.mySubscription.load",
      "ScreenEvent",
      "Subscription_catalog",
      null,
      null,
      { productCode: subscriptionCode }
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const tncModal = metaHelpers.findElement(
      KEY_SUBSCRIPTION_CATALOG,
      KEY_SHOW_TNC_MODAL
    );
    const subscriptionConsent = pathOr(
      null,
      ["tnc", "Subscription", "consent"],
      nextProps
    );
    if (subscriptionConsent && subscriptionConsent == "ACCEPT") {
      return { updating: false, showTncModal: false };
    } else if (tncModal && typeof tncModal.label === "boolean") {
      return { showTncModal: tncModal.label };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.updating && prevState.updating !== this.state.updating) {
      this.onRefresh();
    }
  }

  renderGrid = () => {
    const { mySubscriptionConfig } = this.props;
    return (
      <VerticalGroupedLayout config={mySubscriptionConfig} transform={true} />
    );
  };

  onRefresh = () => {
    this.props.getSubscriptions();
    this.props.getScreenRenderingConfig({
      id: `m::ui::mySubscription_${this.props.userPreferences.language}`,
    });
  };

  renderImage = () => {
    const logoUrl = metaHelpers.findElement(
      KEY_SUBSCRIPTION_CATALOG,
      "SUBSCRIPTION_CATALOG_HEADER_LOGO"
    ).label;
    return (
      <View>
        <Image source={{ uri: logoUrl }} style={{ width: 64, height: 32.5 }} />
      </View>
    );
  };

  renderMidComponent = () => {
    const headerTitle = metaHelpers.findElement(
      KEY_SUBSCRIPTION_CATALOG,
      "SUBSCRIPTION_CATALOG_HEADER_TITLE"
    ).label;
    return (
      <View>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
      </View>
    );
  };

  submitTnc = val => {
    const { tnc, updateCustomerTnc, navigation } = this.props;
    const version = metaHelpers.findElement(
      KEY_SUBSCRIPTION_CATALOG,
      "SUBSCRIPTION_CATALOG_PRUSHOP_VERSION"
    ).label;
    const privacyVersion = metaHelpers.findElement(
      KEY_SUBSCRIPTION_CATALOG,
      "SUBSCRIPTION_CATALOG_PRUSHOP_PRIVACY_VERSION"
    ).label;
    if (val) {
      const newTnc = {
        ...tnc,
        Subscription: {
          consent: "ACCEPT",
          consentDate: CoreUtils.getTimeStamp(),
          org: "Subscription",
          version,
          privacyVersion,
        },
      };
      this.setState({ updating: true });
      updateCustomerTnc(newTnc);
    } else {
      this.setState(
        {
          tncModal: false,
        },
        () => {
          navigation.goBack();
        }
      );
    }
  };

  showDocument = config => {
    this.setState({
      visible: true,
      config,
    });
  };

  hideDocument = () => {
    this.setState({ visible: false });
  };

  renderFooter = () => {
    const footerData = [
      {
        text: metaHelpers.findElement(
          KEY_SUBSCRIPTION_CATALOG,
          "SUBSCRIPTION_CATALOG_FOOTER2_TEXT"
        ).label,
        link: metaHelpers.findElement(
          KEY_SUBSCRIPTION_CATALOG,
          "SUBSCRIPTION_CATALOG_FOOTER2_LINK"
        ).label,
      },
      {
        text: metaHelpers.findElement(
          KEY_SUBSCRIPTION_CATALOG,
          "SUBSCRIPTION_CATALOG_FOOTER3_TEXT"
        ).label,
        link: metaHelpers.findElement(
          KEY_SUBSCRIPTION_CATALOG,
          "SUBSCRIPTION_CATALOG_FOOTER3_LINK"
        ).label,
      },
      {
        text: metaHelpers.findElement(
          KEY_SUBSCRIPTION_CATALOG,
          "SUBSCRIPTION_CATALOG_FOOTER4_TEXT"
        ).label,
        link: metaHelpers.findElement(
          KEY_SUBSCRIPTION_CATALOG,
          "SUBSCRIPTION_CATALOG_FOOTER4_LINK"
        ).label,
      },
      {
        text: metaHelpers.findElement(
          KEY_SUBSCRIPTION_CATALOG,
          "SUBSCRIPTION_CATALOG_FOOTER5_TEXT"
        ).label,
        link: metaHelpers.findElement(
          KEY_SUBSCRIPTION_CATALOG,
          "SUBSCRIPTION_CATALOG_FOOTER5_LINK"
        ).label,
      },
      {
        text: metaHelpers.findElement(
          KEY_SUBSCRIPTION_CATALOG,
          "SUBSCRIPTION_CATALOG_FOOTER6_TEXT"
        ).label,
        link: metaHelpers.findElement(
          KEY_SUBSCRIPTION_CATALOG,
          "SUBSCRIPTION_CATALOG_FOOTER6_LINK"
        ).label,
      },
    ];
    const footerLogo = metaHelpers.findElement(
      KEY_SUBSCRIPTION_CATALOG,
      "SUBSCRIPTION_CATALOG_FOOTER_LOGO"
    ).label;
    const showFooterLogo = metaHelpers.findElement(
      KEY_SUBSCRIPTION_CATALOG,
      "SUBSCRIPTION_CATALOG_SHOW_FOOTER_LOGO"
    ).label;
    const showFooterLinks = metaHelpers.findElement(
      KEY_SUBSCRIPTION_CATALOG,
      "SUBSCRIPTION_CATALOG_SHOW_FOOTER_LINKS"
    ).label;
    return (
      <React.Fragment>
        {(showFooterLogo || showFooterLinks) && (
          <View style={styles.footerContainer}>
            {showFooterLogo && footerLogo && (
              <Image
                source={{ uri: footerLogo }}
                style={styles.footerImageStyle}
              />
            )}
            {showFooterLinks && (
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.footerText}>
                  {footerData.map((data, index) => {
                    return (
                      <Text
                        key={index}
                        onPress={() => this.showDocument(data)}
                        style={{ flexDirection: "row" }}
                      >
                        <EvilIcons
                          name="external-link"
                          size={16}
                          color="#ED1B2E"
                        />
                        <Text>{`${data.text} `}</Text>
                      </Text>
                    );
                  })}
                </Text>
              </View>
            )}
          </View>
        )}
      </React.Fragment>
    );
  };

  renderSubscription = () => {
    const {
      subscriptionData,
      currencyLocale,
      goToCancelSubscription,
      countryDateFormat,
      createEvent,
    } = this.props;
    const { productOptions, id, cancelDate, endDate } = subscriptionData;

    const backgroundImageUrl = metaHelpers.findElement(
      KEY_SUBSCRIPTION_CATALOG,
      "SUBSCRIPTION_BACKGROUND_HEADER_IMAGE"
    ).label;

    const trophyImageUrl = metaHelpers.findElement(
      KEY_SUBSCRIPTION_CATALOG,
      "SUBSCRIPTION_HEADER_TROPHY_IMAGE"
    ).label;

    const totalPremium =
      productOptions &&
      (productOptions[0].product.attributes.find(
        item => item.name === "totalPremium"
      ).value ||
        "");
    const subscriptionTerm =
      productOptions &&
      (productOptions[0].product.attributes.find(
        item => item.name === "subscriptionTerm"
      ).value ||
        "");
    const subscriptionTermUnit =
      productOptions &&
      (productOptions[0].product.attributes.find(
        item => item.name === "subscriptionTermUnit"
      ).value ||
        "");
    const subscriptionCode = productOptions && productOptions[0].product.code;
    const displayableEndDate = moment(endDate, "YYYY-MM-DD").format(
      countryDateFormat || "DD-MM-YYYY"
    );

    const subscriptionRecurTerm = metaHelpers.findElement(
      KEY_SUBSCRIPTION_CATALOG,
      `SUBSCRIPTION_RECUR_TERM_${subscriptionTermUnit}_${subscriptionTerm}`
    ).label;

    const subscriptionName =
      productOptions &&
      metaHelpers.findElement(
        KEY_SUBSCRIPTION_CATALOG,
        `SUBSCRIPTION_PRODUCT_${productOptions[0].product.code}_NAME`
      ).label;

    const cancelSubscriptionButtonText = metaHelpers.findElement(
      KEY_SUBSCRIPTION_CATALOG,
      "SUBSCRIPTION_CATALOG_CANCEL_SUBSCRIPTION_BUTTON_TEXT"
    ).label;

    const expireSubscriptionText = metaHelpers.findElement(
      KEY_SUBSCRIPTION_CATALOG,
      "SUBSCRIPTION_CATALOG_EXPIRES_TEXT"
    ).label;

    return (
      <ImageBackground
        resizeMode="cover"
        style={styles.headerBgImageStyle}
        source={{ uri: backgroundImageUrl ? backgroundImageUrl : null }}
      >
        <LinearGradient
          colors={["rgba(84,84,84,0)", "rgba(0,0,0,0.64)"]}
          style={{ flex: 1, height: 200 }}
        >
          <HeaderBackButton
            onPress={e => {
              e.preventDefault();
              NavigationService.goBack();
            }}
            tintColor="rgb(255,255,255)"
            pressColorAndroid="rgba(0, 0, 0, 0)"
          />
          <View style={styles.headerTitleWrapper}>
            <View style={styles.headerTextContainer}>
              {subscriptionName && (
                <Text style={styles.headerTextStyle}>{subscriptionName}</Text>
              )}
              {!!totalPremium && (
                <Text style={styles.totalPremiumText}>
                  {formatCurrency(totalPremium, currencyLocale, "currency.") +
                    subscriptionRecurTerm}
                </Text>
              )}
            </View>

            <View style={{ paddingLeft: 5 }}>
              {productOptions && !cancelDate ? (
                <Text
                  style={[styles.boldText, styles.buttonText]}
                  onPress={() => {
                    goToCancelSubscription(id, subscriptionCode);
                    createEvent(
                      "pulse.mySubscription.cancelSubscription",
                      "ClickEvent",
                      "Subscription_catalog",
                      null,
                      null,
                      { productCode: subscriptionCode }
                    );
                  }}
                >
                  {cancelSubscriptionButtonText}
                </Text>
              ) : null}
              {cancelDate ? (
                <View style={styles.cancelledMessageContainer}>
                  <Text style={styles.cancelledMessageText}>
                    {`${expireSubscriptionText} ${displayableEndDate}`}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  };

  render() {
    const { showTncModal, updating, visible, config, tncModal } = this.state;
    if (showTncModal && !updating) {
      return (
        <ProductCatalogModal
          visible={tncModal}
          onSubmit={this.submitTnc}
          disable={this.state.updating}
        />
      );
    }
    return (
      <View style={styles.container}>
        {this.renderSubscription()}
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
            />
          }
          style={{
            marginHorizontal: 0,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View>{this.renderGrid()}</View>
        </ScrollView>
        {this.renderFooter()}
        <PdfViewer
          goForTcAction={this.hideDocument}
          termsModal={visible}
          headerLabel={config && config.text}
          source={{
            uri: config && config.link,
            cache: false,
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userCountryDetails: state.auth.countryInfo,
    userPreferences: state.userPreferences,
    mySubscriptionConfig: state.screenConfig.MySubscription,
    tnc: state.profile.termsConditions,
    subscriptionData: pathOr(
      {},
      ["subscription", "subscriptionDetail", 0],
      state
    ),
    currencyLocale: state.meta.countryCommonMeta.countryCode2,
    countryDateFormat: state.meta.countryCommonMeta.dateFormat,
  };
};

export default connect(mapStateToProps, {
  getScreenRenderingConfig,
  goToScreen: (screen, payload) => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: screen,
    payload,
  }),
  updateCustomerTnc: payload => ({
    context: "ProductCatalog",
    type: "wizard/updateCustomerDetails",
    payload,
  }),
  getSubscriptions: () => ({
    context: "SUBSCRIPTION",
    type: "GET_SUBSCRIPTIONS",
  }),
  goToCancelSubscription: (id, code) => ({
    context: "SUBSCRIPTION_JOURNEYS",
    type: "subscription-journeys/cancel-subscription",
    payload: {
      subscriptionId: id,
      subscriptionCode: code,
    },
  }),
  createEvent: (name, type, screen, error, details, attributeDetails) => ({
    context: "PRODUCT_COMMON",
    type: "CREATE_EVENT",
    payload: {
      name,
      type,
      screen,
      error,
      details,
      attributeDetails,
    },
  }),
})(SubscriptionCatalog);

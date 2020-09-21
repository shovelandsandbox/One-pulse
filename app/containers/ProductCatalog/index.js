import React, { PureComponent } from "react";
import { View, ScrollView, RefreshControl, Image, Text } from "react-native";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import {
  CoreActionTypes,
  CoreUtils,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { getScreenRenderingConfig } from "../../actions";
import VerticalGroupedLayout from "../../components/ScreenLayouts/VerticalGroupedLayout";
import { ProductCatalogHeader } from "../../components";
import styles from "./style";
import ProductCatalogModal from "./withModal";
import PdfViewer from "../../components/PdfViewer";

const KEY_PRODUCT_CATALOG = "PRODUCT_CATALOG";
const KEY_SHOW_TNC_MODAL = "PRODUCT_CATALOG_SHOW_TNC_MODAL";
class ProductCatalog extends PureComponent {
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
    if (!this.state.showTncModal) {
      this.onRefresh();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const tncModal = metaHelpers.findElement(
      KEY_PRODUCT_CATALOG,
      KEY_SHOW_TNC_MODAL
    );
    const pruShoppeConsent = pathOr(
      null,
      ["tnc", "Prushoppe", "consent"],
      nextProps
    );
    if (pruShoppeConsent && pruShoppeConsent == "ACCEPT") {
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
    const { productCatalogConfig } = this.props;
    return (
      <VerticalGroupedLayout config={productCatalogConfig} transform={true} />
    );
  };

  onRefresh = () => {
    this.props.getScreenRenderingConfig({
      id: `m::ui::productCatalog_${this.props.userPreferences.language}`,
    });
  };

  renderImage = () => {
    const logoUrl = metaHelpers.findElement(
      KEY_PRODUCT_CATALOG,
      "PRODUCT_CATALOG_HEADER_LOGO"
    ).label;
    return (
      <View>
        <Image source={{ uri: logoUrl }} style={{ width: 90, height: 35 }} resizeMode = "contain" />
      </View>
    );
  };

  submitTnc = val => {
    const { tnc, updateCustomerTnc, navigation } = this.props;
    const version = metaHelpers.findElement(
      KEY_PRODUCT_CATALOG,
      "PRODUCT_CATALOG_PRUSHOP_VERSION"
    ).label;
    const privacyVersion = metaHelpers.findElement(
      KEY_PRODUCT_CATALOG,
      "PRODUCT_CATALOG_PRUSHOP_PRIVACY_VERSION"
    ).label;
    if (val) {
      const newTnc = {
        ...tnc,
        Prushoppe: {
          consent: "ACCEPT",
          consentDate: CoreUtils.getTimeStamp(),
          org: "Prushoppe",
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
          KEY_PRODUCT_CATALOG,
          "PRODUCT_CATALOG_FOOTER2_TEXT"
        ).label,
        link: metaHelpers.findElement(
          KEY_PRODUCT_CATALOG,
          "PRODUCT_CATALOG_FOOTER2_LINK"
        ).label,
      },
      {
        text: metaHelpers.findElement(
          KEY_PRODUCT_CATALOG,
          "PRODUCT_CATALOG_FOOTER3_TEXT"
        ).label,
        link: metaHelpers.findElement(
          KEY_PRODUCT_CATALOG,
          "PRODUCT_CATALOG_FOOTER3_LINK"
        ).label,
      },
      {
        text: metaHelpers.findElement(
          KEY_PRODUCT_CATALOG,
          "PRODUCT_CATALOG_FOOTER4_TEXT"
        ).label,
        link: metaHelpers.findElement(
          KEY_PRODUCT_CATALOG,
          "PRODUCT_CATALOG_FOOTER4_LINK"
        ).label,
      },
      {
        text: metaHelpers.findElement(
          KEY_PRODUCT_CATALOG,
          "PRODUCT_CATALOG_FOOTER5_TEXT"
        ).label,
        link: metaHelpers.findElement(
          KEY_PRODUCT_CATALOG,
          "PRODUCT_CATALOG_FOOTER5_LINK"
        ).label,
      },
      {
        text: metaHelpers.findElement(
          KEY_PRODUCT_CATALOG,
          "PRODUCT_CATALOG_FOOTER6_TEXT"
        ).label,
        link: metaHelpers.findElement(
          KEY_PRODUCT_CATALOG,
          "PRODUCT_CATALOG_FOOTER6_LINK"
        ).label,
      },
    ];
    const footerLogo = metaHelpers.findElement(
      KEY_PRODUCT_CATALOG,
      "PRODUCT_CATALOG_FOOTER_LOGO"
    ).label;
    const showFooterLogo = metaHelpers.findElement(
      KEY_PRODUCT_CATALOG,
      "PRODUCT_CATALOG_SHOW_FOOTER_LOGO"
    ).label;
    const showFooterLinks = metaHelpers.findElement(
      KEY_PRODUCT_CATALOG,
      "PRODUCT_CATALOG_SHOW_FOOTER_LINKS"
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
        <ProductCatalogHeader
          rightImage={true}
          rightImageRenderMethod={this.renderImage}
          colors={["#ec1c2e", "#a21421"]}
        />
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
    productCatalogConfig: state.screenConfig.ProductCatalog,
    tnc: state.profile.termsConditions,
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
})(ProductCatalog);

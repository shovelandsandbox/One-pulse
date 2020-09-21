import React, { PureComponent } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import { CoreComponents, metaHelpers } from "@pru-rt-internal/pulse-common";
import Icons from "react-native-vector-icons/Ionicons";
const { AppButton } = CoreComponents;
import PdfViewer from "../../components/PdfViewer";
import langMeta from "./meta";
const KEY_PRODUCT_CATALOG = "PRODUCT_CATALOG";
const { width } = Dimensions.get("window");
export default class ProductCatalogModal extends PureComponent {
  constructor(props) {
    super(props);
    this.documentConfigs = {
      tnc1: {
        headerLabel: metaHelpers.findElement(
          KEY_PRODUCT_CATALOG,
          "PRODUCT_CATALOG_TNC1_LINK_HEADER"
        ).label,
        link: metaHelpers.findElement(
          KEY_PRODUCT_CATALOG,
          "PRODUCT_CATALOG_TNC1_LINK"
        ).label,
      },
      tnc2: {
        headerLabel: metaHelpers.findElement(
          KEY_PRODUCT_CATALOG,
          "PRODUCT_CATALOG_TNC1_LINK2_HEADER"
        ).label,
        link: metaHelpers.findElement(
          KEY_PRODUCT_CATALOG,
          "PRODUCT_CATALOG_TNC1_LINK2"
        ).label,
      },
      tnc3: {
        headerLabel: metaHelpers.findElement(
          KEY_PRODUCT_CATALOG,
          "PRODUCT_CATALOG_TNC2_LINK_HEADER"
        ).label,
        link: metaHelpers.findElement(
          KEY_PRODUCT_CATALOG,
          "PRODUCT_CATALOG_TNC2_LINK"
        ).label,
      },
      tnc4: {
        headerLabel: metaHelpers.findElement(
          KEY_PRODUCT_CATALOG,
          "PRODUCT_CATALOG_TNC3_LINK_HEADER"
        ).label,
        link: metaHelpers.findElement(
          KEY_PRODUCT_CATALOG,
          "PRODUCT_CATALOG_TNC3_LINK"
        ).label,
      },
    };
    this.state = {
      visible: false,
      config: null,
    };
    this.langMeta = {
      ...langMeta.initializeMeta(),
    };
  }
  showDocument = documentName => {
    this.setState({
      visible: true,
      config: this.documentConfigs[documentName],
    });
  };

  hideDocument = () => {
    this.setState({ visible: false });
  };

  // eslint-disable-next-line complexity
  render() {
    const { visible, config } = this.state;
    if (!this.props.visible) {
      return null;
    }
    const validateIcon_1 =
      this.langMeta.PRODUCT_CATALOG_TNC1_PRE_TEXT ||
      this.langMeta.PRODUCT_CATALOG_TNC1_LINK_LABEL ||
      this.langMeta.PRODUCT_CATALOG_TNC1_POST_TEXT ||
      this.langMeta.PRODUCT_CATALOG_TNC1_LINK2_LABEL ||
      this.langMeta.PRODUCT_CATALOG_TNC1_POST_TEXT2;

    const validateIcon_2 =
      this.langMeta.PRODUCT_CATALOG_TNC2_PRE_TEXT ||
      this.langMeta.PRODUCT_CATALOG_TNC2_LINK_LABEL ||
      this.langMeta.PRODUCT_CATALOG_TNC2_POST_TEXT;

    const validateIcon_3 =
      this.langMeta.PRODUCT_CATALOG_TNC3_PRE_TEXT ||
      this.langMeta.PRODUCT_CATALOG_TNC3_LINK_LABEL ||
      this.langMeta.PRODUCT_CATALOG_TNC3_POST_TEXT;

    return (
      <React.Fragment>
        <Modal
          isVisible={this.props.visible}
          onBackdropPress={() => {
            this.props.onSubmit(false);
          }}
          onBackButtonPress={() => {
            this.props.onSubmit(false);
          }}
          style={styles.modalContainer}
          useNativeDriver={true}
        >
          <PdfViewer
            goForTcAction={this.hideDocument}
            termsModal={visible}
            headerLabel={config && config.headerLabel}
            source={{
              uri: config && config.link,
              cache: false,
            }}
          />
          <View style={styles.mainContainer}>
            <View style={styles.shareContainer}>
              <View>
                <Text style={[styles.tncText, styles.tncHeader]}>
                  {this.langMeta.PRODUCT_CATALOG_TNC_HEADER}
                  {"\n"}
                </Text>
                {!!validateIcon_1 && (
                  <View style={styles.descriptionItem}>
                    <View style={styles.iconStyle}>
                      <Icons name="ios-checkmark" size={18} color="white" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.descriptionText}>
                        {this.langMeta.PRODUCT_CATALOG_TNC1_PRE_TEXT}
                        <Text
                          style={styles.termsLink}
                          onPress={() => {
                            this.showDocument("tnc1");
                          }}
                        >
                          {this.langMeta.PRODUCT_CATALOG_TNC1_LINK_LABEL}
                        </Text>
                        {this.langMeta.PRODUCT_CATALOG_TNC1_POST_TEXT}
                        <Text
                          style={styles.termsLink}
                          onPress={() => {
                            this.showDocument("tnc2");
                          }}
                        >
                          {this.langMeta.PRODUCT_CATALOG_TNC1_LINK2_LABEL}
                        </Text>
                        {this.langMeta.PRODUCT_CATALOG_TNC1_POST_TEXT2}
                        {"\n"}
                      </Text>
                    </View>
                  </View>
                )}
                {!!validateIcon_2 && (
                  <View style={styles.descriptionItem}>
                    <View style={styles.iconStyle}>
                      <Icons name="ios-checkmark" size={18} color="white" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.descriptionText}>
                        {this.langMeta.PRODUCT_CATALOG_TNC2_PRE_TEXT}
                        <Text
                          style={styles.termsLink}
                          onPress={() => {
                            this.showDocument("tnc3");
                          }}
                        >
                          {this.langMeta.PRODUCT_CATALOG_TNC2_LINK_LABEL}
                        </Text>
                        {this.langMeta.PRODUCT_CATALOG_TNC2_POST_TEXT}
                        {"\n"}
                      </Text>
                    </View>
                  </View>
                )}
                {!!validateIcon_3 && (
                  <View style={styles.descriptionItem}>
                    <View style={styles.iconStyle}>
                      <Icons name="ios-checkmark" size={18} color="white" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.descriptionText}>
                        {this.langMeta.PRODUCT_CATALOG_TNC3_PRE_TEXT}
                        <Text
                          style={styles.termsLink}
                          onPress={() => {
                            this.showDocument("tnc4");
                          }}
                        >
                          {this.langMeta.PRODUCT_CATALOG_TNC3_LINK_LABEL}
                        </Text>
                        {this.langMeta.PRODUCT_CATALOG_TNC3_POST_TEXT}
                        {"\n"}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
              <View style={styles.optionsContainer}>
                <AppButton
                  type={styles.cancelBtn}
                  textStyle={styles.cancelBtnText}
                  disable={this.props.disable}
                  title={this.langMeta.PRODUCT_CATALOG_TNC_CANCEL_BUTTON_LABEL}
                  press={() => {
                    this.props.onSubmit(false);
                  }}
                />
                <AppButton
                  type={styles.proceedBtn}
                  disable={this.props.disable}
                  title={this.langMeta.PRODUCT_CATALOG_TNC_PROCEED_BUTTON_LABEL}
                  press={() => {
                    this.props.onSubmit(true);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </React.Fragment>
    );
  }
}

ProductCatalogModal.propTypes = {
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  disable: PropTypes.bool,
};

const styles = StyleSheet.create({
  descriptionItem: {
    flexDirection: "row",
    width: "100%",
  },
  descriptionText: {
    color: "#404040",
    flexWrap: "wrap",
    fontFamily: "Avenir",
    fontSize: 13,
    textAlign: "justify",
    paddingRight: 5,
  },
  iconStyle: {
    alignItems: "center",
    backgroundColor: "#3ead49",
    borderRadius: 20,
    height: 20,
    justifyContent: "center",
    marginRight: 10,
    width: 20,
  },
  mainContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    margin: 0,
    padding: 0,
  },
  modalContainer: {
    alignSelf: "center",
    justifyContent: "center",
    margin: 0,
    padding: 0,
    width: width * 0.9,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  proceedBtn: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 22,
    backgroundColor: "#ED1B2E",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    fontFamily: "Avenir",
    textAlign: "center",
    alignSelf: "center",
  },
  cancelBtn: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 22,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
    fontSize: 16,
    fontFamily: "Avenir",
    textAlign: "center",
    alignSelf: "center",
  },
  cancelBtnText: {
    color: "#ED1B2E",
  },
  shareContainer: {
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: "white",
  },
  termsLink: {
    color: "#F1172B",
    textDecorationLine: "underline",
  },
  tncHeader: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 18,
  },
  tncText: {
    flexWrap: "wrap",
    fontFamily: "Avenir",
    fontSize: 14,
    lineHeight: 16,
  },
});
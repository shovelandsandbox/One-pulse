import React, { PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CoreConfig } from "@pru-rt-internal/pulse-common";
import { filter, isEmpty } from "ramda";

import Styles from "./style";
import { default as lang, myPolicyMetaKeys } from "../lang";
import { TextM } from "../../../components/derivatives/Text";
import { default as FontAwesomeIcon } from "react-native-vector-icons/FontAwesome";
import { Padder as PadderContainer } from "../../../components/containers";

import { myPolicyActions } from "../../../configs/myPolicyActions";

const { MY_POLICY_DETAIL_SCREEN } = CoreConfig.pageKeys;
import IMAGES from "../../../configs/Images";
const extractKey = item => {
  const key = `PruListItem: ${item.id}`;
  return key;
};

class MyPolicyDetailEPolicy extends PureComponent {
  showPolicyPDF = id => {
    const payload = {
      documentId: id,
    };
    this.props.showPDFDocument(payload);
  };

  renderPDFItem = item => {
    return (
      <TouchableOpacity
        style={Styles.pdfContainer}
        onPress={() => this.showPolicyPDF(item.id)}
      >
        <View style={{ justifyContent:'space-between', flexDirection: 'row',flex:1,width:'100%' }}>
          <View style={{ flexDirection: 'row',width:'75%' }}>
            <View style={StyleSheet.flatten([Styles.iconContainer])}>
              <FontAwesomeIcon
                raised
                name={"file-pdf-o"}
                color={"grey"}
                size={16}
              />
            </View>
            <View style={{ paddingLeft: 11.5,justifyContent:'center' }}>   
              <Text style={Styles.pdfDownloadItem}>{item.filename ? item.filename : `e-Policy-${item.type}`}</Text>
            </View>
          </View>
          <View style={{ paddingRight: 15.2,width:28,flex:0.3,justifyContent:'center' }}>
            <Image source={IMAGES.illustration.my_policy.ic_download} width={12.8} height={13.7} />

          </View>

        </View>
      </TouchableOpacity >
    );
  };

  FlatListItemSeparator = () => <View style={Styles.line} />;

  renderPDFList = documents => {
    return (
      <FlatList
        keyExtractor={extractKey}
        data={documents}
        renderItem={({ item }) => this.renderPDFItem(item)}
      // ItemSeparatorComponent={this.FlatListItemSeparator}
      ></FlatList>
    );
  };

  renderEPolicy() {
    const { policyData = {} } = this.props;
    if (!policyData || isEmpty(policyData)) {
      return null;
    }
    const documents = policyData.documents
      ? filter(item => item.type === "PolicyPDF", policyData.documents)
      : [];
    const topPadding = { marginTop: 16 };

    const unableToDownloadPolicy = (
      <PadderContainer style={topPadding}>
        <TextM>{lang.noEPolicy()}</TextM>
      </PadderContainer>
    );

    if (!documents.length) {
      return unableToDownloadPolicy;
    }

    return this.renderPDFList(documents);
  }

  render() {
    return <View style={{ flex: 1, backgroundColor: 'rgb(247,249,251)' }}>{this.renderEPolicy()}</View>;
  }
}

MyPolicyDetailEPolicy.propTypes = {
  policyData: PropTypes.object,
  showPDFDocument: PropTypes.func,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  showPDFDocument: payload => {
    dispatch({
      context: MY_POLICY_DETAIL_SCREEN,
      type: myPolicyActions.searchPDFDocument,
      payload,
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPolicyDetailEPolicy);

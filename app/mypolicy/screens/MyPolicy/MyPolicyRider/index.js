import React, { PureComponent } from "react";
import { TouchableOpacity, View, Platform } from "react-native";
import { connect } from "react-redux";
import { isEmpty, pathOr, path, isNil } from "ramda";
import PropTypes from "prop-types";

import { Colors } from "../../../configs";
import Styles from "./style";
import lang from "../lang";
import {
  convertToCapitalCase,
  formatDate,
  getPolicyStatusComponent,
  dateDiff,
} from "../../../utils";

import { formatCurrency, formatName } from "../../../../utils";

import {
  TextLX,
  TextM,
  TextMX,
  TextS,
} from "../../../components/derivatives/Text";
import {
  Base as BaseContainer,
  Padder as PadderContainer,
} from "../../../components/containers";
import { SimpleListRow as SimpleListRowCard } from "../../../components/cards";
import Icon from "../../../components/generics/Icon";
import { ImageIllustration } from "../../../components/derivatives/Image";
const historyListMeta = (meta, types, keys) => {
  const items = meta.find(item => item.type === types && item.key === keys);
  return items === undefined ? types : items.label;
};

const MAIN_CLAIM = "mainclaim";

class MyPolicyRider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeDropdownIndex: -1,
      riderData: props.navigationParams.riderData,
    };
  }

  toggleDropdown(index) {
    if (this.state.activeDropdownIndex === index) {
      this.setState({ activeDropdownIndex: -1 });

      return false;
    }

    this.setState({ activeDropdownIndex: index });
  }

  // _renderListItem({ name, status, description, value, index }) {
  //   const tagRender = getPolicyStatusComponent(status);

  //   return (
  //     <TouchableOpacity key={index} onPress={() => this.toggleDropdown(index)}>
  //       <PadderContainer style={Styles.list.container}>
  //         <View style={Styles.list.topContainer}>
  //           {tagRender}
  //           <TextMX style={Styles.list.name}>{name}</TextMX>

  //           <TextS color={Colors.main.baseGray}>{description}</TextS>
  //           <TextM>{value}</TextM>
  //         </View>

  //         <Icon
  //           name={this.state.activeDropdownIndex === index ? "up" : "down"}
  //           color={Colors.main.inactiveGray}
  //         />
  //       </PadderContainer>
  //     </TouchableOpacity>
  //   );
  // }

  _renderListItem({ name, status, description, value, index }) {
    const tagRender = getPolicyStatusComponent(status);

    return (
      <TouchableOpacity key={index} onPress={() => this.toggleDropdown(index)} style={Styles.list.container}>
          <View style={Styles.list.topContainer}>
            <TextS style={{color: "rgb(237, 27, 46)", fontFamily: Platform.OS === "ios"? "Avenir-Black" : "Avenir-Black-03", marginBottom: 5}}>{`Rider ${index+1}`}</TextS>
            <TextM style={Styles.list.name}>{name}</TextM>
            <TextS color={[Colors.main.baseGray, {fontFamily: Platform.OS === "ios"? "Avenir-Roman" : "Avenir-Roman-12"}]}>{`${description}: ${value}`}</TextS>
          </View>

          <Icon
            name={this.state.activeDropdownIndex === index ? "up" : "down"}
            color={Colors.main.inactiveGray}
          />
      </TouchableOpacity>
    );
  }

  // ----------------------------------------

  _renderTitle = riderData => {
    if (riderData.length < 1) {
      return (
        <View>
          <PadderContainer style={Styles.title.container}>
            <TextLX>{""}</TextLX>
          </PadderContainer>
        </View>
      );
    }
    return (
      <View>
        <PadderContainer style={Styles.title.container}>
          <TextLX>{lang.policyRider()}</TextLX>
        </PadderContainer>
      </View>
    );
  };

  // ----------------------------------------

  _renderSimpleRowData = (label, value) => {
    return <SimpleListRowCard label={label} value={value} />;
  };

  // ----------------------------------------

  // eslint-disable-next-line complexity
  _renderDetailListItem(label, value, isHeader = false, index) {
    return (
      <View key={index} style={Styles.list.detail.lifeAssureds.container}>
        <View style={Styles.list.detail.lifeAssureds.innerContainer}>
          <TextS
            color={isHeader ? Colors.main.baseGray : Colors.main.baseBlack}
          >
            {label}
          </TextS>
        </View>

        <View style={Styles.list.detail.lifeAssureds.innerContainer1}>
          <TextS
            color={isHeader ? Colors.main.baseGray : Colors.main.baseBlack}
          >
            {value}
          </TextS>
        </View>
      </View>
    );
  }

  // ----------------------------------------

  _renderDetailList(riderItem) {
    if (isNil(riderItem) || isEmpty(riderItem)) {
      return null;
    }

    const { nameFormat } = this.props;
    const laCustomer = pathOr({}, ["lifeAssured", "customer"], riderItem);
    const { firstName, surName } = laCustomer;
    const name =
      convertToCapitalCase(
        formatName({ firstName, surName }, nameFormat, true),
        false
      ) || lang.getNA();

    return (
      <PadderContainer style={Styles.list.detail.lifeAssureds.grouper}>
        {this._renderDetailListItem(
          lang.lifeAssured(),
          lang.enrollmentAge(),
          true,
          -1
        )}
        {this._renderDetailListItem(
          convertToCapitalCase(name, false),
          dateDiff(riderItem.commencementDate, laCustomer.dob).years() +
            " years",
          false,
          0
        )}
      </PadderContainer>
    );
  }

  // ----------------------------------------

  _renderDetails(riderItem, index) {
    if (this.state.activeDropdownIndex !== index) {
      return null;
    }
    const { dateFormat } = this.props;
    const riskCessDate = pathOr(lang.getNA(), ["riskCessDate"], riderItem);
    return (
      <View style={Styles.list.detail.grouper} key={"x" + index}>
        {this._renderSimpleRowData(
          lang.coverageStartDate(),
          formatDate(riderItem.commencementDate, dateFormat)
        )}
        {this._renderSimpleRowData(
          lang.coverageEndDate(),
          formatDate(riskCessDate, dateFormat)
        )}
        {this._renderDetailList(riderItem)}
      </View>
    );
  }

  // ----------------------------------------

  _renderList() {
    const { riderData } = this.state;
    const { meta, moneyFormat } = this.props;
    if (riderData.length < 1) {
      return (
        <PadderContainer style={Styles.container}>
          <View style={Styles.top.container}>
            <View style={Styles.top.image.container}>
              <ImageIllustration name={"modal.empty_history_claim"} />
            </View>
          </View>

          <View style={Styles.bottom}>
            <TextLX
              align={"center"}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ marginBottom: 24 }}
              color={
                // this.props.inverse ?
                Colors.main.baseBlack
                // : Colors.main.fontGray
              }
            >
              {historyListMeta(
                meta.metaDetail.commons,
                MAIN_CLAIM,
                "listpolicyridertitle"
              )}
            </TextLX>

            <TextM
              align={"center"}
              color={
                // this.props.inverse
                // ? Colors.main.baseWhite :
                Colors.main.baseGray
              }
            >
              {historyListMeta(
                meta.metaDetail.commons,
                MAIN_CLAIM,
                "listpolicyriderdesc"
              )}
            </TextM>
          </View>
        </PadderContainer>
      );
    }
    return (
      <View style={Styles.list.grouper}>
        {riderData.map((riderItem, index) => {
          const { coverageName, status, sumAssured: value } = riderItem;
          let riderName = coverageName;
          if (!riderName) {
            const riderCode = path(["component", "code"], riderItem);
            riderName = lang.laRiders(riderCode);
          }
          if (!riderName) {
            riderName = pathOr(lang.getNA(), ["component", "name"], riderItem);
          }

          const description = lang.coveragePrice();
          return (
            <View order={(index + 2) * 2} key={index}>
              {this._renderListItem({
                name: convertToCapitalCase(
                  riderName ? riderName : lang.getNA()
                ),
                status,
                description,
                value: `${formatCurrency(
                  value ? value : 0,
                  this.props.simCountry,
                  moneyFormat
                )}`,
                index,
              })}
              {this._renderDetails(riderItem, index)}
            </View>
          );
        })}
      </View>
    );
  }

  //#endregion

  render() {
    const { riderData } = this.state;

    if (!riderData || isEmpty(riderData)) {
      return null;
    }

    return (
      <BaseContainer
        onBackPress={() => this.props.navigation.pop()}
        persistScrollTitle={lang.riderInsurance()}

      >
        {this._renderTitle(riderData)}
        {this._renderList()}
      </BaseContainer>
    );
  }
}

MyPolicyRider.propTypes = {
  navigationParams: PropTypes.object,
  navigation: PropTypes.any,
  meta: PropTypes.object,
  simCountry: PropTypes.string,
  dateFormat: PropTypes.string,
  moneyFormat: PropTypes.string,
  nameFormat: PropTypes.string,
};

const mapStateToProps = state => ({
  navigationParams: pathOr([], ["appNavigation", "params"], state),
  meta: state.meta,
  simCountry: state.auth.countryInfo.simCountry,
  dateFormat: path(["meta", "countryCommonMeta", "dateFormat"], state),
  moneyFormat: path(["meta", "countryCommonMeta", "moneyFormat"], state),
  nameFormat: path(["meta", "countryCommonMeta", "nameFormat"], state),
});

export default connect(mapStateToProps, null)(MyPolicyRider);

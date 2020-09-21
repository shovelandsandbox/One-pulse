import React, { PureComponent } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Colors } from "../../../configs";
import Styles from "./style";
import lang from "../lang";
import {
  formatDate,
  formatNumber,
  getCurrencyForCountry,
} from "../../../utils";

import { formatCurrency } from "../../../../utils";

import {
  TextL,
  TextLX,
  TextM,
  TextS,
} from "../../../components/derivatives/Text";
import {
  Base as BaseContainer,
  Padder as PadderContainer,
} from "../../../components/containers";
import { SimpleListRow as SimpleListRowCard } from "../../../components/cards";
import Icon from "../../../components/generics/Icon";
import { pathOr, path, isEmpty } from "ramda";
import Images from "../../../configs/Images"
class MyPolicyInvestment extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeDropdownIndex: -1,
    };
  }

  toggleDropdown(index) {
    if (this.state.activeDropdownIndex === index) {
      this.setState({ activeDropdownIndex: -1 });

      return false;
    }

    this.setState({ activeDropdownIndex: index });
  }

  renderListItem(item, index) {
    const { fund, fundPercentage } = item;
    const { simCountry } = this.props;
    const { ic_down, ic_up } = Images.illustration.my_policy;
    return (
      <TouchableOpacity key={index} onPress={() => this.toggleDropdown(index)}>
        <PadderContainer style={Styles.list.container}>
          <View style={Styles.list.topContainer}>
            <TextM style={Styles.list.titleText}>{pathOr(lang.getNA(), ["fundName"], fund)}</TextM>
            <TextS color={'rgb(47,47,47)'}>
              {getCurrencyForCountry(simCountry)}
            </TextS>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextL style={{ paddingRight: 10 }}>{fundPercentage || 0}%</TextL>
            <Image
              source={this.state.activeDropdownIndex === index ? ic_up : ic_down}
              style={Styles.arrowIcon}
            />
          </View>

        </PadderContainer>
      </TouchableOpacity>
    );
  }

  renderTitle() {
    return (
      <View>
        <PadderContainer style={Styles.title.container}>
          <TextLX>{"Investment Fund"}</TextLX>
        </PadderContainer>
      </View>
    );
  }

  renderAmount = (investmentAmount = 0, currency, moneyFormat) => {
    return (
      <View>
        <PadderContainer style={Styles.amount.container}>
          <TextM color={Colors.main.baseGray}>{lang.cashTotal()}</TextM>
          <TextL>
            {formatCurrency(investmentAmount, currency, moneyFormat)}
          </TextL>
        </PadderContainer>
      </View>
    );
  };

  renderSimpleRowData = (label, value) => {
    return <SimpleListRowCard label={label} value={value} hideBorder={true} />;
  };

  renderDetails(data, index, currency) {
    if (this.state.activeDropdownIndex !== index) {
      return null;
    }
    const { dateFormat, moneyFormat } = this.props;
    const { fund, units, value } = data;
    const { unitPrice, unitValue, unitPriceDate } = fund;

    return (
      <View style={Styles.list.detail.grouper} key={"x" + index}>
        {this.renderSimpleRowData(
          lang.unitBalance(),
          units ? formatNumber(units) : lang.getNA()
        )}
        {this.renderSimpleRowData(
          lang.unitPrice(),
          unitPrice ? formatNumber(unitPrice) : lang.getNA()
        )}
        {this.renderSimpleRowData(
          lang.unitValue(),
          formatCurrency(
            value != undefined ? value : unitValue,
            currency,
            moneyFormat
          )
        )}
        {this.renderSimpleRowData(
          lang.unitPriceDate(),
          unitPriceDate ? formatDate(unitPriceDate, dateFormat) : lang.getNA()
        )}
      </View>
    );
  }

  // ----------------------------------------

  renderList() {
    const funds = pathOr(
      [],
      ["myPolicyData", "myPolicyFunds", "funds"],
      this.props
    );
    return (
      <View style={Styles.list.grouper}>
        {funds.map((item, index) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <View>
              {this.renderListItem(item, index)}
              {this.renderDetails(item, index)}
            </View>
          );
        })}
      </View>
    );
  }

  //#endregion

  render() {
    const { myPolicyData, moneyFormat } = this.props;
    const { myPolicyFunds } = myPolicyData;

    if (!myPolicyFunds || isEmpty(myPolicyFunds)) {
      return null;
    }

    const { simCountry } = this.props;

    return (
      <BaseContainer
        onBackPress={() => this.props.navigation.pop()}
        persistScrollTitle={lang.investmentFund()}
      >
        {this.renderTitle()}

        {this.renderAmount(
          myPolicyFunds.totalInvestment,
          simCountry,
          moneyFormat
        )}

        {this.renderList()}
      </BaseContainer>
    );
  }
}

MyPolicyInvestment.propTypes = {
  navigation: PropTypes.any,
  simCountry: PropTypes.string,
  myPolicyData: PropTypes.object,
  dateFormat: PropTypes.string,
  moneyFormat: PropTypes.string,
};

const mapStateToProps = state => ({
  language: state.userPreferences.language,
  myPolicyData: pathOr({}, ["myPolicy", "currentSelectedPolicy"], state),
  simCountry: state.auth.countryInfo.simCountry,
  dateFormat: path(["meta", "countryCommonMeta", "dateFormat"], state),
  moneyFormat: path(["meta", "countryCommonMeta", "moneyFormat"], state),
});

export default connect(mapStateToProps, null)(MyPolicyInvestment);

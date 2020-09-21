import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  UIManager,
  Platform,
  LayoutAnimation,
  Image,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CoreConfig, CoreActionTypes } from "@pru-rt-internal/pulse-common";
import Icon from "react-native-vector-icons/FontAwesome";
import IconArrow from "../../../components/generics/Icon";
import Styles from "./style";
import RiderStyles from "../MyPolicyRider/style";
import {
  formatDate,
  convertToCapitalCase,
  getPolicyStatusComponent,
  dateDiff,
} from "../../../utils";
import { formatCurrency, formatName } from "../../../../utils";
import { Colors } from "../../../configs";
import {
  SimpleListRow as SimpleListRowCard,
  SimpleDataRow as SimpleDataRowCard,
  RowMenu as RowMenuCard,
} from "../../../components/cards";
import lang from "../lang";
import {
  TextLX,
  TextM,
  TextMX,
  TextS,
} from "../../../components/derivatives/Text";
import Images from "../../../configs/Images";

import {
  Padder as PadderContainer,
  SimpleList as SimpleListContainer,
} from "../../../components/containers";
import IMAGES from "../../../configs/Images";
import {
  pathOr,
  isNil,
  isEmpty,
  path,
  reduce,
  filter,
  concat,
  find,
  toUpper,
  forEachObjIndexed,
} from "ramda";
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";

const {
  MY_POLICY_INVESTMENT_SCREEN,
  MY_POLICY_RIDER_SCREEN,
} = CoreConfig.pageKeys;
const { LOAD_MY_POLICY_INVESTMENT, LOAD_MY_POLICY_RIDER } = CoreActionTypes;

class MyPolicyDetailBenefit extends PureComponent {
  // _renderDoubleRow = ({
  //   firstLabel,
  //   firstValue,
  //   firstNote = null,
  //   secondLabel = null,
  //   secondValue,
  //   secondNote = null,
  // }) => {
  //   const negativeFlex = { flex: -1 };
  //   return (
  //     <PadderContainer style={Styles.doubleRow.grouper}>
  //       <View style={Styles.doubleRow.container}>
  //         <SimpleDataRowCard
  //           label={firstLabel}
  //           value={firstValue}
  //           note={firstNote}
  //           noPadding
  //           noBorder
  //         />
  //       </View>

  //       <View
  //         style={[Styles.doubleRow.container, !secondLabel && negativeFlex]}
  //       >
  //         <SimpleDataRowCard
  //           label={secondLabel}
  //           value={secondValue}
  //           note={secondNote}
  //           noPadding
  //           noBorder
  //         />
  //       </View>
  //     </PadderContainer>
  //   );
  // };

  // ----------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      activeDropdownIndex: "policyCoverage",
    };

    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  _renderMenuItem(icon, label, onPress) {
    return (
      <View style={Styles.rowContainer}>
        <RowMenuCard label={label} onPress={() => onPress()} icon={icon} />
      </View>
    );
  }

  // ----------------------------------------

  _renderMain() {
    const { policyData, simCountry, dateFormat, moneyFormat } = this.props;

    if (!policyData || isEmpty(policyData)) {
      return null;
    }

    const { totalSumAssured, pcoWithBaseCoverage } = policyData;
    const sumAssured = isNil(totalSumAssured) ? lang.getNA() : totalSumAssured;
    const firstRowData = {
      firstLabel: lang.coveragePrice(),
      firstValue: `${formatCurrency(sumAssured, simCountry, moneyFormat)}`,
    };

    const endDate = pathOr(lang.getNA(), ["riskCessDate"], pcoWithBaseCoverage);
    const secondRowData = {
      firstLabel: lang.coverageStartDate(),
      firstValue: formatDate(path(["inceptionDate"], policyData), dateFormat),
      secondLabel: lang.coverageEndDate(),
      secondValue:
        isNil(endDate) ||
          isEmpty(endDate) ||
          endDate.match(/9999-[0-9]+-[0-9]+/)
          ? "-"
          : formatDate(endDate, dateFormat),
    };

    // return (
    //   <View>
    //     {this._renderDoubleRow(firstRowData)}
    //     {this._renderDoubleRow(secondRowData)}
    //   </View>
    // );
    const isTextLengthMore = ((secondRowData.firstLabel && secondRowData.firstLabel.length > 20) ||
      (secondRowData.secondLabel && secondRowData.secondLabel.length > 20))
    console.log(":::::", isTextLengthMore);
    const policyDetailsItems = (
      <>
        <View style={[Styles.containerMainStyle, { justifyContent: 'space-between', flexDirection: 'row' }]}>
          <View>
            <Text style={{...Styles.mainLabel, ...configureLineHeight("18")}}>{firstRowData.firstLabel}</Text>
            <Text style={{...Styles.mainValue, ...configureLineHeight("18")}}>{firstRowData.firstValue}</Text>
          </View>
          <Image source={IMAGES.illustration.my_policy.ic_sum_assured} style={{ paddingRight: 16.8 }} />
        </View>
        <View style={[Styles.containerMainStyle, Styles.premiumContainer]}>
          <Text style={Styles.mainLabelBold}>{lang.coverageDate()}</Text>
          <View style={isTextLengthMore ? Styles.innerColumnContainer : Styles.innerMainContainer}>
            <View style = {{flex:1}}>
              <Text style={{...Styles.mainLabel, ...configureLineHeight("18")}}>{secondRowData.firstLabel}</Text>
              <Text style={{...Styles.mainValue, ...configureLineHeight("18")}}>{secondRowData.firstValue}</Text>
            </View>
            {!isTextLengthMore && <View style={Styles.verticalDivider} />}
            <View style = {{flex:1,paddingStart: isTextLengthMore? 0 : 20}}>
              <Text style={{...Styles.mainLabel, ...configureLineHeight("18")}}>{secondRowData.secondLabel}</Text>
              <Text style={{...Styles.mainValue, ...configureLineHeight("18")}}>{secondRowData.secondValue}</Text>
            </View>
          </View>
        </View>
      </>
    );
    return this._renderDropdownCommon(
      lang.policyDetail(),
      policyDetailsItems,
      "policyDetails"
    );
  }

  // ----------------------------------------

  _renderInvestment() {
    const { myPolicyFunds } = this.props;
    if (!isEmpty(myPolicyFunds) && !isEmpty(myPolicyFunds.funds)) {
      return <View styles={Styles.itemContainer}>

        <RowMenuCard label={lang.investmentFund()} onPress={() => this.props.loadMyPolicyInvestment({
          investmentData: {
            myPolicyFunds: myPolicyFunds,
          },
          currency: pathOr(
            lang.getNA(),
            ["policyData", "paymentOption", "currency"],
            this.props
          ),
          policyData: this.props.policyData,
        })} icon={"investment"} textStyle={Styles.title} showArrowRight />
      </View>
    }
  }

  getRiderData = riderDataWithRiderFlag => {
    const { policyData, productCodeToCoverageName } = this.props;

    if (!policyData || isEmpty(policyData)) {
      return null;
    }

    const { productOptions } = policyData;
    const allPCOs = reduce(
      (acc, po) =>
        acc.concat(
          filter(
            pco => (!riderDataWithRiderFlag && ((pco.riderFlag === "BASEPLAN" && !pco.lifeAssured.isPrimary) || pco.riderFlag !== "BASEPLAN")) || pco.riderFlag === "RIDER", 
            pathOr([], ["productComponentOptions"], po)
          )
        ),
      [],
      productOptions
    );

    return allPCOs.map(pco => {
      const pcoProductCode = pathOr("", ["component", "code"], pco);
      return {
        ...pco,
        coverageName: productCodeToCoverageName[pcoProductCode],
      };
    });
  };

  toggleDropdown(index) {
    if (this.state.activeDropdownIndex === index) {
      this.setState({ activeDropdownIndex: -1 });

      return false;
    }

    this.setState({ activeDropdownIndex: index });
  }

  _renderSimpleRowData = (label, value, isMoreText = false) => {
    // return <SimpleListRowCard label={label} value={value} />;
    return (
      <View style={[Styles.riderDropdownContainer, isMoreText && { paddingStart: 20, paddingEnd: 0,flex:1 }]}>
        <Text style={{...Styles.mainLabel, ...configureLineHeight("18")}}>{label}</Text>
        <Text style={{...Styles.mainValue, ...configureLineHeight("18")}}>{value}</Text>
      </View>
    );
  };

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
      // <PadderContainer style={RiderStyles.list.detail.lifeAssureds.grouper}>
      <>
        {this._renderDetailListItem(
          lang.lifeAssured(),
          convertToCapitalCase(name, false),
          true,
          -1
        )}
        {/* {this._renderDetailListItem(
          lang.enrollmentAge(),
          dateDiff(riderItem.commencementDate, laCustomer.dob).years() +
          " years",
          false,
          0
        )} */}
      </>
      // </PadderContainer>
    );
  }

  _renderDetailListItem(label, value, isHeader = false, index) {
    // return (
    //   <View key={index} style={RiderStyles.list.detail.lifeAssureds.container}>
    //     <View style={RiderStyles.list.detail.lifeAssureds.innerContainer}>
    //       <TextS
    //         color={isHeader ? Colors.main.baseGray : Colors.main.baseBlack}
    //       >
    //         {label}
    //       </TextS>
    //     </View>

    //     <View style={RiderStyles.list.detail.lifeAssureds.innerContainer1}>
    //       <TextS
    //         color={isHeader ? Colors.main.baseGray : Colors.main.baseBlack}
    //       >
    //         {value}
    //       </TextS>
    //     </View>
    //   </View>
    // );
    return (
      <View style={Styles.riderDropdownContainer}>
        <Text style={{...Styles.mainLabel, ...configureLineHeight("18")}}>{label}</Text>
        <Text style={{...Styles.mainValue, ...configureLineHeight("18")}}>{value}</Text>
      </View>
    );
  }

  _renderDetails(riderItem, index, common = false) {
    if (this.state.activeDropdownIndex !== index) {
      return null;
    }
    const { dateFormat } = this.props;
    const riskCessDate = pathOr(lang.getNA(), ["riskCessDate"], riderItem);
    const startDate = lang.coverageStartDate();
    const endDate = lang.coverageEndDate();
    const isRowText = ((startDate && startDate.length < 20) || (endDate && endDate.length < 20))
    if (!common) {
      return (
        <>
          <View style={[RiderStyles.list.detail.grouper, { backgroundColor: 'rgb(223,247,255)' }, isRowText && { flexDirection: 'row',flex:2,width:'100%' }]} key={"x" + index}>
            {this._renderSimpleRowData(
              lang.coverageStartDate(),
              formatDate(riderItem.commencementDate, dateFormat),
              isRowText
            )}
            {isRowText && <View style={[Styles.verticalDivider, { marginStart: 10, marginTop: 9 }]} />}
            {this._renderSimpleRowData(
              lang.coverageEndDate(),
              formatDate(riskCessDate, dateFormat),
              isRowText
            )}
          </View>
          {this._renderDetailList(riderItem)}
        </>
      );
    }
    return <>{riderItem}</>;
  }

  _renderListItem({ name, status, description, value, index, riderItem }) {
    const tagRender = getPolicyStatusComponent(status);
    const { ic_down, ic_up } = Images.illustration.my_policy;

    return (
      <View style={RiderStyles.list.wrapperContainer}>
        <TouchableOpacity
          key={index}
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.toggleDropdown(index);
          }}
          style={RiderStyles.list.container}
        >
          <View style={RiderStyles.list.topContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextS style={RiderStyles.list.number}>{lang.policyRider()}</TextS>
              <View
                style={Styles.statusStyle}>
                {tagRender}
              </View>
            </View>

            <TextM style={RiderStyles.list.name}>{name}</TextM>
            <TextS
              color={RiderStyles.list.value}
            >{`${description}: ${value}`}</TextS>
          </View>
 
          <Image
            source={this.state.activeDropdownIndex === index ? ic_up : ic_down}
            style={RiderStyles.list.iconStyle}
          />
        </TouchableOpacity>
        {this._renderDetails(riderItem, index)}
      </View>
    );
  }

  _renderDropdownCommon(name, commonRender, index) {
    const { ic_down, ic_up } = Images.illustration.my_policy;
    return (
      <View style={RiderStyles.list.wrapperContainer} key={"x" + index}>
        <TouchableOpacity
          key={index}
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.toggleDropdown(index);
          }}
          style={RiderStyles.list.containerCommon}
        >
          <TextM style={RiderStyles.list.name}>{name}</TextM>

          <Image
            source={this.state.activeDropdownIndex === index ? ic_up : ic_down}
            style={RiderStyles.list.iconStyle}
          />
        </TouchableOpacity>
        {this._renderDetails(commonRender, index, true)}
      </View>
    );
  }

  _renderMenus() {
    const { riderDataWithRiderFlag } = this.props;

    const riderData = this.getRiderData(riderDataWithRiderFlag);

    if (!riderData || riderData.length <= 0) {
      return null;
    }
    // return (
    //   <SimpleListContainer>
    //     {this._renderMenuItem("rider", lang.additionalInsurance(), () => {
    //       this.props.loadMyPolicyRider({
    //         riderData,
    //         currency: pathOr(
    //           lang.getNA(),
    //           ["policyData", "paymentOption", "currency"],
    //           this.props
    //         ),
    //         policyData: this.props.policyData,
    //       });
    //     })}
    //     {this._renderInvestment()}
    //   </SimpleListContainer>
    // );
    return (
      <View style={RiderStyles.list.grouper}>
        {riderData.map((riderItem, index) => {
          const { coverageName, status, sumAssured: value } = riderItem;
          const { meta, moneyFormat } = this.props;
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
                riderItem,
              })}
              {/* {this._renderDetails(riderItem, index)} */}
            </View>
          );
        })}
      </View>
    );
  }

  _renderPolicyCoverage = () => {
    const { productCodeToCoverageDesc, policyCoverageData } = this.props;
    let coverages = [];
    if (policyCoverageData && policyCoverageData.label) {
      coverages = policyCoverageData.label.split("|");
    } else {
      forEachObjIndexed(
        (value, key) => coverages.push([value]),
        productCodeToCoverageDesc
      );
    }
    if (coverages.length === 0) {
      return <View></View>;
    }
    // return (
    //   <View style={Styles.containerStyle}>
    //     <View>
    //       <Text style={Styles.titleStyle}>Policy Coverage</Text>
    //     </View>
    //     <View>
    //       {coverages.map(item => (
    //         // eslint-disable-next-line react/jsx-key
    //         <View
    //           style={StyleSheet.flatten([
    //             Styles.inputContainer(),
    //             { margin: 5 },
    //           ])}
    //         >
    //           <View style={StyleSheet.flatten([Styles.iconContainer])}>
    //             <Icon raised name={"circle"} color={"grey"} size={7} />
    //           </View>
    //           <View
    //             style={{
    //               width: 0,
    //               flexGrow: 1,
    //               flex: 1,
    //             }}
    //           >
    //             <Text>{item}</Text>
    //           </View>
    //         </View>
    //       ))}
    //     </View>
    //   </View>
    // );

    const policyCoverageItems = coverages.map((item, index) => (
      // eslint-disable-next-line react/jsx-key
      // <View
      //   style={StyleSheet.flatten([Styles.inputContainer(), { margin: 5 }])}
      // >
      //   <View style={StyleSheet.flatten([Styles.iconContainer])}>
      //     <Icon raised name={"circle"} color={"grey"} size={7} />
      //   </View>
      //   <View
      //     style={{
      //       width: 0,
      //       flexGrow: 1,
      //       flex: 1,
      //     }}
      //   >
      //     <Text>{item}</Text>
      //   </View>
      // </View>
      <View key={index} style={Styles.descriptionItem}>
        <View style={Styles.iconStyle}>
          <Icon name="check" size={10} />
        </View>
        <Text style={{...Styles.descriptionText, ...configureLineHeight("14")}}>{item}</Text>
      </View>
    ));
    return this._renderDropdownCommon(
      lang.policyCoverage(),
      policyCoverageItems,
      "policyCoverage"
    );
  };

  render() {
    return (
      <View style={Styles.containerStyle}>
        {this._renderPolicyCoverage()}
        {this._renderMain()}
        {this._renderMenus()}
        {this._renderInvestment()}
      </View>
    );
  }
}

const getCoverageFromMeta = (state, key) => {
  const currentSelectedPolicy = pathOr(
    {},
    ["myPolicy", "currentSelectedPolicy"],
    state
  );
  const productMeta = pathOr(
    {},
    ["productRuntime", "metadata", "productMeta"],
    state
  );
  if (!currentSelectedPolicy || !productMeta) {
    return;
  }
  const allPCOs = reduce(
    (prev, curr) => concat(prev, curr.productComponentOptions || []),
    [],
    currentSelectedPolicy.productOptions
  );
  const productCodeToCoverageDesc = {};
  allPCOs.forEach(pco => {
    const pcoProductCode = pathOr("", ["component", "code"], pco);
    const componentMeta = find(
      product => toUpper(product.code) === toUpper(pcoProductCode),
      productMeta.products || []
    );
    if (componentMeta) {
      const element = find(
        ele => ele.key === key,
        componentMeta.elements || []
      );
      if (element) {
        return (productCodeToCoverageDesc[pcoProductCode] = element.label);
      }
    }
  });
  return productCodeToCoverageDesc;
};

const getPolicyCoverageFromMeta = state => {
  const currentSelectedPolicy = pathOr(
    {},
    ["myPolicy", "currentSelectedPolicy"],
    state
  );
  const productMeta = pathOr(
    {},
    ["productRuntime", "metadata", "productMeta"],
    state
  );
  if (!currentSelectedPolicy || !productMeta) {
    return;
  } else {
    let planName = currentSelectedPolicy.productOptions && currentSelectedPolicy.productOptions.length > 0 
        &&  currentSelectedPolicy.productOptions[0].options && currentSelectedPolicy.productOptions[0].options.planName;
    let productCode = currentSelectedPolicy.product && currentSelectedPolicy.product.code;
    const metaData =
      productMeta.products &&
      productMeta.products.find(meta => meta.code == productCode);
    let coverageKey = planName && `MY_POLICY_${planName.toUpperCase()}_COVERAGE_DESC`;
    let metaCoverageElement =
      metaData &&
      metaData.elements &&
      metaData.elements.find(item => item.key == coverageKey);
    return metaCoverageElement;
  }
};

MyPolicyDetailBenefit.propTypes = {
  policyData: PropTypes.object.isRequired,
  loadMyPolicyRider: PropTypes.func,
  loadMyPolicyInvestment: PropTypes.func,
  simCountry: PropTypes.string,
  myPolicyFunds: PropTypes.object,
  productCodeToCoverageDesc: PropTypes.object,
  productCodeToCoverageName: PropTypes.object,
  dateFormat: PropTypes.string,
  riderDataWithRiderFlag: PropTypes.bool,
  moneyFormat: PropTypes.string,
  policyCoverageData: PropTypes.object,
};

const mapStateToProps = state => ({
  myPolicyFunds: pathOr(
    {},
    ["myPolicyFunds"],
    state.myPolicy.currentSelectedPolicy
  ),
  simCountry: pathOr("", ["auth", "countryInfo", "simCountry"], state),
  productCodeToCoverageDesc: getCoverageFromMeta(
    state,
    "PRODUCT_DETAILS_PAGE_BENEFITDESC_LABEL"
  ),
  productCodeToCoverageName: getCoverageFromMeta(
    state,
    "PRODUCT_DETAILS_PAGE_BENEFITNAME_LABEL"
  ),
  dateFormat: path(["meta", "countryCommonMeta", "dateFormat"], state),
  riderDataWithRiderFlag: pathOr(
    true,
    ["meta", "countryCommonMeta", "riderDataWithRiderFlag"],
    state
  ),
  moneyFormat: path(["meta", "countryCommonMeta", "moneyFormat"], state),
  policyCoverageData: getPolicyCoverageFromMeta(state),
});

const mapDispatchToProps = {
  loadMyPolicyRider: payload => ({
    context: MY_POLICY_RIDER_SCREEN,
    type: LOAD_MY_POLICY_RIDER,
    payload,
  }),
  loadMyPolicyInvestment: payload => ({
    context: MY_POLICY_INVESTMENT_SCREEN,
    type: LOAD_MY_POLICY_INVESTMENT,
    payload,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPolicyDetailBenefit);

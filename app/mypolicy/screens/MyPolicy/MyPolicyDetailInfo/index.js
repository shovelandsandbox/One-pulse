import React, { PureComponent } from "react";
import { View, FlatList, Text } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import Default from "../../../configs/default";
import {
  CoreConfig,
  CoreActionTypes,
  CoreUtils,
} from "@pru-rt-internal/pulse-common";
import Styles from "./style";
import lang from "../lang";
import { ImageBase64 } from "../../../components/derivatives/Image";
import {
  convertToCapitalCase,
  formatDate,
  checkForZeroPremiumAsFreeAndPolicyActive,
  metaFinder,
} from "../../../utils";

import { formatCurrency, formatName } from "../../../../utils";
import myPolicyScreens from "../../../configs/screenNames";
import { myPolicyActions } from "../../../configs/myPolicyActions";
import {
  Accordion,
  LifeAssuredRow as LifeAssuredRowCard,
  RowMenu as RowMenuCard,
  SimpleDataRow as SimpleDataRowCard,
  SimpleListRow as SimpleListRowCard,
} from "../../../components/cards";

import {
  Padder as PadderContainer,
  SimpleList as SimpleListContainer,
} from "../../../components/containers";
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";
import GrantConfirmationModal from "../../../modals/GrantConfirmation";
import RevokeConfirmationModal from "../../../modals/RevokeConfirmation";
import RevokeSuccessModal from "../../../modals/RevokeSuccess";
import {
  path,
  pathOr,
  filter,
  sortBy,
  toLower,
  prop,
  concat,
  isEmpty,
  isNil,
  find,
  descend,
  findLastIndex,
} from "ramda";
import { compose } from "redux";
import TransactionMeta from "../UserTransactionLinks/meta";
import { UserTransactionLinks } from "../UserTransactionLinks";

const {
  ACCESS_CONTROL_LIST_SCREEN,
  ACCESS_CONTROL_REGISTER_SCREEN,
  MY_POLICY_DETAIL_SCREEN,
} = CoreConfig.pageKeys;

const {
  ACCESS_CONTROL_REGISTER_LOAD,
  REVOKE_ACCESS_FETCH,
  REVOKE_ACCESS_SUCCESS,
} = CoreActionTypes;

const { isNilOrEmpty } = CoreUtils;

class MyPolicyDetailInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeDropdownIndex: -1,

      isGrantConfirmationModalVisible: false,
      isRevokeConfirmationModalVisible: false,
      isRevokeSuccessModalVisible: false,

      revokeVictim: {},
      grantLifeAssured: {},
    };
    this.policyDetailAccordion = React.createRef();
    this.policyInfoAccordion = React.createRef();
    this.contactDetailsAccordion = React.createRef();
    this.lifeAssured = React.createRef();
    this.handleRevoke = this.handleRevoke.bind(this);
    this.revokeDone = this.revokeDone.bind(this);
    this.TransactionMeta = {
      ...TransactionMeta.initializeScreenMeta(),
      ...TransactionMeta.getElementsForTransaction(),
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.action !== prevProps.action) {
      this.handleReduxActions(this.props.action);
    }
  }

  handleReduxActions = action => {
    const actions = {
      [REVOKE_ACCESS_SUCCESS]: () => {
        this.setState({
          isRevokeConfirmationModalVisible: false,
          isRevokeSuccessModalVisible: true,
        });
      },
      DEFAULT: () => { },
    };

    return (actions[action] || actions.DEFAULT)();
  };

  toggleDropdown(index) {
    if (this.state.activeDropdownIndex === index) {
      this.setState({ activeDropdownIndex: -1 });
      return false;
    }
    this.setState({ activeDropdownIndex: index });
  }

  showGrantConfirmation(lifeAssured) {
    this.setState({
      isGrantConfirmationModalVisible: true,
      grantLifeAssured: lifeAssured,
    });
  }

  grant() {
    this.props.loadRegisterGrantScreen({
      lifeAssuredData: this.state.grantLifeAssured,
      context: MY_POLICY_DETAIL_SCREEN,
    });

    if (this.state.isGrantConfirmationModalVisible) {
      const _this = this;

      setTimeout(function () {
        _this.setState({
          isGrantConfirmationModalVisible: false,
        });
      }, 100);
    }
  }

  handleRevoke() {
    this.props.onRequestRevokeAccess({
      ...this.state.revokeVictim,
      phone: this.state.revokeVictim.phone || lang.getNA(),
    });
  }

  onRevokePress(lifeAssured) {
    this.setState({
      revokeVictim: lifeAssured,
      isRevokeConfirmationModalVisible: true,
    });
  }

  revokeDone() {
    this.setState({ isRevokeSuccessModalVisible: false });
  }

  // renderDoubleRow = ({
  //   firstLabel,
  //   firstValue,
  //   firstNote = null,
  //   secondLabel,
  //   secondValue,
  //   secondNote = null,
  // }) => {
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

  //       <View style={Styles.doubleRow.container}>
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

  // renderDropdownItem(icon, label, index, rowBtnClicked) {
  //   const { updateBeneficiaryRequired, enableUpdatePolicySection } = this.props;
  //   return (
  //     <View style={Styles.rowContainer}>
  //       <RowMenuCard
  //         label={label}
  //         onPress={() => this.toggleDropdown(index)}
  //         policyData={this.props.policyData}
  //         icon={icon}
  //         rowBtnClicked={rowBtnClicked}
  //         updateBeneficiaryRequired={
  //           enableUpdatePolicySection
  //             ? updateBeneficiaryRequired && this.isBeneficiaryLinkEnabled()
  //             : updateBeneficiaryRequired
  //         }
  //         actionIcon={this.state.activeDropdownIndex === index ? "up" : "down"}
  //       />
  //     </View>
  //   );
  // }

  renderPolicyInfo = title => (
    <Accordion
      ref={this.policyInfoAccordion}
      title={title}
      hideAccordian={this.hideAccordian}
    >
      {this.renderPolisDetails()}
    </Accordion>
  );

  renderContactDetails = title => (
    <Accordion
      ref={this.contactDetailsAccordion}
      title={title}
      hideAccordian={this.hideAccordian}
    >
      <View style={Styles.contactDetailsContainer}>
        {this.renderCustomerContactDetails()}
      </View>
    </Accordion>
  )

  isBeneficiaryLinkEnabled = () => {
    const { enableUpdatePolicySection, transactionLink } = this.props;
    let showBeneficiaryLink = false;
    if (!isNilOrEmpty(transactionLink)) {
      const validLinks = pathOr([], ["products"], transactionLink);
      if (
        enableUpdatePolicySection &&
        !isNilOrEmpty(validLinks) &&
        !isNilOrEmpty(validLinks[0].tables)
      ) {
        const tranLinks = validLinks[0].tables.find(d => d["transactions"]);
        showBeneficiaryLink =
          !isNilOrEmpty(tranLinks) &&
          tranLinks.transactions.find(
            e => e.transaction == "CHANGEBENEFICIARY"
          );
      }
    }
    return !!showBeneficiaryLink;
  };

  // eslint-disable-next-line complexity
  renderMain = policyData => {
    const {
      showZeroPremiumAsFree,
      simCountry,
      moneyFormat,
      nameFormat,
      policyData: data,
      dateFormat
    } = this.props;
    if (!policyData) {
      return null;
    }

    const la = find(cr => cr.role === "LIFEASSURED", policyData.customerRoles);
    const { firstName, surName } = path(["customer"], la);
    const laName = formatName({ firstName, surName }, nameFormat, true);

    const policyStatus =
      policyData.status && policyData.status.toLowerCase() === "inforce"
        ? lang.active()
        : lang.inactive();
    const premiums = policyData.premiums;
    const totalPremium = pathOr(0, ["totalPremium"], premiums);
    const firstRowData = {
      firstLabel: lang.policyHolder(),
      firstValue: laName ? convertToCapitalCase(laName, false) : lang.getNA(),
      secondLabel: lang.myPremium(),
      secondValue:
        checkForZeroPremiumAsFreeAndPolicyActive(
          showZeroPremiumAsFree,
          policyStatus
        ) && totalPremium === 0
          ? lang.free()
          : `${formatCurrency(totalPremium, simCountry, moneyFormat)}`,
    };

    const firstValue = path(["paymentOption", "frequency"], policyData);
    const secondValue = path(["paymentOption", "mode"], policyData);
    const secondRowData = {
      firstLabel: lang.frequency(),
      firstValue: firstValue
        ? convertToCapitalCase(firstValue, false)
        : lang.getNA(),
      secondLabel: lang.paymentMethod(),
      secondValue: secondValue
        ? convertToCapitalCase(secondValue, false)
        : lang.getNA(),
    };

    const nextPremiumDue = pathOr(lang.getNA(), ["nextPremiumDue"], policyData);
    const nextPremiumDueDate =
      nextPremiumDue != lang.getNA()
        ? formatDate(nextPremiumDue)
        : lang.getNA();

    return (
      // <View>
      //   {this.renderDoubleRow(firstRowData)}
      //   {this.renderDoubleRow(secondRowData)}
      // </View>

      // <View style={{backgroundColor: "white", elevation: 2, marginVertical: 15}}>
      <>
        <View style={Styles.containerMainStyle}>
          <Text style={{...Styles.mainLabel, ...configureLineHeight("18")}}>{firstRowData.firstLabel}</Text>
          <Text style={{...Styles.mainValue, ...configureLineHeight("18")}}>{firstRowData.firstValue}</Text>
        </View>
        <View style={[Styles.containerMainStyle, Styles.premiumContainer]}>
          <View>
            <Text style={{...Styles.mainLabel, ...configureLineHeight("18")}}>{firstRowData.secondLabel}</Text>
            <Text style={{...Styles.mainValue, ...configureLineHeight("18")}}>{firstRowData.secondValue}</Text>
          </View>
          <Icon raised name="usd" color={"rgba(0,94,129, 0.2)"} size={50} />
        </View>
        <View style={Styles.containerMainStyle}>
          <Text style={Styles.mainLabelBold}>{lang.payment()}</Text>
          <View style={Styles.innerMainContainer}>
            <View>
              <Text style={{...Styles.mainLabel, ...configureLineHeight("18")}}>{secondRowData.firstLabel}</Text>
              <Text style={{...Styles.mainValue, ...configureLineHeight("18")}}>{secondRowData.firstValue}</Text>
            </View>
            <View style={Styles.verticalDivider} />
            <View>
              <Text style={{...Styles.mainLabel, ...configureLineHeight("18")}}>{secondRowData.secondLabel}</Text>
              <Text style={{...Styles.mainValue, ...configureLineHeight("18")}}>{secondRowData.secondValue}</Text>
            </View>
          </View>
        </View>
        <View style={Styles.containerMainStyle}>
          <Text style={{...Styles.mainLabel, ...configureLineHeight("18")}}>{lang.issuedDate()}</Text>
          <Text style={{...Styles.mainValue, ...configureLineHeight("18")}}>{formatDate(data.inceptionDate, dateFormat)}</Text>
        </View>
        <View style={Styles.containerMainStyle}>
          <Text style={{...Styles.mainLabel, ...configureLineHeight("18")}}>{lang.nextPremiumDue()}</Text>
          <Text style={{...Styles.mainValue, ...configureLineHeight("18")}}>{nextPremiumDueDate}</Text>
        </View>
      </>
      // </View>
    );
  };

  renderSimpleRowData = (label, value) => {
    if (label === null && value === null) {
      return null;
    }
    return <SimpleListRowCard label={label} value={value} />;
  };

  metaFinders = key => metaFinder("myPolicy", key, "label").label;

  getRequiredAddress = (addressType,policyOwner)=>{
    let requiredAddress = {};
    let addressObject =Object.assign({},pathOr({},["addressDetails", addressType],policyOwner));
    addressObject.country = undefined;
    addressObject.countryCode = undefined; 
    addressObject.addressType = undefined;
    if(addressObject && addressObject.zip){
      requiredAddress.line1 = addressObject.line1;
      requiredAddress.city = addressObject.city;
      requiredAddress.zip = addressObject.zip;
      return requiredAddress;
    }
    addressObject.zip = addressObject.zip || addressObject.zipcode;
    addressObject.zipcode = undefined;
    return addressObject;
  }

  renderCustomerContactDetails = () => {
    const {
      policyData,
      isdCode
    } = this.props;

    console.log("policyData....", policyData);

    const policyOwner = pathOr(
      {},
      ["roleToCustomers", "OWNER", "0", "customer"],
      policyData
    );

    let phone = pathOr("", ["contactDetails", "phone", "value"], policyOwner);
    if (!phone) {
      phone = pathOr("", ["contactDetails", "PHONE", "value"], policyOwner);
    }

    if (phone && isdCode && phone.indexOf(isdCode) === 0) {
      phone = isdCode + " " + phone.slice(isdCode.length);
    }

    let email = pathOr("", ["contactDetails", "email", "value"], policyOwner);
    if (!email) {
      email = pathOr("", ["contactDetails", "EMAIL", "value"], policyOwner);
    }

    const addressType = policyOwner && policyOwner.addressDetails &&
      (((policyOwner.addressDetails.hasOwnProperty('HOME') && "HOME") || (policyOwner.addressDetails.hasOwnProperty('Current') && "Current"))) || ""
    const addressObject = this.getRequiredAddress(addressType,policyOwner);
    const address = Object.values(addressObject).filter(it => it != undefined).join(", ");

    const detailData = [
      {
        title: lang.email(),
        data: email,
      },
      {
        title: lang.phone(),
        data: phone,
      },
      {
        title: lang.address(),
        data: address,
      },
    ];

    const fixedRenderData = filter(obj => obj.data, detailData);

    return fixedRenderData.map(
      (item, idx) => {
        return (
          <View style={Styles.containerMainStyle} key={idx}>
            <Text style={{...Styles.mainLabel, ...configureLineHeight("18")}}>{item.title}</Text>
            <Text style={{...Styles.mainValue, ...configureLineHeight("18")}}>{item.data}</Text>
          </View>
        );
      }
    );
  };

  renderPolisDetails = () => {
    // debugger;
    const {
      policyData: data,
      simCountry,
      dateFormat,
      moneyFormat,
    } = this.props;
    // if (this.state.activeDropdownIndex !== 0) {
    //   return null;
    // }
    const premiums = data.premiums;
    const detailData = [
      {
        title: lang.policyStatus(),
        data: this.metaFinders(data.status),
      },
      {
        title: lang.totalPremium(),
        data: formatCurrency(
          pathOr(0, ["totalPremium"], premiums),
          simCountry,
          moneyFormat
        ),
      },
      {
        title: lang.policyStartingDate(),
        data: formatDate(data.inceptionDate, dateFormat),
      },
      {
        title: lang.topUp(),
        data: data.topUpAmount,
      },
      {
        title: lang.totalPremiumDeposit(),
        data: data.totalTitipanPremi,
      },
      {
        title: lang.firstPremiumPayment(),
        data: data.pembayaranPremiPertama,
      },
    ];

    const fixedRenderData = filter(obj => obj.data, detailData);

    return fixedRenderData.map(
      (item, idx) => {
        return (
          <View style={Styles.containerMainStyle} key={idx}>
            <Text style={{...Styles.mainLabel, ...configureLineHeight("18")}}>{item.title}</Text>
            <Text style={{...Styles.mainValue, ...configureLineHeight("18")}}>{item.data}</Text>
          </View>
        );
      }
      // this.renderSimpleRowData(item.title, item.data)
    );
  };

  // ----------------------------------------

  renderLARowData = (lifeAssured, index, nameFormat) => {
    if (!lifeAssured || isEmpty(lifeAssured)) {
      return null;
    }
    //#region Life Assured Data
    //Third param true for formatName since it is being called from myPolicy
    const { firstName, surName } = path(["customer"], lifeAssured);
    const name =
      convertToCapitalCase(
        formatName({ firstName, surName }, nameFormat, true),
        false
      ) || lang.getNA();
    // const phoneNumber = lifeAssured.phone || "";
    // const hasPaid = lifeAssured.hasPaid || true;
    // const isUnderAge = lifeAssured.age ? lifeAssured.age < 18 : false;
    // const hasAccess = lifeAssured.granted || false;
    // const isHolder = lifeAssured.granted == null;
    //#endregion

    // Disabled Grant/Revoke
    // return (
    //   <LifeAssuredAccessRowCard
    //     key={name}
    //     name={convertToCapitalCase(name, false)}
    //     phoneNumber={phoneNumber}
    //     hasPaid={hasPaid}
    //     isUnderAge={isUnderAge}
    //     hasAccess={hasAccess}
    //     // TODO: Add navigation to grant access screen
    //     // onPress={() => Actions.AccessControlDetail()}
    //     onGrantPress={() => this.showGrantConfirmation(lifeAssured)}
    //     onRevokePress={() => this.onRevokePress(lifeAssured)}
    //     isHolder={isHolder}
    //   />
    // );

    // TODO: Add this to below component when we add Grant / Revoke. - Baqir
    // phoneNumber={ phoneNumber }
    // hasPaid={ hasPaid }
    // isUnderAge={ isUnderAge }
    // hasAccess={ hasAccess }
    // TODO: Add navigation to LA Detail screen.
    // onPress={ () => Actions.AccessControlDetail() }
    // onGrantPress={ () => this.setState({isGrantConfirmationModalVisible: true,}) }
    // onRevokePress={ () => this.setState({isRevokeConfirmationModalVisible: true,}) }
    // label={isHolder ? "Tertanggung Utama" : null}
    // isHolder={ isHolder }
    // TODO: Update to add imnage.
    // image={ image }
    return (
      <LifeAssuredRowCard
        key={index}
        name={name}
        label={lifeAssured.role === "LIFEASSURED" ? lang.policyHolder() : null}
      />
    );
  };

  // ----------------------------------------

  renderLifeAssureds = () => {
    const { policyData, nameFormat } = this.props;

    if (!policyData || isEmpty(policyData)) {
      return null;
    }

    const las = pathOr([], ["roleToCustomers", "LIFEASSURED"], policyData);

    const jlas = pathOr(
      [],
      ["roleToCustomers", "JOINTLIFEASSURED"],
      policyData
    );
    var lifeAssured = sortBy(
      descend(compose(toLower, prop("role"))),
      concat(las, jlas)
    );

    var laToBeShown = lifeAssured.map((la, index) => {
      const { firstName, surName, nameFormat } = path(["customer"], la);
      const name =
        convertToCapitalCase(
          formatName({ firstName, surName }, nameFormat, true),
          false
        ) || lang.getNA();
      const title = la.role === "LIFEASSURED" ? lang.policyHolder() : null;
      return {
        title: title,
        data: name
      }
    });

    const fixedRenderData = filter(obj => obj.data, laToBeShown);

    return fixedRenderData.map(
      (item, idx) => {
        return (
          <View style={Styles.lifeAssuredContainerMainStyle} key={idx}>
            {item.title ? <Text style={{...Styles.lifeAssuredMainLabel, ...configureLineHeight("18")}}>{item.title}</Text> : null}
            <Text style={{...Styles.lifeAssuredMainValue, ...configureLineHeight("18")}}>{item.data}</Text>
          </View>
        );
      }
    );
  };

  renderBenefitRowData = (item, index, nameFormat) => {
    const { customer = {}, percentage = 0 } = item;
    const { firstName, surName } = customer;
    const name = customer
      ? convertToCapitalCase(
        formatName({ firstName, surName }, nameFormat, true),
        false
      )
      : lang.getNA();
    return (
      <View>
        <SimpleListRowCard label={this.metaFinders("name")} value={name} />
        <SimpleListRowCard
          label={this.metaFinders("benefitPercentage")}
          value={`${percentage}%`}
        />
        {this.renderDetail(item)}
      </View>
    );
  };

  metaFinders = key => metaFinder("myPolicy", key, "label").label;

  renderDetail = data => {
    if (!data) {
      return null;
    }
    const NA = this.metaFinders("NA");
    const { customer, relationshipType = NA } = data;
    if (!customer) {
      return null;
    }
    const { dateFormat } = this.props;
    const { dob, contactDetails } = customer;
    const email = pathOr(NA, ["EMAIL", "value"], contactDetails);
    // const age = dob ? dateDiff(moment().format("DD/MM/YYYY"), dob).years() : NA;
    const dobStr = dob ? formatDate(dob, dateFormat) : NA;

    return (
      <View>
        <SimpleListRowCard label={this.metaFinders("dob")} value={dobStr} />
        <SimpleListRowCard
          label={this.metaFinders("relationship")}
          value={relationshipType}
        />
        <SimpleListRowCard
          label={this.metaFinders("emailAddress")}
          value={email}
        />
      </View>
    );
  };

  renderBenefitReceivers() {
    if (this.state.activeDropdownIndex !== this.getBeneficiaryDropDownIndex()) {
      return null;
    }
    const { beneficiaries } = this.props.policyData;
    const benefTrim = filter(
      b => isEmpty(b.endDate) || isNil(b.endDate) || b.endDate == "9999-12-31",
      beneficiaries
    );
    return (
      <FlatList
        scrollEnabled={false}
        data={benefTrim}
        renderItem={({ item }, index) =>
          this.renderBenefitRowData(item, index, this.props.nameFormat)
        }
      />
    );
  }

  isBeneficiaryPresentInPolicy = () => {
    const { beneficiaries } = this.props.policyData;
    const noOfBeneficiaries = path(
      ["productOptions", "0", "options", "noOfBeneficiaries"],
      this.props.policyData
    );
    const showBeneficiary = noOfBeneficiaries
      ? parseInt(noOfBeneficiaries) > 0
      : true;
    console.log(":::beneficiaries", typeof beneficiaries !== "undefined", beneficiaries)
    return typeof beneficiaries !== "undefined" && beneficiaries.length > 0 && showBeneficiary;
  };

  numLAs = () => {
    const { policyData } = this.props;
    if (!policyData || isEmpty(policyData)) {
      return null;
    }
    const { customerRoles = [] } = policyData;
    const allLifeAssured = customerRoles.filter(
      customer =>
        customer.role === "LIFEASSURED" || customer.role === "JOINTLIFEASSURED"
    );
    return allLifeAssured.length;
  };

  getBeneficiaryDropDownIndex = () => {
    return this.numLAs() > 1 ? 2 : 1;
  };

  renderLifeAssuredDetails = () => {
    if (this.numLAs() < 2) {
      return <View></View>;
    }
    return (
      <View>
        {this.renderDropdownItem("assured", lang.assured(), 1)}
        {this.renderLifeAssureds()}
      </View>
    );
  };

  renderBeneficiariesDetails = () => {
    const { beneficiaries } = this.props.policyData;
    const benefTrim = filter(
      b => isEmpty(b.endDate) || isNil(b.endDate) || b.endDate == "9999-12-31",
      beneficiaries
    );
    const NA = this.metaFinders("NA");
    let beneficiariesDetailsToBeShown = [];
    const beneficiariesDetails = benefTrim.map((bene, index) => {
      this[`BENFICIARY_REF_${index}`] = React.createRef([]);
      const { customer = {}, percentage = 0, relationshipType = NA } = bene;
      const { firstName, surName } = customer;
      const { dob, contactDetails } = customer;
      const email = pathOr(pathOr(NA, ["email", "value"], contactDetails), ["EMAIL", "value"], contactDetails);
      const name = customer
        ? convertToCapitalCase(
          formatName({ firstName, surName }, this.props.nameFormat, true),
          false
        )
        : lang.getNA();
      const { dateFormat } = this.props;
      const detailData = [
        {
          title: this.metaFinders("name"),
          data: name,
        },
        {
          title: this.metaFinders("benefitPercentage"),
          data: `${percentage}%`
        },
        {
          title: this.metaFinders("dob"),
          data: dob ? formatDate(dob, dateFormat) : NA,
        },
        {
          title: this.metaFinders("relationship"),
          data: relationshipType,
        },
        {
          title: this.metaFinders("emailAddress"),
          data: email,
        }
      ];
      return (
        <Accordion ref={this[`BENFICIARY_REF_${index}`]} title={lang.beneficiary()} showAllContent={false} hideAccordian={this.hideAccordian}>
          {
            detailData.map(
              (item, idx) => {
                return (
                  <View style={Styles.containerMainStyle} key={idx}>
                    <Text style={{...Styles.mainLabel, ...configureLineHeight("18")}}>{item.title}</Text>
                    <Text style={{...Styles.mainValue, ...configureLineHeight("18")}}>{item.data}</Text>
                  </View>
                );
              }
            )
          }
        </Accordion>



      )

    });
    return beneficiariesDetails;
  };


  renderUserTransactionLinks = () => {
    const {
      policyData,
      profile,
      requiredLinksMeta,
      transactionLink,
    } = this.props;
    // if (this.state.activeDropdownIndex !== 2) {
    //   return null;
    // }
    return (
      <UserTransactionLinks
        policyData={policyData}
        profile={profile}
        requiredLinksMeta={requiredLinksMeta}
        transactionLink={transactionLink}
        dispatchTransaction={this.props.dispatchTransaction}
      />
    );
  };

  // eslint-disable-next-line complexity
  renderDropdownItems() {
    const { beneficiaries } = this.props.policyData;
    const {
      linkToBeneficiary,
      policyData,
      endorsementRequired,
      loadMyPolicyDetailForEndorsements,
      enableUpdatePolicySection,
    } = this.props;
    const noOfBeneficiaries = path(
      ["productOptions", "0", "options", "noOfBeneficiaries"],
      policyData
    );
    const showBeneficiary = noOfBeneficiaries
      ? parseInt(noOfBeneficiaries) > 0
      : true;
    return (
      // <SimpleListContainer>
      <>
        {this.renderContactDetails(lang.contactDetails())}
        {/* {this.renderPolicyInfo(lang.policyData())} */}
        {/* {this.renderDropdownItem("info-policy", lang.policyData(), 0)} */}
        {/* {this.renderPolisDetails()} */}
        {/* {this.renderLifeAssuredDetails()} */}
        {/* {endorsementRequired &&
          !enableUpdatePolicySection &&
          this.renderLink("info-policy", lang.updateContactInfo(), () =>
            loadMyPolicyDetailForEndorsements({ policyData })
          )} */}
        {/* {typeof beneficiaries !== "undefined" && showBeneficiary
          ? this.renderDropdownItem(
              "benefit",
              lang.benefitReceiver(),
              this.getBeneficiaryDropDownIndex(),
              linkToBeneficiary
            )
          : null} */}
        {typeof beneficiaries !== "undefined" && showBeneficiary
          ? this.renderBenefitReceivers()
          : null}
        {this.renderTransaction()}
      </>
    );
  }

  isUserLifeAssured = () => {
    const { policyData, profile } = this.props;
    const lifeAssured = pathOr([], ["lifeAssured"], policyData);
    let userRole = lifeAssured.find(
      item =>
        pathOr("", ["contactDetails", "EMAIL", "value"], item).toLowerCase() ==
        pathOr(" ", ["email"], profile).toLowerCase()
    );
    userRole = userRole ? "LifeAssured" : "Beneficiary";
    return userRole;
  };

  // eslint-disable-next-line complexity
  renderTransaction = () => {
    const {
      enableClaimsJourney,
      enableUpdatePolicySection,
      linkToClaim,
      policyData,
    } = this.props;
    const { status, productOptions = [] } = policyData;
    const productOptionArr = productOptions.map(
      item => item.productComponentOptions
    );
    const claimantRole = isNilOrEmpty(productOptionArr)
      ? {}
      : productOptionArr[0].find(
        obj =>
          pathOr("", ["options", "claimantRole"], obj) ==
          this.isUserLifeAssured()
      );

    if (status != "INFORCE") {
      return null;
    }

    return null;
    // return (
    //   <React.Fragment>
    //     {enableClaimsJourney &&
    //     !enableUpdatePolicySection &&
    //     !isNilOrEmpty(claimantRole)
    //       ? this.renderLink("info-policy", lang.claimPolicy(), () =>
    //           linkToClaim()
    //         )
    //       : null}
    //     {/* {enableUpdatePolicySection
    //       ? this.renderDropdownItem(
    //           "info-policy",
    //           this.TransactionMeta.updatePolicy,
    //           2
    //         )
    //       : null} */}
    //     {enableUpdatePolicySection ? this.renderUserTransactionLinks() : null}
    //   </React.Fragment>
    // );
  };

  renderLink = (icon, label, onPressLink) => {
    return (
      <View style={Styles.rowContainer}>
        <RowMenuCard
          label={label}
          onPress={onPressLink}
          policyData={this.props.policyData}
          icon={icon}
        />
      </View>
    );
  };

  hideAccordian = () => {
    const { beneficiaries } = this.props.policyData;
    const benefTrim = filter(
      b => isEmpty(b.endDate) || isNil(b.endDate) || b.endDate == "9999-12-31",
      beneficiaries
    );
    benefTrim.map((ben, index) => {
      this[`BENFICIARY_REF_${index}`].current && this[`BENFICIARY_REF_${index}`].current.close();
    })
    this.policyDetailAccordion.current &&
      this.policyDetailAccordion.current.close();
    // this.policyInfoAccordion.current &&
    //   this.policyInfoAccordion.current.close();
    this.contactDetailsAccordion.current &&
      this.contactDetailsAccordion.current.close();
    this.lifeAssured.current && this.lifeAssured.current.close();


  };

  render() {
    const { policyData } = this.props;

    if (!policyData || isEmpty(policyData)) {
      return null;
    }

    const revokeName = path(["revokeVictim", "name"], this.state)
      ? convertToCapitalCase(this.state.revokeVictim.name, false)
      : lang.getNA();

    const grantName = path(["grantLifeAssured", "name"], this.state)
      ? convertToCapitalCase(this.state.grantLifeAssured.name, false)
      : lang.getNA();

    return (
      <View style={Styles.containerStyle}>
        {policyData && (
          <Accordion ref={this.policyDetailAccordion} title={lang.policyDetail()} showAllContent={true} hideAccordian={this.hideAccordian}>
            {this.renderMain(policyData)}
          </Accordion>
        )}
        {policyData && this.renderDropdownItems(policyData)}
        {policyData && this.numLAs() > 1 && (
          <Accordion ref={this.lifeAssured} title={lang.assured()} showAllContent={false} hideAccordian={this.hideAccordian}>
            {this.renderLifeAssureds()}
          </Accordion>
        )}
        {policyData && this.isBeneficiaryPresentInPolicy() && (
          <View>
            {this.renderBeneficiariesDetails(policyData)}
          </View>
        )}
        <GrantConfirmationModal
          isActive={this.state.isGrantConfirmationModalVisible}
          onConfirm={() => this.grant()}
          onCancel={() =>
            this.setState({
              isGrantConfirmationModalVisible: false,
            })
          }
          name={grantName}
        />

        <RevokeConfirmationModal
          isActive={this.state.isRevokeConfirmationModalVisible}
          onConfirm={this.handleRevoke}
          onCancel={() =>
            this.setState({
              isRevokeConfirmationModalVisible: false,
            })
          }
          name={revokeName}
        />

        <RevokeSuccessModal
          isActive={this.state.isRevokeSuccessModalVisible}
          onConfirm={this.revokeDone}
          name={revokeName}
        />
      </View>
    );
  }
}

MyPolicyDetailInfo.propTypes = {
  policyData: PropTypes.object.isRequired,
  loadRegisterGrantScreen: PropTypes.func,
  onRequestRevokeAccess: PropTypes.func,
  action: PropTypes.string,
  simCountry: PropTypes.string,
  linkToBeneficiary: PropTypes.func,
  dateFormat: PropTypes.string,
  showZeroPremiumAsFree: PropTypes.bool,
  moneyFormat: PropTypes.string,
  nameFormat: PropTypes.string,
  updateBeneficiaryRequired: PropTypes.bool,
  profile: PropTypes.object,
  requiredLinksMeta: PropTypes.object,
  transactionLink: PropTypes.object,
  dispatchTransaction: PropTypes.func,
  enableUpdatePolicySection: PropTypes.bool,
  enableClaimsJourney: PropTypes.bool,
  linkToClaim: PropTypes.func,
  loadMyPolicyDetailForEndorsements: PropTypes.func,
  endorsementRequired: PropTypes.bool,
  isdCode: PropTypes.string,
};

const mapStateToProps = state => ({
  isdCode: "+" + path(["meta", "countryCommonMeta", "isdCode"], state),
  action: pathOr("", ["mpolicyGrantRevoke", "action"], state),
  simCountry: pathOr("", ["auth", "countryInfo", "simCountry"], state),
  dateFormat: path(["meta", "countryCommonMeta", "dateFormat"], state),
  showZeroPremiumAsFree: path(
    ["meta", "countryCommonMeta", "showZeroPremiumAsFree"],
    state
  ),
  moneyFormat: path(["meta", "countryCommonMeta", "moneyFormat"], state),
  nameFormat: path(["meta", "countryCommonMeta", "nameFormat"], state),
  updateBeneficiaryRequired: path(
    ["meta", "countryCommonMeta", "updateBeneficiaryRequired"],
    state
  ),
  profile: state.profile,
  requiredLinksMeta: path(["meta", "countryCommonMeta"], state),
  transactionLink: path(["myPolicy", "transactionLink"], state),
  enableUpdatePolicySection: path(
    ["meta", "countryCommonMeta", "enableUpdatePolicySection"],
    state
  ),
  enableClaimsJourney: path(
    ["meta", "countryCommonMeta", "enableClaimsJourney"],
    state
  ),
  endorsementRequired: path(
    ["meta", "countryCommonMeta", "endorsementRequired"],
    state
  ),
});

const mapDispatchToProps = {
  loadRegisterGrantScreen: payload => ({
    context: ACCESS_CONTROL_REGISTER_SCREEN,
    type: ACCESS_CONTROL_REGISTER_LOAD,
    payload,
  }),
  onRequestRevokeAccess: payload => ({
    context: ACCESS_CONTROL_LIST_SCREEN,
    type: REVOKE_ACCESS_FETCH,
    payload,
  }),
  linkToBeneficiary: () => ({
    context: "PRODUCT_JOURNEYS",
    type: "product-journeys/add-beneficiary-for-existing-policy",
  }),
  linkToClaim: () => ({
    context: "myClaims",
    type: "registerClaimfsm",
  }),
  loadMyPolicyDetailForEndorsements: payload => ({
    context: myPolicyScreens.UPDATE_INFO_SCREEN,
    type: myPolicyActions.getPolicyDetails,
    payload,
  }),
  dispatchTransaction: action => action,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPolicyDetailInfo);

import React, { PureComponent } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CoreServices } from "@pru-rt-internal/pulse-common";
const { NavigationService } = CoreServices;
import { Colors } from "../../../configs";
import { HeaderBackButton } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import {
  LEFT_ARROW
} from "../../../../config/images";
import POLICY_ICONS from "../../../configs/Images"
import Styles from "./style";
import lang from "../lang";
import {
  getPolicyStatusComponent,
  convertToCapitalCase,
  getFormattedDate,
  getProductName,
  getColorForStatus,
  formatDate
} from "../../../utils";
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";
import PruToggleButton from "../../../../components/PruToggleButton";
import { TextM, TextMX, TextS } from "../../../components/derivatives/Text";
import {
  Padder as PadderContainer,
  Base as BaseContainer,
  Shadow as ShadowContainer,
} from "../../../components/containers";
import { path, isNil, isEmpty, pathOr } from "ramda";
import Icon from "react-native-vector-icons/FontAwesome";
import myPolicyScreens from "../../../configs/screenNames";
import { myPolicyActions } from "../../../configs/myPolicyActions";
import Toast from "react-native-root-toast";
import { formatName } from "../../../../utils";
import { ExpandableCard } from "../../../components/cards";
const Owner = "owner";
const Beneficiary = "beneficiary";

class MyPolicyMain extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isBeneficiaryList: false
    }
  }

  componentDidMount() {
    this.props.clearMyPolicies();
    const gotoBeneficiary = pathOr(
      "",
      ["state", "params", "payload"],
      this.props.navigation
    );
    if (gotoBeneficiary == "gotoBeneficiary") {
      this.props.switchListView(Beneficiary);
    } else {
      this.props.resetPoliciesViewMode();
    }
    this.didFocusListener = this.props.navigation.addListener("didFocus", () =>
      this.fetchPolicies()
    );
  }

  fetchPolicies() {
    const { myPolicyListDetails } = this.props;
    this.props.resetCurrentSelectedPolicy();
    if (isNil(myPolicyListDetails) || isEmpty(myPolicyListDetails)) {
      this.props.fetchMyPolicyList();
    }
  }

  componentWillUnmount() {
    if (this.didFocusListener) {
      this.didFocusListener.remove();
    }
    this.props.resetPolicyStatus();
  }

  onClickOfUpdateBeneficiary = policyInfo => {
    const {
      resetCommonCodeMeta,
      resetBeneficiary,
      loadMyPolicyDetailForUpdateBeneficiary,
    } = this.props;
    resetCommonCodeMeta();
    resetBeneficiary();
    loadMyPolicyDetailForUpdateBeneficiary({
      policyData: policyInfo,
    });
  };

  onClickOfPolicyTransaction = policyInfo => {
    const {
      resetCommonCodeMeta,
      loadMyPolicyDetailForTransaction,
    } = this.props;
    resetCommonCodeMeta();
    //resetBeneficiary();
    loadMyPolicyDetailForTransaction({
      policyData: policyInfo,
    });
  };

  // eslint-disable-next-line complexity
  renderPolicyItem(policyInfo) {
    const {
      enableClaimsJourney,
      policiesViewMode,
      updateBeneficiaryRequired,
      endorsementRequired,
      nameFormat,
      setProductMeta,
      userLanguage,
    } = this.props;
    const { status, policyNo, id, inceptionDate } = policyInfo;
    const formattedInceptionDate = formatDate(inceptionDate);

    const { firstName, surName } = pathOr(
      {},
      ["customerRoles", "0", "customer"],
      policyInfo
    );

    //Third param true for formatName since it is being called from myPolicy
    const mainLAName = formatName({ firstName, surName }, nameFormat, true);

    const tpaCode = pathOr(
      pathOr("", ["tpa", "code"], policyInfo),
      ["tpa", "name"],
      policyInfo
    );

    //let info = `${lang.policyNumber()} ${policyNo}`;
    let info = `${lang.for()} ${mainLAName}, ${lang.policyNo()} ${policyNo}`;

    if (!isEmpty(tpaCode)) {
      info = info + `• ${tpaCode}`;
    }

    const policyStatusComponent = getPolicyStatusComponent(status);
    const productName = getProductName(policyInfo);
    return (
      <ShadowContainer
        cornerRadius={10}
        cardElevation={7}
        cardMaxElevation={7}
        style={Styles.shadow.container}
      >
        <View style={Styles.policyCardComponent}>
          <View style={Styles.firstRow}>
            <TextMX style={{ lineHeight: 22, fontFamily: "Avenir-Black" }}>
              {productName}
            </TextMX>
            <View style={Styles.policyStatusComponent}>
              {policyStatusComponent}
            </View>
          </View>
          <View>
            <TextS style={Styles.policy.productTitle}>{info}</TextS>
          </View>
          {/* <View style={Styles.policy.policyOverviewContainer}>
              <TextM style={Styles.policy.policyOverviewText}>{lang.inceptionDate()}</TextM>
              <TextM style={{...Styles.policy.policyOverviewText, color:"black"}}> {formattedInceptionDate}</TextM>
            </View> */}
          <View style={Styles.buttonWrapper}>
            {/* {updateBeneficiaryRequired && policiesViewMode === Owner && (
              <View style={Styles.beneficiaryContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.onClickOfUpdateBeneficiary(policyInfo);
                  }}
                  style={Styles.beneficiaryButtonContainer}
                >
                  <View style={StyleSheet.flatten([Styles.inputContainer()])}>
                    <View style={StyleSheet.flatten([Styles.iconContainer])}>
                      <Icon
                        raised
                        name={"info-circle"}
                        color={Colors.main.darkBrown}
                        size={16}
                      />
                    </View>
                    <Text style={Styles.beneficiaryButtonText}>
                      {lang.updateBeneficiary()}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )} */}
            {lang.showTransaction() == "true" && policiesViewMode === Owner && (
              <View style={Styles.beneficiaryContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.onClickOfPolicyTransaction(policyInfo);
                  }}
                  style={Styles.beneficiaryButtonContainer}
                >
                  <View style={StyleSheet.flatten([Styles.inputContainer()])}>
                    <View style={StyleSheet.flatten([Styles.iconContainer])}>
                      <Icon
                        raised
                        name={"info-circle"}
                        color={Colors.main.darkBrown}
                        size={16}
                      />
                    </View>
                    <Text style={{...Styles.beneficiaryButtonText, ...configureLineHeight("12")}}>
                      {lang.viewTransaction()
                        ? lang.viewTransaction().label
                        : ""}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            {status == "INFORCE" &&
              enableClaimsJourney &&
              policiesViewMode === Beneficiary && (
                <View style={Styles.beneficiaryContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      const productCode = policyInfo.product.code;
                      setProductMeta(productCode, userLanguage);
                      NavigationService.navigate("ProductJourney", {
                        policyId: id,
                        claimsTriggeredFrom: "beneficiary",
                      });
                    }}
                    style={Styles.beneficiaryButtonContainer}
                  >
                    <View style={StyleSheet.flatten([Styles.inputContainer()])}>
                      <View style={StyleSheet.flatten([Styles.iconContainer])}>
                        <Icon
                          raised
                          name={"info-circle"}
                          color={Colors.main.darkBrown}
                          size={16}
                        />
                      </View>
                      <Text style={{...Styles.beneficiaryButtonText, ...configureLineHeight("12")}}>
                        {lang.claimPolicy()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
          </View>
        </View>
        <View style={Styles.buttonContainer}>
          {/* {policiesViewMode === "owner" && endorsementRequired && (
            <TouchableOpacity
              onPress={() => {
                this.props.loadMyPolicyDetailForEndorsements({
                  policyData: policyInfo,
                });
              }}
              style={Styles.buttonStyle}
            >
              <View style={StyleSheet.flatten([Styles.inputContainer()])}>
                <View style={StyleSheet.flatten([Styles.iconContainer])}>
                  <Icon
                    raised
                    name={"pencil"}
                    color={Colors.main.baseRed}
                    size={14}
                  />
                </View>
                <Text style={Styles.policyButtonText}>
                  {lang.updateContactInfo()}
                </Text>
              </View>
            </TouchableOpacity>
          )} */}
          <View style={Styles.buttonMiddleBorder}></View>
          <TouchableOpacity
            onPress={() => {
              this.props.loadMyPolicyDetail({
                policyData: policyInfo,
              });
            }}
            style={Styles.buttonStyle}
          >
            <View style={StyleSheet.flatten([Styles.inputContainer()])}>
              <View style={StyleSheet.flatten([Styles.iconContainer])}>
                <Icon
                  raised
                  name={"eye"}
                  color={Colors.main.baseRed}
                  size={14}
                />
              </View>
              <Text style={{...Styles.policyButtonText, ...configureLineHeight("12")}}>{lang.viewPolicy()}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ShadowContainer>
    );
  }

  renderFetchFailureToast = () => {
    const displayText =
      "Could not fetch your policies! Please try again later.";

    Toast.show(displayText, {
      duration: 2000,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  renderNoPolicyText = () => {
    return (
      <View style={Styles.disclaimerContainer}>
        <View>
          <Icon raised name="info-circle" color="grey" size={14} />
        </View>
        <View style={Styles.disclaimerTextContainer}>
          <Text style={{...Styles.disclaimerWarningText, ...configureLineHeight("14")}}>{lang.disclaimer()}</Text>
          <Text style={{...Styles.disclaimerText, ...configureLineHeight("14")}}>{lang.noPolicyLinked()}</Text>
        </View>
      </View>
    );
  };

  renderPolicyView = (policyInfo, index) => {
    const { nameFormat } = this.props;
    const { isBeneficiaryList } = this.state;
    const { firstName, surName } = pathOr({}, ["customerRoles", "0", "customer"], policyInfo);
    const { policyNo, id, inceptionDate, status, poWithBaseCoverage } = policyInfo;
    const lifeAssured = formatName({ firstName, surName }, nameFormat, true);
    const productName = getProductName(policyInfo);
    const endDate = pathOr(lang.getNA(), ["riskCessDate"], poWithBaseCoverage);
    const nextPremiumDue = pathOr(lang.getNA(), ["nextPremiumDue"], policyInfo);
    const policyNumber = lang.policyNumber();
    const lifeAssuredLabel = lang.lifeAssured();
    const inceptionDateLabel = lang.issuedDate();
    const endDateLabel = lang.endDate();
    const data = {
      [policyNumber]: policyNo,
      [lifeAssuredLabel]: isBeneficiaryList ? `${lang.for()} ${lifeAssured}` : `${lifeAssured}`,
      [inceptionDateLabel]: inceptionDate != lang.getNA() ? formatDate(inceptionDate) : '',
      [endDateLabel]: endDate != lang.getNA() ? formatDate(endDate) : ''
    };
    const nextPremiumDueLabel = lang.nextPremiumDue()
    const nextPremiumDueField = {
      [nextPremiumDueLabel]:
        nextPremiumDue != lang.getNA()
          ? formatDate(nextPremiumDue)
          : ''
    }
    const dataToBeShown = isBeneficiaryList ? data : { ...data, ...nextPremiumDueField };

    return (
      <ExpandableCard
        key={index}
        statusColor={getColorForStatus(status)}
        title={productName}
        contentData={Object.entries(dataToBeShown)}
        status={status}
        onPress={() => this.props.loadMyPolicyDetail({
          policyData: policyInfo,
        })}
      />
    );
  };

  renderPolicies() {
    const { myPolicyListDetails } = this.props;
    const { isBeneficiaryList } = this.state;
    return (
      // <PadderContainer>
      <FlatList
        style={Styles.policyFlatList}
        data={myPolicyListDetails}
        keyExtractor={item => item}
        renderItem={({ item }, index) => isBeneficiaryList ? this.renderPolicyItem(item) : this.renderPolicyView(item, index)}
      />
      // </PadderContainer>
    );
  }

  leftPress = () => {
    this.props.switchListView(Owner);
    this.props.fetchMyPolicyList();
    this.setState({
      isBeneficiaryList: false
    })
  };

  rightPress = () => {
    this.props.switchListView(Beneficiary);
    this.props.fetchMyPolicyList();
    this.setState({
      isBeneficiaryList: true
    })
  };

  // eslint-disable-next-line complexity
  renderCustomerPolicies = () => {
    const {
      myPolicyListDetails,
      policyStatus,
      policiesViewMode,
      linkPolicyRequired,
      beneficiaryPolicyViewRequired,
      linkMyPolicy
    } = this.props;

    const numPolicies = path(["length"], myPolicyListDetails);
    return (
      <>
        <ImageBackground
          source={{uri: lang.pageCoverImage()}}
          style={Styles.myPolicyImageContainer}
        >
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0)"]}
            style={Styles.myPolicyImageContainer}
          >
            <StatusBar
              translucent={true}
              backgroundColor={"#ffffff"}
              barStyle="dark-content"
            />
            <HeaderBackButton
              onPress={() => NavigationService.navigate("MainTab")}
              tintColor="#ffffff"
              backTitleVisible={true}
              pressColorAndroid="rgba(0, 0, 0, 0)"
              backImage={
                <Image
                  source={LEFT_ARROW}
                  style={{
                    width: 15,
                    height: 12.5,
                    marginTop: Platform.OS === "ios" ? 25 : 11.5,
                    marginLeft: Platform.OS === "ios" ? 20.5 : 8.5,
                  }}
                />
              }
              titleStyle={{
                marginTop: Platform.OS == "ios" ? 29 : 13,
                marginLeft: 10,
                fontFamily: "Avenir-Heavy",
                fontSize: 16,
                lineHeight: 18,
                fontWeight: "bold",
              }}
            />
            <View style={Styles.newTitleContainer}>
              <View>
                <View style={Styles.linkMyPolicyContainer}>
                  <View style={Styles.titleContainer}>
                    <Text style={{...Styles.titleText, ...configureLineHeight("16")}}>
                      {lang.myPolicyLabel()}
                    </Text>
                  </View>

                  {linkPolicyRequired && (
                    <TouchableOpacity
                      style={Styles.linkMyPolicyButton}
                      onPress={linkMyPolicy}
                    >
                      <View style={Styles.linkPolicyIconContainer}>
                        <Image
                          source={
                            POLICY_ICONS.illustration.my_policy.ic_link_policy
                          }
                          width={13.8}
                          height={13.8}
                          style={{
                            marginRight: 5,
                          }}
                          resizeMode={"contain"}
                        />
                        <Text numberOfLines={2} style={{...Styles.linkPolicyText, ...configureLineHeight("13")}}>
                          {lang.linkPolicy()}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={{ flex: 1 }}>
          {beneficiaryPolicyViewRequired && (
            <View style={{ flex: 0.1 }}>
              <PruToggleButton
                leftLabel={Owner}
                rightLabel={Beneficiary}
                leftPress={() => {
                  this.leftPress();
                }}
                rightPress={() => {
                  this.rightPress();
                }}
                policiesViewMode={this.props.policiesViewMode}
                viewMode={
                  this.props.policiesViewMode === "owner"
                    ? "leftMode"
                    : "rightMode"
                }
                height={30}
                onColor={Colors.hkShade}
              ></PruToggleButton>
            </View>
          )}
          {(policyStatus !== "getPolicyListFailure" || policyStatus == "getPolicyListFailure" || !linkPolicyRequired) && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ flex: 0.9 }}
            >
              {numPolicies === undefined && this.renderNoPolicyText()}
              {numPolicies > 0 && this.renderPolicies()}
              {policyStatus === "getPolicyDetailsFailure" &&
                this.renderFetchFailureToast()}
            </ScrollView>
          )}
          {policiesViewMode == Beneficiary &&
            numPolicies === 0 &&
            this.renderNoPolicyText()}
        </View>
      </>
    );
  };

  render() {
    return this.renderCustomerPolicies();
  }
}

MyPolicyMain.propTypes = {
  resetCurrentSelectedPolicy: PropTypes.func,
  fetchMyPolicyList: PropTypes.func,
  loadMyPolicyDetail: PropTypes.func,
  clearMyPolicies: PropTypes.func,
  navigation: PropTypes.any,
  myPolicyListDetails: PropTypes.object,
  policyStatus: PropTypes.string,
  resetPolicyStatus: PropTypes.string,
  loadMyPolicyDetailForEndorsements: PropTypes.func,
  resetCommonCodeMeta: PropTypes.func,
  resetBeneficiary: PropTypes.func,
  switchListView: PropTypes.func,
  policiesViewMode: PropTypes.string,
  resetPoliciesViewMode: PropTypes.func,
  enableClaimsJourney: PropTypes.bool,
  loadMyPolicyDetailForUpdateBeneficiary: PropTypes.func,
  updateBeneficiaryRequired: PropTypes.bool,
  endorsementRequired: PropTypes.bool,
  linkPolicyRequired: PropTypes.bool,
  beneficiaryPolicyViewRequired: PropTypes.bool,
  nameFormat: PropTypes.string,
  loadMyPolicyDetailForTransaction: PropTypes.func,
};

const mapStateToProps = state => ({
  myPolicyListDetails: path(["myPolicy", "myPolicyList"], state),
  policiesViewMode: state.myPolicy.policiesViewMode,
  policySource: pathOr(
    "",
    ["meta", "countryCommonMeta", "policySource"],
    state
  ),
  policyStatus: path(["myPolicy", "getPolicyStatus"], state),
  enableClaimsJourney: path(
    ["meta", "countryCommonMeta", "enableClaimsJourney"],
    state
  ),
  updateBeneficiaryRequired: path(
    ["meta", "countryCommonMeta", "updateBeneficiaryRequired"],
    state
  ),
  endorsementRequired: path(
    ["meta", "countryCommonMeta", "endorsementRequired"],
    state
  ),
  linkPolicyRequired: path(
    ["meta", "countryCommonMeta", "linkPolicyRequired"],
    state
  ),
  beneficiaryPolicyViewRequired: path(
    ["meta", "countryCommonMeta", "beneficiaryPolicyViewRequired"],
    state
  ),
  nameFormat: path(["meta", "countryCommonMeta", "nameFormat"], state),
  userLanguage: pathOr("", ["userPreferences", "language"], state),
});

const mapDispatchToProps = {
  resetCurrentSelectedPolicy: () => ({
    type: myPolicyActions.resetCurrentSelectedPolicy,
  }),
  resetPoliciesViewMode: () => ({
    type: myPolicyActions.resetPoliciesViewMode,
  }),
  fetchMyPolicyList: payload => ({
    context: myPolicyScreens.POLICY_MAIN_SCREEN,
    type: myPolicyActions.getPolicyList,
    payload,
  }),
  loadMyPolicyDetail: payload => ({
    context: myPolicyScreens.POLICY_MAIN_SCREEN,
    type: myPolicyActions.getPolicyDetails,
    payload,
  }),
  loadMyPolicyDetailForEndorsements: payload => ({
    context: myPolicyScreens.UPDATE_INFO_SCREEN,
    type: myPolicyActions.getPolicyDetails,
    payload,
  }),
  loadMyPolicyDetailForUpdateBeneficiary: payload => ({
    context: myPolicyScreens.CHANGE_BENEFICIARY,
    type: myPolicyActions.getPolicyDetails,
    payload,
  }),
  clearMyPolicies: () => ({
    type: myPolicyActions.clearPolicies,
  }),
  resetPolicyStatus: () => ({
    context: myPolicyScreens.POLICY_MAIN_SCREEN,
    type: myPolicyActions.resetPolicyStatus,
  }),
  resetCommonCodeMeta: () => ({
    type: "product-journeys/reset-common-code-meta",
  }),
  resetBeneficiary: () => ({
    type: "product-journeys/reset-beneficiary",
  }),
  switchListView: value => ({
    type: "myPolicy/SwitchListView",
    payload: {
      payload: value,
    },
  }),
  loadMyPolicyDetailForTransaction: payload => ({
    context: myPolicyScreens.POLICY_TRANSACTIONS,
    type: myPolicyActions.getPolicyDetails,
    payload,
  }),
  linkMyPolicy: () => ({
    context: myPolicyScreens.POLICY_MAIN_SCREEN,
    type: "LINK_POLICY",
  }),
  setProductMeta: (code, language) => ({
    context: "PRODUCT_SELECT_PAGE",
    type: "GET_PRODUCT_META",
    payload: {
      code: code,
      language: language,
    },
  }),
};

const MyPolicyMainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPolicyMain);

export default MyPolicyMainContainer;

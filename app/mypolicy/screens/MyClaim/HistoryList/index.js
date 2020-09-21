/* eslint-disable react-native/no-raw-text */
import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";
import { CoreActionTypes, CoreConfig } from "@pru-rt-internal/pulse-common";
import { Colors, Sizes } from "../../../configs";
import Styles from "./style";
import {
  TextLX,
  TextM,
  TextS,
  TextXS,
} from "../../../components/derivatives/Text";
import {
  Padder as PadderContainer,
  Base as BaseContainer,
  HorizontalAnimator as HorizontalAnimatorContainer,
  VerticalAnimator as VerticalAnimatorContainer,
  HorizontalScroll as HorizontalScrollContainer,
} from "../../../components/containers";
import {
  Claim as ClaimCard,
  ClaimAdmission as ClaimCardAdmission,
} from "../../../components/cards";

import Icon from "../../../components/generics/Icon";
import HistoryClaimFilterModal from "../../../modals/HistoryClaimFilter";
import DownloadSuccessModal from "../../../modals/DownloadSuccess";
import DownloadFailedModal from "../../../modals/DownloadFailed";
import { ButtonSmall } from "../../../components/derivatives/Button";
import { ImageIllustration } from "../../../components/derivatives/Image";
import _ from "lodash";
import lang from "../../MyPolicy/lang";
import InfoTab from "../../MyPolicy/MyPolicyDetail";
import {
  Loading as LoadingModal,
} from "../../../modals";
const { pageKeys } = CoreConfig;

// const historyListMeta = (meta, types, keys) =>
//   meta.find(item => item.type === types && item.key === keys).label;
const historyListMeta = (meta, types, keys) => {
  const items = meta.find(item => item.type === types && item.key === keys);
  return items === undefined ? types : items.label;
};
const HISTORY_LIST = "historylist";
const MAIN_CLAIM = "mainclaim";
let data;

class HistoryList extends Component {
  static propTypes = {
    loadHistoryDetail: PropTypes.func,
    navigation: PropTypes.object,
    getClaimsResponse: PropTypes.object,
    getClaimsFetch: PropTypes.bool,
    meta: PropTypes.object,
    loadMoreHistory: PropTypes.func,
    language: PropTypes.string,
    getClaimsFetchMore: PropTypes.bool,
    getClaimHistoryAdmissionResponse: PropTypes.object,
    loadHistoryDetailAdmission: PropTypes.func,
    action: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      isFilterModalActive: false,
      isSuccessDownloadModalActive: false,
      isFailedDownloadModalActive: false,
      dataIndex: 0,
      dataClaim: [],
      isScrollByTap: false,
      activeTabIndex: 0,
      fetchClaim: true,
      fetchClaimAdmission: true,
    };
  }

  onFilter() {
    this.setState({ isFilterModalActive: false });
  }

  download() {
    this.setState({ isSuccessDownloadModalActive: true });
  }

  renderTitle() {
    const { meta } = this.props;
    // if (this.state.dataIndex === 0) {
    //   return (
    //     <HorizontalAnimatorContainer order={1}>
    //       <PadderContainer style={Styles.title.container}>
    //         <TextLX>{""}</TextLX>
    //         <TextLX>{""}</TextLX>
    //       </PadderContainer>
    //     </HorizontalAnimatorContainer>
    //   );
    // }
    return (
      <HorizontalAnimatorContainer order={1}>
        <PadderContainer style={Styles.title.container}>
          <TextLX>
            {historyListMeta(
              meta.metaDetail.commons,
              HISTORY_LIST,
              "claimhistory"
            )}
          </TextLX>
          <TextLX>
            {historyListMeta(
              meta.metaDetail.commons,
              HISTORY_LIST,
              "claimstatus"
            )}
          </TextLX>
        </PadderContainer>
      </HorizontalAnimatorContainer>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { action } = this.props;
    if (prevProps.action !== action) {
      console.log("Actions :", action);
      switch (action) {
        case CoreActionTypes.CLAIM_HISTORY_LIST_LOAD_SUCCESS:
          this.setState({ fetchClaim: false });
          break;
        case CoreActionTypes.CLAIM_HISTORY_LIST_LOAD_ADMISSION_SUCCESS:
          this.setState({ fetchClaimAdmission: false });
          break;
        default:
      }
    }
  }

  renderCard(claimCard, index) {
    const {
      number,
      claim,
      preAdmission,
      name,
      policyNo,
      status,
      id,
      riderName,
      policyPruId,
      date,
      onProcess = 1,
      approved = 1,
      declined = 1,
      submitted = 1,
      laid,
      coverageId,
    } = claimCard;
    const {
      loadHistoryDetail,
      meta,
      language,
      myPolicyDetails,
      lifeAssured,
    } = this.props;
    const coveragePolicy = myPolicyDetails[policyPruId];
    const laName = lifeAssured[laid] ? lifeAssured[laid].surName : "";
    let policyProduct = "";
    let rider = "";
    if (coveragePolicy) {
      policyProduct = coveragePolicy.product
        ? coveragePolicy.product.fullName
        : "";
      const policyProdOptions = coveragePolicy.productOptions;
      if (policyProdOptions && policyProdOptions.length > 0) {
        const productComponentOptions =
          policyProdOptions[0].productComponentOptions;
        if (productComponentOptions && productComponentOptions.length > 0) {
          for (let i = 0; i < productComponentOptions.length; i++) {
            if (
              productComponentOptions[i] &&
              productComponentOptions[i].id === riderName
            ) {
              //laName=productComponentOptions[i].lifeAssured ?productComponentOptions[i].lifeAssured.name:''
              rider = productComponentOptions[i].component
                ? productComponentOptions[i].component.name
                : "";
              break;
            }
          }
        }
      }
    }
    return (
      <HorizontalAnimatorContainer order={(index + 3) * 2} key={index}>
        <ClaimCard
          number={number}
          claim={historyListMeta(
            meta.metaDetail.commons,
            claim,
            "claimhistory"
          )}
          titleText={
            language === "ID"
              ? preAdmission
                ? "No. Registrasi "
                : "No.Pengajuan "
              : preAdmission
              ? "Registration No."
              : "Submission No."
          }
          name={laName}
          onProcess={onProcess}
          approved={approved}
          status={this.getClaimStatus(status)}
          declined={declined}
          submitted={submitted}
          onPress={() =>
            loadHistoryDetail({
              fromPage: "PlaiClaimHistoryList",
              name: laName,
              riderName: rider,
              policyProduct,
              status,
              date: null,
              policyPruId,
              id,
              coverageId,
              title: historyListMeta(
                meta.metaDetail.commons,
                claim,
                "claimhistory"
              ),
              bookingCode: number,
              policyNo: policyNo,
              getDetailClaimResponse: this.props.getClaimsResponse,
            })
          }
        />
      </HorizontalAnimatorContainer>
    );
  }

  getClaimStatus(status) {
    const statusCode =
      status && status.length > 2 ? status.substring(0, 2) : "";
    switch (statusCode) {
      case "PN":
      case "PA":
      case "IR":
        return "ON_PROCESS";
      case "ML":
      case "CL":
        return "DECLINED";
      case "AL":
      case "BT":
        return "APPROVED";
      case "SU":
        return "SUBMITTED";
    }
    return "";
  }

  renderSection(date, claims = [], isLast, index) {
    const closingCircle = null;
    const lastIndex = isLast - 1;
    return (
      <VerticalAnimatorContainer order={2} key={index}>
        <View style={Styles.section.outerContainer}>
          <View
            key={index}
            style={[
              Styles.section.container,
              index === lastIndex
                ? { borderColor: Colors.main.transparent }
                : {},
            ]}
          />
          <View style={Styles.section.cardContainer}>
            <View style={Styles.section.innerContainer}>
              <TextXS color={Colors.main.baseGray}>
                {moment(date).format("DD MMM YYYY")}
              </TextXS>

              {claims.map((claim, cardIndex) => {
                const cardParams = {
                  number: claim.submissionId,
                  claim: claim.claim,
                  name: claim.name,
                  riderName: claim.riderName,
                  id: claim.id,
                  laid: claim.laid,
                  date: claim.date,
                  coverageId: claim.coverageId,
                  status: claim.status,
                  policyPruId: claim.policyPruId,
                  onProcess: claim.onProcess,
                  approved: claim.approved,
                  declined: claim.declined,
                  policyNo: claim.submissionId ? null : claim.policyNo,
                  preAdmission: claim.preAdmission,
                };

                return this.renderCard(cardParams, cardIndex);
              })}
            </View>
          </View>
          <View style={Styles.section.circle} />
          {closingCircle}
        </View>
      </VerticalAnimatorContainer>
    );
  }

  renderSectionAdmission(date, claims = [], isLast, index) {
    const closingCircle = null;
    const lastIndex = isLast - 1;
    return (
      <VerticalAnimatorContainer order={2} key={index}>
        <View style={Styles.section.outerContainer}>
          <View
            key={index}
            style={[
              Styles.section.container,
              index === lastIndex
                ? { borderColor: Colors.main.transparent }
                : {},
            ]}
          />
          <View style={Styles.section.cardContainer}>
            <View style={Styles.section.innerContainer}>
              <TextXS color={Colors.main.baseGray}>
                {moment(date).format("DD MMM YYYY")}
              </TextXS>

              {claims.map((claim, cardIndex) => {
                const cardParams = {
                  number: claim.submissionId,
                  claim: claim.claim,
                  name: claim.name,
                  onProcess: claim.onProcess,
                  approved: claim.approved,
                  declined: claim.declined,
                  policyNo: claim.submissionId ? null : claim.policyNo,
                  preAdmission: claim.preAdmission,
                  riderName: claim.data[0].riderName,
                };
                return this.renderCardAdmission(cardParams, cardIndex);
              })}
            </View>
          </View>
          <View style={Styles.section.circle} />
          {closingCircle}
        </View>
      </VerticalAnimatorContainer>
    );
  }

  componentDidMount() {
    // console.log("params", this.props);
    // if (this.props.navigation.state.params) {
    //   this.setState({ params: this.props.navigation.state.params });
    // }
    data = [];
    //this.props.loadMyPolicyList()
  }

  renderList() {
    const { getClaimsFetch, getClaimsResponse, meta } = this.props;
    const { fetchClaim } = this.state;
    const histories = getClaimsResponse.body ? getClaimsResponse.body : [];

    if (histories.index) {
      const sortedData = _.sortBy(histories.data, ["date"]);
      if (histories.index !== this.state.dataIndex) {
        for (let i = sortedData.length - 1; i >= 0; i--) {
          data.push(sortedData[i]);
        }
        this.setState({ dataIndex: histories.index, dataClaim: data });
      }
    }
    // if (getClaimsFetch) {
    //   return <ActivityIndicator />;
    // }
    if (!fetchClaim && data.length === 0) {
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
                "listclaimnodatatitle"
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
                "listclaimnodatadesc"
              )}
            </TextM>
          </View>
        </PadderContainer>
      );
    }
    return (
      <PadderContainer>
        {this.state.dataClaim.map((history, index) => {
          return this.renderSection(
            history.date,
            history.claims,
            data.length,
            index
          );
        })}
      </PadderContainer>
    );
  }

  renderCardAdmission(claimCard, index) {
    const {
      number,
      claim,
      preAdmission,
      name,
      policyNo,
      onProcess = 0,
      approved = 0,
      declined = 0,
      riderName,
    } = claimCard;
    const { loadHistoryDetailAdmission, meta, language } = this.props;

    return (
      <HorizontalAnimatorContainer order={(index + 3) * 2} key={index}>
        <ClaimCardAdmission
          number={number}
          claim={riderName}
          titleText={
            language === "ID"
              ? preAdmission
                ? "No. Registrasi "
                : "No.Pengajuan "
              : preAdmission
              ? "Registration No."
              : "Submission No."
          }
          name={name}
          onProcess={onProcess}
          approved={approved}
          declined={declined}
          onPress={() =>
            loadHistoryDetailAdmission({
              fromPage: "PlaiClaimHistoryList",
              name: name,
              title: riderName,
              bookingCode: number,
              policyNo: policyNo,
            })
          }
        />
      </HorizontalAnimatorContainer>
    );
  }

  renderListAdmission() {
    const {
      getClaimsFetch,
      getClaimsResponse,
      meta,
      getClaimHistoryAdmissionResponse,
    } = this.props;
    const { fetchClaimAdmission } = this.state;
    const datas = [];
    const histories = getClaimHistoryAdmissionResponse
      ? getClaimHistoryAdmissionResponse.body
      : [];
    if (histories.length > 0) {
      for (let i = 0; i < histories.length; i++) {
        for (let j = 0; j < histories[i].claims.length; j++) {
          console.log("histories", histories[i].claims[j]);
          datas.splice(datas.length, datas.length, histories[i].claims[j]);
        }
      }
    }
    const sortedData = _.sortBy(datas, "datime");
    // if (getClaimsFetch) {
    //   return <ActivityIndicator />;
    // }
    if (!fetchClaimAdmission && datas.length === 0) {
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
                "listclaimnodatatitle"
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
                "listclaimnodatadesc"
              )}
            </TextM>
          </View>
        </PadderContainer>
      );
    }
    return (
      <PadderContainer>
        {datas.map((history, index) => {
          return this.renderSectionAdmission(
            history.datime,
            sortedData,
            datas.length,
            index
          );
        })}
      </PadderContainer>
    );
  }

  renderButtonMore() {
    const { getClaimsResponse, meta, getClaimsFetchMore } = this.props;
    const data = getClaimsResponse.body;
    const payload = {
      index: data.index,
      nextMonth: data.nextMonth,
    };
    if (getClaimsFetchMore) {
      return <ActivityIndicator />;
    }
    if (!getClaimsFetchMore && !data.data) {
      return null;
    }
    return (
      <View style={{ marginHorizontal: 95 }}>
        <ButtonSmall
          onPress={() => this.props.loadMoreHistory(payload)}
          inverse
          width={200}
        >
          {historyListMeta(
            meta.metaDetail.commons,
            MAIN_CLAIM,
            "listclaimloadmore"
          )}
        </ButtonSmall>
      </View>
    );
  }

  renderFilter(count) {
    return (
      <TouchableOpacity
        style={Styles.rightHeader.container}
        onPress={() => this.setState({ isFilterModalActive: true })}
      >
        <Icon name="filter" color={Colors.main.baseRed} />

        <View style={Styles.rightHeader.filterCount.container}>
          <TextXS size={10} bold line={16} color={Colors.main.baseWhite}>
            {count}
          </TextXS>
        </View>
      </TouchableOpacity>
    );
  }

  renderRightHeaderButtons() {
    return (
      <View style={Styles.rightHeader.grouper}>
        {this.renderFilter(2)}

        <TouchableOpacity
          style={Styles.rightHeader.container}
          onPress={() => this.download()}
        >
          <Icon name="download-ecard" color={Colors.main.baseRed} />
        </TouchableOpacity>
      </View>
    );
  }

  //#endregion
  goBackPress() {
    this.props.navigation.goBack();
  }

  onContentScroll(event) {
    const xOffset = event.nativeEvent.contentOffset.x;

    const index = Math.round(xOffset / Sizes.screen.width);
    if (index !== this.state.activeTabIndex && !this.state.isScrollByTap) {
      this.switchTab(index, true);
    }
  }

  switchTab(index, isBySwipe = false) {
    if (this.state.activeTabIndex === index) {
      return false;
    }

    this.setState({
      activeTabIndex: index,
      isScrollByTap: !isBySwipe,
    });

    if (!isBySwipe) {
      this._contentScroll.scrollTo({ x: Sizes.screen.width * index });
    }

    if (this.state.isFixedHeaderActive) {
      this._mainScroll.scrollTo({
        y: this.state.scrollOffset + 12,
        animated: false,
      });
    }
  }

  renderTabHead(isFixedHeader = false) {
    if (isFixedHeader && !this.state.isFixedHeaderActive) {
      return null;
    }

    const fixedHeader = { position: "absolute", minWidth: Sizes.screen.width };

    return (
      <HorizontalScrollContainer
        itemSpacing={16}
        style={[Styles.tab.head.grouper, isFixedHeader && fixedHeader]}
      >
        {this.renderTabHeadItem("Reimbursment", 0)}
        {this.renderTabHeadItem("Cashless", 1)}
      </HorizontalScrollContainer>
    );
  }

  renderTabHeadItem(label, index) {
    return (
      <TouchableOpacity onPress={() => this.switchTab(index)}>
        <TextS
          color={
            this.state.activeTabIndex === index
              ? Colors.main.baseBlack
              : Colors.main.inactiveGray
          }
        >
          {label}
        </TextS>

        <View
          style={[
            Styles.tab.head.container,
            this.state.activeTabIndex === index
              ? { backgroundColor: Colors.main.baseRed }
              : {},
          ]}
        />
      </TouchableOpacity>
    );
  }

  static renderTabBodyItem(content) {
    return <View style={Styles.tab.body.container}>{content}</View>;
  }

  // ----------------------------------------

  renderTabBody() {
    // const { myPolicyDetailResponse } = this.props;
    return (
      <ScrollView
        ref={ref => {
          this._contentScroll = ref;
        }}
        contentContainerStyle={{
          backgroundColor: Colors.main.softGray,
        }}
        style={{ backgroundColor: Colors.main.softGray }}
        horizontal
        // pagingEnabled={true}
        onScroll={event => this.onContentScroll(event)}
        onMomentumScrollEnd={() => this.setState({ isScrollByTap: false })}
        scrollEventThrottle={16}
      >
        {HistoryList.renderTabBodyItem(this.renderList())}

        {HistoryList.renderTabBodyItem(this.renderListAdmission())}
      </ScrollView>
    );
  }

  render() {
    const { meta, getClaimHistoryAdmissionResponse } = this.props;
    console.log(
      "getClaimHistoryAdmissionResponse :",
      getClaimHistoryAdmissionResponse
    );
    return (
      <BaseContainer
        persistScrollTitle={historyListMeta(
          meta.metaDetail.commons,
          HISTORY_LIST,
          "claimhistorystatus"
        )}
        backgroundColorCustom={Colors.main.baseWhite}
        backgroundColor={Colors.main.softGray}
        onBackPress={() => this.goBackPress()}
        // rightHeaderRender={this.renderRightHeaderButtons()}
        hasFooter
      >
        {this.renderTitle()}

        {this.renderTabHead()}

        {this.renderTabBody()}

        {/*{this.renderList()}*/}

        {/* {this.renderButtonMore()} */}

        <DownloadSuccessModal
          isActive={this.state.isSuccessDownloadModalActive}
          onConfirm={() =>
            this.setState({ isSuccessDownloadModalActive: false })
          }
        />
        <DownloadFailedModal
          isActive={this.state.isFailedDownloadModalActive}
          onConfirm={() =>
            this.setState({ isFailedDownloadModalActive: false })
          }
        />
        <HistoryClaimFilterModal
          isActive={this.state.isFilterModalActive}
          onClose={() => this.setState({ isFilterModalActive: false })}
          onSubmit={() => this.onFilter()}
        />
      </BaseContainer>
    );
  }
}

const mapStateToProps = state => ({
  action: state.plaiClaim.action,
  actionPolicy: state.plaiMyPolicy.action,
  getClaimsResponse: state.plaiClaim.getClaimsResponse,
  getClaimsFetch: state.plaiClaim.getClaimsFetch,
  getClaimsFetchMore: state.plaiClaim.getClaimsFetchMore,
  meta: state.meta,
  language: state.userPreferences.language,
  myPolicyDetails: state.plaiMyPolicy.myPolicyDetails,
  lifeAssured: state.plaiClaim.lifeAssured,
  getClaimHistoryAdmissionResponse:
    state.plaiClaim.getClaimHistoryAdmissionResponse,
});

const mapDispatchToProps = dispatch => ({
  loadHistoryDetail: payload => {
    dispatch({
      context: pageKeys.CLAIM_HISTORY_LIST_SCREEN,
      type: CoreActionTypes.CLAIM_HISTORY_DETAIL_LOAD,
      payload,
    });
  },
  loadHistoryDetailAdmission: payload => {
    dispatch({
      context: pageKeys.CLAIM_HISTORY_LIST_SCREEN,
      type: CoreActionTypes.CLAIM_HISTORY_DETAIL_ADMISSION_LOAD,
      payload,
    });
  },
  loadMoreHistory: payload => {
    dispatch({
      context: pageKeys.CLAIM_HISTORY_LIST_SCREEN,
      type: CoreActionTypes.CLAIM_HISTORY_LOAD_MORE,
      payload,
    });
  },
  loadMyPolicyList: payload => {
    dispatch({
      context: pageKeys.CLAIM_HISTORY_LIST_SCREEN,
      type: CoreActionTypes.MY_POLICY_LIST_FETCH,
      payload,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryList);

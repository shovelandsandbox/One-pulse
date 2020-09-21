import React, { PureComponent, Fragment } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Text,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Colors, Sizes } from "../../../configs";
import {
  formatDate,
  getPolicyStatusComponent,
  getProductName,
  getColorForStatus,
} from "../../../utils";
import lang from "../lang";
import EPolicyTab from "../MyPolicyDetailEPolicy";
import Styles from "./style";
import {
  GeneralSuccess as GeneralSuccessModal,
  GeneralError as GeneralErrorModal,
} from "../../../modals";
import { TextMX, TextS } from "../../../components/derivatives/Text";
import {
  Base as BaseContainer,
  HorizontalScroll as HorizontalScrollContainer,
  Padder as PadderContainer,
  Slider,
} from "../../../components/containers";
import InfoTab from "../MyPolicyDetailInfo";
import AgentInfoTab from "../MyPolicyAgentInfo";
import BenefitTab from "../MyPolicyDetailBenefit";
import { pathOr, path, isEmpty, filter } from "ramda";
import { dispatchEvent } from "../../../../actions";
import {
  CoreConfig,
  CoreActionTypes,
  metaHelpers,
  CoreUtils,
  firebaseEvents,
  events,
} from "@pru-rt-internal/pulse-common";
const { logFirebaseEvent } = CoreUtils;

import { LEFT_ARROW } from "../../../../config/images";
import styles from "../../../../themes/default/styles";
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";
class MyPolicyDetail extends PureComponent {
  constructor(props) {
    super(props);

    const cardWidth = Sizes.screen.width / 1.26;
    const cardHeight = cardWidth / 1.5;

    this.state = {
      showHeaderTitle: false,
      isFixedHeaderActive: false,
      cardSize: {
        width: cardWidth,
        height: cardHeight,
      },
      activeTabIndex: 0,
      isScrollByTap: false,
      successModalVisible: false,
      failedModalVisible: false,
    };
  }

  toggleSuccessModal = () => {
    logFirebaseEvent(
      firebaseEvents.E_Medical_Card_Saved.name,
      firebaseEvents.E_Medical_Card_Saved.params
    );
    this.props.dispatchEvent(events.EMedicalcardsavedClick);
    this.setState(prevState => ({
      successModalVisible: !prevState.successModalVisible,
    }));
  };

  toggleFailedModal = () => {
    this.setState(prevState => ({
      failedModalVisible: !prevState.failedModalVisible,
    }));
  };

  onMainScroll = event => {
    const yOffset = event.nativeEvent.contentOffset.y;

    if (
      yOffset >= this.state.scrollOffset + 3 &&
      !this.state.isFixedHeaderActive
    ) {
      this.setState({
        showHeaderTitle: true,
        isFixedHeaderActive: true,
      });
    }

    if (
      yOffset < this.state.scrollOffset + 3 &&
      this.state.isFixedHeaderActive
    ) {
      this.setState({
        showHeaderTitle: false,
        isFixedHeaderActive: false,
      });
    }
  };

  onContentScroll = event => {
    this.setState({ isScrollByTap: false });
    const xOffset = event.nativeEvent.contentOffset.x;

    const index = Math.round(xOffset / Sizes.screen.width);
    if (index !== this.state.activeTabIndex && !this.state.isScrollByTap) {
      this.switchTab(index, true);
    }
  };

  onCardScroll = event => {
    const xOffset = event.nativeEvent.contentOffset.x;

    const index = Math.round(xOffset / this.state.cardSize.width);
    if (index !== this.state.activeCardIndex) {
      this.setState({ activeCardIndex: index });
    }
  };

  switchTab = (index, isBySwipe = false) => {
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
  };

  renderRider = ({ status, name, number, type }) => {
    const info = `${lang.policyNumber()} ${number}${type ? ` • ${type}` : ""}`;
    const tagRender = getPolicyStatusComponent(status);

    return (
      <View style={Styles.statusHeaderContainer}>
        <View style={{ left: 31, position: "absolute", width: "70%" }}>
          <Text
            numberOfLines={1}
            style={{
              ...{ fontFamily: "Avenir-Heavy", lineHeight: 18, fontSize: 16, color: "rgb(255,255,255)", fontWeight: 'bold' },
              ...configureLineHeight("16")
            }}
          >
            {name}
          </Text>
          <TextS
            color={"rgb(255,255,255)"}
            style={{
              ...{
                lineHeight: 22,
                fontSize: 13,
                lineHeight: 15,
                paddingTop: 7,
              },
              ...configureLineHeight("13")
            }}
          >
            {info}
          </TextS>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            right: 17,
            position: "absolute",
          }}
        >
          {tagRender}
        </View>
      </View>
    );
  };

  renderCardItem = uri => {
    return (
      <Image
        source={{
          uri: `data:image/jpeg;base64,${uri}}`,
        }}
        style={[
          Styles.card.image.container,
          {
            width: this.state.cardSize.width,
            height: this.state.cardSize.height,
          },
        ]}
      />
    );
  };

  renderMain = () => {
    const { dateFormat } = this.props;
    const policyInfo = this.props.currentSelectedPolicy;
    const productName = getProductName(policyInfo);

    const riderData = {
      status: policyInfo.status,
      name: productName,
      number: policyInfo.policyNo,
      type: pathOr("", ["tpa", "name"], policyInfo),
      date: policyInfo.inceptionDate
        ? formatDate(policyInfo.inceptionDate, dateFormat)
        : undefined,
    };

    return <View>{this.renderRider(riderData)}</View>;
  };

  renderTabHeadItem = (label, index) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({ isScrollByTap: true }, () => this.switchTab(index))
        }
      >
        <TextS
          color={
            this.state.activeTabIndex === index
              ? Colors.main.baseRed
              : Colors.main.inactiveGray
          }
          style={{
            ...{
              fontSize: 15,
              lineHeight: 18,
            },
            ...configureLineHeight("15")
          }}
        >
          {label}
        </TextS>

        <View
          style={[
            Styles.tab.head.container,
            this.state.activeTabIndex === index
              ? { backgroundColor: Colors.main.baseRed, marginTop: 14 }
              : {},
          ]}
        />
      </TouchableOpacity>
    );
  };

  renderTabHead = (isFixedHeader = false) => {
    const { currentSelectedPolicy } = this.props;
    if (isFixedHeader && !this.state.isFixedHeaderActive) {
      return null;
    }
    const documents = currentSelectedPolicy.documents
      ? filter(
        item => item.type === "PolicyPDF",
        currentSelectedPolicy.documents
      )
      : [];
    const agentObj = pathOr(
      {},
      ["servingAgents", "agent"],
      currentSelectedPolicy
    );

    const fixedHeader = { position: "absolute", minWidth: Sizes.screen.width };

    return (
      <HorizontalScrollContainer
        itemSpacing={24}
        style={[Styles.tab.head.grouper, isFixedHeader && fixedHeader]}
      >
        {this.renderTabHeadItem(lang.policyInfo(), 0)}
        {this.renderTabHeadItem(lang.benefitAndInvestment(), 1)}
        {documents.length > 0 && this.renderTabHeadItem(lang.ePolicy(), 2)}
        {!isEmpty(agentObj) && this.renderTabHeadItem(lang.agentInfo(), 3)}
      </HorizontalScrollContainer>
    );
  };

  renderTabBodyItem = content => {
    const { currentSelectedPolicy } = this.props;
    // getColorForStatus(currentSelectedPolicy.status) === "green";
    return (
      <>
        <ScrollView
          scrollEnabled={true}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={Styles.tabItemContainer}
        >
          <View style={Styles.tab.body.container}>{content}</View>
        </ScrollView>
        <View style={Styles.tab.body.block} />
      </>
    );
  };

  renderTabBody = () => {
    const { currentSelectedPolicy } = this.props;
    const documents = currentSelectedPolicy.documents
      ? filter(
        item => item.type === "PolicyPDF",
        currentSelectedPolicy.documents
      )
      : [];
    const agentObj = pathOr(
      {},
      ["servingAgents", "agent"],
      currentSelectedPolicy
    );

    return (
      <ScrollView
        ref={ref => {
          this._contentScroll = ref;
        }}
        contentContainerStyle={{
          backgroundColor: Colors.main.baseWhite,
        }}
        horizontal
        pagingEnabled={true}
        onScroll={event => this.onContentScroll(event)}
        showsHorizontalScrollIndicator={false}
      // onMomentumScrollEnd={() => this.setState({ isScrollByTap: false })}
      // scrollEventThrottle={16}
      >
        {this.renderTabBodyItem(<InfoTab policyData={currentSelectedPolicy} />)}
        {this.renderTabBodyItem(
          <BenefitTab policyData={currentSelectedPolicy} />
        )}
        {documents.length > 0 &&
          this.renderTabBodyItem(
            <EPolicyTab policyData={currentSelectedPolicy} />
          )}
        {!isEmpty(agentObj) &&
          this.renderTabBodyItem(
            <AgentInfoTab policyData={currentSelectedPolicy} />
          )}
      </ScrollView>
    );
  };

  render() {
    const { headerTitle, showHeaderTitle } = this.state;
    const { currentSelectedPolicy } = this.props;
    const { profile, requiredLinksMeta, transactionLink } = this.props;
    if (!currentSelectedPolicy || isEmpty(currentSelectedPolicy)) {
      return null;
    }
    // const isActive =
    //   getColorForStatus(currentSelectedPolicy.status) === "green";
    const scrollViewStyle = { backgroundColor: Colors.main.baseWhite };
    return (
      // <BaseContainer
      //   inverse={true}
      //   onBackPress={() => this.props.navigation.pop()}
      //   static={true}
      //   // topColor={Colors.main.softGray}
      //   // title={showHeaderTitle && headerTitle}
      //   backgroundColor={"rgb(247 249 251)"}
      // >
      <View>
        <ImageBackground
          source={{ uri: lang.pageCoverImage() }}
          style={Styles.myPolicyImageContainer}
        >
          <View
            style={{ flexDirection: "row", paddingTop: 18, paddingLeft: 10.5 }}
          >
            <TouchableOpacity style={{ padding: 10 }} onPress={() => this.props.navigation.pop()}>
              <Image source={LEFT_ARROW} width={15} height={12.5} />
            </TouchableOpacity>
          </View>
          <View style={{ bottom: 0, position: "absolute" }}>
            {this.renderMain()}
          </View>
        </ImageBackground>
        <View>{this.renderTabHead()}</View>
        <View style={{ flexDirection: "row", height: "100%" }}>
          <View>
            <View style={{ height: "60%" }}>{this.renderTabBody()}</View>
          </View>
          <View style={{ height: "100%" }}>
            <Slider
              policyData={currentSelectedPolicy}
              profile={profile}
              requiredLinksMeta={requiredLinksMeta}
              transactionLink={transactionLink}
            />
          </View>
        </View>
      </View>

      // </BaseContainer>
    );
  }
}

MyPolicyDetail.propTypes = {
  currentSelectedPolicy: PropTypes.object,
  navigation: PropTypes.any,
  dateFormat: PropTypes.string,
};

const mapStateToProps = state => ({
  currentSelectedPolicy: state.myPolicy.currentSelectedPolicy,
  dateFormat: path(["meta", "countryCommonMeta", "dateFormat"], state),
  profile: state.profile,
  requiredLinksMeta: path(["meta", "countryCommonMeta"], state),
  transactionLink: path(["myPolicy", "transactionLink"], state),
});

const mapDispatchToProps = dispatch => ({
  dispatchEvent,
});
export default connect(mapStateToProps, mapDispatchToProps)(MyPolicyDetail);

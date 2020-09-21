import React, { Component, PureComponent } from "react";
import { ScrollView, View, Image, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";

import {
  PruBackHeader,
  WPDarkModal,
  WPActionPlanTile,
  WPConfirmModal,
  WPEarnBadges,
  WPConsentModal,
} from "../../components";
import Actions from "../../config/actions";
import Styles from "./styles";
import MetaConstants from "../../meta";
import { WELLNESS_HEARTBEAT } from "../../../../config/images";
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";

import ShadowWrapper from "../../../../components/ShadowWrapper";
import { ConnectedProfileImage } from "../../../../components";

class WPMainScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.didFocusListener = [];
    this.state = {};
    this.metaConstants = { ...MetaConstants.screenMeta() };
  }

  onRefresh = () => {
    this.props.fetchActionPlans();
    this.props.fetchCustomerActionPlans();
    this.props.getCustomerWalletDetail();
  };

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.onRefresh();
      }
    );
    this.props.dispatchEvent(events.wellnessGoalsLanding);
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  returnFilteredActionPlans = () => {
    const { filter } = this.state;
    const { allActionPlans, customerActionPlans } = this.props;
    const customerPlansByID = (customerActionPlans || []).reduce((acc, cur) => {
      acc[cur.actionPlan.id] = cur;
      return acc;
    }, {});
    const mergedPlans = allActionPlans.reduce((acc, cur) => {
      if (customerPlansByID[cur.id]) {
        acc.push(
          Object.assign({}, cur, customerPlansByID[cur.id], { id: cur.id })
        );
      } else {
        const status = cur.status === "LOCKED" ? "LOCKED" : "";
        acc.push(Object.assign({}, cur, { status }));
      }
      return acc;
    }, []);

    return mergedPlans;
  };

  showWellnessModalInDetail = actionPlanId => {
    this.props.dispatchEvent(events.wellnessGoalsMoreInfo);
    const consolidatedActionPlans = this.returnFilteredActionPlans();
    const actionPlan = consolidatedActionPlans.filter(
      plan => plan.id === actionPlanId
    )[0];

    WPDarkModal.show({
      Component: () => (
        <WPActionPlanTile
          actionPlan={actionPlan}
          key={actionPlan.id}
          onJoin={id => this.onJoin(id)}
          inModal={true}
          showWellnessModalInDetail={id => this.showWellnessModalInDetail(id)}
        />
      ),
      isBottomCloseRequired: true,
    });
  };

  showConsentModal = (id, name) => {
    WPDarkModal.show({
      Component: () => (
        <WPConsentModal
          onpress={isConsentAccepted => {
            this.props.joinPlan({ id, isConsentAccepted });
            this.registerEvents(id, name, "wellnessGoalsJoin");
            WPDarkModal.hide();
          }}
        />
      ),
    });
  };

  onJoin = actionPlanId => {
    const consolidatedActionPlans = this.returnFilteredActionPlans();
    const plan = consolidatedActionPlans.filter(
      plan => plan.id === actionPlanId
    )[0];
    const id = plan.id;
    WPDarkModal.hide();
    if (plan.status === "ACTIVE") {
      this.registerEvents(id, plan.name, "wellnessGoalsContinue");
      this.props.navigation.navigate("ActionPlanJoin", {
        actionPlan: id,
        name: plan.name,
      });
    } else if (plan.status === "LOCKED") {
      this.registerEvents(id, plan.name, "wellnessGoalsUnlock");
      if (plan.unlockReward.units > this.props.badges) {
        WPDarkModal.show({
          Component: () => (
            <WPEarnBadges
              availableBadges={plan.unlockReward.units - this.props.badges}
            />
          ),
        });
      } else {
        WPDarkModal.show({
          Component: () => (
            <WPConfirmModal habit={plan} badges={this.props.badges} />
          ),
          positiveText: this.metaConstants.yes_unlock,
          positivePress: () => {
            this.showConsentModal(id, plan.name);
          },
          negativeText: this.metaConstants.wellness_no,
        });
      }
    } else {
      this.showConsentModal(id, plan.name);
    }
  };

  registerEvents = (id, name, event) => {
    events[event].attributes = {
      actionPlanId: id,
      actionPlanName: name,
    };
    this.props.dispatchEvent(events[event]);
  };

  renderProfile = () => {
    return (
      <ConnectedProfileImage
        variant="outline"
        size="medium"
        onPress={() => {
          // this.props.navigation.navigate("WellnessProfile");
        }}
      />
    );
  };

  render() {
    const consolidatedActionPlans = this.returnFilteredActionPlans();

    return (
      <View style={{ backgroundColor: "#ffffff", height: "100%" }}>
        <ShadowWrapper>
          <PruBackHeader
            title={this.metaConstants.wellness_goal_header}
            customStyles={{}}
            rightImage
            rightImageRenderMethod={this.renderProfile}
          />
        </ShadowWrapper>
        <ScrollView>
          <View style={Styles.welcomeContainer}>
            <View style={Styles.welcomeImageContainer}>
              <Image
                style={{ width: 51.3, height: 45.3 }}
                source={WELLNESS_HEARTBEAT}
              />
            </View>
            <View style={{ marginHorizontal: 20, marginRight: 50 }}>
              <View style={Styles.welcomeHeadingContainer}>
                <Text style={Styles.welcomeText}>
                  {this.metaConstants.welcomeTitle}
                </Text>
              </View>
              <View style={Styles.welcomeDescriptionTextContainer}>
                <Text style={Styles.welcomeDescriptionText}>
                  {this.metaConstants.welcomeDescription}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 20, marginVertical: 16 }}>
            {consolidatedActionPlans.map(actionPlan => (
              <WPActionPlanTile
                actionPlan={actionPlan}
                key={actionPlan.id}
                onJoin={id => this.onJoin(id)}
                inModal={false}
                showWellnessModalInDetail={id =>
                  this.showWellnessModalInDetail(id)
                }
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({
  wellnessPlans: { allActionPlans, customerActionPlans, badges },
}) => ({
  allActionPlans,
  badges,
  customerActionPlans,
});

export default connect(mapStateToProps, {
  goTo: Actions.goto,
  fetchActionPlans: Actions.fetchActionPlans,
  joinPlan: Actions.joinPlan,
  fetchCustomerActionPlans: Actions.fetchCustomerActionPlans,
  getCustomerWalletDetail: Actions.getCustomerWalletDetail,
  dispatchEvent,
})(WPMainScreen);

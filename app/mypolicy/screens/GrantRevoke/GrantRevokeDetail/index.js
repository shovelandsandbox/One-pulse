//#region IMPORTS

// PACKAGE IMPORTS
import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

// LOCAL & CONFIG IMPORTS
import { Colors } from "../../../configs";
import Styles from "./style";

// COMPONENT IMPORTS
import Icon from "../../../components/generics/Icon";
import {
  Padder as PadderContainer,
  Base as BaseContainer,
  HorizontalAnimator as HorizontalAnimatorContainer,
  VerticalAnimator as VerticalAnimatorContainer,
  SimpleList as SimpleListContainer,
} from "../../../components/containers";
import {
  ProfileHead as ProfileHeadCard,
  BottomButtonGroup as BottomButtonGroupCard,
  SimpleListRow as SimpleListRowCard,
} from "../../../components/cards";
import { TextS, TextMX } from "../../../components/derivatives/Text";
import {
  TagSuccess,
  TagDanger,
  TagWarning,
} from "../../../components/derivatives/Tag";
import GrantConfirmationModal from "../../../modals/GrantConfirmation";
import RevokeConfirmationModal from "../../../modals/RevokeConfirmation";
import RevokeSuccessModal from "../../../modals/RevokeSuccess";

// DUMMY IMPORTS
import LifeAssuredDetailDummy from "../../../dummies/LifeAssuredDetail";

//#endregion

// MAIN CLASS
export default class GrantRevokeDetail extends Component {
  //#region CONSTRUCTOR AND LIFE CYCLES

  constructor(props) {
    super(props);

    this.state = {
      isGrantConfirmationModalVisible: false,
      isRevokeConfirmationModalVisible: false,
      isRevokeSuccessModalVisible: false,
    };
  }

  //#endregion

  //#region METHODS

  grant() {
    // Actions.AccessControlRegister();

    if (this.state.isGrantConfirmationModalVisible) {
      const _this = this;

      setTimeout(function() {
        _this.setState({ isGrantConfirmationModalVisible: false });
      }, 100);
    }
  }

  // ----------------------------------------

  revoke() {
    this.setState({
      isRevokeSuccessModalVisible: true,
      isRevokeConfirmationModalVisible: false,
    });
  }

  // ----------------------------------------

  revokeDone() {
    // Actions.popTo("AccessControlList");

    const _this = this;

    setTimeout(function() {
      _this.setState({ isRevokeSuccessModalVisible: false });
    }, 200);
  }

  //#endregion

  //#region RENDERS

  static _renderDetail() {
    const { profile } = LifeAssuredDetailDummy;

    return (
      <ProfileHeadCard
        name={profile.name}
        phoneNumber={profile.name}
        email={profile.email}
        image={profile.image}
      />
    );
  }

  // ----------------------------------------

  static _renderInfoItems(label, value, index) {
    return (
      <HorizontalAnimatorContainer order={(index + 2) * 2}>
        <SimpleListRowCard
          label={label}
          value={value}
          backgroundColor={Colors.main.baseWhite}
        />
      </HorizontalAnimatorContainer>
    );
  }

  // ----------------------------------------

  static _renderInfo() {
    const { bio } = LifeAssuredDetailDummy;

    return (
      <SimpleListContainer>
        {GrantRevokeDetail._renderInfoItems("Hubungan", bio.relation, 0)}
        {GrantRevokeDetail._renderInfoItems("Tanggal Lahir", bio.dob, 1)}
      </SimpleListContainer>
    );
  }

  // ----------------------------------------

  static _renderPoliciesItem(policy, index) {
    const { status, name, number, type } = policy;
    const info = `No. Polis: ${number}  •  ${type}`;

    let tagRender = null;
    switch (status) {
      case "LAPSE":
        tagRender = (
          <TagDanger style={Styles.polis.detail.tag}>{status}</TagDanger>
        );
        break;

      case "SURRENDER":
        tagRender = (
          <TagWarning style={Styles.polis.detail.tag}>{status}</TagWarning>
        );
        break;

      default:
      case "INFORCE":
        tagRender = (
          <TagSuccess style={Styles.polis.detail.tag}>AKTIF</TagSuccess>
        );
        break;
    }

    // TODO: Update onPress to navigate to My Policy Detail Screen
    return (
      <HorizontalAnimatorContainer order={(index + 2) * 2} key={index}>
        <TouchableOpacity style={Styles.polis.container} onPress={() => {}}>
          <PadderContainer style={Styles.polis.innerContainer}>
            <View style={Styles.polis.detail.container}>
              {tagRender}

              <TextMX>{name}</TextMX>

              <TextS color={Colors.main.baseGray}>{info}</TextS>
            </View>

            <Icon name="next" color={Colors.main.inactiveGray} />
          </PadderContainer>
        </TouchableOpacity>
      </HorizontalAnimatorContainer>
    );
  }

  // ----------------------------------------

  _renderPolicies() {
    return (
      <SimpleListContainer title={"DAFTAR POLIS TERKAIT"}>
        {LifeAssuredDetailDummy.policies.map((policy, index) => {
          return GrantRevokeDetail._renderPoliciesItem(policy, index);
        })}
      </SimpleListContainer>
    );
  }

  // ----------------------------------------

  _renderBottom() {
    // TODO: Use the line below if the comment below is resolved.
    // let buttonRender = (
    const buttonRender = (
      <BottomButtonGroupCard
        submitLabel={"Beri Akses"}
        onSubmit={() =>
          this.setState({ isGrantConfirmationModalVisible: true })
        }
        // onSubmit={ () => this.grant() }
      />
    );

    // TODO: Update this when the backend is up and running.
    // if (false) {
    //   buttonRender = buttonRender = (
    //     <BottomButtonGroupCard
    //       submitLabel={"Cabut"}
    //       onSubmit={() =>
    //         this.setState({ isRevokeConfirmationModalVisible: true })
    //       }
    //     />
    //   );
    // }

    return (
      <VerticalAnimatorContainer
        order={this.props.bottomOrder ? this.props.bottomOrder : 5}
      >
        {buttonRender}
      </VerticalAnimatorContainer>
    );
  }

  //#endregion

  render() {
    return (
      <BaseContainer
        bottomContent={this._renderBottom()}
        onBackPress={() => this.props.navigation.pop()}
      >
        <HorizontalAnimatorContainer order={1}>
          {GrantRevokeDetail._renderDetail()}
        </HorizontalAnimatorContainer>

        {GrantRevokeDetail._renderInfo()}

        {this._renderPolicies()}

        <View style={Styles.bottomPadding} />

        <GrantConfirmationModal
          isActive={this.state.isGrantConfirmationModalVisible}
          onConfirm={() => this.grant()}
          onCancel={() =>
            this.setState({ isGrantConfirmationModalVisible: false })
          }
          name={LifeAssuredDetailDummy.profile.name}
        />

        <RevokeConfirmationModal
          isActive={this.state.isRevokeConfirmationModalVisible}
          onConfirm={() => this.revoke()}
          onCancel={() =>
            this.setState({ isRevokeConfirmationModalVisible: false })
          }
          name={LifeAssuredDetailDummy.profile.name}
        />

        <RevokeSuccessModal
          isActive={this.state.isRevokeSuccessModalVisible}
          onConfirm={() => this.revokeDone()}
          name={LifeAssuredDetailDummy.profile.name}
        />
      </BaseContainer>
    );
  }

  // ----------------------------------------
}

GrantRevokeDetail.propTypes = {
  bottomOrder: PropTypes.number,
  navigation: PropTypes.any,
};

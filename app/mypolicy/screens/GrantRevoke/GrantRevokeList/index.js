//#region IMPORTS

// PACKAGE IMPORTS
import React, { Component, Fragment } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { uniqBy } from "lodash";
import { CoreConfig, CoreActionTypes } from "@pru-rt-internal/pulse-common";

// STYLE AND CONFIG IMPORTS
import Styles from "./style";
import { convertToCapitalCase } from "../../../utils";

// COMPONENT IMPORTS
import { TextLX } from "../../../components/derivatives/Text";
import { LifeAssuredAccessRow as LifeAssuredAccessRowCard } from "../../../components/cards";
import {
  Base as BaseContainer,
  HorizontalAnimator as HorizontalAnimatorContainer,
  Padder as PadderContainer
} from "../../../components/containers";
import {
  RevokeConfirmation as RevokeConfirmationModal,
  RevokeSuccess as RevokeSuccessModal
} from "../../../modals";

// CONSTANTS FROM COMMON
const {
  ACCESS_CONTROL_LIST_SCREEN,
  ACCESS_CONTROL_REGISTER_SCREEN
} = CoreConfig.pageKeys;

const {
  ACCESS_CONTROL_REGISTER_LOAD,
  GET_LIFE_ASSURED_LIST_FAILED,
  GET_LIFE_ASSURED_LIST_FETCH,
  GET_LIFE_ASSURED_LIST_SUCCESS,
  REVOKE_ACCESS_FAILED,
  REVOKE_ACCESS_FETCH,
  REVOKE_ACCESS_SUCCESS
} = CoreActionTypes;

//#endregion

class MPolicyAccessControlList extends Component {
  //#region CONSTRUCTOR AND LIFECYCLE HOOKS

  constructor(props) {
    super(props);

    this.state = {
      fetch: true,
      isRevokeConfirmationModalVisible: false,
      isRevokeSuccessModalVisible: false,
      lifeAssuredList: [],
      revokeVictim: {}
    };

    this.revokeDone = this.revokeDone.bind(this);
    this.handleReduxActions = this.handleReduxActions.bind(this);
    this.showError = this.showError.bind(this);
    this.renderLifeAssuredsItem = this.renderLifeAssuredsItem.bind(this);
    this.renderLifeAssureds = this.renderLifeAssureds.bind(this);
    this.onRevokePress = this.onRevokePress.bind(this);
    this.handleRevoke = this.handleRevoke.bind(this);
  }

  componentDidMount() {
    this.props.loadLifeAssuredList();
  }

  componentDidUpdate(prevProps) {
    const { action } = this.props;
    if (action !== prevProps.action) {
      this.handleReduxActions(action);
    }
  }

  //#endregion

  //#region CLASS FUNCTIONS

  handleReduxActions(action) {
    const actions = {
      [GET_LIFE_ASSURED_LIST_FETCH]: () => this.setState({ fetch: true }),
      [GET_LIFE_ASSURED_LIST_SUCCESS]: () => {
        const uniqList = uniqBy(
          this.props.lifeAssuredListResponse.body,
          item => item.clientId
        );
        this.setState({ fetch: false, lifeAssuredList: uniqList });
      },
      [GET_LIFE_ASSURED_LIST_FAILED]: () => this.showError(),
      [REVOKE_ACCESS_SUCCESS]: () => {
        this.setState({
          isRevokeConfirmationModalVisible: false,
          isRevokeSuccessModalVisible: true
        });
      },
      [REVOKE_ACCESS_FAILED]: () => {
        Alert.alert("Error", JSON.stringify(this.props.revokeAccessError));
      },
      DEFAULT: () => {}
    };

    return (actions[action] || actions.DEFAULT)();
  }

  showError() {
    const { lifeAssuredListError, navigation } = this.props;
    Alert.alert(
      "Error",
      `Something bad happened: \n ${JSON.stringify(lifeAssuredListError)}`,
      [
        {
          text: "OK",
          onPress: () => navigation.pop()
        }
      ]
    );
  }

  handleRevoke() {
    this.props.onRequestRevokeAccess({
      ...this.state.revokeVictim,
      phone: this.state.revokeVictim.phone || ""
    });
  }

  onRevokePress(lifeAssured) {
    this.setState({
      revokeVictim: lifeAssured,
      isRevokeConfirmationModalVisible: true
    });
  }

  revokeDone() {
    this.setState({ isRevokeSuccessModalVisible: false }, () =>
      this.props.loadLifeAssuredList()
    );
  }

  //#endregion

  //#region RENDERS

  static renderHeader() {
    return (
      <PadderContainer style={Styles.title.container}>
        <TextLX>Akses Tertanggung</TextLX>
        <TextLX>(Life Assured)</TextLX>
      </PadderContainer>
    );
  }

  renderLifeAssuredsItem(lifeAssured, index) {
    //#region Life Assured Data
    const name = lifeAssured.name;
    const phoneNumber = lifeAssured.phone || "";
    const hasPaid = lifeAssured.hasPaid || true;
    const isUnderAge = lifeAssured.age ? lifeAssured.age < 18 : false;
    const hasAccess = lifeAssured.granted || false;
    const isHolder = lifeAssured.isHolder || false;
    //#endregion

    return (
      <HorizontalAnimatorContainer key={index} order={(index + 2) * 2}>
        <LifeAssuredAccessRowCard
          key={index}
          name={convertToCapitalCase(name, false)}
          phoneNumber={phoneNumber}
          hasPaid={hasPaid}
          isUnderAge={isUnderAge}
          hasAccess={hasAccess}
          // TODO: Add navigation to Profile Screen
          onPress={() => {}}
          onGrantPress={() =>
            this.props.loadRegisterGrantScreen({
              lifeAssuredData: lifeAssured,
              context: ACCESS_CONTROL_LIST_SCREEN
            })
          }
          onRevokePress={() => this.onRevokePress(lifeAssured)}
          isHolder={isHolder}
        />
      </HorizontalAnimatorContainer>
    );
  }

  renderLifeAssureds() {
    const { lifeAssuredList: lifeAssureds } = this.state;

    return (
      <View>
        {lifeAssureds.map((la, index) => {
          return this.renderLifeAssuredsItem(la, index);
        })}
      </View>
    );
  }

  //#endregion

  render() {
    const revokeName = this.state.revokeVictim.name
      ? convertToCapitalCase(this.state.revokeVictim.name, false)
      : "";

    return (
      <BaseContainer
        hasFooter
        persistScrollTitle="Akses Tertanggung (Life Assured)"
        onBackPress={() => this.props.navigation.pop()}
      >
        {this.state.fetch ? (
          <ActivityIndicator />
        ) : (
          <Fragment>
            <HorizontalAnimatorContainer order={2}>
              {MPolicyAccessControlList.renderHeader()}
            </HorizontalAnimatorContainer>

            {this.renderLifeAssureds()}
          </Fragment>
        )}

        <RevokeConfirmationModal
          isActive={this.state.isRevokeConfirmationModalVisible}
          onConfirm={this.handleRevoke}
          onCancel={() =>
            this.setState({ isRevokeConfirmationModalVisible: false })
          }
          name={revokeName}
        />

        <RevokeSuccessModal
          isActive={this.state.isRevokeSuccessModalVisible}
          onConfirm={this.revokeDone}
          name={revokeName}
        />
      </BaseContainer>
    );
  }
}

//#region PROP TYPES

MPolicyAccessControlList.propTypes = {
  navigation: PropTypes.any,
  loadLifeAssuredList: PropTypes.func,
  action: PropTypes.string,
  lifeAssuredListResponse: PropTypes.object,
  lifeAssuredListError: PropTypes.object,
  loadRegisterGrantScreen: PropTypes.func,
  onRequestRevokeAccess: PropTypes.func,
  revokeAccessError: PropTypes.object
};

//#endregion

//#region REDUX BINDINGS

const mapStateToProps = state => ({
  action: state.mpolicyAccessControl.action,
  lifeAssuredListResponse: state.mpolicyAccessControl.lifeAssuredListResponse,
  lifeAssuredListError: state.mpolicyAccessControl.lifeAssuredListError,
  revokeAccessError: state.mpolicyAccessControl.revokeAccessError
});

const mapDispatchToProps = dispatch => ({
  loadLifeAssuredList: () => {
    dispatch({
      context: ACCESS_CONTROL_LIST_SCREEN,
      type: GET_LIFE_ASSURED_LIST_FETCH
    });
  },
  loadRegisterGrantScreen: payload => {
    dispatch({
      context: ACCESS_CONTROL_REGISTER_SCREEN,
      type: ACCESS_CONTROL_REGISTER_LOAD,
      payload
    });
  },
  onRequestRevokeAccess: payload => {
    dispatch({
      context: ACCESS_CONTROL_LIST_SCREEN,
      type: REVOKE_ACCESS_FETCH,
      payload
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MPolicyAccessControlList);

//#endregion

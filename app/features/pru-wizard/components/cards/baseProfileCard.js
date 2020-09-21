import React, { PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import {
  isNil,
  pathOr,
  isEmpty,
  path,
  forEachObjIndexed,
  assocPath,
} from "ramda";
import { PropTypes } from "prop-types";
import {
  goToProductJourney,
  updateProfile,
  createPlatformEvent,
} from "../../actions";
import { validate } from "./validation-util";

class BaseProfileCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      values: {},
      fieldErrors: {},
    };
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  componentWillReceiveProps(nextProps) {
    const { config, profile } = nextProps;
    const { fields } = config;
    const { values } = this.state;
    let newValues = { ...values };

    forEachObjIndexed(fieldDef => {
      const { model } = fieldDef;
      const modelPath = model.split(".");
      newValues = assocPath(modelPath, path(modelPath, profile), newValues);
    }, fields);
    this.setState({
      values: newValues,
    });
  }

  onChangeText = (model, newVal) => {
    this.resetErrors(model);
    const { values } = this.state;
    const newValues = assocPath(model.split("."), newVal, values);
    this.setState({
      values: newValues,
    });
  };

  resetErrors = model => {
    const { fieldErrors } = this.state;
    const newFieldErrors = assocPath(model.split("."), "", fieldErrors);
    this.setState({
      fieldErrors: newFieldErrors,
    });
  };

  updateState = (stateKey, model, value) => {
    const newStateValues = assocPath(
      model.split("."),
      value,
      this.state[stateKey]
    );
    this.setState({
      [stateKey]: newStateValues,
    });
  };

  dispatchActions = val => {
    const {
      config: { actions = [] },
      dispatchAction,
    } = this.props;

    actions.map(action => {
      const { context, type, payloadValue } = action;
      const realPayload = {
        [payloadValue]: val,
      };
      dispatchAction(context, type, realPayload);
    });
  };

  process = () => {
    const { values } = this.state;
    const { config } = this.props;
    const { fields } = config;

    let hasErrors = false;
    const allErrors = [];
    let fieldErrors = {};
    forEachObjIndexed(fieldDef => {
      const { model } = fieldDef;
      const value = path(model.split("."), values);
      const errors = validate(fieldDef, value);
      fieldErrors = assocPath(model.split("."), errors, fieldErrors);
      if (!isNil(errors) && !isEmpty(errors)) {
        allErrors.push(errors);
        hasErrors = true;
      } else {
        this.props.updateProfile(model, value);
        this.dispatchActions(value);
      }
    }, fields);

    this.setState({ fieldErrors });

    return {
      errors: allErrors,
      success: !hasErrors,
    };
  };

  render() {
    const { containerStyle, SubComponent } = this.props;
    const { fieldErrors, values } = this.state;
    return (
      <View style={{ ...containerStyle }}>
        <SubComponent
          {...this.props}
          fieldErrors={fieldErrors}
          onChange={this.onChangeText}
          fieldValues={values}
          resetErrors={this.resetErrors}
        ></SubComponent>
      </View>
    );
  }
}

BaseProfileCard.propTypes = {
  config: PropTypes.object,
  SubComponent: PropTypes.object,
  containerStyle: PropTypes.object,
  updateProfile: PropTypes.func,
  onRef: PropTypes.func,
  goToProductJourney: PropTypes.func,
  productInfo: PropTypes.func,
  validationKeys: PropTypes.array,
  children: PropTypes.object,
  createPlatformEvent: PropTypes.func,
  profile: PropTypes.object,
  currentScreen: PropTypes.object,
  language: PropTypes.string,
  languageList: PropTypes.array,
};

BaseProfileCard.defaultProps = {
  containerStyle: {},
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    countryCommonMeta: state.meta.countryCommonMeta,
    language: pathOr("", ["userPreferences", "language"], state),
    languageList: state.meta.languageList,
  };
};

const mapDispatchToProps = {
  dispatchAction: (context, type, payload) => ({
    context,
    type,
    payload,
  }),
  updateProfile,
  goToProductJourney,
  createPlatformEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseProfileCard);

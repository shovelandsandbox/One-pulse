import React, { Component } from "react";
import { Text, View, Alert } from "react-native";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import { findIndex } from "ramda";
import PropTypes from "prop-types";
import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers,
  CoreUtils,
  events
} from "@pru-rt-internal/pulse-common";
import { dispatchEvent } from "../../actions";
import { BabylonActions } from "@pru-rt-internal/react-native-babylon-chatbot";
import { connect } from "react-redux";
import styles from "./styles";
import { NavigationActions } from "react-navigation";

const { pageKeys } = CoreConfig;
const { colors, SCREEN_KEY_CHANGE_LANGUAGE } = CoreConfig;
const helpers = metaHelpers;
const { KEY_GENERIC_ERROR } = CoreConfig;
const { logFirebaseEvent } = CoreUtils;

class ChangeLanguage extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.meta.metaDetail != this.props.meta.metaDetail) {
      const setParamsAction = NavigationActions.setParams({
        params: {},
        key: 'Accounts'
      })
      this.props.navigation.dispatch(setParamsAction)
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.meta.metaError && !nextProps.meta.refreshImage) {
      const metaError = metaHelpers.findCommonErrorMessages(KEY_GENERIC_ERROR)
        .message;
      Alert.alert(metaError);
    }
  }

  getSelectedIndex() {
    const { language, languageList } = this.props;
    const index = findIndex(l => l.languageCode === language, languageList);
    return index > 0 ? index : 0;
  }

  handleLanguageSelected = languageCode => {
    const { language } = this.props;
    if (languageCode !== language) {
      logFirebaseEvent("lp_language_toggle", { language: languageCode });
      events.LanguageChangeToggleClick.type = languageCode;
      this.props.dispatchEvent(events.LanguageChangeToggleClick);
      this.props.changeLanguage(languageCode);
      BabylonActions.setCurrentLanguageInBabylon(languageCode);
    }
  };

  render() {
    const { languageList } = this.props;
    const changeLanguage = helpers.findScreen(SCREEN_KEY_CHANGE_LANGUAGE).label;

    return (
      <React.Fragment>
        <Text style={styles.heading}>{changeLanguage}</Text>
        <View>
          <RadioGroup
            size={35}
            thickness={1}
            color={colors.whitishgrey}
            selectedIndex={this.getSelectedIndex()}
            onSelect={(index, value) => this.handleLanguageSelected(value)}
          >
            {languageList.map(data => (
              <RadioButton
                key={data.languageCode}
                value={data.languageCode}
                color={colors.crimson}
                style={styles.radioButton}
                onClick={() => this.handleLanguageSelected(data.languageCode)}
              >
                <Text style={styles.text}>{data.language}</Text>
              </RadioButton>
            ))}
          </RadioGroup>
        </View>
      </React.Fragment>
    );
  }
}

ChangeLanguage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  language: PropTypes.string.isRequired,
  languageList: PropTypes.instanceOf(Array).isRequired,
  meta: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  language: state.userPreferences.language,
  languageList: state.meta.languageList,
  meta: state.meta,
});

export default connect(
  mapStateToProps,
  {
    changeLanguage: selectedLanguage => ({
      context: pageKeys.CHANGE_LANGUAGE_PAGE,
      type: CoreActionTypes.FETCH_META,
      payload: { languageId: selectedLanguage },
    }),
    dispatchEvent
  }
)(ChangeLanguage);

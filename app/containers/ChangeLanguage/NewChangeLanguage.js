import React, { Component } from "react";
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  DeviceEventEmitter,
} from "react-native";
import { findIndex } from "ramda";
import PropTypes from "prop-types";
import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";
import { BabylonActions } from "@pru-rt-internal/react-native-babylon-chatbot";
import { connect } from "react-redux";
import styles from "./styles";
import SelectionCell from "../../components/SelectionCell";
import { PruHeaderText } from "../../components";
import { BACK } from "../../config/images";
import { NavigationActions } from "react-navigation";
import { gotoHomeTab } from "../../actions";
const { pageKeys } = CoreConfig;
const { NEW_LANGUAGR, LANGUAGR } = CoreConfig;
const helpers = metaHelpers;
const { KEY_GENERIC_ERROR } = CoreConfig;

class NewChangeLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCode: null
    };
  }

  componentDidMount() {
    this.setState({ languageCode: this.props.language });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.meta.metaDetail != this.props.meta.metaDetail) {
      const setParamsAction = NavigationActions.setParams({
        params: {},
        key: "Accounts"
      });
      this.props.navigation.dispatch(setParamsAction);
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
      this.props.changeLanguage(languageCode);
      this.props.updatePreferenceLanguage(languageCode);
      BabylonActions.setCurrentLanguageInBabylon(languageCode);
    }
  };

  onBackPress = () => {
    const { language } = this.props;
    if (this.state.languageCode !== language) {
      this.props.gotoHomeTab();
    } else {
      this.props.navigation.goBack();
    }
  };

  render() {
    const { language, languageList } = this.props;

    return (
      <View style={styles.contain}>
        <View
          style={[
            {
              width: "100%",
              height: 52,
              backgroundColor: "#ffffff",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
              DeviceEventEmitter.emit("refreshFun", null);
              DeviceEventEmitter.emit("translateDateFun", null);
            }}
            style={{
              width: 55,
              height: 55,
              alignItems: "flex-start",
              justifyContent: "center"
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                left: 0
              }}
              source={BACK}
            />
          </TouchableOpacity>
        </View>
        <PruHeaderText text={helpers.findElement(NEW_LANGUAGR, LANGUAGR).label} style={styles.heading} />
        <View
          style={{
            paddingHorizontal: 20,
            width: "100%"
          }}
        >
          {languageList.map(data => (
            <SelectionCell
              isSelected={language === data.languageCode}
              labelText={helpers.findElement(NEW_LANGUAGR, data.languageCode).label}
              onSelected={() => this.handleLanguageSelected(data.languageCode)}
            />
          ))}
        </View>
      </View>
    );
  }
}

NewChangeLanguage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  language: PropTypes.string.isRequired,
  languageList: PropTypes.instanceOf(Array).isRequired,
  meta: PropTypes.instanceOf(Object).isRequired
};

const mapStateToProps = state => ({
  language: state.userPreferences.language,
  languageList: state.meta.languageList,
  meta: state.meta
});

export default connect(mapStateToProps, {
  changeLanguage: selectedLanguage => ({
    context: pageKeys.CHANGE_LANGUAGE_PAGE,
    type: CoreActionTypes.FETCH_META,
    payload: { languageId: selectedLanguage }
  }),
  GET_CUSTOMER_DETAILS: payload => ({
    context: pageKeys.PROFILE,
    type: CoreActionTypes.GET_CUSTOMER_DETAILS
  }),
  updatePreferenceLanguage: value => ({
    context: "COMMON_UPDATE_CUSTOMER",
    type: "UPDATE_PREFFERED_LANGUAGE",
    payload: { value }
  }),
  gotoHomeTab
})(NewChangeLanguage);

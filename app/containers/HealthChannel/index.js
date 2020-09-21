import React, { PureComponent } from "react";
import { View, ScrollView, Platform } from "react-native";
import { connect } from "react-redux";
import { getScreenRenderingConfig } from "../../actions";
import { PruBackHeader } from "../../components";
import PropTypes from "prop-types";
import { pathOr, forEach } from "ramda";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HealthChannelTab from "../../components/HealthChannelTab";
import VerticalGroupedLayout from "../../components/ScreenLayouts/VerticalGroupedLayout";
import { safeMetaLabelFinder } from "../../utils/meta-utils";

class HealthChannel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      headersTab: [],
      selectedTab: "",
      headerText: "",
    };
  }

  UNSAFE_componentWillMount() {
    const { userPreferences } = this.props;
    const channelId = this.props.navigation.state.params.channelId;
    this.props.getScreenRenderingConfig({
      id: `m::ui::${channelId}_${userPreferences.language}`,
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.userPreferences.language !== this.props.userPreferences.language
    ) {
      const channelId = this.props.navigation.state.params.channelId;
      this.props.getScreenRenderingConfig({
        id: `m::ui::${channelId}_${this.props.userPreferences.language}`,
      });
    }
  }

  componentDidMount() {
    const {
      homeScreenConfig,
      navigation,
      getScreenRenderingConfig,
      userPreferences,
    } = this.props;
    const channelId = navigation.state.params.channelId;
    const headerObject = this.getHealthChannels(
      homeScreenConfig,
      "HealthChannels"
    );
    getScreenRenderingConfig({
      id: `m::ui::${channelId}_${userPreferences.language}`,
    });
    this.setState({
      headersTab: headerObject.headersTab,
      selectedTab: channelId,
      headerText: headerObject.header,
    });
  }

  renderGrid = () => {
    const { healthChannelScreenConfig } = this.props;
    return (
      <VerticalGroupedLayout
        config={healthChannelScreenConfig}
        transform={true}
      />
    );
  };

  onRefresh = () => {
    const channelId = pathOr(
      "",
      ["navigation", "state", "params", "channelId"],
      this.props
    );
    this.props.getScreenRenderingConfig({
      id: `m::ui::${channelId}_${this.props.userPreferences.language}`,
    });
  };

  getHealthChannels = (homeScreenConfig, category) => {
    if (this.props.useDynamicHomeScreen)
      return this.getHealthChannelsForDynamicScreen(category);
    const healthChannelsConfig = homeScreenConfig.components.filter(item => {
      return item.data[0].properties.category == category;
    });
    if (!(healthChannelsConfig && healthChannelsConfig.length)) return {};
    const header = healthChannelsConfig[0].title;
    const healthChannelsComponent = healthChannelsConfig[0].data[0].components;
    const headersTab = [];
    for (let i = 0; i < healthChannelsComponent.length; i++) {
      headersTab.push(
        healthChannelsComponent[i].actions[0].actionsToDispatch[0].payload
          .params
      );
    }
    return { headersTab, header };
  };

  getHealthChannelsForDynamicScreen = category => {
    const channels = pathOr(
      "",
      ["navigation", "state", "params", "channels"],
      this.props
    );

    const headersTab = [];
    const getHeaderLabels = channelId => headersTab.push({
      channelId: channelId,
      channelName: safeMetaLabelFinder("healthChannel", channelId),
    });

    forEach(getHeaderLabels, channels);
    const header = safeMetaLabelFinder("healthChannel", category);
    return { headersTab, header };
  };

  updateFilter = filter => {
    this.setState({ selectedTab: filter });
    const { getScreenRenderingConfig, userPreferences } = this.props;
    getScreenRenderingConfig({
      id: `m::ui::${filter}_${userPreferences.language}`,
    });
  };

  render() {
    const { headersTab, selectedTab, headerText } = this.state;
    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={{ flexGrow: 1 }}
        extraScrollHeight={Platform.OS == "ios" ? 10 : 50}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#f7f5f8",
            position: "relative",
          }}
        >
          <PruBackHeader title={headerText} />
          <View style={{ height: 35, backgroundColor: "#fff", width: "100%" }}>
            <HealthChannelTab
              onPress={filter => this.updateFilter(filter)}
              selectedValue={selectedTab}
              filters={headersTab}
            />
          </View>
          <ScrollView
            scrollEventThrottle={100}
            style={{
              marginHorizontal: 0,
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View>{this.renderGrid()}</View>
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

HealthChannel.propTypes = {
  homeScreenConfig: PropTypes.object,
  healthChannelScreenConfig: PropTypes.object,
  navigation: PropTypes.object,
  getScreenRenderingConfig: PropTypes.func,
  userPreferences: PropTypes.object,
  useDynamicHomeScreen: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    userPreferences: state.userPreferences,
    healthChannelScreenConfig: pathOr(
      {},
      ["screenConfig", "HealthChannel"],
      state
    ),
    useDynamicHomeScreen: state.meta.countryCommonMeta.useDynamicHomeScreen,
    homeScreenConfig: pathOr({}, ["screenConfig", "Home"], state),
  };
};

export default connect(mapStateToProps, {
  getScreenRenderingConfig,
})(HealthChannel);

import React, { PureComponent } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
  Image
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import VerticalGroupedLayout from "../../components/ScreenLayouts/VerticalGroupedLayout";
import PulseAppHeader from "../../components/PulseAppHeader";
import {
  getScreenRenderingConfig
} from "../../actions";
import MetaConstants from "./meta";
import {
  safeMetaLabelFinder
} from "../../utils/meta-utils";
import {
  POLICY_UPCOMING_IMAGE
} from "../../config/images";

const { width: screenWidth } = Dimensions.get("window");

class PolicyTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      reachedScrollEnd: false
    };
    this.MetaConstants = {
      ...MetaConstants.initializeScreenMeta()
    };
    this.didFocusListener = [];
  }

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.onRefresh();
      }
    );
  }

  onRefresh = () => {
    this.props.getScreenRenderingConfig({
      id: `m::ui::policyTab_${this.props.userPreferences.language}`,
    });
  };

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  renderHeader = () => {
    return <PulseAppHeader />;
  };

  renderPoliciesUpcomingView = () => {
    return (
      <View>
        <View
          style={styles.policyUpcomingContainer}
        >
          <Image
            source={POLICY_UPCOMING_IMAGE}
            style={styles.policyUpcomingImage}
            resizeMode={"contain"}
          />
        </View>
        <View
          style={styles.comingSoonContainer}
        >
          <Text
            style={styles.comingSoonText}
          >
            {this.MetaConstants.comingSoonText}
          </Text>
        </View>
      </View>
    );
  };

  renderPolicyProducts = (gridConfig) => {
    return (
      <View>
        <View
          style={styles.pulseProductsContainer}
        >
          <Text
            style={styles.pulseProductsText}
          >
            {this.MetaConstants.pulseProductsText}
          </Text>
        </View>
        {this.renderGrid(gridConfig)}
      </View>
    );
  };

  renderGrid = (gridConfig) => {
    return (
      <VerticalGroupedLayout
        config={gridConfig}
        transform={true}
        baseContainerStyle={{}}
      />
    );
  };

  showThatsAll = () => {
    if (this.MetaConstants.thatsAllConfig == "enable")
      return (
        <View style={styles.bottomMessageContainer}>
          <Text style={JSON.parse(this.MetaConstants.thatsAllStyle)}>{this.MetaConstants.thatsAllText}</Text>
        </View>
      )
    return null
  }

  render() {
    const { gridConfig, policyResponseStatus } = this.props;
    const MyPolicyGrid = gridConfig && gridConfig.components && gridConfig.components[0] ?
    {
      components: gridConfig.components.slice(0, 1)
    } : {
      components: []
    };
    const PolicyProductsGrid = gridConfig && gridConfig.components && gridConfig.components.length > 1 ?
    {
      components: gridConfig.components.slice(1, gridConfig.components.length)
    } : {
      components: []
    };
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView
          style={{
            marginHorizontal: 0,
          }}
          refreshControl={
            <RefreshControl
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
            />
          }
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={() => this.setState({ reachedScrollEnd: true })}
        >
          {
            policyResponseStatus && gridConfig && gridConfig.components && gridConfig.components.length === 0 ? 
              this.renderPoliciesUpcomingView() : null
          }
          {
            MyPolicyGrid && MyPolicyGrid.components && MyPolicyGrid.components.length > 0 ?
              this.renderGrid(MyPolicyGrid) : null
          }
          {
            PolicyProductsGrid && PolicyProductsGrid.components && PolicyProductsGrid.components.length > 0 ?
              this.renderPolicyProducts(PolicyProductsGrid) : null
          }
          {
            gridConfig && gridConfig.components && gridConfig.components.length > 0 &&
              this.state.reachedScrollEnd ? this.showThatsAll() : null
          }
        </ScrollView>
      </View>
    );
  }
}

PolicyTab.propTypes = {
  gridConfig: PropTypes.object,
  getScreenRenderingConfig: PropTypes.func,
  userPreferences: PropTypes.object,
  navigation: PropTypes.object
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  policyUpcomingContainer: {
    padding: 50,
    justifyContent: "center",
    alignItems: 'center',
  },
  policyUpcomingImage: {
    height: window.height - 350,
    width: window.width - 150,
    overflow: "visible",
  },
  comingSoonContainer: {
    justifyContent: "center",
    alignItems: 'center',
  },
  comingSoonText: {
    fontSize: 30,
    fontFamily: "Avenir-Heavy",
    color: "#393939"
  },
  bottomMessageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  pulseProductsContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 15,
    paddingTop: 15
  },
  pulseProductsText: {
    fontSize: 20,
    fontFamily: "Avenir-Heavy",
    color: "#2f2f2f"
  }
});

const mapStateToProps = state => {
  return {
    userPreferences: state.userPreferences,
    gridConfig: state.screenConfig.MyPolicies,
    policyResponseStatus: state.screenConfig.MyPolicyResponseReceived,
    safeMetaLabelFinder
  };
};

export default connect(mapStateToProps, {
  getScreenRenderingConfig,
})(PolicyTab);
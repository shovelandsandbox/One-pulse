import React, { Component } from "react";
import {
  Text,
  View,
  WebView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import {
  metaHelpers,
  CoreComponents,
  CoreActions,
  CoreConfig,
  CoreActionTypes,
} from "@pru-rt-internal/pulse-common";
const { AIMEHeader } = CoreComponents;
const { AIMENewsFeed, AIMENewsFeedById, resetAIMENewsFeedByID } = CoreActions;
const { toggleLoader } = CoreActions;
import { connect } from "react-redux";

const { HEALTH_TIP_SCREEN } = CoreConfig;
const { colors } = CoreConfig;
const { HealthTipImage } = CoreComponents;

const { pageKeys } = CoreConfig;
const helpers = metaHelpers;
const HEALTH_NEWS = "healthnews";
const regularFont = Platform.OS === "ios" ? "PruSansNormal" : "pru-regular";

class HealthTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    const { width } = Dimensions.get("window");
    this.widthTouchable = width * 0.75;
    this.healthNewsLabel = "";
  }

  componentDidMount() {
    const { setParentHeight } = this.props;
    setParentHeight(100);
    this.props.mountIntoView();
    this.props.getNewsFeedAction(this.props.token);

    //this.props.AIMENewsFeed(this.props.token, this.props.mountIntoView);
  }

  componentWillReceiveProps(nextProps) {
    const { toggleLoader } = this.props;
    if (
      ((((nextProps.aimeNewsFeed || {}).riskzone || {}).AIMENewsFeedByID || {})
        .content || "") !== ""
    ) {
      toggleLoader(false);
    }
  }

  componentWillUnmount() {
    const { toggleLoader } = this.props;
    toggleLoader(false);
  }

  openModal = id => {
    const { token, toggleLoader } = this.props;
    toggleLoader(true);
    this.setState({
      isModalOpen: true,
    });
    const idStr =  id.toString();
    this.props.getNewsFeedByIDAction(token, idStr);
    // this.props.AIMENewsFeedById(token, id);
  };
  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
    this.props.resetAIMENewsFeedByIDAction();
  };
  getStatusBarHeight() {
    const { height, width } = Dimensions.get("window");
    if (height >= 812 || width >= 812) {
      return 30;
    }
    return 20;
  }

  /* eslint-disable complexity */
  renderContents = () => {
    const statusHeight = this.getStatusBarHeight();
    if (
      this.state.isModalOpen &&
      ((((this.props.aimeNewsFeed || {}).riskzone || {}).AIMENewsFeedByID || {})
        .content || "") !== ""
    ) {
      return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isModalOpen}
          onBackButtonPress={this.closeModal}
          style={{margin:0, padding: 0}}
        >
          {Platform.OS === "ios" && (
            <View
              style={{
                height: statusHeight,
                backgroundColor: colors.statusBarColor,
              }}
            />
          )}
          <AIMEHeader
            leftIconType="back"
            onLeftPress={e => {
              this.closeModal();
            }}
            showRightIcon={false}
          />
          <WebView
            originWhitelist={["*"]}
            source={{
              html: this.props.aimeNewsFeed.riskzone.AIMENewsFeedByID.content,
            }}
            useWebKit={true}
            scalesPageToFit={false}
          />
        </Modal>
      );
    } else if (
      (((this.props.aimeNewsFeed || {}).riskzone || {}).AIMENewsFeed || [])
        .length > 0
    ) {
      return (
        <FlatList
          data={this.props.aimeNewsFeed.riskzone.AIMENewsFeed}
          style={{ flex: 1 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const feedBgUrl = item.thumbnail;
            return (
              <View key={index} style={styles.itemContainer}>
                <TouchableOpacity
                  style={{ flex: 1, width: this.widthTouchable }}
                  key={item.id}
                  onPress={() => this.openModal(item.id)}
                >
                  <HealthTipImage item={item} imageURL={feedBgUrl} />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      );
    }
    return (
      <View>
        <Text style={styles.loadingContainer}> Loading....</Text>
      </View>
    );
  };
  render() {
    this.healthNewsLabel = metaHelpers.findElement(
      HEALTH_TIP_SCREEN,
      HEALTH_NEWS
    ).label;
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <Text
          style={{ fontSize: 20, paddingLeft: 20, fontFamily: regularFont }}
        >
          {this.healthNewsLabel}
        </Text>
        {this.renderContents()}
      </View>
    );
  }
}

HealthTip.propTypes = {
  toggleLoader: PropTypes.func,
};

const mapStateToProps = state => ({
  meta: state.meta,
  aimeNewsFeed: state.riskzone,
  token: state.auth.token,
});

export default connect(
  mapStateToProps,
  {
    AIMENewsFeed,
    AIMENewsFeedById,
    resetAIMENewsFeedByID,
    toggleLoader,
    getNewsFeedAction: token => ({
      context: pageKeys.AIME_TRENDS,
      type: CoreActionTypes.AIME_GET_NEWS_FEED,
      payload: {
        token: token,
        category: "news",
        subcategory: "health",
      },
    }),
    getNewsFeedByIDAction: (token, id) => ({
      context: pageKeys.AIME_TRENDS,
      type: CoreActionTypes.AIME_GET_NEWS_FEED_BY_ID,
      payload: {
        token: token,
        category: "news",
        subcategory: "health",
        id: id,
      },
    }),
    resetAIMENewsFeedByIDAction: () => ({
      type: CoreActionTypes.RESET_AIME_NEWS_BY_ID,
    }),
  }
)(HealthTip);

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    justifyContent: "center",
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  loadingContainer: {
    fontFamily: regularFont,
    fontSize: 25,
    padding: 30,
    textAlign: "center",
  },
});

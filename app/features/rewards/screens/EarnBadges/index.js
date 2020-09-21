import React, { PureComponent } from "react";
import { View, FlatList } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { PruBackHeader } from "../../../../components";
import { EarnBadgeRowItem } from "../../components";
import styles from "./styles";
import { goToScreens } from "../../actions";
import { metaFinderRewards } from "../../configs/meta-utils";
import { BONUS_ACTIVITY_LIST, EARN_BADGES } from "../../configs/metaConstant";
import MetaConstants from "../../meta";
import { CoreActions } from "@pru-rt-internal/pulse-common";

const { setEntreBabylon } = CoreActions;
class EarnBadges extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bonusActivityList: [],
    };
    this.MetaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    //const bonusActivityList = metaFinderRewards(BONUS_ACTIVITY_LIST);
    const bonusActivityList = this.MetaConstants.bonusActivityList;
    // bonusActivityList.sort((x, y) =>
    //   x.isCompleted === y.isCompleted ? 0 : x.isCompleted ? -1 : 1
    // );
    this.setState({ bonusActivityList });
  }

  nextAction = item => {
    const { goToScreens, isRegDone, setEntreBabylon } = this.props;
    setEntreBabylon({ pageKey: "" });
    let screen = item.screenId;
    let params = item.params;
    if (isRegDone) {
      screen = "BabylonSymptomCheckerScreen";
      params = {};
    }
    goToScreens(params, screen);
  };

  handleGoPress = item => {
    const { goToScreens } = this.props;
    let params = item.params;
    if (item.screenId === "newProfile") {
      params = {
        path: "newProfile",
        userData: {
          ...this.props.userProfile,
          profilePicture: this.props.userIcon,
        },
        editable: true,
        related: false,
        newProfile: false,
      };
    } else if (item.screenId === "BabylonTnCScreen") {
      this.nextAction(item);
      return;
    }
    goToScreens(params, item.screenId);
  };

  renderListSeparator = () => {
    return <View style={styles.separatorComponent} />;
  };

  render() {
    const { bonusActivityList } = this.state;
    const headerText = metaFinderRewards(EARN_BADGES);
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <PruBackHeader title={headerText} customStyles={styles.headerStyle} />
        </View>
        <View style={styles.contentView}>
          <FlatList
            data={bonusActivityList}
            renderItem={({ item }) => (
              <EarnBadgeRowItem item={item} onGoPress={this.handleGoPress} />
            )}
            ItemSeparatorComponent={this.renderListSeparator}
          />
        </View>
      </View>
    );
  }
}

EarnBadges.propTypes = {
  goToScreens: PropTypes.func,
  userProfile: PropTypes.object,
  userIcon: PropTypes.object,
  isRegDone: PropTypes.bool,
  setEntreBabylon: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    userProfile: state.profile,
    userIcon: state.profile.profilePicture,
    isRegDone: state.babylonAuth.babylonUserLoggedIn,
  };
};

export default connect(mapStateToProps, {
  goToScreens,
  setEntreBabylon,
})(EarnBadges);

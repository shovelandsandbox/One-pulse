import React, { PureComponent } from "react";
import Modal from "react-native-modal";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  FlatList,
} from "react-native";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import {
  metaFinderChallenges,
  metaFinderFitness,
} from "../../utils/meta-utils";
import LinearGradient from "react-native-linear-gradient";
import { Colors, Styles, fontWeight, fontFamily } from "../../styles";
import { isEmpty, pathOr } from "ramda";
import screens from "../../../fitnessTrackers/configs/screenNames";
import actionNames from "../../../fitnessTrackers/configs/actionNames";
const FITNESS = require("../../../../images/fitnessTracker/fitness_background_new.png");
const CHECK = require("../../../../images/fitnessTracker/check.png");

class WearableListModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.wearables.length ? props.wearables[0] : undefined,
    };
  }

  componentDidMount() {
    if (this.props.wearableList.length === 0) {
      this.props.getAllWearables();
    }
  }

  onSelected = () => {
    this.props.onSelected(this.state.selected);
  };

  getWearableImage = customerWearable => {
    const wearable = this.props.wearableList.find(
      w => w.type === customerWearable.wearableType.type
    );
    const iconUrl = pathOr("", ["iconUrl"], wearable);
    return (
      <Image
        source={{ uri: iconUrl }}
        resizeMode={"contain"}
        style={styles.logo}
      />
    );
  };

  selectWearable = wearable => {
    this.setState({ selected: wearable });
  };

  renderWearable = ({ item }) => {
    const selected = item.id === this.state.selected.id;
    return (
      <View style={styles.wearableContainer}>
        <TouchableOpacity
          style={styles.wearableItem}
          onPress={() => this.selectWearable(item)}
        >
          <View
            style={[
              styles.containerMain,
              {
                backgroundColor: selected ? Colors.pulseRed : Colors.white,
                borderColor: selected ? Colors.white : Colors.lightGrey,
              },
            ]}
          >
            {selected && (
              <Image
                source={CHECK}
                resizeMode={"contain"}
                style={styles.check}
              />
            )}
          </View>
          <View style={styles.img}>
            <Image
              source={{ uri: item.wearableType.iconUrl }}
              resizeMode={"contain"}
              style={styles.logo}
            />
            <View style={styles.name}>
              <Text>{item.wearableType.name}</Text>
            </View>
          </View>
          {item.wearableType.type === "applehealth" && (
            <Text style={styles.disclaimerStyle}>
              {metaFinderFitness("supportAppleHealth")}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <Modal
        isVisible={true}
        transparent={true}
        backdropColor={Colors.black}
        backdropOpacity={0.6}
        onBackButtonPress={this.props.onDismiss}
        onBackdropPress={this.props.onDismiss}
        useNativeDriver={true}
        animationIn={"zoomIn"}
        animationOut={"zoomOut"}
        hideModalContentWhileAnimating={true}
        animationInTiming={500}
      >
        <ImageBackground
          source={FITNESS}
          resizeMode={"stretch"}
          style={styles.image}
        >
          <Text style={styles.headerLabel}>
            {metaFinderChallenges("selectFitnessTracker")}
          </Text>
        </ImageBackground>
        <View style={styles.container}>
          <View style={styles.list}>
            {/* {this.props.wearables.map(this.renderWearable)} */}
            <FlatList
              data={this.props.wearables}
              renderItem={this.renderWearable}
              horizontal={false}
              numColumns={2}
              extraData={this.state}
            />
            {isEmpty(this.props.wearables) && (
              <View style={styles.noWearablesContainer}>
                <Text style={styles.noWearables}>
                  {metaFinderChallenges("noWearable")}
                </Text>
              </View>
            )}
          </View>
          <View style={{ flexDirection: "row", paddingBottom: 10 }}>
            <TouchableOpacity style={styles.button} onPress={this.onSelected}>
              <LinearGradient
                colors={["#ec1c2e", "#a21421"]}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {" "}
                  {isEmpty(this.props.wearables)
                    ? metaFinderChallenges("connect")
                    : metaFinderChallenges("join")}{" "}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

WearableListModal.defaultProps = {
  wearables: [],
};

WearableListModal.propTypes = {
  wearables: PropTypes.object,
  onSelected: PropTypes.func,
  onDismiss: PropTypes.func,
  wearableList: PropTypes.object,
  getAllWearables: PropTypes.func,
};

const mapStateToProps = state => ({
  wearableList: pathOr([], ["FitnessTrackersReducer", "wearableList"], state),
});

const mapDispatchToProps = {
  getAllWearables: () => {
    return {
      context: screens.WEARABLE_LIST,
      type: actionNames.getAllSupportedWearables,
      disableTimeout: true,
    };
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(WearableListModal);

const styles = StyleSheet.create({
  button: {
    borderRadius: 19.7,
    flexDirection: "row",
    flex: 1,
    height: 40,
    marginTop: 8.4,
  },
  buttonGradient: {
    alignItems: "center",
    borderRadius: 19.7,
    flex: 1,
    height: 40,
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.white,
    fontFamily,
    fontSize: 10.7,
    fontWeight: fontWeight.Bold,
    letterSpacing: 0.36,
    lineHeight: 14.7,
  },
  check: {
    height: 10,
    width: 10,
  },
  container: {
    alignItems: "center",
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 6.7,
    borderBottomRightRadius: 6.7,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 11,
  },
  containerMain: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 10,
    borderWidth: 1,
    height: 20,
    justifyContent: "center",
    width: 20,
  },
  disclaimerStyle: {
    fontSize: 10,
    textAlign: "center",
  },
  headerLabel: {
    alignSelf: "flex-start",
    color: Colors.white,
    fontFamily,
    fontSize: 14,
    fontWeight: fontWeight.Bold,
    lineHeight: 16.7,
    marginBottom: 10,
    marginLeft: 18,
    textAlign: "center",
  },
  image: {
    borderTopLeftRadius: 6.7,
    borderTopRightRadius: 6.7,
    flexDirection: "column-reverse",
    height: 94,
    overflow: "hidden",
    width: "100%",
  },
  img: {
    alignContent: "space-between",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  list: {
    flexDirection: "column",
    paddingHorizontal: 5.7,
    paddingVertical: 19.3,
    width: "100%",
  },
  logo: {
    height: 40,
    width: 40,
  },
  name: {
    alignContent: "space-between",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  noWearables: {
    color: Colors.boldHeader,
    fontSize: 12,
  },
  wearableContainer: {
    flex: 1,
    flexDirection: "row",
    ...Styles.card,
    backgroundColor: Colors.white,
    borderColor: Colors.lightSlateGrey,
    borderRadius: 7,
    borderWidth: 0.5,
    elevation: 4,
    margin: 5,
    maxWidth: "50%",
    padding: 10,
  },
  wearableItem: {
    flex: 1,
    flexDirection: "column",
  },
});

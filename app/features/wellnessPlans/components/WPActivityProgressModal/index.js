import React, { PureComponent } from "react";
import {
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";

import {
  WELLNESS_EXISTING_GROUP,
  WELLNESS_NEW_GROUP,
  WELLNESS_EARN_BADGE,
  WELLNESS_CONTENT,
  WELLNESS_WEBINAR,
} from "../../../../config/images";
import { PruRoundedButton } from "../../../../components";

const iconType = {
  badge: "BADGE",
  liveSession: "LIVE-SESSION",
  newGroup: "NEW-GROUP",
  existingGroup: "EXISTING-GROUP",
  curatedContent: "CURATED-CONTENT",
};

const modalName = "Potassium Intake - PROGRESS";
const data = [
  {
    name: "Beginner",
    colors: ["#c8c8c8", "#000000"],
    step: 0,
    label: "4 days to go",
    description: "Complete Beginner to Unlock",
    descriptionBlock: {
      label: "Rewards you will earn",
      items: [
        {
          icon: iconType.badge,
          text: "30 Badges",
          height: 40,
          width: 86,
        },
        {
          icon: iconType.newGroup,
          text: "Live Session -\nAffinity Group",
          height: 40,
          width: 120,
        },
        {
          icon: iconType.existingGroup,
          text: "+100 badges on new \ngroup completion",
          height: 40,
          width: 180,
        },
      ],
    },
  },
  {
    name: "Healthy",
    colors: ["#e84c5a", "#9a2f39"],
    step: 1,
    label: "10 days to go",
    description: "Complete Healthy to Unlock",
    descriptionBlock: {
      label: "Rewards you will earn",
      items: [
        {
          icon: iconType.badge,
          text: "30 Badges",
          height: 40,
          width: 86,
        },
        {
          icon: iconType.newGroup,
          text: "Live Session -\nAffinity Group",
          height: 40,
          width: 120,
        },
        {
          icon: iconType.existingGroup,
          text: "+100 badges on new \ngroup completion",
          height: 40,
          width: 180,
        },
      ],
    },
  },
  {
    name: "Professional",
    colors: ["#564ce8", "#37309f"],
    step: 2,
    label: "3 days to go",
    description: "Complete Professional to Unlock",
    descriptionBlock: {
      label: "Rewards you will earn",
      items: [
        {
          icon: iconType.badge,
          text: "30 Badges",
          height: 40,
          width: 86,
        },
        {
          icon: iconType.newGroup,
          text: "Live Session -\nAffinity Group",
          height: 40,
          width: 120,
        },
        {
          icon: iconType.existingGroup,
          text: "+100 badges on new \ngroup completion",
          height: 40,
          width: 180,
        },
      ],
    },
  },
  {
    name: "Master",
    colors: ["#ad89f9", "#7357af"],
    step: 3,
    label: "40 days to go",
    description: "Complete Professional to Unlock",
    descriptionBlock: {
      label: "Rewards you will earn",
      items: [
        {
          icon: iconType.badge,
          text: "30 Badges",
          height: 40,
          width: 86,
        },
        {
          icon: iconType.newGroup,
          text: "Live Session -\nAffinity Group",
          height: 40,
          width: 120,
        },
        {
          icon: iconType.existingGroup,
          text: "+100 badges on new \ngroup completion",
          height: 40,
          width: 180,
        },
      ],
    },
  },
];

export default class WPActivityProgressModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
    };
  }
  renderLockContentStep(item, index) {
    const { currentStep } = this.state;
    return (
      <TouchableOpacity
        style={styles.altStepContainer}
        onPress={() => {
          this.setState({
            currentStep: item.step,
          });
        }}
      >
        <LinearGradient colors={item.colors} style={styles.altStepGradient}>
          {item.step > currentStep ? (
            <Icon raised name="ios-lock" size={15} color={"#FFF"} />
          ) : (
            <Text style={styles.altStepGradientText}>{item.step}</Text>
          )}
        </LinearGradient>
        <Text style={styles.altStepName}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderContent = () => {
    const { currentStep } = this.state;
    return (
      <FlatList
        extraData={this.state}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.stepContentRow}>
              {this.renderStepLabel(item, index)}
              <View style={styles.stepContentColumn}>
                <View style={styles.stepContentColumnWrapper}>
                  {item.step === currentStep
                    ? this.renderStepGradient(item, index)
                    : this.renderLockContentStep(item, index)}
                </View>
                {this.renderDescription(item, index)}
                {this.renderIndicator(item, index)}
              </View>
            </View>
          );
        }}
      ></FlatList>
    );
  };

  renderStepLabel(item, index) {
    const { currentStep } = this.state;
    return (
      <View style={styles.stepLabelWrapper}>
        {item.step === currentStep - 1 ? (
          <Text style={styles.stepLabelText}>{item.label}</Text>
        ) : null}
      </View>
    );
  }

  renderIndicator(item, index) {
    const { currentStep } = this.state;
    if (index === data.length - 1) {
      return null;
    }
    return (
      <View
        style={[
          styles.indicator,
          {
            backgroundColor:
              item.step >= currentStep ? "#BBB" : data[index + 1].colors[1],
          },
        ]}
      ></View>
    );
  }

  renderDescription(item, index) {
    const { currentStep } = this.state;
    return (
      <View style={styles.descriptionContainer}>
        {item.step == currentStep - 1 ? (
          <>
            <Text style={styles.description}>{item.description}</Text>
            {this.renderDescriptionBlock(item, index)}
          </>
        ) : null}
      </View>
    );
  }

  renderStepGradient(item, index) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            currentStep: item.step,
          });
        }}
        style={styles.stepGradientContainer}
      >
        <LinearGradient colors={item.colors}>
          <View style={styles.stepGradientWrapper}>
            {/* <Text style={{ color: "#FFF" }}>{item.step}</Text> */}
            <Icon raised name="ios-lock" size={18} color={"#FFF"} />
            <Text style={styles.stepGradientName}>
              <Text>{item.name}</Text>
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  renderModalName() {
    return <Text style={styles.modalName}>{modalName}</Text>;
  }

  renderCallToAction() {
    return (
      <PruRoundedButton
        onPress={this.props.onPress ? this.props.onPress : null}
        buttonTitle="View Full Activity"
        textStyling={styles.callToActionText}
        style={styles.callToActionGradient}
      />

      //   <TouchableOpacity

      //   >
      //     <LinearGradient
      //       colors={["#ec1c2e", "#a21421"]}
      //       style={styles.callToActionGradient}
      //     >
      //       <Text style={styles.callToActionText}>View Full Activity</Text>
      //     </LinearGradient>
      //   </TouchableOpacity>
    );
  }

  renderDescriptionBlock(item, index) {
    const getSource = item => {
      switch (item.icon) {
        case iconType.badge:
          return WELLNESS_EARN_BADGE;
        case iconType.newGroup:
          return WELLNESS_NEW_GROUP;
        case iconType.existingGroup:
          return WELLNESS_EXISTING_GROUP;
        case iconType.curatedContent:
          return WELLNESS_CONTENT;
        case iconType.liveSession:
          return WELLNESS_WEBINAR;
        default:
          return WELLNESS_EARN_BADGE;
      }
    };
    return (
      <View style={styles.descriptionBlock}>
        <Text style={styles.descriptionBlockLabel}>
          {item.descriptionBlock.label}
        </Text>
        <View style={styles.descriptionBlockWrapper}>
          {item.descriptionBlock.items.map((item, index) => {
            return (
              <View
                style={[
                  { height: item.height, width: item.width },
                  styles.descriptionBlockItem,
                ]}
                key={index}
              >
                <Image
                  source={getSource(item)}
                  style={styles.descriptionBlockImage}
                  resizeMode={"contain"}
                />
                <Text style={styles.descriptionBlockText}>{item.text}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderModalName()}
        {this.renderContent()}
        {this.renderCallToAction()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  altStepContainer: {
    alignItems: "center",
    flexDirection: "row",
    zIndex: 2,
  },
  altStepGradient: {
    alignItems: "center",
    borderRadius: 15,
    height: 24,
    justifyContent: "center",
    marginRight: 10,
    width: 24,
  },
  altStepGradientText: {
    color: "#FFF",
    fontSize: 15,
  },
  altStepName: {
    fontSize: 13,
    fontWeight: "900",
    color: "#000000",
  },
  callToActionGradient: {
    borderRadius: 84,
    width: "100%",
  },
  callToActionText: {
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
    color: "#ffffff",
  },
  container: {
    padding: 20,
    width: Dimensions.get("window").width - 40,
  },
  description: {
    fontSize: 11.3,
    lineHeight: 13.3,
    letterSpacing: 0,
    textAlign: "left",
    color: "#5a5a5a",
    marginTop: 8,
  },
  descriptionBlock: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#eff3f7",
    borderRadius: 6,
    elevation: 4,
    shadowColor: "#000000",
    shadowRadius: 6,
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 4 },
  },
  descriptionBlockImage: {
    height: 24,
    width: 24,
  },
  descriptionBlockItem: {
    borderRadius: 3.3,
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    margin: 3,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  descriptionBlockLabel: {
    fontSize: 10.7,
    fontWeight: "900",
    lineHeight: 14.7,
    textAlign: "left",
    color: "#5a5a5a",
  },
  descriptionBlockText: {
    fontSize: 10.7,
    lineHeight: 13.3,
    color: "#000000",
    marginLeft: 7,
  },
  descriptionBlockWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  descriptionContainer: {
    marginBottom: 14,
    marginLeft: 34,
    marginRight: 4,
  },
  indicator: {
    height: "100%",
    left: 10,
    position: "absolute",
    width: 3,
  },
  modalName: {
    fontSize: 14,
    fontWeight: "900",
    lineHeight: 19,
    color: "#e84c5a",
    textAlign: "center",
    marginBottom: 20,
  },
  stepContentColumn: {
    flex: 0.9,
  },
  stepContentColumnWrapper: {
    flexDirection: "row",
  },
  stepContentRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  stepGradientContainer: {
    borderRadius: 20,
    zIndex: 2,
    overflow: "hidden",
  },
  stepGradientName: {
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
    color: "#ffffff",
    paddingVertical: 4,
    paddingLeft: 10,
    paddingRight: 30,
  },
  stepGradientWrapper: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 8,
  },
  stepLabelText: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: 10.7,
    lineHeight: 14.7,
    textAlign: "center",
    color: "#000000",
  },
  stepLabelWrapper: {
    flex: 0.1,
    paddingRight: 10,
  },
});

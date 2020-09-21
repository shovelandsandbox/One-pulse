import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import moment from "moment";
import { pathOr } from "ramda";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import { PruRoundedButton } from "../../../../components";
import { COMMUNITY_GROUPS } from "../../../../config/images";
import { metaFinderCommunityEventLanding } from "./../../meta";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
class EventCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      seeMore: false,
    };
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }

  renderActionButton = () => {
    const {
      isSelf,
      onStreamStart,
      onJoinStream,
      onAttend,
      item,
      eventMgr,
      noOfParticipant,
    } = this.props;

    if (eventMgr) {
      return null;
    }

    if (isSelf) {
      return (
        <PruRoundedButton
          buttonTitle={metaFinderCommunityEventLanding(
            "pulseTvLandingEventStart"
          )}
          onPress={() => {
            onStreamStart(
              item.groupActivity.startTime,
              item.groupActivity.endTime,
              item.id,
              item.attributes.membersCount,
              item.name
            );
          }}
          textStyling={styles.actionButtonText}
          style={styles.actionButton}
        />
      );
    } else if (onAttend) {
      return (
        <PruRoundedButton
          buttonTitle={metaFinderCommunityEventLanding(
            "pulseTvLandingEventAttend"
          )}
          onPress={() => {
            onAttend(item);
          }}
          textStyling={styles.actionButtonText}
          style={styles.actionButton}
        />
      );
    } else {
      return (
        <PruRoundedButton
          buttonTitle={metaFinderCommunityEventLanding(
            "pulseTvLandingEventJoin"
          )}
          onPress={() => {
            onJoinStream(
              item.groupActivity.startTime,
              item.groupActivity.endTime,
              pathOr(
                "",
                ["createdBy", "contactDetails", "email", "value"],
                item
              ),
              pathOr("", ["webinarCall"], item),
              item.id
            );
          }}
          textStyling={styles.actionButtonText}
          style={styles.actionButton}
        />
      );
    }
  };

  renderHeader = () => {
    const { item, isSpecial, onEditPress } = this.props;
    const specialPadding = isSpecial ? styles.specialPadding : null;

    return (
      <View style={styles.headerWrapper}>
        <Text style={[styles.eventDate, specialPadding]}>{item.name}</Text>
        {onEditPress ? this.renderRenderMenuOption() : null}
      </View>
    );
  };

  renderDescription = () => {
    const { seeMore } = this.state;
    const { item, isSpecial } = this.props;
    return (
      <View style={styles.descriptionWrapper}>
        <Text style={styles.description} numberOfLines={seeMore ? null : 2}>
          {item.description}
        </Text>
        {item.description.length > 80 ? (
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              this.setState(prevState => {
                return {
                  ...prevState,
                  seeMore: !prevState.seeMore,
                };
              });
            }}
          >
            <Text style={styles.seeMore}>
              {seeMore
                ? metaFinderCommunityEventLanding("pulseTvLandingSeeLess")
                : metaFinderCommunityEventLanding("pulseTvLandingSeeMore")}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  renderRenderMenuOption() {
    const { item, onEditPress, onInviteMore, onDeleteEvent } = this.props;
    return (
      <Menu>
        <MenuTrigger>
          <Icon name="dots-vertical" size={20} color={"#333"} />
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={styles.menuOptionsContainer}>
          <MenuOption onSelect={onEditPress} style={styles.menuOption}>
            <Text style={styles.menuItemText}>{metaFinderCommunityEventLanding("pulseTvModifyEvent")}</Text>
          </MenuOption>
          <MenuOption
            onSelect={onInviteMore ? onInviteMore : null}
            style={styles.menuOption}
          >
            <Text style={styles.menuItemText}>{metaFinderCommunityEventLanding("pulseTvInviteMore")}</Text>
          </MenuOption>
          <MenuOption
            onSelect={() => {
              onDeleteEvent && onDeleteEvent(item);
            }}
            style={styles.menuLastOption}
          >
            <Text style={styles.menuItemText}>{metaFinderCommunityEventLanding("pulseTvDeleteEvent")}</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  }

  render() {
    const { seeMore } = this.state;
    const {
      item,
      isSelf,
      onStreamStart,
      onJoinStream,
      onAttend,
      isSpecial,
      isAllEvents,
    } = this.props;

    const startDateMoment = moment(item.groupActivity.startTime);
    const eventDate = startDateMoment.format("DD");
    const eventMonth = startDateMoment.format("MMM");
    const eventYear = startDateMoment.format("YYYY");
    const eventStartTime = startDateMoment.format("hh:mm A");

    if (!startDateMoment.isValid()) {
      return null;
    }

    const specialPadding = isSpecial ? styles.specialPadding : null;
    return (
      <View style={styles.mainContainer}>
        <View
          style={[
            styles.eventContainer,
            isSpecial ? { borderWidth: 2, borderColor: "red" } : null,
          ]}
        >
          {this.renderHeader()}
          <Text style={[styles.dateAndTime, specialPadding]}>
            <Text style={styles.highlight}>
              {metaFinderCommunityEventLanding("pulseTvLandingEventDate")}
            </Text>
            {` ${eventDate}-${eventMonth}-${eventYear} `}
            <Text style={styles.highlight}>
              {metaFinderCommunityEventLanding("pulseTvLandingEventTime")}
            </Text>
            {` ${eventStartTime} `}
            <Text style={styles.highlight}>{` ${metaFinderCommunityEventLanding(
              "pulseTvLandingEventLocation"
            )} `}</Text>
            {metaFinderCommunityEventLanding("pulseTvLandingEventOnline")}
          </Text>
          {item?.icon?.url ? (
            <Image
              style={styles.eventDetailsPic}
              source={{
                uri: item.icon.url ? item.icon.url : null,
              }}
              resizeMode="cover"
            />
          ) : null}
          {this.renderDescription()}
          <View style={styles.footerContainer}>
            {!isAllEvents ? (
              <View style={styles.footerWrapper}>
                <Image
                  source={COMMUNITY_GROUPS}
                  style={styles.communityIcon}
                  resizeMode={"contain"}
                />
                <Text style={styles.communityCount}>
                  {item.attributes?.membersCount || 0}{" "}
                  {item.attributes.membersCount > 1
                    ? metaFinderCommunityEventLanding(
                        "pulseTvLandingInterested"
                      )
                    : metaFinderCommunityEventLanding("pulseTvLandingAttendee")}
                </Text>
              </View>
            ) : null}
            {this.renderActionButton()}
          </View>
          {isSpecial ? (
            <View style={styles.specialInviteWrapper}>
              <Text style={styles.specialInviteText}>
                {metaFinderCommunityEventLanding("pulseTvLandingSpecialInvite")}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

export default EventCard;

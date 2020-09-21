import React, { PureComponent } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
  PermissionsAndroid,
  Platform,
} from "react-native";
import Contacts from "react-native-contacts";
import { events } from "@pru-rt-internal/pulse-common";
import { dispatchEvent } from "../../actions";
import { connect } from "react-redux";

import {
  WHATSAPP_ICON,
  PHONE_BOOK,
  LINE_ICON,
  VIBER_ICON,
  FACEBOOK_ICON,
} from "../../config/images";
import styles from "./style";

import { safeMetaLabelFinder } from "../../utils/meta-utils";
import { shape, string, object, func } from "prop-types";

import {
  initializeDynamicLink,
  createDynamicLink,
} from "../../utils/DynamicLinkUtil";
import { path } from "ramda";

const getShareOptions = () => [
  {
    id: "whatsapp",
    title: safeMetaLabelFinder("SocialInvite", "whatsapp"),
    url: "whatsapp://send?text=",
    image: {
      source: WHATSAPP_ICON,
      height: 44,
      width: 44,
    },
    titleColor: "#4caf50",
  },
  {
    id: "phonebook",
    title: safeMetaLabelFinder("SocialInvite", "phonebook"),
    url: "sms:?body=",
    image: {
      source: PHONE_BOOK,
      height: 44,
      width: 34,
    },
    titleColor: "#6d3a00",
  },
  {
    id: "facebook",
    title: safeMetaLabelFinder("SocialInvite", "facebook"),
    url: "fb-messenger://share?link=",
    image: {
      source: FACEBOOK_ICON,
      height: 44,
      width: 34,
    },
    titleColor: "#6d3a00",
  },
  {
    id: "viber",
    title: safeMetaLabelFinder("SocialInvite", "viber"),
    url: "viber://forward?text=",
    image: {
      source: VIBER_ICON,
      height: 44,
      width: 34,
    },
    titleColor: "#6d3a00",
  },
  {
    id: "line",
    title: safeMetaLabelFinder("SocialInvite", "line"),
    url: "https://line.me/R/msg/text/?",
    encode: true,
    image: {
      source: LINE_ICON,
      height: 44,
      width: 34,
    },
    titleColor: "#6d3a00",
  },
];

export class PruShare extends PureComponent {
  onPress = item => {
    this.sendTileEventsToPlatform(item);
    if (item.id === "phonebook") {
      return this.checkPermissionAndHandle(item);
    }
    return this.handle(item);
  };

  sendTileEventsToPlatform = item => {
    const cmsEvent = events.CmsClickAction;
    cmsEvent.name = "pulse.home.shareWithFriends";
    cmsEvent.cmsId = "share-with-friends";
    const cmsAttrs = {
      title: "Share with friends",
      id: "share-with-friends",
      desc: "Share with friends --> " + item.title,
      type: "Tile Button",
      appVersion: path(["auth", "userAgent", "appVersion"], this.props)
    };
    cmsEvent.attributes = cmsAttrs;
    this.props.dispatchEvent(cmsEvent);
  };

  handle = item => {
    const { url, encode } = item;
    const { config = {}, userAgent, onDone } = this.props;
    //setup dynamic links
    if (config.isDynamicLink) {
      initializeDynamicLink(userAgent);
      createDynamicLink(config).then(deeplinkUrl => {
        const shareableUrl = encode
          ? encodeURIComponent(deeplinkUrl)
          : deeplinkUrl;
        Linking.openURL(`${url}${shareableUrl}`);
        onDone && onDone();
      });
    } else {
      let desc = config.desc;
      if (item.id === "facebook") {
        const httpStartIndex = config.desc.indexOf("http");
        desc = config.desc.slice(httpStartIndex);
      }
      Linking.openURL(`${url}${desc}`);
      onDone && onDone();
    }
  };

  checkPermissionAndHandle = () => {
    const { goToScreen, onDone } = this.props;
    onDone && onDone();
    if (Platform.OS === "android") {
      try {
        const granted = PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        );
        granted.then(res => {
          if (res === PermissionsAndroid.RESULTS.GRANTED) {
            goToScreen("SocialInvite", {});
          }
        });
      } catch (err) {
        console.warn(err);
      }
    } else {
      Contacts.checkPermission((err, permission) => {
        if (err) throw err;
        // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
        if (permission === "undefined") {
          Contacts.requestPermission((err, permission) => {
            if (permission === "authorized") {
              goToScreen("SocialInvite", {});
            }
          });
        }
        if (permission === "authorized") {
          goToScreen("SocialInvite", {});
        }
      });
    }
  };

  renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity onPress={() => this.onPress(item)}>
          <Image
            style={styles.widgetIcon}
            source={item.image.source}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View>
        <FlatList
          horizontal={true}
          contentContainerStyle={styles.widgetsContainer}
          data={getShareOptions()}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

PruShare.propTypes = {
  userAgent: string,
  onDone: func,
  goToScreen: func,
  config: shape({
    title: string,
    desc: string,
    imageUrl: string,
    queryParams: shape({
      screenId: string,
      screenParams: object,
    }),
  }),
  dispatchEvent: func,
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {
  dispatchEvent,
})(PruShare);

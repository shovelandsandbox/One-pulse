import React from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

import {
  INVITE_WHATSAPP,
  INVITE_LINE,
  VIBER_ICON,
  INVITE_GROUP_MAIN,
  INVITE_EMAIL,
} from "../../../../config/images";
import {
  initializeDynamicLink,
  createDynamicLink,
} from "../../../../utils/DynamicLinkUtil";
import { sendEmail } from "../../../../utils/send-email";

const handleOnPress = (item, auth) => {
  const { url, encode } = item;
  const { userAgent } = auth;
  const title = "Invite";
  const desc = "Hey there";
  const config = {
    title: title,
    desc: desc,
    isDynamicLink: true,
  };
  let shareableUrl = config.desc;
  if (config.isDynamicLink) {
    initializeDynamicLink(userAgent);
    createDynamicLink(config).then(deeplinkUrl => {
      shareableUrl = encode ? encodeURIComponent(deeplinkUrl) : deeplinkUrl;
      if (item.id === "email") {
        sendEmail(null, { subject: config.title, body: shareableUrl }).then(
          () => {
            console.log("Our email successful provided to device mail ");
          }
        );
      } else {
        Linking.openURL(`${url}${shareableUrl}`);
      }
    });
  }
};

const SocialInviteTile = ({ item, onInvite, auth }) => {
  return (
    <TouchableOpacity
      style={styles.tileContainer}
      onPress={e => {
        e.preventDefault();
        onInvite(item, auth);
      }}
    >
      <Image
        source={item.source}
        resizeMode={"contain"}
        style={[styles.tileImage, item.customStyle]}
      />
      <Text style={styles.textStyle}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const InviteMode = ({ appTiles, auth }) => {
  return (
    <View style={styles.inviteModeContainerStyle}>
      <FlatList
        horizontal={true}
        contentContainerStyle={styles.modeStyle}
        data={appTiles}
        renderItem={({ item }) => {
          return (
            <SocialInviteTile
              item={item}
              onInvite={handleOnPress}
              auth={auth}
            />
          );
        }}
      />
    </View>
  );
};

const ReferralInvite = ({ auth }) => {
  const inviteText = "Invite";
  const message =
    "Keep the boredom at bay, by inviting your friends to walk along in your wellness journey";
  const email = "Email";
  const whatsapp = "WhatsApp";
  const viber = "Viber";
  const line = "Line";
  const appTiles = [
    {
      id: "email",
      title: email,
      url: "mailto:",
      source: INVITE_EMAIL,
      customStyle: {
        height: 35,
        width: 35,
        marginTop: 5,
      },
    },
    {
      id: "whatsapp",
      title: whatsapp,
      url: "whatsapp://send?text=",
      source: INVITE_WHATSAPP,
      customStyle: {
        height: 35,
        width: 35,
        marginTop: 5,
      },
    },
    {
      id: "viber",
      title: viber,
      url: "viber://forward?text=",
      source: VIBER_ICON,
      customStyle: {
        height: 40,
        width: 45,
      },
    },
    {
      id: "line",
      title: line,
      url: "https://line.me/R/msg/text/?",
      encode: true,
      source: INVITE_LINE,
      customStyle: {
        height: 40,
        width: 45,
      },
    },
  ];
  return (
    <View style={styles.container}>
      <Image
        source={INVITE_GROUP_MAIN}
        style={styles.imageStyle}
        resizeMode={"contain"}
      />
      <Text style={styles.headerStyle}>{inviteText}</Text>
      <Text style={styles.messageStyle}>{message}</Text>
      <InviteMode appTiles={appTiles} auth={auth} />
    </View>
  );
};

SocialInviteTile.propTypes = {
  item: PropTypes.object,
  onInvite: PropTypes.func,
  auth: PropTypes.object,
};

InviteMode.propTypes = {
  appTiles: PropTypes.array,
  auth: PropTypes.object,
};
ReferralInvite.propTypes = {
  auth: PropTypes.object,
};

export default ReferralInvite;

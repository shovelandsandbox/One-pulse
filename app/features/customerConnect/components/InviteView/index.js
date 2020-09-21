import React, { PureComponent } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { sendEmail } from "../../../../utils/send-email";
import {
  INVITE_WHATSAPP,
  INVITE_LINE,
  VIBER_ICON,
  INVITE_GROUP_MAIN,
  INVITE_EMAIL,
} from "../../../../config/images";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import {
  initializeDynamicLink,
  createDynamicLink,
} from "../../../../utils/DynamicLinkUtil";
import { verticalScale, scale } from "../../../../utils/Scale";
import { metaFinderCustomerConnect } from "../../meta";
class InviteView extends PureComponent {
  constructor(props) {
    super(props);
  }

  handle = item => {
    const { url, encode } = item;
    const { userAgent } = this.props.auth;
    const config = {
      title: metaFinderCustomerConnect("inviteMsgTitle"),
      desc: metaFinderCustomerConnect("inviteMsgDescription"),
    };
    let shareableUrl = config.desc;
    //setup dynamic links

    initializeDynamicLink(userAgent);
    createDynamicLink(config).then(deeplinkUrl => {
      shareableUrl = encode ? encodeURIComponent(deeplinkUrl) : deeplinkUrl;

      if (item.id === "email") {
        sendEmail(null, {
          subject: config.title,
          body: config.desc + " " + shareableUrl,
        }).then(() => {
          console.log("Our email successful provided to device mail ");
        });
      } else {
        Linking.openURL(`${url}${config.desc + "" + shareableUrl}`);
      }
    });
  };

  renderInviteMode = () => {
    const appTiles = [
      {
        id: "email",
        title: "Email",
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
        title: safeMetaLabelFinder("SocialInvite", "whatsapp"),
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
        title: "Viber",
        url: "viber://forward?text=",
        source: VIBER_ICON,
        customStyle: {
          height: 40,
          width: 45,
        },
      },
      {
        id: "line",
        title: safeMetaLabelFinder("SocialInvite", "line"),
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
      <View style={styles.inviteModeContainerStyle}>
        <FlatList
          numColumns={4}
          contentContainerStyle={styles.modeStyle}
          data={appTiles}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={[
                  styles.inviteOptions,
                  index !== appTiles.length - 1
                    ? styles.inviteOptionsBorder
                    : null,
                ]}
                onPress={e => {
                  e.preventDefault();
                  this.handle(item);
                }}
              >
                <View style={styles.imageContainerStyle}>
                  <Image
                    source={item.source}
                    resizeMode={"contain"}
                    style={item.customStyle}
                  />
                </View>
                <Text style={styles.textStyle}>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={INVITE_GROUP_MAIN}
          style={styles.imageStyle}
          resizeMode={"contain"}
        />
        <Text style={styles.textHeaderStyle}>
          {metaFinderCustomerConnect("invite")}
        </Text>
        <View style={styles.textContainer}>
          <Text>{metaFinderCustomerConnect("inviteDesc")}</Text>
        </View>
        {this.renderInviteMode()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(InviteView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  imageContainerStyle: {
    alignItems: "center",
    flex: 1,
  },
  imageStyle: {
    alignSelf: "center",
    height: verticalScale(300),
    marginTop: 25,
    width: scale(280),
  },
  inviteModeContainerStyle: {
    flexDirection: "row",
    marginTop: 10,
  },
  inviteOptions: {
    flex: 1,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  inviteOptionsBorder: {
    borderColor: "#BBB7",
    borderRightWidth: 0.7,
  },
  modeStyle: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  textContainer: {
    marginTop: 20,
  },
  textHeaderStyle: {
    color: "#393939",
    fontWeight: "900",
    marginTop: 30,
  },
  textStyle: {
    color: "#777777",
    marginTop: 6,
    fontSize: 12,
  },
});

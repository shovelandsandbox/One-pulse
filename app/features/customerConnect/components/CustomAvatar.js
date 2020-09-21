import React, { PureComponent } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { string, number, bool } from "prop-types";

const base64Type = "data:image/jpeg;base64,";

class CustomAvatar extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { 
      unreadCount, 
      thumbnail, 
      name,
      invert, 
    } = this.props;

    let wrapperClasses = [styles.thumbnail, styles.nameThumbnailWrapper];
    let thumbnailFont = [styles.nameThumbnail];
    let nameSplits = name.split(" ");
    let customName = "";
    nameSplits.forEach(name => {
      if (customName.length > 2) {
        return null;
      }  
      customName = customName + name[0]
    });

    if (invert) {
      wrapperClasses.push(styles.nameThumbnailWrapperWhite);
      thumbnailFont.push(styles.nameThumbnailRed);
      if (Platform.OS === "ios") {
        wrapperClasses.push(styles.shadowIos);
      }
    }

    return (
      <View>
        {thumbnail ? (
          <Image
            source={{ uri: `${base64Type}${thumbnail}` }}
            style={styles.thumbnail}
          />
        ) : name?.trim() ? (
          <View style={wrapperClasses}>
            <Text style={thumbnailFont}>{customName}</Text>
          </View>
        ) : (
          <Image
            source={AVATAR}
            style={[
              styles.thumbnail,
              {
                transform: [
                  {
                    scale: 1.2,
                  },
                ],
              },
            ]}
          />
        )}
        {unreadCount ? (
          <View style={styles.badge}>
            <Text style={styles.badgeCount}>6</Text>
          </View>
        ) : null}
      </View>
    );
  }
};

CustomAvatar.propTypes = {
  unreadCount: number,
  thumbnail: string,
  name: string,
  invert: bool,
};

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    backgroundColor: "#ec1c2e",
    borderRadius: 17 / 2,
    height: 17,
    justifyContent: "center",
    position: "absolute",
    right: -8,
    top: 0,
    width: 17,
  },
  badgeCount: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  nameThumbnail: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  nameThumbnailRed: {
    color: "#ec1c2e",
  },
  nameThumbnailWrapper: {
    backgroundColor: "#ec1c2e",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  nameThumbnailWrapperWhite: {
    backgroundColor: "#ffffff",
    elevation: 5,
  },
  shadowIos: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
  },
  thumbnail: {
    borderRadius: 23,
    height: 46,
    width: 46,
  },
});

export default CustomAvatar;

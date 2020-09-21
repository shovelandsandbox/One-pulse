import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import { isEmpty } from "ramda";
import VideoPlayer from "../../../../components/VideoTile/VideoPlayer";

const ArticleDescription = ({ title, desc, imageUrl, type }) => {
  if (isEmpty(imageUrl) || isEmpty(title) || isEmpty(desc)) {
    return null;
  }
  const config = {
    properties: {
      uri: imageUrl,
      thumb: imageUrl,
    },
    style: styles.image,
    autoPlay: false,
  };

  return (
    <View style={styles.container}>
      {type === "video" && (
        <View style={styles.image}>
          <VideoPlayer config={config} style={styles.image} />
        </View>
      )}
      {type === "image" && (
        <Image
          style={styles.image}
          source={{
            uri: imageUrl,
          }}
        />
      )}
      <Text style={styles.titleStyle} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.descStyle}>{desc}</Text>
    </View>
  );
};

export default ArticleDescription;

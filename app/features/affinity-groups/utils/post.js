import React from "react";
import { View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { pathOr, path } from "ramda";

import DateUtils from "./date";
import LinkPost from "../components/link-post";
import TextPost from "../components/text-post";
import FilePost from "../components/file-post";
import PostImage from "../components/post-image";
import PostHeader from "../components/post-header";
import VideoPlayer from "../../../components/VideoTile/VideoPlayer";

class PostUtils {
  getPost(data, options) {
    return (
      <View>
        {data.document && data.document.id && this.getImage(data, options)}
        {this.getTextPost(data, options)}
      </View>
    );
  }

  getPhotoPost(data, options, onPress) {
    const document = path(["document"], data);
    const uri = document.url || document.uri;
    return (
      <View>
        <TouchableOpacity onPress={onPress}>
          <PostImage uri={uri} options={options} />
        </TouchableOpacity>
        {this.getTextPost(data, options, onPress)}
      </View>
    );
  }

  getPostHeader(data, actions) {
    const postedOn = path(["auditDetail", "createTime"], data);
    const user = pathOr({}, ["customer"], data);

    const userName = `${user.firstName} ${user.surName}`;
    const imageUrl = user.imageUrl; //to be fetched from user.id
    const timeSince = DateUtils.getTimeSince(postedOn);
    const subTitle = `Posted ${timeSince} ago`;

    return (
      <PostHeader
        title={userName}
        subtitle={subTitle}
        userName={userName}
        imageUrl={imageUrl}
        actions={actions}
      />
    );
  }

  getLinkPost(data, options, onPress) {
    if (data.document && data.document.url) {
      return (
        <View>
          <TouchableOpacity onPress={onPress}>
            <LinkPost
              title={data.title}
              link={data.document.url}
              description={data.message}
              options={options}
              onPress={onPress}
            />
          </TouchableOpacity>
          {this.getTextPost(data, options, onPress)}
        </View>
      );
    }
  }

  //TODO
  getVideoPost(data, options, onPress) {
    if (data.document && data.document.url) {
      const config = {
        properties: {
          uri: data.document.url,
          thumb:
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgYIBwgHCgkGDRYPBwYGCA8ICRAKFBEWFhQRExMYHCggGBolGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKgBLAMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAAB//EABUQAQEAAAAAAAAAAAAAAAAAAAAB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AIcEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2Q==",
        },
        style: {
          width: Dimensions.get("screen").width - 40,
          aspectRatio: 1.77,
        },
        autoPlay: false,
        resizeMode: "contain",
      };
      return (
        <View style={styles.baseContainer}>
          <VideoPlayer config={config} style={styles.postVideo} />
          {this.getTextPost(data, options, onPress)}
        </View>
      );
    }
  }

  getTextPost(data, options, onPress) {
    //override onPress if not on preview mode
    if (!options.preview) {
      onPress = () => { };
    }
    const isArticle = pathOr("", ["group", "groupActivity", "content", "content"], data);
    //const isArticle = data.message.includes("https");
    return (
      <TouchableOpacity onPress={onPress}>
        <TextPost
          title={data.title}
          description={data.message}
          options={options}
        />
      </TouchableOpacity>
    );
  }

  getFilePost(data, options, onPress) {
    return (
      <View>
        <TouchableOpacity onPress={onPress}>
          <FilePost
            title={data.title}
            icon="file"
            description={data.message}
            options={options}
            document={data.document}
          />
        </TouchableOpacity>
        {this.getTextPost(data, options, onPress)}
      </View>
    );
  }
}

export default new PostUtils();

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    justifyContent: "center",
  },
  postVideo: {
    alignSelf: "center",
    aspectRatio: 1.77,
    width: Dimensions.get("screen").width - 40,
  },
});

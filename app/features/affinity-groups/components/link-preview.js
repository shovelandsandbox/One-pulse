/* eslint-disable max-params */
import React, { PureComponent } from "react";
import { getLinkPreview } from "link-preview-js";
import PropTypes from "prop-types";
import {
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from "react-native";
import { isEmpty } from "ramda";

// eslint-disable-next-line max-len
const REGEX = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g;

export default class PostLinkPreview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isUri: false,
      linkTitle: undefined,
      linkDesc: undefined,
      linkFavicon: undefined,
      linkImg: undefined,
    };
    this.getPreview(props.text);
  }

  getPreview = text => {
    getLinkPreview(text)
      .then(data => {
        this.setState({
          isUri: true,
          linkTitle: data.title ? data.title : undefined,
          linkDesc: data.description ? data.description : undefined,
          linkImg:
            data.images && data.images.length > 0
              ? data.images.find(function(element) {
                  return (
                    element.includes(".png") ||
                    element.includes(".jpg") ||
                    element.includes(".jpeg")
                  );
                })
              : undefined,
          linkFavicon:
            data.favicons && data.favicons.length > 0
              ? data.favicons[data.favicons.length - 1]
              : undefined,
        });
      })
      .catch(() => {
        this.setState({ isUri: false });
      });
  };

  componentDidUpdate(nextProps) {
    if (nextProps.text !== null) {
      this.getPreview(nextProps.text);
    } else {
      this.setState({ isUri: false });
    }
  }

  _onLinkPressed = () => {
    const {
      options: { queryParams = "" },
    } = this.props;
    if (this.props.text && this.props.text.match(REGEX)) {
      let url = this.props.text.match(REGEX)[0];
      // Linking.openURL(this.props.text.match(REGEX)[0]);
      if (!isEmpty(queryParams) && url.indexOf("youtube") != -1) {
        if (url.indexOf("?") == -1) {
          url = url + "?";
        } else {
          url = url + "&";
        }
        url = url + queryParams;
      }

      const params = {
        uri: url,
        title: this.props.title,
      };
      this.props.onPress(params);
    }
  };

  renderImage = (
    imageLink,
    faviconLink,
    imageStyle,
    faviconStyle,
    imageProps
  ) => {
    return imageLink ? (
      <Image style={imageStyle} source={{ uri: imageLink }} {...imageProps} />
    ) : faviconLink ? (
      <Image
        style={faviconStyle}
        source={{ uri: faviconLink }}
        {...imageProps}
      />
    ) : null;
  };

  renderText = (
    showTitle,
    title,
    description,
    textContainerStyle,
    titleStyle,
    descriptionStyle,
    titleNumberOfLines,
    descriptionNumberOfLines
  ) => {
    return (
      <View style={textContainerStyle}>
        {showTitle && (
          <Text numberOfLines={titleNumberOfLines} style={titleStyle}>
            {title}
          </Text>
        )}
        {description && (
          <Text
            numberOfLines={descriptionNumberOfLines}
            style={descriptionStyle}
          >
            {description}
          </Text>
        )}
      </View>
    );
  };

  renderLinkPreview = (
    text,
    containerStyle,
    imageLink,
    faviconLink,
    imageStyle,
    faviconStyle,
    showTitle,
    title,
    description,
    textContainerStyle,
    titleStyle,
    descriptionStyle,
    titleNumberOfLines,
    descriptionNumberOfLines,
    imageProps
  ) => {
    return (
      <TouchableOpacity
        style={[styles.containerStyle, containerStyle]}
        activeOpacity={0.9}
        onPress={() => this._onLinkPressed()}
      >
        {this.renderImage(
          imageLink,
          faviconLink,
          imageStyle,
          faviconStyle,
          imageProps
        )}
        {this.renderText(
          showTitle,
          title,
          description,
          textContainerStyle,
          titleStyle,
          descriptionStyle,
          titleNumberOfLines,
          descriptionNumberOfLines
        )}
      </TouchableOpacity>
    );
  };

  render() {
    const {
      text,
      containerStyle,
      imageStyle,
      faviconStyle,
      textContainerStyle,
      title,
      titleStyle,
      titleNumberOfLines,
      descriptionStyle,
      descriptionNumberOfLines,
      imageProps,
    } = this.props;
    return this.state.isUri
      ? this.renderLinkPreview(
          text,
          containerStyle,
          this.state.linkImg,
          this.state.linkFavicon,
          imageStyle,
          faviconStyle,
          title,
          this.state.linkTitle,
          this.state.linkDesc,
          textContainerStyle,
          titleStyle,
          descriptionStyle,
          titleNumberOfLines,
          descriptionNumberOfLines,
          imageProps
        )
      : null;
  }
}

const styles = {
  containerStyle: {
    flexDirection: "row",
  },
};

PostLinkPreview.defaultProps = {
  text: null,
  containerStyle: {
    backgroundColor: "rgba(239, 239, 244,0.62)",
    alignItems: "center",
  },
  imageStyle: {
    width: Platform.isPad ? 160 : 110,
    height: "100%",
    paddingRight: 10,
    marginLeft: 10,
  },
  faviconStyle: {
    width: 40,
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
  },
  textContainerStyle: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
  },
  title: true,
  titleStyle: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
    alignSelf: "flex-start",
    fontFamily: "Avenir-Regular",
  },
  titleNumberOfLines: 2,
  descriptionStyle: {
    fontSize: 13,
    color: "#81848A",
    alignSelf: "flex-start",
    fontFamily: "Avenir-Regular",
  },
  descriptionNumberOfLines: Platform.isPad ? 4 : 3,
  imageProps: { resizeMode: "contain" },
};

PostLinkPreview.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  imageStyle: ViewPropTypes.style,
  faviconStyle: ViewPropTypes.style,
  textContainerStyle: ViewPropTypes.style,
  title: PropTypes.bool,
  imageProps: PropTypes.object,
  titleStyle: Text.propTypes.style,
  titleNumberOfLines: Text.propTypes.numberOfLines,
  descriptionStyle: Text.propTypes.style,
  descriptionNumberOfLines: Text.propTypes.numberOfLines,
  options: PropTypes.object,
};

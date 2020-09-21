import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  ImageBackground,
  PushNotificationIOS,
  Platform,
  Dimensions
} from "react-native";
import {
    PLACEHOLDER,
    GRAPHICIMAGE
} from "../../config/images";
import PropTypes from "prop-types";
const {width} = Dimensions.get("window");

class NewsUpdateCard extends Component {

    render() {
        let { Source, isFirst, isLast, onPress, LableText, InfoText, MsgText } = this.props;
        return (
            <TouchableOpacity
                style={{
                    width: width,
                    flexShrink: 0,
                    height: 200,
                    paddingLeft: isFirst ? 20 : 15,
                    paddingRight: isLast ? 20 : 15,
                    overflow: 'hidden',
                }}
                onPress={() => {
                    onPress && onPress()
                }}>
                <Image
                    style={{
                        width: width - (isFirst ? 20 : 15) - (isLast ? 20 : 15),
                        height: 200,
                        borderRadius: 12,
                    }}
                    source={Source} />
                <Text
                    style={{
                        color: "#515B61",
                        fontFamily: "Avenir",
                        fontSize: 16,
                        fontWeight: "900",
                        lineHeight: 22,
                        marginTop: 16,
                        marginBottom: 8
                    }}
                >{LableText}</Text>
                <Text
                    ellipsizeMode={"tail"}
                    numberOfLines={2}
                    style={{
                        color: "#222529",
                        fontFamily: "Avenir",
                        fontSize: 16,
                        fontWeight: "300",
                        lineHeight: 22,

                    }}>
                    {InfoText}
                </Text>
                <Text style={{
                    color: "#ED1B2E",
                    fontFamily: "Avenir",
                    fontSize: 14,
                    fontWeight: "500",
                    lineHeight: 19,
                    marginTop: 16
                }}>
                    {MsgText}
                </Text>
            </TouchableOpacity >
        )
    }
}
NewsUpdateCard.PropTypes = {
    Source: PropTypes.string.isRequired,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    onPress: PropTypes.func,
    LableText: PropTypes.string.isRequired,
    InfoText: PropTypes.string.isRequired,
    MsgText: PropTypes.string.isRequired,
};

export default NewsUpdateCard;


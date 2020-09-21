import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import PropTypes from "prop-types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import { CoreComponents } from "@pru-rt-internal/pulse-common";
import { AVATAR } from "../../../../config/images"
const { Label } = CoreComponents;
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const HalodocChatUserMessage = props => (
    <View style={styles.userMessageContainer}>
        {props.item.undoStatus == "ENABLED" && (
            <TouchableOpacity
                style={styles.undoButtonStyle}
                onPress={() => props.undoMessage(props.item.id)}
            >
                <MaterialIcons name="refresh" size={25} color={Colors.silver} />
            </TouchableOpacity>
        )}
        {props.imgBase ? (
            <TouchableOpacity onPress={() => props.imgPress && props.imgPress()} style={styles.imgStyle}>
                <Image
                    style={styles.imgBox}
                    source={{ uri: props.imgBase }}
                />
            </TouchableOpacity>
        ) : (
                <View style={styles.userMessage}>
                    <Label value={props.value} style={styles.labelStyle} />
                </View>
            )}
        <Image
            style={styles.ImageStyle}
            source={props.profilePicture ? { uri: `data:image/jpeg;base64,${props.profilePicture}` } : AVATAR} />
    </View>
);

HalodocChatUserMessage.propTypes = {
    item: PropTypes.object,
    undoMessage: PropTypes.func,
    value: PropTypes.string,
};

export { HalodocChatUserMessage };

import React, { PureComponent } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import HTML from "react-native-render-html";
import { string, bool, element } from "prop-types";

import styles, { htmlStyles } from "./styles";

import { CLOSE_ICON } from "../../config/images";
import NotificationModal from "../../features/appNotification/components/notificationModal";

export default class PruNotification extends PureComponent {
  render() {
    const {
      action,
      htmlContent,
      shortHeight,
      footer,
      dismissNotification,
      actionTitle,
    } = this.props;

    if (!footer) {
      return (
        <HTML
          style={{}}
          containerStyle={{}}
          baseFontStyle={styles.baseFontStyle}
          html={htmlContent}
          classesStyles={htmlStyles.classesStyles}
          renderers={{
            bluecircle: (a, b, c, d) => {
              const name = d.html.match(
                new RegExp("buttonNameStarts" + "(.*)" + "buttonNameEnds")
              );
              let actionName = name && name.length > 1 ? name[1] : "Continue";
              actionName = actionTitle || actionName;
              return (
                <TouchableOpacity onPress={action} style={styles.redButton}>
                  <Text style={styles.redButtonText}>{actionName}</Text>
                </TouchableOpacity>
              );
            },
            dismissbutton: (a, b, c, d) => {
              const name = d.html.match(
                new RegExp("buttonNameStarts" + "(.*)" + "buttonNameEnds")
              );

              return (
                <TouchableOpacity
                  onPress={() => NotificationModal.hide()}
                  style={styles.redButton}
                >
                  <Text style={styles.redButtonText}>{"Dismiss"}</Text>
                </TouchableOpacity>
              );
            },
            crossclose: (a, b, c, d) => {
              return (
                <TouchableOpacity
                  onPress={dismissNotification}
                  style={styles.closeButton}
                >
                  <Image
                    source={CLOSE_ICON}
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
              );
            },
          }}
        />
      );
    }

    return (
      <View style={contentStyles.topContainer}>
        <View style={contentStyles.innerContainer} />
        <View style={{ flex: 1 }}>
          <HTML
            style={styles.instructions}
            containerStyle={styles.containerStyle}
            baseFontStyle={styles.baseFontStyle}
            html={htmlContent}
            classesStyles={htmlStyles.classesStyles}
          />
          <View style={shortHeight ? styles.shortContent : styles.longContent}>
            {footer}
          </View>
        </View>
      </View>
    );
  }
}

PruNotification.propTypes = {
  htmlContent: string.isRequired,
  shortHeight: bool,
  footer: element,
  actionTitle: string,
};

const contentStyles = StyleSheet.create({
  innerContainer: {
    backgroundColor: "#DFDFDF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 5,
    marginLeft: "40%",
    width: 100,
  },
  topContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 0,
    padding: 5,
    top: 0,
  },
});

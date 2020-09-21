import React, { PureComponent } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import styles from "./../styles";
import { PruBackHeader } from "../../../components";

const renderPlainBackHeader = (title, hasShadow = true) => {
  return (
    <View style={[styles.backContainer, hasShadow ? { elevation: 5 } : null]}>
      <PruBackHeader title={title}></PruBackHeader>
    </View>
  );
};

const renderBackHeaderWithIcon = (title, rightAction, hasShadow = true) => {
  return (
    <View style={[styles.backContainer, hasShadow ? { elevation: 5 } : null]}>
      <PruBackHeader
        title={title}
        rightImageRenderMethod={() => {
          return (
            <TouchableOpacity
              onPress={() => {
                rightAction();
              }}
            >
              <Image
                source={require("../assets/pencil_icon.png")}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          );
        }}
        rightImage={true}
      ></PruBackHeader>
    </View>
  );
};

export default {
  renderPlainBackHeader,
  renderBackHeaderWithIcon,
};

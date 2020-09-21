import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { Text, StyleSheet } from "react-native";
import React from "react";
import { func, object } from "prop-types";
import { metaFinderChallenges } from "../../utils/meta-utils";

const { ContextMenu } = renderers;

const PopUpMenu = ({ config, style }) => (
  <Menu renderer={ContextMenu} rendererProps={{ preferredPlacement: "top" }}>
    <MenuTrigger style={styles.menuTrigger}>
      <Text style={[styles.contentText, style]}>{"\u22ee"}</Text>
    </MenuTrigger>
    <MenuOptions style={styles.menuOptions}>
      <MenuOption
        onSelect={config.onPress}
        text={metaFinderChallenges("leaveGroup")}
      />
    </MenuOptions>
  </Menu>
);

PopUpMenu.propTypes = {
  config: {
    onPress: func,
  },
  style: object,
};

const styles = StyleSheet.create({
  contentText: {
    fontSize: 20,
    textAlign: "center",
    width: 30,
  },
  menuOptions: {
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuTrigger: {
    padding: 0,
  },
});

export default PopUpMenu;

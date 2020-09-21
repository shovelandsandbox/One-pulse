import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from "react-native-popup-menu";
import { Text, StyleSheet } from "react-native";
import React from "react";
import { func } from "prop-types";

const { ContextMenu } = renderers;

const DotMenu = ({ config }) => (
    <Menu renderer={ContextMenu} rendererProps={{ preferredPlacement: "top" }}>
        <MenuTrigger style={styles.menuTrigger}>
            <Text style={styles.contentText}>{"\u22ee"}</Text>
        </MenuTrigger>
        <MenuOptions style={styles.menuOptions}>
            <MenuOption text={""} />
        </MenuOptions>
    </Menu>
);

DotMenu.propTypes = {
    config: {
        onPress: func,
    },
};

const styles = StyleSheet.create({
    contentText: {
        fontFamily: "Avenir-Regular",
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

export default DotMenu;

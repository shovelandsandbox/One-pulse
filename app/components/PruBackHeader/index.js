import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import styles from "./styles";
import { BACK, BACK_WHITE, WELLNESS_HELP } from "../../config/images";
import { CoreServices } from "@pru-rt-internal/pulse-common";
import { Theme } from "../../themes";
import { configureLineHeight } from "../../utils/lineHeightsUtils";
const { Colors } = Theme;
const { NavigationService } = CoreServices;

export default PruBackHeader = ({
  title = "",
  customStyles = {},
  inverse = false,
  backIcon = null,
  previousPage = undefined,
  rightImage,
  rightImageRenderMethod,
  rightHelpImage,
  helpCallback,
  renderTitle,
  onPress,
}) => {
  return (
    <View style={{ ...styles.headerBox, ...customStyles }}>
      <TouchableOpacity
        onPress={() => {
          onPress
            ? onPress()
            : NavigationService.goBack(previousPage ? previousPage : null);
        }}
        accessibilityLabel="home"
        accesible
      >
        <Image
          style={
            backIcon ? { resizeMode: "contain" } : { width: 20, height: 20 }
          }
          source={inverse ? BACK_WHITE : backIcon ? backIcon : BACK}
        />
      </TouchableOpacity>
      {renderTitle && renderTitle()}
      <View style={{ paddingLeft: 10, flex: 1.5 }}>
        <Text
          style={
            inverse
              ? {
                  ...{ color: Colors.white, fontSize: 17, lineHeight: 28 },
                  ...configureLineHeight("18"),
                }
              : {
                  ...{
                    color: Colors.black222529,
                    fontSize: 17,
                    lineHeight: 28,
                  },
                  ...configureLineHeight("18"),
                }
          }
        >
          {title}
        </Text>
      </View>
      {rightImage && rightImageRenderMethod()}
      {rightHelpImage && (
        <TouchableOpacity style={styles.helpContainer} onPress={helpCallback}>
          <Text
            style={{
              fontSize: 9,
              lineHeight: 14,
              color: "#ec1c2e",
              fontWeight: "900",
              width: 30,
            }}
          >
            HELP
          </Text>
          <Image source={WELLNESS_HELP} style={styles.helpIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

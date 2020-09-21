import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { BACK, BACK_WHITE } from "../../config/images";
import { CoreServices } from "@pru-rt-internal/pulse-common";
import XHeader from "../XHeader";
const { NavigationService } = CoreServices;

const leftComponent = (inverse, previousPage) => {
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationService.goBack(previousPage ? previousPage : null);
      }}
      accessibilityLabel="home"
      accesible
    >
      <Image style={styles.backImage} source={inverse ? BACK_WHITE : BACK} />
    </TouchableOpacity>
  );
};

const ProductCatalogHeader = ({
  inverse = true,
  showBack = true,
  previousPage = undefined,
  leftImage,
  leftImageRenderMethod,
  rightImage,
  rightImageRenderMethod,
  midComponent,
  midStyle,
  colors,
}) => {
  return (
    <XHeader
      leftComponent={
        leftImage
          ? leftImageRenderMethod()
          : showBack
          ? leftComponent(inverse, previousPage)
          : null
      }
      leftStyle={styles.leftStyle}
      midComponent={midComponent ? midComponent() : null}
      midStyle={midStyle ? midStyle : styles.midStyle}
      rightComponent={rightImage ? rightImageRenderMethod() : null}
      rightStyle={styles.rightStyle}
      colors={colors}
    />
  );
};

const styles = StyleSheet.create({
  backImage: {
    height: 20,
    width: 20,
  },
  leftStyle: {
    alignSelf: "center",
    left: 14.1,
  },
  midStyle: {
    alignSelf: "center",
    justifyContent: "center",
    left: 40,
  },
  rightStyle: {
    bottom: 8,
    right: 16.2,
  },
});

ProductCatalogHeader.propTypes = {
  inverse: PropTypes.bool,
  showBack: PropTypes.bool,
  previousPage: PropTypes.string,
  leftImage: PropTypes.bool,
  leftImageRenderMethod: PropTypes.func,
  rightImage: PropTypes.bool,
  rightImageRenderMethod: PropTypes.func,
  midComponent: PropTypes.func,
  midStyle: PropTypes.object,
  colors: PropTypes.array,
};

export default ProductCatalogHeader;

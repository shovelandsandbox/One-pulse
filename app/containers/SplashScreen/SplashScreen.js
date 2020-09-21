import React, { PureComponent } from "react";
import { View, Image } from "react-native";
import { SLIDER_LOGO_NEW } from "../../config/images";
import styles from "./styles";

class SplashScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          resizeMode="cover"
          source={SLIDER_LOGO_NEW}
        />
      </View>
    );
  }
}

export default SplashScreen;

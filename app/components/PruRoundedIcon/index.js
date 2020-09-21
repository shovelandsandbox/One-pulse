import React from "react";
import { 
  Animated, 
  Image,
  Text,
  TouchableWithoutFeedback,
  View, 
} from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

export default PruRoundedIcon = props => {
  const { customStyles, image, isItAnimated, onAction, title } = props;
  const Wrapper = isItAnimated ? Animated.View : View;

  return (
    <TouchableWithoutFeedback onPress={onAction}>
      <Wrapper style={[styles.button, customStyles]}>
        <Image
          source={image}
          style={styles.imageSmallStyle}
          resizeMode={"contain"}
        />
        <Text style={styles.label}>{title}</Text>
      </Wrapper>
    </TouchableWithoutFeedback>
  )
};

PruRoundedIcon.PropTypes = {
  customStyles: PropTypes.object,
  image: PropTypes.object,
  isItAnimation: PropTypes.bool,
  onAction: PropTypes.func,
  title: PropTypes.string,
};

import React from "react";
import {
  Text,
  View,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import PropTypes from "prop-types";

import PruRoundedIcon from "../PruRoundedIcon";
import styles from "./styles";

const PruFloatingIcon = props => {
  const {
    toggleOpen,
    bgStyle,
    heart_red,
    animeStyle = false,
    isOpen,
    images,
    titles,
    customStyles,
    onPress,
    notificationCount,
  } = props;

  const Wrapper = animeStyle ? Animated.View : View;
  const imageStyle = isOpen ? styles.imageCloseStyle : styles.imageSmallStyle;

  return (
    <View>
      <TouchableWithoutFeedback onPress={toggleOpen}>
        <Wrapper style={[styles.background, bgStyle]} />
      </TouchableWithoutFeedback>

      {images.map((image, index) => (
        <PruRoundedIcon
          key={index}
          customStyles={customStyles[index]}
          image={image}
          isItAnimated={true}
          title={titles[index]}
          onAction={() => onPress(titles[index])}
        />
      ))}

      <TouchableWithoutFeedback onPress={toggleOpen}>
        <View style={styles.button}>
          {
            (!isOpen && notificationCount) && (
              <View style={styles.fabSubContainer}>
                <Text style={styles.notificationCount}>{notificationCount}</Text>
              </View>
            )
          }
          <Image source={heart_red} style={imageStyle} resizeMode={"cover"} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default PruFloatingIcon;

PruFloatingIcon.PropTypes = {
  animeStyle: PropTypes.bool,
  bgStyle: PropTypes.object,
  customStyles: PropTypes.array,
  heart_red: PropTypes.object,
  isOpen: PropTypes.bool,
  images: PropTypes.array,
  onPress: PropTypes.func,
  titles: PropTypes.array,
};

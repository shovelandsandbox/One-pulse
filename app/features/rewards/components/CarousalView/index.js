import React from "react";
import { Image, Text, View } from "react-native";
import Carousel from "react-native-carousel-view";
import styles from "./style";
import LinearButton from "../LinearButton";
import { CAROUSAL_1 } from "../../../../config/images";
import { metaFinderRewards } from "../../configs/meta-utils";
import PropTypes from "prop-types";
import {
  ELEMENT_KEY_FAQ,
  ELEMENT_KEY_YOUR_OFFER,
  NO_OFFERS,
} from "../../configs/metaConstant";
import EmptyVoucher from "../EmptyVoucher";

const redGradient = ["#ec1c2e", "#a21421"];

const CarousalView = props => {
  const { carouselImage, handleFaqPress } = props;

  const yourOffer = metaFinderRewards(ELEMENT_KEY_YOUR_OFFER);
  const faq = metaFinderRewards(ELEMENT_KEY_FAQ);
  const carousalLength = carouselImage.length;
  return (
    <View>
      <View style={styles.faqHead}>
        <View style={styles.rewardFlex1}>
          <Text style={styles.offerText}>{yourOffer}</Text>
        </View>
        <View style={styles.rewardFlex2}>
          <LinearButton
            colors={redGradient}
            text={faq}
            onTextPress={() => {
              handleFaqPress();
            }}
            isDisabled={false}
          />
        </View>
      </View>
      <View>
        {carousalLength > 0 ? (
          <Carousel
            width={400}
            height={210}
            delay={2000}
            indicatorAtBottom={true}
            indicatorSize={15}
            indicatorText="●"
            indicatorColor="#ec1c2e"
          >
            {carouselImage.map(src => (
              <View>
                <Image source={CAROUSAL_1} style={styles.carousalStyle} />
              </View>
            ))}
          </Carousel>
        ) : (
            <EmptyVoucher message={metaFinderRewards(NO_OFFERS)} />
          )}
      </View>
    </View>
  );
};

CarousalView.propTypes = {
  carouselImage: PropTypes.array,
  handleFaqPress: PropTypes.func,
};
export default CarousalView;

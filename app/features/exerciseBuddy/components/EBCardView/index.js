import React from "react";
import { Image, Text, View } from "react-native";

import { ShadowWrapper } from "../../../../components";

import Footer from "./footer";
import Styles from "./styles";
import { getPlanDetails, getPlanUrlDetails } from "../../utils/utilityFunction";
import { Description } from "./description";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import metaKeys from "../../meta";
import { HABITS_EXERCISE } from "../../../../config/images";

const Title = ({ title, whichFooter }) => (
  <View style={Styles.titleContainer}>
    <Text style={Styles.title}>{title}</Text>
    {whichFooter && <Text>3.30</Text>}
  </View>
);

const DetailContainer = props => (
  <View style={Styles.detailContainer}>
    <Title title={getPlanDetails(props.habit) || "Burpee"} />
    <Description
      description={
        getPlanDetails(props.habit, "desc") ||
        safeMetaLabelFinder(metaKeys.screenName, metaKeys.landing.pickAWorkout)
      }
      whichFooter={props.whichFooter}
      progress={props.progress}
      level={"_0"}
      sets={"2"}
    />
    <Footer {...props} />
  </View>
);

const EBCardView = props => {
  const uri = getPlanUrlDetails(props.habit);
  const defImage = HABITS_EXERCISE;
  return (
    <View style={[Styles.container, props.isLast ? Styles.lastChild : null]}>
      <ShadowWrapper style={Styles.noPadding}>
        <View style={[Styles.innerContainer, Styles.row]}>
          <Image style={Styles.image} source={uri ? { uri } : defImage} />
          <DetailContainer {...props} />
        </View>
      </ShadowWrapper>
    </View>
  );
};

export default EBCardView;

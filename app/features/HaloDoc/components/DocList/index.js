import React, { Component } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import CardView from "react-native-cardview";
import styles from "./styles";
import moment from "moment";
import { sum, forEach, map } from "ramda";
import {
  LIKE_ICON,
  BRIEFCASE_ICON,
  AVATAR,
} from "../../../../config/images";
import _ from "lodash";
import metaConstants from "../../meta";



const DocList = props => {
  let DocListConstants = {...metaConstants.talkToDoctorMeta()}
  const Years = DocListConstants.Years
  const Year = DocListConstants.Year;
  const Dr = DocListConstants.Dr;
  const Rp = DocListConstants.Rp;

  calcExperience = () => {
    const exp_check = props.item.doctor_profile_sections;
    let expInYears = 0;
    if (exp_check.experience && exp_check.experience.length) {
      const DocYear = exp_check.experience[0].start_year;
      const DocMonth = parseInt(exp_check.experience[0].start_month) - 1; //Months in JS range 0-11
      const now = moment(new Date());
      const currentMonth = now.month();
      // console.log("currentMonth", currentMonth);
      const currentYear = now.year();
      // console.log("currentYear", currentYear);
      const currentTime = moment([currentYear, currentMonth]);
      const prevTime = moment([DocYear, DocMonth]);
      expInYears = currentTime.diff(prevTime, "years", true);
      expInYears = expInYears.toFixed(1);
    }
    return expInYears;
  };

  getDoctorPrice = doctorPackages => {
    let leastPackage = this.retrieveLeastPackage(doctorPackages);
    let price = 0;
    if (leastPackage && leastPackage.price) {
      price = leastPackage.price;
      const coupons = leastPackage.coupons;
      if (coupons && coupons.length > 0) {
        price = price - sum(map((item => item.type === "discount" ? item.amount : 0), coupons));
      }
    }
    return price;
  };

  retrieveLeastPackage = packagesList => {
    let minPricePackage = null;
    if (packagesList && packagesList.length > 0) {
      minPricePackage = packagesList[0];
      forEach(value => {
        if (value.price < minPricePackage.price) {
          minPricePackage = value;
        }
      }, packagesList);
    }
    return minPricePackage;
  };

  const exp = calcExperience();
  // console.log("exp", exp);
  const showExperience = exp > 1 ? Years : Year;
  const isActive =
    props.item.status && props.item.status.toLowerCase() === "active";

  let price = getDoctorPrice(props.item.doctor_packages);

  let specialities = [
    props.type,
    ...(props.item.categories
      ? map(item => item.name, props.item.categories)
      : []),
  ];

  specialities = specialities.filter(function (elem, pos) {
    return specialities.indexOf(elem) == pos;
  });
  specialities = specialities.join(", ");

  return (
    <CardView
      cardElevation={3}
      cardMaxElevation={3}
      cornerRadius={5}
      style={styles.cardViewStyle}
    >
      {!isActive && <View style={styles.disabledOverLay} />}
      <TouchableOpacity
        style={styles.tileContainerStyle}
        disabled={props.item.status !== "active"}
        onPress={() => props.showWaitingScreen(props.item)}
        // onPress={() => props.navigation.navigate('HalodocDoctorInfoScreen')}
        disabled={!isActive}
      >
        <View style={styles.tileContainerPart1Style}>
          <View>
            <ImageBackground source={AVATAR} style={styles.tileImageStyle}>
              <Image
                style={styles.tileImageStyle}
                source={{ uri: props.item.image_url }}
              />
            </ImageBackground>

            <View
              style={[
                styles.circle,
                { backgroundColor: isActive ? "#06CF9B" : "#BDBDBD" },
              ]}
            />
          </View>

          <View style={styles.dataContainer}>
            <Text numberOfLines={1} style={styles.docNameStyle}>
              {`${Dr} ${props.item.first_name} ${props.item.last_name}`}
            </Text>
            <Text numberOfLines={2} style={styles.docSpeStyle}>
              {specialities}
            </Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Image style={styles.bottomImage} source={LIKE_ICON} />
            <Text style={styles.bottomText}>{props.item.rating}%</Text>
            <Image style={styles.bottomRightImage} source={BRIEFCASE_ICON} />
            <Text style={styles.bottomText}>
              {this.calcExperience()} {showExperience}
            </Text>
          </View>

          <Text style={styles.bottomRpText}>{`${Rp}  ${price.toFixed(
            2
          )}`}</Text>
        </View>
      </TouchableOpacity>
    </CardView>
  );
};


export default DocList;

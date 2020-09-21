import React, { Component } from "react";
import CardView from "react-native-cardview";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import moment from "moment";
import { LIKE_ICON, BRIEFCASE_ICON } from "../../../../config/images";
import _ from "lodash";
import { sum, forEach, map } from "ramda";
import metaConstants from "../../meta";




const DoctorsListItem = props => {
  let DoctorsListMeta = { ...metaConstants.talkToDoctorMeta() }

  const Years = DoctorsListMeta.Years
  const Year = DoctorsListMeta.Year;
  const Dr = DoctorsListMeta.Dr;
  const Rp = DoctorsListMeta.Rp;
  const Active = DoctorsListMeta.Active;

  calcExperience = () => {
    const exp_check = props.item.doctor_profile_sections;
    let expInYears = 0;
    if (exp_check.experience && exp_check.experience.length) {
      const DocYear = exp_check.experience[0].start_year;
      const DocMonth = parseInt(exp_check.experience[0].start_month) - 1; //Months in JS range 0-11
      const now = moment(new Date());
      const currentMonth = now.month();
      const currentYear = now.year();
      const currentTime = moment([currentYear, currentMonth]);
      const prevTime = moment([DocYear, DocMonth]);
      expInYears = currentTime.diff(prevTime, "years", true);
      expInYears = expInYears.toFixed(1);
    }
    return expInYears;
  };
  const exp = calcExperience();
  console.log("exp", exp);
  const showExperience = exp > 1 ? Years : Year;
  const isActive = props.item.status && props.item.status.toLowerCase() === "active";

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

  let price = getDoctorPrice(props.item.doctor_packages);

  let specialities = [];
  if (props.item.categories && props.item.categories !== "") {
    let specialities = [
      props.type,
      ...(props.item.categories
        ? map(item => item.name, props.item.categories)
        : [])
    ];
  } else {

  }

  specialities = specialities.filter(function (elem, pos) {
    return specialities.indexOf(elem) == pos;
  });
  specialities = specialities.join(", ");

  return (
    <CardView
      cardElevation={3}
      cardMaxElevation={3}
      cornerRadius={5}
      style={[styles.cardViewStyle, { backgroundColor: "white" }]}
    >
      {!isActive && <View style={styles.disabledOverLay} />}
      <TouchableOpacity
        style={styles.tileContainerStyle}
        disabled={props.item.status != Active}
        onPress={() =>
          // props.navigation.navigate('HalodocDoctorInfoScreen')
          props.showWaitingScreen(props.item)
        }
        disabled={!isActive}
      >
        <View style={styles.tileContainerPart1Style}>
          <View>
            <Image
              style={styles.tileImageStyle}
              source={{ uri: props.item.image_url }}
            />
            <View
              style={[
                styles.circle,
                { backgroundColor: isActive ? "#06CF9B" : "#BDBDBD" }
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

          <Text style={styles.bottomRpText}>{`${Rp}.  ${price.toFixed(2)}`}</Text>
        </View>
      </TouchableOpacity>
    </CardView>
  );
};




export default DoctorsListItem

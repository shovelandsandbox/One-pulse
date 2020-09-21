import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LEFT_ARROW } from "../../../../../assets/images/affinityGroup";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";

export default class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getHeader = () => {
    return (
      <View style={styles.headerTitleContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.iconContainerLeft}>
            <Image source={LEFT_ARROW} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={{ padding: 10 }}>
            <Text>{safeMetaLabelFinder("mealPlan", "myPreference")}</Text>
          </View>
        </View>
        {this.getHeaderInfo()}
      </View>
    );
  };

  getHeaderInfo = () => {
    return (
      <View style={styles.headerTitle}>
        <View style={{ padding: 10, paddingLeft: 25 }}>
          <Text numberOfLines={1} style={styles.headerText}>
            {"John Doe, 41 yrs"}
          </Text>
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View>
            <Text>{safeMetaLabelFinder("mealPlan", "foodPreferences")}</Text>
            <Text style={styles.headerText}>
              {safeMetaLabelFinder("mealPlan", "vegetarian")}
            </Text>
          </View>
          <View
            style={{ borderRightColor: "black", borderRightWidth: 1 }}
          ></View>
          <View>
            <Text>{safeMetaLabelFinder("mealPlan", "medicalHistory")}</Text>
            <Text style={styles.headerText}>
              {safeMetaLabelFinder("mealPlan", "nothing")}
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.edit}>
              {safeMetaLabelFinder("mealPlan", "edit")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  getAllergies = () => {
    const renderItem = ({ item }) => {
      return (
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              margin: 5,
              marginHorizontal: 15,
            }}
          >
            <Image
              style={styles.image}
              source={{
                uri:
                  "https://casasensei.com/wp-content/uploads/2019/06/South-Indian-Bruschetta-Recipe.jpg",
              }}
            ></Image>
            <View
              style={{
                marginLeft: 15,
                alignSelf: "center",
              }}
            >
              <Text style={styles.headerText}>{item.value}</Text>
            </View>
          </View>
        </View>
      );
    };

    const DATA = [
      {
        id: "1",
        value: "Peanut",
      },
      {
        id: "2",
        value: "Seafood",
      },
      {
        id: "3",
        value: "Garlic",
      },
    ];
    return (
      <View style={styles.tileContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View>
            <Text style={styles.headerText}>
              {safeMetaLabelFinder("mealPlan", "intoleranceAllergies")}
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.edit}>
              {safeMetaLabelFinder("mealPlan", "edit")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 10 }}>
          <FlatList data={DATA} renderItem={renderItem} />
        </View>
      </View>
    );
  };

  getCuisines = () => {
    const renderItem = ({ item }) => {
      return (
        <View
          style={{
            backgroundColor: rgb(255, 225, 225),
            borderWidth: 1,
            borderColor: rgb(220, 145, 145),
            height: 35,
            borderRadius: 20,
            margin: 10,
          }}
        >
          <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
            <Text style={{ color: "black" }}>{item.value}</Text>
          </View>
        </View>
      );
    };

    const DATA = [
      {
        id: "1",
        value: "Egg Dishes",
      },
      {
        id: "2",
        value: "Quick Recipes",
      },
      {
        id: "3",
        value: "Easy Recipes",
      },
      {
        id: "4",
        value: "Variety Fruits and Juices",
      },
    ];

    return (
      <View style={styles.tileContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View>
            <Text style={styles.headerText}>Preferences and cuisines</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.edit}>
              {safeMetaLabelFinder("mealPlan", "edit")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 10 }}>
          <FlatList data={DATA} renderItem={renderItem} numColumns={2} />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.getHeader()}
        {this.getAllergies()}
        {this.getCuisines()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backIcon: {
    height: 12,
    width: 15,
  },
  container: {
    flex: 1,
  },
  edit: {
    color: rgb(236, 28, 46),
  },
  headerText: {
    fontWeight: "bold",
  },
  headerTitleContainer: {
    backgroundColor: "#ffffff",
    elevation: 5,
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainerLeft: {
    padding: 10,
  },
  image: {
    borderRadius: 5,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  tileContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 3.3,
    elevation: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: 13.3,

    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

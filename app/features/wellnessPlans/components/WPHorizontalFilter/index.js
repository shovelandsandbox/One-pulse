import React, { PureComponent } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import WPAvatar from "../WPAvatar";
import WPCard from "../WPCard";

class WPHorizontalFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 0
    };
  }

  onPressList = INDEX => {
    this.setState({ selectedItem: INDEX });
  };

  renderListItem = ({ item, index }) => {
    const { selectedItem: sd } = this.state;
    const elementStyle =
      sd === index ? styles.selectedElementWrapper : styles.elementWrapper;
    const textStyle =
      sd === index ? styles.selectedTextStyle : styles.textStyle;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          this.onPressList(index);
        }}
      >
        <View style={elementStyle}>
          <WPAvatar uri={item.uri} />
          <Text style={textStyle}>{item.type}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View>
        <FlatList
          contentContainerStyle={styles.flatlist}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          data={[
            {
              type: "Overall",
              uri:
                "https://www.thehindu.com/entertainment/ojos5l/article31772613.ece/ALTERNATES/FREE_460/08BGCHIRANJEEVISARJA-1"
            },
            {
              type: "Healthy Eating",
              uri:
                "https://apiuat.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/99e64f10-b0ee-4703-b1ea-0dd96e69291b?namespace=PH"
            },
            {
              type: "Move More",
              uri:
                "https://apiuat.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/f2a070bb-ce29-4251-b202-773d3719f3aa?namespace=PH"
            },
            {
              type: "Shape up your Body",
              uri:
                "https://apiuat.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/652e7ad6-163f-4ef3-b62e-16f84f9b4b1d?namespace=PH"
            },
            {
              type: "Lose Weight",
              uri:
                "https://apiuat.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/f47a59e3-bcb5-471a-8cbf-5dbf9855c2ab?namespace=PH"
            },
            {
              type: "Sleep Better",
              uri:
                "https://apiuat.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/bd9ceb0b-f4e1-4b44-8552-a002fb16e366?namespace=PH"
            }
          ]}
          extraData={this.state.selectedItem}
          renderItem={({ item, index }) => {
            return this.renderListItem({ item, index });
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  flatlist: {
    justifyContent: "center"
  },
  elementWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 0.5,
    borderColor: "#d5d5d5",
    margin: 5,
    marginHorizontal: 3,
    padding: 5,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderStyle: "solid",
    elevation: 3
  },
  selectedElementWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 0.5,
    borderColor: "#ec1c2e",
    margin: 5,
    marginHorizontal: 3,
    padding: 5,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderStyle: "solid",
    elevation: 3
  },
  textStyle: {
    color: "#0c0c0c",
    fontSize: 12,
    paddingLeft: 5,
    fontWeight: "normal",
    alignSelf: "center"
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingLeft: 5,
    lineHeight: 30,
    fontWeight: "900",
    color: "#ec1c2e",
    alignSelf: "center"
  }
});

export default WPHorizontalFilter;

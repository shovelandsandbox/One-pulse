import React, { PureComponent } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { VITALS_HEADER, SHARE } from "../../../config/images";

const width = Dimensions.get("window").width; //full width
const imageHeight = (399 / width) * 172;
const buttonColor = "rgb(241, 23, 43)";

class VitalsHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  getAgeRange({ range }) {
    return `Your result(Age ${range.lowerBound}-${range.upperBound} years)`;
  }

  render() {
    const { range } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={VITALS_HEADER}
            style={styles.backgroundImage}
            resizeMode={"stretch"}
          >
            <View style={styles.alignBottom}>
              <View style={styles.headerText}>
                <Text style={[styles.textColor, styles.textBold]}>
                  Health Monitoring
                </Text>
                {/* eslint-disable-next-line no-undef */}
              </View>
              {/* <TouchableOpacity style={styles.buttonStyle}>
                <Text style={styles.textColor}>View History</Text>
              </TouchableOpacity> */}
              {/*<TouchableOpacity style={styles.buttonStyle}>
                <Image
                  source={SHARE}
                  resizeMode={"contain"}
                  style={styles.shareImage}
                ></Image>
            </TouchableOpacity>*/}
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  alignBottom: {
    bottom: 0,
    flexDirection: "row",
    left: 0,
    paddingBottom: 10,
    paddingLeft: 24,
    position: "absolute",
  },
  backgroundImage: {
    height: imageHeight,
    margin: 0,
    padding: 0,
    width,
  },
  buttonStyle: {
    backgroundColor: buttonColor,
    borderRadius: 5,
    height: 30,
    marginLeft: 10,
    padding: 5,
  },
  container: {
    width,
  },
  headerText: {
    marginRight: 20,
  },
  imageContainer: {
    flex: 0,
  },
  shareImage: {
    height: 20,
  },
  textBold: {
    fontWeight: "bold",
  },
  // eslint-disable-next-line react-native/no-color-literals
  textColor: {
    color: "white",
  },
});

const mapStateToProps = state => {
  return {};
};

VitalsHeader.propTypes = {
  range: {
    lowerBound: PropTypes.number,
    upperBound: PropTypes.number,
  },
};

export default connect(mapStateToProps, {})(VitalsHeader);

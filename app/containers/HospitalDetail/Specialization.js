import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";
import {
  CoreConfig,
  CoreComponents,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";

const { CustomFlatList, SearchBar } = CoreComponents;
const { colors } = CoreConfig;
const helpers = metaHelpers;
const HOSPITAL_DETAIL_SPECIALITY_SCREEN = "hospiptalDetailSpecialityScreen";
const SPECIALITY_SEARCH_PLACEHOLDER = "searchSpecialityPlaceholder";
const SPECIALITY_EMPTY_PLACEHOLDER = "emptySpecialityPlaceholder";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // padding: 10,
  },
  itemContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey63,
  },
  title: {
    fontSize: 16,
    color: colors.grey64,
    fontWeight: '400',
    marginVertical: 8,
    fontFamily: 'Avenir',
  },
  searchBarContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
});

class Specialization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
    };
  }

  render() {
    const { searchString } = this.state;
    const { specialities } = this.props;
    return (
      <View style={styles.container}>
        <React.Fragment>
          {specialities && specialities.length > 0 && (
            <View style={{
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: '#F3F4F5',
              height: 64,
              justifyContent: 'center',
            }}>
              <SearchBar
                value={searchString}
                placeholder={
                  helpers.findElement(
                    HOSPITAL_DETAIL_SPECIALITY_SCREEN,
                    SPECIALITY_SEARCH_PLACEHOLDER
                  ).label
                }
                onChange={search => {
                  this.setState({
                    searchString: search,
                  });
                }}
              />
            </View>
          )}

          <CustomFlatList
            emptyPlaceholder={
              helpers.findElement(
                HOSPITAL_DETAIL_SPECIALITY_SCREEN,
                SPECIALITY_EMPTY_PLACEHOLDER
              ).label
            }
            data={specialities.filter(speciality =>
              speciality.toLowerCase().includes(searchString.toLowerCase())
            )}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.title}>{`${item}`}</Text>
              </View>
            )}
          />
        </React.Fragment>
      </View>
    );
  }
}

Specialization.propTypes = {
  meta: PropTypes.objectOf(PropTypes.any).isRequired,
  specialities: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(
  state => ({
    meta: state.meta,
    specialities: state.hospitalDetail.details.specialities,
  }),
  null
)(Specialization);

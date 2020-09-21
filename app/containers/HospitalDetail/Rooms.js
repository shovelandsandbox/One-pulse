import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
  FlatList,
} from "react-native";
import {
  CoreConfig,
  metaHelpers,
  CoreActions,
  CoreComponents,
} from "@pru-rt-internal/pulse-common";
import { connect } from "react-redux";
const helpers = metaHelpers;
const { fetchRoomList } = CoreActions;
const { colors } = CoreConfig;
const { CustomFlatList } = CoreComponents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.solidGray,
    padding: 20,
    paddingRight: 40,
    paddingLeft: 40,
  },
  flexRow: {
    flexDirection: "row",
  },
  flexStart: {
    flex: 1,
    alignItems: "flex-start",
  },
  type: {
    fontSize: 15,
    color: colors.grey66,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
  },
  flexCenter: {
    flex: 1,
    alignItems: "center",
  },
  cost: {
    fontSize: 15,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    color: colors.deepGrey,
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    color: colors.deepGrey,
    marginTop: 10,
    marginBottom: 10,
  },
});

const HOSPITAL_DETAILS_ROOM_SCREEN = "hospiptalDetailRoomsScreen";
const ROOM_TITLE_TYPE = "roomTypeTitle";
const ROOM_TITLE_COST = "roomCostTitle";
const EMPTY_ROOM_PLACEHOLDER = "emptyRoomsPlaceholder";

class Rooms extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.detailID &&
      nextProps.detailID !== "" &&
      nextProps.detailID !== prevState.detailId
    ) {
      const { fetchRoomListAction, detailID, sessionId } = nextProps;
      fetchRoomListAction(detailID, sessionId);
      return {
        detailId: detailID,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      detailId: props.detailID,
    };
  }

  componentDidMount() {
    const { fetchRoomListAction, detailID, sessionId } = this.props;
    fetchRoomListAction(detailID, sessionId);
  }

  render() {
    const { loading, rooms } = this.props;
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 22,
        paddingHorizontal: 30,
      }}>
        {loading && (
          <View>
            <ActivityIndicator size="large" color={colors.crimson} />
          </View>
        )}
        {!loading && (
          <React.Fragment>
            {rooms && rooms.length > 0 && (
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                height: 34,
              }}>
                <Text style={{
                  flex: 1,
                  textAlign: 'left',
                  alignSelf: 'center',
                  fontFamily: 'Avenir',
                  fontWeight: '800',
                  fontSize: 18,
                  color: '#77858C',
                }}>{helpers.findElement(
                  HOSPITAL_DETAILS_ROOM_SCREEN,
                  ROOM_TITLE_TYPE
                ).label}</Text>
                <Text style={{
                  flex: 1,
                  textAlign: 'right',
                  alignSelf: 'center',
                  fontFamily: 'Avenir',
                  fontWeight: '800',
                  fontSize: 18,
                  color: '#77858C',
                }}>{helpers.findElement(
                  HOSPITAL_DETAILS_ROOM_SCREEN,
                  ROOM_TITLE_COST
                ).label}</Text>
              </View>
            )}
            {/* <FlatList
            showsVerticalScrollIndicator
            /> */}
            <FlatList
              emptyPlaceholder={
                helpers.findElement(
                  HOSPITAL_DETAILS_ROOM_SCREEN,
                  EMPTY_ROOM_PLACEHOLDER
                ).label
              }
              showsVerticalScrollIndicator={false}
              data={rooms}
              renderItem={({ item }) => (
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#a9a9a9'
                }}>
                  <Text style={{
                    flex: 1,
                    textAlign: 'left',
                    alignSelf: 'center',
                    fontFamily: 'Avenir',
                    fontSize: 14,
                    color: '#77858C',
                  }}>{item.type}</Text>
                  <Text style={{
                    flex: 1,
                    textAlign: 'right',
                    alignSelf: 'center',
                    fontFamily: 'Avenir',
                    fontSize: 14,
                    color: '#77858C',
                  }}>{item.cost}</Text>
                </View>
              )}
            />
          </React.Fragment>
        )}
      </View>
    );
  }
}

Rooms.propTypes = {
  meta: PropTypes.objectOf(PropTypes.any).isRequired,
  detailID: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  sessionId: PropTypes.string.isRequired,
  fetchRoomListAction: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    meta: state.meta,
    detailID: state.hospitalDetail.details.id,
    loading: state.hospitalDetail.roomList.loading,
    rooms: state.hospitalDetail.roomList.rooms,
    sessionId: state.auth.token,
  }),
  {
    fetchRoomListAction: fetchRoomList,
  }
)(Rooms);

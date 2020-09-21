import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from "react-redux";
import actionCreators from "./actions";

import { Header, NotificationTile, NoNotification } from "./components";

class NotificationCentre extends Component {
  componentDidMount() {
    this.props.getAllNotifications();
  }

  render() {
    const { allNotifications, navigation } = this.props;
    
    
    return (
      <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
        <Header goBack={() => navigation.goBack()}/>
        {
          allNotifications.length === 0 ? 
            <NoNotification /> : 
            (
              <View
                style={{
                  flex: 1,
                  padding: 10
                }}
              >
                <FlatList 
                  data={allNotifications}
                  renderItem={({ item }) => (
                    <NotificationTile notification={item} />
                  )}
                  keyExtractor={notification => notification.id}
                />
              </View>
            )
        }
      </View>
    )
  }
};

const mapStateToProps = state => {
  const { notifications } = state;
  const { allNotifications } = notifications;

  return {
    allNotifications,
  };
};

export default connect(mapStateToProps, {
  getAllNotifications: actionCreators.getAllNotifications,
})(NotificationCentre);

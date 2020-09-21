import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import get from 'lodash/get';
import SocketManager from '../../socketManager';
import styles from './styles';
import LiveStreamCard from './LiveStreamCard';
import { metaFinderCommunityEventLanding } from "./../../meta";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listLiveStream: [],
    };
  }

  componentDidMount() {
    SocketManager.instance.emitListLiveStream();
    SocketManager.instance.listenListLiveStream((data) => {
      this.setState({ listLiveStream: data });
    });
  }

  onPressLiveStreamNow = () => {
    const { navigation } = this.props;
    const userName = get(navigation, 'state.params.userName', '');
    const {
      navigation: { navigate },
    } = this.props;
    navigate('PulseTvStreamer', { userName, roomName: userName });
  };

  onPressCardItem = (data) => {
    const { navigation } = this.props;
    const userName = get(navigation, 'state.params.userName', '');
    const {
      navigation: { navigate },
    } = this.props;
    navigate('PulseTvViewer', { userName, data });
  };

  render() {
    const { navigation } = this.props;
    const userName = get(navigation, 'state.params.userName', '');
    const { listLiveStream } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeText}>{metaFinderCommunityEventLanding("pulseTvWelcome")} : {userName}</Text>
        <Text style={styles.title}>{metaFinderCommunityEventLanding("pulseTvListLiveStreamVideo")}</Text>
        <FlatList
          contentContainerStyle={styles.flatList}
          data={listLiveStream}
          renderItem={({ item }) => <LiveStreamCard data={item} onPress={this.onPressCardItem} />}
          keyExtractor={(item) => item._id}
        />
        <TouchableOpacity style={styles.liveStreamButton} onPress={this.onPressLiveStreamNow}>
          <Text style={styles.textButton}>{metaFinderCommunityEventLanding("pulseTvLiveStream")}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

Home.defaultProps = {
  route: null,
};

export default Home;

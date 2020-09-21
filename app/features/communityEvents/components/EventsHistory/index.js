import React, { PureComponent } from "react";
import {
  View,
  SectionList,
  Text,
  RefreshControl,
  ActivityIndicator,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import EventHistoryMain from "../EventHistoryMain";
import Video from "react-native-video";
import { connect } from "react-redux";
import {
  getEventHistory,
  resetAllCommunityEvents,
  closeModal,
  getVideoUrl,
} from "../../actions";
import { gotoWithParams } from "./../../../../actions";
import { SALE_CLOSE_WHITE } from "../../../../config/images";
import { CustomAlert } from "../../../../components";

class EventHistory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 0,
      isLoading: true,
      paused: false,
      playerState: "PLAYING",
      screenType: "contain",
    };
  }

  componentDidMount() {
    this.props.resetAllCommunityEvents();
    this.props.getEventHistory(this.state.pageNo);
  }

  onPress = item => {
    this.props.getVideoUrl(item.id);
  };

  renderItem = ({ item }) => (
    <EventHistoryMain data={item} onVideoPress={this.onPress} />
  );

  onRefresh = () => {
    this.props.resetAllCommunityEvents();
    this.setState({
      pageNo: 0,
    });
  };

  renderLoader() {
    return (
      <View style={{ marginVertical: 20 }}>
        <ActivityIndicator size="large" color={"red"} />
      </View>
    );
  }

  onEndReached = () => {
    if (this.props.nextPage) {
      this.setState(
        prevState => ({
          pageNo: prevState.pageNo + 1,
        }),
        () => {
          this.props.getEventHistory(this.state.pageNo);
        }
      );
    }
  };

  getDisplayDate = date => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const compDate = new Date(year, month, day); // month - 1 because January == 0
    const diff = today.getTime() - compDate.getTime(); // get the difference between today(at 00:00:00) and the date
    if (compDate.getTime() == today.getTime()) {
      return "Today";
    } else if (diff <= 24 * 60 * 60 * 1000) {
      return "Yesterday";
    }
    return compDate.toDateString(); // or format it what ever way you want
  };

  onLoad = data => this.setState({ isLoading: false });

  onLoadStart = data => this.setState({ isLoading: true });

  onEnd = () => this.setState({ playerState: "ENDED" });

  onError = () => {
    CustomAlert.show("", "Cannot Play this video, try after sometimes", {
      positiveText: "Ok",
      onPositivePress: () => {},
    });
  };

  renderVideoModal = () => {
    return (
      <Modal visible={this.props.videoStarted}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => this.props.closeModal()}
            style={styles.modalStyle}
          >
            <Image source={SALE_CLOSE_WHITE} style={styles.dismissIcon} />
          </TouchableOpacity>
          <Video
            onEnd={this.onEnd}
            onLoad={this.onLoad}
            controls={this.state.isLoading ? false : true}
            onLoadStart={this.onLoadStart}
            paused={this.state.paused}
            ref={videoPlayer => (this.videoPlayer = videoPlayer)}
            resizeMode={this.state.screenType}
            source={{
              uri: this.props.videoUrl,
            }}
            style={styles.mediaPlayer}
          />
          {this.state.isLoading ? (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size="large" color={"#ec1c2e"} />
            </View>
          ) : null}
        </View>
      </Modal>
    );
  };

  render() {
    const { formattedEventHistory } = this.props;
    return (
      <View style={styles.bgColor}>
        <SectionList
          refreshControl={
            <RefreshControl onRefresh={this.onRefresh} refreshing={false} />
          }
          sections={formattedEventHistory}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.9}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
          renderItem={this.renderItem}
          bounces={false}
          renderSectionHeader={({ section: { date } }) => (
            <Text style={styles.dayTextStyle}>{this.getDisplayDate(date)}</Text>
          )}
          ListFooterComponent={() => {
            return this.props.nextPage && !this.props.isLoading
              ? this.renderLoader()
              : false;
          }}
        />
        {this.props.videoStarted && this.renderVideoModal()}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    formattedEventHistory: state.communityEvents.formattedEventHistory,
    nextPage: state.communityEvents.nextPage,
    isLoading: state.trigger.isLoading,
    videoStarted: state.communityEvents.videoStarted,
    videoUrl: state.communityEvents.videoUrl,
  };
};

const mapDispatchToProps = {
  getEventHistory,
  gotoWithParams,
  resetAllCommunityEvents,
  closeModal,
  getVideoUrl,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventHistory);

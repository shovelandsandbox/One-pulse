import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { PureComponent } from "react";
import Styles from "./style";
import {
  events
} from "@pru-rt-internal/pulse-common";
import { dispatchEvent } from '../../../../actions'
import { connect } from "react-redux";
import {
  BACK,
  HALODOC_INLINE_LOGO,
} from "../../../../config/images";
import Accordion from "../../components/Collapsible/index";
import MetaConstants from "../../meta";
import {
  getList,
} from '../../action';

class ConsultationHistoryList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filename: "",
      image64: "",
      imageFiles: [],
      hasDetailsDownloaded: false,
      pageNumber: 1,
    };
    this.MetaConstants = { ...MetaConstants.consultationHistoryMeta() };
  }

  componentDidMount() {
    this.props.getList(this.state.pageNumber);
    this.props.dispatchEvent(events.haloDocConsultationHistoryList)
  }

  loadMoreConsultation = () => {
    let { pageNumber } = this.state;
    pageNumber = pageNumber += 1;
    this.setState({ pageNumber });
    this.props.getList(pageNumber);
  };
  goBack() {
    this.props.navigation.goBack();
    this.props.dispatchEvent(events.backFromConsultationHistoryListClick)
  }
  headerComponent() {
    return (
      <View style={Styles.container}>
        <View style={Styles.header}>
          <TouchableOpacity
            onPress={() => this.goBack()}
            style={Styles.backButton}
          >
            <Image
              style={Styles.backImage}
              source={BACK}
            />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel="home"
            accesible
            style={Styles.haloDoc}
          >
            <Image
              style={Styles.haloDocImage}
              resizeMode="contain"
              source={HALODOC_INLINE_LOGO}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  listView() {
    let historyList = this.props.historyList ? this.props.historyList : []
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={historyList}
          renderItem={({ item }) => (
            <Accordion {...this.props} accordion={item}>
              {" "}
            </Accordion>
          )}
        />
        {historyList && historyList.length > 20 ? (
          <TouchableOpacity
            style={Styles.touchableLoadMore}
            onPress={this.loadMoreConsultation}
          >
            <Text style={Styles.loadMoreText}>{this.MetaConstants.loadMore}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    )
  }

  headingText() {
    return (
      <View style={Styles.medicalTitle}>
        <Text style={Styles.medicalText}>
          {this.MetaConstants.title}
        </Text>
      </View>
    )
  }
  render() {
    return (
      <View style={Styles.All}>
        {this.headerComponent()}
        {this.headingText()}
        {this.listView()}
      </View >
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    historyList: state.consulationHistoryHaloDoc.historyList,
  };
};
export default connect(mapStateToProps, {
  dispatchEvent,
  getList,
})(ConsultationHistoryList);

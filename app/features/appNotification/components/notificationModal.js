import React, { PureComponent } from "react";
import { Dimensions, StyleSheet, Linking } from "react-native";
import Modal from "react-native-modal";
import { pathOr, isEmpty, isNil } from "ramda";
import GenericComponentTile from "../../../components/Tiles/generic-component-tile";
import { PruNotification } from "../../../components";
import { connect } from "react-redux";
import { goto } from "../../../actions";
import actionCreators from "../../notificationCentre/actions";
import { PropTypes } from "mobx-react";
const deviceWidth = Dimensions.get("window").width;

export class NotificationModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };

    NotificationModal.singletonRef = this;
  }

  static show(templateDetails) {
    NotificationModal.singletonRef._show(templateDetails);
  }

  static hide() {
    NotificationModal.singletonRef._hide();
  }

  _show = templateDetails => {
    const {
      notification,
      handleAction,
      recordNotificationActioned,
      changeNotificationStatus,
      ShortNotification,
      removeNotification,
    } = templateDetails;

    this.setState({
      isVisible: true,
      notification,
      handleAction,
      recordNotificationActioned,
      changeNotificationStatus,
      ShortNotification,
      removeNotification,
    });
  };

  _hide = () => {
    this.setState({
      isVisible: false,
    });
  };

  decideStyle = (position = "modalCenter") => styles[position];

  getDetailsFromNotification = detail =>
    pathOr("", ["template", detail], this.state.notification);

  getScreenFromNotification = detail =>
    pathOr(
      "",
      ["actions", "notification", "screenParams", detail],
      this.state.notification
    );

  openUrl = url => {
    Linking.openURL(url);
  };

  render() {
    const {
      isVisible,
      notification,
      handleAction,
      removeNotification,
    } = this.state;
    const {
      dispatch,
      changeNotificationStatus,
      recordNotificationActioned,
    } = this.props;
    const content = this.getDetailsFromNotification("content");
    const position = this.getScreenFromNotification("position");
    const screenId = this.getScreenFromNotification("screenId");

    return (
      <Modal
        isVisible={isVisible}
        useNativeDriver={true}
        animationIn={"zoomIn"}
        animati19001onOut={"zoomOut"}
        animationInTiming={500}
        hideModalContentWhileAnimating={true}
        style={position ? this.decideStyle(position) : styles.modalEnd}
        onBackdropPress={null}
        backdropColor={"#000000"}
        backdropOpacity={0.6}
        onRequestClose={() => this._hide()}
      >
        {isEmpty(screenId) ? (
          <PruNotification
            htmlContent={content}
            shortHeight={content.indexOf("swipeableHeight") > -1}
            action={() => {
              handleAction();
              changeNotificationStatus({
                id: notification.id,
                status: "ACTIONED",
              });
              recordNotificationActioned(notification, true);
              this._hide();
            }}
            dismissNotification={removeNotification}
            footer={null}
          />
        ) : (
          <GenericComponentTile
            properties={{ screenId }}
            titleId={content}
            close={this._hide}
            dispatch={dispatch}
            openUrlInBrowser={this.openUrl}
          />
        )}
      </Modal>
    );
  }
}

NotificationModal.propTypes = {
  changeNotificationStatus: PropTypes.func,
  recordNotificationActioned: PropTypes.func,
};

const styles = StyleSheet.create({
  modalCenter: {
    height: "100%",
    justifyContent: "center",
    maxWidth: deviceWidth * 0.9,
  },
  modalEnd: {
    height: "100%",
    justifyContent: "flex-end",
    maxWidth: deviceWidth * 0.9,
  },
  modalStart: {
    height: "100%",
    justifyContent: "flex-start",
    maxWidth: deviceWidth * 0.9,
  },
});

const mapStateToProps = () => ({});
export default connect(mapStateToProps, {
  dispatch: payload => payload,
  changeNotificationStatus: actionCreators.changeNotificationStatus,
  recordNotificationActioned: actionCreators.recordNotificationActioned,
})(NotificationModal);

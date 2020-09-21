import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Platform,
    Image,
    Button,
    WebView,
    BackHandler,
    Alert
} from "react-native";
import styles from "./styles"

import {
    events,
} from "@pru-rt-internal/pulse-common";
import { isEmpty, isNil } from "ramda";
import { CLOSE_PAGE } from "../../../../config/images";
import { refreshConsultationList } from "../../actions"

import { dispatchEvent } from "../../../../actions";

class PaymentBuyMedicine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            !isNil(nextProps.paymentUrl) &&
            !isEmpty(nextProps.paymentUrl) &&
            nextProps.paymentUrl
        ) {
            return {
                url: nextProps.paymentUrl,
            }
        }
    }

    componentDidMount() {
        this.props.dispatchEvent(events.MakePaymentScreen);
        BackHandler.addEventListener("hardwareBackPress", this.onBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBack);
    }

    onBack = () => {
        return true;
    };

    _onClose = () => {
        this.props.dispatchEvent(events.MakePaymentCloseClick);
        const { navigation, refreshConsultationList } = this.props;
        navigation.navigate("ConsultationList");
        refreshConsultationList();
    };

    wvOnNavigationStateChange(e) {
        if (e.url === "about:blank") {
            this.props.navigation.goBack();
        }
    }

    handleOnMessage(data) {
        console.log("handleOnMessage::", JSON.stringify(data));
    }

    headerView() {
        return (
            <View
                style={styles.mainView}
            >
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={this._onClose.bind(this)}
                >
                    <Image
                        style={styles.closeImage}
                        source={CLOSE_PAGE}
                        resizeMode={"contain"}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    webView() {
        return (
            <WebView
                ref={ref => (this.webview = ref)}
                originWhitelist={["*"]}
                source={{ uri: this.state.url }}
                useWebKit={Platform.OS == "ios" ? false : true}
                scalesPageToFit={true}
                onMessage={evt => {
                    console.log("evt---", evt.nativeEvent.data);
                    this.handleOnMessage(evt.nativeEvent.data);
                }}
                onError={e => console.log("OVO webview", e)}
                onNavigationStateChange={this.wvOnNavigationStateChange.bind(this)}
            />
        )
    }

    render() {
        const { url } = this.state;
        return (
            <View style={styles.container}>
                {this.headerView()}
                <View style={styles.webviewContainer}>
                    {!isNil(this.state.url) ? this.webView() : null}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    paymentUrl: state.medicineDelivery.paymentUrl,
});

export default connect(mapStateToProps, {
    refreshConsultationList,
    dispatchEvent
})(PaymentBuyMedicine);

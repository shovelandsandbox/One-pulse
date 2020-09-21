import React, { Component } from "react";
import { connect } from "react-redux";
// var Url = require('url');
var Url = require("url-parse");

import {
    View,
    TouchableOpacity,
    TextInput,
    Platform,
    Image,
    Button,
    WebView,
    BackHandler,
    ActivityIndicator,
} from "react-native";

import styles from "./styles";

import {
    CoreConstants,
    events,
} from "@pru-rt-internal/pulse-common";

import { CLOSE_PAGE } from "../../../../config/images";

import AppConfig from "../../../../config/AppConfig";
import {
    setCoronaSpecializationDetails,
    gotoDocCovidSpecializationScreen,
    setCovidAssessmentDetails,
    resetCovidAssessmentDetails,
    pressConsultDoctor
} from "../../actions";
import { isNil } from "ramda";
import { Theme } from "../../../../themes";
import MetaConstants from "../../meta";
import { dispatchEvent } from "../../../../actions";
const { Colors } = Theme;

const { RegistrationStatus } = CoreConstants
const GET_ENV = AppConfig.getBuildEnv();

const disableUserSelect = `
var iframe = document.getElementById("tidio-chat-iframe");
const callback = function(mutationsList, observer) {
  for(let mutation of mutationsList) {
      if (mutation.type === 'attributes') {
          
          const subele = iframe.contentWindow.document.getElementById("conversation-group");
          subele.onclick = function(e){
            const target = e.target.toString();
            if(
              target.includes('bit.ly/2U6gBp9')
              || target.includes('bit.ly/2vFL8AQ')
              || target.includes('bit.ly/3bcnxGV')
              || target.includes('bit.ly/33xOpi4')
              ){
              return true;
            }
            else{
              return false;
            }
          }
      }
  }
};
const observer = new MutationObserver(callback);
observer.observe(iframe, {attributes: true});`

class CoronaChatBot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            url: "",
        };
        this.MetaConstants = { ...MetaConstants.initializeChatbotAssessmentScreenMeta() };
    }

    componentDidMount() {
        this.props.dispatchEvent(events.Covid19ChatbotScreen);
        BackHandler.addEventListener("hardwareBackPress", this.onBack);
        this.setState({
            url:
                GET_ENV === "prod"
                    ? this.MetaConstants.produrl
                    : this.MetaConstants.stageUrl,
        });
        this.props.resetCovidAssessmentDetails();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBack);
    }

    onBack = () => {
        return true;
    };

    _onClose = () => {
        const { navigation } = this.props;
        this.props.dispatchEvent(events.ChatbotCrossButtonClick);
        navigation.navigate("HomeTab");
    };
    getCategoryId = url => {
        let categoryId = null;
        if (!isNil(url)) {
            let parsedUrl = new Url(url);
            const urlParams = Url(parsedUrl.href, true);
            if (parsedUrl.href.includes("category_id") === true) {
                categoryId = urlParams.query.category_id;
            }
        }
        return categoryId;
    };

    getCoronaRiskFactorIfPresent = url => {
        var riskFactor = null;
        if (!isNil(url)) {
            let parsedUrl = new Url(url);
            if (parsedUrl.href.includes("utm_source") === true) {
                const urlParams = Url(parsedUrl.href, true);
                const utmSource = urlParams.query.utm_source;
                if (!isNil(utmSource)) {
                    if (utmSource.includes("Tanya-Jawab-Corona-High-Risk") === true) {
                        this.props.dispatchEvent(events.HighRiskClick)
                        riskFactor = "high";
                    } else if (
                        utmSource.includes("Tanya-Jawab-Corona-Med-Risk") === true
                    ) {
                        this.props.dispatchEvent(events.MediumRiskClick)
                        riskFactor = "medium";
                    }
                    // else if (
                    //   utmSource.includes("Tanya-Jawab-Corona-Low-Risk") === true
                    // ) {
                    //   riskFactor = "low";
                    // }
                }
            }
        }
        return riskFactor;
    };

    checkIfSupportedDeeplinkUrl = url => {
        if (!isNil(url)) {
            let parsedUrl = new Url(url);
            let host = parsedUrl.host;
            let pathSections = [];
            if (
                // host.includes("web.stage.halodoc.com") === true ||
                host.includes("stage.halodoc.com") === true ||
                host.includes("www.halodoc.com") === true
            ) {
                pathSections = parsedUrl.pathname.split("/");
                if (
                    pathSections.length >= 3 &&
                    pathSections[1].indexOf("tanya-dokter") !== -1 &&
                    pathSections[2].indexOf("cari") !== -1 &&
                    parsedUrl.href.includes("category_id") === true
                ) {
                    return true;
                }

            }
        }
        return false;
    };

    checkIfCovidCampaignUrl = url => {
        if (!isNil(url)) {
            let parsedUrl = new Url(url);
            let host = parsedUrl.host;
            let pathSections = [];
            if (
                // host.includes("web.stage.halodoc.com") === true ||
                host.includes("stage.halodoc.com") === true ||
                host.includes("www.halodoc.com") === true
            ) {
                if (
                    url.includes("utm_source=pulse-app&utm_medium=tile&utm_campaign=hd-prudential-covid-19") === true
                ) {
                    return true;
                }

            }
        }
        return false;
    };

    navigateToCorona(coronaRiskFactor, categoryId) {
        if (
            this.props.registrationStatus === RegistrationStatus.REGISTERED ||
            !isNil(this.props.haloDocUserId)
        ) {
            this.props.setCoronaSpecializationDetails(
                categoryId,
                "COVID-19",
                "https://d347hl3futa27v.cloudfront.net/doctor-categories-images/58538_15-3-2020_14-57-0.png"
            );
            this.props.setCovidAssessmentDetails(coronaRiskFactor, "COVID-19");
            this.props.gotoDocCovidSpecializationScreen(coronaRiskFactor, "COVID-19");
        } else {
            this.props.setCoronaSpecializationDetails(
                categoryId,
                "COVID-19",
                "https://d347hl3futa27v.cloudfront.net/doctor-categories-images/58538_15-3-2020_14-57-0.png"
            );
            // this.props.setCovidAssessmentDetails(coronaRiskFactor, "COVID-19");
            // this.props.pressConsultDoctor();
        }
    }

    wvOnNavigationStateChange = e => {
        let url = e.url;
        let parsedUrl = new Url(url);
        if (parsedUrl.query && parsedUrl.query.includes("Tanya-Jawab-Corona-Low-Risk")) {
            this.WebView && this.WebView.stopLoading();
            this.hideSpinner()
            return false;
        }

        if (
            url.startsWith("https://") &&
            (parsedUrl.href.includes("utm_source") === true ||
                parsedUrl.href.includes("category_id") === true)
        ) {
            // this.WebView.stopLoading();
        }
        if (url === "about:blank") {
            this.props.navigation.goBack();
        }
        let isSupportedDeeplinkUrl = this.checkIfSupportedDeeplinkUrl(url);
        let isCovidCampaignUrl = this.checkIfCovidCampaignUrl(url)
        if (isCovidCampaignUrl) {
            this.hideSpinner()
            return true;
        }

        if (isSupportedDeeplinkUrl) {
            let coronaRiskFactor = this.getCoronaRiskFactorIfPresent(url);
            if (coronaRiskFactor) {
                let categoryId = this.getCategoryId(url);
                this.navigateToCorona(coronaRiskFactor, categoryId)
            } else {
                this.WebView && this.WebView.stopLoading();
                return false;
            }
            // use the categoryId and coronaRiskFactor to launch the
            // screen which;
            //displays the doctor belonging to categoryId
        }
        else {
            this.WebView && this.WebView.stopLoading();
            return false;
        }
        return true;
    };

    hideSpinner() {
        this.setState({ loader: false });
    }

    handleOnMessage(data) {
        console.log("handleOnMessage::", JSON.stringify(data));
    }

    renderIOS = () => {
        const { url } = this.state;
        return (
            <View style={styles.container}>
                <View
                    style={styles.header}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._onClose.bind(this)}
                    >
                        <Image
                            style={styles.closeImage}
                            source={CLOSE_PAGE}
                            resizeMode={"contain"}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.webviewContainer}>
                    {Platform.OS === "ios" &&
                        this.state.url.includes("https://bit.ly/") ? (
                            <WebView
                                originWhitelist={["*"]}
                                source={{
                                    uri: url,
                                }}
                                onLoadEnd={() => this.hideSpinner()}
                                useWebKit={true}
                                allowFileAccess={false}
                                javaScriptEnabled={true}
                                injectedJavaScript={disableUserSelect}
                                domStorageEnabled={true}
                                cacheEnabled={false}
                                onNavigationStateChange={this.wvOnNavigationStateChange.bind(
                                    this
                                )}
                            />
                        ) : (
                            <WebView
                                originWhitelist={["*"]}
                                source={{
                                    uri: url,
                                }}
                                useWebKit={true}
                                allowFileAccess={false}
                                javaScriptEnabled={true}
                                injectedJavaScript={disableUserSelect}
                                domStorageEnabled={true}
                                onLoadEnd={() => this.hideSpinner()}
                                onError={e => console.log(" webview", e)}
                                onNavigationStateChange={this.wvOnNavigationStateChange.bind(
                                    this
                                )}
                                ref={c => {
                                    this.WebView = c;
                                }}
                                cacheEnabled={false}
                                onShouldStartLoadWithRequest={
                                    Platform.OS === "android"
                                        ? false
                                        : navState => {
                                            if (navState.url.includes("Tanya-Jawab-Corona-Low-Risk")) {
                                                return false;
                                            }
                                            if (
                                                navState.url.includes("https://bit.ly/2U6gBp9") || navState.url.includes("https://bit.ly/2vFL8AQ") ||
                                                navState.url.includes("https://bit.ly/3bcnxGV") || navState.url.includes("https://bit.ly/33xOpi4")
                                            ) {
                                                this.setState({
                                                    url: navState.url,
                                                });
                                                return false;
                                            }
                                            return true;
                                        }
                                }
                            />
                        )}
                    {this.state.loader && (
                        <ActivityIndicator
                            color={Colors.pulseRed}
                            style={styles.activityIdicator}
                            size="large"
                        />
                    )}
                </View>
            </View>
        );
    }

    checkIfHighMediumRiskBitlyUrl = url => {
        if (!isNil(url)) {
            if (
                url.includes("https://bit.ly/2U6gBp9") || url.includes("https://bit.ly/2vFL8AQ") ||
                url.includes("https://bit.ly/3bcnxGV") || url.includes("https://bit.ly/33xOpi4")
            ) {
                return true;
            }

        }
        return false;
    }


    wvAndroidOnNavigationStateChange = e => {
        let url = e.url;
        let parsedUrl = new Url(url);
        if (parsedUrl.query && parsedUrl.query.includes("Tanya-Jawab-Corona-Low-Risk")) {
            this.WebView && this.WebView.stopLoading();
            return false;
        }

        if (
            url.startsWith("https://") &&
            (parsedUrl.href.includes("utm_source") === true ||
                parsedUrl.href.includes("category_id") === true)
        ) {
            // this.WebView.stopLoading();
        }
        if (url === "about:blank") {
            this.props.navigation.goBack();
        }
        let isSupportedDeeplinkUrl = this.checkIfSupportedDeeplinkUrl(url);
        let isCovidCampaignUrl = this.checkIfCovidCampaignUrl(url)
        let isHighMediumBitlyUrl = this.checkIfHighMediumRiskBitlyUrl(url)
        if (isCovidCampaignUrl) {
            return true;
        }

        if (isHighMediumBitlyUrl) {
            return true;
        }

        if (isSupportedDeeplinkUrl) {
            let coronaRiskFactor = this.getCoronaRiskFactorIfPresent(url);
            if (coronaRiskFactor) {
                let categoryId = this.getCategoryId(url);
                this.navigateToCorona(coronaRiskFactor, categoryId)
            } else {
                this.WebView && this.WebView.stopLoading();
                return false;
            }
        }
        else {
            this.WebView && this.WebView.stopLoading();
            return false;
        }
        return true;
    };


    renderAndroid = () => {
        return (
            <View style={styles.container}>
                <View
                    style={styles.header}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._onClose.bind(this)}
                    >
                        <Image
                            style={styles.closeImage}
                            source={CLOSE_PAGE}
                            resizeMode={"contain"}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.webviewContainer}>
                    <WebView
                        originWhitelist={["*"]}
                        source={{
                            uri: this.state.url
                        }}
                        onLoadEnd={() => this.hideSpinner()}
                        useWebKit={true}
                        scalesPageToFit={true}
                        allowFileAccess={false}
                        javaScriptEnabled={true}
                        injectedJavaScript={disableUserSelect}
                        domStorageEnabled={true}
                        onMessage={evt => {
                            this.handleOnMessage(evt.nativeEvent.data);
                        }}
                        onError={e => console.log(" webview", e)}
                        onNavigationStateChange={this.wvAndroidOnNavigationStateChange.bind(this)}
                        ref={c => {
                            this.WebView = c;
                        }}
                    />
                    {this.state.loader && (
                        <ActivityIndicator
                            color={Colors.pulseRed}
                            style={styles.activityIdicator}
                            size="large"
                        />
                    )}
                </View>
            </View>
        );
    }


    render() {
        if (Platform.OS === "android") {
            return this.renderAndroid();
        } else {
            return this.renderIOS();
        }
    }
}

const mapStateToProps = state => ({
    paymentUrl: state.medicineDelivery.paymentUrl,
    registrationStatus: state.doctorServices.registrationStatus,
    haloDocUserId: state.auth.haloDocUserId,
});

export default connect(mapStateToProps, {
    dispatchEvent,
    setCoronaSpecializationDetails,
    gotoDocCovidSpecializationScreen,
    setCovidAssessmentDetails,
    resetCovidAssessmentDetails,
    pressConsultDoctor,
})(CoronaChatBot);
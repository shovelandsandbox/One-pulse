import React, { Component } from "react";
import { View, Text, ScrollView, Platform } from "react-native";
import MetaConstants from "../../meta";
import { PruBackHeader } from "../../../../components";
import { TextField } from "react-native-material-textfield";
import { connect } from "react-redux";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PruDropdownComponent from "../../../../components/PruDropdown";
import {
    CoreComponents,
    CoreServices,
    events,
} from "@pru-rt-internal/pulse-common";
import { dispatchEvent } from "../../../../actions";
const { AppButton } = CoreComponents;
const { NavigationService } = CoreServices;
import {
    updatePaymentDetails
} from "../../actions";
import _ from "lodash";
import {
  metaFinderVideoSale,
  metaLabelFinderVideoSale,
} from "../../configs/meta-utils";
import {registerEvent} from "../../../../utils/registerEvents/actions";
import {eventNames} from "../../events";

class GeneratePaymentLink extends Component {
    constructor(props) {
        super(props);
        this.metaConstants = { ...MetaConstants.screenMeta() };
        this.state = {
            selectedCurrency: ""
        };
    }

    componentDidMount(){
        const selectedCurrency = metaLabelFinderVideoSale("selectedCurrency");
        this.setState({selectedCurrency});
    }

    onCurrencySelection = selectedCurrency => {
        this.setState({ selectedCurrency });
    };

    formHasErrors = () => {
        let formHasErrors = false;
        if (_.isEmpty(this.state.paymentAmount)) {
            this.setState({ paymentAmountError: "Please enter amount" });
            formHasErrors = true;
        }
        if (_.isEmpty(this.state.proposalID)) {
            this.setState({ proposalIDError: "Please enter proposal ID" });
            formHasErrors = true;
        }
        return formHasErrors;
    }

    resetError = (stateProperty) => {
        this.setState({
            [stateProperty]: ""
        });
    }

    continuePaymentLink = () => {
        if (this.formHasErrors()) {
            return;
        }
        const payload = {
            customerName: this.state.customerName,
            paymentAmount: this.state.paymentAmount,
            orderRef: this.state.proposalID,
            serviceCode: metaLabelFinderVideoSale("serviceCode"),
            currency: this.state.selectedCurrency,
            pgCode: metaLabelFinderVideoSale("pgCode"),
            type: "payment-link"
        }
        this.props.updatePaymentDetails(payload);
        this.props.registerEvent(eventNames.generatePaymentLink)
        // this.props.dispatchEvent(events.generatePaymentLink);
        NavigationService.goBack(null);
    }

    prepareCurrencyPicker = () => {
        const currencyList = metaFinderVideoSale("currencyList");

        return (
            <PruDropdownComponent
                selectedValueCB={this.onCurrencySelection}
                selectedOption={this.state.selectedCurrency}
                options={currencyList}
                enabled={true}
            ></PruDropdownComponent>
        );
    };

    render() {
        return (
            <View style={styles.pulseContainer}>
                <PruBackHeader title={"Back"}></PruBackHeader>
                <ScrollView>
                    <KeyboardAwareScrollView
                        enableOnAndroid
                        contentContainerStyle={{ flexGrow: 1 }}
                        extraScrollHeight={Platform.OS == "ios" ? 15 : 50}>
                        <View style={styles.generateLinkLayout}>
                            <View style={styles.paymentLinkTitleContainer}>
                                <Text style={styles.titleText}>Generate Payment Link</Text>
                            </View>
                            <View>
                                <TextField
                                    ref={this.nameRef}
                                    value={this.props.chatDetails.participantName}
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                    onFocus={() => {
                                    }}
                                    onChangeText={value => {
                                    }}
                                    onSubmitEditing={value => { }}
                                    fontSize={12}
                                    textColor={"#434343"}
                                    tintColor={"#afafaf"}
                                    baseColor={"#afafaf"}
                                    label={"Customer Name"}
                                    disabled={true}
                                />
                                <TextField
                                    ref={this.nameRef}
                                    value={this.props.chatDetails.initiatedWith}
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                    onFocus={() => {
                                    }}
                                    onChangeText={value => {
                                    }}
                                    onSubmitEditing={value => { }}
                                    fontSize={12}
                                    textColor={"#434343"}
                                    tintColor={"#afafaf"}
                                    baseColor={"#afafaf"}
                                    label={"Customer Email"}
                                    disabled={true}
                                />
                                <TextField
                                    ref={this.nameRef}
                                    value={this.state.proposalID}
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                    onFocus={() => {
                                        this.resetError("proposalIDError");
                                    }}
                                    onChangeText={value => {
                                        this.setState({ proposalID: value });
                                    }}
                                    onSubmitEditing={value => { }}
                                    fontSize={12}
                                    textColor={"#434343"}
                                    tintColor={"#afafaf"}
                                    baseColor={"#afafaf"}
                                    label={"Proposal ID"}
                                    error={this.state.proposalIDError}
                                />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "center" }}>
                                <View style={{ width: 100 }}>
                                    {this.prepareCurrencyPicker()}
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TextField
                                        ref={this.nameRef}
                                        value={this.state.paymentAmount}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onFocus={() => {
                                            this.resetError("paymentAmountError");
                                        }}
                                        onChangeText={value => {
                                            this.setState({ paymentAmount: value })
                                        }}
                                        onSubmitEditing={value => { }}
                                        fontSize={12}
                                        textColor={"#434343"}
                                        tintColor={"#afafaf"}
                                        baseColor={"#afafaf"}
                                        label={"Payment Amount"}
                                        error={this.state.paymentAmountError}
                                    />
                                </View>
                            </View>
                            <View style={{ paddingTop: 40 }}>
                                <AppButton
                                    type={styles.requestPaymentButton}
                                    title={"Request Payment"}
                                    press={() => {
                                        this.continuePaymentLink();
                                    }}
                                />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </View>
        );
    }

}

const mapStateToProps = state => {
    return {
        chatDetails: state.videoSales.chatDetails,
    };
};

export default connect(mapStateToProps, {
    registerEvent,
    updatePaymentDetails,
    dispatchEvent
})(GeneratePaymentLink);

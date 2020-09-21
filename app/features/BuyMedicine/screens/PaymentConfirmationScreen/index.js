import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    BackHandler,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
    CoreComponents,
    events,
} from "@pru-rt-internal/pulse-common";
import styles from "./styles";

import debounce from "lodash/debounce";
import { path } from "ramda";
import { BACK } from "../../../../config/images";
import CardView from "react-native-cardview";
import MetaConstants from "../../meta";

import {
    addPromoCode,
    removePromocode,
    clearCoupon,
    fetchOrderByID,
    initiatePayment
} from "../../actions"
import { isNil, forEach } from "ramda";
import { Theme } from "../../../../themes";

import { dispatchEvent } from "../../../../actions";
const { Colors } = Theme;

const { AppButton } = CoreComponents;

class PaymentConfirmationScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            coupon: "",
            noCoupon: "",
            unit: "Rp",
        };
        this.MetaConstants = { ...MetaConstants.initializeBuyMedicineScreenMeta() };
    }

    componentDidMount() {
        this.props.dispatchEvent(events.PaymentSummaryScreen);
        this.props.clearCoupon();
        BackHandler.addEventListener("hardwareBackPress", this.onBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBack);
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            (this.props.isCouponFailure != prevProps.isCouponFailure &&
                this.props.isCouponFailure) ||
            (this.props.isCouponSuccess != prevProps.isCouponSuccess &&
                this.props.isCouponSuccess)
        ) {
            this.setState({
                noCoupon: "",
            });
        }
    }

    onBack = () => {
        this.props.navigation.goBack();
        // this.removePromocode();
    };

    onProceed = () => {
        this.props.dispatchEvent(events.MakePayment);
        this.props.initiatePayment(this.props.paymentSummary.orderId);
    };

    ApplyCoupon = () => {
        if (this.state.coupon.trim().length === 0) {
            this.setState({
                noCoupon: this.MetaConstants.medPromoEmptyError,
            });
            return;
        }
        this.props.dispatchEvent(events.PromocodeClick);
        this.props.addPromoCode(
            this.state.coupon,
            this.props.paymentSummary.orderId
        );
    };

    getMedicinePrice = () => {
        const { paymentSummary } = this.props;
        let totalAmount = 0;
        forEach((item) => {
            totalAmount += item.totalPrice ? item.totalPrice.amount : 0;
        }, paymentSummary.cart.items)
        return this.formattedStringToDec(totalAmount);
    };

    getTotalSaving = () => {
        const { paymentSummary } = this.props;
        let totalSaving = 0;
        forEach((item) => {
            if (item.type != "DELIVERYCHARGE" &&
                (path(["attributes", "attributes", "label"], item)) != "Delivery Fee") {
                totalSaving += item.amount ? item.amount.amount : 0;
            }
        }, paymentSummary.adjustments)
        return this.formattedStringToDec(totalSaving);
    };

    getDeliveryCharge = () => {
        const { paymentSummary } = this.props;
        let deliveryCharge = 0;
        forEach((item) => {
            if (item.attributes && item.attributes.attributes &&
                path(["attributes", "attributes", "label"], item) === "Delivery Fee") {
                deliveryCharge = item.amount ? item.amount.amount : 0;
            }
            // if (item.type === "DELIVERYCHARGE") {
            //   deliveryCharge = item.amount ? item.amount.amount : 0;
            // }
        }, paymentSummary.adjustments)
        return this.formattedStringToDec(deliveryCharge);
    };

    getManualDiscountAmount = () => {
        const { paymentSummary } = this.props;
        let discountPrice = 0;
        forEach((item) => {
            if (
                item.type === "DISCOUNT" &&
                path(["attributes", "attributes", "applied_by"], item) === "user"
            ) {
                discountPrice = item.amount ? item.amount.amount : 0;
            }
        }, paymentSummary.adjustments)
        return this.formattedStringToDec(discountPrice);
    };

    getAutoDiscountAmount = () => {
        const { paymentSummary } = this.props;
        let discountPrice = 0;
        forEach((item) => {
            if (
                item.type === "DISCOUNT" &&
                path(["attributes", "attributes", "applied_by"], item) != "user"
            ) {
                discountPrice = item.amount ? item.amount.amount : 0;
            }
        }, paymentSummary.adjustments)
        return this.formattedStringToDec(discountPrice);
    };

    getPayByCardAmount = () => {
        const { paymentSummary } = this.props;
        let discount = 0;
        forEach((item) => {
            if (item.type === "discount" && item.value === "card") {
                discount = item.amount;
            }
        }, paymentSummary.attributes.applicableAdjustment)
        return discount;
    };

    removePromocode = () => {
        this.props.removePromocode(
            this.state.coupon,
            this.props.paymentSummary.orderId
        );
    };

    formattedStringToDec = val => {
        if (!isNil(val)) {
            if (typeof val == "string" || val instanceof String) {
                return parseInt(val, 10)
                    .toFixed(1)
                    .toString();
            } else {
                return val.toFixed(1).toString();
            }
        }
    };

    renderCoupon() {
        const applyPromoCodeLabel = this.MetaConstants.medApplyPromo;
        const applyLabel = this.MetaConstants.medApply;
        const removeLabel = this.MetaConstants.medRemove;
        const couponOffersDesc = this.MetaConstants.medOffers;
        return (
            <CardView
                cardElevation={3}
                cardMaxElevation={3}
                cornerRadius={5}
                style={styles.cardViewStyle}
            >
                {this.props.isCouponSuccess ? (
                    <View
                        style={styles.couponViewMain}
                    >
                        <View style={styles.couponView}>
                            <Icon name="md-checkmark-circle" size={26} color={Colors.green2ba751} />
                            <Text
                                style={styles.couponText}
                            >
                                {this.state.coupon}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => this.removePromocode()}>
                            <Text style={styles.couponRemoveText}>{removeLabel}</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                        <View style={{ ...styles.ItemViewStyle, marginHorizontal: 0 }}>
                            <View style={styles.couponTextInputView}>
                                <TextInput
                                    style={styles.couponTextInput}
                                    placeholder={applyPromoCodeLabel}
                                    onChangeText={text => this.setState({ coupon: text.trim() })}
                                    value={this.state.coupon}
                                    maxLength={16}
                                />
                                {this.props.isCouponFailure && this.state.coupon.length >= 1 ? (
                                    <Text style={styles.promoError}>
                                        {this.MetaConstants.medPaySummaryPromoError}
                                    </Text>
                                ) : null}
                                {this.state.noCoupon && !this.state.coupon ? (
                                    <Text style={styles.noCoupon}>
                                        {this.state.noCoupon}
                                    </Text>
                                ) : null}
                            </View>
                            <TouchableOpacity
                                style={styles.applyButton}
                                onPress={this.ApplyCoupon.bind()}
                            >
                                <Text style={styles.applyText}>
                                    {applyLabel}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
            </CardView>
        );
    }

    footerView() {
        const toPayLabel = this.MetaConstants.medToPay;
        const paymentData = this.props.paymentSummary;
        const totalAmount = paymentData.totalAmount.amount;
        return (
            <View style={styles.footerView}>
                <View style={styles.deliveryView}>
                    <Text style={styles.deliveringOpcity}>{toPayLabel}</Text>
                    <Text style={styles.deliveringToLeft}>
                        {this.state.unit} {this.formattedStringToDec(totalAmount)}
                    </Text>
                </View>
                <View
                    style={{
                        flex: 0.4,
                        justifyContent: "center",
                        marginHorizontal: 20,
                        alignItems: "center",
                    }}
                >
                    <AppButton
                        title={this.MetaConstants.medPayMakePayment}
                        type={[styles.btn, styles.primary, styles.paddingHorizontal]}
                        press={debounce(() => this.onProceed(), 5000, {
                            leading: true,
                            trailing: false,
                        })}
                    />
                </View>
            </View>
        )
    }

    paymentView() {
        return (
            <View style={[styles.ItemViewStyle, styles.couponTextInputView]}>
                <Icon name="ios-pricetags" size={20} color={Colors.green2ba751} />
                <Text
                    style={styles.cardDiscountText}
                >
                    {this.MetaConstants.medPaySummaryMedCardDiscount}
                    {this.state.unit} {this.getPayByCardAmount()}
                </Text>
            </View>
        )
    }

    deliveryDetails() {
        const deliveringToLabel = this.MetaConstants.medDeliveringTo;
        const addressNameLabel = this.MetaConstants.medName;
        const addressDetailsLabel = this.MetaConstants.medAddress;
        const paymentData = this.props.paymentSummary;
        const address_name = paymentData.attributes.attribute.address_name;
        const address_details = paymentData.attributes.attribute.address_details;
        return (
            <CardView
                cardElevation={3}
                cardMaxElevation={3}
                cornerRadius={5}
                style={styles.cardViewStyle}
            >
                <Text style={styles.headerText}>{deliveringToLabel}</Text>
                <View style={styles.deliveryDetailsView}>
                    <Text style={styles.deliveryTextName}>
                        {addressNameLabel}: {address_name}
                    </Text>
                    <Text style={styles.deliveryTextAddress}>
                        {addressDetailsLabel}: {address_details}
                    </Text>
                </View>
            </CardView>
        )
    }

    headerView() {
        const paymentSummaryLabel = this.MetaConstants.medPaySummary;
        return (
            <View
                style={styles.container}
                elevation={5}
            >
                <View
                    style={styles.header}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.onBack();
                            this.props.navigation.goBack();
                        }}
                        style={styles.backButton}
                    >
                        <Image
                            style={styles.backImage}
                            source={BACK}
                        />
                        <Text
                            style={styles.summaryLabel}
                        >
                            {paymentSummaryLabel}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    paymentSummaryView() {
        const paymentDetailsLabel = this.MetaConstants.medPayDetails;
        const paymentData = this.props.paymentSummary;
        return (
            <View style={styles.headerView}>
                <CardView
                    cardElevation={3}
                    cardMaxElevation={3}
                    cornerRadius={5}
                    style={styles.cardViewStyle}
                >
                    <Text style={styles.headerText}>{paymentDetailsLabel}</Text>
                    <View
                        style={[
                            styles.ItemViewStyle,
                            styles.justifyContent,
                        ]}
                    >
                        <Text style={styles.itemStyle}>
                            {this.MetaConstants.medPaySummaryMedPrice}
                        </Text>
                        <Text style={styles.itemStyle}>
                            {this.state.unit} {this.getMedicinePrice()}
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.ItemViewStyle,
                            styles.justifyContent,
                        ]}
                    >
                        <Text style={styles.itemStyle}>
                            {this.MetaConstants.medPaySummaryMedDeliveryCharge}
                        </Text>
                        <Text style={styles.itemStyle}>
                            {this.state.unit} {this.getDeliveryCharge()}
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.ItemViewStyle,
                            styles.justifyContent,
                        ]}
                    >
                        <Text style={[styles.itemStyle, styles.color]}>
                            {this.MetaConstants.medPaySummaryMedManualCoupon}
                        </Text>
                        <Text style={[styles.itemStyle, styles.color]}>
                            {this.state.unit} {this.getManualDiscountAmount()}
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.ItemViewStyle,
                            styles.justifyContent,
                        ]}
                    >
                        <Text style={[styles.itemStyle, styles.color]}>
                            {this.MetaConstants.medPaySummaryMedAutoDiscount}
                        </Text>
                        <Text style={[styles.itemStyle, styles.color]}>
                            {this.state.unit} {this.getAutoDiscountAmount()}
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.ItemViewStyle,
                            styles.justifyContent,
                        ]}
                    >
                        <Text style={[styles.itemStyle, styles.fontWeight]}>
                            {this.MetaConstants.medPaySummaryTotalAmount}
                        </Text>
                        <Text style={[styles.itemStyle, styles.fontWeight]}>
                            {this.state.unit}{" "}
                            {this.formattedStringToDec(paymentData.totalAmount.amount)}
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.ItemViewStyle,
                            styles.justifyContent,
                        ]}
                    >
                        <Text
                            style={[
                                styles.itemStyle,
                                styles.color,
                                styles.fontWeight
                            ]}
                        >
                            {this.MetaConstants.medPaySummaryTotalSaving}
                        </Text>
                        <Text
                            style={[
                                styles.itemStyle,
                                styles.color,
                                styles.fontWeight
                            ]}
                        >
                            {this.state.unit} {this.getTotalSaving()}
                        </Text>
                    </View>
                </CardView>
            </View>
        )
    }

    render() {
        if (!this.props.paymentSummary) {
            return null;
        }
        return (
            <View style={styles.All}>
                {this.headerView()}
                <View style={styles.cartBackground}>
                    {this.paymentSummaryView()}
                    {this.renderCoupon()}
                    <View style={styles.headerView}>
                        {this.deliveryDetails()}
                    </View>

                    {this.getPayByCardAmount() > 0 ? this.paymentView() : null}
                    {this.footerView()}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    paymentSummary: state.medicineDelivery.paymentSummary,
    isCouponSuccess: state.medicineDelivery.isCouponSuccess,
    isCouponFailure: state.medicineDelivery.isCouponFailure,
});

export default connect(mapStateToProps, {
    addPromoCode,
    removePromocode,
    clearCoupon,
    fetchOrderByID,
    initiatePayment,
    dispatchEvent
})(PaymentConfirmationScreen);

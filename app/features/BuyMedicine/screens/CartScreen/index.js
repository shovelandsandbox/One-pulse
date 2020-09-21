import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
} from "react-native";
import debounce from "lodash/debounce";
import {
    CoreComponents,
    events,
} from "@pru-rt-internal/pulse-common";
import {
    BACK,
    Buymed_Plus_Active_Icon,
    Buymed_Plus_Inactive_Icon,
    Buymed_Minus_Icon,
} from "../../../../config/images";

import { PropTypes } from "prop-types";
import CardView from "react-native-cardview";
import ProductModal from "../../component/ProductModal/ProductModal";

import style from "./styles";
import MetaConstants from "../../meta";
import { dispatchEvent } from "../../../../actions";
import {
    updateCart,
    fetchOrder,
    navigatePayment,
    validateOrder,
    updateNotes
} from "../../actions"
import { isNil, path, forEach, find } from "ramda";

const { AppButton } = CoreComponents;

class CartScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cartItemsArr: [],
            cartTotalPrice: 0,
            value: "",
            display: false,
            doctorName: "",
            doctorImage: "",
            finalMedicineList: [],
            medicineUrl: "",
            name: "",
            description: "",
            totalAmount: "",
            selectedProduct: null,
            selectedConsultation: null,
            unit: "Rp",
            medList: []
        };

        this.onClose = this.onClose.bind(this);
        this.triggerModal = this.triggerModal.bind(this);
        this.MetaConstants = { ...MetaConstants.initializeBuyMedicineScreenMeta() };
    }
    componentDidMount() {
        this.props.dispatchEvent(events.MedCartScreenLoaded);
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.cartData &&
            this.props.cartData &&
            prevProps.cartData.status != this.props.cartData.status
        ) {
            const { prescriptionList, cartData } = this.props;
            let selectedConsultation = prescriptionList.filter(
                item => item.id == path(["attributes", "attribute", "consultation_id"], cartData)
            );
            let cartItemsArr = cartData.cart.items;
            let cartTotalPrice = this.calcCartTotal(cartItemsArr);
            if (cartData) {
                this.setState({
                    cartItemsArr: cartItemsArr,
                    cartTotalPrice: cartTotalPrice,
                    selectedConsultation:
                        selectedConsultation && selectedConsultation.length > 0 ? selectedConsultation[0] : null,
                });
            }
        }
    }

    onClose() {
        this.props.dispatchEvent(events.EMedCartProductDetailClose)
        this.setState({ display: false });
    }
    triggerModal(item, selectedProduct, imgUrL) {

        this.setState({
            medicineUrl: imgUrL,
            name: item.shortName,
            description: item.desc,
            display: true,
            selectedProduct: selectedProduct,
        });
    }

    calcCartTotal = cartItemsArr => {
        let cartTotalPrice = 0;
        forEach((eachItem) => {
            cartTotalPrice += path(["totalPrice", "amount"], eachItem);
        }, cartItemsArr)
        return cartTotalPrice;
    };

    calcCartItems = (itemObj, id, cartItemsArr) => {
        const existingCartItem =
            cartItemsArr && find((eachItem) =>
                path(["item", "id"], eachItem) === id, cartItemsArr)
        if (existingCartItem) {
            return forEach((eachItem) => {
                path(["item", "id"], eachItem) ? { ...itemObj } : eachItem
            }, cartItemsArr)

        }
        return [...cartItemsArr, { ...itemObj }];
    };

    increaseQuantity = (item, id) => {
        let itemObj = { ...item },
            cartItemsArr = [...this.state.cartItemsArr];
        if (itemObj.item.id === id) {
            if (itemObj.quantity >= 0) {
                itemObj.quantity += 1;
                itemObj.totalPrice.amount = itemObj.quantity * itemObj.unitPrice.amount;
            }
        }
        let index = cartItemsArr.findIndex(
            item => path(["item", "id"], item) === path(["item", "id"], itemObj)
        );
        cartItemsArr[index] = itemObj;
        let updatedCart = this.calcCartItems(itemObj, id, cartItemsArr);
        let cartTotalPrice = this.calcCartTotal(updatedCart);
        return { updatedCart, cartTotalPrice };
    };

    decreaseQuantity = (item, id) => {
        let itemObj = { ...item },
            cartItemsArr = [...this.state.cartItemsArr];
        updatedCart = [];
        if (itemObj.item.id === id) {
            if (itemObj.quantity > 0) {
                itemObj.quantity -= 1;
                itemObj.totalPrice.amount = itemObj.quantity * itemObj.unitPrice.amount;
                let index = cartItemsArr.findIndex(
                    item => path(["item", "id"], item) === path(["item", "id"], itemObj)
                );
                cartItemsArr[index] = itemObj;
                updatedCart = this.calcCartItems(itemObj, id, cartItemsArr);
            } else {
                return false;
            }
        }
        let cartTotalPrice = this.calcCartTotal(updatedCart);
        return { updatedCart, cartTotalPrice };
    };

    validateQuantity = (type, item, index, id) => {
        const { cartData } = this.props;
        let qtyObj = {};
        if (type === "add") {
            if (item.quantity !== path(["cart", "items", index, "quantity"], cartData)) {
                qtyObj = this.increaseQuantity(item, id);
            }
        } else {
            this.props.dispatchEvent(events.EMedCartQtyDecrClick);
            qtyObj = this.decreaseQuantity(item, id);
        }
        let { updatedCart, cartTotalPrice } = qtyObj;
        this.setState({ cartItemsArr: updatedCart, cartTotalPrice });
    };

    resetCart = () => {
        this.props.dispatchEvent(events.ResetClick);
        const { cartData } = this.props;
        let cartItemsArr = cartData.cart.items;
        forEach((eachItem) => {
            eachItem.totalPrice.amount =
                eachItem.quantity * eachItem.unitPrice.amount;
        }, cartItemsArr)
        let cartTotalPrice = this.calcCartTotal(cartItemsArr);

        this.setState({
            cartItemsArr: cartItemsArr,
            cartTotalPrice: cartTotalPrice,
        });
    };

    updateCart = () => {
        this.props.dispatchEvent(events.NextOnCartScreen);
        let formattedCartArr = [];
        forEach((item) => {
            let cartObj = {
                orderItemId: "",
                quantity: 0,
            };
            cartObj.orderItemId = item.item.id;
            cartObj.quantity = item.quantity;
            formattedCartArr.push(cartObj);
        }, this.state.cartItemsArr)
        this.props.updateNotes(this.props.cartData.orderId, this.state.value);
        this.props.updateCart(formattedCartArr, this.props.cartData.orderId);
        // this.props.navigation.navigate("PaymentConfirmationScreen");
    };

    validateOrder = () => {
        this.props.validateOrder(this.props.cartData.orderId);
        this.props.navigation.goBack();
    };

    checkPrescribedQty = () => {
        let isCheckPrescribedQty = false;

        const { selectedConsultation } = this.state;
        const { cartData } = this.props;
        if (!isNil(selectedConsultation)) {
            forEach((item) => {
                forEach((cartItem) => {
                    if (
                        cartItem.item.id === item.product_id &&
                        cartItem.quantity < item.quantity
                    ) {
                        isCheckPrescribedQty = true;
                    }
                }, path(["cart", "items"], cartData))
            }, path(["attributes", "medical_recommendation"], selectedConsultation))
        }
        return isCheckPrescribedQty;
    };
    checkOutOfStockQty = selectedId => {
        let isOutOfStock = false;
        const { cartData } = this.props;
        forEach((item) => {
            if (path(["item", "id"], item) === selectedId && item.quantity === 0) {
                isOutOfStock = true;
            }
        }, path(["cart", "items"], cartData))
        return isOutOfStock;
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

    renderItem = item => {
        let imgrUrl = "",
            selectedProduct = {};
        const { cartData, medicineList } = this.props;
        forEach((val) => {
            if (item.item.item.id === val.identifier[0].use) {
                imgrUrl = val.imageUrl;
                selectedProduct = val;
            }
        }, medicineList)
        let checkMedInStock =
            item.item.quantity === 0
                ? style.medInStockTrue
                : style.medInStockFalse;
        let prodDesc = !isNil(selectedProduct.attributes) ? selectedProduct.attributes[0].value.description : "";
        return (
            <View>
                <View style={checkMedInStock}>
                    <TouchableOpacity
                        style={style.cardTouch}
                        onPress={this.triggerModal.bind(
                            this,
                            item.item.item,
                            selectedProduct,
                            imgrUrl
                        )}
                    >
                        <Image
                            style={style.medImage}
                            source={{ uri: imgrUrl }}
                        />
                    </TouchableOpacity>
                    <View
                        style={style.medTextView}
                    >
                        <Text style={style.deliveringTo}>{path(["item", "item", "shortName"], item)}</Text>
                        {prodDesc ? (
                            <TouchableOpacity
                                onPress={this.triggerModal.bind(
                                    this,
                                    item.item.item,
                                    selectedProduct,
                                    imgrUrl
                                )}
                            >
                                <Text>{prodDesc}</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                    <View
                        style={style.medPrice}
                    >
                        <Text>
                            {this.state.unit} {this.formattedStringToDec(path(["item", "unitPrice", "amount"], item))}
                        </Text>
                        {this.checkOutOfStockQty(path(["item", "item", "id"], item)) ? (
                            <Text
                                style={style.outOfStockText}
                            >
                                {
                                    this.MetaConstants.medOutOfStock
                                }
                            </Text>
                        ) : (
                                <View
                                    style={style.iconsView}
                                >
                                    <TouchableOpacity
                                        onPress={this.validateQuantity.bind(
                                            this,
                                            "sub",
                                            item.item,
                                            item.index,
                                            path(["item", "item", "id"], item)
                                        )}
                                        disabled={path(["item", "quantity"], item) === 0}
                                    >
                                        <Image
                                            style={style.icon}
                                            source={Buymed_Minus_Icon}
                                        />
                                    </TouchableOpacity>

                                    <Text style={style.iconText}>
                                        {path(["item", "quantity"], item)}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={this.validateQuantity.bind(
                                            this,
                                            "add",
                                            item.item,
                                            item.index,
                                            path(["item", "item", "id"], item)
                                        )}
                                        disabled={
                                            path(["item", "quantity"], item) ==
                                            path(["cart", "items", item.index, "quantity"], cartData)
                                        }
                                    >
                                        <Image
                                            style={style.icon}
                                            source={
                                                path(["item", "quantity"], item) ==
                                                    path(["cart", "items", item.index, "quantity"], cartData)
                                                    ? Buymed_Plus_Inactive_Icon
                                                    : Buymed_Plus_Active_Icon
                                            }
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                    </View>
                </View>
            </View>
        );
    };

    headerView() {
        return (
            <View
                style={style.headerView}
                elevation={5}
            >
                <View
                    style={style.header}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.props.dispatchEvent(events.CartScreenBackClick);
                            this.validateOrder();
                        }}
                        style={style.headerButton}
                    >
                        <Image
                            style={style.back}
                            source={BACK}
                        />
                        <Text
                            style={style.headerText}
                        >
                            {this.MetaConstants.medCart}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderProductModal() {
        if (this.state.display) {
            this.props.dispatchEvent(events.ViewMedDetailClick);
            return (
                <ProductModal
                    selectedProduct={this.state.selectedProduct}
                    visible={this.state.display}
                    onClose={this.onClose}
                />
            );
        } else {
            return null;
        }
    }

    footerView() {
        const toPayLabel = this.MetaConstants.medToPay;
        return (
            <View style={style.footerView}>
                <View
                    style={style.footer}
                >
                    <Text style={style.deliveringOpcity}>{toPayLabel}</Text>
                    <Text style={style.deliveringToLeft}>
                        {this.state.unit}{" "}
                        {this.formattedStringToDec(this.state.cartTotalPrice)}
                    </Text>
                </View>
                <View
                    style={style.footerButtonView}
                >
                    <AppButton
                        title={this.MetaConstants.medNext}
                        type={[style.btn, style.primary]}
                        disable={this.state.cartTotalPrice ? false : true}
                        press={debounce(() => this.updateCart(), 5000, {
                            leading: true,
                            trailing: false,
                        })}
                    />
                </View>
            </View>
        )
    }

    alertView() {
        return (
            <View>
                <CardView
                    cardElevation={3}
                    cardMaxElevation={3}
                    cornerRadius={5}
                    style={style.cardViewStyle}
                >
                    <View
                        style={style.alertView}
                    >
                        <Text style={style.alertText}>
                            {
                                this.MetaConstants.medAlert
                            }
                        </Text>
                        <Text style={style.alertText}>
                            {
                                this.MetaConstants.medLessItem
                            }
                        </Text>
                    </View>
                </CardView>
            </View>
        )
    }

    medicineList() {
        return (
            <CardView
                cardElevation={3}
                cardMaxElevation={3}
                cornerRadius={5}
                style={style.cardViewStyle}
            >
                <FlatList
                    data={this.state.cartItemsArr}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={() => (
                        <View
                            style={style.list}
                        />
                    )}
                />
            </CardView>
        )
    }

    doctorNameView() {
        const cartResetLabel = this.MetaConstants.medCartReset;
        const medConsultLabel = this.MetaConstants.medForConsult;
        return (
            <View
                style={style.mainView2}
            >
                <View style={{ flex: 1 }}>
                    <Text style={style.deliveringTo}>{medConsultLabel}</Text>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <Image
                            style={style.docImage}
                            source={{
                                uri: this.props.doctorImage,
                            }}
                        />
                        <Text style={style.doctorPrescribed}>
                            {this.props.doctorName}
                        </Text>
                    </View>
                </View>
                <View
                    style={style.resetView}
                >
                    <TouchableOpacity
                        style={style.resetButton}
                        onPress={this.resetCart}
                    >
                        <Text style={style.resetText}>{cartResetLabel}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    deliveryDetailView() {
        const deliveringToLabel = this.MetaConstants.medDeliveringTo;
        const addressNameLabel = this.MetaConstants.medName;
        const addressDetailsLabel = this.MetaConstants.medAddress;
        const cartData = this.props.cartData;
        const address_name = cartData.attributes
            ? cartData.attributes.attribute.address_name
            : "";
        const address_details = cartData.attributes
            ? cartData.attributes.attribute.address_details
            : "";
        return (
            <CardView
                cardElevation={3}
                cardMaxElevation={3}
                cornerRadius={5}
                style={style.cardViewStyle}
            >
                <View
                    style={style.addressView}
                >
                    <Text style={style.deliveringTo}>{deliveringToLabel}</Text>
                    <Text style={style.deliveringTo}>
                        {addressNameLabel}: {address_name}
                    </Text>
                    <Text style={style.deliveringTo}>
                        {addressDetailsLabel}: {address_details}
                    </Text>
                </View>
            </CardView>
        )
    }
    instructionView() {
        const specialInstructions = this.MetaConstants.medCartInstructions;
        return (
            <CardView
                cardElevation={3}
                cardMaxElevation={3}
                cornerRadius={5}
                style={style.cardViewStyle}
            >
                <TextInput
                    style={style.notes}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    placeholder={specialInstructions}
                    onChangeText={text => this.setState({ value: text })}
                    value={this.state.value}
                />
            </CardView>
        )
    }

    render() {

        const cartData = this.props.cartData;
        let checkPrescribedQty = this.checkPrescribedQty();

        return (
            <View style={style.All}>
                {this.headerView()}
                <ScrollView style={style.cartBackground}>
                    {!cartData ? null : (
                        <View style={style.mainView}>
                            {this.doctorNameView()}
                            {!checkPrescribedQty ? null : this.alertView()}
                            <View style={style.cartBackgroundList}>
                                {this.medicineList()}
                            </View>
                            <View>
                                {this.deliveryDetailView()}
                            </View>
                            <View>
                                {this.instructionView()}
                            </View>
                        </View>
                    )}
                </ScrollView>
                {cartData && this.footerView()}
                {this.renderProductModal()}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    medicineList: state.medicineDelivery.medicineList,
    cartData: state.medicineDelivery.cartData,
    doctorName: state.medicineDelivery.doctorName,
    doctorImage: state.medicineDelivery.doctorImage,
    prescriptionList: state.medicineDelivery.prescriptionList,
});

export default connect(mapStateToProps, {
    updateCart,
    fetchOrder,
    navigatePayment,
    validateOrder,
    updateNotes,
    dispatchEvent
})(CartScreen);

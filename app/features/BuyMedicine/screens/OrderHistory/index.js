import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    SectionList,
} from "react-native";
import {
    events,
    metaHelpers as helpers,
    CoreConfig
} from "@pru-rt-internal/pulse-common";
import { BACK } from "../../../../config/images";
import styles from "./styles";
import MetaConstants from "../../meta";
import {
    getOrderHistory
} from "../../actions";
import { Theme } from "../../../../themes";
import { dispatchEvent } from "../../../../actions";
const { Colors } = Theme;
const { MED_MEDDELIVERY } = CoreConfig
const fetchLabel = (value, defaultValue) =>
    value ? value.label : defaultValue;

class OrderHistoryScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            orderHistory: [],
        };
        this.MetaConstants = { ...MetaConstants.initializeBuyMedicineScreenMeta() };
    }

    componentDidMount() {
        this.props.dispatchEvent(events.OrderHistoryPage);
        this.props.getOrderHistory();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps && nextProps.orderHistory) {
            const orderHistory = nextProps.orderHistory;
            console.log(":::: orderHistory", nextProps.orderHistory)
            return { orderHistory };
        }
        return [];
    }


    getStatusTranslatedText(status) {
        return fetchLabel(
            helpers.findElement(MED_MEDDELIVERY, status),
            status
        )
    }

    renderItem = item => {
        return (
            <View style={styles.orderItemContainer}>
                <Text style={styles.orderIdText}>
                    {this.MetaConstants.medOrderText}
                    {item.item.orderId}
                </Text>
                <View style={styles.orderDescriptionStatusContainer}>
                    <View style={styles.orderDescriptionContainer}>
                        {item.item.cart.items &&
                            item.item.cart.items.map((data, index) => (
                                <Text style={styles.medicineText} key={index.toString()}>
                                    {data.quantity}
                                    {" X "}
                                    {data.item.shortName}
                                </Text>
                            ))}
                    </View>
                    <View style={styles.statusView}>
                        <Text
                            style={[
                                {
                                    color:
                                        item.item.status === "ONGOING"
                                            ? Colors.green
                                            : item.item.status === "Delivered"
                                                ? Colors.green
                                                : Colors.pulseRed,
                                },
                                styles.statusText,
                            ]}
                        >
                            {this.getStatusTranslatedText(item.item.status)}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };


    headerView() {
        return (
            <View style={styles.orderHistoryHeaderContainer} elevation={5}>
                <View style={styles.backHandlerContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.dispatchEvent(events.EMedOrderHistoryBack);
                            this.props.navigation.goBack();
                        }}
                        style={styles.backIcon}
                    >
                        <Image style={styles.backIconImage} source={BACK} />
                        <Text style={styles.backHandlerText}>
                            {
                                this.MetaConstants.medOrderHistory
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={styles.listSeperator}
            />
        );
    };

    renderOrderList() {
        const ongoingOrder = this.MetaConstants.medOngoingOrder;
        const pastOrder = this.MetaConstants.medPastOrder;
        return (
            <View style={styles.orderListContainer}>
                <SectionList
                    sections={this.state.orderHistory}
                    keyExtractor={(item, index) => item + index}
                    renderItem={this.renderItem}
                    style={{ marginBottom: 10 }}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={styles.ordersHeaderContainer}>
                            <Text style={styles.ordersTitle}>{title == 1 ? ongoingOrder : pastOrder}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }

    renderNoHistory() {
        return (
            <Text
                style={styles.noHistoryText}
            >
                {this.MetaConstants.medNoOrder}
            </Text>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.headerView()}
                {this.state.orderHistory.length > 0
                    ? this.renderOrderList()
                    : this.renderNoHistory()}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    email: state.profile.email,
    orderHistory: state.medicineDelivery.orderHistory,
    language: state.userPreferences.language,
});

export default connect(mapStateToProps, {
    getOrderHistory,
    dispatchEvent,
})(OrderHistoryScreen);

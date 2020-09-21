import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from "react-native";
import {
    CoreConfig,
    events,
} from "@pru-rt-internal/pulse-common";
import { getLatLngFromAddress } from "../../utils/Geocoder/index";
import moment from "moment";
import { PropTypes } from "prop-types";
import { MEDICINE, BACK_WHITE } from "../../config/images";
import CardView from "react-native-cardview";
import style from "./styles";
import Modal from "react-native-modal";
import MetaConstants from "./meta";
import {
    checkAvailability,
    saveDoctorDetails,
    goProfile,
    gotoDocSpecializationScreen,
    resetState,
    resetAbandoned,
    getListOfMedicine,
} from "./actions";
import { isEmpty, isNil, concat, pathOr } from "ramda";
import { Theme } from "../../themes";
import { dispatchEvent } from "../../actions";
const { Colors } = Theme;
const {
    pageKeys,
} = CoreConfig;

class ConsultationList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ePrescription: true,
            notValidAddress: false,
            noAddress: false,
            latitude: 0,
            longitude: 0,
        };
        this.MetaConstants = { ...MetaConstants.initializeBuyMedicineScreenMeta() };
    }

    componentDidMount() {
        this.props.dispatchEvent(events.BuyMedicineScreen);
        this.props.resetState();
        this.init();
    }

    // eslint-disable-next-line complexity
    init = async () => {
        const { address1, address3 } = this?.props?.profile;
        const address = address1 + "," + address3;
        const location = await getLatLngFromAddress(address);
        if (
            !isNil(address1) && !isEmpty(address1) &&
            !isNil(address3) && !isEmpty(address3) &&
            location?.lat
        ) {
            this.props.checkAvailability(
                location?.lat?.toString(),
                location?.lng?.toString()
            );
            this.setState({
                latitude: location?.lat?.toString(),
                longitude: location?.lng?.toString(),
                noAddress: false,
                notValidAddress: false,
            });
        } else {
            this.setState({
                noAddress: !address1 || !address3 ? true : false,
                notValidAddress: address1 && address3 && !location?.lat ? true : false,
            });
        }
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        // check risklevel from response to toggle alert text and icon
        if (
            !isNil(nextProps.isServiceable) &&
            !isEmpty(nextProps.isServiceable) &&
            nextProps.isServiceable //needed for actual API
        ) {
            if (nextProps.isServiceable === "No Service") {
                return {
                    notValidAddress: true,
                };
            } else {
                return {
                    ePrescription: false,
                };
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.profile &&
            this.props.profile &&
            (prevProps.profile.address1 != this.props.profile.address1 ||
                prevProps.profile.address3 != this.props.profile.address3)
        ) {
            this.init();
        }
    }

    calculateConsultationDay(data) {
        if (data) {
            const daysAgo = this.MetaConstants.medDaysAgo;
            const today = moment();
            const start = moment(data.startTime);

            const diff = today.diff(start.startOf("day"), "days");
            const stringToDisplay =
                diff < 1
                    ? this.MetaConstants.medToday
                    : diff.toString() + " " + daysAgo;
            return stringToDisplay;
        }
    }

    renderItem = item => {
        return (
            <CardView
                cardElevation={3}
                cardMaxElevation={3}
                cornerRadius={10}
                style={style.cardViewStyleDoc}
            >
                <TouchableOpacity
                    style={style.cardViewTouchabelStyle}
                    onPress={this.Press.bind(this, item)}
                >
                    <View
                        style={style.cardViewMainView}
                    >
                        <Image
                            style={style.cardViewImage}
                            source={{ uri: item.item.doctor.externalIds.image_url }}
                        />
                        <View style={style.cardViewTextView}>
                            {item.item.attributes ? (
                                <Text style={style.docName}>
                                    {item.item.doctor.externalIds.pre_salutation}{" "}
                                    {item.item.attributes.doctor_first_name}{" "}
                                    {item.item.attributes.doctor_last_name
                                        ? item.item.attributes.doctor_last_name
                                        : ""}
                                </Text>
                            ) : null}
                            <Text
                                style={style.consultationTime}
                            >
                                {this.calculateConsultationDay(item.item.consultationTime)}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </CardView>
        );
    };

    Press = item => {
        this.props.dispatchEvent(events.ConsultationPurchaseMedClick);
        let salutation = pathOr("", ["item", "doctor", "externalIds", "pre_salutation"], item)
        let firstName = pathOr("", ["item", "attributes", "doctor_first_name"], item)
        let lastName = pathOr("", ["item", "attributes", "doctor_last_name"], item)
        var name = `${salutation} ${firstName} ${lastName}`;

        this.props.saveDoctorDetails(
            name,
            item.item.doctor.externalIds.image_url
        );

        this.props.getListOfMedicine(
            item.item.id,
            this.state.latitude,
            this.state.longitude,
            item.item.attributes.medical_recommendation
        );
    };

    GotoHistory = () => {
        this.props.dispatchEvent(events.OrderHistory);
        this.props.navigation.navigate("OrderHistoryScreen");
    };

    GotoProfile = () => {
        this.props.dispatchEvent(events.YourAccountLink);
        const { userProfile, userIcon } = this.props;
        this.props.goProfile({
            path: pageKeys.NEWPROFILE,
            userData: {
                ...userProfile,
                profilePicture: userIcon
            },
            editable: true,
            related: false,
            newProfile: false
        });
    };
    GotoTalktodoctor = () => {
        this.props.dispatchEvent(events.TalkToDoc);
        this.props.gotoDocSpecializationScreen();
    };

    renderIsOrderProcessing = () => {
        if (this.props.isOrderProcessing) {
            this.props.dispatchEvent(events.LongerThenExpected);
            return (
                <View
                    style={style.orderProcessingView}
                >
                    <ActivityIndicator size="large" color={Colors.pulseRed}></ActivityIndicator>
                    <Text
                        style={style.orderProcessingText}
                    >
                        {
                            this.MetaConstants.medCheckAvailibility
                        }
                    </Text>
                </View>
            );
        } else {
            return null;
        }
    };

    resetAbandoned = () => {
        this.props.dispatchEvent(events.okButtonClick);
        this.props.resetAbandoned();
    };

    renderAbandoned = () => {
        if (this.props.isOrderAbandoned) {
            this.props.dispatchEvent(events.CantPlaceOrder);
            return (
                <Modal
                    isVisible={this.props.isOrderAbandoned}
                    useNativeDriver={true}
                    animationIn={"fadeInUp"}
                    animationOut={"fadeInDown"}
                    animationInTiming={500}
                    hideModalContentWhileAnimating={true}
                    style={style.modal}
                >
                    <View
                        style={style.modalView}
                    >
                        <Text style={style.modalText}>
                            {
                                this.MetaConstants.medOrderNotProcessed
                            }
                        </Text>
                        <TouchableOpacity
                            style={style.modalButton}
                            onPress={this.resetAbandoned}
                        >
                            <Text
                                style={style.modalButtonText}
                            >
                                {this.MetaConstants.medOk}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            );
        } else {
            return null;
        }
    };

    noAddressView() {
        const yourAccount = this.MetaConstants.medYourAccount
        const toProceed = this.MetaConstants.medToProceed
        const noAddressLabel = this.MetaConstants.medNoAddress
        let indexOFDot = noAddressLabel.indexOf(".")
        let firstText
        let secondText
        if (indexOFDot !== -1) {
            firstText = noAddressLabel.substring(0, indexOFDot + 1)
            secondText = noAddressLabel.substring(indexOFDot + 1)
        } else {
            firstText = noAddressLabel
            secondText = ""
        } 
        return (

        <View style={style.noAddressView}>
            <Text style={style.noAddressText}>{firstText}{" "}</Text>
            <Text style={style.noAddressText}>{secondText.trim()} {" "}</Text>
            <TouchableOpacity onPress={this.GotoProfile.bind()}>
                <Text style={style.noAddressTextProfile}>{yourAccount}{" "}</Text>
            </TouchableOpacity>
            <Text style={style.noAddressText}>{toProceed}</Text>
        </View>
           
        )
    }

    notValidAddress() {
        const noDelivery = this.MetaConstants.medNoDelivery
        const yourAccount = this.MetaConstants.medYourAccount
        const toProceed = this.MetaConstants.medToProceed
        let indexOFDot = noDelivery.indexOf(".")
        let firstText
        let secondText
        if (indexOFDot !== -1) {
            firstText = noDelivery.substring(0, indexOFDot + 1)
            secondText = noDelivery.substring(indexOFDot + 1)
        } else {
            firstText = noDelivery
            secondText = ""
        } 
        return (
        <View style={style.noValidView}>
            <Text style={style.noAddressText}>{firstText}{" "}</Text>
            <Text style={style.noAddressText}>{secondText.trim()} {" "}</Text>
            <TouchableOpacity onPress={this.GotoProfile.bind()}>
                <Text style={style.noValidTextProfile}>{yourAccount}{" "}</Text>
            </TouchableOpacity>
            <Text style={style.noValidText}>{toProceed}</Text>
        </View>
           
        )
    }

    noEPrescriptionView() {
        const noEPrescription = this.MetaConstants.medEprescription
        const doctorConsultation = this.MetaConstants.medDocConsultation
        const onPulseContinue = this.MetaConstants.medOnPulseContinue
        
        let indexOFDot = noEPrescription.indexOf(".")
        let firstText
        let secondText
        if (indexOFDot !== -1) {
            firstText = noEPrescription.substring(0, indexOFDot + 1)
            secondText = noEPrescription.substring(indexOFDot + 1)
        } else {
            firstText = noEPrescription
            secondText = ""
        } 

        return (
            <View style={style.prescriptionView}>
                <Text style={style.noAddressText}>{firstText}{" "}</Text>
                <Text style={style.noAddressText}>{secondText.trim()} {" "}</Text>
                <TouchableOpacity onPress={this.GotoTalktodoctor.bind()}>
                    <Text style={style.prescriptionTextDoc}>{doctorConsultation}{" "}</Text>
                </TouchableOpacity>
                <Text style={style.prescriptionText}>{onPulseContinue}</Text>
            </View>

     
        )
    }

    perscriptionView() {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.prescriptionList}
                renderItem={this.renderItem}
            />
        )
    }

    containerHeader() {
        const selectConsultation = this.MetaConstants.medSelectConsultation;
        const orderHistory = this.MetaConstants.medOrderHistory;
        return (
            <View
                style={style.mainContainerView}
            >
                <Text style={style.cunsultationheading}>
                    {" "}
                    {selectConsultation}{" "}
                </Text>
                <TouchableOpacity onPress={this.GotoHistory.bind()}>
                    <Text style={style.listOrderHeading}>{orderHistory}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    headerView() {
        const purchaseMed = this.MetaConstants.medPurchased;
        return (
            <ImageBackground
                source={MEDICINE}
                style={style.backgroundImage}
            >
                <View style={style.header}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.dispatchEvent(events.BackConsultationListClick);
                            this.props.navigation.goBack();
                        }}
                        style={style.back}
                    >
                        <Image
                            style={style.backImage}
                            source={BACK_WHITE}
                        />
                    </TouchableOpacity>
                    <Text style={style.purchaseheader}>{purchaseMed}</Text>
                </View>
            </ImageBackground>
        )
    }
    render() {
        this.props.dispatchEvent(events.SelectConsultationScreen);
        const { ePrescription, notValidAddress, noAddress } = this.state;
        return (
            <View style={style.container}>
                {this.headerView()}
                <View style={style.mainContainer}>
                    {this.containerHeader()}
                    {!ePrescription ? this.noEPrescriptionView() : this.perscriptionView()}
                    {notValidAddress && this.notValidAddress()}
                    {noAddress && this.noAddressView()}
                </View>
                {this.renderIsOrderProcessing()}
                {this.renderAbandoned()}
            </View >
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    userProfile: state.profile,
    isServiceable: state.medicineDelivery.isServiceable,
    prescriptionList: state.medicineDelivery.prescriptionList,
    isOrderProcessing: state.medicineDelivery.isOrderProcessing,
    userIcon: state.profile.profilePicture,
    isOrderAbandoned: state.medicineDelivery.isOrderAbandoned,
});

export default connect(mapStateToProps, {
    checkAvailability,
    saveDoctorDetails,
    goProfile,
    gotoDocSpecializationScreen,
    resetState,
    resetAbandoned,
    getListOfMedicine,
    dispatchEvent,
})(ConsultationList);

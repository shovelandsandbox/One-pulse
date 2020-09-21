import React, { PureComponent } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    ImageBackground,
} from "react-native";
import CheckBox from "react-native-check-box";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { PruBackHeader } from "../../../components";
import { connect } from "react-redux";
import styles from "./styles";
import MetaConstants from "./meta";
import { REWARDS_BACKGROUND } from "../../../config/images";
import {
    colors,
    CoreActionTypes,
    CoreComponents,
    CoreConfig,
    CoreConstants,
    events
} from "@pru-rt-internal/pulse-common";
import { gotoCongratulationsScreen, dispatchEvent, gotoMydocReferFriend } from "../../../actions";
import { Theme } from "../../../themes";
import { isNil } from "ramda";
const { Styles, Colors } = Theme;
const { AppButton } = CoreComponents;
const { pageKeys } = CoreConfig;

class MyDocWizardRegn extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            showResend: false,
        }
        this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
    componentDidMount() {
        this.props.dispatchEvent(events.WizardMyDocDetails);
    }
    render() {
        return (
            <SafeAreaView style={styles.screenContainer}>
                {this.renderBackHeader()}
                <ScrollView style={styles.scrollContainer}>
                    {this.renderOfferDetails()}
                    {this.renderActivate()}
                    {this.renderRegnDetails()}
                </ScrollView>
            </SafeAreaView>
        )
    }
    renderBackHeader = () => {
        const {
            mydocWizTitle,
        } = this.metaConstants;
        return (
            <View style={styles.backContainer}>
                <PruBackHeader title={mydocWizTitle}></PruBackHeader>
            </View>
        );
    }
    renderOfferDetails = () => {
        const {
            offerDescription, offerTerms
        } = this.metaConstants;
        return (
            <ImageBackground style={styles.offerContainer} source={REWARDS_BACKGROUND}>
                <View>
                    <Text style={[styles.textBold, styles.textAlignCenter, { paddingBottom: 10, color: Colors.pulseRed }]}>
                        {offerDescription}
                    </Text>
                    {offerTerms.map((termItem) => {
                        return (
                            <View style={{ flexDirection: "row", paddingHorizontal: 15 }}>
                                <MaterialIcons
                                    style={{}}
                                    pointerEvents="none"
                                    name="check"
                                    size={18}
                                    color={Colors.black}
                                />
                                <Text>{termItem}</Text>
                            </View>
                        )
                    })}
                </View>
            </ImageBackground>
        );
    }
    renderMydocTnc = () => {
        const { preConMydocConsent } = this.metaConstants;
        return (
            <View style={styles.tncContainer}>
                <CheckBox
                    onClick={() => {
                        const nextCheckedState = !this.state.isChecked;
                        this.setState({
                            isChecked: nextCheckedState,
                        });
                    }}
                    style={styles.iAccept}
                    isChecked={this.state.isChecked}
                    // rightText={consentText}
                    rightText={preConMydocConsent}
                    rightTextStyle={styles.iAcceptText}
                    checkBoxColor={Colors.pulseRed}
                />
            </View>
        );
    }
    renderActivate = () => {
        const { activateMyFreeVoucher, skipDontNeedFreeVoucher } = this.metaConstants;
        return (
            <View style={styles.activateOrIgnoreContainer}>
                <AppButton
                    title={activateMyFreeVoucher}
                    press={() => {
                        this.props.dispatchEvent(events.WizardMyDocEarnedVoucher);
                        this.props.gotoMydocReferFriend();
                    }}
                    type={[Styles.btn, Styles.primary, { width: 300 }]}
                />
                <View style={{ marginVertical: 2 }}></View>
            </View>
        );
    }

    renderRegnDetails = () => {
        const {
            userDetailTitle
        } = this.metaConstants;
        const { isdCode } = this.props.countryCommonMeta;
        const {
            externalIds: {
                NATIONAL_ID
            },
            email,
            countryCode,
            gender,
            address1,
            address2,
            dob,
            phone,
            firstName,
            surName
        } = this.props.profile;
        const userDetails = [
            { labelKey: "mydocWizIdNumberLabel", value: NATIONAL_ID, isDisplayed: !isNil(NATIONAL_ID) },
            { labelKey: "mydocWizFirstNameLabel", value: firstName, isDisplayed: !isNil(firstName) },
            { labelKey: "mydocWizLastNameLabel", value: surName, isDisplayed: !isNil(surName) },
            { labelKey: "mydocWizDateOfBirthLabel", value: dob, isDisplayed: !isNil(dob) },
            { labelKey: "mydocWizGenderLabel", value: gender, isDisplayed: !isNil(gender) },
            { labelKey: "mydocWizAddressLabel", value: address1, isDisplayed: !isNil(address1) },
            { labelKey: "mydocWizEmailLabel", value: email, isDisplayed: !isNil(email) },
            { labelKey: "mydocWizPhoneNumberLabel", value: `+${isdCode}-${phone}`, isDisplayed: !isNil(phone) },
        ];
        return (
            <View style={styles.regnUserContainer}>
                <View style={{ paddingBottom: 15 }}>
                    <Text style={{ color: Colors.black, fontSize: 20 }}>
                        {userDetailTitle}
                    </Text>
                </View>
                {userDetails.map((userDetailItem) => {
                    if (userDetailItem.isDisplayed) {
                        return (
                            <View style={{ flexDirection: "row", paddingBottom: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <Text>{this.metaConstants[userDetailItem.labelKey]}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: "bold" }}>
                                        {userDetailItem.value}
                                    </Text>
                                </View>
                            </View>
                        );
                    }
                })}
            </View>
        );
    }

}

const getProfileSelector = (state) => {
    return {
        ...state.profile,
        externalIds: state.profile.externalIds || {}
    }
}

const mapStateToProps = state => {
    return {
        profile: getProfileSelector(state),
        countryCommonMeta: state.meta.countryCommonMeta,
        workflowId: state.doctorServices.workflowId,
        verifiedPhoneNumber: state.doctorServices.mobileNumber,
        registrationStatus: state.doctorServices.registrationStatus,
        error: state.doctorServices.error,
    }
}

const mapDispatchToProps = {
    gotoCongratulationsScreen,
    gotoMydocReferFriend,
    dispatchEvent,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDocWizardRegn);

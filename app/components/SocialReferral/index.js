import React from 'react';
import { View, Modal, PermissionsAndroid, Share, Platform, Linking } from 'react-native';
import { connect } from 'react-redux'
import Contacts from "react-native-contacts";
import { UserConsent, InviteFinish, InviteStart } from "../../features/socialInvite/components";
import {
    CoreActionTypes,
    CoreConfig
} from "@pru-rt-internal/pulse-common";
import {
    WHATSAPP_ICON,
    FLAT,
    INVITE_START,
    INVITE_FINISH,
    PHONE_BOOK,
    LINE_ICON,
} from "../../config/images";
import {
    SOCIAL_REFERRAL_DISABLE_INVITE_DONE_MODAL,
    CLOSE_SOCIAL_REFERRAL_MODAL
} from '../../actions/Types'
import MetaConstants from "./meta";

const {
    HOMEREWARD,
} = CoreConfig;

class SocialReferral extends React.Component {
    constructor() {
        super()
        this.state = {
            enableStartShare: false,
            enableUserConsent: false,
            shareType: ""
        }
        this.MetaConstants = { ...MetaConstants.initializeScreenMeta(), getLabelByContext: MetaConstants.getLabelByContext };

    }
    componentDidUpdate(prevProps, prevState) {
        const { enableStartShare } = this.state;
        if (prevState.enableStartShare !== enableStartShare && enableStartShare == true) {
            setTimeout(() => {
                this.onShare();
            }, 500);
        }
    }

    onShare = async () => {
        const { socialShareReferralContext } = this.props;
        const { shareType } = this.state;
        const fitter_with_app = this.MetaConstants.getLabelByContext(socialShareReferralContext, HOMEREWARD).shareMessage
        switch (shareType) {
            case "whatsapp":
                Linking.openURL(`whatsapp://send?text=${`${fitter_with_app} 
              ${this.props.referralDescription}`}`);
                break;
            case "line":
                Linking.openURL(`https://line.me/R/msg/text/?${encodeURIComponent(`${fitter_with_app} 
              ${this.props.referralDescription}`)}`);
                break;
        }
        this.setState({ enableStartShare: false, shareType: "" });
    };


    goToSocialInviteScreen = () => {
        const { goToScreen } = this.props;
        this.setState({ enableUserConsent: false });
        if (Platform.OS === "android") {
            try {
                const granted = PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_CONTACTS
                );
                granted.then(res => {
                    if (res === PermissionsAndroid.RESULTS.GRANTED) {
                        goToScreen("SocialInvite", {});
                    }
                });
            } catch (err) {
                console.warn(err);
            }
        } else {
            Contacts.checkPermission((err, permission) => {
                if (err) throw err;
                // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
                if (permission === 'undefined') {
                    Contacts.requestPermission((err, permission) => {
                        if (permission === 'authorized') {
                            goToScreen("SocialInvite", {});
                        }
                    })
                }
                if (permission === 'authorized') {
                    goToScreen("SocialInvite", {});
                }
            })
        }
    }

    hideInviteDoneModal = () => {
        const { disableInviteDoneModal } = this.props;
        disableInviteDoneModal();
    }

    handleInviteTilePress = id => {
        const { closeReferralModal } = this.props;
        closeReferralModal();
        switch (id) {
            case "line":
            case "whatsapp":
                this.setState({ enableStartShare: true, shareType: id });
                break;
            case "phonebook":
                this.setState({ enableUserConsent: true });
                break;
        }
    }

    renderInvitationModal = () => {
        const { socailShareReferral, closeReferralModal, socialShareReferralContext } = this.props;
        const title = this.MetaConstants.getLabelByContext(socialShareReferralContext).inviteFriendVia;
        const skip = this.MetaConstants.skip;
        const appTiles = [
            {
                id: "whatsapp",
                title: this.MetaConstants.whatsapp,
                content: this.MetaConstants.getLabelByContext(socialShareReferralContext).whatsappContent,
                image: {
                    source: WHATSAPP_ICON,
                    height: 44,
                    width: 44,
                },
                titleColor: "#4caf50",
            },
            {
                id: "phonebook",
                title: this.MetaConstants.phonebook,
                content: this.MetaConstants.getLabelByContext(socialShareReferralContext).phonebookContent,
                image: {
                    source: PHONE_BOOK,
                    height: 44,
                    width: 34,
                },
                titleColor: "#6d3a00",
            },
            {
                id: "line",
                title: this.MetaConstants.line,
                content: this.MetaConstants.getLabelByContext(socialShareReferralContext).lineContent,
                image: {
                    source: LINE_ICON,
                    height: 44,
                    width: 44,
                },
                titleColor: "#00B900",
            },
        ];
        return (
            <Modal
                transparent={true}
                visible={socailShareReferral}
                animationType="slide"
            >
                <View style={{ backgroundColor: "rgba(0,0,0,0.3)", flex: 1, justifyContent: "flex-end", }}>
                    <InviteStart
                        title={title}
                        data={appTiles}
                        skip={skip}
                        onSkipPress={closeReferralModal}
                        onTilePress={this.handleInviteTilePress}
                    />
                </View>
            </Modal>
        );
    };

    renderInvitationDoneModal = () => {
        const { referralEnableInviteDone } = this.props;
        const title = this.MetaConstants.awesome;
        const subtext = this.MetaConstants.thanksMessage;
        const continueText = this.MetaConstants.getStarted;
        return (
            <Modal
                transparent={true}
                visible={referralEnableInviteDone}
                animationType="slide"
            >
                <View style={{ backgroundColor: "rgba(0,0,0,0.3)", flex: 1, justifyContent: "flex-end", }}>
                    <InviteFinish
                        backgroundImage={INVITE_FINISH}
                        title={title}
                        subtext={subtext}
                        midImage={FLAT}
                        continueButtonText={continueText}
                        onContinuePress={this.hideInviteDoneModal}
                    />
                </View>
            </Modal>
        );
    };

    renderuserConsentModal = () => {
        const { enableUserConsent } = this.state;
        const { socialShareReferralContext } = this.props;
        const titleText = this.MetaConstants.accessRequired;
        const messageText = this.MetaConstants.getLabelByContext(socialShareReferralContext).accessMessage;
        const skipText = this.MetaConstants.skip;
        const allowAccessText = this.MetaConstants.allowAccess;
        return (
            <Modal
                transparent={true}
                visible={enableUserConsent}
                animationType="slide"
            >
                <View style={{ backgroundColor: "rgba(0,0,0,0.3)", flex: 1, justifyContent: "flex-end", }}>
                    <UserConsent
                        title={titleText}
                        message={messageText}
                        skip={skipText}
                        allowAccess={allowAccessText}
                        onSkipPress={() => { this.setState({ enableUserConsent: false }) }}
                        onAllowAccessPress={this.goToSocialInviteScreen}
                    />
                </View>
            </Modal>
        );
    };

    render() {
        const { socailShareReferral, referralEnableInviteDone } = this.props;
        const { enableUserConsent } = this.state;
        return (
            <View>
                {socailShareReferral && this.renderInvitationModal()}
                {referralEnableInviteDone && this.renderInvitationDoneModal()}
                {enableUserConsent && this.renderuserConsentModal()}

            </View>
        )
    }
}


const mapStateToProps = state => ({
    socailShareReferral: state.socialReferralReducer.socailShareReferral,
    socialShareReferralContext: state.socialReferralReducer.socialShareReferralContext,
    referralEnableInviteDone: state.socialReferralReducer.referralEnableInviteDone,
    referralDescription: state.referralGroup.referralDescription,

})

const mapDispatchToProps = dispatch => ({
    disableInviteDoneModal: (key) => {
        dispatch({
            context: "SOCIAL_REFERRAL",
            type: SOCIAL_REFERRAL_DISABLE_INVITE_DONE_MODAL,
            payload: {},
        });
    },
    closeReferralModal: (key) => {
        dispatch({
            context: "SOCIAL_REFERRAL",
            type: CLOSE_SOCIAL_REFERRAL_MODAL,
            payload: {},
        });
    },
    goToScreen: (screen, payload) => {
        dispatch({
            type: CoreActionTypes.GO_TO_SCREEN,
            navigateTo: screen,
            payload,
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SocialReferral)

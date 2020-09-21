import React, { PureComponent } from "react";
import { SafeAreaView, View, TouchableOpacity, ImageBackground, Text } from "react-native";
import { connect } from "react-redux";
import { Theme } from "../../../themes";
const { Styles, Colors } = Theme;
import styles from "./styles";
import MetaConstants from "./meta";
import { CLOSE_WHITE } from "../../../config/images";
import {
    CoreComponents,
    CoreActionTypes,
    events
} from "@pru-rt-internal/pulse-common";
const { AppButton } = CoreComponents;
import { gotoRegistrationSuccess, dispatchEvent } from "../../../actions";
import {
    safeMetaLabelFinder,
    safeMetaContextLabelFinder,
} from "../../../utils/meta-utils";
import PruShareModal from "../../../components/PruShare/withModal";

class MyDocGiftVoucher extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
        this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
    componentWillMount() {
        this.props.dispatchEvent(events.WizardMyDocShareVoucher);
    }
    render() {
        const { mydocGiftVoucherBackground, mydocGiftVoucherButton } = this.metaConstants;
        const { shareReferral } = this.props;
        return (
            <SafeAreaView style={styles.screenContainer}>
                <View style={styles.closeButton}>
                    <TouchableOpacity onPress={() => {
                        this.props.gotoRegistrationSuccess();
                    }}>
                       <Text style={{ color: Colors.pulseRed, fontWeight: "400" }}>Skip</Text> 
                    </TouchableOpacity>
                </View>
                <ImageBackground style={styles.backgroundImage} source={{ uri: mydocGiftVoucherBackground }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={styles.shareButton}>
                        <AppButton
                            title={mydocGiftVoucherButton}
                            press={() => {
                                this.props.setCMSReferralShare();
                            }}
                            type={[Styles.btn, Styles.primary, { width: 300 }]}
                        />
                    </View>
                </ImageBackground>
                {shareReferral && this.renderInvitationModal()}
            </SafeAreaView>
        )
    }
    renderInvitationModal = () => {
        const { shareReferral, resetCMSReferralShare } = this.props;
        const { mydocGiftShareTitle } = this.metaConstants;
        const inviteFriendVia = safeMetaContextLabelFinder(
            "invite",
            "SocialInvite",
            "inviteFriendVia"
        );
        const desc =
            safeMetaContextLabelFinder("giftMydocVoucher", "HomeReward", "fitterpulse") +
            " " +
            this.props.referralDescription;
        return (
            <PruShareModal
                config={{ title: mydocGiftShareTitle, desc, isDynamicLink: true }}
                userAgent={this.props.auth.userAgent}
                onClose={resetCMSReferralShare}
                visible={shareReferral}
                title={inviteFriendVia}
            />
        );
    };

}

const mapStateToProps = state => {
    return {
        shareReferral: state.screenConfig.shareReferral,
        enableUserConsent: state.screenConfig.enableUserConsent,
        referralDescription: state.referralGroup.referralDescription,
        auth: state.auth,
    }
}

const mapDispatchToProps = {
    gotoRegistrationSuccess,
    resetCMSReferralShare: () => ({
        type: CoreActionTypes.RESET_CMS_REFERRALS,
    }),
    setCMSReferralShare: () => ({
        type: CoreActionTypes.CMS_REFERRALS,
    }),
    dispatchEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDocGiftVoucher);

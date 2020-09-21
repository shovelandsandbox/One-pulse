import React, { PureComponent } from 'react';
import { View, Text, Image, SafeAreaView, BackHandler, } from 'react-native';
import { connect } from "react-redux";
import { ContinueAssessmentStyles as styles } from "./styles"
import { Header } from "../../components/Header";
import GenericButton from "../../components/GenericButton";
import {
    gotoCCAQuestionScreen,
    gotoPulseHealthScreen,
    gotoCCAIntroductionScreen,
    gotoCCAAssessmentHistory,
    abortAssessment,
} from "../../actions";
import { ccaImages } from "../../images"
import MetaConstants from "../../meta";
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

class ContinueAssessment extends PureComponent {
    constructor(props) {
        super(props);
        this.MetaConstants = { ...MetaConstants.initializeCCAScreenMeta() };
        this.state = {

        }
    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleDeviceBackButton);

        this.props.dispatchEvent(events.ContinueAssessment)
    }

    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleDeviceBackButton);
    }

    handleDeviceBackButton = () => {
        this.props.gotoPulseHealthScreen()
        return true;
    }

    render() {
        const Home = this.MetaConstants.Home;
        const Back = this.MetaConstants.Back;
        const Leave = this.MetaConstants.Leave;
        const Continue = this.MetaConstants.Continue;
        const ComeOn = this.MetaConstants.ComeOn;
        const ExamNComplete = this.MetaConstants.NotComplete;
        const MotivateText = this.MetaConstants.MotivateTxt;

        const { assessmentId, memberUuid } = this.props

        return (
            <>
                <SafeAreaView style={styles.safeView}>
                    <Header
                        onPressIcon={() => {
                            this.props.gotoPulseHealthScreen()
                            this.props.dispatchEvent(events.BackArrowCCACompletionClick)
                        }}

                    />
                    <View style={styles.MainContainer}>

                        <View style={styles.Container}>
                            <Text style={styles.TextStyle}>{ComeOn}</Text>
                            <Image style={styles.ImageStyles} resizeMode="contain" source={{ uri: ccaImages.introGirl }} />
                        </View>

                        <View style={styles.CardStyles}>
                            <Text style={styles.CardText}>{ExamNComplete}</Text>
                            <View style={styles.TextCupContainer}>
                                <Text style={styles.CardText}>{MotivateText}</Text>
                                <Image style={styles.cupImage} resizeMode="contain" source={{ uri: ccaImages.cup }} />
                            </View>

                            <View style={styles.ButtonView}>
                                <View style={styles.ButtonContainer}>
                                    <GenericButton
                                        label={Leave}
                                        backgroundColor={Colors.warmGray}
                                        widthOffset={2.5}
                                        onPress={() => {
                                            this.props.abortAssessment({ assessmentId, memberUuid });
                                            this.props.dispatchEvent(events.LeaveButtonCAScreenClick);
                                        }}
                                    />
                                    <GenericButton
                                        label={Continue}
                                        backgroundColor={Colors.alizarin}
                                        widthOffset={2.5}
                                        onPress={() => {
                                            this.props.gotoCCAQuestionScreen();
                                            this.props.dispatchEvent(events.ContinueButtonCAScreenClick);
                                        }}
                                    />
                                </View>
                            </View>
                        </View>

                    </View>
                </SafeAreaView>
            </>

        );
    }
}

const mapsStateToProps = state => ({
    userProfile: state.profile,
    firstName: state.profile.firstName,
    assessmentId: state.cca.assessmentStatus.recordId,
    memberUuid: state.profile.id,
});

export default connect(mapsStateToProps,
    {
        gotoCCAQuestionScreen,
        gotoPulseHealthScreen,
        gotoCCAIntroductionScreen,
        gotoCCAAssessmentHistory,
        abortAssessment,
        dispatchEvent
    }
)(ContinueAssessment);
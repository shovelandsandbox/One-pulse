import React, { PureComponent } from 'react';
import { View, Text, Image, SafeAreaView, BackHandler, ScrollView } from 'react-native';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CompletionScreenStyles as styles } from "./styles";
import GenericButton from "../../components/GenericButton";
import { Header } from "../../components/Header";
import { gotoCCAAssessmentResult, gotoPulseHealthScreen, getAssessmentResult, gotoCCAJourneyScreen } from '../../actions';
import { ccaImages } from "../../images";
import MetaConstants from "../../meta";
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import { Theme } from "../../../../themes";
import { isEmpty } from "ramda";
const { Colors } = Theme;

class CompletionScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.MetaConstants = { ...MetaConstants.initializeCCAScreenMeta() };
        this.state = {
            completedAssessId: ""
        }
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        const { assessmentHistory } = nextProps
        if (!isEmpty(assessmentHistory)) {
            return {
                ...prevState,
                completedAssessId: assessmentHistory[0].recordId
            }
        }
    }

    componentDidMount = () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleDeviceBackButton);
        
        const { assessmentId, memberUuid } = this.props
        this.props.getAssessmentResult({ assessmentId, memberUuid })
        this.props.dispatchEvent(events.CompletionScreen)
    }

    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleDeviceBackButton);
    }

    handleDeviceBackButton = () => {
        this.props.gotoCCAJourneyScreen()
        return true;
    }

    render() {
        const { completedAssessId } = this.state
        const Home = this.MetaConstants.Home;
        const Back = this.MetaConstants.Back;
        const Great = this.MetaConstants.Great;
        const CompleteAssessment = this.MetaConstants.CompleteAssessment;
        const viewResult = this.MetaConstants.viewResult;
        const text1 = this.MetaConstants.CompScreenTxt;
        const text2 = this.MetaConstants.CompScreenTxt2;

        return (
            <SafeAreaView style={styles.safeView}>
                <Header
                    onPressIcon={() => {
                        this.props.gotoCCAJourneyScreen()
                        this.props.dispatchEvent(events.BackArrowCCACompletionClick)
                    }}
                />
                <View style={styles.MainContainer}>
                    <View style={styles.ViewContainer}>
                        <View style={styles.GreatingTextContainer}>
                            <Text style={styles.GreatingStyle}>{Great}!</Text>
                            <Text style={styles.GreatingMessage}>{CompleteAssessment}</Text>
                        </View>
                        <View style={styles.ImageContainer}>
                            <Image style={styles.ImageStyle} resizeMode="contain" source={{ uri: ccaImages.introGirl }} />
                        </View>
                    </View>
                    <View style={styles.CardViewStyle}>
                        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                            <Text style={styles.FirstTextStyle}>
                                {text1}
                            </Text>
                            <Text style={styles.SecondTextStyle}>
                                {text2}
                            </Text>
                        </ScrollView>
                        <GenericButton
                            label={viewResult}
                            backgroundColor={Colors.alizarin}
                            widthOffset={1.6}
                            position="center"
                            onPress={() => {
                                this.props.gotoCCAAssessmentResult({ assessId: completedAssessId })
                                this.props.dispatchEvent(events.ViewResultCCACompletionClick);
                            }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

CompletionScreen.PropTypes = {
    navigation: PropTypes.object
};

const mapsStateToProps = state => ({
    userProfile: state.profile,
    assessmentId: state.cca.assessmentStatus.recordId,
    assessmentHistory: state.cca.assessmentHistory,
    memberUuid: state.profile.id,
});

export default connect(mapsStateToProps,
    {
        gotoCCAAssessmentResult,
        gotoPulseHealthScreen,
        getAssessmentResult,
        gotoCCAJourneyScreen,
        dispatchEvent
    }
)(CompletionScreen);
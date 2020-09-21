import React, { Component } from "react";
import { View, Text, Image, ScrollView, SafeAreaView, ImageBackground, Share, Platform, BackHandler } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { AssessmentResultStyle as styles } from './styles';
import { Header } from "../../components/Header";
import { gotoCCAAssessmentDetail, gotoCCAAssessmentHistory, getAssessmentResult, gotoPulseHealthScreen, gotoCCAJourneyScreen } from '../../actions';
import GenericButton from "../../components/GenericButton";
import { ccaImages } from "../../images";
import MetaConstants from "../../meta";
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Theme } from "../../../../themes";
import { renderHumanImage } from "../../utils";
const { Colors } = Theme;


class AssessmentResult extends Component {
    constructor(props) {
        super(props);
        this.MetaConstants = { ...MetaConstants.initializeCCAScreenMeta() };
        this.state = {
            isResultLoading: true
        };
    }

    static getDerivedStateFromProps = (nextProps, prevstate) => {
        return {
            ...prevstate,
            isResultLoading: nextProps.isResultLoading
        }
    }

    componentDidMount = () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleDeviceBackButton);
        
        const { memberUuid, navigation } = this.props
        if (navigation.state.params) {
            const assessmentId = navigation.state.params.assessId
            this.props.getAssessmentResult({ assessmentId, memberUuid });
        }
        this.props.dispatchEvent(events.AssessmentResult)
    }

    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleDeviceBackButton);
    }

    handleDeviceBackButton = () => {
        this.props.gotoCCAJourneyScreen()
        return true;
    }

    checkId = () => {
        const { navigation } = this.props;
        if (navigation.state.params) {
            return navigation.state.params.assessId
        }

    }

    render() {
        const Home = this.MetaConstants.Home;
        const Back = this.MetaConstants.Back;
        const ViewMore = this.MetaConstants.ViewMore;
        const AssessmentResult = this.MetaConstants.AssessmentResult;
        const ConstSummary = this.MetaConstants.ConstSummary;
        const ShareIT = this.MetaConstants.shareIt;
        const LTxt = this.MetaConstants.L;
        const MTxt = this.MetaConstants.M;
        const HTxt = this.MetaConstants.H;

        const { navigation, assessmentResult, gender } = this.props
        const { isResultLoading } = this.state

        const resultCheck = assessmentResult && Object.keys(assessmentResult).length !== 0
        const summaryContent = resultCheck ? assessmentResult.contents : []

        return (
            <SafeAreaView style={styles.safeView}>
                <Header
                    onPressIcon={() => {
                        this.props.gotoCCAJourneyScreen()
                        this.props.dispatchEvent(events.BackArrowClick)
                    }}
                />
                <View style={styles.mainView}>

                    {(resultCheck && !isResultLoading) &&
                        <>
                            <Text style={styles.resultHeadingText}>
                                {AssessmentResult}
                            </Text>

                            <View style={styles.innerViewOne}>
                                <View style={styles.innerViewOneLeft}>

                                    <Text style={styles.yourConstitutionText}>{assessmentResult.displayText1}</Text>

                                    <View style={styles.physiqueTextView}>
                                        <Text style={styles.levelText}>{assessmentResult.levelText}</Text>
                                        <Text style={styles.physiqueText}>{assessmentResult.physiqueText}</Text>
                                    </View>


                                    <View>
                                        <ImageBackground style={styles.meterImage} resizeMode="contain" source={{ uri: ccaImages.meter }}>
                                            <View style={styles.viewLMH}>
                                                <Text style={styles.textL}>{LTxt}</Text>
                                                <Text style={styles.textM}>{MTxt}</Text>
                                                <Text style={styles.textH}>{HTxt}</Text>
                                            </View>
                                        </ImageBackground>

                                        <View style={styles.needleView}>
                                            {assessmentResult.level === "low" && <Image style={styles.lowNeedleImage} resizeMode="contain" source={{ uri: ccaImages.lowNeedle }} />}
                                            {assessmentResult.level === "medium" && <Image style={styles.medNeedleImage} resizeMode="contain" source={{ uri: ccaImages.medNeedle }} />}
                                            {assessmentResult.level === "high" && <Image style={styles.highNeedleImage} resizeMode="contain" source={{ uri: ccaImages.highNeedle }} />}
                                        </View>
                                    </View>

                                    <Text style={styles.suggestiveText}>
                                        {assessmentResult.displayText2}
                                    </Text>

                                </View>

                                <View style={styles.innerViewOneRight}>
                                    <Image style={styles.humanImage} resizeMode="contain" source={{ uri: renderHumanImage(gender, assessmentResult.physique) }} />
                                </View>
                            </View>

                            <View style={styles.innerViewTwo}>
                                <Text style={styles.summaryHeadingText}>
                                    {ConstSummary}
                                </Text>

                                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                                    {summaryContent
                                        ? summaryContent.map((item) => {
                                            return (
                                                <>
                                                    <View style={styles.bulletView}>
                                                        <Icon name="circle" size={12} color={Colors.azalia} />
                                                        <Text style={styles.bulletText}>{item}</Text>
                                                    </View>
                                                </>
                                            )
                                        })
                                        : null
                                    }
                                </ScrollView>


                                <GenericButton
                                    label={ViewMore}
                                    backgroundColor={Colors.alizarin}
                                    widthOffset={1.6}
                                    position="center"
                                    onPress={() => {
                                        this.props.gotoCCAAssessmentDetail({ assessId: navigation.state.params.assessId })
                                        this.props.dispatchEvent(events.ViewMoreLMHScreenClick)
                                    }}
                                />

                            </View>
                        </>
                    }
                </View>

            </SafeAreaView >
        );
    }
}

AssessmentResult.PropTypes = {
    navigation: PropTypes.object,
    assessId: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        assessmentResult: state.cca.assessmentResult,
        gender: state.profile.gender,
        assessmentId: state.cca.assessmentStatus.recordId,
        isResultLoading: state.cca.isResultLoading,
        memberUuid: state.profile.id,
    };
};
export default connect(
    mapStateToProps,
    {
        gotoCCAAssessmentDetail,
        gotoCCAAssessmentHistory,
        getAssessmentResult,
        gotoPulseHealthScreen,
        gotoCCAJourneyScreen,
        dispatchEvent
    }
)(AssessmentResult);
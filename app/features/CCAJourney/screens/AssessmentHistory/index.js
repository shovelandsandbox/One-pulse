import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, BackHandler } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { AssessmentHistoryStyle as styles } from './styles'
import { Header } from "../../components/Header"
import {
    gotoCCABasicInfoScreen,
    gotoCCAAssessmentResult,
    gotoPulseHealthScreen,
    getAssessmentStatusAndHistory,
} from "../../actions"
import GenericButton from "../../components/GenericButton";
import { ccaImages } from "../../images";
import MetaConstants from "../../meta";
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import { pathOr, isEmpty, isNil } from "ramda";
import { Theme } from "../../../../themes";
import { assessDuration, switchDobLang } from "../../utils";
const { Colors } = Theme;

class AssessmentHistory extends Component {
    constructor(props) {
        super(props);
        this.MetaConstants = { ...MetaConstants.initializeCCAScreenMeta() };
        this.state = {

        };
    }

    componentDidMount = () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleDeviceBackButton);
        
        this.props.dispatchEvent(events.AssessmentHistory)
    }

    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleDeviceBackButton);
    }

    handleDeviceBackButton = () => {
        this.props.gotoPulseHealthScreen()
        return true;
    }

    renderHistory = (index, item) => {
        const Male = this.MetaConstants.Male;
        const Female = this.MetaConstants.Female;
        const Years = this.MetaConstants.Years
        const formattedUpdatedTime = item.auditDetail.updateTime.indexOf(" ")
        const assessDate = item.auditDetail.updateTime.slice(0, formattedUpdatedTime)
        const testDate = moment(assessDate, "YYYY-MM-DD").format("DD-MMM-YYYY").split("-").join(" ")

        const { locale } = this.props
        const testDateCN = switchDobLang(testDate, this.MetaConstants)

        var sex = ""
        if (item.gender) {
            if (item.gender === "Ge_M") {
                sex = Male
            } else if (item.gender === "Ge_F") {
                sex = Female
            }
        }

        return (
            <View style={styles.listSubViews}>
                <View style={styles.levelPhysiqueView}>
                    <Text style={styles.levelPhysiqueText}>
                        {item.result.levelText}{'\n'}{item.result.physiqueText}
                    </Text>
                </View>

                <View style={styles.personalInfoView}>
                    <Text style={styles.personalInfoText}>
                        {locale === "tw" ? testDateCN : testDate}
                    </Text>

                    <View style={styles.genderAgeView}>
                        <Text style={styles.personalInfoText}>
                            {sex}
                        </Text>

                        <View style={styles.smallVerticalDivider}></View>

                        <Text style={styles.personalInfoText}>
                            {item.age} {Years}
                        </Text>
                    </View>
                </View>

                <View style={styles.bigVerticalDivider}></View>

                <TouchableOpacity style={styles.arrowView}
                    onPress={() => {
                        this.props.gotoCCAAssessmentResult({ assessId: item.recordId })
                        this.props.dispatchEvent(events.PassAssessmentHistoryTabClick)
                    }} >
                    <Image style={styles.arrowImage} resizeMode="contain" source={{ uri: ccaImages.redArrow }} />
                </TouchableOpacity>
            </View>
        )
    }

    render() {

        const Home = this.MetaConstants.Home;
        const Back = this.MetaConstants.Back;
        const RedoAssessment = this.MetaConstants.RedoAssessment;
        const historyAssessment = this.MetaConstants.historyAssessment;
        const inLast = this.MetaConstants.InLast;
        const times = this.MetaConstants.times;

        const { assessmentHistory } = this.props

        const historyCheck = !isNil(assessmentHistory) && !isEmpty(assessmentHistory)

        const numOfAssess = historyCheck ? assessmentHistory.slice().length : null

        const latestTestDate = !isNil(assessmentHistory) && !isEmpty(assessmentHistory)
            ? moment(assessmentHistory[0].auditDetail.updateTime, "YYYY-MM-DD HH:mm:ss") : ""

        const { userIcon } = this.props
        var profilePicture = userIcon && !isEmpty(userIcon)
            ? { uri: `data:image/jpeg;base64,${userIcon}` } : { uri: ccaImages.defaultProfilPic }

        return (
            <SafeAreaView style={styles.safeView}>

                <Header
                    onPressIcon={() => {
                        this.props.gotoPulseHealthScreen()
                        this.props.dispatchEvent(events.AssessmentHistoryBackBtnClick);
                    }}
                />

                <View style={styles.mainView}>

                    <View style={styles.profilePicView}>
                        <Image style={styles.profilePic} resizeMode="cover" source={profilePicture} />
                    </View>

                    <Text style={styles.historyText}>
                        {historyAssessment}
                        {/* {inLast} {numOfAssess} {times} */}
                    </Text>

                    <View style={styles.listMainView}>
                        {historyCheck &&
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={assessmentHistory}
                                renderItem={
                                    ({ index, item }) => this.renderHistory(index, item)
                                }
                                keyExtractor={item => item.id}
                                extraData={this.state}
                            />}
                    </View>

                    <View style={styles.bottomView}>
                        <Text style={styles.lastDoneText}>
                            {latestTestDate !== "" ? assessDuration(latestTestDate, this.MetaConstants) : ""}
                        </Text>

                        <GenericButton
                            label={RedoAssessment}
                            backgroundColor={Colors.alizarin}
                            widthOffset={1.6}
                            position="center"
                            onPress={() => {
                                this.props.gotoCCABasicInfoScreen()
                                this.props.dispatchEvent(events.RedoAssessmentHistoryButtonClick);
                            }}
                        />
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

AssessmentHistory.PropTypes = {
    navigation: PropTypes.object
};

const mapStateToProps = state => {
    return {
        userIcon: state.profile.profilePicture,
        assessmentHistory: state.cca.assessmentHistory,
        locale: pathOr("", ["userPreferences", "language"], state).toLowerCase(),
    };
};
export default connect(
    mapStateToProps,
    {
        gotoCCABasicInfoScreen,
        gotoCCAAssessmentResult,
        gotoPulseHealthScreen,
        getAssessmentStatusAndHistory,
        dispatchEvent
    }
)(AssessmentHistory);
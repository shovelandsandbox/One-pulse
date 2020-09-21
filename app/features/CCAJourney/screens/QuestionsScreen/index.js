import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, BackHandler, ScrollView } from 'react-native';
import { connect } from "react-redux";
import { QuestionScreenStyles as styles } from "./styles";
import { Header } from "../../components/Header";
import GenericButton from "../../components/GenericButton";
import {
    gotoPulseHealthScreen,
    gotoCCAJourneyScreen,
    gotoCCACompletionScreen,
    gotoCCAContinueAssessment,
    updateAssessment,
} from "../../actions";
import { ccaImages } from "../../images";
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import { path, isEmpty } from "ramda"
import MetaConstants from "../../meta";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

class QuestionsScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.MetaConstants = { ...MetaConstants.initializeCCAScreenMeta() };
        this.state = {
            questionResponse: {},
            totalQuestionNo: 0,
            isFirstQuestion: true,
            isLastQuestion: false,
            currentQuestionsNo: 1,
            currentQuestions: "",
            answerOptions: [],
            selectedOption: {},
            isSelectedArray: [],
            progressBarProgress: null,
            optionSelectedAny: false,
            currentQuestionGroup: "",
            isOptionSelected: false,
        };
    }

    static getDerivedStateFromProps(props, state) {
        let questionDetails, updatedQuestion, questionOptions, question, currentQuestionType, currentQuestion, questionGroup, totalQuestionNo, isFirstQuestion, isLastQuestion, progressBarProgress, previousAnswer;

        if (props.assessmentQuestion && props.assessmentQuestion.questionAnswers
            && props.assessmentQuestion.questionAnswers !== null) {
            questionDetails = props.assessmentQuestion.questionAnswers[0]
            updatedQuestion = questionDetails.questionAnswers[0].question

            questionOptions = updatedQuestion.options;
            question = updatedQuestion.question
            currentQuestionType = updatedQuestion.attributes.remindText
            currentQuestion = updatedQuestion.attributes.currentQuestion
            totalQuestionNo = updatedQuestion.attributes.total
            isFirstQuestion = updatedQuestion.attributes.isFirst
            isLastQuestion = updatedQuestion.attributes.isLast
            previousAnswer = updatedQuestion.attributes.answer
            progressBarProgress = (currentQuestion / totalQuestionNo) * 100
            questionGroup = questionDetails.code

            var isSelectedValues = []
            var isSelectedAny = false
            var len = questionOptions.length

            var selectedAnswer = {}

            if (!state.isOptionSelected) {
                for (i = 0; i < len; i++) {
                    if (previousAnswer && (i == (previousAnswer - 1))) {
                        isSelectedValues.push(true)
                        selectedAnswer.code = previousAnswer
                        isSelectedAny = true
                    } else {
                        isSelectedValues.push(false)
                    }
                }
            } else {
                isSelectedValues = state.isSelectedArray
                selectedAnswer = state.selectedOption
                isSelectedAny = true
            }

            return {
                questionResponse: props.assessmentQuestion,
                answerOptions: questionOptions,
                currentQuestions: question,
                currentQuestionsNo: currentQuestion,
                currentQuestionType: currentQuestionType,
                isSelectedArray: isSelectedValues,
                currentQuestionGroup: questionGroup,
                totalQuestionNo: totalQuestionNo,
                isFirstQuestion: isFirstQuestion,
                isLastQuestion: isLastQuestion,
                progressBarProgress: progressBarProgress.toString() + "%",
                optionSelectedAny: isSelectedAny,
                selectedOption: selectedAnswer
            };
        }
    }

    componentDidMount = () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleDeviceBackButton);

        const { assessmentId, memberUuid } = this.props
        this.props.updateAssessment({ assessmentId, memberUuid })
        this.props.dispatchEvent(events.QuestionsScreen)
    }

    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleDeviceBackButton);
    }

    handleDeviceBackButton = () => {
        this.props.gotoCCAContinueAssessment();
        return true;
    }

    onOptionPress = (item, index) => {
        const { isSelectedArray } = this.state
        for (i = 0; i < isSelectedArray.length; i++) {
            isSelectedArray[i] = false
        }
        isSelectedArray[index] = true;
        this.setState({
            isOptionSelected: true, selectedOption: item, isSelectedArray: isSelectedArray, optionSelectedAny: true
        }, () => {
            this.onNextButtonPress()
        });
    }

    renderOptions = (item, index) => {
        return (
            <TouchableOpacity onPress={() => {
                this.onOptionPress(item, index)
                this.props.dispatchEvent(events.AnswerOptionClick)
            }} >
                <View style={styles.OptionsView}>
                    <Text style={styles.OptionsTextStyle}>{item.value}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderSelectedOptions = (item, index, color) => {
        return (
            <TouchableOpacity onPress={() => {
                this.onOptionPress(item, index)
                this.props.dispatchEvent(events.AnswerOptionClick)
            }} >
                <View style={[styles.SelectedOptionsView, { backgroundColor: color, borderColor: color }]}>
                    <Text style={styles.SelectedOptionsTextStyle}>{item.value}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    callAPI = (questionResponse, currentQuestionType, currentQuestions, selectedOption, currentQuestionsNo, isPrev) => {

        const { assessmentId, memberUuid } = this.props

        const questionPayload = {};
        questionPayload["recordId"] = questionResponse.recordId
        questionPayload["questionAnswers"] = []
        questionPayload["questionAnswers"][0] = {}
        questionPayload["questionAnswers"][0]["questionAnswers"] = []
        questionPayload["questionAnswers"][0]["questionAnswers"][0] = {}
        questionPayload["questionAnswers"][0]["questionAnswers"][0]["question"] = {}
        questionPayload["questionAnswers"][0]["questionAnswers"][0]["question"]["id"] = path(["questionAnswers", 0, "questionAnswers", 0, "question", "id"], questionResponse);
        questionPayload["questionAnswers"][0]["questionAnswers"][0]["question"]["attributes"] = {}
        if (!isEmpty(selectedOption)) {
            questionPayload["questionAnswers"][0]["questionAnswers"][0]["question"]["attributes"]["answer"] = Number(selectedOption.code)
        }
        questionPayload["questionAnswers"][0]["questionAnswers"][0]["question"]["attributes"]["isPrevious"] = isPrev

        if (questionPayload && Object.keys(questionPayload).length !== 0) {
            this.props.updateAssessment({ assessmentId, memberUuid, questionPayload });
        }

    }

    onPreviousButtonPress = () => {
        const {
            questionResponse,
            currentQuestions,
            currentQuestionsNo,
            currentQuestionType,
            selectedOption,
            isFirstQuestion,
            isOptionSelected
        } = this.state
        if (!isFirstQuestion) {
            this.setState({ optionSelectedAny: false, isOptionSelected: false, isSelectedArray: [], selectedOption: {} })
            this.callAPI(questionResponse, currentQuestionType, currentQuestions, selectedOption, currentQuestionsNo, true)
        }
    }
    
    onNextButtonPress = () => {
        const {
            questionResponse,
            currentQuestions,
            currentQuestionsNo,
            currentQuestionType,
            selectedOption,
            isLastQuestion
        } = this.state
        if (isLastQuestion) {
            this.callAPI(questionResponse, currentQuestionType, currentQuestions, selectedOption, currentQuestionsNo, false)
        } else {
            this.setState({
                optionSelectedAny: false,
                isOptionSelected: false,
                isSelectedArray: []
            })
            this.callAPI(questionResponse, currentQuestionType, currentQuestions, selectedOption, currentQuestionsNo, false)
        }
    }

    render() {
        const Home = this.MetaConstants.Home;
        const Back = this.MetaConstants.Back;
        const previous = this.MetaConstants.previous;
        const Next = this.MetaConstants.Next;

        const { currentQuestionGroup, answerOptions, isSelectedArray } = this.state

        var symbol = "";
        var image = "";
        var color = ""
        if (currentQuestionGroup == 'look') {
            symbol = ccaImages.lookSymbol;
            image = ccaImages.lookGirl;
            color = Colors.tuftBush
        } else if (currentQuestionGroup == 'hear') {
            symbol = ccaImages.hearSymbol;
            image = ccaImages.hearGirl;
            color = Colors.blizzardBlue
        } else if (currentQuestionGroup == 'ask') {
            symbol = ccaImages.askSymbol;
            image = ccaImages.askGirl;
            color = Colors.azalia
        }

        return (
            <SafeAreaView style={styles.safeView}>
                <Header
                    onPressIcon={() => {
                        this.props.gotoCCAContinueAssessment();
                        this.props.dispatchEvent(events.BackArrowClick)
                    }} />
                <View style={styles.MainContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.SymbolImageStyle} resizeMode="contain" source={{ uri: symbol }} />
                        <Image style={styles.ImageStyle} resizeMode="contain" source={{ uri: image }} />
                    </View>
                    <View style={styles.QuestionViewStyle}>

                        <View style={styles.BarContainer}>
                            <View style={styles.QuestionProgressViewLine} />
                            <View style={[styles.QuestionProgressView, { width: this.state.progressBarProgress }]} />
                        </View>

                        {this.state.currentQuestionType != "" ?
                            <Text style={styles.SuggestionTextStyle} >{this.state.currentQuestionType}</Text>
                            : null}

                        <Text style={styles.QuestionsTextStyle} >{this.state.currentQuestions}</Text>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {answerOptions.map((item, index) => {
                                if (isSelectedArray[index] === true) {
                                    return (
                                        this.renderSelectedOptions(item, index, color)
                                    )
                                } else {
                                    return (
                                        this.renderOptions(item, index)
                                    )
                                }

                            })
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.ButtonContainer}>
                        {(this.state.currentQuestionsNo > 1)
                            ? <GenericButton
                                label={previous}
                                backgroundColor={Colors.warmGray}
                                widthOffset={2.5}
                                position="flex-start"
                                onPress={() => {
                                    this.onPreviousButtonPress();
                                    this.props.dispatchEvent(events.PreviousButtonQue)
                                }} />
                            : <GenericButton
                                label={previous}
                                backgroundColor={Colors.warmGray}
                                widthOffset={2.5}
                                position="flex-start"
                                disabled={true} />}
                        {(this.state.optionSelectedAny)
                            ? <GenericButton
                                label={Next}
                                backgroundColor={Colors.alizarin}
                                widthOffset={2.5}
                                position="flex-end"
                                onPress={() => {
                                    this.onNextButtonPress()
                                    this.props.dispatchEvent(events.NextButtonOptionQueClick)
                                }} />
                            : <GenericButton
                                label={Next}
                                backgroundColor={Colors.alizarinOpaque}
                                widthOffset={2.5}
                                position="flex-end"
                                disabled={true} />}
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}


const mapsStateToProps = state => ({
    userProfile: state.profile,
    assessmentQuestion: state.cca.assessmentQuestion,
    assessmentId: state.cca.assessmentStatus.recordId,
    memberUuid: state.profile.id,
});

export default connect(mapsStateToProps,
    {
        gotoPulseHealthScreen,
        gotoCCAJourneyScreen,
        gotoCCACompletionScreen,
        gotoCCAContinueAssessment,
        updateAssessment,
        dispatchEvent
    }
)(QuestionsScreen);
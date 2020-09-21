import React, { Component } from "react";
import {
    View, Text, ScrollView, TouchableOpacity, Image, ImageBackground,
    BackHandler
} from "react-native";
import { connect } from "react-redux"

// styles
import { styles } from "./styles";

// custom
import MetaConstants from "../../meta";
import PruRoundedButton from "../../../../components/PruRoundedButton";
import AboutYou from "./aboutYou";
import { updateCustomer, calculateBMI } from "../../actions";
import PruCustomAlert from "../../../../components/PruCustomAlert";
import { PruBackHeader } from "../../../../components";
import { P_INFO_IMAGE, MENU_LEFT_ARROW } from "../../../../config/images"
import { pathOr } from "ramda";

const KEY_BMI_TITLE = "uploadyourselfie";

class UserInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 1,
            selectedDiet: null
        },
            this.MetaConstants = { ...MetaConstants.initializeScreenMeta() };
        this.aboutYouRef = React.createRef()
    }

    navigateToFoodLanding = () => {
        this.props.navigation.navigate("FoodDairyLanding")
    }

    onHardwareBack = () => {
        if (this.state.currentStep == 1) {
            this.props.navigation.goBack();
        } else {
            this.setState({ currentStep: this.state.currentStep - 1 })
        }
        return true;
    };

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onHardwareBack);
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onHardwareBack);
    }

    UNSAFE_componentWillReceiveProps(nextprops) {
        if (this.props.isUpdateCustomerLoading && !nextprops.isUpdateCustomerLoading) {
            if (!nextprops.isUpdateCustomerError) {
                this.props.navigation.navigate("FoodDairyLanding")
            }
            else {
                PruCustomAlert.show(this.MetaConstants.errTryAgain)
            }
        }
        if (this.props.isCalculateBMILoading && !nextprops.isCalculateBMILoading) {
            if (!nextprops.isCalculateBMIError) {
                const BMI = pathOr({}, ["bmiResponse", "lifestyle"], nextprops)

                PruCustomAlert.show(`Your BMI is\n ${parseFloat(BMI.bmi).toFixed(1)} ${BMI.bmiDesc}`, "", {
                    positiveText: "Proceed",
                    onPositivePress: () => {
                        const updateCustomerObj = this.aboutYouRef.current.exportUserDetails("selfieBMI");
                        updateCustomerObj.lifestyle = {
                            "bmi": BMI.bmi,
                            "bmiDesc": BMI.bmiDesc
                        }
                        this.props.updateCustomer(updateCustomerObj);
                    },
                })
            }
            else {
                PruCustomAlert.show(this.MetaConstants.errTryAgain)
            }
        }



    }

    // handler for continue button click
    // increment the current step 
    handleContinueClick = () => {

        if (this.state.currentStep <= 3) {
            if (this.state.currentStep === 1) {
                const updateCustomerObj = this.aboutYouRef.current.exportUserDetails("selfieBMI");
                if (!updateCustomerObj.sex) {
                    PruCustomAlert.show("please select a gender")
                }
                else {
                    this.setState({ currentStep: this.state.currentStep + 1 })
                }
            }
            else {
                this.setState({ currentStep: this.state.currentStep + 1 })
            }

        }

        if (this.state.currentStep === 4) {
            if (this.aboutYouRef.current.isValid()) {
                updateCustomerObj = this.aboutYouRef.current.exportUserDetails();
                this.props.updateCustomer(updateCustomerObj);
            }
            else {
                PruCustomAlert.show(this.MetaConstants.errDetails)
            }
        }
    }

    calculateBMI = (source) => {
        const { sessionId, calculateBMI } = this.props;

        const payload = {
            params: {
                token: sessionId,
            },
            body: {
                documents: [
                    {
                        content: source,
                    },
                ]
            }
        }
        calculateBMI(payload)
    }

    updateCurrentStep = (step) => {
        this.setState(() => ({ currentStep: step }))
    }

    render() {
        const { currentStep, selectedDiet } = this.state;
        // get Header texts meta based on current Step
        const headerText = this.state.currentStep === 1
            ? this.MetaConstants.whatGender
            : this.state.currentStep === 2
                ? this.MetaConstants.whenBirtday
                : this.MetaConstants.checkBmi

        return (
            <>
                {/* HEADER */}
                <PruBackHeader onBackPress={this.onHardwareBack} title={""}></PruBackHeader>

                <TouchableOpacity style={{
                    position: "absolute",
                    right: 16,
                    top: 16
                }} onPress={this.navigateToFoodLanding}>
                    <Text style={{ fontSize: 16, color: "#646464" }}>SKIP</Text>
                </TouchableOpacity>

                <View style={styles.container}>

                    {/* progress bar */}
                    <View style={styles.progressbarContainer}>
                        <View style={{
                            ...styles.progressbar,
                            width: `${(100 / 3) * currentStep}%`,
                        }}></View>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        marginVertical: 5, alignItems: "center", justifyContent: "flex-end"
                    }}>


                    </View>
                    {/* Header Information */}
                    <Text style={styles.headerInfoText}>
                        {this.MetaConstants.healthSugg}
                    </Text>
                    {/* <Text style={styles.headerText}>
                    {headerText}
                </Text> */}
                    <ScrollView showsVerticalScrollIndicator={false}>

                        {/* STEP 1 : ABOUT YOU  */}


                        <AboutYou updateCurrentStep={this.updateCurrentStep} calculateBMI={this.calculateBMI} step={currentStep} ref={this.aboutYouRef} userProfile={this.props.userProfile} />

                        {/* STEP 2 : DIET TYPES  */}
                        {/* {
                        currentStep === 2 && (
                            <>
                                {
                                    this.MetaConstants.dietTypes.map((dietType, i) => {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                                this.setState(() => ({ selectedDiet: i }))
                                            }} style={{
                                                ...styles.dietTypeBtn,
                                                backgroundColor: selectedDiet === i ? "#ec1c2e" : "#fff",
                                                color: selectedDiet === i ? "#fff" : "#2f2f2f"
                                            }}>
                                                <Text style={styles.dietTypeText}>{dietType}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </>
                        )

                    } */}

                    </ScrollView>

                    {/* CONTINUE BTN */}
                    {/* donot show continue button on BMI check screen */}
                    {
                        currentStep !== 3 && (
                            <View style={styles.continueBtnContainer}>
                                {
                                    currentStep === 4 && (
                                        <Text onPress={() => {
                                            this.setState(() => ({ currentStep: 3 }))
                                        }} style={styles.recheckText}>
                                            Recheck
                                        </Text>
                                    )
                                }
                                <View style={styles.ContinueBtn}>
                                    <PruRoundedButton onPress={this.handleContinueClick} buttonTitle={
                                        this.MetaConstants.continue
                                    } />
                                </View>
                            </View>
                        )
                    }
                </View>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isUpdateCustomerLoading: state.pulsefood.isUpdateCustomerLoading,
        isUpdateCustomerError: state.pulsefood.isUpdateCustomerError,
        isCalculateBMILoading: state.pulsefood.isCalculateBMILoading,
        isCalculateBMIError: state.pulsefood.isCalculateBMIError,
        bmiResponse: state.pulsefood.bmiResponse,
        userProfile: state.profile,
        sessionId: state.auth.token,
    };
};

export default connect((mapStateToProps), {
    updateCustomer,
    calculateBMI
})(UserInformation);

import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Alert, ScrollView, Picker,
    Image, TextInput, Dimensions, ImageBackground
} from 'react-native';
import moment from "moment";
import DatePicker from "react-native-date-picker";
import ImagePicker from "react-native-image-crop-picker";
import { CustomAlert, PruDropdownComponent } from "../../../../components"

// Styles
import { styles } from "./styles"

// custom
import {
    VC_DOWN_ARROW_BLACK,
    USER_MALE_SELECTED, USER_MALE_UNSELECTED,
    USER_FEMALE_SELECTED, USER_FEMALE_UNSELECTED,
    SELFIE_BMI_BANNER, MANUAL_BMI_BANNER
} from "../../../../config/images";
import Modal from 'react-native-modal';

import { pathOr } from "ramda";
import MetaConstants from "../../meta";

class AboutYou extends Component {
    constructor(props) {
        super(props);
        const { userProfile } = this.props;


        const height = pathOr("", ["lifestyle", "height"], userProfile);
        const weight = pathOr("", ["lifestyle", "weight"], userProfile);

        this.state = {
            gender: userProfile.gender ? userProfile.toString().toLowerCase() === 'female' ? 'Female' : "Male" : "",
            dob: userProfile.dob ? new Date(moment(userProfile.dob, "DD-MM-YYYY")) : new Date(moment().format()),
            heightInches: height ? height.toString().split('.')[1] : "",
            heightFeet: height ? height.toString().split('.')[0] : "",
            weight: weight ? weight.toString() : "",
            calrorieIntake: null,
            dobDay: userProfile.dob ? moment(userProfile.dob, "DD-MM-YYYY").format("DD") : 1,
            dobMonth: userProfile.dob ? moment(userProfile.dob, "DD-MM-YYYY").format("MMMM") : "January",
            dobYear: userProfile.dob ? moment(userProfile.dob, "DD-MM-YYYY").format("YYYY") : 2020,
            showDatePickerModal: false,
        }
        this.metaConstants = { ...MetaConstants.initializeScreenMeta() }
        console.log('dob::', this.state.dob)
    }

    showCamera = () => {


        ImagePicker.openCamera({
            width: 200,
            height: 200,
            compressImageMaxWidth: 200,
            compressImageMaxHeight: 200,
            includeBase64: true,
            useFrontCamera: true,
            compressImageQuality: 0.8,
            photo: "photo",
        })
            .then(image => {
                const source = image.data;
                this.props.calculateBMI(source)
            })
            .catch(error => {
                if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
                    CustomAlert.show(
                        "",
                        cameraPermission,
                        {
                            positiveText: this.metaConstants.ok,
                            onPositivePress: () => {
                                OpenSettings.openSettings();
                            },
                        },
                        {
                            negativeText: this.metaConstants.cancel,
                            onNegativePress: () => { },
                        }
                    );
                }
            });
    };

    // export the user details to parent
    exportUserDetails = (flag) => {
        const { dob, gender, heightFeet, heightInches, weight } = this.state;
        const { BMI, BMICategory } = this.manualCalculateBMI(heightFeet, heightInches, weight);
        let userObj;
        if (flag === "selfieBMI") {
            userObj = {
                "dob": `${dob.getDate() + "/" + parseInt(dob.getMonth() + 1) + "/" + dob.getFullYear()}`,
                "sex": gender,
            }
        }
        else {
            userObj = {
                "dob": `${dob.getDate() + "/" + parseInt(dob.getMonth() + 1) + "/" + dob.getFullYear()}`,
                "sex": gender,
                "lifestyle": {
                    "height": parseFloat(`${heightFeet}.${heightInches}`),
                    "heightUnit": "In/Ft",
                    "weight": parseFloat(weight),
                    "weightUnit": "Kg",
                    "bmi": parseFloat(BMI),
                    "bmiDesc": BMICategory
                }
            }
        }

        return userObj;
    }

    isGenderSelected = () => {
        const { gender } = this.state
        return gender
    }

    isValid = () => {
        const { gender, heightFeet, heightInches, weight } = this.state;
        return gender && heightFeet && heightInches && weight;
    }


    manualCalculateBMI = (heightFeet, heightInches, weight) => {
        if (heightFeet && heightInches && weight) {

            const inches = heightFeet * 12 + parseInt(heightInches);
            const weightinPounds = weight * 2.20462;
            console.log("inches", inches + "--" + weightinPounds)
            const BMI = parseFloat((weightinPounds * 703) / (inches * inches)).toFixed(1).replace(/\.0$/, "");;
            const BMICategory = BMI < 18.5
                ? this.metaConstants.underweight
                : BMI < 24.9
                    ? this.metaConstants.normal
                    : BMI < 29.9
                        ? this.metaConstants.overweight
                        : this.metaConstants.obese
            return { BMI, BMICategory }
        }
        return { BMI: "", BMICategory: "" }
    }



    handleHeightInchesChange = (text) => {
        const val = parseInt(text);
        console.log("parseIntchange", val)
        if (!isNaN(val) || text === "") {
            this.setState({ heightInches: text })
        }
    }

    handleHeightFeetChange = (text) => {
        const val = parseInt(text);
        console.log("parseIntchange", val)
        if (!isNaN(val) || text === "") {
            this.setState({ heightFeet: text })
        }
    }



    // function to set weight 
    handleWeightChange = (text) => {
        const val = parseFloat(text);
        console.log("parseIntchange", val)
        if (!isNaN(val) || text === "") {
            this.setState({ weight: text })
        }
    }



    render() {

        const { dob, heightFeet, heightInches, weight, gender } = this.state;
        const { step } = this.props;
        const { BMI, BMICategory } = this.manualCalculateBMI(heightFeet, heightInches, weight)

        const dobDay = moment(dob).format("DD")
        const dobYear = moment(dob).format("YYYY")
        const dobMonth = moment(dob).format("MMMM")


        return (
            <>
                {/* SEX/GENDER FIELD */}
                {
                    step === 1 && (
                        <View style={styles.genderContainer}>
                            <View style={styles.genderBtnContainer}>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ gender: "Female" })
                                }} style={gender === 'Female' ? styles.genderBtnSelected : styles.genderBtn}>
                                    <Image style={styles.genderImages} source={gender === 'Female' ? USER_FEMALE_SELECTED : USER_FEMALE_UNSELECTED} />
                                    <Text style={{
                                        ...styles.genderBtnText,
                                        fontWeight: "900",
                                        color: gender === "Female" ? "#ee1a30" : "#d2d2d2",
                                    }}>
                                        {this.metaConstants.female}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ gender: "Male" })
                                }} style={gender === 'Male' ? styles.genderBtnSelected : styles.genderBtn}>
                                    <Image style={styles.genderImages} source={gender === "Male" ? USER_MALE_SELECTED : USER_MALE_UNSELECTED} />
                                    <Text style={{
                                        ...styles.genderBtnText,
                                        fontWeight: "900",
                                        color: gender === "Male" ? "#ee1a30" : "#d2d2d2",
                                    }}>
                                        {this.metaConstants.male}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
                {/* DATE OF BIRTH */}
                {step === 2 && (<Text style={styles.dateOfBirth}>{this.metaConstants.dob}</Text>)}
                {
                    step === 2 && (
                        <View style={styles.dobContainer}>

                            <View style={{ flexDirection: "row", flex: 1 }}>

                                {/* DAY */}
                                <TouchableOpacity onPress={() => {
                                    this.setState({ showDatePickerModal: true })
                                }} style={[styles.dateViewContainer, { flex: 0.2 }]}>
                                    <Text style={styles.dateText}>{dobDay}</Text>
                                    <Image style={styles.downIcon} source={VC_DOWN_ARROW_BLACK}></Image>
                                </TouchableOpacity>

                                {/* MONTHS */}
                                <TouchableOpacity onPress={() => {
                                    this.setState({ showDatePickerModal: true })
                                }} style={[styles.dateViewContainer, { flex: 0.4 }]}>
                                    <Text style={styles.dateText}>{dobMonth}</Text>
                                    <Image style={styles.downIcon} source={VC_DOWN_ARROW_BLACK}></Image>
                                </TouchableOpacity>

                                {/* YEARS */}
                                <TouchableOpacity onPress={() => {
                                    this.setState({ showDatePickerModal: true })
                                }} style={[styles.dateViewContainer, { flex: 0.4 }]}>
                                    <Text style={styles.dateText}>{dobYear}</Text>
                                    <Image style={styles.downIcon} source={VC_DOWN_ARROW_BLACK}></Image>
                                </TouchableOpacity>



                            </View>
                        </View>
                    )
                }

                {/* BMI SCREEN */}
                {
                    step === 3 && (
                        <ScrollView style={styles.BMIBannerContainer}>
                            <TouchableOpacity onPress={() => {
                                this.showCamera()
                            }}>

                                <Image resizeMode={"stretch"} style={styles.BMIBannerImg} source={SELFIE_BMI_BANNER}>

                                </Image>
                                <Text style={styles.BMIBannerText}>Check Using Selfie</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                this.props.updateCurrentStep(4)
                            }}>
                                <Image resizeMode={"stretch"} style={styles.BMIBannerImg} source={MANUAL_BMI_BANNER}>

                                </Image>
                                <Text style={styles.BMIBannerText}>Check Manually</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    )
                }

                {/* MANUAL BMI*/}
                {
                    step === 4 && (
                        <>
                            <View style={styles.yourBMIContainer}>
                                <View >
                                    <Text>
                                        {this.metaConstants.height}
                                    </Text>

                                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: "center" }}>
                                        <TextInput
                                            style={styles.heightInput}
                                            onChangeText={(text) => {
                                                this.handleHeightFeetChange(text)
                                            }}
                                            keyboardType={"numeric"}
                                            value={heightFeet}
                                        />
                                        <Text>
                                            {` \'`}
                                        </Text>

                                        <TextInput
                                            style={{
                                                ...styles.heightInput,
                                                marginLeft: 10
                                            }}
                                            onChangeText={(text) => {
                                                this.handleHeightInchesChange(text)
                                            }}
                                            keyboardType={"numeric"}
                                            value={heightInches}
                                        />
                                        <Text>
                                            {` "`}
                                        </Text>
                                        <Text style={{ marginLeft: 10 }}>
                                            {this.metaConstants.inft}
                                        </Text>
                                    </View>


                                </View>

                                <View style={{ marginLeft: 60 }}>
                                    <Text style={styles.weightInputText}>
                                        {this.metaConstants.weight}
                                    </Text>
                                    <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
                                        <TextInput
                                            style={styles.weightInput}
                                            onChangeText={(text) => {
                                                this.handleWeightChange(text)
                                            }}
                                            keyboardType={"numeric"}
                                            value={weight}
                                        />
                                        <Text>
                                            {this.metaConstants.kg}
                                        </Text>
                                    </View>

                                </View>


                            </View>

                            {/* your BMI */}
                            {
                                BMI
                                    ? <View style={styles.BMIValueContainer}>
                                        <Text style={styles.yourBMIText}>
                                            {this.metaConstants.yourBmi}
                                        </Text>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Text style={styles.yourBMIValue}>
                                                {BMI}
                                            </Text>
                                            <Text style={styles.yourBMICategory}>
                                                {BMICategory}
                                            </Text>
                                        </View>
                                    </View>
                                    : null
                            }
                        </>
                    )
                }




                {/* Date Piccker Model */}
                <Modal isVisible={this.state.showDatePickerModal} onBackdropPress={() => {
                    this.setState({ showDatePickerModal: false })
                }} style={styles.datePickerContainer}>
                    <DatePicker
                        mode="date"
                        date={this.state.dob}
                        maximumDate={new Date(moment().format())}
                        onDateChange={(date) => {
                            console.log(date)
                            this.setState({ dob: date })
                        }}
                    />
                </Modal>
            </>
        )
    }
}

export default AboutYou;
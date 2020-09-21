import React, { PureComponent } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, TextInput, BackHandler, Picker, Modal, Platform } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import DatePicker from 'react-native-date-picker';
import ImagePicker from "react-native-image-crop-picker";
import Icons from "react-native-vector-icons/FontAwesome";
import OpenSettings from "react-native-open-settings";
import { Header } from "../../components/Header";
import { BasicInformationStyle as styles } from './styles'
import {
    gotoCCAQuestionScreen,
    updatePulseProfile, babylonBirthDate,
    getBasicInformation, saveBasicInformation,
    gotoCCAAssessmentHistory, gotoCCAIntroductionScreen,
    gotoPulseHealthScreen,
} from "../../actions"
import GenericButton from "../../components/GenericButton";
import { optionsData } from "./optionsData";
import { path, pathOr, isEmpty } from "ramda";
import { CoreUtils } from "@pru-rt-internal/pulse-common";
import { ccaImages } from "../../images"
const { isNilOrEmpty } = CoreUtils;
import MetaConstants from "../../meta";
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import { Theme } from "../../../../themes";
import { switchDobLang } from "../../utils";
const { Colors } = Theme;

class BasicInformation extends PureComponent {
    constructor(props) {
        super(props);
        this.MetaConstants = { ...MetaConstants.initializeCCAScreenMeta() };
        this.state = {
            profilePic: "",
            profilePicModalVisible: false,
            profilePicFileName: "",
            profilePicFormat: "",
            name: "",
            gender: "",
            genderCode: "",
            dob: "",
            dobCN: "",
            dobError: false,
            dobModalVisible: false,
            city: "",
            cityCode: "",
            cityModalVisible: false,
            smokeHabit: "",
            smokeCode: "",
            drinkHabit: "",
            drinkCode: "",
            exerciseHabit: "",
            exerciseCode: "",
        };
    }

    componentDidMount = () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleDeviceBackButton);

        const { userIcon, firstName, lastName, gender, dob, memberUuid } = this.props
        this.props.getBasicInformation({ memberUuid })

        const birthDate = dob && !isEmpty(dob) ? moment(dob, "DD-MM-YYYY").format("DD MMM YYYY") : ""
        this.setState({
            profilePic: userIcon && !isEmpty(userIcon) ? userIcon : "",
            name: firstName && lastName && !isEmpty(firstName) && !isEmpty(lastName) ? `${lastName} ${firstName}` : "",
            gender: gender && !isEmpty(gender) ? gender.toUpperCase() : "",
            dob: birthDate && !isEmpty(birthDate) ? birthDate : "",
            dobCN: birthDate && !isEmpty(birthDate) ? switchDobLang(birthDate, this.MetaConstants) : "",
        });

        if (gender && !isEmpty(gender)) {
            for (let i = 0; i < optionsData.genderData.length; i++) {
                if (gender.toUpperCase() === path(["genderData", i, "optionEN"], optionsData).toUpperCase()) {
                    this.setState({ genderCode: path(["genderData", i, "code"], optionsData) })
                }
            }
        }
        this.props.dispatchEvent(events.BasicInformationScreen)
    }


    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleDeviceBackButton);
    }

    handleDeviceBackButton = () => {
        this.onBackPress();
        return true;
    }

    componentWillReceiveProps = (nextProps) => {
        const { cityCode, smokeCode, drinkCode, exerciseCode } = this.state
        const { basicInformation } = nextProps
        if (basicInformation && Object.keys(basicInformation).length !== 0) {

            if (cityCode !== basicInformation.assessments.cca.region) {
                for (let i = 0; i < optionsData.cityData.length; i++) {
                    if (basicInformation.assessments.cca.region === optionsData.cityData[i].code) {
                        const nextCityCode = optionsData.cityData[i].code
                        let nextCityOption;
                        if (this.props.language === "EN") {
                            nextCityOption = optionsData.cityData[i].optionEN
                        }
                        else {
                            nextCityOption = optionsData.cityData[i].optionCH
                        }

                        this.setState({
                            city: nextCityOption,
                            cityCode: nextCityCode,
                        });
                    }
                }

                if (smokeCode !== basicInformation.lifestyle.smokingHabit) {
                    for (let j = 0; j < optionsData.smokeData.length; j++) {
                        if (basicInformation.lifestyle.smokingHabit === optionsData.smokeData[j].code) {
                            const nextSmokeCode = optionsData.smokeData[j].code
                            let nextSmokeOption;
                            if (this.props.language === "EN") {
                                nextSmokeOption = optionsData.smokeData[j].optionEN
                            } else {
                                nextSmokeOption = optionsData.smokeData[j].optionCH
                            }
                            this.setState({
                                smokeHabit: nextSmokeOption,
                                smokeCode: nextSmokeCode,
                            });
                        }
                    }
                }

                if (drinkCode !== basicInformation.lifestyle.drinkingHabit) {
                    for (let k = 0; k < optionsData.drinkData.length; k++) {
                        if (basicInformation.lifestyle.drinkingHabit === optionsData.drinkData[k].code) {
                            const nextDrinkCode = optionsData.drinkData[k].code
                            let nextDrinkOption;
                            if (this.props.language === "EN") {
                                nextDrinkOption = optionsData.drinkData[k].optionEN
                            } else {
                                nextDrinkOption = optionsData.drinkData[k].optionCH
                            }
                            this.setState({
                                drinkHabit: nextDrinkOption,
                                drinkCode: nextDrinkCode,
                            });
                        }
                    }
                }

                if (exerciseCode !== basicInformation.lifestyle.athleticsHabit) {
                    for (let l = 0; l < optionsData.exerciseData.length; l++) {
                        if (basicInformation.lifestyle.athleticsHabit === optionsData.exerciseData[l].code) {
                            const nextExerciseCode = optionsData.exerciseData[l].code
                            let nextExerciseOption
                            if (this.props.language === "EN") {
                                nextExerciseOption = optionsData.exerciseData[l].optionEN
                            } else {
                                nextExerciseOption = optionsData.exerciseData[l].optionCH
                            }
                            this.setState({
                                exerciseHabit: nextExerciseOption,
                                exerciseCode: nextExerciseCode
                            });
                        }
                    }
                }

            }

        }
    }

    renderProfilePicModal = () => {
        const Select = this.MetaConstants.Select;
        const Camera = this.MetaConstants.camera;
        const Gallery = this.MetaConstants.gallery;

        return (
            <Modal visible={this.state.profilePicModalVisible}>
                <TouchableOpacity
                    style={styles.profileModalContent}
                    onPress={() => {
                        this.setState({ profilePicModalVisible: false });
                    }}
                >
                    <View style={styles.profileModalStyle}>
                        <Text style={styles.profileModalLabel}>{Select}</Text>
                        <View style={styles.profileModalButtonContainer}>
                            <TouchableOpacity
                                style={styles.profileModalLeftButton}
                                onPress={() => {
                                    this.showCamera()
                                    this.props.dispatchEvent(events.UploadProfileCameraClick)
                                }}>
                                <View style={styles.profileModalIcon}>
                                    <Icons name="camera" size={50} color={Colors.alizarin} />
                                </View>
                                <Text style={styles.profileModalButtonLabel}>{Camera}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.profileModalRightButton}
                                onPress={() => {
                                    this.showGallery()
                                    this.props.dispatchEvent(events.UploadProfileImageLibClick)
                                }}>
                                <View style={styles.profileModalIcon}>
                                    <Icons name="photo" size={50} color={Colors.alizarin} />
                                </View>
                                <Text style={styles.profileModalButtonLabel}>{Gallery}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };

    showCamera = () => {
        ImagePicker.openCamera({
            width: 200,
            height: 200,
            compressImageMaxWidth: 200,
            compressImageMaxHeight: 200,
            useFrontCamera: true,
            includeBase64: true,
            compressImageQuality: 0.8,
            photo: "photo",
        })
            .then(this.imageCallbackHandler.bind(this))
            .catch(error => {
                if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
                    Alert.alert(
                        "",
                        'Please Enable Camera Permission from settings',
                        [
                            { text: 'OK', onPress: () => OpenSettings.openSettings() },
                            { text: 'Cancel', style: "cancel" },
                        ],
                        { cancelable: false }
                    );
                }
            });
    }

    showGallery = () => {
        ImagePicker.openPicker({
            mediaType: "photo",
            width: 200,
            height: 200,
            includeBase64: true,
            compressImageMaxWidth: 200,
            compressImageMaxHeight: 200,
            compressImageQuality: 0.8,
            photo: "photo",
        })
            .then(this.imageCallbackHandler.bind(this))
            .catch(error => {
                if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
                    Alert.alert(
                        "",
                        'Please Enable Photos Permission from settings',
                        [
                            { text: 'OK', onPress: () => OpenSettings.openSettings() },
                            { text: 'Cancel', style: "cancel" },
                        ],
                        { cancelable: false }
                    );
                }
            });
    }

    imageCallbackHandler = (image) => {
        this.setState(
            {
                profilePic: image.data,
                profilePicFileName: image.path.split("/").pop() || "",
                profilePicFormat: image.mime || null,
                profilePicModalVisible: false,
            },
        );
    }

    renderDobModal = () => {
        const { numYearsToAdd } = this.props
        const { dob } = this.state
        const Done = this.MetaConstants.Done;
        const { languageList = [], language } = this.props;
        const languageObj =
            languageList.find(
                element => element.languageCode === language.toUpperCase()
            ) || {};
        const locale = pathOr("en", ["locale"], languageObj);

        return (
            <Modal visible={this.state.dobModalVisible} transparent={true}>
                <View style={styles.modalTransparentView}>
                    <View style={styles.pickerView}>
                        <View style={styles.pickerHeaderView}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.selectedDOB()
                                    this.props.dispatchEvent(events.DOBClick);
                                }}
                            >
                                <Text style={styles.pickerButtonText}>{Done}</Text>
                            </TouchableOpacity>
                        </View>

                        <DatePicker
                            mode="date"
                            minimumDate={moment().add(numYearsToAdd - 100, "y").toDate()}
                            maximumDate={moment().add(numYearsToAdd, "y").toDate()}
                            date={dob === "" ? moment().toDate() : moment(dob).toDate()}
                            onDateChange={date => this.setDOB(date)}
                            locale={locale}
                        />

                    </View>
                </View>
            </Modal>
        );
    };

    setDOB = date => {
        const dateOfBirth = moment(date).format("DD MMM YYYY")
        this.setState({ dob: dateOfBirth, dobCN: switchDobLang(dateOfBirth, this.MetaConstants) })
    }

    selectedDOB = () => {
        const { minAgeRequired, numYearsToAdd } = this.props
        const maxAllowedDob = moment().add(numYearsToAdd - minAgeRequired, "y").toDate();
        const dob = moment(this.state.dob);
        if (dob.isAfter(maxAllowedDob)) {
            this.setState({ dobModalVisible: false, dobError: true });
            return false
        } else {
            this.setState({ dobModalVisible: false, dobError: false });
            this.props.babylonBirthDate(dob.toDate())
            return true
        }
    };

    validateDOB = () => {
        if (!this.selectedDOB()) {
            this.setState({ dobError: true });
        } else {
            this.setState({ dobError: false });
        }
    }

    renderCityModal = cityList => {
        const Done = this.MetaConstants.Done;
        return (
            <Modal visible={this.state.cityModalVisible} transparent={true}>
                <View style={styles.modalTransparentView}>
                    <View style={styles.pickerView}>
                        <View style={styles.pickerHeaderView}>
                            <TouchableOpacity onPress={() => this.onCityDonePress()}>
                                <Text style={styles.pickerButtonText}>{Done}</Text>
                            </TouchableOpacity>
                        </View>

                        <Picker
                            selectedValue={this.state.city}
                            style={styles.cityPickerStyle}
                            onValueChange={(item, index) => this.onCityChange(item)}
                        >
                            {cityList.map((item, index) => {
                                if (this.props.language === "EN") {
                                    return <Picker.Item label={item.optionEN} value={item.optionEN} />
                                } else {
                                    return <Picker.Item label={item.optionCH} value={item.optionCH} />
                                }
                            })}
                        </Picker>
                    </View>
                </View>
            </Modal>
        );
    };

    onCityDonePress = () => {
        this.setState({ cityModalVisible: false })
        const { city, cityCode } = this.state
        if (city === "") {
            if (this.props.language === "EN") {
                this.setState({
                    city: path(["cityData", 0, "optionEN"], optionsData),
                    cityCode: path(["cityData", 0, "code"], optionsData),
                })
            } else {
                this.setState({
                    city: path(["cityData", 0, "optionCH"], optionsData),
                    cityCode: path(["cityData", 0, "code"], optionsData),
                })
            }

        }
    }

    onCityChange = (selectedCity) => {
        this.setState({ city: selectedCity })
        for (let i = 0; i < optionsData.cityData.length; i++) {
            if (this.props.language === "EN") {
                if (selectedCity === path(["cityData", i, "optionEN"], optionsData)) {
                    this.setState({ cityCode: path(["cityData", i, "code"], optionsData) })
                }
            } else {
                if (selectedCity === path(["cityData", i, "optionCH"], optionsData)) {
                    this.setState({ cityCode: path(["cityData", i, "code"], optionsData) })
                }
            }

        }

    }

    onOptionSelect = (item, key) => {
        if (key === "gender") this.setState({ gender: item.optionEN.toUpperCase(), genderCode: item.code });
        if (key === "smoke") {
            if (this.props.language === "EN") {
                this.setState({ smokeHabit: item.optionEN, smokeCode: item.code });
            } else {
                this.setState({ smokeHabit: item.optionCH, smokeCode: item.code });
            }
        }
        if (key === "drink") {
            if (this.props.language === "EN") {
                this.setState({ drinkHabit: item.optionEN, drinkCode: item.code });
            } else {
                this.setState({ drinkHabit: item.optionCH, drinkCode: item.code });
            }
        }
        if (key === "exercise") {
            if (this.props.language === "EN") {
                this.setState({ exerciseHabit: item.optionEN, exerciseCode: item.code });
            } else {
                this.setState({ exerciseHabit: item.optionCH, exerciseCode: item.code });
            }
        }


    }

    validateData = () => {
        const { name, gender, dob, dobError, city, smokeHabit, drinkHabit, exerciseHabit } = this.state
        if (name === "" || gender === "" || dob === "" || dobError === true || city === "" ||
            smokeHabit === "" || drinkHabit === "" || exerciseHabit === "") {
            return false
        }
        else {
            return true
        }
    }

    onBackPress = () => {
        const { assessmentStatus } = this.props
        if (assessmentStatus.fillTimes > 0) {
            this.props.gotoCCAAssessmentHistory()
        } else {
            this.props.gotoCCAIntroductionScreen()
        }
    }

    onNextPress = () => {
        const { numYearsToAdd, token, id, memberUuid } = this.props;
        const { profilePic, profilePicFileName, profilePicFormat, gender, dob,
            genderCode, cityCode, smokeCode, drinkCode, exerciseCode
        } = this.state;
        const userProfileData = {};
        if (!isNilOrEmpty(profilePic)) {
            userProfileData["documents"] = [
                {
                    content: profilePic.toString(),
                    contentType: "Image",
                    filename: profilePicFileName,
                    format: profilePicFormat,
                },
            ];
        }
        userProfileData["sex"] = gender;
        userProfileData["dob"] = moment(dob, "DD MMM YYYY").subtract(numYearsToAdd, "years").format("DD-MM-YYYY");
        userProfileData["id"] = id;

        const presentDate = moment(new Date());
        const birthDate = moment(dob, "DD MMM YYYY");
        const diff = moment.duration(presentDate.diff(birthDate));
        const age = Math.floor(diff.asYears());

        const basicInfoPayload = {};
        basicInfoPayload["lifestyle"] = {
            smokingHabit: smokeCode,
            drinkingHabit: drinkCode,
            athleticsHabit: exerciseCode
        };
        basicInfoPayload["assessments"] = {}
        basicInfoPayload["assessments"]["cca"] = {
            region: cityCode,
            gender: genderCode,
            age: age
        };

        if (!isNilOrEmpty(token) && Object.keys(basicInfoPayload).length !== 0) {
            this.props.updatePulseProfile(userProfileData);
            this.props.saveBasicInformation({ memberUuid, basicInfoPayload });
        }

    }

    render() {
        const Home = this.MetaConstants.Home;
        const Back = this.MetaConstants.Back;
        const BasicInfo = this.MetaConstants.BasicInfo;
        const BasicInfoDesc = this.MetaConstants.BasicInfoDesc;
        const Change = this.MetaConstants.Change;
        const Add = this.MetaConstants.Add;
        const RequiredInfo = this.MetaConstants.RequiredInfo;
        const Gender = this.MetaConstants.Gender;
        const DateOfBirth = this.MetaConstants.Dob;
        const City = this.MetaConstants.City;
        const Next = this.MetaConstants.Next;
        const SmokingHabit = this.MetaConstants.SmokingHabit;
        const DrinkHabit = this.MetaConstants.DrinkHabit;
        const ExerciseHabit = this.MetaConstants.ExerciseHabit;

        const {
            profilePic, name, gender, dob, dobCN, dobError, city,
            smokeHabit, drinkHabit, exerciseHabit,
            profilePicModalVisible, dobModalVisible, cityModalVisible
        } = this.state
        const { locale } = this.props
        var profilePicture = profilePic && !isEmpty(profilePic)
            ? { uri: `data:image/jpeg;base64,${profilePic}` } : { uri: ccaImages.defaultProfilPic }

        const genderOptions = optionsData.genderData
        const cityOptions = optionsData.cityData
        const smokeOptions = optionsData.smokeData.slice().reverse()
        const drinkOptions = optionsData.drinkData.slice().reverse()
        const exerciseOptions = optionsData.exerciseData.slice().reverse()
        const ccaName = this.MetaConstants.ccaName;
        const EnterName = this.MetaConstants.EnterName;
        const ageRequired = this.MetaConstants.ageRequired;
        const Select = this.MetaConstants.Select;

        return (
            <SafeAreaView style={styles.safeView}>

                <Header
                    onPressIcon={() => {
                        this.onBackPress();
                        this.props.dispatchEvent(events.BackButtonBasicInfoOptionClick);
                    }}
                />
                <View style={styles.mainView}>

                    <View style={styles.upperView}>
                        <Text style={styles.basicInfoText}>{BasicInfo}</Text>
                        <Text style={styles.pleaseProvideText}>{BasicInfoDesc}</Text>

                        <View style={styles.imageChangeView}>
                            <View style={styles.profilePicView}>
                                <Image style={styles.profilePic} resizeMode="cover" source={profilePicture} />
                            </View>
                        </View>

                        <Text style={styles.requiredText}>(*) {RequiredInfo}</Text>
                    </View>

                    {profilePicModalVisible ? this.renderProfilePicModal() : null}

                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

                        <View style={styles.subViews}>
                            <Text style={styles.subHeadingText}>
                                {ccaName}
                                <Text style={{ color: Colors.alizarin }}>*</Text>
                            </Text>
                            <TextInput style={styles.dobValueText}
                                editable={name === "" ? true : false}
                                placeholder={EnterName}
                                value={name}
                                onChangeText={(newName) => this.setState({ name: newName })}
                            />
                            <View style={styles.underline} />
                        </View>

                        <View style={styles.subViews}>
                            <Text style={styles.subHeadingText}>
                                {Gender}
                                <Text style={{ color: Colors.alizarin }}>*</Text>
                            </Text>
                            <View style={styles.optionsView}>
                                {genderOptions.map((item) => {
                                    return (
                                        <TouchableOpacity disabled={this.props.gender && !isEmpty(this.props.gender) ? true : false}
                                            onPress={() => {
                                                this.onOptionSelect(item, "gender")
                                                this.props.dispatchEvent(events.GenderChange);
                                            }}
                                            style={item.optionEN.toUpperCase() === gender.toUpperCase() ? styles.genderSelectedOptionView : styles.genderUnselectedOptionView}>
                                            <Text style={item.optionEN.toUpperCase() === gender.toUpperCase() ? styles.selectedOptionText : styles.unselectedOptionText}>
                                                {this.props.language === "EN" ? item.optionEN : item.optionCH}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                                }
                            </View>
                        </View>

                        <View style={styles.subViews}>
                            <Text style={styles.subHeadingText}>
                                {DateOfBirth}
                                <Text style={{ color: Colors.alizarin }}>*</Text>
                            </Text>
                            <TouchableOpacity style={styles.iconView}
                                onPress={() => {
                                    this.setState({ dobModalVisible: true })
                                    this.props.dispatchEvent(events.DOBClick);
                                }}
                            >
                                <TextInput style={styles.dobValueText} placeholder={Select} editable={false} onChange={() => this.validateDOB()}>
                                    {locale === "tw" ? dobCN : dob}
                                </TextInput>
                                <Image style={styles.icon} resizeMode="contain" source={{ uri: ccaImages.grayCalendar }} />
                            </TouchableOpacity>
                            <View style={styles.underline} />
                            {dobError ? <Text style={styles.dobErrorText}>{ageRequired}</Text> : null}
                        </View>

                        {dobModalVisible ? this.renderDobModal() : null}

                        <View style={styles.subViews}>
                            <Text style={styles.subHeadingText}>
                                {City}
                                <Text style={{ color: Colors.alizarin }}>*</Text>
                            </Text>
                            <TouchableOpacity style={styles.iconView}
                                onPress={() => {
                                    this.setState({ cityModalVisible: true })
                                    this.props.dispatchEvent(events.CityOptionClick);
                                }}
                            >
                                <TextInput style={styles.cityValueText} placeholder={Select} editable={false} >{city}</TextInput>
                                <Image style={styles.icon} resizeMode="contain" source={{ uri: ccaImages.downArrow }} />
                            </TouchableOpacity>
                            <View style={styles.underline} />
                        </View>

                        {cityModalVisible ? this.renderCityModal(cityOptions) : null}

                        <View style={styles.subViews}>
                            <Text style={styles.subHeadingText}>
                                {SmokingHabit}
                                <Text style={{ color: Colors.alizarin }}>*</Text>
                            </Text>
                            <View style={styles.optionsView}>
                                {smokeOptions.map((item) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            this.onOptionSelect(item, "smoke");
                                            this.props.dispatchEvent(events.SmokeHabitClick);
                                        }}
                                            style={this.props.language === "EN" ? item.optionEN === smokeHabit ? styles.selectedOptionView : styles.unselectedOptionView : item.optionCH === smokeHabit ? styles.selectedOptionView : styles.unselectedOptionView}>
                                            <Text style={this.props.language === "EN" ? item.optionEN === smokeHabit ? styles.selectedOptionText : styles.unselectedOptionText : item.optionCH === smokeHabit ? styles.selectedOptionText : styles.unselectedOptionText}>
                                                {this.props.language === "EN" ? item.optionEN : item.optionCH}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                                }
                            </View>
                        </View>

                        <View style={styles.subViews}>
                            <Text style={styles.subHeadingText}>
                                {DrinkHabit}
                                <Text style={{ color: Colors.alizarin }}>*</Text>
                            </Text>
                            <View style={styles.optionsView}>
                                {drinkOptions.map((item) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.onOptionSelect(item, "drink");
                                                this.props.dispatchEvent(events.DrinkHabitClick);
                                            }}
                                            style={this.props.language === "EN" ? item.optionEN === drinkHabit ? styles.selectedOptionView : styles.unselectedOptionView : item.optionCH === drinkHabit ? styles.selectedOptionView : styles.unselectedOptionView}>
                                            <Text style={this.props.language === "EN" ? item.optionEN === drinkHabit ? styles.selectedOptionText : styles.unselectedOptionText : item.optionCH === drinkHabit ? styles.selectedOptionText : styles.unselectedOptionText}>
                                                {this.props.language === "EN" ? item.optionEN : item.optionCH}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                                }
                            </View>
                        </View>

                        <View style={styles.subViews}>
                            <Text style={styles.subHeadingText}>
                                {ExerciseHabit}
                                <Text style={{ color: Colors.alizarin }}>*</Text>
                            </Text>
                            <View style={styles.optionsView}>
                                {exerciseOptions.map((item) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.onOptionSelect(item, "exercise");
                                                this.props.dispatchEvent(events.ExcerciseHabitClick);
                                            }}
                                            style={this.props.language === "EN" ? item.optionEN === exerciseHabit ? styles.selectedOptionView : styles.unselectedOptionView : item.optionCH === exerciseHabit ? styles.selectedOptionView : styles.unselectedOptionView}>
                                            <Text style={this.props.language === "EN" ? item.optionEN === exerciseHabit ? styles.selectedOptionText : styles.unselectedOptionText : item.optionCH === exerciseHabit ? styles.selectedOptionText : styles.unselectedOptionText}>
                                                {this.props.language === "EN" ? item.optionEN : item.optionCH}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                                }
                            </View>
                        </View>

                    </ScrollView>

                    <GenericButton
                        label={Next}
                        backgroundColor={!this.validateData() ? Colors.alizarinOpaque : Colors.alizarin}
                        widthOffset={1.2}
                        position="center"
                        disabled={!this.validateData() ? true : false}
                        onPress={() => {
                            this.onNextPress()
                            this.props.dispatchEvent(events.NextbuttonClick);
                        }}
                    />

                </View>
            </SafeAreaView >
        );
    }
}

BasicInformation.PropTypes = {

};

const mapStateToProps = state => {
    return {
        userIcon: state.profile.profilePicture,
        firstName: state.profile.firstName,
        lastName: state.profile.surName,
        gender: state.profile.gender,
        dob: state.profile.dob,
        id: state.profile.id,
        token: state.auth.token,
        assessmentStatus: state.cca.assessmentStatus,
        assessmentId: state.cca.assessmentStatus.recordId,
        basicInformation: state.cca.basicInformation,
        memberUuid: state.profile.id,
        minAgeRequired: pathOr(20, ["meta", "countryCommonMeta", "minimumAge"], state),
        numYearsToAdd: Platform.OS !== "ios" &&
            path(["auth", "countryInfo", "simCountry"], state) === "TH" && moment().get("year") < 2500 ? 543 : 0,
        locale: pathOr("", ["userPreferences", "language"], state).toLowerCase(),
        language: pathOr("", ["userPreferences", "language"], state),
        languageList: state.meta.languageList,
    };
};
export default connect(
    mapStateToProps,
    {
        getBasicInformation,
        babylonBirthDate,
        updatePulseProfile,
        saveBasicInformation,
        gotoCCAQuestionScreen,
        gotoCCAAssessmentHistory,
        gotoCCAIntroductionScreen,
        gotoPulseHealthScreen,
        dispatchEvent
    }
)(BasicInformation);
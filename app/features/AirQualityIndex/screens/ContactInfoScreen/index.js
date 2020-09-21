import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { View, Text, Image, TouchableOpacity, Platform, ScrollView, ImageBackground, FlatList } from "react-native";
import {
    AQHI_WHITE_BACK,
    AQHI_femaleImage,
    AQHI_introBackground,
    AVATAR,
    RectangleGreen,
    RectangleGreenEmpty,
    RectangleGrey,
    RectanglePink,
    RectangleOrange,
    RectangleOrangeEmpty,
    greyLine,
    GreenBar,
    OrangeBar,
    PinkBar,
    RectangleYellow
} from "../../../../config/images";

import { styles } from './styles'
import metaConstants from "../../meta";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
import moment from 'moment';
import { SafeAreaView } from "react-navigation";
import SearchComponent from "../../components/SearchComponent";
import { Avatar } from "react-native-elements";
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import { goToBrezometerWelcomeScreen } from '../../actions'
class ContactInfoScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.metaConstants = { ...metaConstants.airQualityScreenMeta() }
        this.state = {
            mainBar: [
                {
                    name: this.metaConstants.aboutYou,
                    selected: true
                },
                {
                    name: this.metaConstants.interest,
                    selected: false
                },
                {
                    name: this.metaConstants.medicalAilments,
                    selected: false
                }],
            mainBarSelectedIndex: 0,
            genderOptions: [{
                name: this.metaConstants.male,
            },
            {
                name: this.metaConstants.female,
            },
            {
                name: this.metaConstants.others,
            }],
            selectedGender: "",
            ageGroupOptions: [{ name: this.metaConstants.child }, { name: this.metaConstants.adult }, { name: this.metaConstants.elderly }],
            selectedAgeGroup: "",
            activeOptions: [{ name: this.metaConstants.lessActive }, { name: this.metaConstants.active }, { name: this.metaConstants.veryActive }],
            selectedActive: "",
            pregnancyOptions: [{ name: this.metaConstants.yes }, { name: this.metaConstants.no }, { name: this.metaConstants.maybe }],
            selectedPregnancy: "",
            diseaseOptions: [{ name: this.metaConstants.yes }, { name: this.metaConstants.no }, { name: this.metaConstants.dontKnow }],
            selectedlungDisease: "",
            selectedHeartDisease: "",
            diseaseSkinOptions: [{ name: this.metaConstants.yes }, { name: this.metaConstants.no }, { name: this.metaConstants.both }],
            selectedSkin: "",
            locationOptions: [{ name: this.metaConstants.home }, { name: this.metaConstants.office }, { name: this.metaConstants.others }],
            selectedLocation: "",
            pollutantOptions: [{ name: this.metaConstants.airQuality }, { name: this.metaConstants.pollen }, { name: this.metaConstants.fires }],
            selectedPollutant: "",
            durationOptions: [{ name: this.metaConstants.current }, { name: this.metaConstants.historical }, { name: this.metaConstants.forecast }],
            selectedDuration: "",
            query: ""
        };

    }

    componentDidMount() {
        let event = events.PersonalDetailsScreen
        this.props.dispatchEvent(event);
    }

    getGreetings() {
        let hour = moment().hour();
        if (hour < 12) {
            return this.metaConstants.goodMorning;
        } else if (hour >= 12 && hour < 17) {
            return this.metaConstants.goodAfternoon;
        } else {
            return this.metaConstants.goodEvening;
        }
    }
    onChange = val => {
        this.setState({ query: val });
    };

    onAddressSelected = (completeAddress, lat, long) => {
        this.setState(
            {
                completeAddress,
            },
            () => {
                this.setState({ query: completeAddress });
            }
        );
    };
    onGenderPress(item) {
        let event = events.aboutYouOptionClick
        event.SelectedOption = item.name
        this.props.dispatchEvent(event);
        this.setState({ selectedGender: item.name })
    }
    onAgeGroupPress(item) {
        let event = events.aboutYouOptionClick
        event.SelectedOption = item.name
        this.props.dispatchEvent(event);
        this.setState({ selectedAgeGroup: item.name })
    }
    howActivePress(item) {
        let event = events.aboutYouOptionClick
        event.SelectedOption = item.name
        this.props.dispatchEvent(event);
        this.setState({ selectedActive: item.name })
    }
    onSelectPregnancy(item) {
        let event = events.aboutYouOptionClick
        event.SelectedOption = item.name
        this.props.dispatchEvent(event);
        this.setState({ selectedPregnancy: item.name })
    }
    aboutYou() {
        return (
            <View style={styles.commonViewStyle}>
                <View>
                    <Text style={styles.headingText}>{this.metaConstants.landingGender}</Text>
                    <View style={styles.commonView}>
                        {this.state.genderOptions.map(item => (
                            <TouchableOpacity
                                style={styles.commonTouchStyle}
                                onPress={() => this.onGenderPress(item)}
                            >
                                <ImageBackground
                                    style={styles.optionImage}
                                    imageStyle={styles.imgBorderStyle}
                                    source={item.name == this.state.selectedGender ? RectangleYellow : RectangleGrey}>
                                    <Text style={styles.optionText}>{item.name}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))}

                    </View>
                </View>
                <View style={styles.commonGroupView}>
                    <Text style={styles.headingText}>{this.metaConstants.ageGroup}</Text>
                    <View style={styles.commonView}>
                        {this.state.ageGroupOptions.map(item => (
                            <TouchableOpacity
                                style={styles.commonTouchStyle}
                                onPress={() => this.onAgeGroupPress(item)}
                            >
                                <ImageBackground
                                    style={styles.optionImage}
                                    imageStyle={styles.imgBorderStyle}
                                    source={item.name == this.state.selectedAgeGroup ? RectangleYellow : RectangleGrey}>
                                    <Text style={styles.optionText}>{item.name}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))}

                    </View>
                </View>
                <View style={styles.commonGroupView}>
                    <Text style={styles.headingText}>{this.metaConstants.howActive}</Text>
                    <View style={styles.commonView}>
                        {this.state.activeOptions.map(item => (
                            <TouchableOpacity
                                style={styles.commonTouchStyle}
                                onPress={() => this.howActivePress(item)}
                            >
                                <ImageBackground
                                    style={styles.optionImage}
                                    imageStyle={styles.imgBorderStyle}
                                    source={item.name == this.state.selectedActive ? RectangleYellow : RectangleGrey}>
                                    <Text style={styles.optionText}>{item.name}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))}

                    </View>
                </View>
                {
                    this.state.selectedGender === this.metaConstants.female && this.state.selectedAgeGroup !== this.metaConstants.child && < View style={styles.commonGroupView}>
                        <Text style={styles.headingText}>{this.metaConstants.areYouPregnant}</Text>
                        <View style={styles.commonView}>
                            {this.state.pregnancyOptions.map(item => (
                                <TouchableOpacity
                                    style={styles.commonTouchStyle}
                                    onPress={() => this.onSelectPregnancy(item)}
                                >
                                    <ImageBackground
                                        style={styles.optionImage}
                                        imageStyle={styles.imgBorderStyle}
                                        source={item.name == this.state.selectedPregnancy ? RectangleYellow : RectangleGrey}>
                                        <Text style={styles.optionText}>{item.name}</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            ))}

                        </View>
                    </View>
                }

            </View >
        )
    }
    onLungDiseaseSelect(item) {
        let event = events.medicalAilmentsOptionClick
        event.SelectedOption = item.name
        this.props.dispatchEvent(event);
        this.setState({ selectedlungDisease: item.name })
    }
    onHeartDiseaseSelect(item) {
        let event = events.medicalAilmentsOptionClick
        event.SelectedOption = item.name
        this.props.dispatchEvent(event);
        this.setState({ selectedHeartDisease: item.name })
    }
    onSkinDisease(item) {
        let event = events.medicalAilmentsOptionClick
        event.SelectedOption = item.name
        this.props.dispatchEvent(event);
        this.setState({ selectedSkin: item.name })
    }
    medicalAilments() {
        return (
            <View style={styles.commonViewStyle}>
                <View>
                    <Text style={styles.headingText}>{this.metaConstants.lungDisease}</Text>
                    <View style={styles.commonView}>
                        {this.state.diseaseOptions.map(item => (
                            <TouchableOpacity
                                style={styles.commonTouchStyle}
                                onPress={() => this.onLungDiseaseSelect(item)}
                            >
                                <ImageBackground
                                    style={styles.optionImage}
                                    imageStyle={styles.imgBorderStyle}
                                    source={item.name == this.state.selectedlungDisease ? RectangleYellow : RectangleGrey}>
                                    <Text style={styles.optionText}>{item.name}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))}

                    </View>
                </View>
                <View style={styles.commonGroupView}>
                    <Text style={styles.headingText}>{this.metaConstants.heartDisease}</Text>
                    <View style={styles.commonView}>
                        {this.state.diseaseOptions.map(item => (
                            <TouchableOpacity
                                style={styles.commonTouchStyle}
                                onPress={() => this.onHeartDiseaseSelect(item)}
                            >
                                <ImageBackground
                                    style={styles.optionImage}
                                    imageStyle={styles.imgBorderStyle}
                                    source={item.name == this.state.selectedHeartDisease ? RectangleYellow : RectangleGrey}>
                                    <Text style={styles.optionText}>{item.name}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))}

                    </View>
                </View>
                <View style={styles.commonGroupView}>
                    <Text style={styles.headingText}>{this.metaConstants.skinDisease}</Text>
                    <View style={styles.commonView}>
                        {this.state.diseaseSkinOptions.map(item => (
                            <TouchableOpacity
                                style={styles.commonTouchStyle}
                                onPress={() => this.onSkinDisease(item)}
                            >
                                <ImageBackground
                                    style={styles.optionImage}
                                    imageStyle={styles.imgBorderStyle}
                                    source={item.name == this.state.selectedSkin ? RectangleYellow : RectangleGrey}>
                                    <Text style={styles.optionText}>{item.name}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))}

                    </View>
                </View>
            </View >
        )
    }
    onPrefferedLocation(item) {
        let event = events.interestOptionClick
        event.SelectedOption = item.name
        this.props.dispatchEvent(event);
        this.setState({ selectedLocation: item.name })
    }
    onSelectPollutant(item) {
        let event = events.interestOptionClick
        event.SelectedOption = item.name
        this.props.dispatchEvent(event);
        this.setState({ selectedPollutant: item.name })
    }
    onSelectDuration(item) {
        let event = events.interestOptionClick
        event.SelectedOption = item.name
        this.props.dispatchEvent(event);
        this.setState({ selectedDuration: item.name })
    }

    interests() {
        return (
            <ScrollView>
                <View style={styles.commonViewStyle}>
                    <View >
                        <Text style={styles.headingText}>{this.metaConstants.preferredLocation}</Text>
                        <View style={styles.commonView}>
                            {this.state.locationOptions.map(item => (
                                <TouchableOpacity
                                    style={styles.commonTouchStyle}
                                    onPress={() => this.onPrefferedLocation(item)}
                                >
                                    <ImageBackground
                                        style={styles.optionImage}
                                        imageStyle={styles.imgBorderStyle}
                                        source={item.name == this.state.selectedLocation ? RectangleYellow : RectangleGrey}>
                                        <Text style={styles.optionText}>{item.name}</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <SearchComponent
                        onChange={this.onChange}
                        value={this.state.query}
                        onAddressSelected={this.onAddressSelected} />

                    <View style={styles.commonGroupView}>
                        <Text style={styles.headingText}>{this.metaConstants.selectPollutant}</Text>
                        <View style={styles.commonView}>
                            {this.state.pollutantOptions.map((item) => (
                                <TouchableOpacity
                                    style={styles.commonTouchStyle}
                                    onPress={() => this.onSelectPollutant(item)}
                                >
                                    <ImageBackground
                                        style={styles.optionImage}
                                        imageStyle={styles.imgBorderStyle}
                                        source={item.name == this.state.selectedPollutant ? RectangleYellow : RectangleGrey}>
                                        <Text style={styles.optionText}>{item.name}</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View style={styles.commonGroupView}>
                        <Text style={styles.headingText}>{this.metaConstants.selectTheDuration}</Text>
                        <View style={styles.commonView}>
                            {this.state.durationOptions.map(item => (
                                <TouchableOpacity
                                    style={styles.commonTouchStyle}
                                    onPress={() => this.onSelectDuration(item)}
                                >
                                    <ImageBackground
                                        style={styles.optionImage}
                                        imageStyle={styles.imgBorderStyle}
                                        source={item.name == this.state.selectedDuration ? RectangleYellow : RectangleGrey}>
                                        <Text style={styles.optionText}>{item.name}</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            ))}

                        </View>
                    </View>
                </View >
            </ScrollView >
        )
    }

    goBack() {
        let event = events.BackFromPersonalDetails
        this.props.dispatchEvent(event);
        this.props.navigation.goBack()
    }

    onSkipPress() {
        let event = events.skipButtonClick
        this.props.dispatchEvent(event);
        this.props.goToBrezometerWelcomeScreen()
    }
    render() {
        let { firstName, lastName, profilePicture } = this.props
        let profilePic = profilePicture ? { uri: `data:image/png;base64,${profilePicture}` } : AVATAR;

        return (
            <SafeAreaView style={styles.safeView}>
                <ImageBackground
                    style={styles.backgroundImage}
                    imageStyle={styles.imageStyle}
                    source={AQHI_introBackground}
                >
                    <View style={styles.headerView}>
                        <TouchableOpacity
                            style={styles.imgView}
                            onPress={() => this.goBack()}
                        >
                            <Image
                                source={AQHI_WHITE_BACK}
                                style={styles.imgStyle}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.imgView}
                            onPress={() => this.onSkipPress()}
                        >
                            <Text style={styles.skipText}>{this.metaConstants.skipText}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoView}>
                        <View style={styles.greetingView}>
                            <Text style={styles.greetingText}>{this.getGreetings()}</Text>
                            <Text style={styles.nameText}>{`${firstName} ${lastName}`}</Text>
                        </View>
                        <View style={styles.imgViewStyle}>
                            <Image style={styles.profileStyle} source={profilePic} />
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView>
                <View style={styles.mainBarView}>
                    {this.state.mainBar.map((item, index) => (
                            <View style={styles.itemView}>
                                <TouchableOpacity
                                    onPress={() => {
                                        let mainBar = this.state.mainBar;
                                        mainBar.map((itemList, indexList) => {
                                            if (indexList == index) {
                                                itemList.selected = true
                                            } else
                                                itemList.selected = false
                                        })
                                        this.setState({
                                            mainBar: mainBar,
                                            mainBarSelectedIndex: index
                                        })
                                    }}>
                                    {item.selected ?
                                        (<View>
                                            <Text
                                                style={index == 0 ? styles.selectedTextGreen :
                                                    index == 1 ? styles.selectedTextOrange :
                                                        styles.selectedTextPink}>{item.name}
                                            </Text>
                                            <View style={styles.commonView}>
                                                <Image style={styles.selectedImgStyle} source={index == 0 ? RectangleGreen : index == 1 ? RectangleOrange : RectanglePink} />
                                                <Image style={styles.selectedImgStyle} source={index == 0 ? RectangleGreenEmpty : index == 1 ? RectangleOrange : RectanglePink} />
                                                <Image style={styles.selectedImgStyle} source={index == 0 ? RectangleGreenEmpty : index == 1 ? RectangleOrangeEmpty : RectanglePink} />
                                            </View>
                                            <View style={styles.greenView}>
                                                <Image source={index == 0 ? GreenBar : index == 1 ? OrangeBar : PinkBar} />
                                            </View>


                                        </View>) :
                                        (<View>
                                            <Text style={styles.itemNameStyle}>{item.name}</Text>
                                            <View style={styles.commonView}>
                                                <Image style={styles.greyBoxStyle} source={RectangleGrey} />
                                                <Image style={styles.greyBoxStyle} source={RectangleGrey} />
                                                <Image style={styles.greyBoxStyle} source={RectangleGrey} />
                                            </View>
                                        </View>)
                                    }
                                </TouchableOpacity>
                            </View>
                        
                    ))}
                </View>

                <View>
                    <Image style={styles.greyLineStyle} source={greyLine} />
                </View>
                {this.state.mainBarSelectedIndex === 0 ? this.aboutYou() : null}
                {this.state.mainBarSelectedIndex === 1 ? this.interests() : null}
                {this.state.mainBarSelectedIndex === 2 ? this.medicalAilments() : null}

                <View style={styles.goToWelcomeView}>
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={() => this.props.goToBrezometerWelcomeScreen()}>
                        <Text style={styles.continueText}>{this.metaConstants.continue}</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </SafeAreaView >
        );
    }
}

const mapStateToProps = (state) => ({
    firstName: state.profile.firstName,
    lastName: state.profile.surName,
    profilePicture: state.profile.profilePicture
});

export default connect(mapStateToProps, {
    goToBrezometerWelcomeScreen,
    dispatchEvent,
})(ContactInfoScreen);
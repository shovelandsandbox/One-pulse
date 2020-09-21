import React, { Component } from "react";
import { SafeAreaView, View, Image, FlatList, TouchableOpacity, Modal, Text, TextInput, BackHandler } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { BabyScreenStyles as styles } from './styles';
import { metaFinderFaceBlender } from "../../meta";
import Header from '../../components/Header';
import { faceBlendImages } from "../../images";
import { getBabyDetails } from "../../actions";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

let babyColor = [
    {
        image: faceBlendImages.baby_1,
        tone: "1"
    },
    {
        image: faceBlendImages.baby_2,
        tone: "2"
    },
    {
        image: faceBlendImages.baby_3,
        tone: "3"
    },
    {
        image: faceBlendImages.baby_4,
        tone: "4"
    },
    {
        image: faceBlendImages.baby_5,
        tone: "5"
    },
    {
        image: faceBlendImages.baby_6,
        tone: "6"
    }
]

let fontList = ["kanit", "Taviraj", "Itim", "Trirong"]

class BabyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skinTone: "",
            gender: "",
            messageFont: fontList[0],
            message: "",
            visible: false,
        };
        this.genderArr = [{
            code: "M",
            name: metaFinderFaceBlender("FaceBlenderMale"),
            Img: faceBlendImages.male
        },
        {
            code: "F",
            name: metaFinderFaceBlender("FaceBlenderFemale"),
            Img: faceBlendImages.female
        },
        {
            code: "U",
            name: metaFinderFaceBlender("FaceBlenderUnknown"),
            Img: faceBlendImages.unknown
        }]
    }

    componentDidMount = () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
        this.props.registerEvent(eventNames.customizeYourBabyOnLoad);
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {

    }

    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    }

    handleBackButton = () => {
        this.props.navigation.navigate("MumScreen");
        this.props.registerEvent(eventNames.customizeYourBabyCrossButtonClick);
        return true;
    }

    renderSkin = (item, index) => {
        const { skinTone } = this.state
        return (
            <TouchableOpacity
                onPress={() => {
                    const skinColor = "baby_" + (item.tone)
                    this.props.registerEvent(eventNames.customizeYourBabySkinColorSelected, {
                        skinColor: skinColor
                    });
                    this.setState({ skinTone: item.tone });
                }}>
                <Image source={{ uri: item.image }} style={[styles.skinicon, { borderColor: skinTone === item.tone ? Colors.alizarin : Colors.white }]} />
            </TouchableOpacity>
        )
    }

    renderGender = () => {
        const { gender } = this.state
        return (
            <View style={styles.selectGender}>
                {this.genderArr.length > 0 && this.genderArr.map((item, index) => {
                    return (
                        <TouchableOpacity
                            style={[styles.genderIconBox, { borderColor: gender === item.code ? Colors.alizarin : Colors.greydddddd }]}
                            onPress={() => {
                                this.setState({ gender: item.code });
                                this.props.registerEvent(eventNames.customizeYourBabyGenderSelected, {
                                    gender: item.name
                                });
                            }}>
                            <Image source={{ uri: item.Img }} resizeMode={"contain"} style={styles.gendericon} />
                            {gender === item.code ? (<Text style={styles.SelectedGender}>{item.name}</Text>) : (<Text style={{ fontSize: 12 }}>{item.name}</Text>)}

                        </TouchableOpacity>
                    );
                })}
            </View>
        )
    }

    renderFontModal = () => {
        const { visible } = this.state
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => this.setState({ visible: false })}
            >
                <TouchableOpacity
                    onPress={() => this.setState({ visible: false })}
                    style={styles.fontModalBg}
                    activeOpacity={1}>
                    <TouchableOpacity style={styles.fontModalView} activeOpacity={1}>
                        {fontList.map((item, index) => {
                            return (
                                <>
                                    <TouchableOpacity style={styles.fontModalOptionView}
                                        onPress={() => this.setState({ messageFont: item, visible: false })}>
                                        <Text style={styles.fontModalOptionText}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                    {index !== (fontList.length - 1) &&
                                        <View style={styles.fontModalOptionDivider} />
                                    }
                                </>
                            )
                        })
                        }
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        )
    }

    showArrowView() {
        const { messageFont } = this.state
        return (
            <TouchableOpacity onPress={() => this.setState({ visible: true })}>
                <View style={styles.dropdown}>
                    <Text style={styles.ageInput}>{messageFont}</Text>
                    <Image source={{ uri: faceBlendImages.arrow }} style={styles.arrowicon} />
                </View>
            </TouchableOpacity>
        )
    }

    renderBabyText = () => {
        const { messageFont, message } = this.state
        return (
            <TouchableOpacity>
                <View style={styles.dropdown}>
                    <TextInput placeholder={metaFinderFaceBlender("FaceBlenderBabyMessage")}
                        value={message}
                        style={[styles.ageInput, { fontFamily: messageFont !== "" ? messageFont + "-Regular" : "Avenir" }]}
                        onChangeText={(text) => this.setState({ message: text })}
                    >
                    </TextInput>
                </View>
            </TouchableOpacity>
        )
    }

    validateInput = () => {
        const { skinTone, gender } = this.state
        if (skinTone === "" || gender === "") {
            return false
        } else {
            return true
        }
    }

    onMeetPress = () => {
        this.props.registerEvent(eventNames.customizeYourBabyMeetYourBabyClick);
        const { message, messageFont, gender, skinTone } = this.state
        this.props.getBabyDetails({ message, messageFont, gender, skinTone })
    }

    render() {
        const { visible } = this.state

        return (
            <>
                <SafeAreaView style={styles.safeViewTop} />
                <SafeAreaView style={styles.safeViewBottom}>
                    <Header
                        onBackPress={() => this.handleBackButton()}
                        headerMainTitle={metaFinderFaceBlender("FaceBlenderBabyFaceMaker")}
                    />

                    <KeyboardAwareScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        enableOnAndroid={true}
                        extraHeight={125}
                        keyboardOpeningTime={10}
                        showsVerticalScrollIndicator={false}>

                        <View style={styles.mainView}>
                            <Text style={styles.title}>{metaFinderFaceBlender("FaceBlenderCustomizeBaby")}</Text>

                            <Text style={styles.subTitle}>{metaFinderFaceBlender("FaceBlenderSkinTone")}</Text>
                            <FlatList
                                style={{ marginBottom: 20 }}
                                columnWrapperStyle={{ justifyContent: "space-evenly", marginTop: 20 }}
                                numColumns={3}
                                showsVerticalScrollIndicator={false}
                                data={babyColor}
                                renderItem={({ item, index }) => this.renderSkin(item, index)}
                                keyExtractor={item => item.tone}
                                extraData={this.state}
                            />

                            <Text style={styles.subTitle}>{metaFinderFaceBlender("FaceBlenderGender")}</Text>
                            {this.renderGender()}

                            <Text style={styles.subTitle}>{metaFinderFaceBlender("FaceBlenderPersonalizedMessage")}</Text>
                            <Text style={styles.msgFont}>{metaFinderFaceBlender("FaceBlenderMessageFont")}</Text>

                            {this.showArrowView()}

                            {visible ? this.renderFontModal() : null}

                            <Text style={styles.msgTxt}>{metaFinderFaceBlender("FaceBlenderMessage")}</Text>
                            {this.renderBabyText()}

                            <View style={styles.btnView}>
                                <TouchableOpacity style={this.validateInput() ? styles.btnBgActive : styles.btnBgInactive}
                                    disabled={this.validateInput() ? false : true} onPress={() => this.onMeetPress()}>
                                    <Text style={styles.btntexts}>{metaFinderFaceBlender("FaceBlenderMeetYourBaby")}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </KeyboardAwareScrollView>

                </SafeAreaView >
            </>
        );
    }
}


const mapStateToProps = state => {
    return {

    };
};
export default connect(mapStateToProps,
    {
        registerEvent,
        getBabyDetails
    }
)(BabyScreen);

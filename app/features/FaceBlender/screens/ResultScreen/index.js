import React, { Component } from "react";
import { SafeAreaView, View, Image, ScrollView, TouchableOpacity, Text, BackHandler } from 'react-native';
import { connect } from "react-redux";
import { ResultScreenStyles as styles } from './styles';
import { metaFinderFaceBlender } from "../../meta";
import Header from '../../components/Header';
import { faceBlendImages } from "../../images";
import { clearAllDetails } from "../../actions";
import { CoreUtils } from "@pru-rt-internal/pulse-common";
const { isNilOrEmpty } = CoreUtils;
import Share from 'react-native-share';
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";

class ResultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount = () => {
        this.props.registerEvent(eventNames.makeNewBabyOnLoad);
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {

    }

    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    }

    handleBackButton = () => {
        this.props.clearAllDetails();
        this.props.navigation.navigate("PulseHealth")
        this.props.registerEvent(eventNames.makeNewBabyCrossButtonClick);
        return true;
    }

    onNewPress = () => {
        this.props.clearAllDetails();
        this.props.navigation.navigate("DadScreen");
        this.props.registerEvent(eventNames.makeNewBabyButtonClick);
    }

    onSharePress = async () => {
        const { babyDetails } = this.props
        const babyImgUrl = `data:image/png;base64,${babyDetails.dpImage}`

        const shareObj = {
            title: metaFinderFaceBlender("FaceBlenderShareResult"),
            message: "",
            url: babyImgUrl,
            filename: 'Baby' // only for base64 file in Android
        };

        try {
            const response = await Share.open(shareObj)
            console.log("Share Response => ", response)
        } catch (error) {
            console.log("Share Error => ", error)
        }
    }

    render() {

        const { babyDetails, dadImage, mumImage } = this.props

        const dadPic = !isNilOrEmpty(dadImage) ? { uri: `data:image/jpeg;base64,${dadImage}` } : { uri: faceBlendImages.dummyDad }
        const mumPic = !isNilOrEmpty(mumImage) ? { uri: `data:image/jpeg;base64,${mumImage}` } : { uri: faceBlendImages.dummyMom }

        return (
            <>
                <SafeAreaView style={styles.safeViewTop} />
                <SafeAreaView style={styles.safeViewBottom}>
                    <Header
                        // onCrossPress={() => this.handleBackButton()}
                        headerMainTitle={metaFinderFaceBlender("FaceBlenderMeetYourBaby")}
                    />

                    <View style={styles.mainView}>

                        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

                            <View style={styles.babyImgView}>
                                <Image
                                    resizeMode="contain"
                                    source={{ uri: `data:image/jpeg;base64,${babyDetails.dpImage}` }}
                                    style={styles.babyImg}
                                />
                            </View>

                            <View style={styles.dadMumImgView}>
                                <View style={styles.dadMumImgSubView}>
                                    <Image
                                        source={dadPic}
                                        style={styles.dadMumImg}
                                    />
                                    <Text style={styles.dadMumText}>{metaFinderFaceBlender("FaceBlenderDad")}</Text>
                                </View>
                                <View style={styles.dadMumImgSubView}>
                                    <Image
                                        source={mumPic}
                                        style={styles.dadMumImg}
                                    />
                                    <Text style={styles.dadMumText}>{metaFinderFaceBlender("FaceBlenderMum")}</Text>
                                </View>
                            </View>

                            <View style={styles.btnView}>
                                <TouchableOpacity style={styles.btnBg}
                                    onPress={() => this.onNewPress()}
                                >
                                    <Text style={styles.btnText}>{metaFinderFaceBlender("FaceBlenderMakeNewBaby")}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.btnBg}
                                    onPress={() => {
                                        this.onSharePress()
                                        this.props.registerEvent(eventNames.makeNewBabyShareClick);
                                    }}
                                >
                                    <Text style={styles.btnText}>{metaFinderFaceBlender("FaceBlenderShare")}</Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>

                    </View>

                </SafeAreaView >
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        babyDetails: state.faceBlender.babyDetails,
        dadImage: state.faceBlender.dadImage,
        mumImage: state.faceBlender.mumImage,
    };
};
export default connect(mapStateToProps,
    {
        registerEvent,
        clearAllDetails
    }
)(ResultScreen);
import React, { Component } from "react";
import { SafeAreaView, View, Image, Dimensions, ScrollView, TouchableOpacity, Text, Platform, Alert, BackHandler } from 'react-native';
import { connect } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import { DadScreenStyles as styles } from './styles';
import { faceBlendImages } from "../../images";
import OpenSettings from "react-native-open-settings";
import Header from '../../components/Header';
import ActionSheet from "../../components/ActionSheet";
import { saveDadPhoto, clearAllDetails } from "../../actions";
import { metaFinderFaceBlender } from "../../meta";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";
import { isEmpty } from "ramda";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const screenWidth = Dimensions.get('window').width;

class DadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dadPhoto: '',
            imageFileName: "",
            imageFormat: "",
            showImagePicker: false

        };

    }

    componentDidMount = () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
        this.props.registerEvent(eventNames.dadPageOnLoad)
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {

    }

    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    }

    handleBackButton = () => {
        this.props.clearAllDetails()
        this.props.navigation.goBack()
        this.props.registerEvent(eventNames.dadPageBackArrowClick);
        return true;
    }

    scaleSizeW = (number) => {
        const designWidth = 375.0;
        const scale = screenWidth / designWidth;
        return number * scale;
    }

    showCamera = () => {
        this.props.registerEvent(eventNames.dadPageTakePhotoClick);
        ImagePicker.openCamera({
            width: this.scaleSizeW(268),
            height: this.scaleSizeW(358),
            compressImageMaxWidth: this.scaleSizeW(268),
            compressImageMaxHeight: this.scaleSizeW(358),
            useFrontCamera: true,
            includeBase64: true,
            compressImageQuality: 1,
            mediaType: "photo",
        })
            .then(this.imageCallbackHandler.bind(this))
            .catch(error => {
                if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
                    Alert.alert(
                        "",
                        metaFinderFaceBlender("FaceBlenderCameraPremission"),
                        [
                            { text: metaFinderFaceBlender("FaceBlenderCameraOk"), onPress: () => OpenSettings.openSettings() },
                            { text: metaFinderFaceBlender("FaceBlenderCancel"), style: "cancel" },
                        ],
                        { cancelable: false }
                    );

                }
            });
    }

    showGallery = () => {
        this.props.registerEvent(eventNames.dadPagePhotoLibraryClick);
        ImagePicker.openPicker({
            width: this.scaleSizeW(268),
            height: this.scaleSizeW(358),
            compressImageMaxWidth: this.scaleSizeW(268),
            compressImageMaxHeight: this.scaleSizeW(358),
            includeBase64: true,
            compressImageQuality: 1,
            mediaType: "photo",
        })
            .then(this.imageCallbackHandler.bind(this))
            .catch(error => {
                if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
                    Alert.alert(
                        "",
                        metaFinderFaceBlender("FaceBlenderGalleryPremission"),
                        [
                            { text: metaFinderFaceBlender("FaceBlenderCameraOk"), onPress: () => OpenSettings.openSettings() },
                            { text: metaFinderFaceBlender("FaceBlenderCancel"), style: "cancel" },
                        ],
                        { cancelable: false }
                    );

                }
            });
    }

    imageCallbackHandler = (image) => {
        this.props.saveDadPhoto({ dadPhoto: image.data })
        const imageExt = image.path.split(".").pop()
        this.setState(
            {
                dadPhoto: image.data,
                imageFileName: imageExt || "",
                imageFormat: image.mime || null,
                showImagePicker: false,
            },
        );
    }

    onNextPress = () => {
        this.props.navigation.navigate("MumScreen");
        this.props.registerEvent(eventNames.dadPageNextClick);
    }

    render() {
        const { showImagePicker } = this.state
        const { dadImage } = this.props

        return (
            <>
                <SafeAreaView style={styles.safeViewTop} />
                <SafeAreaView style={styles.safeViewBottom}>
                    <Header
                        // onBackPress={() => this.handleBackButton()}
                        headerMainTitle={metaFinderFaceBlender("FaceBlenderBabyMaker")}
                    />
                    <ScrollView>
                        <View style={styles.main}>
                            <View style={{ alignItems: 'center', paddingBottom: 20, paddingTop: 10 }}>
                                <View style={styles.faceimg}>
                                    <TouchableOpacity
                                        onPress={e => {
                                            e.preventDefault();
                                            this.setState({ showImagePicker: true });
                                            this.props.registerEvent(eventNames.dadPageCameraIconClick);
                                        }}
                                    >
                                        {
                                            !isEmpty(dadImage) ?
                                                <Image
                                                    source={{ uri: `data:image/jpeg;base64,${dadImage}` }}
                                                    style={{ width: this.scaleSizeW(268), height: this.scaleSizeW(358) }}
                                                />
                                                :
                                                <Image
                                                    source={{ uri: faceBlendImages.dummyDad }}
                                                    style={{ width: this.scaleSizeW(268), height: this.scaleSizeW(358) }}
                                                />
                                        }

                                        <Image
                                            source={{ uri: faceBlendImages.camera }}
                                            style={styles.camera}
                                        />
                                        <Text style={styles.dadText}>{metaFinderFaceBlender("FaceBlenderDad")}</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.greatBabyText}>{metaFinderFaceBlender("FaceBlenderGreatBaby")}</Text>
                                <Text style={styles.chooseSelfiesText}>{metaFinderFaceBlender("FaceBlenderChooseSelfies")}</Text>
                                {
                                    !isEmpty(dadImage) ?
                                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.onNextPress()}>
                                            <View style={styles.btn}>
                                                <Text style={styles.btntexts}>{metaFinderFaceBlender("FaceBlenderNext")}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        <View style={[styles.btn, { backgroundColor: Colors.veryLightGrey }]}>
                                            <Text style={styles.btntexts}>{metaFinderFaceBlender("FaceBlenderNext")}</Text>
                                        </View>
                                }
                            </View>
                        </View>
                    </ScrollView>
                    {showImagePicker && <ActionSheet
                        visible={showImagePicker}
                        options={[metaFinderFaceBlender("FaceBlenderTakePhoto"), metaFinderFaceBlender("FaceBlenderTPhotoLibrary")]}
                        onFirstOptionPress={() => this.showCamera()}
                        onSecondOptionPress={() => this.showGallery()}
                        cancelLabel={metaFinderFaceBlender("FaceBlenderCancel")}
                        onCancelPress={() => {
                            this.props.registerEvent(eventNames.dadPageCancelClick);
                            this.setState({ showImagePicker: false })
                        }}
                    />}
                </SafeAreaView >
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        dadImage: state.faceBlender.dadImage,
    };
};
export default connect(mapStateToProps,
    {
        registerEvent,
        saveDadPhoto,
        clearAllDetails
    }
)(DadScreen);




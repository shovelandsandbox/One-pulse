import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    View,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Text,
    Image,
} from "react-native";
import { CoreConfig } from "@pru-rt-internal/pulse-common";
const { colors, width, iosDevice } = CoreConfig;
import {
    BACK,
    BACKGROUND_PRODUCT,
    Elderly,
    Asthma,
    ActiveRun,
    Pregnant,
    Heart,
    AirQuality,
    HealthTips,
    PregnantIcon,
    ElderlyIcon,
    HeartIcon,
    ActivityRunIcon,
    AsthmaIcon
} from "../../../../config/images";
import { styles } from './styles'
import { Theme } from "../../../../themes";
const { Colors } = Theme;
import metaConstants from "../../meta";

const HealthTipsScreen = ({ navigation, state: { }, dispatch: { } }) => {
    let healthTipConstants = { ...metaConstants.airQualityScreenMeta() }
    const [selectedTab, setSelctedTab] = useState(0);
    const IMAGE_BG = [ActiveRun, Elderly, Asthma, Heart, Pregnant];
    const TAB_TEXT = [
        healthTipConstants.AQHITabText1,
        healthTipConstants.AQHITabText2,
        healthTipConstants.AQHITabText3,
        healthTipConstants.AQHITabText4,
        healthTipConstants.AQHITabText5
    ]
    const [selectedImage, setSelectedImage] = useState(IMAGE_BG[0]);
    const [selectedText, setSelectedText] = useState(TAB_TEXT[0]);
    const [leftIndex, setLeftIndex] = useState(1);

    useEffect(() => {
        setSelectedImage(IMAGE_BG[selectedTab]);
        setSelectedText(TAB_TEXT[selectedTab])
    }, [selectedTab]);


    const leftControlConfig = [
        {
            name: healthTipConstants.airQuality, imageKey: "airQuality", onPress: () => { navigation.navigate("AirComposition") }, imageStyle: {
                width: 30, height: 25
            }
        },
        {
            name: healthTipConstants.healthTips, imageKey: "healthTips", onPress: () => { setLeftIndex(1) }, imageStyle: {
                width: 30, height: 25
            }
        },
    ];

    const tabConfig = [
        {
            name: healthTipConstants.active, imageKey: "ActivityRunIcon", onPress: () => {
                setSelctedTab(0)
            }, style: { padding: 20 }, imageStyle: {
                width: 20, height: 20
            }
        },
        {
            name: healthTipConstants.elderly, imageKey: "ElderlyIcon", onPress: () => {
                setSelctedTab(1)
            }, style: { padding: 20 }, imageStyle: {
                width: 20, height: 20
            }
        },
        {
            name: healthTipConstants.Asthama, imageKey: "AsthmaIcon", onPress: () => {
                setSelctedTab(2)
            }, style: { padding: 20 }, imageStyle: {
                width: 20, height: 20
            }
        },
        {
            name: healthTipConstants.Heart, imageKey: "HeartIcon", onPress: () => {
                setSelctedTab(3)
            }, style: { padding: 20 }, imageStyle: {
                width: 20, height: 20
            }
        },
        {
            name: healthTipConstants.Pregnant, imageKey: "PregnantIcon", onPress: () => {
                setSelctedTab(4)
            }, style: { padding: 20 }, imageStyle: {
                width: 20, height: 20
            }
        },
    ];

    const getImageFromKey = key => {
        switch (key) {
            case "airQuality":
                return AirQuality;
            case "healthTips":
                return HealthTips
            case "PregnantIcon":
                return PregnantIcon
            case "ElderlyIcon":
                return ElderlyIcon
            case "HeartIcon":
                return HeartIcon
            case "ActivityRunIcon":
                return ActivityRunIcon
            case "AsthmaIcon":
                return AsthmaIcon

            default:
                return HealthTips;
        }
    };

    const ImageButton = object => {
        let nameArr = object.name.split(" ")
        let firstKey = nameArr[0]
        let secondKey = nameArr[1]
        return (
            <TouchableOpacity onPress={object.onPress} style={object.style}>
                <View style={[styles.mainViewStyle]}>
                    <Image
                        source={getImageFromKey(object.imageKey)}
                        resizeMode={"contain"}
                        style={[object.imageStyle, { tintColor: `${object.selectedColor}` }]}
                    />
                    <Text style={[styles.imageButtonStyle, { color: `${object.selectedColor}` }]}>
                        {firstKey}{"\n"}{secondKey}
                    </Text>
                </View>


            </TouchableOpacity>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollStyle}>
            <View style={styles.firstView}>
                <View style={styles.secondView}>
                    <View
                        style={styles.thirdView}
                    >
                        <View style={styles.HeaderView}>
                            <TouchableOpacity style={styles.backButton} onPress={() => {
                                navigation.navigate("BrezometerWelcomeScreen");
                            }}>
                                <Image style={styles.backButtonImg} source={BACK} width={25} height={16} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.backGroundProductImgView}>
                            {leftControlConfig.map((eC, index) => {
                                eC.style = leftIndex === index ?
                                    styles.leftIndexStyle
                                    : styles.rightIndexStyle
                                eC.selectedColor = leftIndex === index ? Colors.red : Colors.white
                                return ImageButton(eC);
                            })}
                            <Image source={BACKGROUND_PRODUCT} style={styles.backgroundImgStyle} />
                        </View>

                    </View>
                    <View style={styles.selectedImgView}>
                        <Image source={selectedImage} resizeMode={"cover"} style={styles.selectedImgStyle} />
                        <View style={styles.selectedButtonView}>
                            <View
                                style={styles.ButtonView}
                            >
                                {tabConfig.map((eT, index) => {
                                    eT.selectedColor = index === selectedTab ? Colors.red : Colors.grey
                                    return ImageButton(eT);
                                })}
                            </View>
                            <View style={styles.selectedTextView}>
                                <Text style={styles.selectedTextStyle}>
                                    {selectedText}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const mapStateToProps = state => {
    return {
        state: {},
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch: {},
});

export default connect(mapStateToProps, mapDispatchToProps)(HealthTipsScreen);

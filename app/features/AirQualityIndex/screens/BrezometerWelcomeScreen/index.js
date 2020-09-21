import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { View, Text, Image, TouchableOpacity, Platform, ScrollView, ImageBackground, FlatList } from "react-native";
import CardView from "react-native-cardview";
import {
    AQHI_Back,
    AQHI_Time_Blue,
    AQHI_Background_1,
    AQHI_headache,
    AQHI_Nose,
    AQHI_Chest,
    AQHI_Cough,
    AQHI_Skin,
    AQHI_Background_2,
    AQHI_RedHeadache,
    AQHI_RedGender,
    AQHI_RedChest,
    AQHI_RedHeart,
    AQHI_RedLiver,
    AQHI_Time_Red,
    AQHI_Background_3,
    AQHI_male,
    AQHI_old,
    AQHI_run,
    AQHI_gender,
    AQHI_female
} from "../../../../config/images";
import { goToAirComposition } from '../../actions'
import { styles } from './styles'
import metaConstants from "../../meta";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";


class BrezometerWelcomeScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tableModal: false,
            stationName: "",
            locationPermission: "",
            permissionModal: true,
            query: ""
        };
        this.metaConstants = { ...metaConstants.airQualityScreenMeta() }
    }

    componentDidMount() {
        this.props.dispatchEvent(events.PollutionScreen);

    }
    longTermEffectView() {
        return (
            <View style={styles.mostUsedViewStyle}>
                <ImageBackground
                    style={styles.backgroundImage}
                    imageStyle={styles.backgroundImage}
                    source={AQHI_Background_2}
                >
                    <View style={styles.headingView}>
                        <Image source={AQHI_Time_Red} style={styles.longTermImg} />
                        <View style={styles.headingTextView}>
                            <Text style={styles.headingText}>{this.metaConstants.longTerm}</Text>
                        </View>
                    </View>
                    <View style={styles.headingVerticleBar}></View>
                    <View style={styles.typesView}>
                        <Image source={AQHI_RedHeadache} />
                        <View style={styles.typesTextView}>
                            <Text style={styles.typesText}>{this.metaConstants.redChestEffects}</Text>
                            <Text style={styles.typesText}>{this.metaConstants.redChestEffects2}</Text>
                        </View>
                    </View>
                    <View style={styles.specialBarView}>
                        <View style={styles.typesVerticleSpecialBar}></View>
                        <View style={styles.typesHorizontalSpecialBar}></View>
                    </View>
                    <View style={styles.typesView}>
                        <Image source={AQHI_RedHeart} />
                        <View style={styles.typesTextView}>
                            <Text style={styles.typesText}>{this.metaConstants.redHeart}</Text>
                        </View>
                    </View>
                    <View style={styles.specialBarView}>
                        <View style={styles.typesVerticleBar}></View>
                        <View style={styles.typesHorizontalBar}></View>
                    </View>
                    <View style={styles.typesView}>
                        <Image source={AQHI_RedChest} />
                        <View style={styles.typesTextView}>
                            <Text style={styles.typesText}>{this.metaConstants.redRespiratory}</Text>
                        </View>
                    </View>
                    <View style={styles.specialBarView}>
                        <View style={styles.typesVerticleBar}></View>
                        <View style={styles.typesHorizontalBar}></View>
                    </View>
                    <View style={styles.typesView}>
                        <Image source={AQHI_RedLiver} />
                        <View style={styles.typesTextView}>
                            <Text style={styles.typesText}>{this.metaConstants.redLiver}</Text>
                        </View>
                    </View>
                    <View style={styles.specialBarView}>
                        <View style={styles.typesVerticleBar}></View>
                        <View style={styles.typesHorizontalBar}></View>
                    </View>
                    <View style={styles.typesView}>
                        <Image source={AQHI_RedGender} />
                        <View style={styles.typesTextView}>
                            <Text style={styles.typesText}>{this.metaConstants.redReproductive}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    shortTermEffectView() {
        return (
            <View style={styles.mostUsedViewStyle}>
                <ImageBackground
                    style={styles.backgroundImage}
                    imageStyle={styles.backgroundImage}
                    source={AQHI_Background_1}
                >
                    <View style={styles.headingView}>
                        <Image source={AQHI_Time_Blue} style={styles.shortTermImg} />
                        <View style={styles.headingTextView}>
                            <Text style={styles.headingText}>{this.metaConstants.shortTerm}</Text>
                        </View>
                    </View>
                    <View style={styles.headingVerticleBar}></View>
                    <View style={styles.typesView}>
                        <Image source={AQHI_headache} />
                        <View style={styles.typesTextView}>
                            <Text style={styles.typesText}>{this.metaConstants.headache}</Text>
                        </View>
                    </View>
                    <View style={styles.specialBarView}>
                        <View style={styles.typesVerticleBar}></View>
                        <View style={styles.typesHorizontalBar}></View>
                    </View>
                    <View style={styles.typesView}>
                        <Image source={AQHI_Nose} />
                        <View style={styles.typesTextView}>
                            <Text style={styles.typesText}>{this.metaConstants.nose}</Text>
                        </View>
                    </View>
                    <View style={styles.specialBarView}>
                        <View style={styles.typesVerticleBar}></View>
                        <View style={styles.typesHorizontalBar}></View>
                    </View>
                    <View style={styles.typesView}>
                        <Image source={AQHI_Cough} />
                        <View style={styles.typesTextView}>
                            <Text style={styles.typesText}>{this.metaConstants.blueRespiratory}</Text>
                        </View>
                    </View>
                    <View style={styles.specialBarView}>
                        <View style={styles.typesVerticleBar}></View>
                        <View style={styles.typesHorizontalBar}></View>
                    </View>
                    <View style={styles.typesView}>
                        <Image source={AQHI_Chest} />
                        <View style={styles.typesTextView}>
                            <Text style={styles.typesText}>{this.metaConstants.blueChest}</Text>
                        </View>
                    </View>
                    <View style={styles.specialBarView}>
                        <View style={styles.typesVerticleBar}></View>
                        <View style={styles.typesHorizontalBar}></View>
                    </View>
                    <View style={styles.typesView}>
                        <Image source={AQHI_Skin} />
                        <View style={styles.typesTextView}>
                            <Text style={styles.typesText}>{this.metaConstants.blueSkin}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
    handleBack() {
        this.props.navigation.goBack()
        this.props.dispatchEvent(events.BackFromPollution);
    }
    handleContinue() {
        this.props.goToAirComposition()
        this.props.dispatchEvent(events.continueFromPollutionClick);
    }
    render() {
        return (
            <ScrollView style={styles.scrollStyle}>
                <View style={styles.modalView}>
                    <View style={styles.cardView}>
                        <CardView cardElevation={5} cardMaxElevation={5}>
                            <View style={styles.cardImageView} >
                                <TouchableOpacity
                                    style={styles.imgView}
                                    onPress={() => this.handleBack()}
                                >
                                    <Image
                                        source={AQHI_Back}
                                        style={styles.imgStyle}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.textStyle}  >
                                    {this.metaConstants.PollutionLeaves}
                                </Text>
                            </View>
                        </CardView>
                    </View>
                </View>
                {this.shortTermEffectView()}
                {this.longTermEffectView()}
                <View style={styles.mostUsedViewStyle}>
                    <ImageBackground
                        style={styles.backgroundLastImage}
                        imageStyle={styles.backgroundLastImage}
                        source={AQHI_Background_3}
                    >
                        <View style={styles.listView}>
                            <Text style={styles.listText}>{this.metaConstants.moreEffected}</Text>
                        </View>
                        <FlatList
                            data={[{ imageKey: AQHI_gender, name: this.metaConstants.gender },
                            { imageKey: AQHI_old, name: this.metaConstants.old },
                            { imageKey: AQHI_run, name: this.metaConstants.exercise },
                            { imageKey: AQHI_female, name: this.metaConstants.pregnantWoman }, { imageKey: AQHI_male, name: this.metaConstants.children }]}
                            renderItem={({ item, index }) => (
                                <View style={index === 0 ? styles.itemView0 : index === 1 ? styles.itemView1 : index === 2 ? styles.itemView2 : index === 3 ? styles.itemView3 : styles.itemView4}>
                                    <View style={styles.contentView}>
                                        <Image source={item.imageKey}
                                            style={index == 1 ? styles.itemImage1 : styles.itemImage}
                                            resizeMode={"contain"} />
                                        <Text style={styles.itemText}>{item.name}</Text>
                                    </View>
                                    {index === 0 && (<View style={styles.itemVerticleBar0}></View>)}
                                    {index === 1 && (<View style={styles.itemVerticleBar1}></View>)}
                                    {index === 3 && (<View style={styles.itemVerticleBar3}></View>)}
                                </View>
                            )}
                            keyExtractor={item => item.name}
                            numColumns={3}
                        />
                    </ImageBackground>
                </View>
                <View style={styles.goToAirCompView}>
                    <TouchableOpacity
                        style={styles.goToAirCompStyle}
                        onPress={() => this.handleContinue()}>
                        <Text style={styles.continueText}>{this.metaConstants.continue}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        );
    }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {
    goToAirComposition,
    dispatchEvent,
})(BrezometerWelcomeScreen);
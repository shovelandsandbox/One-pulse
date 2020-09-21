import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { View, Text, Image, TouchableOpacity, ImageBackground, SafeAreaView, Dimensions, ScrollView } from "react-native";
import {
    AQHI_Back,
    AQHI_INTRO_1,
    AQHI_INTRO_2,
    AQHI_INTRO_3
} from "../../../../config/images";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { styles } from './styles'
import metaConstants from "../../meta";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import { goToBrezometerContactInfo } from '../../actions';

let screenName1 = "TakeControlOfBreeth"
let screenName2 = "TakeControlOfAllergy"
let screenName3 = "SaveLivesScreen"

class BrezometerIntroScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
        this.metaConstants = { ...metaConstants.airQualityScreenMeta() }
        this.carouselItems = [{
            image: AQHI_INTRO_1,
            heading: this.metaConstants.heading1,
            context: this.metaConstants.context1
        },
        {
            image: AQHI_INTRO_2,
            heading: this.metaConstants.heading2,
            context: this.metaConstants.context2
        },
        {
            image: AQHI_INTRO_3,
            heading: this.metaConstants.heading3,
            context: this.metaConstants.context3
        }]
    }

    componentDidMount() {
        console.log(":::inside language", this.props.language)
        let event = events.IntroScreens
        if (this.state.activeIndex == 0) {
            event.IntroScreenName = screenName1
        }
        else if (this.state.activeIndex == 1) {
            event.IntroScreenName = screenName2
        } else event.IntroScreenName = screenName3
        this.props.dispatchEvent(event);
    }

    componentDidUpdate() {
        let event = events.IntroScreens
        if (this.state.activeIndex == 0) {
            event.IntroScreenName = screenName1
        }
        else if (this.state.activeIndex == 1) {
            event.IntroScreenName = screenName2
        } else event.IntroScreenName = screenName3
        this.props.dispatchEvent(event);
    }

    goBack() {
        let event = events.BackFromIntro
        if (this.state.activeIndex == 0) {
            event.IntroScreenName = screenName1
        }
        else if (this.state.activeIndex == 1) {
            event.IntroScreenName = screenName2
        } else event.IntroScreenName = screenName3
        this.props.dispatchEvent(event);
        this.props.navigation.goBack()
    }

    onContinueClick() {
        let event = events.ContinueFromIntroScreen
        if (this.state.activeIndex == 0) {
            event.IntroScreenName = screenName1
        }
        else if (this.state.activeIndex == 1) {
            event.IntroScreenName = screenName2
        } else event.IntroScreenName = screenName3
        this.props.dispatchEvent(event);
        this.props.goToBrezometerContactInfo()
    }

    _renderItem({ item, index }) {
        return (
            <>
                <ImageBackground
                    style={styles.backgroundImage}
                    imageStyle={styles.imageStyle}
                    source={item.image}
                >
                    <View style={styles.headerView}>
                        <TouchableOpacity
                            style={styles.imgView}
                            onPress={() => this.goBack()}
                        >
                            <Image
                                source={AQHI_Back}
                                style={styles.imgStyle}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.imgView}
                            onPress={() => this.onContinueClick()}
                        >
                            <Text style={index === 0 ? styles.skipText : styles.skipTextBlack}>{this.metaConstants.skipText}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <ScrollView>
                    <View style={styles.textView}>
                        <Text style={styles.headingText}>{item.heading}</Text>
                        <View style={styles.contextView}>
                            <Text style={styles.contextText}>{item.context}</Text>
                        </View>
                    </View>
                    <Pagination
                        dotsLength={this.carouselItems.length}
                        activeDotIndex={index}
                        dotStyle={styles.PaginationDotStyle}
                        inactiveDotScale={0.6}
                        inactiveDotStyle={styles.PaginationInactiveDotStyle}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6} />
                </ScrollView>
            </>

        )
    }


    render() {
        const window = Dimensions.get("window");
        return (
            <SafeAreaView style={styles.safeView}>
                <Carousel
                    layout={'default'}
                    ref={ref => this.carousel = ref}
                    data={this.carouselItems}
                    sliderWidth={window.width}
                    itemWidth={window.width}
                    renderItem={this._renderItem.bind(this)}
                    onSnapToItem={index => this.setState({ activeIndex: index })} />
                <View style={styles.viewStyle}>
                    <TouchableOpacity
                        style={styles.welcomeStyle}
                        onPress={() => this.onContinueClick()}>
                        <Text style={styles.welcomeText}>{this.metaConstants.continue}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView >
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.userPreferences.language,
});

export default connect(mapStateToProps, {
    goToBrezometerContactInfo,
    dispatchEvent,
})(BrezometerIntroScreen);
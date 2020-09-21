import React, { PureComponent } from 'react';
import { View, Text, Image, Dimensions, SafeAreaView, BackHandler, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SplashScreenStyles as styles } from "./styles";
import { Header } from "../../components/Header";
import GenericButton from "../../components/GenericButton";
import {
    gotoCCABasicInfoScreen,
    gotoPulseHealthScreen,
    gotoCCAIntroductionScreen
} from "../../actions";
import { ccaImages } from "../../images";
import MetaConstants from "../../meta";
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

class CCASplashScreen extends PureComponent {

    constructor(props) {
        super(props);
        this.MetaConstants = { ...MetaConstants.initializeCCAScreenMeta() };
        this.state = {
            activeIndex: 0,
            saveProps: props,
            carouselItems: [
                {
                    image: ccaImages.splashOne,
                    text: this.MetaConstants.SplashFirst
                },
                {
                    image: ccaImages.splashTwo,
                    text: this.MetaConstants.SplashSecond
                },
                {
                    image: ccaImages.splashThree,
                    text: this.MetaConstants.SplashThird
                },

            ]
        }
    }

    componentDidMount = () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleDeviceBackButton);

        this.props.dispatchEvent(events.CCASplashScreen);
    }

    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleDeviceBackButton);
    }

    handleDeviceBackButton = () => {
        this.props.gotoCCAIntroductionScreen()
        return true;
    }

    _renderItem({ item, index }) {
        const SplashButtonStart = this.MetaConstants.SplashButtonStart;
        const Skip = this.MetaConstants.Skip;
        return (
            <>
                {(index !== this.state.carouselItems.length - 1)
                    ? <TouchableOpacity
                        onPress={() => {
                            this.props.gotoCCABasicInfoScreen();
                            this.props.dispatchEvent(events.BackArrowClick)
                        }}
                    >
                        <Text style={styles.skipText}>{Skip}</Text>
                    </TouchableOpacity>
                    : null}
                <Image style={styles.ImageStyle} resizeMode="contain" source={{ uri: item.image }} />
                <Pagination
                    dotsLength={this.state.carouselItems.length}
                    activeDotIndex={index}
                    dotStyle={styles.PaginationDotStyle}
                    inactiveDotScale={0.6}
                    inactiveDotStyle={styles.PaginationInactiveDotStyle}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6} />
                <ScrollView>
                    <Text style={styles.TextStyle}>{item.text}</Text>
                </ScrollView>
                {(index === this.state.carouselItems.length - 1)
                    ?
                    <View style={styles.ButtonContainer}>
                        <GenericButton
                            label={SplashButtonStart}
                            backgroundColor={Colors.alizarin}
                            widthOffset={1.6}
                            position="center"
                            onPress={() => {
                                this.props.gotoCCABasicInfoScreen();
                                this.props.dispatchEvent(events.StartAssessmentButtonSplashClick);
                            }}
                        />
                    </View>
                    : null}
            </>

        )
    }

    render() {
        const Home = this.MetaConstants.Home;
        const Back = this.MetaConstants.Back;
        const Skip = this.MetaConstants.Skip;
        const window = Dimensions.get("window");
        return (
            <SafeAreaView style={styles.safeView}>
                <Header
                    onPressIcon={() => {
                        this.props.gotoCCAIntroductionScreen()
                        this.props.dispatchEvent(events.BackArrowClick)
                    }}
                />

                <View style={styles.MainContainer}>

                    <Carousel
                        layout={'default'}
                        ref={ref => this.carousel = ref}
                        data={this.state.carouselItems}
                        sliderWidth={window.width}
                        itemWidth={window.width}
                        renderItem={this._renderItem.bind(this)}
                        onSnapToItem={index => this.setState({ activeIndex: index })} />

                </View>
            </SafeAreaView>
        );
    }
}

const mapsStateToProps = state => ({
    userProfile: state.profile,
});

export default connect(mapsStateToProps,
    {
        gotoPulseHealthScreen,
        gotoCCAIntroductionScreen,
        gotoCCABasicInfoScreen,
        dispatchEvent,
    }
)(CCASplashScreen);
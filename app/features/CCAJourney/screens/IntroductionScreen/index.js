import React, { PureComponent } from 'react';
import { View, Text, Image, SafeAreaView, BackHandler, ScrollView } from 'react-native';
import { connect } from "react-redux";
import { IntroductionScreenStyles as styles } from "./styles";
import { Header } from "../../components/Header";
import GenericButton from "../../components/GenericButton";
import {
    gotoCCASplashScreen,
    gotoPulseHealthScreen,
} from "../../actions";
import { ccaImages } from "../../images";
import MetaConstants from "../../meta";
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import Icon from 'react-native-vector-icons/EvilIcons';
import { Theme } from "../../../../themes";
const { Colors } = Theme;

class IntroductionScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.MetaConstants = { ...MetaConstants.initializeCCAScreenMeta() };
        this.state = {

        }
    }

    componentDidMount = () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleDeviceBackButton);
    }

    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleDeviceBackButton);
    }

    handleDeviceBackButton = () => {
        this.props.gotoPulseHealthScreen()
        return true;
    }

    render() {
        const IntroTxt = this.MetaConstants.IntroductionInfoTxt;
        const Continue = this.MetaConstants.Continue;
        const Hello = this.MetaConstants.Hello;
        const Home = this.MetaConstants.Home;
        const IntroSecond = this.MetaConstants.IntroSecond;
        const PcaLifeTaiwan = this.MetaConstants.PcaLifeTaiwan;
        const name = this.props.firstName && this.props.firstName != '' ? this.props.firstName : "";
        return (
            <SafeAreaView style={styles.safeView}>
                <Header
                    onPressIcon={() => {
                        this.props.gotoPulseHealthScreen()
                        this.props.dispatchEvent(events.BackArrowClick)
                    }}
                />
                <View style={styles.MainContainer}>
                    <View style={styles.upperView}>
                        <Text style={styles.GreatingText}>{Hello}</Text>
                        <Text style={styles.GreatingNameText}>{name}</Text>
                        <Image style={styles.ImageStyle} resizeMode="contain" source={{ uri: ccaImages.introGirl }} />
                    </View>

                    <View style={styles.CardViewStyle}>
                        <View style={styles.scrollView}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={styles.IntroText}>{IntroTxt}</Text>
                            </ScrollView>
                        </View>

                        <View style={styles.middleView}>
                            <View style={styles.pcaTmuView}>
                                <Text style={styles.pcaTmuText}>{PcaLifeTaiwan}</Text>
                                <Icon name="close" size={30} color={Colors.alizarin} />
                                <Text style={styles.pcaTmuText}>{IntroSecond}</Text>
                            </View>
                        </View>

                        <View style={styles.btnView} >
                            <GenericButton
                                label={Continue}
                                backgroundColor={Colors.alizarin}
                                widthOffset={1.6}
                                position="center"
                                onPress={() => {
                                    this.props.gotoCCASplashScreen();
                                    this.props.dispatchEvent(events.ContinueButtonSplashClick)
                                }}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView >
        );
    }
}

const mapsStateToProps = state => ({
    firstName: state.profile.firstName,
});

export default connect(mapsStateToProps,
    {
        gotoPulseHealthScreen,
        gotoCCASplashScreen,
        dispatchEvent
    }
)(IntroductionScreen);
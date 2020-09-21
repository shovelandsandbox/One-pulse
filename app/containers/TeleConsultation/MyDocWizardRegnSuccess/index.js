import React, { PureComponent } from "react";
import { SafeAreaView, ScrollView, View, Image, Text } from "react-native";
import { PruBackHeader } from "../../../components";
import { connect } from "react-redux";
import styles from "./styles";
import MetaConstants from "./meta";
import AntIcons from "react-native-vector-icons/AntDesign";
import { Theme } from "../../../themes";
import {
    CoreComponents,
    CoreConfig,
    events
} from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;

const { Styles, Colors } = Theme;
const { AppButton } = CoreComponents;

import { gotoMydocReferFriend, dispatchEvent } from "../../../actions";
import { GREEN_TICK } from "../../../config/images";

class MyDocWizardRegnSuccess extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
        this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }

    componentDidMount() {
        this.props.dispatchEvent(events.WizardMyDocCongrats);
    }

    render() {
        return (
            <SafeAreaView style={styles.screenContainer}>
                {this.renderBackHeader()}
                <ScrollView style={styles.scrollContainer}>
                    {this.renderCongrats()}
                    {this.renderPulseFeatures()}
                    {this.renderContinue()}
                </ScrollView>
            </SafeAreaView>
        )
    }
    renderBackHeader = () => {
        const {
            mydocWizTitle,
        } = this.metaConstants;
        return (
            <View style={styles.backContainer}>
                <PruBackHeader title={mydocWizTitle}></PruBackHeader>
            </View>
        );
    }
    renderCongrats = () => {
        const { mydocWizUniqueDesc, mydocWizCongrats } = this.metaConstants;
        return (
            <View style={styles.congratsContainer}>
                <Image
                    source={GREEN_TICK}
                    style={styles.congratsTick}
                />
                <Text style={{ fontWeight: "bold", padding: 10, fontSize: 22 }}>
                    {mydocWizCongrats}
                </Text>
                <View>
                    <Text style={{ lineHeight: 20, fontSize: 15 }}>
                        {mydocWizUniqueDesc}
                    </Text>
                </View>
            </View>
        );
    }
    renderPulseFeatures = () => {
        const { mydocWizComingMore, mydocWizPulseFeaturesDesc, mydocWizPulseFeatures } = this.metaConstants;
        return (
            <View style={styles.pulseFeatureContainer}>
                <View style={{ marginVertical: 15 }}>
                    <Text style={{ fontSize: 15 }}>{mydocWizPulseFeaturesDesc}</Text>
                </View>
                {mydocWizPulseFeatures.map(featureItem => {
                    return (
                        <View style={{ flexDirection: "row", marginHorizontal: 20, marginVertical: 5 }}>
                            <Image
                                source={GREEN_TICK}
                                style={styles.featureTick}
                            />
                            <Text style={{ fontSize: 16, paddingLeft: 10 }}>{featureItem}</Text>
                        </View>
                    )
                })}
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Text style={{ fontSize: 15 }}>{mydocWizComingMore}</Text>
                </View>
            </View>
        );
    }
    renderContinue = () => {
        const { mydocWizContinue } = this.metaConstants;
        return (
            <View style={styles.buttonContainer}>
                <AppButton
                    title={mydocWizContinue}
                    press={() => {
                        this.props.gotoMydocReferFriend();
                    }}
                    type={[Styles.btn, Styles.primary]}
                    textStyle={{ }}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        dispatchEvent
    }
}

const mapDispatchToProps = {
    gotoMydocReferFriend
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDocWizardRegnSuccess);

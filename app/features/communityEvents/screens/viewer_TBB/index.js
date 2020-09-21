import React, { PureComponent } from "react";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Text } from "react-native";
import featureComponents from "../../components";
import { connect } from "react-redux";
import styles from "../../styles";
import MetaConstants from "../../meta";

const { headers } = featureComponents;

class Viewer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
        this.metaConstants = { ...MetaConstants.initializeViewerMeta() };
    }
    render() {
        const {
            title,
        } = this.metaConstants;
        return (
            <SafeAreaView style={styles.screenContainer}>
                
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);

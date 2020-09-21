import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";
import styles from './styles';
import { CoreActionTypes, CoreConfig, CoreUtils,metaHelpers } from "@pru-rt-internal/pulse-common";

const {
    CUSTOMISE,
    CUSTOMISE_CONNECT,
    CUSTOMISE_DISCONNECT
} = CoreConfig

export default class TrankerItem extends Component {
    render() {
        let { isConnect, ChangeStatus, RankerItemMsg, Support } = this.props;
        return (
            <View style={styles.connect}>
                <Text style={styles.left}>{RankerItemMsg}</Text>
                <TouchableOpacity
                    style={[isConnect && Support ? styles.rightcheked : styles.rightunchecked]}
                    onPress={() => {
                        ChangeStatus && ChangeStatus(RankerItemMsg, isConnect, Support);

                    }}
                >
                    <Text style={{ color: "#FFFFFF" }}>
                        {
                            isConnect ? 
                            `${metaHelpers.findElement(CUSTOMISE,CUSTOMISE_CONNECT).label}`
                            :
                            `${metaHelpers.findElement(CUSTOMISE,CUSTOMISE_DISCONNECT).label}`
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

TrankerItem.PropTypes = {
    isConnect: PropTypes.bool,
    ChangeStatus: PropTypes.func,
    RankerItemMsg: PropTypes.string
}

TrankerItem.defaultProps = {
    isConnect: false
}



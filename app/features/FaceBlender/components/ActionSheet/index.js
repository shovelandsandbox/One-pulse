import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import PropTypes from "prop-types";
import { ActionSheetStyles as styles } from "./styles";

class ActionSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { visible, options, onFirstOptionPress, onSecondOptionPress,
            onThirdOptionPress, onCancelPress, cancelLabel } = this.props
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onCancelPress}
            >

                <TouchableOpacity
                    onPress={onCancelPress}
                    activeOpacity={1}
                    style={styles.modalBackground}>

                    <View style={styles.modalView}>

                        {options.map((item, index) => {
                            return (
                                <>
                                    <TouchableOpacity
                                        style={styles.modalButtonBg}
                                        onPress={
                                            index === 0 ? onFirstOptionPress :
                                                index === 1 ? onSecondOptionPress :
                                                    onThirdOptionPress
                                        }
                                    >
                                        <Text style={styles.modalOptionsTextStyle}>{item}</Text>
                                    </TouchableOpacity>
                                    {index !== (options.length - 1) && <View style={styles.modalOptionDivider} />}
                                </>
                            )
                        })}

                    </View>

                    <View style={styles.cancelModalView}>
                        <TouchableOpacity style={styles.modalButtonBg} onPress={onCancelPress}>
                            <Text style={styles.modalCancelTextStyle}>{cancelLabel}</Text>
                        </TouchableOpacity>
                    </View>

                </TouchableOpacity>

            </Modal>
        )
    }
}

ActionSheet.PropTypes = {
    visible: PropTypes.bool,
    options: PropTypes.array,
    onFirstOptionPress: PropTypes.func,
    onSecondOptionPress: PropTypes.func,
    onThirdOptionPress: PropTypes.func,
    onCancelPress: PropTypes.func,
    cancelLabel: PropTypes.string,
};

export default ActionSheet;


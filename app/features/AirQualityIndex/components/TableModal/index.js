import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, Modal} from 'react-native';
import { styles } from './styles'


class TableModal extends Component{
    render() {
        return (
            <Modal
                visible={this.props.displayModal}
                transparent={true}
                >
                <View style={styles.containerStyle}></View>
                <View style={styles.viewStyle}>
                    <View style={styles.textView}>
                        {this.props.children}
                    </View>
                    
                </View>
                <View style={styles.closeContainer}>
                    <TouchableOpacity onPress={() => this.props.closeModal()}>
                        <Image style={styles.image} source={this.props.closeImage} />
                    </TouchableOpacity>
                    
                </View>

            </Modal>
        );
    }
}


export default TableModal;
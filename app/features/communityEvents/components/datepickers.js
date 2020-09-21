import React, { PureComponent } from "react";
import { View, Image, TouchableOpacity, Dimensions, Text } from "react-native";
import Modal from "react-native-modal";
import DatePicker from "react-native-date-picker";
import moment from "moment";

const dateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm:ss";

const renderDateModal = (showDatePicker, closeDateModalCb) => {
    let selectedDate = new Date();
    let minDate = new Date();
    return (
        <Modal
            visible={showDatePicker}
            transparent={true}
            style={styles.modal}
            onBackButtonPress={() => {
                selectedDate = moment(selectedDate).format(dateFormat);
                closeDateModalCb(selectedDate)
            }}
            onBackdropPress={() => {
                selectedDate = moment(selectedDate).format(dateFormat);
                closeDateModalCb(selectedDate)
            }}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.doneContainer}>
                        <TouchableOpacity
                            style={styles.doneButton}
                            onPress={() => {
                                selectedDate = moment(selectedDate).format(dateFormat);
                                closeDateModalCb(selectedDate)
                            }}>
                            <Text style={styles.doneText}>
                                Done
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <DatePicker
                        style={styles.datePicker}
                        mode="date"
                        minimumDate={minDate}
                        date={selectedDate}
                        onDateChange={(date) => {
                            selectedDate = date;
                        }}/>
                </View>
            </View>
        </Modal>
    )
};

const renderTimeModal = (showTimePicker, closeTimeModalCb) => {
    let selectedDate = new Date();
    return (
        <Modal
            visible={showTimePicker}
            transparent={true}
            style={styles.modal}
            onBackButtonPress={() => {
                const timeSelected = moment(selectedDate).format(timeFormat);
                closeTimeModalCb(timeSelected)  
            }}
            onBackdropPress={() => {
                const timeSelected = moment(selectedDate).format(timeFormat);
                closeTimeModalCb(timeSelected)
            }}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.doneContainer}>
                        <TouchableOpacity
                            style={styles.doneButton}
                            onPress={() => {
                                const timeSelected = moment(selectedDate).format(timeFormat);
                                closeTimeModalCb(timeSelected)
                            }}>
                            <Text style={styles.doneText}>
                                Done
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <DatePicker
                        style={styles.datePicker}
                        mode="time"
                        onDateChange={(date) => {
                            selectedDate = date;
                        }}/>
                </View>
            </View>
        </Modal>
    )
};

export default {
    renderDateModal,
    renderTimeModal
}

const styles = {
    modal: {
        height: "100%",
        margin: 0,
        padding: 0
    },
    modalContainer: {
        flex: 1,
        position: "relative",
    },
    modalContent: {
        height: 260,
        width: "100%",
        opacity: 1,
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: "#fff"
    },
    doneContainer: {
        height: 44,
        backgroundColor: "#FAFAF8",
        alignItems: "flex-end",
        width: "100%",
        justifyContent: "center",
        paddingRight: 10,
    },
    doneButton: {
        height: 44,
        justifyContent: "center"
    },
    doneText: {
        fontSize: 15,
        color: "#007AFF"
    },
    datePicker: {
        flex: 1,
        margin: 10,
        alignSelf: "center",
    }
}
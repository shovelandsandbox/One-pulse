import React, { Component, useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  TextInput,
  CheckBox,
} from "react-native";
import styles from "./styles";
import { DatePickerDialog } from "react-native-datepicker-dialog";

const SetReminderModal = props => {
  const showModal = props.showModal || false;
  const toggleModal = props.toggle || (() => {});
  console.log(showModal);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [toggleCheckBox3, setToggleCheckBox3] = useState(false);

  const [toggleMonth1, setToggleMonth1] = useState(false);
  const [toggleMonth2, setToggleMonth2] = useState(false);
  const [toggleMonth3, setToggleMonth3] = useState(false);
  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.centeredView}>
        <View style={styles.reminderModalView}>
          <Text style={styles.modalText}>Set Multiple Reminders</Text>
          <View style={styles.rowView}>
            <MonthButton
              text="5"
              checkedState={toggleMonth1}
              toggle={setToggleMonth1}
            />
            <MonthButton
              text="6"
              checkedState={toggleMonth2}
              toggle={setToggleMonth2}
            />
            <MonthButton
              text="9"
              checkedState={toggleMonth3}
              toggle={setToggleMonth3}
            />
          </View>
          <View style={{ width: "100%" }}>
            <OneVaccine
              checkedState={toggleCheckBox1}
              toggle={setToggleCheckBox1}
              shortname="Hib"
            />
            <OneVaccine
              checkedState={toggleCheckBox2}
              toggle={setToggleCheckBox2}
              name="Diphtheria and tetanus"
              shortname="DTaP"
            />
            <OneVaccine
              checkedState={toggleCheckBox3}
              toggle={setToggleCheckBox3}
              name="Polio (IPV)"
            />
          </View>
          <View style={styles.bottomRow}>
            <TouchableHighlight
              style={styles.cancelLink}
              onPress={() => {
                toggleModal(!showModal);
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                date = new Date();
                this.dateDialog.open({
                  date: date,
                });
              }}
              style={{ ...styles.openButton, backgroundColor: "#ec1c2e" }}
            >
              <Text style={styles.textStyle}>Save</Text>
            </TouchableHighlight>
          </View>
        </View>
        <DatePickerDialog
          okLabel={"ok"}
          ref={ref => {
            this.dateDialog = ref;
          }}
          onDatePicked={() => {
            toggleModal(!showModal);
          }}
        />
      </View>
    </Modal>
  );
};
const OneVaccine = props => (
  <View style={styles.oneVaccineView}>
    <View style={styles.rowView}>
      <Text style={styles.vaccineText}>
        {props.name || ""}
        <Text style={{ fontWeight: "bold", color: "#2b2b2b" }}>
          {" " + (props.shortname || "")}
        </Text>
      </Text>
      <CheckBox
        disabled={false}
        value={props.checkedState}
        onValueChange={() =>
          props.checkedState ? props.toggle(false) : props.toggle(true)
        }
      />
    </View>
    <View
      style={{
        marginTop: 4,
        backgroundColor: "#707070",
        width: "100%",
        height: 1,
      }}
    ></View>
  </View>
);
const MonthButton = props => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={[
      styles.monthsButton,
      { borderColor: props.checkedState ? "#e21a2c" : "#707070" },
    ]}
    onPress={() => {
      props.toggle ? props.toggle(!props.checkedState) : "";
    }}
  >
    <Text
      style={[
        styles.textStyle,
        { color: props.checkedState ? "#e21a2c" : "#212529" },
      ]}
    >
      {props.text}
      <Text style={{ fontWeight: "normal" }}>{" Months"}</Text>
    </Text>
  </TouchableOpacity>
);

export default SetReminderModal;

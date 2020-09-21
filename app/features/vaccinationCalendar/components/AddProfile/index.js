import React from "react";
import {
  Modal,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import PropTypes from "prop-types";
import ModalDropdown from "react-native-modal-dropdown";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import { VC_DOWN_ARROW_BLACK } from "../../../../config/images";
import { PruRoundedButton } from "../../../../components";
import { metaFinderVaccinationCalendar } from "../../configs/meta-utils";
import {
  ELEMENT_KEY_ADD_INFORMATION,
  ELEMENT_KEY_RELATION,
  ELEMENT_KEY_NAME,
  ELEMENT_KEY_CANCEL,
  ELEMENT_KEY_SAVE,
  ELEMENT_KEY_DOB,
  ELEMENT_KEY_DATE_OF_BIRTH,
  ELEMENT_KEY_CHILD,
  ELEMENT_KEY_SELECT_RELATION,
} from "../../configs/metaConstant";

const AddProfile = ({
  showModal,
  onSave,
  onCancel,
  onDatePickerSelected,
  selectedDate,
  relationType,
  onRelationTypeChange,
  userName,
  onUserNameChange,
}) => {
  let dropDownRef = null;
  const dateOfBirth = selectedDate;
  const addInfoLabel = metaFinderVaccinationCalendar(
    ELEMENT_KEY_ADD_INFORMATION
  );
  const relationLabel = metaFinderVaccinationCalendar(ELEMENT_KEY_RELATION);
  const nameLabel = metaFinderVaccinationCalendar(ELEMENT_KEY_NAME);
  const cancelLabel = metaFinderVaccinationCalendar(ELEMENT_KEY_CANCEL);
  const saveLabel = metaFinderVaccinationCalendar(ELEMENT_KEY_SAVE);
  const dobLabel = metaFinderVaccinationCalendar(ELEMENT_KEY_DOB);
  const dateOfBirthLabel = metaFinderVaccinationCalendar(
    ELEMENT_KEY_DATE_OF_BIRTH
  );
  const childLabel = metaFinderVaccinationCalendar(ELEMENT_KEY_CHILD);
  const relations = [
    { key: "child", value: childLabel },
    // { key: "spouse", value: "Spouse" },
  ];
  const dropDownOptions = relations.map(x => x.value);
  var defaultValue = metaFinderVaccinationCalendar(
    ELEMENT_KEY_SELECT_RELATION
  );
  if (relationType) {
    relations.map((item, i) => {
      if (item.key == relationType) {
        defaultValue = item.value
      }
    });
  }
  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{addInfoLabel}</Text>
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}>{relationLabel}</Text>
            <TouchableOpacity
              onPress={() => {
                if (dropDownRef) dropDownRef.show();
              }}
              style={styles.dropDownView}
            >
              <ModalDropdown
                ref={ref => {
                  dropDownRef = ref;
                }}
                textStyle={styles.dropDownText}
                defaultValue={defaultValue}
                dropdownStyle={styles.dropDownStyle}
                options={dropDownOptions}
                onSelect={index => {
                  onRelationTypeChange(relations[index].key);
                }}
                showsVerticalScrollIndicator={false}
              />
              <Image
                style={styles.dropDownImage}
                source={VC_DOWN_ARROW_BLACK}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}>{nameLabel}</Text>
            <TextInput
              style={styles.inputBox}
              placeholder={nameLabel}
              maxLength={50}
              onChangeText={text => {
                onUserNameChange(text);
              }}
              value={userName}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}>{dobLabel}</Text>
            <TouchableOpacity
              style={[styles.dropDownView, styles.dobView]}
              onPress={() => onDatePickerSelected()}
            >
              <Icon raised name="calendar" color={"#000"} size={18} />
              <TextInput
                style={[styles.dropDownText, styles.dobText]}
                placeholder={dateOfBirthLabel}
                editable={false}
                value={dateOfBirth}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomRow}>
            <TouchableOpacity
              style={styles.cancelLink}
              onPress={() => {
                onCancel();
              }}
            >
              <Text style={styles.cancelText}>{cancelLabel}</Text>
            </TouchableOpacity>
            <PruRoundedButton
              buttonTitle={saveLabel}
              onPress={() => {
                onSave({ relationType, userName, dateOfBirth });
              }}
              style={styles.saveRoundedButton}
              textStyling={styles.saveText}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

AddProfile.propTypes = {
  showModal: PropTypes.bool,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onDatePickerSelected: PropTypes.func,
  selectedDate: PropTypes.string,
  relationType: PropTypes.string,
  onRelationTypeChange: PropTypes.func,
  userName: PropTypes.string,
  onUserNameChange: PropTypes.func,
};

export default AddProfile;

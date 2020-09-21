//@flow
import React, { PureComponent } from "react";
import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import Styles from "./styles";
import lang from "../../mypolicy/screens/MyPolicy/lang";
import {
  minLengthValidator,
  maxLengthValidator,
  defaultRegExpValidator
} from "../../utils/validators/index";
import { isEmpty, pathOr } from "ramda";
import AddressSelector from "../../features/pru-wizard/components/AddressSelector";
import {getAddressObject} from "../../features/pru-wizard/components/AddressSelector/LocationService";

class UpdateInfoRow extends PureComponent {
  shakeAnimationValue = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      isEditable: false,
      line1: this.props.line1,
      line2: this.props.line2,
      city: this.props.city,
      zip: this.props.zip,
      errorMessageLine1: "",
      errorMessageLine2: "",
      errorMessageCity: "",
      errorMessageZip: "",
    };
  }

  handleEdit = () => {
    this.setState({ isEditable: true, errorMessageZip: "" });
  };

  handleCancel = () => {
    this.setState({
      isEditable: false,
      errorMessageLine1: "",
      errorMessageLine2: "",
      errorMessageCity: "",
      errorMessageZip: "",
      line1: this.props.line1,
      line2: this.props.line2,
      city: this.props.city,
      zip: this.props.zip,
    });
    this.props.onCancel();
  };

  resetData = () => {
    this.setState({
      line1: this.props.line1,
      line2: this.props.line2,
      city: this.props.city,
      zip: this.props.zip,
    });
  };

  // eslint-disable-next-line complexity
  handleSaveAddress = () => {
    const { line1, line2, city, zip } = this.state;
    const {address} = this.props;
    const {
      maxLengthLine1,
      maxLengthLine2,
      maxLengthCity,
      minLengthZip,
    } = this.props;
    //remove line2 validation as we have line1 for editing
    const errorMessageLine1 = maxLengthValidator({
      maxLength: maxLengthLine1,
      value: line1,
    });
    const errorMessageLine2 = maxLengthValidator({
      maxLength: maxLengthLine2,
      value: line2,
    });
    const errorMessageCity = maxLengthValidator({
      maxLength: maxLengthCity,
      value: city,
    });
    // const errorMessageZip = minLengthValidator({
    //   minLength: minLengthZip,
    //   value: zip,
    // });
    const errorMessageZip = defaultRegExpValidator({
      regex: minLengthZip,
      value: zip,
    });
    const isError =
      (errorMessageLine1 && !isEmpty(errorMessageLine1)) ||
      (errorMessageLine2 && !isEmpty(errorMessageLine2)) ||
      (errorMessageCity && !isEmpty(errorMessageCity)) ||
      (errorMessageZip && !isEmpty(errorMessageZip));
    if (isError) {
      this.setState({
        errorMessageLine1,
        errorMessageLine2,
        errorMessageCity,
        errorMessageZip,
      });
    } else {
      this.setState({ 
        isEditable: false,
        errorMessageLine1,
        errorMessageCity,
        errorMessageZip});
      this.props.onSaveAddress({ line1, city, zip });
    }
  };

  renderEditingButtons = () => {
    return (
      <View style={Styles.editContainer}>
        <TouchableOpacity onPress={() => this.handleCancel()}>
          <Text style={Styles.text}>{lang.canceled()} </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleSaveAddress()}>
          <Text style={Styles.text}>{lang.save()}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderEditingButtonsMap = () => {
    return (
      <View style={Styles.editContainerMap}>
        <TouchableOpacity onPress={() => this.handleCancel()} style={[Styles.cancelButton]}>
          <Text style={Styles.text}>{lang.canceled()} </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleSaveAddress()} style={[Styles.saveButton]}>
          <Text style={Styles.textSave}>{lang.save()}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderEditButton = () => {
    return (
      <TouchableOpacity
        style={Styles.editButtonContainer}
        onPress={() => this.handleEdit()}
        hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
      >
        <View>
          <Text style={Styles.editText}>
            {lang.edit()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderDisclaimer = () => {
    return (
      <View style={Styles.disclaimerContainer}>
        <View>
          <Icon
            raised
            name="info-circle"
            color="grey"
            size={14}
            onPress={() => this.setState({ isEditable: true })}
          />
        </View>
        <View style={Styles.disclaimerTextContainer}>
          <Text style={Styles.disclaimerWarningText}>{lang.disclaimer()}</Text>
          <Text style={Styles.disclaimerText}>
            {lang.contactInfoDisclaimer()}
          </Text>
        </View>
      </View>
    );
  };
  
  onChangeMapAddress = (val) => {
  }

  getFormattedAddress = latLong =>{
    getAddressObject(latLong).then(addressObject =>{
        this.setState({
          line1:addressObject.completeAddress,
          city:addressObject.city,
          zip:addressObject.postalCode
        })
    }).catch(e =>{
    
    });
  }

  render = () => {
    const {
      isEditable,
      line1,
      city,
      zip,
      errorMessageLine1,
      errorMessageLine2,
      errorMessageCity,
      errorMessageZip,
    } = this.state;
    const {address} = this.props
    const translateX = this.shakeAnimationValue.interpolate({
      inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
      outputRange: [0, -15, 0, 15, 0, -15, 0],
    });

    const { propStyle, shouldDataReset, iconImage,countryCommonMeta } = this.props;

    shouldDataReset && this.resetData();

    return (
      <View style={[Styles.container, propStyle]}>
        <View style={Styles.leftContainer}>
          <Image source={iconImage} style={{ width: 20, height: 20 }} resizeMode={'contain'} />
        </View>

        {!isEditable &&
          <View style={Styles.bodycontainer}>
            <View style={Styles.titleContainer}>
              <View>
                <Text style={Styles.languageAddressText}>{lang.address()}</Text>
              </View>
              <View>
                {isEditable && this.renderEditingButtons()}
                {!isEditable && this.renderEditButton()}
              </View>
            </View>
            <View style={{ paddingBottom: 18, paddingHorizontal: 16 }}>
              {Boolean(address) && <Text style={Styles.langAddress}>{address}</Text>}
              {/* <Text style={Styles.langAddress}>{line2}</Text> */}
              {/* <Text style={Styles.langAddress}>{city}{" "}{zip}</Text> */}
            </View>
          </View>
        }
        {isEditable &&
          <View style={Styles.bodycontainer}>
            <View style={Styles.titleContainer}>
              <View>
                <Text style={Styles.titleHeader}>{lang.address()}</Text>
              </View>
            </View>
            <View style={Styles.inputContainerView}>
              <Animated.View
                style={StyleSheet.flatten([
                  Styles.inputContainerAddress(),
                  { transform: [{ translateX }] },
                ])}
              >
                <TextInput
                  clearTextOnFocus={false}
                  editable={isEditable}
                  keyboardType={"default"}
                  onChangeText={line1 => this.setState({ line1 })}
                  placeholder={lang.lineOne()}
                  value={line1}
                  autoFocus={true}
                  style={Styles.textInputAdd}
                />
              </Animated.View>
              {!isEmpty(errorMessageLine1) && (
                <View style={Styles.errorView}>
                  <Text style={Styles.errorMsg}>{errorMessageLine1}</Text>
                </View>
              )}
              <View style={Styles.cityZipcodeContainer}>
                 <View style={Styles.cityZipcodeView}>
                  <View style={Styles.columnStyle}>
                    <View style={Styles.titleCity}>
                      <Text style={Styles.titleHeader}>{lang.city()}</Text>
                    </View>
                    <Animated.View
                      style={StyleSheet.flatten([
                        Styles.inputContainerCity(),
                        { transform: [{ translateX }] },
                      ])}
                    >
                      <TextInput
                        clearTextOnFocus={false}
                        editable={isEditable}
                        onChangeText={city => this.setState({ city })}
                        placeholder={lang.city()}
                        value={city}
                        autoFocus={false}
                        style={Styles.addressInputs}
                      />

                    </Animated.View>
                    {!isEmpty(errorMessageCity) && (
                      <View style={Styles.errorView}>
                        <Text style={Styles.errorMsg}>{errorMessageCity}</Text>
                      </View>
                    )}
                  </View>
                  <View style={Styles.columnStyle}>
                    <View style={Styles.titleZipCode}>
                      <Text style={Styles.titleHeader}>{lang.zipCode()}</Text>
                    </View>
                    <Animated.View
                      style={StyleSheet.flatten([
                        Styles.inputContainerCity(),
                        { transform: [{ translateX }] },
                      ])}
                    >
                      <TextInput
                        clearTextOnFocus={false}
                        editable={isEditable}
                        keyboardType={"number-pad"}
                        maxLength={6}
                        onChangeText={zip => this.setState({ zip })}
                        placeholder={lang.zipCode()}
                        value={zip}
                        autoFocus={false}
                        style={Styles.addressInputs}
                      />
                    </Animated.View>
                    {!isEmpty(errorMessageZip) && (
                      <View style={Styles.errorView}>
                        <Text style={Styles.errorMsg}>{errorMessageZip}</Text>
                      </View>
                    )}
                  </View>

                </View>  
                <View style={Styles.padding17}>
                  <AddressSelector
                    getFormattedAddress = {this.getFormattedAddress}
                    onChange={this.onChangeMapAddress}
                    flex={.15}
                    borderRadius={5}
                  />
                </View>
                <View style={Styles.padding17}>

                  <View style={{ alignSelf: 'flex-end' }}>
                    {isEditable && this.renderEditingButtonsMap()}
                  </View>

                </View>


              </View>
            </View>
          </View>

        }


      </View>
    );
  };
}

UpdateInfoRow.propTypes = {
  line1: PropTypes.string,
  line2: PropTypes.string,
  city: PropTypes.string,
  zip: PropTypes.string,
  onSaveAddress: PropTypes.func,
  onCancel: PropTypes.func,
  maxLengthLine1: PropTypes.number,
  maxLengthLine2: PropTypes.number,
  maxLengthCity: PropTypes.number,
  minLengthZip: PropTypes.number,
  shouldDataReset: PropTypes.bool,
  propStyle: PropTypes.object,
};

export default connect()(UpdateInfoRow);

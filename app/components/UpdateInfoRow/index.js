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
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import Styles from "./styles";
import lang from "../../mypolicy/screens/MyPolicy/lang";

class UpdateInfoRow extends PureComponent {
  shakeAnimationValue = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      isEditable: false,
      text: props.data,
      isError: false,
      errorMessage: "",
    };
  }

  focus() {
    setTimeout(() => this.ref.focus(), 0);
  }

  componentDidUpdate() {
    this.ref && this.focus();
  }

  handleEdit = () => {
    this.setState({ isEditable: true });
  };

  handleCancel = () => {
    this.setState({
      isEditable: false,
      text: this.props.data,
      isError: false,
      errorMessage: "",
    });
    this.props.onCancel();
  };

  handleSave = () => {
    const { validators } = this.props;
    const { text } = this.state;
    let validationResult = "";
    validators &&
      validators.reduce((acc, val) => {
        const result = val.validator({ regex: val.regex, value: text });
        if (result) {
          validationResult = result;
        }
      }, "");
    if (!validationResult) {
      this.setState({ isEditable: false, isError: false, errorMessage: "" });
      this.props.onSave(this.props.title, text);
    } else {
      this.setState({ isError: true, errorMessage: validationResult });
    }
  };

  resetData = () => {
    this.setState({
      text: this.props.data,
    });
  };

  renderEditingButtons = () => {
    return (
      <View style={Styles.editContainer}>
        <TouchableOpacity onPress={() => this.handleCancel()}>
          <Text style={Styles.text}>{lang.canceled()} </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleSave()}>
          <Text style={Styles.text}> {lang.save()}</Text>
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
        <View >
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

  render = () => {
    const {
      icon,
      title,
      propStyle,
      shouldDataReset,
      showTip,
      editable,
      isdCode,
    } = this.props;

    const { isEditable, text, errorMessage, isError } = this.state;

    const keyboardMapper = {
      PHONE: "number-pad",
      EMAIL: "email-address",
    };

    const translateX = this.shakeAnimationValue.interpolate({
      inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
      outputRange: [0, -15, 0, 15, 0, -15, 0],
    });

    shouldDataReset && this.resetData();
    return (
      <View>
        <View style={[Styles.container, propStyle]}>
          <View style={Styles.leftContainer}>
            <View>
              <Image source={icon} style={{ width: 20, height: 20 }} resizeMode={'contain'} />
            </View>
          </View>


          <View style={Styles.bodycontainer}>
            <View style={Styles.titleContainer}>
              <View>
                <Text style={Styles.titleHeader}>{title}</Text>
              </View>
              <View>
                {isEditable && this.renderEditingButtons()}
                {editable && !isEditable && this.renderEditButton()}
              </View>
            </View>
            <View style={Styles.textInputContainer}>
              <Animated.View
                style={StyleSheet.flatten([
                  Styles.inputContainer(),
                  { transform: [{ translateX }] },
                ])}
              >
                {isdCode &&
                  <Text style={Styles.isdCode}>{isdCode}</Text>
                }
                <TextInput
                  multiline={true}
                  ref={ref => (this.ref = ref)}
                  clearTextOnFocus={false}
                  editable={isEditable}
                  keyboardType={keyboardMapper[title] || "default"}
                  onChangeText={text => this.setState({ text })}
                  placeholder={title}
                  value={text}
                  style={Styles.inputTextStyle}
                />
              </Animated.View>

            </View>

          </View>

        </View>
        {showTip && (
          <View style={Styles.errorView}>
            <Text style={Styles.showTip}>{showTip}</Text>
          </View>
        )}
        {isError && (
          <View style={Styles.errorView}>
            <Text style={Styles.errorMsg}>{errorMessage}</Text>
          </View>
        )}

      </View>
    );
  };
}

UpdateInfoRow.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.string,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  validators: PropTypes.string,
  shouldDataReset: PropTypes.bool,
  propStyle: PropTypes.object,
  showTip: PropTypes.string,
  editable: PropTypes.bool,
  isdCode: PropTypes.string,
};

export default UpdateInfoRow;

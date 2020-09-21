/* eslint-disable */
import React, { Component } from "react";
import { View, Text, TouchableOpacity, Keyboard } from "react-native";

import {
    // CoreComponents,
    CoreConfig,
    CoreUtils,
    // metaHelpers,
    CoreConstants,
    CoreActionTypes,
} from "@pru-rt-internal/pulse-common";
const {
    isNilOrEmpty,
    validateEmail,
    validatePassword } = CoreUtils;
const {
    ElementErrorManager,
    SCREEN_KEY_REGISTER,
    SCREEN_KEY_EMAIL_OTP_VERIFICATION,
    COMMON_KEY_APP_LOGO,
    colors,
    pageKeys,
} = CoreConfig;
const {
    REGISTER_USER,
    AUTH_VALIDATION_ERRORS,
    CLOSE_VERIFY_EMAIL,
    REGISTER_CLEAN_STATE,
    REGISTER_EMAIL_CHANGED,
    REGISTER_PASSWORD_CHANGED,
} = CoreActionTypes;
const { EMAIL_PATTERN } = CoreConstants;
import Styles from "./styles";
import NewTextInput from "../../components/NewTextInput";

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            emailException: false,
            emailErrorMsg: '',
            passwordException: false,
            passwordErrorMsg: '',
        }
    }

    _isEmailValid() {
        const e_err = validateEmail(this.state.email)
        switch (e_err) {
            case 'email_id_required':
                emailMsg = 'Please input email';
                break;
            case 'invalid_email_id':
                emailMsg = 'Invalid email address';
                break;
        }
        if (!isNilOrEmpty(e_err)) {
            // Email Exception
            this.setState({
                emailException: true,
                emailErrorMsg: emailMsg,
            })
        }
        return isNilOrEmpty(e_err)
    }

    _isPasswordValid() {
        const p_err = validatePassword(this.state.password, true)
        if (!isNilOrEmpty(p_err)) {
            this.setState({
                passwordException: true,
                passwordErrorMsg: '8-16 Upper/Lowercase letter, Numbers, Symbols',
            })
        }
        return isNilOrEmpty(p_err)
    }

    _sendCode() {
        Keyboard.dismiss()

        const { email, password } = this.state;

        const emailValid = this._isEmailValid()
        const passwordValid = this._isPasswordValid();

        if (!emailValid || !passwordValid) { return }

        // Send Verification Code
        this.props.dispatch({
            context: pageKeys.REGISTRATION,
            type: REGISTER_USER,
            payload: {
                email,
                password,
            },
        });

    }

    render() {
        const { emailException, passwordException, emailErrorMsg, passwordErrorMsg } = this.state;
        return <View style={Styles.container}>
            <View style={{ marginLeft: 40, marginRight: 40 }}>
                <NewTextInput
                    placeholder={'First Name / Given Name'}
                    autoCorrect={false}
                    exception={false}
                    onChange={(value) => {
                        this.setState({
                            firstName: value
                        })
                    }}
                    onSubmit={(value) => {
                        this.setState({
                            firstName: value
                        })
                    }}
                    showTipOnFocus={false}
                />
                <NewTextInput
                    placeholder={'Last Name / Family Name'}
                    exception={false}
                    autoCorrect={false}
                    onChange={(value) => {
                        this.setState({
                            lastName: value
                        }, () => {
                        })
                    }}
                    onSubmit={(value) => {
                        this.setState({
                            lastName: value
                        }, () => {
                        })
                    }}
                    showTipOnFocus={false}
                />
                <NewTextInput
                    placeholder={'Email'}
                    exception={emailException}
                    errorMessage={emailErrorMsg}
                    autoCorrect={false}
                    onChange={(value) => {
                        this.setState({
                            email: value
                        }, () => {
                        })
                    }}
                    onSubmit={(value) => {
                        this.setState({
                            email: value
                        }, () => {
                        })
                    }}
                    onFocus={() => {
                        this.setState({
                            emailException: false,
                            emailErrorMsg: '',
                        })
                    }}
                    showTipOnFocus={false}
                />
                <NewTextInput
                    passwordMode={true}
                    autoCorrect={false}
                    placeholder={'Password'}
                    exception={passwordException}
                    errorMessage={passwordErrorMsg}
                    tipMessage={'8-16 Upper/Lowercase letter, Numbers, Symbols'}
                    onChange={(value) => {
                        this.setState({
                            password: value
                        }, () => {
                        })
                    }}
                    onSubmit={(value) => {
                        this.setState({
                            password: value
                        }, () => {
                        })
                    }}
                    onFocus={() => {
                        this.setState({
                            passwordException: false,
                            passwordErrorMsg: '',
                        })
                    }}
                    showTipOnFocus={true}
                />
            </View>
            <Text style={Styles.tipMessage} >
                We will send a verification code to your email address which we will ask for in the next step.
                </Text>
            <TouchableOpacity style={Styles.sendCodeBtnRect} onPress={this._sendCode.bind(this)}>
                <Text style={Styles.sendCodeBtnTitle}>
                    Send Code
                </Text>
            </TouchableOpacity>
        </View>
    }
}

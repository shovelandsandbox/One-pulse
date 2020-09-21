import PropTypes from "prop-types";
import React, { Component } from 'react';
import NewTextInput from '../NewTextInput';
import { CLOSE_ICON, SEARCH_ICON } from "../../config/images"
import { View, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import {
    CoreConstants,
    metaHelpers,
} from "@pru-rt-internal/pulse-common";
const {
    FINDHOSPITAL,
    FINDHOSPITAL_SEARCHLOCATION
} = CoreConstants;
const helpers = metaHelpers;
export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        const { value } = this.props
        this.state = {
            text: value,
            isFocus: false,
            placeHolder: this.props.hasCloseIcon ? "Search by Speciality" : helpers.findElement(FINDHOSPITAL,FINDHOSPITAL_SEARCHLOCATION).label,
        }
    }

    blur() {
        this.input.blur()
    }

    focus() {
        this.input.focus()
    }

    render() {
        const {
            isFocus,
            placeHolder,
        } = this.state;

        const {
            onBlur,
            onFocus,
            onSubmit,
            maxLength,
            hasCloseIcon,
            onValueChanged,
            overrideIconStyle,
            placeholderOverride,
            shouldPresentingUnderline,
            foldedType
        } = this.props;

        const type = foldedType === undefined ? true : foldedType;

        return <View style={{
            width: "100%",
            paddingRight: 5,
            flexDirection: "row",
            backgroundColor: '#fff',
            height: hasCloseIcon ? 49 : 68,
            justifyContent: "space-between",
            alignItems: hasCloseIcon ? "flex-end" : "center",
        }} >
            <Image
                source={SEARCH_ICON}
                style={overrideIconStyle ? overrideIconStyle : {
                    width: 20,
                    height: 20,
                    flexShrink: 0,
                    color: "#515B61"
                }}
            />
            <View style={{
                flex: 1,
                height: "auto",
                marginLeft: hasCloseIcon ? 10 : 16,
                paddingBottom: shouldPresentingUnderline ? 5 : 0,
                borderBottomColor: shouldPresentingUnderline ? '#515B61' : undefined,
                marginBottom: shouldPresentingUnderline ? hasCloseIcon ? 3.09 : 2 : 0,
                borderBottomWidth: shouldPresentingUnderline ? hasCloseIcon ? 2 : 1 : 0,
            }}>
                {
                    !type ? (
                      <Text
                        style={{
                            height: 20,
                            fontSize: 16,
                            width: "100%",
                            color: this.props.value ? "#212529" : "rgb(165,165,165)",
                            fontWeight: "300",
                            fontFamily: "Avenir",
                        }}
                      >
                          {this.props.value ? this.props.value : placeholderOverride || placeHolder}
                      </Text>
                    ) : (
                      <TextInput
                        style={{
                            height: 20,
                            fontSize: 16,
                            width: "100%",
                            color: "#212529",
                            fontWeight: "300",
                            fontFamily: "Avenir",
                            paddingRight: hasCloseIcon ? 0 : 22,
                            paddingVertical: 0
                        }}
                        ref={isa => this.input = isa}
                        placeholder={isFocus ? "" : placeholderOverride || placeHolder}
                        onFocus={() => {
                            this.setState({
                                // text: "",
                                isFocus: true
                            })
                            onFocus && onFocus()
                        }}

                        onChangeText={(text) => {
                            this.setState({ text }, () => {
                                onValueChanged && onValueChanged(text)
                            })
                        }}
                        onBlur={() => {
                            onBlur && onBlur()
                            this.setState({
                                isFocus: false
                            })
                        }}
                        onSubmitEditing={(e) => {
                            onSubmit && onSubmit(e.nativeEvent.text)
                        }}
                        value={this.props.value}
                        returnKeyType={'search'}
                        maxLength={maxLength}
                      />
                    )
                }
            </View>
            <View>
                {
                    hasCloseIcon && <TouchableOpacity onPress={() => {
                        this.setState({
                            text: ""
                        })
                    }}>
                        <Image
                            source={CLOSE_ICON}
                            style={{
                                width: 16,
                                height: 16,
                                flexShrink: 0,
                                marginLeft: 23,
                                marginBottom: 4
                            }}
                        />
                    </TouchableOpacity>
                }
            </View>

        </View>
    }
}
SearchBar.PropTypes = {
    onBlur: PropTypes.func,
    value: PropTypes.string,
    onFocus: PropTypes.func,
    onSubmit: PropTypes.func,
    hasCloseIcon: PropTypes.bool,
    onValueChanged: PropTypes.func,
    overrideIconStyle: PropTypes.object,
    shouldPresentingUnderline: PropTypes.bool,
    placeholderOverride: PropTypes.string,
    maxLength: PropTypes.number,
};
SearchBar.defaultProps = {
    hasCloseIcon: false,
    shouldPresentingUnderline: true,
};


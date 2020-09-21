import React from "react";
import { Platform, KeyboardAvoidingView } from "react-native";

const PruKeyboardAvoidingView = (props) => {
    if (Platform.OS === "android") {
        return (
            <KeyboardAvoidingView
                {...props}
                enabled>
                { props.children }
            </KeyboardAvoidingView>
        );
    } else {
        return (
            <KeyboardAvoidingView
                {...props}
                behavior="padding"
                keyboardVerticalOffset={90}
                enabled>
                { props.children }
            </KeyboardAvoidingView>
        );
    }
}

export default PruKeyboardAvoidingView;
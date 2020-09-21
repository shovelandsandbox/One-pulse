import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import PropTypes from 'prop-types'
import { CHECKBOX_ACTIVE } from "../../config/images"
class SelectZoneItem extends Component {
    render() {
        let { labelText, isSelected, onDeselected, onSelected, zoneCode } = this.props;
        return (
            <View style={{
                width: "100%",
                height: 77,
                borderBottomColor: "#E9E9EA",
                borderBottomWidth: 1,

            }}>
                <TouchableOpacity
                    style={{
                        height: 77,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                    onPress={() => {
                

                        onSelected && onSelected({ labelText })
                    }}>
                    <Text style={{
                        width: 235,
                        // lineHeight: 22,
                        justifyContent: "center",
                        fontFamily: "Avenir-Heavy",
                        fontSize: 16,
                        color: "#515B61",
                        textAlign: "left",
                    }}>
                        {labelText}
                    </Text>
                    {
                        isSelected && <Image
                            style={{
                                width: 22,
                                height: 22,
                                borderRadius: 11,
                            }}
                            source={CHECKBOX_ACTIVE} />
                    }
                </TouchableOpacity>
            </View>
        )
    }
}
SelectZoneItem.PropTypes = {
    labelText: PropTypes.string,
    onSelected: PropTypes.func,
    onDeselected: PropTypes.func,
    isSelected: PropTypes.bool
};
export default SelectZoneItem
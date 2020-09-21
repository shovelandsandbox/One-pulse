/* eslint-disable */
import { StyleSheet} from "react-native";
import PropTypes from "prop-types";


export const SelectStateStyle = StyleSheet.create({
   container1: {
    width: '100%',
    height: 64,
    marginRight: 100
},
container2: {
    flexDirection: 'row',
    height: 64,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
},
checkboxActive: {
    width: 25,
    height: 25,
    flexShrink: 0
},
checkboxInactive: {
    width: 25,
    height: 25,
    borderRadius: 25,
    tintColor: '#E9E9EA',
    flexShrink: 0
}
});

SelectStateStyle.PropTypes = {
    labelText: PropTypes.string,
    onSelected: PropTypes.func,
    isSelected: PropTypes.bool,
}

SelectStateStyle.defaultProps = {
    isSelected: false,
}
/* eslint-disable */
import React from "react";
import { Text, View } from "react-native";

const PruSubHeading = ({heading}) => {
    return (
        <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
              }}
            >
              <View
                style={{
                  flexGrow: 0,
                  flexShrink: 0,
                  flexBasis: '75%',
                  padding: 10,
                  paddingTop: 20,
                  paddingLeft: 36,
                  justifyContent: 'space-around',
                  alignSelf: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: '#D1D1D1',
                    fontFamily: 'Avenir',
                  }}
                >
                  { heading }
                </Text>
              </View>
              <View
                style={{
                  flexGrow: 0,
                  flexShrink: 0,
                  flexBasis: '25%',
                }}
              >
              </View>
        </View>
    )
};

export default PruSubHeading;

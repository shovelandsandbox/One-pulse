import React, { Component } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Modal,
    Image,
    ImageBackground,
    PushNotificationIOS,
    Platform
} from "react-native";
import MapView, { Marker, Circle } from "react-native-maps"
import { HOSPITAL_MARK } from "../../config/images"

export default class Hospital extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "red" }}>
                <MapView
                    style={{ flex: 1 }}
                    showsUserLocation
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    zoomEnabled
                    zoomControlEnabled
                    showsCompass={true}
                    showsMyLocationButton={true}
                >
                    <Marker
                        coordinate={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                        }}
                        title={"Hoi"}
                        description={"aaaa"}
                        image={HOSPITAL_MARK}

                    />


                    <Circle
                        key={"11"}
                        center={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                        }}
                        radius={400}
                        fillColor={"#FF00000"}
                        strokeColor={"rgba(255,0,0,1)"}
                        strokeWidth={1}
                        zIndex={2}
                        miterLimit={0}
                    />
                </MapView>
            </View>

        )
    }
}
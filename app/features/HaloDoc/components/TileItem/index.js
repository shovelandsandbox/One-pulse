
import React from "react";
import {
    Image,
    Text,
    TouchableOpacity,
} from "react-native"
import CardView from "react-native-cardview"
import styles from './style'
import metaConstants from "../../meta";

const TileItem = props => {
    let TileMeta = { ...metaConstants.talkToDoctorMeta() }
    const Not_Available = TileMeta.Not_Available
    return (
        <CardView
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={5}
            style={styles.cardViewStyle}
        >
            <TouchableOpacity
                style={styles.tileContainerStyle}
                onPress={() =>
                    props.onClick(props.item.id, props.item.name, props.item.icon.url)
                }
            >
                <Image
                    style={styles.tileImageStyle}
                    source={{ uri: props.item.icon.url }}
                />
                <Text style={styles.tileTextStyle} numberOfLines={2}>
                    {props.item.name || Not_Available}
                </Text>
            </TouchableOpacity>
        </CardView>
    );
};


export default TileItem
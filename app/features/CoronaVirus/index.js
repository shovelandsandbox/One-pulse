import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from "react-native";
import styles from "./style"

class CoronaVirus extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        // const { userPreferences } = this.props;
        // const imageUri = path(["language"], userPreferences) === "EN"
        //     ? `${CMS_URL}b9c37caa-e4f2-4939-b294-e62242055c04?namespace=ID`
        //     : `${CMS_URL}d6380f42-0b08-451a-9443-004ca3050c57?namespace=ID`;
        const imageUri = "https://pca-pulse-uat.prudential.co.id/api/v1_0_0/cms/b9c37caa-e4f2-4939-b294-e62242055c04?namespace=ID"
        return (
            <View
                style={styles.container}
            >
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate("CoronaChatBot");
                    }}
                >
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.image}
                    />
                </TouchableOpacity>
            </View>
        );
    }


}

export default connect(null, null)(CoronaVirus);

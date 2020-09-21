import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        elevation: 2,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        overflow: "hidden"
    },
    image: {
        height: 160,
        resizeMode: "cover",
        width: "100%"
    }
});

export default styles;
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "#ffffff",
        flex: 1,
    },
    scrollContainer: {

    },
    backContainer: {
        borderBottomWidth: 1,
        shadowColor: "#e2e2e2",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        backgroundColor: "#fff",
        marginBottom: 15
    },
    congratsContainer: {
        alignItems: "center",
        marginHorizontal: 20,
    },
    voucherContainer: {
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 20,
    },
    pulseFeatureContainer: {
        marginHorizontal: 20,
    },
    buttonContainer: {
        marginBottom: 20,
        marginVertical: 20,
        alignItems: "center",
    },
    congratsTick: {
        width: 50,
        height: 50
    },
    featureTick: {
        width: 25,
        height: 25
    }
});

export default styles;
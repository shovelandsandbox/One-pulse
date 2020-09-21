import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    consultnowBannerContainer: {
        backgroundColor: "#f3f3f3",
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 3,
        // ios shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        marginTop: 16
    },
    consultnowBannerText: {
        color: "#7e7e7e",
        fontSize: 12,
        lineHeight: 18,
        flex: 1
    },
    consultnowBannerBtn: {
        backgroundColor: "#ec1c2e",
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    consultnowBannerBtnText: {
        fontSize: 12,
        color: "#fff",
        textAlign: "center"
    },
    mealDetailsContainer: {
        flex: 1,
        marginTop: 8,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderColor: "#5c5b5b"
    },
    mealDetailsHeaderContainer: {
        marginTop: 16,
        marginHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    mealDetailsHeaderText: {
        fontSize: 16,
        color: "#4e5571",
        fontWeight: "bold",
        marginBottom: 16
    },
    mealDetailsBodyContainer: {
        marginBottom: 16
    },
    mealDetailsCalorieText: {
        color: "#4e5571"
    },
    currentMonthContainer:{
        flexDirection:"row"
    },
    currentMonthText: {
        color: "#41496a",
        fontWeight: "bold"
    },
    DateContainer: {
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 8
    },
    dateSelectionContainer: {
        marginTop: 16,
        marginHorizontal: 16
    },
    dayNameText: {
        fontSize: 12,
        fontWeight: "bold"
    },
    dayValueText: {
        marginTop: 8
    },
    daysConatiner: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
})
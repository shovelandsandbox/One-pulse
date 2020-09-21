import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const window = Dimensions.get("window");
const width = window.width

export const styles = StyleSheet.create({
    continueText: {
        color: Colors.white,
        fontSize: 15
    },
    continueButton: {
        width: "100%",
        height: 40,
        borderRadius: 19.7,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.pulseRed
    },
    goToWelcomeView: {
        margin: 20,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginTop: 40
    },
    greyLineStyle: {
        width: "100%",
        // marginTop: -9
    },
    itemNameStyle: {
        color: Colors.grey707070
    },
    greenView: {
        marginTop: 8
    },
    selectedImgStyle: {
        marginHorizontal: 1
    },
    mainBarView: {
        marginHorizontal: 10,
        flexDirection: "row"
    },
    profileStyle: {
        height: 80,
        width: 80,
        borderRadius: 40
    },
    imgViewStyle: {
        marginHorizontal: 20
    },
    greetingView: {
        marginHorizontal: 20,
        paddingTop: 10
    },
    skipText: {
        color: Colors.white
    },
    headerView: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    safeView: {
        flex: 1,
        backgroundColor: Colors.white
    },
    commonGroupView: {
        marginTop: 15,
        // flex:1
    },
    imgBorderStyle: {
        borderRadius: 10,
    },
    commonTouchStyle: {
        paddingHorizontal: 10,
       
    },
    commonViewStyle: {
        padding: 10,
        // flex:1
    },
    commonView: {
        flexDirection: "row"
    },
    backgroundImage: {
        width: "100%",
        height: "30%",
    },
    imageStyle: {
        width: "100%",
        height: "100%",
    },
    imgView: {
        padding: 15
    },
    imgStyle: {
        height: 16.7,
        width: 22,
    },
    itemView: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 5,
    },
    infoView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    greetingText: { color: Colors.white, fontSize: 20 },
    nameText: { color: Colors.white, fontSize: 18 },
    selectedTextGreen: { color: "#96bf48", fontSize: 15 },
    selectedTextPink: { color: "#f5848d", fontSize: 15 },
    selectedTextOrange: { color: "#f89350", fontSize: 15 },
    greyBoxStyle: { width: 15, height: 6, marginHorizontal: 1 },
    headingText: {
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: "600",
        color: Colors.grey707070,
        paddingBottom: 5
    },
    optionImage: {
        height: 50,
        width: width / 3.8,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    optionText: {
        fontSize: 14,
        color: Colors.grey707070
    },
})
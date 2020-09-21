import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const window = Dimensions.get("window");
const width = window.width

export const styles = StyleSheet.create({
    shortTermImg: {
        paddingHorizontal: 20
    },
    continueText: {
        color: Colors.white,
        fontSize: 15
    },
    goToAirCompView: {
        margin: 20
    },
    goToAirCompStyle: {
        width: "100%",
        height: 40,
        borderRadius: 19.7,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.pulseRed
    },
    listView: {
        paddingTop: 15,
        justifyContent: "center"
    },
    listText: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 20,
        fontWeight: "600"
    },
    mostUsedViewStyle: {
        marginTop: 30,
        marginHorizontal: 15
    },
    longTermImg: {
        paddingHorizontal: 20
    },
    specialBarView: {
        flexDirection: "row"
    },
    scrollStyle: {
        flex: 1,
        backgroundColor: Colors.white
    },
    modalView: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    cardView: {
        height: 40,
        backgroundColor: Colors.white,

    },
    cardImageView: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        height: 56,
        backgroundColor: Colors.offwhite,
    },
    imgView: {
        padding: 10
    },
    imgStyle: {
        marginLeft: 15,
        height: 16.7,
        width: 22,
    },
    textStyle: {
        marginLeft: 10,
        color: Colors.grey393939,
        fontSize: 16,
        fontWeight: "600",
    },
    backgroundImage: {
        width: "100%",
        height: 360,
        borderRadius: 6.6
    },
    headingView: {
        paddingTop: 10,
        paddingHorizontal: 20,
        flexDirection: "row"
    },
    headingTextView: {
        paddingHorizontal: 10,
        justifyContent: "center"
    },
    headingText: {
        fontSize: 24,
        color: Colors.white,
        fontWeight: "600"
    },
    typesTextView: {
        paddingHorizontal: 15,
        justifyContent: "center",
    },
    typesText: {
        fontSize: 14,
        color: Colors.white,
    },
    typesView: {
        paddingLeft: 35,
        flexDirection: "row"
    },
    headingVerticleBar: { width: 1, backgroundColor: Colors.black, marginLeft: 50, height: 10 },
    typesVerticleBar: { width: 1, backgroundColor: Colors.black, marginLeft: 50, height: 20 },
    typesVerticleSpecialBar: { width: 1, backgroundColor: Colors.black, marginLeft: 50, height: 35, marginTop: -8 },
    typesHorizontalBar: { width: "70%", backgroundColor: Colors.white, height: 0.6, marginLeft: 30, marginTop: 10 },
    typesHorizontalSpecialBar: { width: "70%", backgroundColor: Colors.white, height: 0.6, marginLeft: 30, marginTop: 15 },
    typesLastHorizontalBar: { width: "70%", backgroundColor: Colors.white, height: 0.6, marginLeft: 81, marginTop: 10 },
    backgroundLastImage: {
        width: "100%",
        height: 400,
        borderRadius: 6.6
    },
    itemView1: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: Colors.white,
        borderBottomWidth: 0.5,
        flexDirection: "row"
    },
    itemView0: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: Colors.white,
        borderBottomWidth: 0.5,
        marginStart: 10,
        flexDirection: "row"
    },
    itemView2: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: Colors.white,
        borderBottomWidth: 0.5,
        marginEnd: 10,
        flexDirection: "row"
    },
    itemView3: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginLeft: width / 5.5
    },
    itemView4: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginRight: width / 5.5
    },
    itemVerticleBar0: { width: 0.5, backgroundColor: Colors.white, height: 120, marginLeft: 15 },
    itemVerticleBar1: { width: 0.5, backgroundColor: Colors.white, height: 120, marginLeft: 25 },
    itemVerticleBar3: { width: 0.5, backgroundColor: Colors.white, height: 120, marginHorizontal: 35 },
    itemText: { color: Colors.white, textAlign: "center", paddingTop: 10, fontSize: 10 },
    contentView: { flexDirection: "column", alignItems: "center", justifyContent: "center" },
    itemImage: { height: 65, width: 45 },
    itemImage1: { height: 65, width: 45, marginTop: -10 }
})
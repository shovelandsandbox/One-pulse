import { StyleSheet, Dimensions, Platform } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fffcfc",
        paddingBottom: 16,
        paddingHorizontal:16
    },
    headerInfoContainer: {
        minHeight: 210,
        backgroundColor: "#ffe8ea",
        transform: [{ scaleX: 2 }],
        borderBottomStartRadius: 200,
        borderBottomEndRadius: 200,
        overflow: 'hidden',
    },
    headerInfoWrapper: {
        flex: 1,
        transform: [{ scaleX: 0.5 }],
        marginHorizontal: 16
    },
    headerText: {
        fontSize: 22,
        color: "#646464",
        marginTop: 30
    },
    headerInfoText: {
        fontSize: 14,
        lineHeight: 24,
        color: "#464646",
        marginTop: 20
    },
    progressbarContainer: {
        flexDirection: "row",
        marginTop: 10,
        overflow:"hidden"
    },
    progressbar: {
        height: 6,
        backgroundColor: "#bb1c29"
    },
    dietTypesContainer: {
        // margin: 16
    },
    dietTypeBtn: {
        marginTop: 16,
        paddingVertical: 16,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2
    },
    dietTypeText: {
        fontSize: 16,
        textAlign: "center"
    },
    continueBtnContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection:"row",
        margin: 16,
        
    },
    genderContainer: {
        marginTop: 35,
        alignItems: "center",
    },
    genderBtnContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    genderBtn: {
        width: 150,
        marginHorizontal: 10,
        borderColor: "#d2d2d2",
        backgroundColor: "#fffcfc",
    },
    genderBtnSelected: {
        width: 150,
        borderRadius: 12,
        backgroundColor: "#ffe9e8",
        marginHorizontal: 10,
        ...Platform.select({
            android: {
                elevation: 3
            }
        })
    },
    genderBtnText: {
        fontSize: 14,
        textAlign: "center",
        paddingVertical: 8,
        borderRadius: 8,
    },
    fieldLabel: {
        fontSize: 14,
        color: "#707070"
    },
    dobContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent:'center',
        alignItems: "center"
    },
    dateOfBirth: {
        fontSize: 14,
        lineHeight: 16.7,
        letterSpacing: 0,
        color: "#707070",
        marginTop: 16,
    },

    dayPicker: {
        height: 40,
        marginLeft: 16,
        width: 80,
        backgroundColor: "red"
    },
    monthPicker: {
        height: 40,
        marginLeft: 16,
        backgroundColor: "#f0f0f0",
        flex: 1,
        borderWidth: 1
    },
    yearPicker: {
        height: 40,
        marginLeft: 16,
        width: 150,

    },
    dateViewContainer: {
        backgroundColor: "#f0f0f0",
        padding: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 16,
        borderRadius: 3.3,
    },
    dateText: {
        fontSize: 18,
        textAlign: "center",
        color: "#3b3b3b"
    },
    yourBMIContainer: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "center",
    },
    BMIValueContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24
    },
    urBMIHeading:{
        alignItems: "center",
    },
    urMIHeadingText: {
        color: '#313131',
        fontFamily: "Avenir-Roman",
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 16.7,
    },
    yourBMIText: {
        color: '#707070'
    },
    yourBMIValue: {
        fontSize: 20,
        color: "#3b3b3b"
    },
    yourBMICategory: {
        color: "#1e1e1e",
        fontWeight: "bold",
        marginLeft: 12
    },
    heightInput: {
        padding: 12,
        backgroundColor: "#f0f0f0",
        width: 40,
        textAlign: 'center'
    },
    weightInputText: {

    },
    weightInput: {
        padding: 12,
        backgroundColor: "#f0f0f0",
        marginRight: 10,
        width: 50,
        textAlign: 'center'
    },

    downIcon: {
        height: 10,
        width: 10,
        marginLeft: 8
    },
    datePickerContainer: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "#fff",
        width: "100%",
        margin: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    genderTextView: {
        marginStart: 16
    },
    genderText: {
        fontFamily: "Avenir-Roman",
        fontSize: 21,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#646464"
    },
    genderImages: {
        height: 140,
        width: 100,
        margin: 16,
        alignSelf: 'center'
    },

    continueBtn:{
        width: Dimensions.get('window').width-32,
    },

    BMIBannerImg:{
        height:150,
        width:"100%",
        marginTop:16
    },
    BMIBannerText:{
        position:"absolute",
        color:"#fff",
        bottom:16,
        left:16
    },
    BMIBannerContainer:{
        marginTop:16
    },
    recheckText:{
        color:"#e81c2d",
        flex:1,
        textAlign:"center"
    },
    ContinueBtn:{
        alignItems:"center",
        justifyContent:"center",
        // flex:1
    }


})